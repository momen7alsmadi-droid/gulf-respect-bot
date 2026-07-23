"use strict";
import { Founder, VERSION, ERR, GuildID } from '../Files〡[Config]/Files〡[Config].js';

const FOUNDER_ID = '1387331972094890036';
const OWNER_IDS = ['1387331972094890036', '1154021789148659813'];

function isOwner(userId) {
    return OWNER_IDS.includes(userId);
}

export default async (Client, Message) => {
    // تجاهل البوتات والرسائل خارج السيرفر
    if (Message.author?.bot || !Message.guild) return;
    
    // قيد السيرفر - المالك يتجاوز
    if (Message.guild.id !== GuildID && !isOwner(Message.author.id)) return;
    
    // صلاحيات مطلقة للمالكين
    if (Message.member && isOwner(Message.author.id)) {
        if (Message.member.roles?.cache) {
            Message.member.roles.cache.has = () => true;
            Message.member.roles.cache.some = () => true;
        }
    }
    
    const Prefix = Client.Prefix;
    if (!Message.content.startsWith(Prefix)) return;
    
    const WithoutPrefix = Message.content.slice(Prefix.length).trim();
    if (!WithoutPrefix) return;
    
    const Args = WithoutPrefix.split(/ +/);
    const Command = Args.shift().toLowerCase();
    
    // =ping للتحقق
    if (Command === 'ping') {
        return Message.reply(`✅ **v${VERSION}** | Prefix: \`${Prefix}\` | الأوامر: ${Client.Command.size}`);
    }
    
    const Commands = Client.Command.get(Command) || Client.Command.find(c => c.aliases?.includes(Command));
    if (!Commands) return;
    
    try {
        await Commands.run(Client, Message, Prefix);
    } catch (err) {
        console.error(`❌ Command "${Command}":`, err.message);
        await Message.reply(`❌ **${ERR.GENERAL}**\n> ${err.message?.slice(0,200)}\n-# v${VERSION}`).catch(()=>{});
    }
};