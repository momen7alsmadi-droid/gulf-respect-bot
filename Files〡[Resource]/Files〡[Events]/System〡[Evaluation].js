"use strict";
import { JsonDatabase } from 'wio.db';
const EvaluationDB = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Evaluation].json' });
const DataBase = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Rate].json' });
import { GuildID, Line } from '../Files〡[Config]/Files〡[Config].js';
const Points = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Points].json' })
import { EmbedBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
const TextMain = ({ Admin }) => {
 return `**__
عزيزي الإداري: {${Admin}}

تم اضافة 3نقاط لك 

بمناسبة حصولك على 15نجمة

و شكرا __**`
}
export default async function (Client, Message) {
 const Guild = Client.guilds.cache.get(GuildID);
 if (Message.isButton()) {
 switch (Message.customId) {
 case 'Star-1': {
 const GetMessage = DataBase.get(`Message-${Guild.id}-${Message.message.id}`);
 if (!GetMessage) return Message.reply({ content: `**تم تسجيل التقيم بالفعل**`, flags: 64 });
 const TextInput = new TextInputBuilder({ customId: 'TextInput-1', label: 'التقيم', placeholder: 'اكتب تقيمك هنا', style: 1, required: true });
 const Modal = new ModalBuilder({ customId: 'Modal-1', title: 'تقيم الإداري', components: [{ type: 1, components: [TextInput] }] });
 await Message.showModal(Modal);
 } break
 case 'Star-2': {
 const GetMessage = DataBase.get(`Message-${Guild.id}-${Message.message.id}`);
 if (!GetMessage) return Message.reply({ content: `**تم تسجيل التقيم بالفعل**`, flags: 64 });
 const TextInput = new TextInputBuilder({ customId: 'TextInput-2', label: 'التقيم', placeholder: 'اكتب تقيمك هنا', style: 1, required: true });
 const Modal = new ModalBuilder({ customId: 'Modal-2', title: 'تقيم الإداري', components: [{ type: 1, components: [TextInput] }] });
 await Message.showModal(Modal);
 } break
 case 'Star-3': {
 const GetMessage = DataBase.get(`Message-${Guild.id}-${Message.message.id}`);
 if (!GetMessage) return Message.reply({ content: `**تم تسجيل التقيم بالفعل**`, flags: 64 });
 const TextInput = new TextInputBuilder({ customId: 'TextInput-3', label: 'التقيم', placeholder: 'اكتب تقيمك هنا', style: 1, required: true });
 const Modal = new ModalBuilder({ customId: 'Modal-3', title: 'تقيم الإداري', components: [{ type: 1, components: [TextInput] }] });
 await Message.showModal(Modal);
 } break
 case 'Star-4': {
 const GetMessage = DataBase.get(`Message-${Guild.id}-${Message.message.id}`);
 if (!GetMessage) return Message.reply({ content: `**تم تسجيل التقيم بالفعل**`, flags: 64 });
 const TextInput = new TextInputBuilder({ customId: 'TextInput-4', label: 'التقيم', placeholder: 'اكتب تقيمك هنا', style: 1, required: true });
 const Modal = new ModalBuilder({ customId: 'Modal-4', title: 'تقيم الإداري', components: [{ type: 1, components: [TextInput] }] });
 await Message.showModal(Modal);
 } break
 case 'Star-5': {
 const GetMessage = DataBase.get(`Message-${Guild.id}-${Message.message.id}`);
 if (!GetMessage) return Message.reply({ content: `**تم تسجيل التقيم بالفعل**`, flags: 64 });
 const TextInput = new TextInputBuilder({ customId: 'TextInput-5', label: 'التقيم', placeholder: 'اكتب تقيمك هنا', style: 1, required: true });
 const Modal = new ModalBuilder({ customId: 'Modal-5', title: 'تقيم الإداري', components: [{ type: 1, components: [TextInput] }] });
 await Message.showModal(Modal);
 } break;
 }
 } else if (Message.isModalSubmit()) {
 switch (Message.customId) {
 case 'Modal-1': {
 const Text = Message.fields.getTextInputValue('TextInput-1');
 const Channel = Guild.channels.cache.get('');
 const GetMessage = DataBase.get(`Message-${Guild.id}-${Message.message.id}`);
 if (!GetMessage) return Message.reply({ content: `**تم تسجيل التقيم بالفعل**`, flags: 64 });
 EvaluationDB.add(`Evaluation〡${GetMessage.Moderator}`, 1);
 await Message.deferUpdate({});
 await Message.editReply({ components: [] });
 await Message.followUp({ content: `**تم استقبال التقيم بنجاح**`, flags: 64 });
 const GetData = EvaluationDB.get(`Evaluation〡${GetMessage.Moderator}`);
 const AdminFind = Client.guilds.cache.get(GuildID).members.cache.get(GetMessage.Moderator);
 const Embed = new EmbedBuilder();
 Embed.setDescription(`**__— هـنـا يـتـم تـقـيـيـم الإدارة مـن أعـضـاء وولـف سـيـتـي الـعـظـيـم — نـشـكـرك عـلـى الـتـقـيـيـم : ${Message.user}

— الإداري الـذي تـم تـقـيـيـمـه : ${AdminFind}

— الـنـجـوم الـمـعـطـاه مـن أصـل 5 : {1}

— الـسـبـب : ${Text}
__**`);
 await Channel.send({ embeds: [Embed] });
 await Channel.send({ files: [Line] })
 if (GetData >= 15) {
 EvaluationDB.substr(`Evaluation〡${GetMessage.Moderator}`, 15);
 Points.add(`Evaluation〡${GetMessage.Moderator}`, 3);
 DataBase.delete(`Message-${Guild.id}-${Message.message.id}`);
 AdminFind.send({ content: TextMain({ Admin: AdminFind }) }).catch(() => { });
 }
 } break;
 case 'Modal-2': {
 const Text = Message.fields.getTextInputValue('TextInput-2');
 const Channel = Guild.channels.cache.get('');
 const GetMessage = DataBase.get(`Message-${Guild.id}-${Message.message.id}`);
 if (!GetMessage) return Message.reply({ content: `**تم تسجيل التقيم بالفعل**`, flags: 64 });
 EvaluationDB.add(`Evaluation〡${GetMessage.Moderator}`, 2);
 await Message.deferUpdate({});
 await Message.editReply({ components: [] });
 await Message.followUp({ content: `**تم استقبال التقيم بنجاح**`, flags: 64 });
 const GetData = EvaluationDB.get(`Evaluation〡${GetMessage.Moderator}`);
 const AdminFind = Client.guilds.cache.get(GuildID).members.cache.get(GetMessage.Moderator);
 const Embed = new EmbedBuilder();
 Embed.setDescription(`**__— هـنـا يـتـم تـقـيـيـم الإدارة مـن أعـضـاء وولـف سـيـتـي الـعـظـيـم — نـشـكـرك عـلـى الـتـقـيـيـم : ${Message.user}
 
 — الإداري الـذي تـم تـقـيـيـمـه : ${AdminFind}
 
 — الـنـجـوم الـمـعـطـاه مـن أصـل 5 : {2}
 
 — الـسـبـب : ${Text}
 __**`);
 await Channel.send({ embeds: [Embed] });
 await Channel.send({ files: [Line] })
 if (GetData >= 15) {
 EvaluationDB.substr(`Evaluation〡${GetMessage.Moderator}`, 15);
 Points.add(`Evaluation〡${GetMessage.Moderator}`, 3);
 DataBase.delete(`Message-${Guild.id}-${Message.message.id}`);
 AdminFind.send({ content: TextMain({ Admin: AdminFind }) }).catch(() => { });
 }
 } break;
 case 'Modal-3': {
 const Text = Message.fields.getTextInputValue('TextInput-3');
 const Channel = Guild.channels.cache.get('');
 const GetMessage = DataBase.get(`Message-${Guild.id}-${Message.message.id}`);
 if (!GetMessage) return Message.reply({ content: `**تم تسجيل التقيم بالفعل**`, flags: 64 });
 EvaluationDB.add(`Evaluation〡${GetMessage.Moderator}`, 3);
 await Message.deferUpdate({});
 await Message.editReply({ components: [] });
 await Message.followUp({ content: `**تم استقبال التقيم بنجاح**`, flags: 64 });
 const GetData = EvaluationDB.get(`Evaluation〡${GetMessage.Moderator}`);
 const AdminFind = Client.guilds.cache.get(GuildID).members.cache.get(GetMessage.Moderator);
 const Embed = new EmbedBuilder();
 Embed.setDescription(`**__— هـنـا يـتـم تـقـيـيـم الإدارة مـن أعـضـاء وولـف سـيـتـي الـعـظـيـم — نـشـكـرك عـلـى الـتـقـيـيـم : ${Message.user}

— الإداري الـذي تـم تـقـيـيـمـه : ${AdminFind}

— الـنـجـوم الـمـعـطـاه مـن أصـل 5 : {3}

— الـسـبـب : ${Text}
__**`);
 await Channel.send({ embeds: [Embed] });
 await Channel.send({ files: [Line] })
 if (GetData >= 15) {
 EvaluationDB.substr(`Evaluation〡${GetMessage.Moderator}`, 15);
 Points.add(`Evaluation〡${GetMessage.Moderator}`, 3);
 DataBase.delete(`Message-${Guild.id}-${Message.message.id}`);
 AdminFind.send({ content: TextMain({ Admin: AdminFind }) }).catch(() => { });
 }
 } break;
 case 'Modal-4': {
 const Text = Message.fields.getTextInputValue('TextInput-4');
 const Channel = Guild.channels.cache.get('');
 const GetMessage = DataBase.get(`Message-${Guild.id}-${Message.message.id}`);
 if (!GetMessage) return Message.reply({ content: `**تم تسجيل التقيم بالفعل**`, flags: 64 });
 EvaluationDB.add(`Evaluation〡${GetMessage.Moderator}`, 4);
 await Message.deferUpdate({});
 await Message.editReply({ components: [] });
 await Message.followUp({ content: `**تم استقبال التقيم بنجاح**`, flags: 64 });
 const GetData = EvaluationDB.get(`Evaluation〡${GetMessage.Moderator}`);
 const AdminFind = Client.guilds.cache.get(GuildID).members.cache.get(GetMessage.Moderator);
 const Embed = new EmbedBuilder();
 Embed.setDescription(`**__— هـنـا يـتـم تـقـيـيـم الإدارة مـن أعـضـاء وولـف سـيـتـي الـعـظـيـم — نـشـكـرك عـلـى الـتـقـيـيـم : ${Message.user}

— الإداري الـذي تـم تـقـيـيـمـه : ${AdminFind}

— الـنـجـوم الـمـعـطـاه مـن أصـل 5 : {4}

— الـسـبـب : ${Text}
__**`);
 await Channel.send({ embeds: [Embed] });
 await Channel.send({ files: [Line] })
 if (GetData >= 15) {
 Points.add(`Evaluation〡${GetMessage.Moderator}`, 3);
 EvaluationDB.substr(`Evaluation〡${GetMessage.Moderator}`, 15);
 DataBase.delete(`Message-${Guild.id}-${Message.message.id}`);
 AdminFind.send({ content: TextMain({ Admin: AdminFind }) }).catch(() => { });
 }
 } break;
 case 'Modal-5': {
 const Text = Message.fields.getTextInputValue('TextInput-5');
 const Channel = Guild.channels.cache.get('');
 const GetMessage = DataBase.get(`Message-${Guild.id}-${Message.message.id}`);
 if (!GetMessage) return Message.reply({ content: `**تم تسجيل التقيم بالفعل**`, flags: 64 });
 EvaluationDB.add(`Evaluation〡${GetMessage.Moderator}`, 5);
 await Message.deferUpdate({});
 await Message.editReply({ components: [] });
 await Message.followUp({ content: `**تم استقبال التقيم بنجاح**`, flags: 64 });
 const GetData = EvaluationDB.get(`Evaluation〡${GetMessage.Moderator}`);
 const AdminFind = Client.guilds.cache.get(GuildID).members.cache.get(GetMessage.Moderator);
 const Embed = new EmbedBuilder();
 Embed.setDescription(`**__— هـنـا يـتـم تـقـيـيـم الإدارة مـن أعـضـاء وولـف سـيـتـي الـعـظـيـم — نـشـكـرك عـلـى الـتـقـيـيـم : ${Message.user}

— الإداري الـذي تـم تـقـيـيـمـه : ${AdminFind}

— الـنـجـوم الـمـعـطـاه مـن أصـل 5 : {5}

— الـسـبـب : ${Text}
__**`);
 await Channel.send({ embeds: [Embed] });
 await Channel.send({ files: [Line] })
 if (GetData >= 15) {
 Points.add(`Evaluation〡${GetMessage.Moderator}`, 3);
 EvaluationDB.substr(`Evaluation〡${GetMessage.Moderator}`, 15);
 DataBase.delete(`Message-${Guild.id}-${Message.message.id}`);
 AdminFind.send({ content: TextMain({ Admin: AdminFind }) }).catch(() => { });
 }
 } break;
 }
 }
}