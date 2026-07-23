"use strict";
import { writeFileSync, readFileSync } from 'fs';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

export default {
    name: 'خط',
    description: "ارسال خط فاصل (ارفع صورة لتغييره)",
    run: async (Client, Message) => {
        const attachment = Message.attachments.first();
        
        // رفع صورة جديدة للخط
        if (attachment?.contentType?.startsWith('image/')) {
            const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
            db.lineImage = { title: 'صورة الخط', content: attachment.url };
            writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
            await Message.delete().catch(() => {});
            // إرسال الصورة كـ embed لتظهر بشكل صحيح
            await Message.channel.send({ 
                content: '✅ **تم تحديث صورة الخط!**',
                embeds: [{ image: { url: attachment.url }, color: 0xFFD700 }]
            }).catch(() => {});
            return;
        }

        // إرسال الخط الحالي
        await Message.delete().catch(() => {});
        const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
        const imageUrl = db.lineImage?.content;
        
        if (imageUrl?.startsWith('http')) {
            await Message.channel.send({ 
                embeds: [{ image: { url: imageUrl }, color: 0xFFD700 }] 
            }).catch(() => {
                Message.channel.send({ content: '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬' }).catch(() => {});
            });
        } else {
            await Message.channel.send({ content: '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬' }).catch(() => {});
        }
    }
};