"use strict";
import { EmbedBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db'
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Police].json' })
export default {
 name: 'نقاطي',
 description: "نقاطي",
 Founder: false,
 /**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Message } Message
 */
 run: async (Client, Message) => {
 // متاح في جميع القنوات
 const Member = Message.mentions.members.first() || Message.author
 const GetPointLogin = Database.get(`Police-Point〡${Member.id}`) || 0
 const GetPointAdd = Database.get(`Police-AddPoint〡${Member.id}`) || 0
 const GetViolationsReport = Database.get(`Police-Violations〡${Member.id}`) || 0
 const GetReport = Database.get(`Police-Report〡${Member.id}`) || 0
 const Total = GetPointLogin + GetViolationsReport + GetReport + GetPointAdd 
 const Embed = new EmbedBuilder()
 Embed.setThumbnail(`https://i.postimg.cc/hjzk1Srt/jpg.jpg`)
 Embed.setDescription(`**__
— عزيزي العسكري : ${Member}

— نقـاط الدخول : ${GetPointLogin}
— نقاط الـمخالفات : ${GetViolationsReport}
— نقاط اسـتلام البلاغات : ${GetReport}
الـنقـاط الـمضـافـه : ${GetPointAdd}
— الاجمالي : ${Total} __**`)
 Message.reply({ embeds: [Embed] })
 }
}