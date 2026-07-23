"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';

const FONT = 'bold 36px Noto Sans Arabic, Noto Naskh Arabic, Noto Sans, DejaVu Sans, sans-serif';
const FONT_SM = '24px Noto Sans Arabic, Noto Naskh Arabic, Noto Sans, DejaVu Sans, sans-serif';
const FONT_XS = '18px Noto Sans Arabic, Noto Naskh Arabic, Noto Sans, DejaVu Sans, sans-serif';

export default {
    name: "بطاقة",
    description: "إنشاء بطاقة عضوية مخصصة",
    type: 1,
    options: [
        { name: "العضو", description: "اختر العضو", type: ApplicationCommandOptionType.User, required: true },
        { name: "الرتبة", description: "اكتب الرتبة (مثال: جندي، رقيب، مدني)", type: ApplicationCommandOptionType.String, required: true },
        { name: "الايدي", description: "رقم الهوية", type: ApplicationCommandOptionType.String, required: false },
    ],
    run: async (Client, Message) => {
        try { (await import('canvas')).registerFont('NotoSansArabic.ttf', { family: 'Noto Sans Arabic, sans-serif' }); } catch {}
await Message.deferReply();
        try {
            const user = Message.options.getUser('العضو');
            const rank = Message.options.getString('الرتبة');
            const id = Message.options.getString('الايدي') || user.id.slice(-8);
            const member = Message.guild.members.cache.get(user.id);
            const name = member?.displayName || user.username;

            const avatarUrl = user.displayAvatarURL({ extension: 'png', size: 256 });
            const avatar = await loadImage(avatarUrl);
            const W = 900, H = 540;
            
            const canvas = new Canvas(W, H)
                .setColor('#0a0a1a').printRectangle(0, 0, W, H)
                .setColor('#d4a853').printRoundedRectangle(12, 12, W-24, H-24, 18)
                .setColor('#111130').printRoundedRectangle(17, 17, W-34, H-34, 15)
                // شريط علوي
                .setColor('#d4a853').printRectangle(17, 17, W-34, 90)
                .setColor('#111130')
                .setTextFont('bold 28px Noto Sans Arabic, Noto Naskh Arabic, Noto Sans, DejaVu Sans, sans-serif').setTextAlign('center')
                .printText('♜ 𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚 ♜', W/2, 70)
                // صورة العضو
                .printCircularImage(avatar, 55, 140, 90)
                .setColor('#d4a853').printCircle(55, 140, 93)
                // اسم + رتبة
                .setColor('#ffffff').setTextFont(FONT).setTextAlign('left')
                .printText(name, 280, 170)
                .setColor('#d4a853').setTextFont(FONT_SM)
                .printText(rank, 280, 215)
                // خط
                .setColor('#1a1a3a').printRectangle(50, 265, W-100, 2)
                // بيانات
                .setColor('#8888aa').setTextFont(FONT_SM).setTextAlign('right')
                .printText('رقم البطاقة:', W-60, 330)
                .printText('تاريخ الإصدار:', W-60, 390)
                .printText('السيرفر:', W-60, 450)
                .setColor('#ffffff').setTextAlign('left')
                .printText(id, 60, 330)
                .printText(new Date().toLocaleDateString('ar-SA'), 60, 390)
                .printText(Message.guild.name, 60, 450)
                // تذييل
                .setColor('#d4a853').setTextFont(FONT_XS).setTextAlign('center')
                .printText('بطاقة عضوية رسمية', W/2, H-25);

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'card.png' })] });
        } catch (e) {
            await Message.editReply({ content: `❌ خطأ: ${e.message}` });
        }
    }
};