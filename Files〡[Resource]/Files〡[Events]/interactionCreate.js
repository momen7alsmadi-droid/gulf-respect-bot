"use strict";
import { Founder, Owners, VERSION, ERR } from '../Files〡[Config]/Files〡[Config].js';
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 // ✅ تمكين المالك من تجاوز جميع صلاحيات الرولات
 if (Message.guild) {
 const userId = Message.user?.id || Message.author?.id;
 if (Owners.includes(userId) || userId === Founder) {
 // تجاوز fetch الأعضاء تلقائياً
 const originalFetch = Message.guild.members.fetch.bind(Message.guild.members);
 Message.guild.members.fetch = async function(...args) {
 const member = await originalFetch(...args);
 if (member?.id === userId) {
 if (member.roles?.cache) {
 member.roles.cache.has = () => true;
 member.roles.cache.some = () => true;
 }
 }
 return member;
 };
 // تجاوز العضو الحالي
 if (Message.member?.roles?.cache) {
 Message.member.roles.cache.has = () => true;
 Message.member.roles.cache.some = () => true;
 }
 }
 }

 // ! - Title : Running Emit Files (with error protection)
 const events = [
 'Ticket〡[Tf3el]', 'Ticket〡[Tlp-Owner]', 'Ticket〡[Help]', 'Ticket〡[El4akway]',
 'Ticket〡[T2dem-Admin]', 'Ticket〡[M7kma]', 'System〡[Tf3el]', 'Ticket〡[He2a]',
 'System〡[Adara]', 'System〡[Ads]', 'System〡[Panel-ID]', 'System〡[Submissions]',
 'System〡[Panel-Police]', 'System〡[Panel-Violations]', 'System〡[Panel-Report]',
 'System〡[Panel-CivilRegistry]', 'System〡[Al-Shuri]', 'System〡[Employment]',
 'System〡[Retirement]', 'System〡[Evaluation]', 'System〡[Circulars]',
 'System〡[Prosecution-Authority]', 'System〡[ControlPanel]',
 'System〡[MessageControl]'
 ];
 for (const evt of events) {
 Client.emit(evt, (Client, Message));
 }
 // ! - Title : Running System Slash Command
 if (Message.isChatInputCommand()) {
 if (!Message?.guild) return
 const Command = Client.SlashCommand.get(Message.commandName);
 if (!Command) return;
 try {
 await Command.run(Client, Message);
 } catch (err) {
 console.error(`❌ [${ERR.GENERAL}] Slash error:`, err.message);
 await Message.reply({ content: `❌ **خطأ ${ERR.GENERAL}**\n> فشل تنفيذ الأمر \`/${Message.commandName}\`\n> ${err.message?.slice(0, 200)}\n-# v${VERSION}`, flags: 64 }).catch(() => {});
 }
 }
}