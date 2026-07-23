"use strict";
import { readFileSync } from 'fs';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

export default {
    name: 'خط',
    description: "ارسال خط فاصل",
    run: async (Client, Message) => {
        await Message.delete().catch(() => { });
        const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
        const imageUrl = db.lineImage?.content;
        if (imageUrl && imageUrl.startsWith('http')) {
            await Message.channel.send({ content: imageUrl }).catch(() => {});
        } else {
            const text = db.lineDivider?.content || '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
            await Message.channel.send({ content: text }).catch(() => { });
        }
    }
};