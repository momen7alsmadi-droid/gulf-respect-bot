"use strict";
import { writeFileSync, readFileSync } from 'fs';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

export default {
    name: 'خط',
    description: "ارسال خط فاصل (ارفع صورة لتغييره)",
    run: async (Client, Message) => {
        const attachment = Message.attachments.first();
        
        // رفع صورة جديدة = تحديث الخط
        if (attachment?.contentType?.startsWith('image/')) {
            const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
            db.lineImage = { title: 'صورة الخط', content: attachment.url };
            writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
            await Message.delete().catch(() => {});
            // إرسال الصورة مباشرة - Discord يعرض الرابط كصورة
            await Message.channel.send({ content: attachment.url }).catch(() => {});
            return;
        }

        // إرسال الخط الحالي
        await Message.delete().catch(() => {});
        const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
        const imageUrl = db.lineImage?.content;
        
        if (imageUrl?.startsWith('http')) {
            // Discord يعرض رابط الصورة كصورة مباشرة
            await Message.channel.send({ content: imageUrl }).catch(() => {});
        } else {
            // لا توجد صورة - إرسال خط نصي
            await Message.channel.send({ content: '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬' }).catch(() => {});
        }
    }
};