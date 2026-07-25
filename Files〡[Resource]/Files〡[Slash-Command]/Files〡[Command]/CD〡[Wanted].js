"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';

// ─── تحويل الرموز الرياضية المزخرفة إلى حروف عادية ───
function convertMathBold(text) {
  if (!text) return '';
  return text.replace(/[\u{1D400}-\u{1D7FF}]/gu, c => {
    const code = c.codePointAt(0);
    // Mathematical Alphanumeric Symbols → ASCII
    const ranges = [
      [0x1D400,65],[0x1D41A,97],[0x1D434,65],[0x1D44E,97],[0x1D468,65],[0x1D482,97],
      [0x1D49C,65],[0x1D4B6,97],[0x1D4D0,65],[0x1D4EA,97],[0x1D504,65],[0x1D51E,97],
      [0x1D538,65],[0x1D552,97],[0x1D56C,65],[0x1D586,97],[0x1D5A0,65],[0x1D5BA,97],
      [0x1D5D4,65],[0x1D5EE,97],[0x1D608,65],[0x1D622,97],[0x1D63C,65],[0x1D656,97],
      [0x1D670,65],[0x1D68A,97]
    ];
    for (const [r,base] of ranges) {
      if (code >= r && code < r + 26) return String.fromCharCode(base + code - r);
    }
    return ' '; // أي رمز غير مدعوم → فراغ
  });
}

function cleanName(text) {
  if (!text) return '';
  return text
    .replace(/<a?:\w+:\d+>/g, '')  // Discord custom emoji
    // إزالة الإيموجي
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '')
    // إبقاء العربي + الإنجليزي + أرقام + رموز أساسية فقط، الباقي فراغ
    .replace(/[^\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\w\s\-_.!?@#$%&*(){}\[\]]/g, ' ')
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
            // ─── تسجيل الخطوط داخل run لضمان التحميل ───
            const canvasMod = await import('canvas');
            const ROOT = process.cwd();
            try {
                canvasMod.registerFont(ROOT + '/NotoSansMath.ttf', { family: 'Noto Sans Math' });
                canvasMod.registerFont(ROOT + '/NotoSansArabic.ttf', { family: 'Noto Sans Arabic' });
                canvasMod.registerFont(ROOT + '/NotoEmoji.ttf', { family: 'Noto Emoji' });
            } catch(fe) { console.error('Font register:', fe.message); }

            const user = Message.options.getUser('العضو');
            const bounty = Message.options.getString('الجائزة');
            const reason = Message.options.getString('السبب');
            const member = Message.guild.members.cache.get(user.id);
            const name = convertMathBold(cleanName(member?.displayName || user.username));

            const fs = await import('fs');
            const bgBuf = fs.readFileSync(ROOT + '/Files〡[Resource]/Files〡[Image]/wanted_bg.png');
            const bgImg = await loadImage(bgBuf);
            const avatar = await loadImage(user.displayAvatarURL({ extension: 'png', size: 512 }));

            const W = 923, H = 1152;
            const FONT = 'Noto Sans Arabic, Noto Sans Math, Noto Emoji, DejaVu Sans, Arial, sans-serif';

            const canvas = new Canvas(W, H)
                .printImage(bgImg, 0, 0, W, H)
                // صورة العضو
                .printImage(avatar, 347, 370, 240, 300)
                .setColor('rgba(0,0,0,0.25)')
                .printRectangle(347, 370, 240, 300)
                .setColor('rgba(112,66,20,0.30)')
                .printRectangle(347, 370, 240, 300)
                .setColor('rgba(0,0,0,0.20)')
                .printRectangle(343, 366, 248, 308);

            // الاسم - كل الخطوط مسجلة
            canvas.setColor('#1a1a1a')
                .setTextFont('bold 55px ' + FONT)
                .setTextAlign('center')
                .printText(name, 467, 750);

            // الجائزة
            canvas.setColor('#8B0000')
                .setTextFont('bold 65px ' + FONT)
                .setTextAlign('center')
                .printText('REWARD: $' + bounty, 467, 880);

            // السبب
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