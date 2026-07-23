"use strict";
import { EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db';
import { Employment } from '../Files〡[Config]/Files〡[Config].js';
let TextMain = ({ Admin, Member, Rank }) => `**__ – عـزيـزي الإداري : <@!${Admin}>

- تـم تـقـاعـد الـعـضـو بـنـجـاح : <@!${Member}>

- الـوظـيـفـه : ${Rank}

( الـمـؤسـسـة الـعـامـة للـتـقـاعـد )__**`
let CheckAdmin = async ({ Message }) => {
 const GetData = DataBase.get(`Retirement〡${Message.message.id}`);
 const Admin = Message.guild.members.cache.get(GetData.Admin);
 if (Admin.id !== Message.user.id) return Message.reply({ content: `**ليس لديك الصلاحية لتنفيذ هذا الأمر**`, flags: 64 });
}
const DataBase = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Employment].json' })
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 if (Message.isStringSelectMenu()) {
 switch (Message.customId) {
 case 'Retirement-Select': {
 switch (Message.values[0]) {
 case 'PublicSecurity-Role-Retirement': {
 await CheckAdmin({ Message: Message });
 const StringSelect = new StringSelectMenuBuilder({
 customId: 'Interior-Role-Retirement', placeholder: 'اختر الرتبة', options: [
 { label: 'رئيس— رقباء', value: 'ChiefSergeant' },
 { label: 'رقيب— أول', value: 'FirstSergeant' },
 { label: 'وكيل — رقيب', value: 'StaffSergeant' },
 { label: 'عريف', value: 'Corporal' },
 { label: 'جندي — أول', value: 'FirstSoldier' },
 { label: 'جندي', value: 'Soldier' },
 { label: 'مستجد', value: 'Recruit' }
 ]
 })
 await Message.message.edit({ content: `**يرجى اختيار الرتبة المطلوبة**`, components: [{ type: 1, components: [StringSelect] }] });
 } break;
 case 'SpecialForces-Role-Retirement': {
 await CheckAdmin({ Message: Message });
 const StringSelect = new StringSelectMenuBuilder({
 customId: 'SpecialForces-Role-Retirement', placeholder: 'اختر الرتبة', options: [
 { label: 'رئيس— رقباء', value: 'ChiefSergeant' },
 { label: 'رقيب— أول', value: 'FirstSergeant' },
 { label: 'وكيل — رقيب', value: 'StaffSergeant' },
 { label: 'عريف', value: 'Corporal' },
 { label: 'جندي — أول', value: 'FirstSoldier' },
 { label: 'جندي', value: 'Soldier' },
 { label: 'مستجد', value: 'Recruit' }
 ]
 })
 await Message.message.edit({ content: `**يرجى اختيار الرتبة المطلوبة**`, components: [{ type: 1, components: [StringSelect] }] });
 } break;
 case 'Justice-Role-Retirement': {
 await CheckAdmin({ Message: Message });
 const StringSelect = new StringSelectMenuBuilder({
 customId: 'Justice-Role-Retirement', placeholder: 'اختر الرتبة', options: [
 { label: 'محامي', value: 'Lawyer' },
 { label: 'قاضي', value: 'Judge' }
 ]
 })
 await Message.message.edit({ content: `**يرجى اختيار الرتبة المطلوبة**`, components: [{ type: 1, components: [StringSelect] }] });
 } break;
 case 'AlShuri-Role-Retirement': {
 await CheckAdmin({ Message: Message });
 const StringSelect = new StringSelectMenuBuilder({
 customId: 'AlShuri-Role-Retirement', placeholder: 'اختر الرتبة', options: [
 { label: 'الحزب — الجمهوري', value: 'RepublicanParty' },
 { label: 'الحزب — الديموقراطي', value: 'DemocraticParty' }
 ]
 })
 await Message.message.edit({ content: `**يرجى اختيار الرتبة المطلوبة**`, components: [{ type: 1, components: [StringSelect] }] });
 } break;
 case 'Press-Role-Retirement': {
 await CheckAdmin({ Message: Message });
 const GetData = DataBase.get(`Retirement〡${Message.message.id}`);
 const Member = Message.guild.members.cache.get(GetData.Member);
 const Channel = Message.guild.channels.cache.get(Employment.Channel);
 await Member.roles.remove(Employment.Press.Role).catch(() => { });
 await Member.roles.remove(Employment.Press.Press).catch(() => { });
 await Message.message.edit({ content: TextMain({ Admin: GetData.Admin, Member: GetData.Member, Rank: `الصحافة` }), components: [], embeds: [], files: [] });
 const Embed = new EmbedBuilder()
 Embed.setTitle(`تم تقاعد الرتبة وزارة الصحافة`);
 Embed.setImage(GetData.Image);
 Embed.addFields({ name: 'العضو', value: `${Member}` });
 Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
 Embed.addFields({ name: 'الرتبة', value: 'الصحافة' });
 await Channel.send({ embeds: [Embed] });
 DataBase.delete(`Retirement〡${Message.message.id}`);
 } break;
 case 'AntiCorruption-Role-Retirement': {
 const GetData = DataBase.get(`Retirement〡${Message.message.id}`);
 await CheckAdmin({ Message: Message });
 const Member = Message.guild.members.cache.get(GetData.Member);
 const Channel = Message.guild.channels.cache.get(Employment.Channel);
 await Member.roles.remove(Employment.AntiCorruption.AntiCorruption).catch(() => { });
 await Message.message.edit({ content: TextMain({ Admin: GetData.Admin, Member: GetData.Member, Rank: `الهيئة المكافحة للفساد` }), components: [], embeds: [], files: [] });
 const Embed = new EmbedBuilder()
 Embed.setTitle(`تم تقاعد الرتبة الهيئة المكافحة للفساد`);
 Embed.setImage(GetData.Image);
 Embed.addFields({ name: 'العضو', value: `${Member}` });
 Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
 Embed.addFields({ name: 'الرتبة', value: 'الهيئة المكافحة للفساد' });
 await Channel.send({ embeds: [Embed] });
 DataBase.delete(`Retirement〡${Message.message.id}`);
 } break;
 case 'TheBloods-Role-Retirement': {
 const GetData = DataBase.get(`Retirement〡${Message.message.id}`);
 await CheckAdmin({ Message: Message });
 const Member = Message.guild.members.cache.get(GetData.Member);
 const Channel = Message.guild.channels.cache.get(Employment.Channel);
 await Member.roles.remove(Employment.TheBloods.TheBloods).catch(() => { });
 await Member.roles.remove(Employment.TheBloods.Role).catch(() => { });
 await Message.message.edit({ content: TextMain({ Admin: GetData.Admin, Member: GetData.Member, Rank: `العصابة بلود` }), components: [], embeds: [], files: [] });
 const Embed = new EmbedBuilder()
 Embed.setTitle(`تم تقاعد الرتبة العصابة بلود`);
 Embed.setImage(GetData.Image);
 Embed.addFields({ name: 'العضو', value: `${Member}` });
 Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
 Embed.addFields({ name: 'الرتبة', value: 'العصابة بلود' });
 await Channel.send({ embeds: [Embed] });
 DataBase.delete(`Retirement〡${Message.message.id}`);
 } break;
 case 'ElNms-Role-Retirement': {
 const GetData = DataBase.get(`Retirement〡${Message.message.id}`);
 await CheckAdmin({ Message: Message });
 const Member = Message.guild.members.cache.get(GetData.Member);
 const Channel = Message.guild.channels.cache.get(Employment.Channel);
 await Member.roles.remove(Employment.ElNms.ElNms).catch(() => { });
 await Member.roles.remove(Employment.ElNms.Role).catch(() => { });
 await Message.message.edit({ content: TextMain({ Admin: GetData.Admin, Member: GetData.Member, Rank: `العصابة النمس` }), components: [], embeds: [], files: [] });
 const Embed = new EmbedBuilder()
 Embed.setTitle(`تم تقاعد الرتبة العصابة النمس`);
 Embed.setImage(GetData.Image);
 Embed.addFields({ name: 'العضو', value: `${Member}` });
 Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
 Embed.addFields({ name: 'الرتبة', value: 'العصابة النمس' });
 await Channel.send({ embeds: [Embed] });
 DataBase.delete(`Retirement〡${Message.message.id}`);
 } break;
 case 'Krabs-Role-Retirement': {
 const GetData = DataBase.get(`Retirement〡${Message.message.id}`);
 await CheckAdmin({ Message: Message });
 const Member = Message.guild.members.cache.get(GetData.Member);
 const Channel = Message.guild.channels.cache.get(Employment.Channel);
 await Member.roles.remove(Employment.Krabs.Krabs).catch(() => { });
 await Member.roles.remove(Employment.Krabs.Role).catch(() => { });
 await Member.roles.remove(Employment.Krabs.Role1).catch(() => { });
 await Message.message.edit({ content: TextMain({ Admin: GetData.Admin, Member: GetData.Member, Rank: `العصابة كربس` }), components: [], embeds: [], files: [] });
 const Embed = new EmbedBuilder()
 Embed.setTitle(`تم تقاعد الرتبة العصابة كربس`);
 Embed.setImage(GetData.Image);
 Embed.addFields({ name: 'العضو', value: `${Member}` });
 Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
 Embed.addFields({ name: 'الرتبة', value: 'العصابة كربس' });
 await Channel.send({ embeds: [Embed] });
 DataBase.delete(`Retirement〡${Message.message.id}`);
 } break;
 }
 } break;
 case 'Interior-Role-Retirement': {
 await CheckAdmin({ Message: Message });
 const GetData = DataBase.get(`Retirement〡${Message.message.id}`);
 const RolesMap = {
 'ChiefSergeant': { role: Employment.Interior.ChiefSergeants, rank: 'رئيس— رقباء' },
 'FirstSergeant': { role: Employment.Interior.FirstSergeants, rank: 'رقيب— أول' },
 'StaffSergeant': { role: Employment.Interior.StaffSergeants, rank: 'وكيل — رقيب' },
 'Corporal': { role: Employment.Interior.Corporal, rank: 'عريف' },
 'FirstSoldier': { role: Employment.Interior.FirstSoldier, rank: 'جندي — أول' },
 'Soldier': { role: Employment.Interior.Soldier, rank: 'جندي' },
 'Recruit': { role: Employment.Interior.Recruit, rank: 'مستجد' }
 };
 const SelectedRole = RolesMap[Message.values[0]];
 if (SelectedRole) {
 const Member = Message.guild.members.cache.get(GetData.Member);
 const Channel = Message.guild.channels.cache.get(Employment.Channel);
 await Member.roles.remove(Employment.RoleInterior).catch(() => { });
 await Member.roles.remove(Employment.RoleInterior2).catch(() => { });
 await Member.roles.remove(Employment.RoleInterior3).catch(() => { });
 await Member.roles.remove(SelectedRole.role).catch(() => { });
 await Message.message.edit({ content: TextMain({ Admin: GetData.Admin, Member: GetData.Member, Rank: SelectedRole.rank }), components: [], embeds: [], files: [] });
 const Embed = new EmbedBuilder()
 Embed.setTitle(`تم تقاعد الرتبة قوات الداخلية`);
 Embed.setImage(GetData.Image);
 Embed.addFields({ name: 'العضو', value: `${Member}` });
 Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
 Embed.addFields({ name: 'الرتبة', value: SelectedRole.rank });
 await Channel.send({ embeds: [Embed] });
 DataBase.delete(`Retirement〡${Message.message.id}`);
 }
 } break;
 case 'SpecialForces-Role-Retirement': {
 const GetData = DataBase.get(`Retirement〡${Message.message.id}`);
 await CheckAdmin({ Message: Message });
 const RolesMap = {
 'ChiefSergeant': { role: Employment.Interior.ChiefSergeants, rank: 'رئيس— رقباء' },
 'FirstSergeant': { role: Employment.Interior.FirstSergeants, rank: 'رقيب— أول' },
 'StaffSergeant': { role: Employment.Interior.StaffSergeants, rank: 'وكيل — رقيب' },
 'Corporal': { role: Employment.Interior.Corporal, rank: 'عريف' },
 'FirstSoldier': { role: Employment.Interior.FirstSoldier, rank: 'جندي — أول' },
 'Soldier': { role: Employment.Interior.Soldier, rank: 'جندي' },
 'Recruit': { role: Employment.Interior.Recruit, rank: 'مستجد' }
 };
 const SelectedRole = RolesMap[Message.values[0]];
 if (SelectedRole) {
 const Member = Message.guild.members.cache.get(GetData.Member);
 const Channel = Message.guild.channels.cache.get(Employment.Channel);
 await Member.roles.remove(Employment.RoleSpecialForces).catch(() => { });
 await Member.roles.remove(Employment.RoleSpecialForces2).catch(() => { });
 await Member.roles.remove(Employment.RoleSpecialForces3).catch(() => { });
 await Member.roles.remove(SelectedRole.role).catch(() => { });
 await Message.message.edit({ content: TextMain({ Admin: GetData.Admin, Member: GetData.Member, Rank: SelectedRole.rank }), components: [], embeds: [], files: [] });
 const Embed = new EmbedBuilder()
 Embed.setTitle(`تم تقاعد الرتبة قوات الخاصة`);
 Embed.setImage(GetData.Image);
 Embed.addFields({ name: 'العضو', value: `${Member}` });
 Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
 Embed.addFields({ name: 'الرتبة', value: SelectedRole.rank });
 await Channel.send({ embeds: [Embed] });
 DataBase.delete(`Retirement〡${Message.message.id}`);
 }
 } break;
 case 'AlShuri-Role-Retirement': {
 const GetData = DataBase.get(`Retirement〡${Message.message.id}`);
 await CheckAdmin({ Message: Message });
 const RolesMap = {
 'RepublicanParty': { role: Employment.AlShuri.RepublicanParty, rank: 'الحزب — الجمهوري' },
 'DemocraticParty': { role: Employment.AlShuri.DemocraticParty, rank: 'الحزب — الديموقراطي' }
 };
 const SelectedRole = RolesMap[Message.values[0]];
 if (SelectedRole) {
 const Member = Message.guild.members.cache.get(GetData.Member);
 const Channel = Message.guild.channels.cache.get(Employment.Channel);
 await Member.roles.remove(Employment.AlShuri.Role).catch(() => { });
 await Member.roles.remove(SelectedRole.role).catch(() => { });
 await Message.message.edit({ content: TextMain({ Admin: GetData.Admin, Member: GetData.Member, Rank: SelectedRole.rank }), components: [], embeds: [], files: [] });
 const Embed = new EmbedBuilder()
 Embed.setTitle(`تم تقاعد الرتبة الشورى`);
 Embed.setImage(GetData.Image);
 Embed.addFields({ name: 'العضو', value: `${Member}` });
 Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
 Embed.addFields({ name: 'الرتبة', value: SelectedRole.rank });
 await Channel.send({ embeds: [Embed] });
 DataBase.delete(`Retirement〡${Message.message.id}`);
 }
 } break;
 case 'Justice-Role-Retirement': {
 await CheckAdmin({ Message: Message });
 const GetData = DataBase.get(`Retirement〡${Message.message.id}`);
 const RolesMap = {
 'Lawyer': { role: Employment.Justice.Lawyer, rank: 'محامي' },
 'Judge': { role: Employment.Justice.Judge, rank: 'قاضي' }
 };
 const SelectedRole = RolesMap[Message.values[0]];
 if (SelectedRole) {
 const Member = Message.guild.members.cache.get(GetData.Member);
 const Channel = Message.guild.channels.cache.get(Employment.Channel);
 await Member.roles.remove(Employment.AlShuri.Role).catch(() => { });
 await Member.roles.remove(SelectedRole.role).catch(() => { });
 await Message.message.edit({ content: TextMain({ Admin: GetData.Admin, Member: GetData.Member, Rank: SelectedRole.rank }), components: [], embeds: [], files: [] });
 const Embed = new EmbedBuilder()
 Embed.setTitle(`تم تقاعد الرتبة وزارة العدل`);
 Embed.setImage(GetData.Image);
 Embed.addFields({ name: 'العضو', value: `${Member}` });
 Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
 Embed.addFields({ name: 'الرتبة', value: SelectedRole.rank });
 await Channel.send({ embeds: [Embed] });
 DataBase.delete(`Retirement〡${Message.message.id}`);
 }
 } break;
 }
 }
}