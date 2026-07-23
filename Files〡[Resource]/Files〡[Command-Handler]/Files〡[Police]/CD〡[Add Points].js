"use strict";
import { JsonDatabase } from 'wio.db'
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Police].json' })
import { Police } from '../../Files〡[Config]/Files〡[Config].js'
export default {
    name: 'إضافة-نقاط',
    description: "إضافة نقاط للعضو",
    Founder: false,
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        // ✅ تم إلغاء التحقق من الصلاحية
        const Agrs = Message.content.split(` `);
        const Member = Message.mentions.members.first() || Message.guild.members.cache.get(Agrs[1]);
        if (!Member) return Message.reply({ content: `**يرجى تحديد العضو المراد إضافة النقاط إليه**` });
        const PointInput = Agrs[2];
        if (!PointInput) return Message.reply({ content: `**يرجى تحديد النقاط المراد إضافتها**` });
        
        // التحقق من أن المدخل يحتوي على أرقام فقط
        if (!/^\d+$/.test(PointInput)) return Message.reply({ content: `**يرجى إدخال أرقام فقط للنقاط**` });
        
        const Point = parseInt(PointInput, 10);
        
        // التحقق من أن النقاط ضمن نطاق معقول
        if (Point <= 0) return Message.reply({ content: `**يجب أن تكون النقاط أكبر من صفر**` });
        if (Point > 1000) return Message.reply({ content: `**لا يمكن إضافة أكثر من 1000 نقطة في المرة الواحدة**` });
        
        Database.add(`Police-AddPoint〡${Member.id}`, Point);
        await Message.reply({ content: `**تم إضافة ${Point} نقطة إلى ${Member.user}**` });
    }
}