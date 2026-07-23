"use strict";
import { writeFileSync, readFileSync, existsSync } from 'fs';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

function getDB() {
    if (!existsSync(DB_PATH)) return {};
    try { return JSON.parse(readFileSync(DB_PATH, 'utf8')); }
    catch { return {}; }
}

function saveDB(db) { writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8'); }

export default {
    name: 'خط',
    description: "ارسال خط فاصل",
    run: async (Client, Message) => {
        await Message.delete().catch(() => {});
        const db = getDB();
        const url = db.lineImage?.content;
        
        if (url?.startsWith('http')) {
            // رابط فقط بدون أي نص = ديسكورد يعرضها صورة
            await Message.channel.send({ content: url, flags: 0 }).catch(() => {});
        } else {
            await Message.channel.send('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬').catch(() => {});
        }
    }
};