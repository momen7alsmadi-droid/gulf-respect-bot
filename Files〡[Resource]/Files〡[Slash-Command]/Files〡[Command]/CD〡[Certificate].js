"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';

// ─── تنظيف النص من الرموز غير المدعومة في Canvas ───
function sanitize(text) {
  if (!text) return '';
  return text
    .replace(/<a?:\w+:\d+>/g, '')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '')
    .replace(/[^\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\w\s\-_.]/g, '')
    .replace(/\s+/g, ' ').trim();
}

export default {
    name: "شهادة",
    description: "إنشاء شهادة تقدير",
    type: 1,
    options: [
        { name: "العضو", description: "اختر العضو", type: ApplicationCommandOptionType.User, required: true },
        { name: "السبب", description: "سبب التقدير", type: ApplicationCommandOptionType.String, required: true },
    ],
    run: async (Client, Message) => {
        try {
  const canvasMod = await import('canvas');
  canvasMod.registerFont('NotoSansArabic.ttf', { family: 'Noto Sans Arabic' });
  canvasMod.registerFont('NotoEmoji.ttf', { family: 'Noto Emoji' });
} catch {}
await Message.deferReply();
        try {
            const user = Message.options.getUser('العضو');
            const reason = sanitize(Message.options.getString('السبب'));
            const member = Message.guild.members.cache.get(user.id);
            const name = sanitize(member?.displayName || user.username);
            const guildName = sanitize(Message.guild.name);
            const W = 1000, H = 700;
            const F = 'Noto Sans Arabic, Noto Emoji, Noto Sans Symbols2, sans-serif';

            const canvas = new Canvas(W, H)
                .setColor('#0a0a1a').printRectangle(0, 0, W, H)
                .setColor('#d4a853').printRectangle(15, 15, W-30, H-30)
                .setColor('#0a0a1a').printRectangle(20, 20, W-40, H-40)
                .setColor('#d4a853').printRectangle(30, 30, W-60, H-60)
                .setColor('#111130').printRectangle(35, 35, W-70, H-70)
                // اسم السيرفر منظف
                .setColor('#d4a853')
                .setTextFont(`bold 42px ${F}`).setTextAlign('center')
                .printText(guildName, W/2, 120)
                .printRectangle(W/2-200, 140, 400, 2)
                // عنوان
                .setColor('#ffffff')
                .setTextFont(`bold 38px ${F}`)
                .printText('شهادة تقدير', W/2, 210)
                .setColor('#cccccc')
                .setTextFont(`24px ${F}`)
                .printText('تشهد إدارة السيرفر بأن العضو', W/2, 300)
                .setColor('#d4a853')
                .setTextFont(`bold 34px ${F}`)
                .printText(name, W/2, 360)
                .setColor('#cccccc')
                .setTextFont(`24px ${F}`)
                .printText('قد تم تكريمه لـ:', W/2, 430)
                .setColor('#ffffff')
                .setTextFont(`bold 28px ${F}`)
                .printText(reason.length > 60 ? reason.substring(0,60) : reason, W/2, 490)
                .setColor('#d4a853')
                .printRectangle(W/2-200, 540, 400, 2)
                .setTextFont(`18px ${F}`)
                .printText('بتاريخ: ' + new Date().toLocaleDateString('ar-SA'), W/2, 590)
                .setColor('#888888')
                .printText('بأسمى آيات الشكر والتقدير', W/2, 630);

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'certificate.png' })] });
        } catch (e) {
            await Message.editReply({ content: '❌ خطأ: ' + e.message });
        }
    }
};