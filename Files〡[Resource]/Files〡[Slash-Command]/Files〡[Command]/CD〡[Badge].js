"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';

try {
  const canvasMod = await import('canvas');
  canvasMod.registerFont('NotoSansArabic.ttf', { family: 'Noto Sans Arabic' });
  canvasMod.registerFont('NotoEmoji.ttf', { family: 'Noto Emoji' });
  canvasMod.registerFont('NotoSansMath.ttf', { family: 'Noto Sans Math' });
} catch {}

const F = (s, w='') => `${w} ${s}px Noto Sans Arabic, Noto Emoji, Noto Sans Math, Noto Sans Symbols2, DejaVu Sans, sans-serif`.trim();

function sanitize(text) {
  if (!text) return '';
  return text
    .replace(/<a?:\w+:\d+>/g, '')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '')
    .replace(/\s+/g, ' ').trim();
}

export default {
    name: "شارة",
    description: "تصميم شارة مخابرات CIA احترافية",
    type: 1,
    options: [
        { name: "العضو", description: "اختر العضو", type: ApplicationCommandOptionType.User, required: true },
    ],
    run: async (Client, Message) => {
        await Message.deferReply();
        try {
            const user = Message.options.getUser('العضو');
            const member = Message.guild.members.cache.get(user.id);
            const name = sanitize(member?.displayName || user.username);
            const avatar = await loadImage(user.displayAvatarURL({ extension: 'png', size: 256 }));
            const today = new Date().toLocaleDateString('ar-SA');

            const W = 750, H = 500;
            const NAVY = '#0a1f3f', GOLD = '#c9a84c', SILVER = '#c0c0c0', WHITE = '#ffffff';

            const canvas = new Canvas(W, H)
                // خلفية زرقاء داكنة
                .setColor(NAVY).printRectangle(0, 0, W, H)
                // نمط أمان مائي - شبكة دقيقة
                .setColor('rgba(255,255,255,0.015)');
            for (let i = 0; i < W; i += 30) {
                canvas.printRectangle(i, 0, 1, H);
            }
            for (let j = 0; j < H; j += 30) {
                canvas.printRectangle(0, j, W, 1);
            }
            // شعار النسر CIA في المنتصف (باهت)
            canvas.setColor('rgba(255,255,255,0.03)')
                .setTextFont(F(180, 'bold')).setTextAlign('center')
                .printText('🦅', W/2, H/2+40);

            // إطار خارجي ذهبي
            canvas.setColor(GOLD).printRectangle(15, 15, W-30, H-30)
                .setColor(NAVY).printRectangle(18, 18, W-36, H-36)
                .setColor(GOLD).printRectangle(22, 22, W-44, H-44)
                .setColor(NAVY).printRectangle(25, 25, W-50, H-50);

            // شريط علوي
            canvas.setColor('#06142b').printRectangle(25, 25, W-50, 85)
                .setColor(GOLD).printRectangle(25, 110, W-50, 2);

            // عنوان الوكالة
            canvas.setColor(GOLD)
                .setTextFont(F(13, 'bold')).setTextAlign('center')
                .printText('CENTRAL INTELLIGENCE AGENCY', W/2, 55)
                .setColor(SILVER)
                .setTextFont(F(9, 'bold'))
                .printText('UNITED STATES OF AMERICA • DIRECTORATE OF OPERATIONS', W/2, 80);

            // صورة العضو - يسار
            canvas.setColor(GOLD).printRoundedRectangle(45, 135, 140, 175, 6)
                .setColor('#06142b').printRoundedRectangle(48, 138, 134, 169, 4)
                .printImage(avatar, 52, 142, 126, 161)
                // شريط تحت الصورة
                .setColor(GOLD).printRectangle(45, 315, 140, 22)
                .setColor('#06142b')
                .setTextFont(F(9, 'bold')).setTextAlign('center')
                .printText('OFFICIAL CREDENTIALS', 115, 332);

            // خط فاصل عمودي
            canvas.setColor(GOLD).printRectangle(210, 130, 1, 220);

            // البيانات - يمين
            canvas.setColor(SILVER)
                .setTextFont(F(10, 'bold')).setTextAlign('left');

            const fields = [
                { label: 'NAME / الاسم', value: name, y: 150 },
                { label: 'POSITION / المنصب', value: 'Intelligence Officer', y: 195 },
                { label: 'CLEARANCE / التصريح', value: 'TOP SECRET // SCI', y: 240 },
                { label: 'AGENCY / الوكالة', value: 'CIA Community', y: 285 },
                { label: 'ISSUED / تاريخ الإصدار', value: today, y: 330 },
            ];

            for (const f of fields) {
                canvas.setColor(GOLD).setTextFont(F(9, 'bold'))
                    .printText(f.label, 230, f.y);
                canvas.setColor(WHITE).setTextFont(F(14, 'bold'))
                    .printText(f.value, 230, f.y + 18);
            }

            // باركود سفلي
            canvas.setColor('#06142b').printRectangle(25, 440, W-50, 35)
                .setColor(GOLD);
            // رسم باركود محاكي
            const barcodeStart = 40;
            for (let i = 0; i < 450; i += Math.floor(Math.random() * 5) + 2) {
                const barW = Math.floor(Math.random() * 4) + 1;
                const barH = Math.floor(Math.random() * 15) + 15;
                canvas.printRectangle(barcodeStart + i, 445, barW, barH);
            }
            // رقم الباركود
            canvas.setColor(SILVER).setTextFont(F(8, 'bold')).setTextAlign('center')
                .printText('SERIAL: CIA-' + user.id.substring(0, 8) + ' • CLASS: FIELD AGENT • STATUS: ACTIVE', W/2, 490);

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'cia-badge.png' })] });
        } catch (e) {
            await Message.editReply({ content: '❌ خطأ: ' + e.message });
        }
    }
};