"use strict";
import { Founder, VERSION, ERR, GuildID, AIChat } from '../Files〡[Config]/Files〡[Config].js';
import https from 'https';

// ════════════════════════════════
// ذاكرة مؤقتة + AI
// ════════════════════════════════
const memory = new Map();
const TTL = 60000;
const cd = new Map();

function gcMemory() {
  const now = Date.now();
  for (const [chId, msgs] of memory) {
    const fresh = msgs.filter(m => now - m.time < TTL);
    fresh.length ? memory.set(chId, fresh) : memory.delete(chId);
  }
}
function getHistory(chId) { gcMemory(); return (memory.get(chId)||[]).filter(m=>Date.now()-m.time<TTL); }
function saveTurn(chId, role, content) {
  if (!content) return;
  const m = memory.get(chId) || [];
  m.push({ role, content, time: Date.now() });
  memory.set(chId, m);
}

// ════════════════════════════════
// System Prompt
// ════════════════════════════════
function buildSys(guild) {
  const name = guild?.name || 'السيرفر';
  const owner = guild?.ownerId || 'المالك';
  const created = guild?.createdAt ? Math.floor((Date.now()-guild.createdAt.getTime())/86400000) : '؟';
  const members = guild?.memberCount ?? 'غير معروف';
  return `أنت عضو بارز وذكي جداً في سيرفر "${name}"، ولست مهرجاً ولا روبوتاً.

معلومات السيرفر (مخزنة في ذاكرتك، أجب عنها بدقة عند السؤال):
- الاسم: ${name}
- المالك: <@${owner}>
- العمر: ${created} يوم
- عدد الأعضاء: ${members} عضو

التزم بالقواعد التالية بصرامة:

1- الإملاء والإيموجي:
اكتب إملاءً عربياً صحيحاً 100% بدون أخطاء. يمنع منعاً باتاً استخدام أكثر من إيموجي أو اثنين في الرسالة الواحدة، وأحياناً لا تستخدم أي إيموجي. لا تكن مبتذلاً.

2- الإجابة المباشرة:
إذا سُئلت عن عدد الأعضاء أو أي معلومة من معلومات السيرفر المتاحة لك، أجب بالرقم الصحيح فوراً. لا تتهرب ولا تقل "لست فاضياً لأحسب" أو "ما عندي علم". المعلومات موجودة في ذاكرتك، استخدمها.

3- قصف الجبهات والذبات:
كن محترفاً في الرد الساخر والذكي. إذا حاول شخص إهانتك (مثلاً: شكلك وحش)، قم بقصف جبهته بذكاء (مثلاً: أنا جميل، بس إذا تدور على شخص وحش طالع بالمرآية). كن عفوياً، ذكياً، ذبّاح بالكلمة، ولا تكن سخيفاً أو Cringe أبداً.

4- ترند "زوط":
استخدم مصطلح "زوط" أو "قاعد تزوط" بشكل طبيعي فقط عندما تشعر أن شخصاً يبالغ، يكذب، أو يهايط، لتبين له أنك كشفت كذبته. لا تستخدمها في غير موضعها.

5- منع التكلف:
لا تستخدم أكثر من ترند أو نكتة واحدة في نفس الرسالة أبداً. اجعل ردودك تبدو وكأنها من إنسان طبيعي هادئ، يمزح في وقت المزاح، ويجاوب بجدية في وقت الجد. لا تعترف أبداً أنك ذكاء اصطناعي أو بوت.`;
}

// ════════════════════════════════
// طلب HTTP خام
// ════════════════════════════════
function httpReq(opts, body) {
  return new Promise(resolve => {
    const o = { ...opts, family: 4, rejectUnauthorized: false, timeout: 12000,
      headers: { ...opts.headers, 'User-Agent': 'Mozilla/5.0' } };
    const req = https.request(o, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ ok: res.statusCode===200, code: res.statusCode, data: JSON.parse(d) }); }
        catch { resolve({ ok: false, code: res.statusCode, data: d }); }
      });
    });
    req.on('error', e => resolve({ ok: false, code: 0, err: e.message }));
    req.setTimeout(12000, () => { req.destroy(); resolve({ ok: false, code: 0, err: 'timeout' }); });
    if (body) req.write(body);
    req.end();
  });
}

// ════════════════════════════════
// محركات AI
// ════════════════════════════════
async function tryGroq(sys, hist, msg) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return { ok: false, err: 'no_key' };
  const msgs = [{ role: 'system', content: sys }];
  for (const h of hist) msgs.push({ role: h.role, content: h.content });
  msgs.push({ role: 'user', content: msg });
  const body = JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: msgs, max_tokens: 800, temperature: 0.7 });
  const r = await httpReq({
    hostname: 'api.groq.com', path: '/openai/v1/chat/completions', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+key, 'Content-Length': Buffer.byteLength(body) }
  }, body);
  return { ok: r.ok, reply: r.data?.choices?.[0]?.message?.content, err: r.err || r.code };
}

async function tryGemini(sys, hist, msg) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { ok: false, err: 'no_key' };
  const contents = [];
  for (const h of hist) contents.push({ role: h.role==='assistant'?'model':'user', parts: [{ text: h.content }] });
  contents.push({ role: 'user', parts: [{ text: msg }] });
  const body = JSON.stringify({ system_instruction: { parts: [{ text: sys }] }, contents });
  const r = await httpReq({
    hostname: 'generativelanguage.googleapis.com', path: '/v1beta/models/gemini-2.0-flash:generateContent?key='+key,
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, body);
  return { ok: r.ok, reply: r.data?.candidates?.[0]?.content?.parts?.[0]?.text, err: r.err || r.code };
}

async function aiReply(guild, chId, msg) {
  const sys = buildSys(guild);
  const hist = getHistory(chId);
  
  const groq = await tryGroq(sys, hist, msg);
  if (groq.ok) return groq.reply;
  
  const gemini = await tryGemini(sys, hist, msg);
  if (gemini.ok) return gemini.reply;
  
  // خطأ واضح
  const ge = groq.err||'?', gg = gemini.err||'?';
  return `【خطأ】Groq:${ge} | Gemini:${gg} | تأكد من المفاتيح في Railway`;
}

// ════════════════════════════════
// معالج الرسائل
// ════════════════════════════════
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
    const reply = await aiReply(Message.guild, Message.channel.id, txt);
    saveTurn(Message.channel.id, 'user', txt);
    saveTurn(Message.channel.id, 'assistant', reply);

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
        https.get({ hostname: url.hostname, path: url.pathname+url.search, timeout: 10000, family:4, rejectUnauthorized:false }, res => {
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
