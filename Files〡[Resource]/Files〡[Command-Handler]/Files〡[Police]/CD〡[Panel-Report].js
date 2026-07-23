"use strict";
import { ButtonBuilder, EmbedBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db'
import { Police } from '../../Files〡[Config]/Files〡[Config].js';
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Police].json' })
export default {
    name: 'بانل-ريبورت',
    description: "ارسال بانل للريبورت",
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        // ✅ تم إلغاء التحقق من الصلاحية
        const Embed = new EmbedBuilder()
        Embed.setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
        Embed.setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
        Embed.setColor(Message.guild.members.me.displayHexColor);
        Embed.setThumbnail(`https://i.postimg.cc/85XCjPCV/zip_3.jpg`)
        Embed.setDescription(`**__
اهلاً بك عزيزي العضو 

في نظام البلاغات في قولف ريسبكت

للإبلاغ يرجى النقر على {إبلاغ}

~~مع تحيات وزارة الداخلية~~
__**`)
        const Button = new ButtonBuilder({ customId: 'Report〡Panel', label: 'إبلاغ', style: 2, emoji: '<:GulFRecPecT:1416537809958998118>' })
        await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [Button] }] });
    }
}