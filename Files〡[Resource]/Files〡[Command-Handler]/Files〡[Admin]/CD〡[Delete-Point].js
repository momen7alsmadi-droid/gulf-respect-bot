"use strict";
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
import DB〡AdminPoint from '../../Files〡[DataBase]/DB〡[Admin-Point].js';
import { EmbedBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db';
const Points = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Points].json' })
const Voice = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Voice].json' })
export default {
    name: 'تصفير-نقاط',
    description: "تصفير نقاط الاداريين",
    Founder: false,
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        if (!Message.member.roles.cache.has(CommandPremission.DeletePoint)) return Message.reply({ content: `**ليس لديك الصلاحية لتنفيذ هذا الامر**` });
        const Agrs = Message.content.split(' ');
        const Member = Message.mentions.members.first() || Message.guild.members.cache.get(Agrs[1]);
        if (!Member) return Message.reply({ content: `**يرجى منشن العضو بشكل الصحيح**` });
        const MemberDB = await DB〡AdminPoint.findOne({ _id: Member.id });
        if (MemberDB) {
            MemberDB.Point = 0;
            MemberDB.Added = 0;
            MemberDB.StartGame = 0;
            MemberDB.JoinGame = 0;
            MemberDB.Added = 0
            MemberDB.AdminAssistant = 0;
            await MemberDB.save();
        }
        Points.delete(`Point-Tf3el-${Message.guild.id}-${Member.id}`);
        Voice.delete(`Admin〡${Member.id}`);
        Points.delete(`Evaluation〡${Member.id}`)
        Message.reply({ content: `**تم حذف نقاط بنجاح**` });
        const Channel = Message.guild.channels.cache.get('1387331972094890036');
        const Embed = new EmbedBuilder();
        Embed.setAuthor({ name: Message.author.username, iconURL: Message.author.displayAvatarURL({ forceStatic: true, size: 4096 }) });
        Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
        Embed.setColor(Message.guild.members.me.displayHexColor);
        Embed.setDescription(`**__ تم تصفير النقاط  

من قبل الاداري : ${Message.author}

الاداري الذي تم تصفير نقاطه : ${Member}__**`);
        Channel.send({ embeds: [Embed] }).catch(() => { });
    }
}