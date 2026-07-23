"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas } from 'canvas-constructor/cairo';

const F = 'Noto Sans Arabic, sans-serif';

export default {
    name: "بنر",
    description: "إنشاء بانر إعلاني",
    type: 1,
    options: [
        { name: "العنوان", description: "عنوان البانر", type: ApplicationCommandOptionType.String, required: true },
        { name: "الوصف", description: "وصف أو نص إضافي", type: ApplicationCommandOptionType.String, required: false },
        { name: "اللون", description: "لون البانر (مثال: #c9a84c)", type: ApplicationCommandOptionType.String, required: false },
    ],
    run: async (Client, Message) => {
        try { (await import('canvas')).registerFont('NotoSansArabic.ttf', { family: 'Noto Sans Arabic, sans-serif' }); } catch {}
await Message.deferReply();
        try {
            const title = Message.options.getString('العنوان');
            const desc = Message.options.getString('الوصف') || '';
            const color = Message.options.getString('اللون') || '#d4a853';
            const W = 1000, H = 350;

            const canvas = new Canvas(W, H)
                .setColor('#0a0a1a').printRectangle(0, 0, W, H)
                // إطار
                .setColor(color).printRectangle(10, 10, W-20, H-20)
                .setColor('#0a0a1a').printRectangle(15, 15, W-30, H-30)
                // خط علوي
                .setColor(color).printRectangle(50, 40, W-100, 4)
                // شعار
                .setColor('#ffffff')
                .setTextFont(`bold 24px ${F}`).setTextAlign('center')
                .printText('♜ 𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚 ♜', W/2, 30)
                // عنوان
                .setColor('#ffffff')
                .setTextFont(`bold 48px ${F}`)
                .printText(title, W/2, 150)
                // وصف
                .setColor('#cccccc')
                .setTextFont(`26px ${F}`)
                .printText(desc, W/2, 220)
                // خط سفلي
                .setColor(color).printRectangle(50, 270, W-100, 4)
                // تذييل
                .setColor('#888888')
                .setTextFont(`18px ${F}`)
                .printText(new Date().toLocaleDateString('ar-SA'), W/2, 320);

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'banner.png' })] });
        } catch (e) {
            await Message.editReply({ content: `❌ خطأ: ${e.message}` });
        }
    }
};