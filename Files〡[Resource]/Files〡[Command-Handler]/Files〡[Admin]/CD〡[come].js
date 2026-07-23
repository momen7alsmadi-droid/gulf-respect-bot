"use strict";
import { EmbedBuilder } from 'discord.js';
import { readFileSync } from 'fs';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

function getMsg(key, fallback) {
    try { const db = JSON.parse(readFileSync(DB_PATH, 'utf8')); return db[key]?.content || fallback; }
    catch { return fallback; }
}

export default {
    name: 'نداء',
    description: "ارسال نداء",
    run: async (Client, Message) => {
        const Args = Message.content.split(' ');
        const Member = Message.mentions.members.first() || Message.guild.members.cache.get(Args[1])
        if (!Member) return Message.reply({ content: `**الرجاء منشن المستخدم**` });
        const Reason = Args.slice(2).join(' ');
        if (!Reason) return Message.reply({ content: `**الرجاء اضافة سبب النداء**` });
        
        const serverName = getMsg('serverName', '♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜');
        const callMsg = getMsg('callMessage', '**— عزيزي الـعـضـو : {member}\n\n— تم إرسـال نـداء هـام إلـيـك فـي : {channel}\n\nالـتـفـاصـيـل : {reason}\n\n\`{server}\`**');
        const imageUrl = getMsg('lineImage', 'https://i.postimg.cc/hjzk1Srt/jpg.jpg');
        
        const content = callMsg
            .replace(/\{member\}/g, `${Member}`)
            .replace(/\{channel\}/g, `${Message.channel}`)
            .replace(/\{reason\}/g, Reason)
            .replace(/\{server\}/g, serverName);

        const Embed = new EmbedBuilder()
            .setDescription(content)
            .setColor('#FFD700');

        await Member.send({ embeds: [Embed] }).catch(() => { });
        if (imageUrl?.startsWith('http')) {
            await Member.send({ embeds: [{ image: { url: imageUrl } }] }).catch(() => {});
        }
        await Message.reply({ content: `**تم ارسال نداء للعضو**` });
    }
};