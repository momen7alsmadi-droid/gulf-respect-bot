"use strict";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
export default {
    name: 'قائمه-تعميمات',
    description: "قائمه تعميمات المدينة",
    Founder: false,
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        // ✅ تم إلغاء التحقق من الصلاحية
        const Embed = new EmbedBuilder();
        Embed.setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
        Embed.setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
        Embed.setColor(Message.guild.members.me.displayHexColor);
        Embed.setDescription(`**__عزيزي المسؤول، الرجاء قراءة التعليمات التالية والموافقة عليها قبل استخدام أزرار التعاميم الخاصة بوزارة الداخلية:

1.    زر تعاميم الأمن:
    •    مختص فقط بمسؤول الأمن ونائبه.
    •    يُستخدم لإصدار تعاميم تتعلق بشؤون الأمن الداخلي والتوجيهات ذات الصلة.
    
2.    زر تعاميم القوات:
    •    مختص فقط بمسؤول القوات ونائبه.
    •    يُستخدم لإصدار تعاميم تخص العمليات والتوجيهات المتعلقة بالقوات.

3.    زر تعاميم الداخلية:
    •    مخصص لوزير الداخلية ونائبه فقط.
    •    يُستخدم لإصدار تعاميم عامة تخص وزارة الداخلية أو توجيهات ذات طابع وزاري.

يرجى تأكيد فهمك والتزامك باستخدام الزر المخصص لمجالك الوظيفي فقط، وتجنب إصدار تعاميم خارج نطاق صلاحياتك. أي مخالفة سيتم محاسبتها وفقًا لقوانين الوزارة__**`)
        const Buttons = [
            new ButtonBuilder({customId: 'Circulars-1', label: 'تعاميم الأمن', emoji: '<a:GulfRecPecT:1416353173743861801>', style: 2}),
            new ButtonBuilder({customId: 'Circulars-2', label: 'تعاميم القوات', emoji: '<a:GulfRecPecT:1416353173743861801>', style: 2}),
            new ButtonBuilder({customId: 'Circulars-3', label: 'تعاميم الداخلية', emoji: '<a:GulfRecPecT:1416353173743861801>', style: 2}),
        ]
        await Message.channel.send({ embeds: [Embed], components: [{type:1, components: Buttons}] });
    }
}