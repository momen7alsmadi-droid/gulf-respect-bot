"use strict";
import { EmbedBuilder } from 'discord.js';
import ms from 'ms';
import Duration from 'humanize-duration';
import { JsonDatabase } from 'wio.db';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
const DataBase = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Dissenting].json' })
export default {
 name: 'انشاء-عقوبة',
 description: "انشاء عقوبة تلقائي",
 Founder: false,
 /**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Message } Message
 */
 run: async (Client, Message) => {
 // ✅ تم إلغاء التحقق من الصلاحية
 const Agrs = Message.content.split(` `);
 const Timeing = Agrs[1];
 if (!Timeing) return Message.reply({ content: `**يرجى إدخال المدة بشكل الصحيح**` });
 const Some = ['s', 'm', 'h', 'd', 'w', 'S', 'M', 'H', 'D', 'W'];
 if (!Some.some((Some) => Timeing.endsWith(Some.toLowerCase())) || !Timeing) return Message.reply({ content: `**يرجى إدخال المدة بشكل الصحيح**` });
 const Reason = Agrs.slice(2).join(` `);
 if (!Reason) return Message.reply({ content: `**يرجى إدخال السبب**` });
 const Time = ms(Timeing);
 const Embed = new EmbedBuilder();
 Embed.addFields({ name: `العقوبة : `, value: `${Reason}` })
 Embed.addFields({ name: `المدة : `, value: ` ${Duration(Time, { round: true, language: 'ar', 'serialComma': true, 'units': ['d', 'h', 'm'] })}` })
 Embed.setThumbnail(Message.guild.iconURL({ dynamic: true }))
 Embed.setFooter({ text: `تم إنشاء عقوبة بواسطة ${Message.author.username}`, iconURL: Message.author.displayAvatarURL({ dynamic: true }) })
 await Message.reply({ embeds: [Embed] })
 DataBase.push(`Dissenting〡${Message.guild.id}`, { Time: Time, Reason: Reason })
 }
}