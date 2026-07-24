// ═══════════════════════════════════════════════════════════════
// Discord AI Chatbot - بوت ديسكورد ذكي
// يدعم: المحادثة الذكية + استخراج النصوص من الصور (OCR)
// مدمج مع بوت CIA Community
// ═══════════════════════════════════════════════════════════════

import Tesseract from 'tesseract.js';
import { AIChat } from '../Files〡[Config]/Files〡[Config].js';

// ─── دالة استدعاء AI عبر Pollinations.ai (مجاني) ───
async function askAI(prompt) {
  const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai`;
  const res = await fetch(url);
  const text = await res.text();
  return text || '⚠️ لم أستطع الرد، حاول مجدداً';
}

// ─── معدل الاستخدام (Rate Limit) ───
const cooldowns = new Map();
const COOLDOWN_TIME = 3000; // 3 ثواني

function isOnCooldown(userId) {
  const now = Date.now();
  if (cooldowns.has(userId)) {
    const expiration = cooldowns.get(userId);
    if (now < expiration) {
      return Math.ceil((expiration - now) / 1000);
    }
  }
  cooldowns.set(userId, now + COOLDOWN_TIME);
  return 0;
}

// ─── استخراج النص من الصورة (OCR) ───
async function extractTextFromImage(url) {
  try {
    const res = await fetch(url);
    const imageBuffer = Buffer.from(await res.arrayBuffer());
    const result = await Tesseract.recognize(imageBuffer, 'eng+ara', {
      logger: () => {}, // تعطيل سجلات Tesseract
    });
    return result.data.text.trim() || '(لم يتم العثور على نص)';
  } catch (error) {
    console.error('❌ OCR Error:', error.message);
    return null;
  }
}

// ─── تقسيم النص الطويل لأجزاء ───
function splitMessage(text, maxLen = 1990) {
  const chunks = [];
  for (let i = 0; i < text.length; i += maxLen) {
    chunks.push(text.substring(i, i + maxLen));
  }
  return chunks;
}

/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Message } Message
 */
export default async function (Client, Message) {
  // تجاهل رسائل البوتات
  if (Message.author?.bot) return;

  const isChatChannel = AIChat.allowed_channel_ids?.includes(Message.channel.id);
  const isOcrChannel = AIChat.image2textChannels?.includes(Message.channel.id);

  // تجاهل إذا لم تكن القناة مفعلة للذكاء
  if (!isChatChannel && !isOcrChannel) return;

  // ─── التحقق من وجود محتوى ───
  const hasContent = Message.content?.trim().length > 0;
  const hasImage = Message.attachments?.size > 0 &&
    Message.attachments.first()?.contentType?.startsWith('image/');

  if (!hasContent && !hasImage) return;

  // ─── معدل الاستخدام ───
  const cooldownLeft = isOnCooldown(Message.author.id);
  if (cooldownLeft > 0) {
    return Message.reply(`⏳ الرجاء الانتظار **${cooldownLeft}** ثواني قبل إرسال رسالة أخرى.`).catch(() => {});
  }

  // ─── رومات استخراج النص فقط (OCR) ───
  if (isOcrChannel && hasImage) {
    await Message.channel.sendTyping();
    try {
      const attachment = Message.attachments.first();
      const extractedText = await extractTextFromImage(attachment.url);

      if (extractedText === null) {
        return Message.reply('❌ حدث خطأ أثناء قراءة الصورة، الرجاء المحاولة لاحقاً.');
      }

      await Message.reply(`📝 **النص المستخرج:**\n\`\`\`\n${extractedText || 'لا يوجد نص في الصورة'}\n\`\`\``);
    } catch (error) {
      console.error('❌ OCR Error:', error.message);
      await Message.reply('⚠️ الضغط على البوت عالٍ حالياً، الرجاء المحاولة لاحقاً.').catch(() => {});
    }
    return;
  }

  // ─── رومات الشات الذكي ───
  if (isChatChannel) {
    await Message.channel.sendTyping();

    let fullContent = Message.content;

    // إذا كان هناك صورة مرفقة في روم الشات → استخرج النص وأضفه للسؤال
    if (hasImage) {
      try {
        const attachment = Message.attachments.first();
        const textFromImage = await extractTextFromImage(attachment.url);
        if (textFromImage) {
          fullContent += `\n[محتوى الصورة: ${textFromImage}]`;
        }
      } catch (error) {
        console.error('❌ OCR Error in chat:', error.message);
      }
    }

    // ─── إرسال السؤال للذكاء الاصطناعي ───
    try {
      const replyText = await askAI(fullContent);
      if (replyText.length <= 2000) {
        await Message.reply(replyText);
      } else {
        const chunks = splitMessage(replyText);
        await Message.reply(chunks[0]);
        for (let i = 1; i < chunks.length; i++) {
          await Message.channel.send(chunks[i]);
        }
      }
    } catch (error) {
      console.error('❌ AI Error:', error.message);
      await Message.reply('⚠️ الضغط على البوت عالٍ حالياً، الرجاء المحاولة لاحقاً.').catch(() => {});
    }
  }
};
