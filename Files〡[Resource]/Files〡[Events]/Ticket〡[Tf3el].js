"use strict";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, ModalBuilder, PermissionsBitField, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { MainTicket, TicketTf3el } from '../Files〡[Config]/Files〡[Config].js';
import { createTranscript } from "discord-html-transcripts"
import { JsonDatabase } from 'wio.db';
const db = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[DataBase].json' });
const DBRate = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Rate].json' });
import DB〡AdminPoint from '../Files〡[DataBase]/DB〡[Admin-Point].js';
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 if (Message.isButton()) {
 switch (Message.customId) {
 case 'TF3el-Ticket': {
 const Data = db.get(`Ticket-${Message.guild.id}-${Message.user.id}-Tf3el`);
 if (Data) return await Message.reply({ content: `**لقد قمت بالفعل بإنشاء تذكرة**`, flags: 64 });
 db.add(`Count-${Message.guild.id}`, 1);
 const Count = db.get(`Count-${Message.guild.id}`).toString().padStart(3, '0');
 await Message.guild.channels.create({
 name: `Ticket-${Count}`,
 type: ChannelType.GuildText,
 parent: TicketTf3el.Parent,
 permissionOverwrites: [
 {
 id: Message.guild.roles.everyone,
 deny: [PermissionsBitField.Flags.ViewChannel]
 },
 {
 id: Message.user.id,
 allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
 },
 {
 id: TicketTf3el.Support,
 allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
 },
 {
 id: TicketTf3el.Management,
 allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
 },
 {
 id: TicketTf3el.Owner,
 allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
 },
 {
 id: TicketTf3el.Role,
 allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
 }
 ]
 }).then(async (ChannelTicket) => {
 db.set(`Ticket-${Message.guild.id}-${Message.user.id}-Tf3el`, { Channel: ChannelTicket.id, Member: Message.user.id, Guild: Message.guild.id });
 const Embed = new EmbedBuilder();
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setImage(`https://i.postimg.cc/9fpNdLKX/Tf3el.jpg`)
 Embed.setDescription(`**__– لـلـتـفـعـيـل فـي قولف ريسبكت الـرجـاء الـنـقـر عـلـى ( بـدء الأخـتـبـار)
 > — ويـرجـى الالـتـزام بالانـظـمـة الـمـوضـحـة ادنـاه:
 — يـمـنـع تـكـون خـامـل فـي الـتـذكـرة لمـدة 25m
 
 — يـمـنـع الإزعـاج بـالـمـنـشـن 
 
 — يـجـب تـبـادل الاحـتـرام مـع الإداري
 
 — يـرجـى الالـتـزام بـالـقـوانـيـن الموضحه أعـلاه
 __\`\`\`ansi
 [2;41m[2;37m 𝗪𝗢𝗟𝗙 𝗖𝗜𝗧𝗬 [0m[2;37m[2;41m[0m[2;41m[0m\`\`\`**`);
 const StringSelect = new StringSelectMenuBuilder({ customId: 'Select-Ticket-1', placeholder: 'خيارات التكت' });
 StringSelect.addOptions([
 { label: 'إسـتـلام الـتـكـت', value: 'ReceiveTicket-1' },
 { label: 'تـرك الإسـتـلام', value: 'LeaveReception-1' },
 { label: 'قـفـل الـتـكـت', value: 'CloseTicket-1' },
 { label: 'إضـافـة شـخـص', value: 'AddPerson-1' },
 { label: 'طـرد شـخـص', value: 'RemovePerson-1' },
 ]);
 await ChannelTicket.send({ content: `<@&${TicketTf3el.Support}>`, embeds: [Embed], components: [{ type: 1, components: [StringSelect] }] }).then(async () => {
 await Message.reply({ content: `**تم انشاء التذكرة بنجاح : ${ChannelTicket}**`, flags: 64 }).catch(() => { });
 }).catch(() => { })
 setTimeout(async () => {
 const Tf3el = new ButtonBuilder({ customId: `TF3el-${Message.user.id}`, label: 'بـدء أخـتـبـار الـتـفـعـيـل', style: 3 });
 await ChannelTicket.send({ content: `${Message.user}`, components: [{ type: 1, components: [Tf3el] }] });
 }, 3000)
 }).catch(async () => {
 await Message.reply({ content: `**يرجى المحاولة في وقت أخرى أو بعد قليل**`, flags: 64 })
 })
 } break;
 }
 } else if (Message.isStringSelectMenu()) {
 switch (Message.customId) {
 case 'Select-Ticket-1': {
 switch (Message.values[0]) {
 case 'ReceiveTicket-1': {
 const GetData = db.get(`Receive-${Message.channel.id}`);
 if (GetData && GetData.Admin !== Message.user.id) return await Message.reply({ content: `**لا يمكنك استلام التكت ليست مستلمها**`, flags: 64 });
 if (GetData && GetData.Admin === Message.user.id) return await Message.reply({ content: `**لا يمكنك استلام التكت مرتين**`, flags: 64 });
 const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
 if (!Member.roles.cache.some((Role) => [TicketTf3el.Support, TicketTf3el.Management].includes(Role.id))) return await Message.reply({ content: `**ليس لديك صلاحيات**`, flags: 64 });
 await Message.channel.permissionOverwrites.edit(Member.id, { ViewChannel: true, SendMessages: true });
 await Message.channel.permissionOverwrites.edit(TicketTf3el.Support, { ViewChannel: false, SendMessages: true });
 DB〡AdminPoint.findByIdAndUpdate({ _id: Message.user.id }, { $inc: { Point: +2 } }, { upsert: true, new: true }).catch(() => {})
 await Message.reply({ embeds: [{ description: `**— مـرحـبـاً بـك عـزيـزي الـعـضـو فـي الـتـذكـرة بـوولـف سـيـتـي\n\n— تـم إسـتـلام تـذكـرتـك مـن قـبـل الإداري : ${Message.user}**` }] });
 const Ticket = db.startsWith(`Ticket-${Message.guild.id}-`).map((Data) => ({ id: Data.ID }));
 for (const DataBase of Ticket) {
 const GetTicket = db.get(DataBase.id);
 if (GetTicket.Channel == Message.channel.id) {
 db.set(DataBase.id, { ...GetTicket, Moderator: Message.user.id });
 }
 }
 db.set(`Receive-${Message.channel.id}`, { Admin: Message.user.id, Status: true })
 } break;
 case 'LeaveReception-1': {
 const GetData = db.get(`Receive-${Message.channel.id}`);
 if (GetData && GetData.Admin !== Message.user.id) return await Message.reply({ content: `**لا يمكنك ترك التكت ليست مستلمها**`, flags: 64 });
 if (!GetData) return await Message.reply({ content: `**لا يمكنك ترك التكت**`, flags: 64 });
 const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
 if (!Member.roles.cache.some((Role) => [TicketTf3el.Support, TicketTf3el.Management].includes(Role.id))) return await Message.reply({ content: `**ليس لديك صلاحيات**`, flags: 64 });
 await Message.channel.permissionOverwrites.edit(Member.id, { ViewChannel: true, SendMessages: true });
 await Message.channel.permissionOverwrites.edit(TicketTf3el.Support, { ViewChannel: false, SendMessages: true });
 DB〡AdminPoint.findByIdAndUpdate({ _id: Message.user.id }, { $inc: { Point: -2 } }, { upsert: true, new: true }).catch(() => {});
 const Ticket = db.startsWith(`Ticket-${Message.guild.id}-`).map((Data) => ({ id: Data.ID }));
 await Message.reply({ embeds: [{ description: `**— تـم ترك تـذكـرتـك مـن قـبـل الإداري : ${Message.user}**` }] });
 for (const DataBase of Ticket) {
 const GetTicket = db.get(DataBase.id);
 if (GetTicket.Channel == Message.channel.id) {
 db.set(DataBase.id, { ...GetTicket, Moderator: null });
 }
 }
 if (db.has(`Receive-${Message.channel.id}`)) db.delete(`Receive-${Message.channel.id}`);
 } break;
 case 'CloseTicket-1': {
 const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
 if (!Member.roles.cache.some((Role) => [TicketTf3el.Support, TicketTf3el.Management].includes(Role.id))) return await Message.reply({ content: `**ليس لديك صلاحيات**`, flags: 64 });
 await Message.reply({ content: `**— سـيـتـم إغـلاق تـذكـرتـك مـن قـبـل الإداري : ${Message.user}\n\n— سـيـتـم إغـلاق الـتـذكـرة بـعـد 10 ثواني**` });
 const Data = db.startsWith(`Ticket-${Message.guild.id}-`).map((Data) => ({ id: Data.ID }));
 for (const DataBase of Data) {
 const GetTicket = db.get(DataBase.id);
 if (GetTicket.Channel == Message.channel.id) {
 await Message.channel.send({ content: MainTicket({ Admin: Message.user.id, Member: GetTicket.Member }) })
 }
 }
 const Embed = new EmbedBuilder();
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.addFields({ name: ' ', value: `رقم التكت | ${Message?.channel?.name?.split('-')[1]}` });
 Embed.addFields({ name: ' ', value: `قفل بواسطة | ${Message.user}` });
 for (const DataBase of Data) {
 const GetTicket = db.get(DataBase.id);
 if (!GetTicket) return Message.reply({ content: `**يرجى المحاولة مره اخرى**` }).catch(() => { });
 if (GetTicket.Channel === Message.channel.id) {
 Embed.addFields({ name: ' ', value: `فتح بواسطة | <@${GetTicket.Member}>` });
 if (GetTicket.Moderator) Embed.addFields({ name: ' ', value: `استلم بواسطة | <@${GetTicket.Moderator}>` });
 const Buttons = [
 new ButtonBuilder({ customId: 'Star-1', label: '1', style: ButtonStyle.Danger }),
 new ButtonBuilder({ customId: 'Star-2', label: '2', style: ButtonStyle.Danger }),
 new ButtonBuilder({ customId: 'Star-3', label: '3', style: ButtonStyle.Primary }),
 new ButtonBuilder({ customId: 'Star-4', label: '4', style: ButtonStyle.Success }),
 new ButtonBuilder({ customId: 'Star-5', label: '5', style: ButtonStyle.Success }),
 ]
 const SendEmbed = new EmbedBuilder();
 SendEmbed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 SendEmbed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 SendEmbed.setColor(Message.guild.members.me.displayHexColor);
 SendEmbed.setImage(`https://i.postimg.cc/vBg4sL6M/imag2e.png`)
 SendEmbed.setDescription(`** \`اهـلاً بـك عـزيـزي الـعـضـو ،\n\nيرجى تقيم الإداري من 1الى5\n\n\n\nإذا كان لديك أي استفسار أو تحتاج إلى مساعدة، فلا تتردد في التواصل مع قولف ريسبكت العظيم وشـكـراً لـك\n\`**\n**__\` GULF RESPECT \`__**`);
 const Member = Message.guild.members.cache.get(GetTicket.Member);
 if (Member) {
 await Member.send({ embeds: [SendEmbed], components: [{ type: 1, components: Buttons }] }).then((MessageID) => {
 DBRate.set(`Message-${Message.guild.id}-${MessageID.id}`, { Message: MessageID.id, Moderator: Message.user.id });
 }).catch(() => { })
 }
 db.delete(DataBase.id);
 }
 }
 const ChannelLog = Message.guild.channels.cache.get(TicketTf3el.ChannelLog);
 const transcript = await createTranscript(Message.channel, { returnType: 'attachment', fileName: `${Message.channel.name}.html` });
 await ChannelLog.send({ embeds: [Embed], files: [transcript] })
 setTimeout(async () => {
 await Message.channel.delete().catch(() => { });
 }, 10000)
 } break;
 case 'AddPerson-1': {
 const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
 if (!Member.roles.cache.some((Role) => [TicketTf3el.Support, TicketTf3el.Management].includes(Role.id))) return await Message.reply({ content: `**ليس لديك صلاحيات**`, flags: 64 });
 const TextInput = new TextInputBuilder({ customId: 'AddPerson-1', label: 'إضافة شخص', placeholder: 'ادخل ايدي الشخص الذي تريد اضافته', style: 1 });
 const ActionRow = new ActionRowBuilder({ components: [TextInput] });
 const Modal = new ModalBuilder({ customId: 'AddPerson-1', title: 'إضافة شخص', components: [ActionRow] });
 await Message.showModal(Modal);
 } break;
 case 'RemovePerson-1': {
 const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
 if (!Member.roles.cache.some((Role) => [TicketTf3el.Support, TicketTf3el.Management].includes(Role.id))) return await Message.reply({ content: `**ليس لديك صلاحيات**`, flags: 64 });
 const TextInput = new TextInputBuilder({ customId: 'RemovePerson-1', label: 'طرد شخص', placeholder: 'ادخل ايدي الشخص الذي تريد طرده', style: 1 });
 const ActionRow = new ActionRowBuilder({ components: [TextInput] });
 const Modal = new ModalBuilder({ customId: 'RemovePerson-1', title: 'طرد شخص', components: [ActionRow] });
 await Message.showModal(Modal);
 } break;

 }
 }
 }
 } else if (Message.isModalSubmit()) {
 switch (Message.customId) {
 case 'AddPerson-1': {
 const Member = Message.guild.members.cache.get(Message.fields.getTextInputValue('AddPerson-1'));
 if (!Member) return await Message.reply({ content: `**لا يمكنك إضافة شخص غير موجود**`, flags: 64 });
 await Message.channel.permissionOverwrites.edit(Member.id, { ViewChannel: true, SendMessages: true });
 await Message.reply({ content: `**— تـم إضـافـة شـخـص : ${Member}**` });
 } break;
 case 'RemovePerson-1': {
 const Member = Message.guild.members.cache.get(Message.fields.getTextInputValue('RemovePerson-1'));
 if (!Member) return await Message.reply({ content: `**لا يمكنك طرد شخص غير موجود**`, flags: 64 });
 await Message.channel.permissionOverwrites.edit(Member.id, { ViewChannel: false, SendMessages: false });
 await Message.reply({ content: `**— تـم طـرد شـخـص : ${Member}**` });
 } break;
 }
 }
}