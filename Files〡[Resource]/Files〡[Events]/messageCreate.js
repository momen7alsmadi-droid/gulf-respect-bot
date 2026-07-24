"use strict";
import { Founder, VERSION, ERR, GuildID, AIChat } from '../Files〡[Config]/Files〡[Config].js';
import https from 'https';

const mem = new Map(), TTL = 60000, cd = new Map();
function hist(ch) { const n=Date.now();for(const[k,v]of mem){const f=v.filter(m=>n-m.t<TTL);f.length?mem.set(k,f):mem.delete(k)} return (mem.get(ch)||[]).filter(m=>Date.now()-m.t<TTL) }
function save(ch, r, t) { if(!t)return;const m=mem.get(ch)||[];m.push({role:r,content:t,t:Date.now()});mem.set(ch,m) }

function buildSys(g) {
  return `إنت مو مجرد عضو، إنت سولفجي وقلبك على ربعك في سيرفر "${g?.name||'السيرفر'}". تعال ندردش:

معلومات سيرفرنا (بس إذا سالك أحد جاوب بالمعلومة بدون فلسفة):
- اسمه: ${g?.name||'السيرفر'}
- له: ${g?.createdAt?Math.floor((Date.now()-g.createdAt)/86400000):'؟'} يوم مولع
- عدده: ${g?.memberCount||'؟'} واحد
- وولده <@${g?.ownerId||'؟'}>

كيف تتكلم:
- افتح سالفة زي الناس، ردودك تطلع من قلبك مو من موسوعة
- دردش براحتك، خذ راحتك، تكلم زي ما تتكلم مع اخوياك
- إيموجي خفيف على جنب 😄💀🔥 بس لا تطرشر
- إذا سالك احد جاوب وخلص، لا تتفلسف ولا تشرح

فن الذبات:
- إذا أحد استفزك أو قالك شي، اذبحه بذبة حلوة وموسمسة
- مثلاً لو قالك "شكلك وحش" رد: "طالع بالمرآية وبتعرف مين الوحش"
- خلك ذكي بالسخرية، موسمس، لا تصير سخيف ولا كرنج

فن الزوط:
- إذا شفت أحد يبالغ أو يهبد استخدم "زوط" أو "يا رجال قاعد تزوط" بأسلوب طبيعي
- لا تكررها واجد، بس بالسياق الصح، واضحك معهم
- لا تشرح ليش استخدمتها ولا تقول "حسب القواعد"

- لا تقول إني بوت ولا تقول إني ذكاء أبداً، إنت واحد من الشباب وخلاص`;
}

function httpReq(opts, body) {
  return new Promise(resolve => {
    const req = https.request({ ...opts, timeout: 10000 }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ ok: res.statusCode===200, code: res.statusCode, data: JSON.parse(d) }); }
        catch { resolve({ ok: false, code: res.statusCode }); }
      });
    });
    req.on('error', e => resolve({ ok: false, code: 0 }));
    req.setTimeout(10000, () => { req.destroy(); resolve({ ok: false, code: 0 }); });
    if (body) req.write(body);
    req.end();
  });
}

let lastG = 0, lastM = 0;

async function askGemini(sys, msg) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) { lastM = -1; return null; }
  const body = JSON.stringify({ system_instruction: { parts: [{ text: sys }] }, contents: [{ parts: [{ text: msg }] }] });
  const opts = {
    hostname: 'generativelanguage.googleapis.com', path: '/v1beta/models/gemini-2.0-flash:generateContent?key='+key,
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  };
  for (let i = 0; i < 3; i++) {
    const { ok, code, data } = await httpReq(opts, body);
    lastM = code || 0;
    if (ok) return data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (code !== 429 || i === 2) return null;
    await new Promise(r => setTimeout(r, 3000));
  }
  return null;
}

async function askGroq(sys, msg) {
  const key = process.env.GROQ_API_KEY;
  if (!key) { lastG = -1; return null; }
  const body = JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'system', content: sys }, { role: 'user', content: msg }],
    max_tokens: 250, temperature: 0.75
  });
  const opts = {
    hostname: 'api.groq.com', path: '/openai/v1/chat/completions', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+key, 'Content-Length': Buffer.byteLength(body) }
  };
  for (let i = 0; i < 3; i++) {
    const { ok, code, data } = await httpReq(opts, body);
    lastG = code || 0;
    if (ok) return data?.choices?.[0]?.message?.content;
    if (code !== 429 || i === 2) return null;
    await new Promise(r => setTimeout(r, 3000));
  }
  return null;
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
    if (now - (cd.get(Message.author.id)||0) < 2000) return;
    cd.set(Message.author.id, now);

    await Message.channel.sendTyping();
    const sys = buildSys(Message.guild);
    let reply = await askGemini(sys, txt);
    if (!reply) reply = await askGroq(sys, txt);
    if (!reply) reply = 'المعذرة، عاود المحاولة بعد قليل. [G:'+lastG+'|M:'+lastM+']';
    
    save(Message.channel.id, 'user', txt);
    save(Message.channel.id, 'assistant', reply);

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
