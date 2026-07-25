"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';

// ─── تسجيل خط Noto Sans Math لرموز 𝑪𝑰𝑨〢 ───
const ROOT = process.cwd();
try {
  const canvasMod = await import('canvas');
  canvasMod.registerFont(ROOT + '/NotoSansMath.ttf', { family: 'Noto Sans Math' });
  canvasMod.registerFont(ROOT + '/NotoSansArabic.ttf', { family: 'Noto Sans Arabic' });
  canvasMod.registerFont(ROOT + '/NotoEmoji.ttf', { family: 'Noto Emoji' });
} catch(e) { console.error('[/مطلوب] Font register:', e.message); }

function cleanName(text) {
  if (!text) return '';
  return text
    .replace(/<a?:\w+:\d+>/g, '')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '')
    .replace(/\s+/g, ' ').trim();
}

function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + w).length > maxChars && cur.length > 0) {
      lines.push(cur.trim());
      cur = w + ' ';
    } else { cur += w + ' '; }
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

export default {
    name: "مطلوب",
    description: "إنشاء بوستر WANTED كلاسيكي",
    type: 1,
    options: [
        { name: "العضو", description: "اختر العضو", type: ApplicationCommandOptionType.User, required: true },
        { name: "الجائزة", description: "مبلغ الجائزة", type: ApplicationCommandOptionType.String, required: true },
        { name: "السبب", description: "سبب المطلوبية", type: ApplicationCommandOptionType.String, required: true },
    ],
    run: async (Client, Message) => {
        await Message.deferReply();
        try {
            const user = Message.options.getUser('العضو');
            const bounty = Message.options.getString('الجائزة');
            const reason = Message.options.getString('السبب');
            const member = Message.guild.members.cache.get(user.id);
            const name = cleanName(member?.displayName || user.username);

            const fs = await import('fs');
            const bgBuf = fs.readFileSync(process.cwd() + '/Files〡[Resource]/Files〡[Image]/wanted_bg.png');
            const bgImg = await loadImage(bgBuf);
            const avatar = await loadImage(user.displayAvatarURL({ extension: 'png', size: 512 }));

            const W = 923, H = 1152;
            const FONT = 'Arial, Noto Sans Arabic, Tahoma, DejaVu Sans, sans-serif';

            const canvas = new Canvas(W, H)
                .printImage(bgImg, 0, 0, W, H)
                // صورة العضو مع B&W/Sepia
                .printImage(avatar, 347, 370, 240, 300)
                .setColor('rgba(0,0,0,0.25)')
                .printRectangle(347, 370, 240, 300)
                .setColor('rgba(112,66,20,0.30)')
                .printRectangle(347, 370, 240, 300)
                .setColor('rgba(0,0,0,0.20)')
                .printRectangle(343, 366, 248, 308);

            // الاسم - خط يدعم الرموز الخاصة + Courier للشكل الكلاسيكي
            canvas.setColor('#1a1a1a')
                .setTextFont('bold 55px Noto Sans Math, Noto Sans Arabic, DejaVu Sans, Courier New, sans-serif')
                .setTextAlign('center')
                .printText(name, 467, 750);

            // الجائزة
            canvas.setColor('#8B0000')
                .setTextFont('bold 65px ' + FONT)
                .setTextAlign('center')
                .printText('REWARD: $' + bounty, 467, 880);

            // السبب مع التفاف النص
            canvas.setColor('#1a1a1a')
                .setTextFont('55px ' + FONT)
                .setTextAlign('center');

            const lines = wrapText(reason, 25);
            let yPos = 990;
            for (let i = 0; i < Math.min(lines.length, 3); i++) {
                canvas.printText(lines[i], 467, yPos);
                yPos += 70;
            }

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'wanted.png' })] });
        } catch (e) {
            console.error('[/مطلوب] Error:', e.stack || e.message);
            await Message.editReply({ content: '❌ خطأ: ' + (e.message?.substring(0, 300) || 'حدث خطأ غير معروف') });
        }
    }
};