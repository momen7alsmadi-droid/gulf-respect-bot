"use strict";
import { ButtonBuilder, EmbedBuilder } from 'discord.js';
import { Police } from '../../Files〡[Config]/Files〡[Config].js';
export default {
 name: 'بانل-المخالفات',
 description: "تسطيب بانل المخالفات",
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
مرحبا بك عزيزي العسكري

في نظام المخالفات بوزارة الداخلية

لتسجيل مخالفة لـ عضو يرجى النقر على {مخالفة عضو}

و إدخال أيدي العضو و استكمال بقية الخطوات مع البوت

~~مع تحيات الادارة العامة للمرور~~
__**`)
 const Button = new ButtonBuilder({ customId: 'Violations〡Member', label: 'اعطاء مخالفة', style: 2 })
 await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [Button] }] });
 }
}