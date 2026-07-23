"use strict";
import { EmbedBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db'
import { Police } from '../Files〡[Config]/Files〡[Config].js';
import ms from 'ms';
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Police].json' })
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 if (Message.isStringSelectMenu()) {
 switch (Message.customId) {
 case 'Police〡Panel': {
 switch (Message.values[0]) {
 case 'Login': {
 const GetCoolDown = Database.get(`Police-CoolDown〡${Message.user.id}`);
 if (GetCoolDown && GetCoolDown.Time > Date.now()) {
 return Message.reply({ content: `**__ عزيزي العسكري لن تستطيع تسجيل الدخول مرة اخرى الا بعد ساعة من الان__**`, flags: 64 });
 } else if (GetCoolDown && GetCoolDown.Time <= Date.now()) {
 Database.delete(`Police-CoolDown〡${Message.user.id}`);
 }
 const Member = Message.guild.members.cache.get(Message.user.id);
 if (!Member.roles.cache.some(Role => Police.Login.includes(Role.id))) return Message.reply({ content: `**ليس لديك الصلاحية للدخول**`, flags: 64 });
 const 〡Police = Database.get(`Police-Login〡${Message.guild.id}`) || [];
 if (〡Police.find(Police => Police.Police === Message.user.id)) return Message.reply({ content: `**مسجل دخول بالفعل**`, flags: 64 });
 Database.add(`Police-Point〡${Message.user.id}`, 2);
 Database.push(`Police-Login〡${Message.guild.id}`, { Police: Message.user.id });
 await Message.reply({ content: `**__ – عـزيـزي الـعـضـو\n\n– تـم تـسـجـيـل دخـولـك وانـضـمـامـك مـع الـوحـدات الـمـبـاشـرة .\n\n– يُـمـنـع فـي حـال انـتـهـاء الـرحـلـة وعـدم تـسـجـيـل خـروجـك سـيـتـم تـحـذيـرك .__**`, flags: 64 });
 } break;
 case 'Logout': {
 const Member = Message.guild.members.cache.get(Message.user.id);
 if (!Member.roles.cache.some(Role => Police.Logout.includes(Role.id))) return Message.reply({ content: `**ليس لديك الصلاحية للخروج**`, flags: 64 });
 const 〡Police = Database.get(`Police-Login〡${Message.guild.id}`) || [];
 if (!〡Police.find(Police => Police.Police === Message.user.id)) return Message.reply({ content: `**مسجل خروج بالفعل**`, flags: 64 });
 const UpdatedPoliceList = 〡Police.filter(Police => Police.Police !== Message.user.id);
 Database.set(`Police-Login〡${Message.guild.id}`, UpdatedPoliceList);
 Database.set(`Police-CoolDown〡${Message.user.id}`, { Time: Date.now() + ms('1h') });
 await Message.reply({ content: `**__ – عـزيـزي الـعـضـو\n\n– تـم تـسـجـيـل خـروجـك وازالـتـك مـن الـوحـدات الـمـبـاشـرة .__**`, flags: 64 });
 } break;
 case 'OnDutyList': {
 const Member = Message.guild.members.cache.get(Message.user.id);
 if (!Member.roles.cache.some(Role => Police.OnDutyList.includes(Role.id))) return Message.reply({ content: `**ليس لديك الصلاحية لعرض قائمة المباشرين**`, flags: 64 });
 const GetPolice = Database.get(`Police-Login〡${Message.guild.id}`) || [];
 const PoliceList = GetPolice.map((Police, index) => `${index + 1} - <@${Police.Police}>`).join('\n');
 const Embed = new EmbedBuilder()
 .setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) })
 .setColor(Message.guild.members.me.displayHexColor)
 .setDescription(`**– قائمة المباشرين\n\n ${PoliceList || 'لا يوجد مباشرين مسجلين دخول حالياً'}**`);
 await Message.reply({ embeds: [Embed], flags: 64 });
 } break;
 case 'ResetOnDutyList': {
 const Member = Message.guild.members.cache.get(Message.user.id);
 if (!Member.roles.cache.some(Role => Police.ResetOnDutyList.includes(Role.id))) return Message.reply({ content: `**ليس لديك الصلاحية لإعادة تعيين قائمة المباشرين**`, flags: 64 });
 Database.set(`Police-Login〡${Message.guild.id}`, []);
 await Message.reply({ content: `**تم إعادة تعيين قائمة المباشرين بنجاح**`, flags: 64 });
 } break;
 }
 } break;
 }
 }
}