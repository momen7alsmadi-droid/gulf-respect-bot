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
        await Message.deferReply();

        try {
            const user = Message.options.getUser('العضو');
            const reason = Message.options.getString('السبب');
            const member = Message.guild.members.cache.get(user.id);
            const name = member?.displayName || user.username;

            const W = 1000, H = 700;
            const canvas = new Canvas(W, H)
                // خلفية
                .setColor('#0d1117')
                .printRectangle(0, 0, W, H)
                // إطار خارجي ذهبي
                .setColor('#c9a84c')
                .printRectangle(20, 20, W - 40, H - 40)
                // إطار داخلي
                .setColor('#161b22')
                .printRectangle(25, 25, W - 50, H - 50)
                // إطار مزدوج
                .setColor('#c9a84c')
                .printRectangle(35, 35, W - 70, H - 70)
                .setColor('#0d1117')
                .printRectangle(40, 40, W - 80, H - 80)
                // زخرفة علوية
                .setColor('#c9a84c')
                .setTextFont('bold 48px DejaVu Sans')
                .setTextAlign('center')
                .printText('♜ 𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚 ♜', W / 2, 120)
                .setColor('#c9a84c')
                .printRectangle(W / 2 - 200, 145, 400, 2)
                // عنوان
                .setColor('#ffffff')
                .setTextFont('bold 42px DejaVu Sans')
                .printText('شـهـادة تـقـديـر', W / 2, 220)
                // نص الشهادة
                .setColor('#c9c9c9')
                .setTextFont('26px DejaVu Sans')
                .printText(`تشهد إدارة السيرفر بأن العضو`, W / 2, 310)
                // اسم العضو
                .setColor('#c9a84c')
                .setTextFont('bold 36px DejaVu Sans')
                .printText(name, W / 2, 370)
                // السبب
                .setColor('#c9c9c9')
                .setTextFont('26px DejaVu Sans')
                .printText(`قد تم تكريمه لـ:`, W / 2, 430)
                .setColor('#ffffff')
                .setTextFont('bold 28px DejaVu Sans')
                .printText(reason, W / 2, 480)
                // تذييل
                .setColor('#c9a84c')
                .printRectangle(W / 2 - 200, 530, 400, 2)
                .setColor('#888888')
                .setTextFont('20px DejaVu Sans')
                .printText(`صدرت بتاريخ: ${new Date().toLocaleDateString('ar-SA')}`, W / 2, 580)
                .printText('بأسمى آيات الشكر والتقدير', W / 2, 620);

            const buffer = canvas.toBuffer();
            const att = new AttachmentBuilder(buffer, { name: 'certificate.png' });
            await Message.editReply({ files: [att] });
        } catch (e) {
            await Message.editReply({ content: `❌ فشل إنشاء الشهادة: ${e.message}` });
        }
    }
};