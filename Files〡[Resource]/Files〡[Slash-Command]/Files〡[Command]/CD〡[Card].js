"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';

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
        await Message.deferReply();

        try {
            const user = Message.options.getUser('العضو');
            const rank = Message.options.getString('الرتبة');
            const id = Message.options.getString('الايدي') || user.id.slice(-8);
            const member = Message.guild.members.cache.get(user.id);
            const name = member?.displayName || user.username;

            // تحميل الصورة الرمزية
            const avatarUrl = user.displayAvatarURL({ extension: 'png', size: 256 });
            const avatar = await loadImage(avatarUrl);

            // إنشاء البطاقة
            const W = 900, H = 540;
            const canvas = new Canvas(W, H)
                // خلفية داكنة
                .setColor('#1a1a2e')
                .printRectangle(0, 0, W, H)
                // إطار ذهبي
                .setColor('#c9a84c')
                .printRectangle(15, 15, W - 30, H - 30)
                // خلفية داخلية
                .setColor('#16213e')
                .printRectangle(20, 20, W - 40, H - 40)
                // صورة العضو دائرية
                .printCircularImage(avatar, 60, 60, 100)
                // إطار ذهبي للصورة
                .setColor('#c9a84c')
                .printCircle(60, 60, 103)
                // اسم العضو
                .setColor('#ffffff')
                .setTextFont('bold 36px DejaVu Sans')
                .setTextAlign('left')
                .printText(name, 280, 100)
                // الرتبة
                .setColor('#c9a84c')
                .setTextFont('28px DejaVu Sans')
                .printText(rank, 280, 145)
                // خط فاصل
                .setColor('#c9a84c')
                .printRectangle(60, 250, W - 120, 2)
                // معلومات
                .setColor('#aaaaaa')
                .setTextFont('22px DejaVu Sans')
                .printText('🆔 رقم البطاقة:', 60, 310)
                .setColor('#ffffff')
                .printText(id, 320, 310)
                .setColor('#aaaaaa')
                .printText('📅 تاريخ الإصدار:', 60, 360)
                .setColor('#ffffff')
                .printText(new Date().toLocaleDateString('ar-SA'), 320, 360)
                .setColor('#aaaaaa')
                .printText('🏛️ السيرفر:', 60, 410)
                .setColor('#ffffff')
                .printText(Message.guild.name, 320, 410)
                // شعار
                .setColor('#c9a84c')
                .setTextFont('bold 16px DejaVu Sans')
                .setTextAlign('right')
                .printText('♜ 𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚 ♜', W - 60, H - 40);

            const buffer = canvas.toBuffer();
            const att = new AttachmentBuilder(buffer, { name: 'card.png' });
            await Message.editReply({ files: [att] });
        } catch (e) {
            await Message.editReply({ content: `❌ فشل إنشاء البطاقة: ${e.message}` });
        }
    }
};