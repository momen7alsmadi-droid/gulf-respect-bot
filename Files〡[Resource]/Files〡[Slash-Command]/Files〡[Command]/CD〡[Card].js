"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';
import QRCode from 'qrcode';
import { createRequire } from 'module';

// تحميل الخطوط العربية والرموز
const require = createRequire(import.meta.url);
try {
  const cvs = require('canvas');
  cvs.registerFont('NotoSansArabic.ttf', { family: 'Noto Arabic' });
  cvs.registerFont('NotoEmoji.ttf', { family: 'Noto Emoji' });
  cvs.registerFont('NotoSansMath.ttf', { family: 'Noto Math' });
} catch(e) { console.error('Font reg failed:', e.message); }

const F = (s, w='') => `${w} ${s}px Noto Arabic, Noto Emoji, Noto Math, Noto Sans Arabic, Noto Color Emoji, DejaVu Sans, sans-serif`.trim();


// تصغير الخط للاسم الطويل
function fitText(canvas, text, maxW, maxSize, x, y, color) {
    let size = maxSize;
    while (size > 16) {
        const approx = text.length * (size * 0.55);
        if (approx <= maxW) break;
        size -= 2;
    }
    canvas.setColor(color).setTextFont(F(size,'bold')).printText(text, x, y);
}

export default {
    name: "بطاقة",
    description: "إنشاء بطاقة هوية شخصية احترافية",
    type: 1,
    options: [
        { name: "العضو", description: "اختر العضو", type: ApplicationCommandOptionType.User, required: true },
        { name: "تاريخ-الميلاد", description: "مثال: 15/5/1999", type: ApplicationCommandOptionType.String, required: false },
        { name: "العمر", description: "مثال: 25", type: ApplicationCommandOptionType.String, required: false },
    ],
    run: async (Client, Message) => {
        await Message.deferReply();
        try {
            const user = Message.options.getUser('العضو');
            const dob = Message.options.getString('تاريخ-الميلاد') || '----';
            const age = Message.options.getString('العمر') || '--';
            const member = Message.guild.members.cache.get(user.id);
            const displayName = member?.displayName || user.username;
            const guildName = Message.guild.name;
            const uid = user.id;
            const now = new Date().toLocaleDateString('ar-SA');

            const W = 1100, H = 650;
            const G = '#C9A84C', BG = '#1a1a2e', DARK = '#12121f';

            // صورة العضو
            const avatar = await loadImage(user.displayAvatarURL({extension:'png',size:256}));

            // QR كود
            const qrData = `ID:${uid}|Name:${displayName}|Server:${guildName}`;
            const qrBuf = await QRCode.toBuffer(qrData,{width:120,margin:1,color:{dark:'#1a1a2e',light:'#ffffff'}});
            const qrImg = await loadImage(qrBuf);

            const canvas = new Canvas(W, H)
                // خلفية
                .setColor(BG).printRectangle(0,0,W,H)
                // نمط أمان مائي
                .setColor('rgba(255,255,255,0.015)')
                .setTextFont(F(120,'bold')).setTextAlign('center')
                .printText('CIA',W/2,H/2+40)
                .setColor('rgba(255,255,255,0.01)')
                .setTextFont(F(60,'bold'))
                .printText('SECURITY',W/2,H/2+100)
                // إطار خارجي
                .setColor(G).printRectangle(25,25,W-50,H-50)
                .setColor(DARK).printRectangle(30,30,W-60,H-60)
                // شريط علوي
                .setColor(G).printRectangle(30,30,W-60,90)
                .setColor('#000000')
                .setTextFont(F(22,'bold')).setTextAlign('center')
                .printText('♜ CIA Community ♜',W/2,75)
                .setTextFont(F(12,'bold'))
                .printText('OFFICIAL IDENTITY CARD',W/2,105)
                // صورة العضو - مربع بحواف منحنية
                .setColor(G).printRoundedRectangle(60,155,210,250,16)
                .setColor(DARK).printRoundedRectangle(65,160,200,240,14)
                .printImage(avatar,70,165,190,230)
                // خط فاصل عمودي
                .setColor('rgba(255,255,255,0.08)').printRectangle(300,145,2,280)
                // البيانات
                .setColor('#888888').setTextFont(F(14,'bold')).setTextAlign('left')
                .printText('الاسم / Name',330,185);
                fitText(canvas, displayName.substring(0,35), 500, 28, 330, 220, '#ffffff');
                
                canvas.setColor('#888888').setTextFont(F(14,'bold'))
                .printText('الايدي / ID',330,270)
                .setColor('#ffffff').setTextFont(F(22))
                .printText(uid,330,300)
                
                canvas.setColor('#888888').setTextFont(F(14,'bold'))
                .printText('العمر / Age',330,350)
                .setColor('#ffffff').setTextFont(F(22))
                .printText(age,330,380)
                
                canvas.setColor('#888888').setTextFont(F(14,'bold'))
                .printText('تاريخ الميلاد / DOB',540,350)
                .setColor('#ffffff').setTextFont(F(22))
                .printText(dob,540,380)
                
                canvas.setColor('#888888').setTextFont(F(14,'bold'))
                .printText('السيرفر / Server',330,430)
                .setColor(G).setTextFont(F(18));
                fitText(canvas, guildName.substring(0,30), 450, 22, 330, 460, G);
                
                canvas.setColor('#888888').setTextFont(F(14,'bold'))
                .printText('تاريخ الإصدار / Issued',330,510)
                .setColor('#ffffff').setTextFont(F(20))
                .printText(now,330,540)
                // QR كود - يمين، فوق التذييل
                .setColor('#ffffff').printRoundedRectangle(W-165,420,125,125,10)
                .printImage(qrImg, W-162,423,119,119)
                .setColor('#888888').setTextAlign('center')
                .setTextFont(F(9,'bold'))
                .printText('SCAN',W-102,560)
                // تذييل
                .setColor(G).printRectangle(30,H-55,W-60,3)
                .setColor('#666666').setTextAlign('center')
                .setTextFont(F(11,'bold'))
                .printText('This card is property of CIA Community • Unauthorized use prohibited • v1.0',W/2,H-25);

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer,{name:'id-card.png'})] });
        } catch (e) {
            await Message.editReply({ content: `❌ خطأ: ${e.message}` });
        }
    }
};