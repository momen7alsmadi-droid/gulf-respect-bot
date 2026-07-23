"use strict";
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { AttachmentBuilder } from 'discord.js';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

function getDB() {
    if (!existsSync(DB_PATH)) return {};
    try { return JSON.parse(readFileSync(DB_PATH, 'utf8')); }
    catch { return {}; }
}

function saveDB(db) {
    writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

async function sendAsImage(channel, url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('fetch failed');
        const buffer = Buffer.from(await res.arrayBuffer());
        const ext = url.split('.').pop()?.split('?')[0] || 'png';
        const att = new AttachmentBuilder(buffer, { name: `line.${ext}` });
        await channel.send({ files: [att] });
        return true;
    } catch {
        await channel.send('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬').catch(() => {});
        return false;
    }
}

export default {
    name: 'خط',
    description: "ارسال خط فاصل (ارفع صورة لتغييره)",
    run: async (Client, Message) => {
        const attachment = Message.attachments.first();
        const db = getDB();
        
        // رفع صورة جديدة
        if (attachment?.contentType?.startsWith('image/')) {
            db.lineImage = { title: 'صورة الخط', content: attachment.url };
            saveDB(db);
            await Message.delete().catch(() => {});
            await sendAsImage(Message.channel, attachment.url);
            return;
        }

        // إرسال الخط الحالي
        await Message.delete().catch(() => {});
        const url = db.lineImage?.content;
        
        if (url?.startsWith('http')) {
            await sendAsImage(Message.channel, url);
        } else {
            await Message.channel.send('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬').catch(() => {});
        }
    }
};