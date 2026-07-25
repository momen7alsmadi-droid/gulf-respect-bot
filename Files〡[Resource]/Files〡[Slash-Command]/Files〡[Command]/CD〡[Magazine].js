"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';

const F = (s, w='') => `${w} ${s}px Noto Sans Arabic, Noto Emoji, Noto Sans Math, Noto Sans Symbols2, DejaVu Sans, sans-serif`.trim();

function sanitize(text) {
  if (!text) return '';
  return text
    .replace(/<a?:\w+:\d+>/g, '')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '')
    .replace(/\s+/g, ' ').trim();
}

export default {
    name: "مجلة",
    description: "غلاف مجلة عالمية فخمة",
    type: 1,
    options: [
        { name: "العضو", description: "اختر العضو", type: ApplicationCommandOptionType.User, required: true },
        { name: "عنوان_رئيسي", description: "العنوان الرئيسي للغلاف", type: ApplicationCommandOptionType.String, required: true },
    ],
    run: async (Client, Message) => {
        try {
            const canvasMod = await import('canvas');
            canvasMod.registerFont('NotoSansArabic.ttf', { family: 'Noto Sans Arabic' });
            canvasMod.registerFont('NotoEmoji.ttf', { family: 'Noto Emoji' });
            canvasMod.registerFont('NotoSansMath.ttf', { family: 'Noto Sans Math' });
        } catch {}
        await Message.deferReply();
        try {
            const user = Message.options.getUser('العضو');
            const headline = Message.options.getString('عنوان_رئيسي');
            const avatar = await loadImage(user.displayAvatarURL({ extension: 'png', size: 512 }));
            const month = new Date().toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
            const year = new Date().getFullYear();

            const W = 800, H = 1067; // نسبة A4 تقريباً
            const GOLD = '#d4a853', WHITE = '#ffffff', DARK = '#1a1a1a';

            const canvas = new Canvas(W, H)
                // صورة العضو كغلاف كامل
                .printImage(avatar, 0, 0, W, H)
                // تدرج داكن من الأسفل لجعل النص مقروءاً
                .setColor('rgba(0,0,0,0.0)').printRectangle(0, 0, W, 400)
                .setColor('rgba(0,0,0,0.35)').printRectangle(0, 350, W, 350)
                .setColor('rgba(0,0,0,0.7)').printRectangle(0, 600, W, 467);

            // شريط علوي - اسم المجلة
            canvas.setColor('rgba(0,0,0,0.75)').printRectangle(0, 0, W, 100)
                .setColor(GOLD)
                .setTextFont(F(48, 'bold')).setTextAlign('center')
                .printText('THE AGENT', W/2, 58)
                .setColor(WHITE)
                .setTextFont(F(9, 'bold'))
                .printText('PERSON OF THE YEAR • SPECIAL EDITION', W/2, 82);

            // التاريخ والسعر أعلى اليمين
            canvas.setColor(WHITE).setTextAlign('right')
                .setTextFont(F(12, 'bold'))
                .printText(month + ' ' + year, W-30, 125)
                .setTextFont(F(10))
                .printText('$9.99 • ISSUE 487', W-30, 145);

            // العنوان الرئيسي - كبير وعريض
            canvas.setColor(WHITE).setTextAlign('left');
            const headlineWords = headline.split(' ');
            let hy = H - 380;
            // العنوان على أسطر إذا كان طويلاً
            if (headline.length > 25) {
                const mid = Math.ceil(headlineWords.length / 2);
                const line1 = headlineWords.slice(0, mid).join(' ');
                const line2 = headlineWords.slice(mid).join(' ');
                canvas.setTextFont(F(48, 'bold')).printText(line1, 40, hy);
                hy += 60;
                canvas.printText(line2, 40, hy);
                hy += 60;
            } else {
                canvas.setTextFont(F(56, 'bold')).printText(headline, 40, hy);
                hy += 70;
            }

            // خط فاصل ذهبي
            canvas.setColor(GOLD).printRectangle(40, hy, 120, 3);
            hy += 25;

            // اسم الشخصية
            canvas.setColor(GOLD)
                .setTextFont(F(22, 'bold'))
                .printText('FEATURING: ' + sanitize(user.username), 40, hy);
            hy += 40;

            // شعارات جانبية
            canvas.setColor(WHITE).setTextFont(F(11, 'bold'));
            const sideItems = [
                '★ EXCLUSIVE INTERVIEW INSIDE',
                '★ THE RISE OF CIA COMMUNITY',
                '★ SECRETS THEY NEVER TOLD YOU',
                '★ 2025: THE YEAR OF INTELLIGENCE',
            ];
            for (const item of sideItems) {
                canvas.printText(item, 40, hy);
                hy += 24;
            }

            // باركود سفلي
            canvas.setColor(WHITE).printRoundedRectangle(W-120, H-80, 90, 50, 4)
                .setColor(DARK);
            for (let i = 0; i < 70; i += 3) {
                const bw = Math.floor(Math.random() * 3) + 1;
                const bh = Math.floor(Math.random() * 20) + 20;
                canvas.printRectangle(W-115 + i, H-72, bw, bh);
            }

            // شريط سفلي
            canvas.setColor('rgba(0,0,0,0.8)').printRectangle(0, H-30, W, 30)
                .setColor(GOLD).setTextFont(F(9, 'bold')).setTextAlign('center')
                .printText('♜ THE AGENT MAGAZINE • CIA COMMUNITY • PERSON OF THE YEAR SPECIAL • ' + month + ' ' + year + ' ♜', W/2, H-10);

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'magazine-cover.png' })] });
        } catch (e) {
            await Message.editReply({ content: '❌ خطأ: ' + e.message });
        }
    }
};