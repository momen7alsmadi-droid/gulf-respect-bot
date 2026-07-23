"use strict";
import { CommandPremission, LogPoint } from '../../Files〡[Config]/Files〡[Config].js';
import DB〡AdminPoint from '../../Files〡[DataBase]/DB〡[Admin-Point].js';
import { EmbedBuilder } from 'discord.js';
export default {
    name: 'ازالة-نقاط',
    description: "ازالة نقاط الاداريين",
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        // ✅ تم إلغاء التحقق من الصلاحية
        const Agrs = Message.content.split(' ');
        const Member = Message.mentions.members.first() || Message.guild.members.cache.get(Agrs[1]);
        if (!Member) return Message.reply({ content: `**يرجى منشن العضو بشكل الصحيح**` });
        const Points = Agrs[2];
        if (!Points || isNaN(Points)) return Message.reply({ content: `**يرجى ادخال النقاط بشكل الصحيح**` });
        const PointsNumber = parseInt(Points);
        if (PointsNumber < 1) return Message.reply({ content: `**يرجى ادخال النقاط اعلي من 1**` });
        DB〡AdminPoint.findByIdAndUpdate({ _id: Member.id }, { $inc: { Point: -PointsNumber } }, { upsert: true, new: true }).catch(() => {});
        Message.reply({ content: `**تم ازالة نقاط بنجاح**` });
        const Channel = Message.guild.channels.cache.get(LogPoint.Channel);
        const Embed = new EmbedBuilder();
        Embed.setAuthor({ name: Message.author.username, iconURL: Message.author.displayAvatarURL({ forceStatic: true, size: 4096 }) });
        Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
        Embed.setColor(Message.guild.members.me.displayHexColor);
        Embed.setDescription(`**__ تم ازالة نقاط بعدد : ${PointsNumber}

من قبل الاداري : ${Message.author}

للشخص: ${Member}__**`);
        Channel.send({ embeds: [Embed] }).catch(() => { });
    }
}