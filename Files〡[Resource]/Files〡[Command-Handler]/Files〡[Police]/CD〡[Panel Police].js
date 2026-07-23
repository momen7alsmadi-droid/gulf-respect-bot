"use strict";
import { EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { Police } from '../../Files〡[Config]/Files〡[Config].js';
export default {
 name: 'بانل-العساكر',
 description: "تسطيب بانل العساكر",
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
 Embed.setDescription(`**– GULF RESPECT VRP||305k**
**__
- مرحبا بك عزيزي العضو في النظام العسكري.

- عزيزي العضو لتسجيل دخول او خروج الرجاء استخدام الأزرار بالاسفل.

- يمنع استخدام الأزرار خارج الرحلات
__**`)
 const StringSelectMenu = new StringSelectMenuBuilder({ customId: 'Police〡Panel', placeholder: 'اختر الخيار المناسب' })
 StringSelectMenu.addOptions([
 { label: 'تسجيل دخول', description: 'تسجيل دخول العسكري', value: 'Login' },
 { label: 'تسجيل خروج', description: 'تسجيل خروج العسكري', value: 'Logout' },
 { label: 'قائمة المباشرين', description: 'عرض قائمة المباشرين', value: 'OnDutyList' },
 { label: 'اعادة تعين قائمة المباشرين', description: 'اعادة تعين قائمة المباشرين', value: 'ResetOnDutyList' }
 ])
 await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [StringSelectMenu] }] });
 }
}