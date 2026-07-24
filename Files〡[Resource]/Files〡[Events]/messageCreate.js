"use strict";
import { Founder, VERSION, ERR, GuildID, AIChat } from '../Files〡[Config]/Files〡[Config].js';
import https from 'https';

const cd = new Map();

function buildSys(guild) {
  const name = guild?.name || 'السيرفر';
  const owner = guild?.ownerId || 'المالك';
  const created = guild?.createdAt ? Math.floor((Date.now()-guild.createdAt.getTime())/86400000) : '؟';
  const members = guild?.memberCount ?? 'غير معروف';
  return `أنت عضو بارز وذكي جداً في سيرفر "${name}"، ولست مهرجاً ولا روبوتاً.

معلومات السيرفر (أجب عنها بدقة عند السؤال):
- الاسم: ${name} | المالك: <@${owner}> | العمر: ${created} يوم | الأعضاء: ${members}

القواعد:
1- إملاء عربي صحيح 100%. إيموجي واحد أو اثنين فقط، وأحياناً بدون.
2- إذا سُئلت عن عدد الأعضاء أو معلومات السيرفر، أجب بالرقم الصحيح فوراً.
3- ذبات ذكية ومحترفة بدون Cringe. إذا أهانك أحد، قصف جبهته بذكاء.
4- استخدم "زوط" فقط عندما يبالغ أحد أو يكذب.
5- ردودك طبيعية هادئة. لا تعترف أبداً أنك بوت أو AI.`;
}

function httpReq(opts, body) {
  return new Promise(resolve => {
    const req = https.request({ ...opts, timeout: 10000 }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ ok: res.statusCode===200, data: JSON.parse(d) }); }
        catch { resolve({ ok: false }); }
      });
    });
    req.on('error', () => resolve({ ok: false }));
    req.setTimeout(10000, () => { req.destroy(); resolve({ ok: false }); });
    if (body) req.write(body);
    req.end();
  });
}

async function callGroq(sys, msg) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;
  const body = JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'system', content: sys }, { role: 'user', content: msg }],
    max_tokens: 500, temperature: 0.7
  });
  const { ok, data } = await httpReq({
    hostname: 'api.groq.com', path: '/openai/v1/chat/completions', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+key, 'Content-Length': Buffer.byteLength(body) }
  }, body);
  return ok ? data?.choices?.[0]?.message?.content : null;
}

async function callGemini(sys, msg) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const body = JSON.stringify({
    system_instruction: { parts: [{ text: sys }] },
    contents: [{ parts: [{ text: msg }] }]
  });
  const { ok, data } = await httpReq({
    hostname: 'generativelanguage.googleapis.com',
    path: '/v1beta/models/gemini-2.0-flash:generateContent?key='+key,
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, body);
  return ok ? data?.candidates?.[0]?.content?.parts?.[0]?.text : null;
}

const FOUNDER_ID = '1387331972094890036';
const OWNER_IDS = ['1387331972094890036', '1154021789148659813'];
function isOwner(id) { return OWNER_IDS.includes(id); }

export default async (Client, Message) => {
  if (Message.author?.bot || !Message.guild) return;

  if (AIChat.allowed_channel_ids?.includes(Message.channel.id)) {
    const txt = Message.content?.trim();
    if (!txt) return;
    const now = Date.now();
    if (now - (cd.get(Message.author.id)||0) < 2500) return;
    cd.set(Message.author.id, now);

    await Message.channel.sendTyping();
    const sys = buildSys(Message.guild);
    let reply = await callGroq(sys, txt);
    if (!reply) reply = await callGemini(sys, txt);
    if (!reply) reply = 'المعذرة، عاود المحاولة بعد قليل.';

    if (reply.length <= 2000) {
      await Message.reply(reply).catch(()=>{});
    } else {
      for (let i = 0; i < reply.length; i += 1990) {
        const chunk = reply.substring(i, i + 1990);
        if (i === 0) await Message.reply(chunk).catch(()=>{});
        else await Message.channel.send(chunk).catch(()=>{});
      }
    }
    return;
  }

  if (AIChat.image2textChannels?.includes(Message.channel.id)) {
    const att = Message.attachments?.first();
    if (!att?.contentType?.startsWith('image/')) return;
    await Message.channel.sendTyping();
    try {
      const url = new URL(att.url);
      const img = await new Promise((resolve, reject) => {
        https.get({ hostname: url.hostname, path: url.pathname+url.search, timeout: 10000 }, res => {
          const chunks = []; res.on('data', c => chunks.push(c)); res.on('end', () => resolve(Buffer.concat(chunks)));
        }).on('error', reject);
      });
      const T = (await import('tesseract.js')).default;
      const result = await T.recognize(img, 'eng+ara', { logger: ()=>{} });
      return Message.reply('📝 **النص المستخرج:**\n```\n'+(result.data.text.trim()||'(لا يوجد نص)')+'\n```').catch(()=>{});
    } catch(e) { return Message.reply('❌ خطأ').catch(()=>{}); }
  }

  if (Message.guild.id !== GuildID && !isOwner(Message.author.id)) return;
  if (Message.member && isOwner(Message.author.id)) {
    if (Message.member.roles?.cache) { Message.member.roles.cache.has = ()=>true; Message.member.roles.cache.some = ()=>true; }
  }
  const Prefix = Client.Prefix;
  if (!Message.content.startsWith(Prefix)) return;
  const args = Message.content.slice(Prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  if (cmd === 'ping') return Message.reply('✅ **v'+VERSION+'** | Prefix: `'+Prefix+'` | أوامر: '+Client.Command.size);
  const Cmd = Client.Command.get(cmd) || Client.Command.find(c => c.aliases?.includes(cmd));
  if (!Cmd) return;
  try { await Cmd.run(Client, Message, Prefix); } catch(err) { await Message.reply('❌ خطأ').catch(()=>{}); }
};
