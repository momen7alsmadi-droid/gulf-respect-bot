"use strict";
import { ButtonBuilder, EmbedBuilder } from 'discord.js';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
export default {
    name: 'تصويت',
    description: "تصويت على قرار",
    Founder: false,
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        if (!Message.member.roles.cache.some((Role) => CommandPremission.Al_ShuriVote.includes(Role.id))) return Message.reply({ content: `**ليس لديك الصلاحية لتنفيذ هذا الامر**` });
        const Embed = new EmbedBuilder();
        Embed.setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
        Embed.setColor(Message.guild.members.me.displayHexColor);
        Embed.setDescription(`**__
 مرحبا بك في قائمة التحكم الخاصة بمجلس الشورى

لبدء تصويت يرجى النقر على (بدء تصويت)و ادخال رقم القرار

لإنهاء تصويت يرجى النقر على (إنهاء تصويت ) و ادخال رقم القرار 
__**`);
        const AlShuriVote = new ButtonBuilder({ customId: 'Al-Shuri-Vote', label: 'بــدء تــصــويــت', style: 2, emoji: '<a:GulfRecPecT:1415964745017724990>' });
        const AlShuriEnd = new ButtonBuilder({ customId: 'Al-Shuri-End', label: 'إنــهــاء تــصــويــت', style: 2, emoji: '<a:GulfRecPecT:1415964745017724990>' });
        await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [AlShuriVote, AlShuriEnd] }] });
    }
}