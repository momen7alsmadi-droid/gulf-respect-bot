"use strict";
import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';
import { writeFileSync, readFileSync, existsSync } from 'fs';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

function getDB() {
    if (!existsSync(DB_PATH)) return {};
    try { return JSON.parse(readFileSync(DB_PATH, 'utf8')); }
    catch { return {}; }
}

export default {
    name: "خط",
    description: "تغيير صورة الخط الفاصل (للإدارة فقط)",
    type: 1, // CHAT_INPUT
    options: [
        {
            name: "صورة",
            description: "ارفع الصورة التي تريدها كخط فاصل",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        }
    ],
    
    run: async function (Client, Message) {
        // فقط الأدمن
        if (!Message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return Message.reply({ content: '❌ هذا الأمر للإداريين فقط (Administrator)', flags: 64 });
        }

        const attachment = Message.options.getAttachment('صورة');
        if (!attachment?.contentType?.startsWith('image/')) {
            return Message.reply({ content: '❌ يرجى رفع ملف صورة فقط', flags: 64 });
        }

        const db = getDB();
        db.lineImage = { title: 'صورة الخط', content: attachment.url };
        writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');

        await Message.reply({ 
            content: `✅ **تم تحديث صورة الخط!**\n-# استخدم =خط لإرسالها`, 
            flags: 64 
        });
    }
};