"use strict";
import { ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
export default {
 name: 'قائمه-الاعلانات',
 description: "قائمه الاعلانات",
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
 Embed.setDescription(`**لوحة تحكم اعلانات المدينة

اهلا بك في لوحة تحكم اعلانات الدوله يرجى اختيار نوع الاعلان الي تريد أن تنشره

- قوانين إعلانات للدوله

- عدم نشر خبر غير مهم أو خبر مخالف لقوانين الدوله

- عدم أساءه بـ أحد في الاعلان 

- عدم تكرار الإعلان أو نشرت بشكل متكرر 

بتوفيق وزارة الاعلام ترحب بكم**`)
 const SelectMenu = new StringSelectMenuBuilder()
 SelectMenu.setCustomId('Ads-Select')
 SelectMenu.setPlaceholder('اختر نوع الاعلان')
 SelectMenu.addOptions([
 { label: 'عصابة', value: 'Ads-1' },
 { label: 'وزارة الداخلية', value: 'Ads-2' },
 { label: 'رئيس الجمهورية', value: 'Ads-3' },
 { label: 'مجلس البرلمان', value: 'Ads-4' },
 { label: 'مسؤول العصابات', value: 'Ads-5' },
 { label: 'رجل مجهول', value: 'Ads-6' },
 { label: 'وزارة الاعلام', value: 'Ads-7' },
 { label: 'هيئة مكافحة الفساد', value: 'Ads-8' }
 ]);
 await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [SelectMenu] }] });
 }
}