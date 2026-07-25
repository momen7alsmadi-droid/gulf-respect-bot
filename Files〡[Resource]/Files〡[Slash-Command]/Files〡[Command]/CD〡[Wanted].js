"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';

// تحميل الخطوط
try {
  const canvasMod = await import('canvas');
  canvasMod.registerFont('NotoSansArabic.ttf', { family: 'Noto Sans Arabic' });
  canvasMod.registerFont('NotoEmoji.ttf', { family: 'Noto Emoji' });
  canvasMod.registerFont('NotoSansMath.ttf', { family: 'Noto Sans Math' });
} catch {}

const F = (s, w='') => `${w} ${s}px Noto Sans Arabic, Noto Emoji, Noto Sans Math, Noto Sans Symbols2, DejaVu Sans, sans-serif`.trim();

// تنظيف الأسماء فقط (وليس السيرفر)
function sanitize(text) {
  if (!text) return '';
  return text
    .replace(/<a?:\w+:\d+>/g, '')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '')
    .replace(/\s+/g, ' ').trim();
}

// التفاف النص الطويل لعدة أسطر
function wrapText(text, maxCharsPerLine) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + word).length > maxCharsPerLine && current.length > 0) {
      lines.push(current.trim());
      current = word + ' ';
    } else {
      current += word + ' ';
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines;
}

export default {
    name: "مطلوب",
    description: "إنشاء بوستر WANTED كلاسيكي",
    type: 1,
    options: [
        { name: "العضو", description: "اختر العضو المطلوب", type: ApplicationCommandOptionType.User, required: true },
        { name: "الجائزة", description: "مبلغ الجائزة (مثال: 1000000)", type: ApplicationCommandOptionType.String, required: true },
        { name: "السبب", description: "سبب المطلوبية", type: ApplicationCommandOptionType.String, required: true },
    ],
    run: async (Client, Message) => {
        await Message.deferReply();
        try {
            const user = Message.options.getUser('العضو');
            const bounty = Message.options.getString('الجائزة');
            const reason = Message.options.getString('السبب');
            const member = Message.guild.members.cache.get(user.id);
            const name = sanitize(member?.displayName || user.username);

            // صورة العضو
            const avatar = await loadImage(user.displayAvatarURL({ extension: 'png', size: 256 }));

            const W = 800, H = 1000;
            const canvas = new Canvas(W, H)
                // خلفية بيج قديمة
                .setColor('#f4e4c1').printRectangle(0, 0, W, H)
                // إطار خشن داكن
                .setColor('#3b2f2f').printRectangle(20, 20, W-40, H-40)
                .setColor('#f4e4c1').printRectangle(30, 30, W-60, H-60)
                .setColor('#3b2f2f').printRectangle(40, 40, W-80, H-80)
                .setColor('#f4e4c1').printRectangle(50, 50, W-100, H-100)
                // WANTED كبير بالأعلى
                .setColor('#8b0000')
                .setTextFont(F(72, 'bold')).setTextAlign('center')
                .printText('WANTED', W/2, 150)
                // خط تحت WANTED
                .setColor('#3b2f2f')
                .printRectangle(W/2-180, 170, 360, 4)
                // نص DEAD OR ALIVE
                .setColor('#5c0000')
                .setTextFont(F(22, 'bold'))
                .printText('DEAD OR ALIVE', W/2, 215)
                // صورة العضو بتدرج الأبيض والأسود
                .setColor('#ffffff').printRoundedRectangle(W/2-115, 240, 230, 270, 8)
                .setColor('#3b2f2f').printRoundedRectangle(W/2-118, 237, 236, 276, 10);

            // رسم الصورة (تحاكي الأبيض والأسود عبر طباعة مرتين بتشبع مختلف)
            canvas.printImage(avatar, W/2-110, 245, 220, 260);

            // Overlay رمادي لتأثير B&W
            canvas.setColor('rgba(0,0,0,0.15)').printRectangle(W/2-110, 245, 220, 260);

            // الاسم
            canvas.setColor('#3b2f2f')
                .setTextFont(F(34, 'bold')).setTextAlign('center')
                .printText(name, W/2, 560);

            // خط فاصل
            canvas.setColor('#8b0000').printRectangle(W/2-100, 580, 200, 2);

            // الجائزة
            canvas.setColor('#5c0000')
                .setTextFont(F(20, 'bold'))
                .printText('REWARD: $' + bounty, W/2, 625);

            // السبب مع التفاف النص
            canvas.setColor('#3b2f2f')
                .setTextFont(F(18)).setTextAlign('center');
            const reasonLines = wrapText(reason, 40);
            let yOffset = 670;
            for (const line of reasonLines) {
                canvas.printText(line, W/2, yOffset);
                yOffset += 32;
            }

            // تذييل
            canvas.setColor('#8b0000')
                .setTextFont(F(14, 'bold'))
                .printText('♜ CIA COMMUNITY • BOUNTY DIVISION ♜', W/2, H-60);

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'wanted.png' })] });
        } catch (e) {
            await Message.editReply({ content: '❌ خطأ: ' + e.message });
        }
    }
};