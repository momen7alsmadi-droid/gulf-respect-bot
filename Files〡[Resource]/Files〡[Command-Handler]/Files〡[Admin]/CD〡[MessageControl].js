"use strict";
import { EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder } from 'discord.js';
import { VERSION } from '../../Files〡[Config]/Files〡[Config].js';
import { readFileSync, writeFileSync } from 'fs';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

const CATEGORIES = {
    activation: {
        name: '📨 نظام التفعيل',
        messages: ['welcome', 'activation', 'bank']
    },
    tickets: {
        name: '🎫 نظام التذاكر',
        messages: ['ticketTf3el', 'ticketOwner', 'ticketHelp', 'ticketShakwa', 'ticketT2dem', 'ticketM7kma', 'ticketHe2a', 'ticketClose']
    },
    admin: {
        name: '🛡️ الإدارة',
        messages: ['adaraPanel', 'callAdmin', 'evaluationDM', 'employmentConfirm', 'lineDivider']
    },
    police: {
        name: '👮 نظام الشرطة',
        messages: ['policeLogin', 'policeLogout', 'policePanel', 'violationsPanel', 'reportPanel', 'civilPanel', 'prisonDM']
    },
    government: {
        name: '🏛️ الحكومة',
        messages: ['shuriPanel', 'votePanel', 'adsPanel', 'circularsPanel', 'submissionsPanel', 'idPanel', 'prosecutionDM', 'authorityDM']
    },
    general: {
        name: '⚙️ عام',
        messages: ['serverName']
    }
};

function loadDB() { return JSON.parse(readFileSync(DB_PATH, 'utf8')); }
function saveDB(db) { writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8'); }

export default {
    name: 'رسائل',
    description: "التحكم بجميع رسائل البوت",
    aliases: ['messages', 'msgs'],
    run: async (Client, Message) => {
        const isAdmin = Message.member.roles.cache.has('1525549017960808660');
        if (!isAdmin) return Message.reply({ content: '❌ للادارة العليا فقط' });

        const Args = Message.content.split(' ');
        const action = Args[1];
        const msgKey = Args[2];
        const newText = Args.slice(3).join(' ');

        // عرض كل الرسائل
        if (!action) {
            const db = loadDB();
            const Embed = new EmbedBuilder()
                .setTitle('📝 التحكم بجميع رسائل البوت')
                .setColor('#FFD700')
                .setDescription(`**${Object.keys(db).length} رسالة قابلة للتعديل**\n\n**للتعديل:** \`=رسائل تعديل <المفتاح> <النص>\`\n**للعرض:** \`=رسائل عرض <المفتاح>\`\n\n**المتغيرات:** \`{member}\` العضو \`{admin}\` الإداري \`{server}\` السيرفر \`{reason}\` السبب \`{duration}\` المدة \`{rank}\` الرتبة \`{channel}\` القناة`)
                .setFooter({ text: `v${VERSION} • اختر قسم من القائمة المنسدلة` });

            // قائمة منسدلة واحدة للأقسام
            const Menu = new StringSelectMenuBuilder()
                .setCustomId('Messages-Category')
                .setPlaceholder('اختر القسم لعرض رسائله...')
                .addOptions(Object.entries(CATEGORIES).map(([key, cat]) => ({
                    label: cat.name,
                    description: `${cat.messages.length} رسائل`,
                    value: key,
                })));

            return Message.reply({ embeds: [Embed], components: [{ type: 1, components: [Menu] }] });
        }

        // عرض رسالة محددة
        if (action === 'عرض' && msgKey) {
            const db = loadDB();
            if (!db[msgKey]) return Message.reply({ content: '❌ مفتاح غير معروف. استخدم `=رسائل` للقائمة' });
            return Message.reply({
                embeds: [{
                    title: `📝 ${db[msgKey].title}`,
                    description: `**المفتاح:** \`${msgKey}\`\n\n**النص الحالي:**\n\`\`\`${db[msgKey].content}\`\`\``,
                    color: 0xFFD700,
                    footer: { text: `=رسائل تعديل ${msgKey} <النص الجديد>` }
                }]
            });
        }

        // تعديل رسالة
        if (action === 'تعديل' && msgKey && newText) {
            const db = loadDB();
            if (!db[msgKey]) return Message.reply({ content: '❌ مفتاح غير معروف' });
            db[msgKey].content = newText;
            saveDB(db);
            return Message.reply({ content: `✅ **تم تحديث \`${msgKey}\`**\n-# أعد تشغيل البوت لتطبيق التغيير • v${VERSION}` });
        }

        return Message.reply({ content: '❌ **الاستخدام:**\n`=رسائل` - عرض كل الرسائل\n`=رسائل عرض <مفتاح>` - عرض رسالة\n`=رسائل تعديل <مفتاح> <نص>` - تعديل رسالة' });
    }
};