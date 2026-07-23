"use strict";
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
import { EmbedBuilder } from 'discord.js';
export default {
    name: 'نداء',
    description: "ارسال نداء",
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        // ✅ تم إلغاء التحقق من الصلاحية
        const Args = Message.content.split(' ');
        const Member = Message.mentions.members.first() || Message.guild.members.cache.get(Args[1])
        if (!Member) return Message.reply({ content: `**الرجاء منشن المستخدم**` });
        const Reason = Args.slice(2).join(' ');
        if (!Reason) return Message.reply({ content: `**الرجاء اضافة سبب النداء**` });
        const Embed = new EmbedBuilder()
        Embed.setDescription(`**— عزيزي الـعـضـو : ${Member}

— تم إرسـال نـداء هـام إلـيـك فـي هـذا الـروم : ${Message.channel}

الـتـفـاصـيـل : ${Reason}

\`GULF RESPECT أعـظـم سـيـرفـر\`**`)
        await Member.send({ embeds: [Embed] }).catch(async () => { });
        await Member.send({ files: ['https://i.postimg.cc/hjzk1Srt/jpg.jpg'] })
        await Message.reply({ content: `**تم ارسال نداء للعضو**` });
    }
}