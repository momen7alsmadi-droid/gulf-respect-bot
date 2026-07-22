"use strict";
import { ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';
export default {
    name: 'النيابة',
    description: "النيابة",
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        if (!Message.member.roles.cache.has('')) return Message.reply({ content: `**ليس لديك الصلاحية لتنفيذ هذا الامر**` });
        const Embed = new EmbedBuilder()
        Embed.setDescription(`**__زر الاستدعاء مُخصص لاستدعاء الأشخاص المطلوبين للتحقيق أو الشهادة في القضايا القانونية.
    

•    جميع الاستدعاءات تتم بسرية تامة.
    •    يُمنع استخدام الزر خارج نطاق العمل الرسمي.
    •    إساءة الاستخدام تُعرِّض للمساءلة.

استخدام الزر يعني التزامك بما سبق.__**`)
        Embed.setColor(Message.guild.members.me.displayHexColor)
        Embed.setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL({ dynamic: true }) })
        const Button = new ButtonBuilder({ customId: 'Prosecution', label: 'النيابة', style: 2, emoji: '<:GulFRecPecT:1416537824726876219>' })
        await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [Button] }] })
    }
}