"use strict";
import { JsonDatabase } from 'wio.db'
import { Police } from '../../Files〡[Config]/Files〡[Config].js'
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Police].json' })
export default {
    name: 'إزالة-نقاط-عسكري',
    description: "إزالة نقاط للعضو من سجل الشرطة",
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        // ✅ تم إلغاء التحقق من الصلاحية
        const Agrs = Message.content.split(` `);
        const Member = Message.mentions.members.first() || Message.guild.members.cache.get(Agrs[1]);
        if (!Member) return Message.reply({ content: `**يرجى تحديد العضو المراد إزالة النقاط منه**` });
        const Point = Number(Agrs[2]);
        if (isNaN(Point)) return Message.reply({ content: `**يرجى تحديد النقاط المراد إزالتها**` });
        Database.substr(`Police-AddPoint〡${Message.guild.id}`, Point);
        await Message.reply({ content: `**تم إزالة ${Point} نقطة إلى ${Member.user.username}**` });
    }
}