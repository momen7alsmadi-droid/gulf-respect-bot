"use strict";
import { writeFileSync, readFileSync, existsSync } from 'fs';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

function getDB() {
    if (!existsSync(DB_PATH)) return {};
    try { return JSON.parse(readFileSync(DB_PATH, 'utf8')); }
    catch { return {}; }
}

function saveDB(db) {
    writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

export default {
    name: 'خط',
    description: "ارسال خط فاصل (ارفع صورة لتغييره)",
    run: async (Client, Message) => {
        const attachment = Message.attachments.first();
        const db = getDB();
        
        // رفع صورة جديدة للخط
        if (attachment?.contentType?.startsWith('image/')) {
            db.lineImage = { title: 'صورة الخط', content: attachment.url };
            saveDB(db);
            await Message.delete().catch(() => {});
            // الرابط فقط = ديسكورد يعرضها كصورة
            await Message.channel.send(attachment.url).catch(() => {});
            return;
        }

        // إرسال الخط الحالي
        await Message.delete().catch(() => {});
        const url = db.lineImage?.content;
        
        if (url?.startsWith('http')) {
            // مجرد رابط = ديسكورد يعرض الصورة مباشرة
            await Message.channel.send(url).catch(() => {});
        } else {
            await Message.channel.send('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬').catch(() => {});
        }
    }
};