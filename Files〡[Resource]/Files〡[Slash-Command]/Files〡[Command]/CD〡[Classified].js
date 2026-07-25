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

function wrapText(text, maxCharsPerLine) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + word).length > maxCharsPerLine && current.length > 0) {
      lines.push(current.trim());
      current = word + ' ';
    } else {
      current += word + ' ';
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines;
}

export default {
    name: "ملف_سري",
    description: "إنشاء وثيقة مخابرات سرية",
    type: 1,
    options: [
        { name: "العضو", description: "اختر العضو", type: ApplicationCommandOptionType.User, required: true },
        { name: "معلومات_خطيرة", description: "المعلومات الحساسة", type: ApplicationCommandOptionType.String, required: true },
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
            const info = Message.options.getString('معلومات_خطيرة');
            const avatar = await loadImage(user.displayAvatarURL({ extension: 'png', size: 256 }));
            const name = sanitize(user.username);

            const W = 700, H = 900;
            const PAPER = '#f5f0e8', INK = '#1a1a1a', RED = '#cc0000';

            const canvas = new Canvas(W, H)
                .setColor(PAPER).printRectangle(0, 0, W, H)
                // تأثير ورق متهالك - بقع
                .setColor('rgba(139,119,80,0.12)');
            for (let i = 0; i < 8; i++) {
                const rx = 40 + Math.random() * (W-120);
                const ry = 40 + Math.random() * (H-120);
                canvas.printRoundedRectangle(rx, ry, 40 + Math.random() * 80, 30 + Math.random() * 50, 20);
            }
            // حدود ممزقة علوية
            canvas.setColor('rgba(139,119,80,0.2)').printRectangle(0, 0, W, 15)
                .setColor(PAPER);
            for (let i = 0; i < W; i += 8) {
                const h = 8 + Math.random() * 12;
                canvas.printRectangle(i, 0, 8, h);
            }

            // رأس الوثيقة
            canvas.setColor(INK)
                .setTextFont(F(11, 'bold')).setTextAlign('center')
                .printText('CLASSIFIED DOCUMENT • CLASSIFIED DOCUMENT • CLASSIFIED DOCUMENT', W/2, 35);

            canvas.setColor(RED).printRectangle(30, 48, W-60, 1);

            // شعار
            canvas.setColor(INK).setTextFont(F(18, 'bold'))
                .printText('♜ CIA COMMUNITY ♜', W/2, 80)
                .setTextFont(F(10))
                .printText('CENTRAL INTELLIGENCE AGENCY • DIRECTORATE OF INTELLIGENCE', W/2, 100);

            canvas.setColor(RED).printRectangle(30, 110, W-60, 1);

            // صورة العضو + إطار
            canvas.setColor(INK).printRoundedRectangle(45, 130, 140, 175, 4)
                .printImage(avatar, 49, 134, 132, 167)
                // ملصق أسفل الصورة
                .setColor(INK).printRectangle(45, 309, 140, 20)
                .setColor('#ffffff').setTextFont(F(9, 'bold')).setTextAlign('center')
                .printText('SUBJECT ID: ' + user.id.substring(0, 10), 115, 324);

            // بيانات موجزة
            canvas.setColor(INK).setTextAlign('left');
            const leftFields = [
                { label: 'SUBJECT:', value: name, y: 150 },
                { label: 'STATUS:', value: 'ACTIVE', y: 180 },
                { label: 'CLEARANCE:', value: 'TOP SECRET // SCI', y: 210 },
                { label: 'DOSSIER #:', value: 'CIA-' + Date.now().toString(36).toUpperCase(), y: 240 },
                { label: 'DATE:', value: new Date().toLocaleDateString('ar-SA'), y: 270 },
            ];
            for (const f of leftFields) {
                canvas.setColor(RED).setTextFont(F(9, 'bold')).printText(f.label, 200, f.y);
                canvas.setColor(INK).setTextFont(F(11, 'bold')).printText(f.value, 200, f.y + 16);
            }

            // قسم المعلومات الخطيرة
            canvas.setColor(RED).printRectangle(30, 350, W-60, 1)
                .setColor(INK).setTextFont(F(12, 'bold')).setTextAlign('center')
                .printText('═══ CLASSIFIED INTEL ═══', W/2, 380);

            const infoLines = wrapText(info, 55);
            let y = 420;
            for (let i = 0; i < infoLines.length; i++) {
                const line = infoLines[i];
                const words = line.split(' ');

                // تظليل عشوائي لبعض الكلمات (Redacted)
                canvas.setTextAlign('left');
                let xPos = 50;
                for (const word of words) {
                    const wordW = word.length * 8;
                    if (Math.random() < 0.25) {
                        // كلمة محجوبة
                        canvas.setColor(INK).printRectangle(xPos, y - 14, wordW, 18);
                    } else {
                        canvas.setColor(INK).setTextFont(F(14)).printText(word, xPos, y);
                    }
                    xPos += wordW + 10;
                }
                y += 28;
            }

            // ختم TOP SECRET أحمر مائل
            canvas.save();
            // رسم الختم باستخدام نص كبير مائل - نحاكي التدوير عبر rotate
            // بدلاً من rotate (غير مدعوم مباشرة) نستخدم نص كبير جداً بلون شفاف
            canvas.setColor('rgba(204,0,0,0.18)')
                .setTextFont(F(72, 'bold')).setTextAlign('center')
                .printText('TOP SECRET', W/2, H - 160)
                .printText('TOP SECRET', W/2 + 15, H - 160)
                .setColor('rgba(204,0,0,0.10)')
                .setTextFont(F(48, 'bold'))
                .printText('TOP SECRET', W/2 - 40, H - 80)
                .printText('TOP SECRET', W/2 + 50, H - 100);

            // تذييل
            canvas.setColor(RED).printRectangle(30, H-60, W-60, 1)
                .setColor(INK).setTextFont(F(7)).setTextAlign('center')
                .printText('This document is property of CIA Community. Unauthorized disclosure is punishable by law. CI-4872-A', W/2, H-35);

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'classified.png' })] });
        } catch (e) {
            await Message.editReply({ content: '❌ خطأ: ' + e.message });
        }
    }
};