"use strict";
import { JsonDatabase } from 'wio.db'
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Police].json' })
import { CivilRegistry } from '../../Files〡[Config]/Files〡[Config].js'
import { ButtonBuilder, EmbedBuilder } from 'discord.js';
export default {
    name: 'السجل-المدني',
    description: "السجل المدني",
    Founder: false,
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
        Embed.setDescription(`**__

- اهلاً بك عزيز العسكري في لوحة التحكم الخاصة بالسجلات المدنية

لإنشاء سجل لـ شخص يرجى النقر على{إنشاء سجل} و بعد ذالك اجابة البوت على الاسئلة

للاستعلام عن سجل عن يرجى النقر على {استعلام عن سجل شخص} و إكمال الخطوات مع البوت 

تعديل سجل لـ تعديل سجل شخص يرجى النقر على {تعديل سجل} و إكمال الخطوات مع البوت


~~مع تحيات وزارة الداخلية ~~
__**`)
        const Buttons = [
            new ButtonBuilder({ customId: 'CivilRegistry〡Create', label: 'إنشاء سجل', style: 2, emoji: '<:GulfRecPecT:1415805541699158097>' }),
            new ButtonBuilder({ customId: 'CivilRegistry〡View', label: 'استعلام', style: 2, emoji: '<:GulfRecPecT:1415805541699158097>' }),
            new ButtonBuilder({ customId: 'CivilRegistry〡Edit', label: 'تعديل سجل', style: 2, emoji: '<:GulfRecPecT:1415805541699158097>' })
        ]
        await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: Buttons }] });
    }
}