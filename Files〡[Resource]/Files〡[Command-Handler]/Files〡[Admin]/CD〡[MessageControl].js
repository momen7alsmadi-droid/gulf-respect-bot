"use strict";
import { EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ActionRowBuilder } from 'discord.js';
import { VERSION } from '../../Files〡[Config]/Files〡[Config].js';
import { readFileSync, writeFileSync } from 'fs';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

function loadDB() {
    return JSON.parse(readFileSync(DB_PATH, 'utf8'));
}

function saveDB(db) {
    writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

const MESSAGES_INFO = {
    welcome: { name: '📨 رسالة الترحيب (خاص)', desc: 'ترسل للعضو بعد التفعيل في الخاص', vars: '{member} = اسم العضو' },
    activation: { name: '📢 رسالة التفعيل (القناة)', desc: 'تظهر في القناة بعد التفعيل', vars: '{member} = العضو, {admin} = الإداري' },
    bank: { name: '🏦 رسالة المصرف (خاص)', desc: 'ترسل للعضو بعد فتح الحساب', vars: '{member} = اسم العضو' },
    adara: { name: '🛡️ لوحة الإدارة', desc: 'وصف إيمبد لوحة الإدارة', vars: 'نص عادي' },
    serverName: { name: '🏷️ اسم السيرفر', desc: 'يظهر في رسائل البوت', vars: 'أي نص' },
};

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
                .setTitle('📝 التحكم برسائل البوت')
                .setColor('#FFD700')
                .setDescription('**اختر الرسالة التي تريد تعديلها من القائمة المنسدلة**\n\n**للتعديل مباشرة:**\n`=رسائل تعديل <المفتاح> <النص الجديد>`\n\n**لاستعراض نص رسالة:**\n`=رسائل عرض <المفتاح>`')
                .addFields(
                    { name: '📨 welcome', value: 'رسالة الترحيب بعد التفعيل (خاص)' },
                    { name: '📢 activation', value: 'رسالة التفعيل في القناة' },
                    { name: '🏦 bank', value: 'رسالة المصرف (خاص)' },
                    { name: '🛡️ adara', value: 'وصف لوحة الإدارة' },
                    { name: '🏷️ serverName', value: 'اسم السيرفر الظاهر' },
                )
                .setFooter({ text: `v${VERSION}` });

            const Menu = new StringSelectMenuBuilder()
                .setCustomId('Messages-Edit')
                .setPlaceholder('اختر الرسالة المراد تعديلها...')
                .addOptions(Object.entries(MESSAGES_INFO).map(([key, info]) => ({
                    label: info.name,
                    description: info.desc,
                    value: key,
                })));

            return Message.reply({ embeds: [Embed], components: [{ type: 1, components: [Menu] }] });
        }

        // عرض رسالة محددة
        if (action === 'عرض' && msgKey) {
            const db = loadDB();
            if (!db[msgKey]) return Message.reply({ content: '❌ مفتاح غير معروف' });
            const info = MESSAGES_INFO[msgKey];
            return Message.reply({
                embeds: [{
                    title: `📝 ${info.name}`,
                    description: `**المتغيرات:** ${info.vars}\n\n**النص الحالي:**\n\`\`\`${db[msgKey].content}\`\`\``,
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
            return Message.reply({ content: `✅ **تم تحديث \`${msgKey}\`** بنجاح!\n> ⚠️ يلزم إعادة تشغيل البوت لتطبيق التغيير\n-# v${VERSION}` });
        }

        if (action === 'تعديل' && msgKey && !newText) {
            return Message.reply({ content: `❌ **استخدام:** \`=رسائل تعديل ${msgKey} <النص الجديد>\`\n> المتغيرات: ${MESSAGES_INFO[msgKey]?.vars || 'لا يوجد'}` });
        }

        return Message.reply({ content: '❌ استخدام خاطئ. استخدم `=رسائل` للمساعدة' });
    }
};