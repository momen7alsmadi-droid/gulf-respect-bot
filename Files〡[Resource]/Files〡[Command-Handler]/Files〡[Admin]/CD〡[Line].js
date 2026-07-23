"use strict";
import { readFileSync } from 'fs';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

export default {
    name: 'خط',
    description: "ارسال خط فاصل",
    run: async (Client, Message) => {
        await Message.delete().catch(() => {});
        try {
            const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
            const url = db.lineImage?.content;
            if (url?.startsWith('http')) {
                await Message.channel.send({ content: url });
            } else {
                await Message.channel.send('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬');
            }
        } catch {
            await Message.channel.send('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬');
        }
    }
};