"use strict";
import { Founder, VERSION, ERR, GuildID, AIChat } from '../Files〡[Config]/Files〡[Config].js';
import https from 'https';

// ─── الذكاء الاصطناعي - بسيط ومضمون ───
const cd = new Map();

async function aiReply(prompt) {
  return new Promise((resolve) => {
    // المحاولة 1: Gemini
    const gk = process.env.GEMINI_API_KEY || '';
    if (gk) {
      const body = JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] });
      const req = https.request({
        hostname: 'generativelanguage.googleapis.com',
        path: '/v1beta/models/gemini-2.0-flash:generateContent?key=' + gk,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
        timeout: 8000
      }, (res) => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          try {
            const txt = JSON.parse(d).candidates?.[0]?.content?.parts?.[0]?.text;
            if (txt) return resolve(txt);
          } catch(e) {}
          // فشل Gemini، جرب Pollinations
          tryPollinations();
        });
      });
      req.on('error', () => tryPollinations());
      req.setTimeout(8000, () => { req.destroy(); tryPollinations(); });
      req.write(body);
      req.end();
      return;
    }
    tryPollinations();

    function tryPollinations() {
      const req = https.get({
        hostname: 'text.pollinations.ai',
        path: '/' + encodeURIComponent(prompt) + '?model=openai',
        timeout: 8000
      }, (res) => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => resolve(d || 'آسف، لم أفهم رسالتك. حاول مجدداً 🙏'));
      });
      req.on('error', () => resolve('آسف، لم أفهم رسالتك. حاول مجدداً 🙏'));
      req.setTimeout(8000, () => { req.destroy(); resolve('آسف، لم أفهم رسالتك. حاول مجدداً 🙏'); });
    }
  });
}

// ─── معالج الرسائل ───
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
    if (now - prev < 3000) return; // 3s cooldown silently
    cd.set(Message.author.id, now);

    await Message.channel.sendTyping();
    const reply = await aiReply(txt);
    
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
    // OCR mode - simplified, returns text from image
    const att = Message.attachments?.first();
    if (!att?.contentType?.startsWith('image/')) return;
    await Message.channel.sendTyping();
    try {
      // Use https to fetch image
      const url = new URL(att.url);
      const img = await new Promise((resolve, reject) => {
        https.get({ hostname: url.hostname, path: url.pathname + url.search, timeout: 10000 }, (res) => {
          const chunks = [];
          res.on('data', c => chunks.push(c));
          res.on('end', () => resolve(Buffer.concat(chunks)));
        }).on('error', reject).setTimeout(10000, function() { this.destroy(); reject(new Error('timeout')); });
      });
      // Dynamic import tesseract only when needed
      const Tesseract = (await import('tesseract.js')).default;
      const result = await Tesseract.recognize(img, 'eng+ara', { logger: () => {} });
      const text = result.data.text.trim() || '(لا يوجد نص)';
      return Message.reply('📝 **النص المستخرج:**\n```\n' + text + '\n```').catch(() => {});
    } catch(e) {
      return Message.reply('❌ خطأ في قراءة الصورة').catch(() => {});
    }
  }

  // ─── باقي الأوامر ───
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
    console.error('❌ Command "' + cmd + '":', err.message);
    await Message.reply('❌ **' + ERR.GENERAL + '**\n> ' + err.message?.slice(0,200) + '\n-# v' + VERSION).catch(() => {});
  }
};
