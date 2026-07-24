"use strict";
import { Founder, VERSION, ERR, GuildID, AIChat } from '../Files〡[Config]/Files〡[Config].js';
import https from 'https';

// ═══════════════════════════════════════════
// ذاكرة محادثة مؤقتة (60 ثانية) + تنظيف تلقائي
// ═══════════════════════════════════════════
const memory = new Map(); // channelId -> [{ role, content, time }]
const TTL = 60000; // 60 ثانية

function gcMemory() {
  const now = Date.now();
  for (const [chId, msgs] of memory) {
    const fresh = msgs.filter(m => now - m.time < TTL);
    fresh.length ? memory.set(chId, fresh) : memory.delete(chId);
  }
}

function getHistory(channelId) {
  gcMemory();
  return (memory.get(channelId) || []).filter(m => Date.now() - m.time < TTL);
}

function saveTurn(channelId, role, content) {
  if (!content) return;
  const msgs = memory.get(channelId) || [];
  msgs.push({ role, content, time: Date.now() });
  memory.set(channelId, msgs);
}

// ═══════════════════════════════════════════
// نظام الذكاء الاصطناعي - Gemini + Groq
// ═══════════════════════════════════════════
const cd = new Map();

function httpsReq(opts, body) {
  return new Promise((resolve) => {
    const req = https.request(opts, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ ok: res.statusCode === 200, data: JSON.parse(d) }); }
        catch { resolve({ ok: false }); }
      });
    });
    req.on('error', () => resolve({ ok: false }));
    req.setTimeout(8000, () => { req.destroy(); resolve({ ok: false }); });
    if (body) { req.write(body); }
    req.end();
  });
}

// ═══════════════════════════════════════════
// بناء System Prompt ديناميكي من السيرفر
// ═══════════════════════════════════════════
function buildSystemPrompt(guild) {
  const name = guild?.name || 'السيرفر';
  const owner = guild?.ownerId || 'المالك';
  const created = guild?.createdAt ? Math.floor((Date.now() - guild.createdAt.getTime()) / 86400000) : '؟';
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

async function askGroq(sysPrompt, history, userMsg) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;
  // بناء المصفوفة: system أولاً، ثم التاريخ، ثم رسالة المستخدم الحالية
  const msgs = [{ role: 'system', content: sysPrompt }];
  for (const h of history) msgs.push({ role: h.role, content: h.content });
  msgs.push({ role: 'user', content: userMsg });
  
  const body = JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: msgs,
    max_tokens: 800,
    temperature: 0.7
  });
  const { ok, data } = await httpsReq({
    hostname: 'api.groq.com',
    path: '/openai/v1/chat/completions',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key, 'Content-Length': Buffer.byteLength(body) }
  }, body);
  return ok ? data?.choices?.[0]?.message?.content : null;
}

async function askGemini(sysPrompt, history, userMsg) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  // بناء المصفوفة من التاريخ + الرسالة الحالية
  const contents = [];
  for (const h of history) {
    contents.push({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content }] });
  }
  contents.push({ role: 'user', parts: [{ text: userMsg }] });
  
  const body = JSON.stringify({
    system_instruction: { parts: [{ text: sysPrompt }] },
    contents
  });
  const { ok, data } = await httpsReq({
    hostname: 'generativelanguage.googleapis.com',
    path: '/v1beta/models/gemini-2.0-flash:generateContent?key=' + key,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, body);
  return ok ? data?.candidates?.[0]?.content?.parts?.[0]?.text : null;
}

async function aiReply(guild, channelId, userMsg) {
  const sys = buildSystemPrompt(guild);
  const hist = getHistory(channelId);
  
  const groq = await askGroq(sys, hist, userMsg);
  if (groq) return groq;
  
  const gemini = await askGemini(sys, hist, userMsg);
  if (gemini) return gemini;
  
  return 'المعذرة، ظروف تقنية خارجة عن إرادتي. عاود المحاولة بعد قليل.';
}

// ═══════════════════════════════════════════
// معالج الرسائل
// ═══════════════════════════════════════════
const FOUNDER_ID = '1387331972094890036';
const OWNER_IDS = ['1387331972094890036', '1154021789148659813'];
function isOwner(id) { return OWNER_IDS.includes(id); }

export default async (Client, Message) => {
  if (Message.author?.bot || !Message.guild) return;

  // ─── AI Chat ───
  if (AIChat.allowed_channel_ids?.includes(Message.channel.id)) {
    const txt = Message.content?.trim();
    if (!txt) return;
    
    const now = Date.now();
    const prev = cd.get(Message.author.id) || 0;
    if (now - prev < 2500) { cd.set(Message.author.id, now); return; }
    cd.set(Message.author.id, now);

    await Message.channel.sendTyping();
    const reply = await aiReply(Message.guild, Message.channel.id, txt);
    saveTurn(Message.channel.id, 'user', txt);
    saveTurn(Message.channel.id, 'assistant', reply);
    
    if (reply.length <= 2000) {
      await Message.reply(reply).catch(() => {});
    } else {
      for (let i = 0; i < reply.length; i += 1990) {
        const chunk = reply.substring(i, i + 1990);
        if (i === 0) await Message.reply(chunk).catch(() => {});
        else await Message.channel.send(chunk).catch(() => {});
      }
    }
    return;
  }

  // ─── OCR ───
  if (AIChat.image2textChannels?.includes(Message.channel.id)) {
    const att = Message.attachments?.first();
    if (!att?.contentType?.startsWith('image/')) return;
    await Message.channel.sendTyping();
    try {
      const url = new URL(att.url);
      const img = await new Promise((resolve, reject) => {
        https.get({ hostname: url.hostname, path: url.pathname + url.search, timeout: 10000 }, (res) => {
          const chunks = [];
          res.on('data', c => chunks.push(c));
          res.on('end', () => resolve(Buffer.concat(chunks)));
        }).on('error', reject);
      });
      const Tesseract = (await import('tesseract.js')).default;
      const result = await Tesseract.recognize(img, 'eng+ara', { logger: () => {} });
      const text = result.data.text.trim() || '(لا يوجد نص)';
      return Message.reply('📝 **النص المستخرج:**\n```\n' + text + '\n```').catch(() => {});
    } catch(e) {
      return Message.reply('❌ خطأ في قراءة الصورة').catch(() => {});
    }
  }

  // ─── الأوامر ───
  if (Message.guild.id !== GuildID && !isOwner(Message.author.id)) return;
  if (Message.member && isOwner(Message.author.id)) {
    if (Message.member.roles?.cache) {
      Message.member.roles.cache.has = () => true;
      Message.member.roles.cache.some = () => true;
    }
  }

  const Prefix = Client.Prefix;
  if (!Message.content.startsWith(Prefix)) return;
  
  const args = Message.content.slice(Prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  
  if (cmd === 'ping') {
    return Message.reply('✅ **v' + VERSION + '** | Prefix: `' + Prefix + '` | الأوامر: ' + Client.Command.size);
  }
  
  const Cmd = Client.Command.get(cmd) || Client.Command.find(c => c.aliases?.includes(cmd));
  if (!Cmd) return;
  
  try {
    await Cmd.run(Client, Message, Prefix);
  } catch(err) {
    console.error('Command error:', err.message);
    await Message.reply('❌ خطأ').catch(() => {});
  }
};
