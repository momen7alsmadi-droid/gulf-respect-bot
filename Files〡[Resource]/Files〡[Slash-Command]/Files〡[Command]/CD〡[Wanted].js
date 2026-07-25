"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';

// ─── تحميل الخطوط مرة واحدة عند بدء تشغيل البوت ───
const ROOT = process.cwd();
try {
  const canvasMod = await import('canvas');
  canvasMod.registerFont(ROOT + '/NotoSansArabic.ttf', { family: 'Noto Sans Arabic' });
  canvasMod.registerFont(ROOT + '/NotoEmoji.ttf', { family: 'Noto Emoji' });
  canvasMod.registerFont(ROOT + '/NotoSansMath.ttf', { family: 'Noto Sans Math' });
  console.log('✅ [Wanted] Fonts registered');
} catch(e) { console.error('❌ [Wanted] Font error:', e.message); }

const AF = (s, w) => `${w || ''} ${s}px Noto Sans Arabic, Noto Emoji, Noto Sans Math, Courier, Courier New, monospace`.trim();

export default {
    name: "مطلوب",
    description: "إنشاء بوستر WANTED كلاسيكي",
    type: 1,
    options: [
        { name: "العضو", description: "اختر العضو المطلوب", type: ApplicationCommandOptionType.User, required: true },
        { name: "الجائزة", description: "مبلغ الجائزة (مثال: 1000000)", type: ApplicationCommandOptionType.String, required: true },
        { name: "السبب", description: "سبب المطلوبية", type: ApplicationCommandOptionType.String, required: true },
    ],
    run: async (Client, Message) => {
        await Message.deferReply();
        try {
            // الخطوط محملة مسبقاً في بداية الملف

            const user = Message.options.getUser('العضو');
            const bounty = Message.options.getString('الجائزة');
            const reason = Message.options.getString('السبب');
            const member = Message.guild.members.cache.get(user.id);

            // تنظيف الاسم من الإيموجي فقط
            let name = member?.displayName || user.username;
            name = name.replace(/<a?:\w+:\d+>/g, '').replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '').replace(/\s+/g, ' ').trim();

            // ─── تحميل الصور ───

            const canvas = new Canvas(W, H)
                // ─── طباعة الخلفية ───
                .printImage(bg, 0, 0, W, H)

                // ─── رسم الصورة الشخصية بتأثير Sepia ───
                // أولاً: نرسم الصورة
                .printImage(avatar, 340, 290, 320, 400)
                // ثانياً: نطبق طبقة Sepia (بني + أصفر شفاف)
                .setColor('rgba(112, 66, 20, 0.35)')   // بني شفاف
                .printRectangle(340, 290, 320, 400)
                .setColor('rgba(255, 215, 120, 0.10)')  // أصفر دافئ
                .printRectangle(340, 290, 320, 400)
                // إطار حول الصورة
                .setColor('rgba(0,0,0,0.30)')
                .printRectangle(340, 290, 320, 400)
                .setColor('rgba(0,0,0,0.30)')
                .printRectangle(336, 286, 328, 408);

            // ─── اسم العضو - أسفل الورقة المعلقة، فوق الخط الأسود ───
            // المركز عند X=500
            canvas.setColor('#000000')
                .setTextFont(AF(60, 'bold'))
                .setTextAlign('center')
                .printText(name, 500, 750);

            // ─── مبلغ الجائزة - أسفل الخط الأسود ───
            canvas.setColor('#8B0000')  // أحمر داكن
                .setTextFont(AF(70, 'bold'))
                .setTextAlign('center')
                .printText('$' + bounty, 500, 880);

            // ─── سبب المطلوبية ───
            canvas.setColor('#000000')
                .setTextFont(AF(60, 'bold'))
                .setTextAlign('center')
                .printText(reason.length > 30 ? reason.substring(0, 30) + '..' : reason, 500, 990);

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'wanted.png' })] });
        } catch (e) {
            await Message.editReply({ content: '❌ خطأ: ' + e.message });
        }
    }
};