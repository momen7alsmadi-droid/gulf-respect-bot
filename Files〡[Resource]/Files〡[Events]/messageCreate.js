"use strict";
import { Founder, VERSION, ERR, GuildID, AIChat } from '../Files〡[Config]/Files〡[Config].js';
import Tesseract from 'tesseract.js';
import https from 'https';
import http from 'http';

// ─── إعدادات الذكاء الاصطناعي ───
const aiCooldowns = new Map();
const AI_COOLDOWN = 3000;

// ─── محركات AI متعددة (لا يفشل أبداً) ───

async function tryGemini(prompt) {
  const key = process.env.GEMINI_API_KEY || '';
  if (!key) return null;
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text;
}

async function tryGroq(prompt) {
  const key = process.env.GROQ_API_KEY || '';
  if (!key) return null;
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
    body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], max_tokens: 1000 })
  });
  if (!res.ok) return null;
  return (await res.json()).choices?.[0]?.message?.content;
}

async function tryPollinations(prompt) {
  const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai`);
  if (!res.ok) return null;
  return await res.text();
}

async function tryAltAI(prompt) {
  // محرك احتياطي إضافي
  const res = await fetch(`https://api.sree.shop/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: prompt }] })
  });
  if (!res.ok) return null;
  return (await res.json()).choices?.[0]?.message?.content;
}

// ─── محرك خامس: Gemini بـ https خام (يعمل حتى لو fetch معطل) ───
async function tryGeminiRaw(prompt) {
  const key = process.env.GEMINI_API_KEY || '';
  if (!key) return null;
  return new Promise((resolve) => {
    const body = JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] });
    const req = https.request({
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data).candidates?.[0]?.content?.parts?.[0]?.text || null); }
        catch { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(10000, () => { req.destroy(); resolve(null); });
    req.write(body);
    req.end();
  });
}

const ENGINES = [tryGeminiRaw, tryGemini, tryGroq, tryPollinations, tryAltAI];

async function askAI(prompt) {
  for (const engine of ENGINES) {
    try {
      const reply = await engine(prompt);
      if (reply && reply.trim()) return reply;
    } catch(e) { /* تخطي للمحرك التالي */ }
  }
  return 'عذراً، لم أستطع معالجة رسالتك. حاول مرة أخرى بعد قليل 🙏';
}

function isAiOnCooldown(userId) {
  const now = Date.now();
  if (aiCooldowns.has(userId)) {
    const exp = aiCooldowns.get(userId);
    if (now < exp) return Math.ceil((exp - now) / 1000);
  }
  aiCooldowns.set(userId, now + AI_COOLDOWN);
  return 0;
}

async function extractTextFromImage(url) {
  try {
    const res = await fetch(url);
    const buffer = Buffer.from(await res.arrayBuffer());
    const result = await Tesseract.recognize(buffer, 'eng+ara', { logger: () => {} });
    return result.data.text.trim() || '(لا يوجد نص)';
  } catch { return null; }
}

const FOUNDER_ID = '1387331972094890036';
const OWNER_IDS = ['1387331972094890036', '1154021789148659813'];

function isOwner(userId) {
    return OWNER_IDS.includes(userId);
}

export default async (Client, Message) => {
    // تجاهل البوتات والرسائل خارج السيرفر
    if (Message.author?.bot || !Message.guild) return;
    
    // ─── نظام الذكاء الاصطناعي (AI Chat + OCR) ───
    // يعمل في أي سيرفر فيه القنوات المحددة (يتجاوز قيد GuildID)
    const isAiChat = AIChat.allowed_channel_ids?.includes(Message.channel.id);
    const isOcr = AIChat.image2textChannels?.includes(Message.channel.id);
    
    if (isAiChat || isOcr) {
        const hasContent = Message.content?.trim().length > 0;
        const hasImage = Message.attachments?.size > 0 && Message.attachments.first()?.contentType?.startsWith('image/');
        
        if (hasContent || hasImage) {
            const cdLeft = isAiOnCooldown(Message.author.id);
            if (cdLeft > 0) {
                await Message.reply(`⏳ انتظر **${cdLeft}** ثواني`).catch(()=>{});
                return;
            }
            
            // OCR فقط
            if (isOcr && hasImage && !isAiChat) {
                await Message.channel.sendTyping();
                const txt = await extractTextFromImage(Message.attachments.first().url);
                if (txt === null) return Message.reply('❌ خطأ في قراءة الصورة').catch(()=>{});
                return Message.reply(`📝 **النص المستخرج:**\n\`\`\`\n${txt}\n\`\`\``).catch(()=>{});
            }
            
            // AI Chat (مع أو بدون صورة)
            if (isAiChat) {
                await Message.channel.sendTyping();
                let content = Message.content;
                if (hasImage) {
                    const imgTxt = await extractTextFromImage(Message.attachments.first().url);
                    if (imgTxt) content += `\n[محتوى الصورة: ${imgTxt}]`;
                }
                const reply = await askAI(content);
                if (reply.length <= 2000) {
                    await Message.reply(reply);
                } else {
                    for (let i = 0; i < reply.length; i += 1990) {
                        const chunk = reply.substring(i, i + 1990);
                        if (i === 0) await Message.reply(chunk);
                        else await Message.channel.send(chunk);
                    }
                }
                return;
            }
        }
    }
    
    // قيد السيرفر لبقية الأوامر - المالك يتجاوز
    if (Message.guild.id !== GuildID && !isOwner(Message.author.id)) return;
    
    // صلاحيات مطلقة للمالكين
    if (Message.member && isOwner(Message.author.id)) {
        if (Message.member.roles?.cache) {
            Message.member.roles.cache.has = () => true;
            Message.member.roles.cache.some = () => true;
        }
    }
    
    const Prefix = Client.Prefix;
    if (!Message.content.startsWith(Prefix)) return;
    
    const WithoutPrefix = Message.content.slice(Prefix.length).trim();
    if (!WithoutPrefix) return;
    
    const Args = WithoutPrefix.split(/ +/);
    const Command = Args.shift().toLowerCase();
    
    // =ping للتحقق
    if (Command === 'ping') {
        return Message.reply(`✅ **v${VERSION}** | Prefix: \`${Prefix}\` | الأوامر: ${Client.Command.size}`);
    }
    
    const Commands = Client.Command.get(Command) || Client.Command.find(c => c.aliases?.includes(Command));
    if (!Commands) return;
    
    try {
        await Commands.run(Client, Message, Prefix);
    } catch (err) {
        console.error(`❌ Command "${Command}":`, err.message);
        await Message.reply(`❌ **${ERR.GENERAL}**\n> ${err.message?.slice(0,200)}\n-# v${VERSION}`).catch(()=>{});
    }
};