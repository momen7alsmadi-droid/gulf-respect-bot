"use strict";
import { JsonDatabase } from 'wio.db'
import { Police } from '../../Files〡[Config]/Files〡[Config].js'
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Police].json' })
export default {
    name: 'تصفير-عسكري',
    description: "تصفير نقاط للعضو",
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        if (!Message.member.roles.cache.some(Role => Police.WhistlingPoint.includes(Role.id))) return Message.reply({ content: `**ليس لديك الصلاحية لتصفير النقاط**` });
        const Agrs = Message.content.split(` `);
        const Member = Message.mentions.members.first() || Message.guild.members.cache.get(Agrs[1]);
        if (!Member) return Message.reply({ content: `**يرجى تحديد العضو المراد تصفير النقاط منه**` });
        Database.set(`Police-Point〡${Message.guild.id}`, 0);
        await Message.reply({ content: `**تم تصفير نقاط العضو ${Member.user.username}**` });
    }
}