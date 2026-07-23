"use strict";
import { ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js';
import { readFileSync, writeFileSync } from 'fs';
import { VERSION } from '../Files〡[Config]/Files〡[Config].js';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

const MESSAGES_INFO = {
    welcome: { name: 'رسالة الترحيب (خاص)', vars: '{member} = اسم العضو' },
    activation: { name: 'رسالة التفعيل (القناة)', vars: '{member} = العضو, {admin} = الإداري' },
    bank: { name: 'رسالة المصرف (خاص)', vars: '{member} = اسم العضو' },
    adara: { name: 'لوحة الإدارة', vars: 'نص عادي' },
    serverName: { name: 'اسم السيرفر', vars: 'أي نص' },
};

export default async function (Client, Message) {
    if (Message.isStringSelectMenu() && Message.customId === 'Messages-Edit') {
        const isAdmin = Message.member.roles.cache.has('1525549017960808660');
        if (!isAdmin) return Message.reply({ content: '❌ لا تملك صلاحية', flags: 64 });

        const key = Message.values[0];
        const info = MESSAGES_INFO[key];
        if (!info) return;

        const Modal = new ModalBuilder()
            .setCustomId(`MsgEdit-${key}`)
            .setTitle(`تعديل: ${info.name}`);

        const Input = new TextInputBuilder()
            .setCustomId('newText')
            .setLabel('النص الجديد (المتغيرات: ' + info.vars + ')')
            .setStyle(2)
            .setPlaceholder('اكتب النص الجديد هنا...')
            .setRequired(true);

        Modal.addComponents(new ActionRowBuilder({ components: [Input] }));
        await Message.showModal(Modal);
    }

    if (Message.isModalSubmit() && Message.customId.startsWith('MsgEdit-')) {
        const key = Message.customId.replace('MsgEdit-', '');
        const newText = Message.fields.getTextInputValue('newText');
        
        try {
            const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
            if (!db[key]) return Message.reply({ content: '❌ مفتاح غير معروف', flags: 64 });
            db[key].content = newText;
            writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
            
            await Message.reply({ 
                content: `✅ **تم تحديث \`${key}\`**\n> النص الجديد:\n\`\`\`${newText.slice(0, 500)}\`\`\`\n> ⚠️ أعد تشغيل البوت لتطبيق التغيير\n-# v${VERSION}`,
                flags: 64 
            });
        } catch (e) {
            await Message.reply({ content: `❌ فشل الحفظ: ${e.message}`, flags: 64 });
        }
    }
};