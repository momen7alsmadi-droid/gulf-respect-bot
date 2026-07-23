"use strict";
import { writeFileSync, readFileSync } from 'fs';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

export default {
    name: 'خط',
    description: "ارسال خط فاصل (ارفع صورة مع الأمر لتغييرها)",
    run: async (Client, Message) => {
        // إذا كان مع الأمر صورة مرفوعة → حفظها كصورة الخط الجديدة
        const attachment = Message.attachments.first();
        if (attachment && attachment.contentType?.startsWith('image/')) {
            const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
            db.lineImage = { title: 'صورة الخط', content: attachment.url };
            writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
            await Message.delete().catch(() => {});
            await Message.channel.send({ 
                content: `✅ **تم تحديث صورة الخط!**\n-# الصورة الجديدة محفوظة وستستخدم من الآن`,
                files: [attachment.url] 
            }).catch(() => {});
            return;
        }

        // إرسال الخط الحالي
        await Message.delete().catch(() => {});
        const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
        const imageUrl = db.lineImage?.content;
        
        if (imageUrl && imageUrl.startsWith('http')) {
            await Message.channel.send({ files: [imageUrl] }).catch(async () => {
                // إذا فشل رابط الصورة، أرسل النص
                const text = db.lineDivider?.content || '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
                await Message.channel.send({ content: text }).catch(() => {});
            });
        } else {
            const text = db.lineDivider?.content || '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
            await Message.channel.send({ content: text }).catch(() => {});
        }
    }
};