"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';

const F = (s, w='') => `${w} ${s}px Noto Sans Arabic, Noto Emoji, Noto Sans Math, Noto Sans Symbols2, DejaVu Sans, sans-serif`.trim();

function sanitize(text) {
  if (!text) return '';
  return text
    .replace(/<a?:\w+:\d+>/g, '')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '')
    .replace(/\s+/g, ' ').trim();
}

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
    name: "عاجل",
    description: "شريط أخبار عاجل تلفزيوني",
    type: 1,
    options: [
        { name: "العضو", description: "اختر العضو", type: ApplicationCommandOptionType.User, required: true },
        { name: "نص_الخبر", description: "نص الخبر العاجل", type: ApplicationCommandOptionType.String, required: true },
    ],
    run: async (Client, Message) => {
        try {
            const canvasMod = await import('canvas');
            canvasMod.registerFont('NotoSansArabic.ttf', { family: 'Noto Sans Arabic' });
            canvasMod.registerFont('NotoEmoji.ttf', { family: 'Noto Emoji' });
            canvasMod.registerFont('NotoSansMath.ttf', { family: 'Noto Sans Math' });
        } catch {}
        await Message.deferReply();
        try {
            const user = Message.options.getUser('العضو');
            const newsText = Message.options.getString('نص_الخبر');
            const avatar = await loadImage(user.displayAvatarURL({ extension: 'png', size: 512 }));
            const name = sanitize(user.username);

            const W = 900, H = 506; // 16:9

            const canvas = new Canvas(W, H)
                // صورة العضو كخلفية كاملة
                .printImage(avatar, 0, 0, W, H)
                // تدرج داكن من الأعلى
                .setColor('rgba(0,0,0,0.45)').printRectangle(0, 0, W, 120)
                // تدرج داكن من الأسفل
                .setColor('rgba(0,0,0,0.55)').printRectangle(0, H-180, W, 180);

            // علامة LIVE حمراء أعلى اليمين
            canvas.setColor('#cc0000').printRoundedRectangle(W-140, 20, 120, 36, 4)
                .setColor('#ffffff').setTextFont(F(16, 'bold')).setTextAlign('center')
                .printText('● LIVE', W-80, 46);

            // عنوان القناة
            canvas.setColor('#ffffff')
                .setTextFont(F(18, 'bold')).setTextAlign('left')
                .printText('♜ CIA NEWS', 30, 50)
                .setColor('#cc0000')
                .setTextFont(F(19, 'bold'))
                .printText('| BREAKING NEWS', 180, 50);

            // شريط الخبر السفلي (Lower Third) - أحمر شفاف
            canvas.setColor('rgba(180,0,0,0.85)').printRectangle(0, H-180, W, 180)
                // شريط فاصل
                .setColor('#ff3333').printRectangle(0, H-180, W, 4);

            // اسم العضو
            canvas.setColor('#ffffff')
                .setTextFont(F(22, 'bold')).setTextAlign('left')
                .printText(name, 30, H-130);

            // خط تحت الاسم
            canvas.setColor('rgba(255,255,255,0.3)').printRectangle(30, H-118, 200, 1);

            // تصنيف
            canvas.setTextFont(F(13, 'bold'))
                .printText('SPECIAL REPORT • CIA COMMUNITY', 30, H-95);

            // نص الخبر مع التفاف النص
            const newsLines = wrapText(newsText, 60);
            canvas.setTextAlign('left');
            let ny = H-60;
            for (let i = 0; i < Math.min(newsLines.length, 3); i++) {
                canvas.setColor('#ffffff').setTextFont(F(20, 'bold'))
                    .printText(newsLines[i], 30, ny);
                ny += 32;
            }

            // شعار القناة سفلي يمين
            canvas.setColor('rgba(255,255,255,0.5)')
                .setTextFont(F(10)).setTextAlign('right')
                .printText('CIA NEWS NETWORK • 24/7', W-30, H-10);

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'breaking-news.png' })] });
        } catch (e) {
            await Message.editReply({ content: '❌ خطأ: ' + e.message });
        }
    }
};