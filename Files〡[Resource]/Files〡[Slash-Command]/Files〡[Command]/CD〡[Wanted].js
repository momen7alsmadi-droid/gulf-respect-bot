"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';

// تنظيف الاسم
function cleanName(text) {
  if (!text) return '';
  return text
    .replace(/<a?:\w+:\d+>/g, '')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '')
    .replace(/\s+/g, ' ').trim();
}

// التفاف النص العربي لعدة أسطر
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
        { name: "العضو", description: "اختر العضو المطلوب", type: ApplicationCommandOptionType.User, required: true },
        { name: "الجائزة", description: "مبلغ الجائزة (مثال: 10000)", type: ApplicationCommandOptionType.String, required: true },
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

            // تحميل الصور - الخلفية من المشروع
            const fs = await import('fs');
            const bgBuf = fs.readFileSync(process.cwd() + '/Files〡[Resource]/Files〡[Image]/wanted_bg.png');
            const bgImg = await loadImage(bgBuf);
            const avatar = await loadImage(user.displayAvatarURL({ extension: 'png', size: 512 }));

            // أبعاد الكانفاس = أبعاد الصورة الأصلية
            const W = 923, H = 1152;
            // خط عربي يدعم اليونيكود بدون registerFont
            const FONT = 'Arial, Noto Sans Arabic, Noto Naskh Arabic, Tahoma, DejaVu Sans, sans-serif';

            const canvas = new Canvas(W, H)
                // الخلفية
                .printImage(bgImg, 0, 0, W, H)

                // صورة العضو مع B&W/Sepia - أصغر ومعدلة
                .printImage(avatar, 370, 320, 240, 300)
                // طبقة أبيض وأسود
                .setColor('rgba(0,0,0,0.25)')
                .printRectangle(370, 320, 240, 300)
                // طبقة بني Sepia
                .setColor('rgba(112,66,20,0.30)')
                .printRectangle(370, 320, 240, 300)
                // إطار حول الصورة
                .setColor('rgba(0,0,0,0.20)')
                .printRectangle(366, 316, 248, 308);

            // اسم العضو - Courier New مطابق لآلة الكاتبة
            canvas.setColor('#1a1a1a')
                .setTextFont('bold 55px Courier New, Courier, monospace')
                .setTextAlign('center')
                .printText(name, 500, 750);

            // مبلغ الجائزة - نفس أحمر WANTED (#8B0000)
            canvas.setColor('#8B0000')
                .setTextFont(`bold 65px ${FONT}`)
                .setTextAlign('center')
                .printText('REWARD: $' + bounty, 500, 880);

            // سبب المطلوبية مع التفاف النص
            canvas.setColor('#1a1a1a')
                .setTextFont(`55px ${FONT}`)
                .setTextAlign('center');

            const lines = wrapText(reason, 25);
            let yStart = 990;
            for (let i = 0; i < Math.min(lines.length, 3); i++) {
                canvas.printText(lines[i], 500, yStart);
                yStart += 70;
            }

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'wanted_bg.png' })] });
        } catch (e) {
            console.error('[/مطلوب] Error:', e.stack || e.message);
            await Message.editReply({ content: '❌ خطأ: ' + (e.message?.substring(0, 300) || 'حدث خطأ غير معروف') });
        }
    }
};