"use strict";
import { JsonDatabase } from 'wio.db'
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[ID].json' })
export default {
 name: 'حذف-هوية',
 description: "حذف الهويات",
 Founder: false,
 /**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Message } Message
 */
 run: async (Client, Message) => {
 // الصلاحية مفتوحة للجميع
 const Agrs = Message.content.split(' ');
 const Member = Message.mentions.members.first() || Message.guild.members.cache.get(Agrs[1])
 if (!Member) return Message.reply({ content: `**الرجاء منشن المستخدم**` });
 Database.delete(`ID〡${Member.id}`)
 await Message.reply({ content: `**تم حذف هوية المستخدم ${Member.user.username}**` });
 }
}