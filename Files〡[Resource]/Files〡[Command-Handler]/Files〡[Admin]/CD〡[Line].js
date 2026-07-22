"use strict";
import { AttachmentBuilder } from 'discord.js';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
export default {
    name: 'خط',
    description: "ارسال خط",
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        if (!Message.member.roles.cache.has(CommandPremission.Line)) return Message.reply({ content: `**ليس لديك الصلاحية لتنفيذ هذا الامر**` });
        const Attachment = new AttachmentBuilder('line.gif', { name: 'line.gif' });
        await Message.delete().catch(() => { });
        await Message.channel.send({ files: [Attachment] }).catch(() => { });
    }
}