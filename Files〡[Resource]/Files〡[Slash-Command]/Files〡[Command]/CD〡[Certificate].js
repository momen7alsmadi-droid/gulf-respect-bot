"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';

export default {
    name: "شهادة",
    description: "إنشاء شهادة تقدير",
    type: 1,
    options: [
        { name: "العضو", description: "اختر العضو", type: ApplicationCommandOptionType.User, required: true },
        { name: "السبب", description: "سبب التقدير", type: ApplicationCommandOptionType.String, required: true },
    ],
    run: async (Client, Message) => {
        try { (await import('canvas')).registerFont('NotoSansArabic.ttf', { family: 'Noto Sans Arabic, sans-serif' }); } catch {}
await Message.deferReply();
        try {
            const user = Message.options.getUser('العضو');
            const reason = Message.options.getString('السبب');
            const member = Message.guild.members.cache.get(user.id);
            const name = member?.displayName || user.username;
            const W = 1000, H = 700;
            const F = 'Noto Sans Arabic, sans-serif';

            const canvas = new Canvas(W, H)
                .setColor('#0a0a1a').printRectangle(0, 0, W, H)
                // إطارات ذهبية
                .setColor('#d4a853').printRectangle(15, 15, W-30, H-30)
                .setColor('#0a0a1a').printRectangle(20, 20, W-40, H-40)
                .setColor('#d4a853').printRectangle(30, 30, W-60, H-60)
                .setColor('#111130').printRectangle(35, 35, W-70, H-70)
                // زخرفة علوية
                .setColor('#d4a853')
                .setTextFont(`bold 42px ${F}`).setTextAlign('center')
                .printText('♜ 𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚 ♜', W/2, 120)
                .printRectangle(W/2-200, 140, 400, 2)
                // عنوان
                .setColor('#ffffff')
                .setTextFont(`bold 38px ${F}`)
                .printText('شـهـادة تـقـديـر', W/2, 210)
                // نص
                .setColor('#cccccc')
                .setTextFont(`24px ${F}`)
                .printText('تشهد إدارة السيرفر بأن العضو', W/2, 300)
                // اسم
                .setColor('#d4a853')
                .setTextFont(`bold 34px ${F}`)
                .printText(name, W/2, 360)
                // سبب
                .setColor('#cccccc')
                .setTextFont(`24px ${F}`)
                .printText('قد تم تكريمه لـ:', W/2, 430)
                .setColor('#ffffff')
                .setTextFont(`bold 28px ${F}`)
                .printText(reason, W/2, 490)
                // تذييل
                .setColor('#d4a853')
                .printRectangle(W/2-200, 540, 400, 2)
                .setTextFont(`18px ${F}`)
                .printText(`بتاريخ: ${new Date().toLocaleDateString('ar-SA')}`, W/2, 590)
                .setColor('#888888')
                .printText('بأسمى آيات الشكر والتقدير', W/2, 630);

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'certificate.png' })] });
        } catch (e) {
            await Message.editReply({ content: `❌ خطأ: ${e.message}` });
        }
    }
};