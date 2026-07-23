"use strict";
import { EmbedBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db';
import { CommandPremission, Dissenting } from '../../Files〡[Config]/Files〡[Config].js';
const DataBase = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Dissenting].json' })
export default {
 name: 'فك',
 description: "فك سجن",
 /**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Message } Message
 */
 run: async (Client, Message) => {
 // ✅ تم إلغاء التحقق من الصلاحية
 const Agrs = Message.content.split(` `);
 const Member = Message.mentions.members.first() || Message.guild.members.cache.get(Agrs[1]);
 if (!Member) return Message.reply({ content: `**يرجى منشن العضو بشكل الصحيح**` });
 const GetData = DataBase.get(`Dissenting〡${Member.id}`);
 if (!GetData) return Message.reply({ content: `**لا يوجد عقوبات لهذا العضو**` });
 await Member.setNickname(GetData.Nick).catch(() => { });
 await Member.roles.add(GetData.Roles).catch(() => { });
 await Member.roles.remove(Dissenting.Role).catch(() => { });
 const Channel = Message.guild.channels.cache.get(Dissenting.Channel);
 const Embed = new EmbedBuilder();
 Embed.setColor('Red')
 Embed.addFields({ name: `العضو : `, value: `${Member}` })
 Embed.addFields({ name: `مسؤول : `, value: `${Message.author}` })
 Embed.setThumbnail(Message.guild.iconURL({ dynamic: true }))
 Embed.setFooter({ text: `تم فك مخالة بواسطة ${Message.author.username}`, iconURL: Message.author.displayAvatarURL({ dynamic: true }) })
 Channel.send({ embeds: [Embed] }).catch(() => { });
 Message.reply({ content: `**تم فك سجن بنجاح **`, components: [] });
 DataBase.delete(`Dissenting〡${Member.id}`)
 }
}