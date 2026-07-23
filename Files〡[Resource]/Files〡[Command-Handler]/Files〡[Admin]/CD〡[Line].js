"use strict";
import { writeFileSync, readFileSync } from 'fs';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

export default {
    name: 'خط',
    description: "ارسال خط فاصل (ارفع صورة لتغييره)",
    run: async (Client, Message) => {
        const attachment = Message.attachments.first();
        
        // رفع صورة جديدة
        if (attachment?.contentType?.startsWith('image/')) {
            const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
            db.lineImage = { title: 'صورة الخط', content: attachment.url };
            writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
            await Message.delete().catch(() => {});
            // إيمبد بدون عنوان = صورة نظيفة
            await Message.channel.send({ embeds: [{ image: { url: attachment.url } }] }).catch(() => {});
            return;
        }

        // إرسال الخط الحالي
        await Message.delete().catch(() => {});
        const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
        const url = db.lineImage?.content;
        
        if (url?.startsWith('http')) {
            // إيمبد بدون كلام = صورة فقط
            await Message.channel.send({ embeds: [{ image: { url } }] }).catch(() => {});
        } else {
            await Message.channel.send({ content: '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬' }).catch(() => {});
        }
    }
};