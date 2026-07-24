"use strict";
import { Founder, VERSION, ERR, GuildID, AIChat } from '../Files〡[Config]/Files〡[Config].js';
import https from 'https';

// ═══════════════════════════════════════════
// نظام الذكاء الاصطناعي - Gemini + Groq فقط
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
  return `أنت لست ذكاءً اصطناعياً أو روبوتاً آلياً، أنت عضو "جيمر" أساسي، مرح، مشاغب، وساخر جداً في سيرفر "${name}".

معلومات السيرفر:
- اسم السيرفر: ${name}
- المالك: <@${owner}>
- عمر السيرفر: ${created} يوم
- أنت عضو محبوب وأسطوري هنا.

أسلوبك في الكلام:
- عفوي ويشبه لغة الشباب والديسكورد
- استخدم الميمز والكلمات الدارجة والإيموجيز (😂، 💀، 🤡، 🔥، 👀) بكثرة وبشكل طبيعي
- لا تقدم إجابات موسوعية طويلة أو جافة أبداً
- إذا سألك شخص سؤالاً غبياً أو استفزازياً، قم بالرد بقصف جبهة خفيف ومضحك
- إذا دخل أشخاص وقالوا "نحن من طرف فلان" أو "السيرفر من طرف فلان"، تفاعل معهم بحيوية ومزاح (مثلاً: خلاص السيرفر صار حق فلان أعطوه الملكية وخلونا نطلع)
- لا تشرح أبداً من هو هذا الشخص
- تفاعل مع الأعضاء وكأنك جالس مع أصدقائك في مقهى
- لا تعترف أبداً أنك مبرمج أو ذكاء اصطناعي أو بوت، بل أنت عضو أسطوري في السيرفر
- إذا سألوك من أنت، قل إنك "أسطورة السيرفر" أو "الجيمر الأسطوري"
- ردودك قصيرة، سريعة، ومضحكة`;
}

async function askGroq(sysPrompt, userMsg) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;
  const body = JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: sysPrompt },
      { role: 'user', content: userMsg }
    ],
    max_tokens: 800,
    temperature: 0.9
  });
  const { ok, data } = await httpsReq({
    hostname: 'api.groq.com',
    path: '/openai/v1/chat/completions',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key, 'Content-Length': Buffer.byteLength(body) }
  }, body);
  return ok ? data?.choices?.[0]?.message?.content : null;
}

async function askGemini(sysPrompt, userMsg) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const body = JSON.stringify({
    system_instruction: { parts: [{ text: sysPrompt }] },
    contents: [{ parts: [{ text: userMsg }] }]
  });
  const { ok, data } = await httpsReq({
    hostname: 'generativelanguage.googleapis.com',
    path: '/v1beta/models/gemini-2.0-flash:generateContent?key=' + key,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, body);
  return ok ? data?.candidates?.[0]?.content?.parts?.[0]?.text : null;
}

async function aiReply(guild, userMsg) {
  const sys = buildSystemPrompt(guild);
  const groq = await askGroq(sys, userMsg);
  if (groq) return groq;
  const gemini = await askGemini(sys, userMsg);
  if (gemini) return gemini;
  return 'والله يالعسل الذكاء شوي متعبط اليوم، ارجع بعد شوي وجيب سالفة حلوة 😂🔥';
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
    const reply = await aiReply(Message.guild, txt);
    
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
