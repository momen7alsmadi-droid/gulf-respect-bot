"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';

// تسجيل الخطوط
try {
    const canvasMod = await import('canvas');
    canvasMod.registerFont('NotoSansArabic.ttf', { family: 'Arabic' });
    canvasMod.registerFont('NotoEmoji.ttf', { family: 'Emoji' });
    canvasMod.registerFont('NotoSansMath.ttf', { family: 'Math' });
} catch {}

const FONT = (size, weight='') => `${weight} ${size}px Arabic, Emoji, Math, Noto Sans Symbols2, sans-serif`.trim();

// تنظيف النص من الرموز الرياضية المزخرفة
function cleanText(text) {
    return text.replace(/[\u{1D400}-\u{1D7FF}]/gu, '').trim()
               .replace(/[\u{200B}\u{200C}\u{200D}\u{FE0F}]/gu, '')
               .replace(/\s+/g, ' ').trim();
}

export default {
    name: "بطاقة",
    description: "إنشاء بطاقة عضوية احترافية",
    type: 1,
    options: [
        { name: "العضو", description: "اختر العضو", type: ApplicationCommandOptionType.User, required: true },
        { name: "الرتبة", description: "اكتب الرتبة", type: ApplicationCommandOptionType.String, required: true },
        { name: "الايدي", description: "رقم الهوية", type: ApplicationCommandOptionType.String, required: false },
    ],
    run: async (Client, Message) => {
        await Message.deferReply();
        try {
            const user = Message.options.getUser('العضو');
            const rank = Message.options.getString('الرتبة');
            const id = Message.options.getString('الايدي') || user.id.slice(-6);
            const member = Message.guild.members.cache.get(user.id);
            const name = cleanText(member?.displayName || user.username) || 'عضو';
            const serverName = cleanText(Message.guild.name) || 'CIA Community';
            const W = 1000, H = 580;
            const GOLD = '#F1C40F', BG = '#2B2D31', CARD = '#1E1F22', TEXT = '#FFFFFF', SUBTEXT = '#B0B0B0';

            // صورة العضو
            const avatarUrl = user.displayAvatarURL({ extension: 'png', size: 256 });
            const avatar = await loadImage(avatarUrl);

            const canvas = new Canvas(W, H)
                // خلفية ديسكورد
                .setColor(BG).printRectangle(0, 0, W, H)
                // ظل البطاقة
                .setColor('rgba(0,0,0,0.4)').printRoundedRectangle(52, 22, W-84, H-24, 24)
                // البطاقة
                .setColor(CARD).printRoundedRectangle(40, 10, W-80, H-20, 20)
                // شريط علوي ذهبي
                .setColor(GOLD).printRoundedRectangle(40, 10, W-80, 80, { topLeft: 20, topRight: 20 })
                // اسم السيرفر
                .setColor('#1E1F22')
                .setTextFont(FONT(22, 'bold')).setTextAlign('center')
                .printText(serverName.substring(0, 30), W/2, 58)
                // منطقة الصورة - خلفية دائرية
                .setColor(GOLD).printCircle(135, 210, 92)
                .setColor('#1E1F22').printCircle(135, 210, 88)
                // صورة العضو دائرية
                .printCircularImage(avatar, 135, 210, 84)
                // خط فاصل أسفل الشريط
                .setColor('rgba(255,255,255,0.05)').printRectangle(80, 100, W-160, 1)
                // الاسم
                .setColor(TEXT)
                .setTextFont(FONT(32, 'bold')).setTextAlign('left')
                .printText(name.substring(0, 25), 270, 180)
                // الرتبة
                .setColor(GOLD)
                .setTextFont(FONT(22)).setTextAlign('left')
                .printText(rank.substring(0, 30), 275, 220)
                // معرف
                .setColor(GOLD).setTextFont(FONT(13, 'bold')).setTextAlign('left')
                .printText('الـمـعـرف', 280, 275)
                .setColor(TEXT).setTextFont(FONT(20))
                .printText(id, 280, 302)
                // خط فاصل
                .setColor('rgba(255,255,255,0.08)').printRectangle(80, 330, W-160, 1)
                // معلومات البطاقة - شبكة
                const info = [
                    { label: 'اﻟﺮﺗﺒﺔ', value: rank.substring(0, 20) },
                    { label: 'ﺗﺎرﻳﺦ اﻹﺻﺪار', value: new Date().toLocaleDateString('ar-SA') },
                    { label: 'اﻟﺴﻴﺮﻓﺮ', value: serverName.substring(0, 20) },
                    { label: 'رﻗﻢ اﻟﺒﻄﺎﻗﺔ', value: id },
                ];
                const cols = 2;
                const startX = 80, colW = (W-160)/cols;
                for (let i = 0; i < info.length; i++) {
                    const col = i % cols;
                    const row = Math.floor(i / cols);
                    const ix = startX + col * colW;
                    const iy = 375 + row * 80;
                    canvas.setColor(SUBTEXT).setTextFont(FONT(13, 'bold')).setTextAlign('left')
                        .printText(info[i].label, ix, iy);
                    canvas.setColor(TEXT).setTextFont(FONT(18))
                        .printText(info[i].value, ix, iy + 30);
                }
                // تذييل
                .setColor(GOLD).setTextAlign('center')
                .setTextFont(FONT(11, 'bold'))
                .printText('CIA COMMUNITY • Official Membership Card', W/2, H-20);

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'card.png' })] });
        } catch (e) {
            await Message.editReply({ content: `❌ خطأ: ${e.message}` });
        }
    }
};