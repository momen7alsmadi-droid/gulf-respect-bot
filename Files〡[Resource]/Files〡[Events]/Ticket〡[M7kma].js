"use strict";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, ModalBuilder, PermissionsBitField, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { TicketM7kma } from '../Files〡[Config]/Files〡[Config].js';
import { createTranscript } from "discord-html-transcripts"
import { JsonDatabase } from 'wio.db';
const db = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[DataBase].json' });
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 if (Message.isButton()) {
 switch (Message.customId) {
 case 'TlbMo7my-Ticket': {
 const TextInput1 = new TextInputBuilder({ customId: 'TlbMo7my-1', label: 'الأسم الـربـاعـي مـع الـقـبـيـلـة', style: TextInputStyle.Short });
 const TextInput2 = new TextInputBuilder({ customId: 'TlbMo7my-2', label: 'نـوع الـقـضـيـة', style: TextInputStyle.Short });
 const TextInput3 = new TextInputBuilder({ customId: 'TlbMo7my-3', label: 'رقـم الـقـضـيـة', style: TextInputStyle.Short });
 const TextInput4 = new TextInputBuilder({ customId: 'TlbMo7my-4', label: 'هـل أنـت المـتـهـم أم الـمـدعـي', style: TextInputStyle.Short });
 const TextInput5 = new TextInputBuilder({ customId: 'TlbMo7my-5', label: 'هـل انـت مـسـتـعـد لـدفـع رسـوم الـمـحـامـي', style: TextInputStyle.Short });
 const ActionRow1 = new ActionRowBuilder({ components: [TextInput1] });
 const ActionRow2 = new ActionRowBuilder({ components: [TextInput2] });
 const ActionRow3 = new ActionRowBuilder({ components: [TextInput3] });
 const ActionRow4 = new ActionRowBuilder({ components: [TextInput4] });
 const ActionRow5 = new ActionRowBuilder({ components: [TextInput5] });
 const Modal = new ModalBuilder({ customId: 'TlbMo7my-1', title: 'طلب محامي', components: [ActionRow1, ActionRow2, ActionRow3, ActionRow4, ActionRow5] });
 await Message.showModal(Modal);
 } break;
 case 'Rf32dea-Ticket': {
 const TextInput1 = new TextInputBuilder({ customId: 'Rf32dea-1', label: 'أسـم الـمـدعـي', style: TextInputStyle.Short });
 const TextInput2 = new TextInputBuilder({ customId: 'Rf32dea-2', label: 'اـيدي المـدعـي عـلـيـه', style: TextInputStyle.Short });
 const TextInput3 = new TextInputBuilder({ customId: 'Rf32dea-3', label: 'سـبـب رفـع الـقـضـيـة', style: TextInputStyle.Paragraph });
 const TextInput4 = new TextInputBuilder({ customId: 'Rf32dea-4', label: 'هـل لـديـك ادلـة كـافـيـة', style: TextInputStyle.Short });
 const TextInput5 = new TextInputBuilder({ customId: 'Rf32dea-5', label: 'الـمـحـامـي أن وجـد', style: TextInputStyle.Short });
 const ActionRow1 = new ActionRowBuilder({ components: [TextInput1] });
 const ActionRow2 = new ActionRowBuilder({ components: [TextInput2] });
 const ActionRow3 = new ActionRowBuilder({ components: [TextInput3] });
 const ActionRow4 = new ActionRowBuilder({ components: [TextInput4] });
 const ActionRow5 = new ActionRowBuilder({ components: [TextInput5] });
 const Modal = new ModalBuilder({ customId: 'Rf32dea-1', title: 'طلب محامي', components: [ActionRow1, ActionRow2, ActionRow3, ActionRow4, ActionRow5] });
 await Message.showModal(Modal);
 } break;
 }
 } else if (Message.isModalSubmit()) {
 switch (Message.customId) {
 case 'TlbMo7my-1': {
 const TextInput1 = Message.fields.getTextInputValue('TlbMo7my-1');
 const TextInput2 = Message.fields.getTextInputValue('TlbMo7my-2');
 const TextInput3 = Message.fields.getTextInputValue('TlbMo7my-3');
 const TextInput4 = Message.fields.getTextInputValue('TlbMo7my-4');
 const TextInput5 = Message.fields.getTextInputValue('TlbMo7my-5');
 const Data = db.get(`Ticket-${Message.guild.id}-${Message.user.id}-M7kma`);
 if (Data) return await Message.reply({ content: `**لقد قمت بالفعل بإنشاء تذكرة**`, flags: 64 });
 db.add(`Count-${Message.guild.id}`, 1);
 const Count = db.get(`Count-${Message.guild.id}`).toString().padStart(3, '0');
 const ChannelTicket = await Message.guild.channels.create({
 name: `Ticket-${Count}`,
 type: ChannelType.GuildText,
 parent: TicketM7kma.TlbMo7my.Parent,
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
 id: TicketM7kma.TlbMo7my.Support,
 allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
 },
 {
 id: TicketM7kma.TlbMo7my.Role,
 allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
 },
 {
 id: TicketM7kma.TlbMo7my.Role1,
 allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
 },
 {
 id: TicketM7kma.TlbMo7my.Management,
 allow: [PermissionsBitField.Flags.ViewChannel],
 deny: [PermissionsBitField.Flags.SendMessages]
 }
 ]
 })
 db.set(`Ticket-${Message.guild.id}-${Message.user.id}-M7kma`, { Channel: ChannelTicket.id, Member: Message.user.id, Guild: Message.guild.id });
 const StringSelect = new StringSelectMenuBuilder({ customId: 'Select-Ticket-5', placeholder: 'خيارات التكت' });
 StringSelect.addOptions([
 { label: 'قـفـل الـتـكـت', value: 'CloseTicket-5' },
 { label: 'إضـافـة شـخـص', value: 'AddPerson-5' },
 { label: 'طـرد شـخـص', value: 'RemovePerson-5' },
 ]);
 const Content = `أسـم الـمـدعـي : ${TextInput1}\n\nأسـم المـدعـي عـلـيـه : ${TextInput2}\n\nسـبـب رفـع الـقـضـيـة : ${TextInput3}\n\nهـل لـديـك ادلـة كـافـيـة : ${TextInput4}\n\nهـل انـت مـسـتـعـد لـدفـع رسـوم الـمـحـامـي : ${TextInput5}\n<@&${TicketM7kma.TlbMo7my.Support}>`;
 await ChannelTicket.send({ content: `${Message.user} | `, content: Content, components: [{ type: 1, components: [StringSelect] }] }).then(async () => {
 await Message.reply({ content: `**تم انشاء التذكرة بنجاح : ${ChannelTicket}**`, flags: 64 }).catch(() => { });
 }).catch(() => { })
 } break;
 case 'Rf32dea-1': {
 const TextInput1 = Message.fields.getTextInputValue('Rf32dea-1');
 const TextInput2 = Message.fields.getTextInputValue('Rf32dea-2');
 const TextInput3 = Message.fields.getTextInputValue('Rf32dea-3');
 const TextInput4 = Message.fields.getTextInputValue('Rf32dea-4');
 const TextInput5 = Message.fields.getTextInputValue('Rf32dea-5');
 const Data = db.get(`Ticket-${Message.guild.id}-${Message.user.id}-Rf32dea`);
 if (Data) return await Message.reply({ content: `**لقد قمت بالفعل بإنشاء تذكرة**`, flags: 64 });
 db.add(`Count-${Message.guild.id}`, 1);
 const Count = db.get(`Count-${Message.guild.id}`).toString().padStart(3, '0');
 const ChannelTicket = await Message.guild.channels.create({
 name: `Ticket-${Count}`,
 type: ChannelType.GuildText,
 parent: TicketM7kma.Rf32dea.Parent,
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
 id: TicketM7kma.Rf32dea.Support,
 allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
 },
 {
 id: TicketM7kma.Rf32dea.Role,
 allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
 },
 {
 id: TicketM7kma.Rf32dea.Management,
 allow: [PermissionsBitField.Flags.ViewChannel],
 deny: [PermissionsBitField.Flags.SendMessages]
 }
 ]
 })
 db.set(`Ticket-${Message.guild.id}-${Message.user.id}-Rf32dea`, { Channel: ChannelTicket.id, Member: Message.user.id, Guild: Message.guild.id });
 const StringSelect = new StringSelectMenuBuilder({ customId: 'Select-Ticket-6', placeholder: 'خيارات التكت' });
 StringSelect.addOptions([
 { label: 'قـفـل الـتـكـت', value: 'CloseTicket-6' },
 { label: 'إضـافـة شـخـص', value: 'AddPerson-6' },
 { label: 'طـرد شـخـص', value: 'RemovePerson-6' },
 ]);
 const Content = `أسـم الـمـدعـي : ${TextInput1}\n\nأسـم المـدعـي عـلـيـه : ايديه سوني ${TextInput2}\n\nسـبـب رفـع الـقـضـيـة : ${TextInput3}\n\nهـل لـديـك ادلـة كـافـيـة : ${TextInput4}\n<@&${TicketM7kma.Rf32dea.Support}>`
 await ChannelTicket.send({ content: `${Message.user} | `, content: Content, components: [{ type: 1, components: [StringSelect] }] });
 await ChannelTicket.send({ content: `**__برفعك للقضية [${Message.user}] فأنك تتعهد بأن جميع المعلومات المذكورة صحيحة ودقيقة وأنك تتحمل كامل المسؤولية القانونية عن أي معلومات خاطئة أو مضللة
 • سيتم مراجعة القضية من قبل الجهات المختصة في وزارة العدل 

• في حال الحاجة إلى تفاصيل إضافية سيتم التواصل معك مباشرة

- يرجى من القضاة ادخال المدعي عليه في التكت للتأكد من نيته في الحصول على محامي له او لا

- يرجى من القضاة عدم قبول القضية الا بعد التأكد من تحقيق النيابة العامة في القضية بشكل كامل__**`, content: Content, components: [{ type: 1, components: [StringSelect] }] });
 const Channel = Message.guild.channels.cache.get(`1316443159923785760`)
 const Random = Math.floor(Math.random() * 99999);
 const Embed = new EmbedBuilder().setDescription(`رقم القضية : ${Random}\nالاسم : ${TextInput1}\nالشخص : ${Message.user}\nالذي سيرفع عليه القضية : <@!${TextInput2}>\nالسبب : ${TextInput3}${/^\d+$/.test(TextInput5) ? `\nالمحامي : <@!${TextInput5}>` : ``}\nهل لديه مستندات او ادلة : ${TextInput4}`)
 const Buttons = [
 new ButtonBuilder({ customId: 'Case-General', label: 'قبول القضيه عامة', style: 2 }),
 new ButtonBuilder({ customId: 'Case-Criminal', label: 'قبول القضيه جنائية', style: 2 }),
 new ButtonBuilder({ customId: 'Case-Reject', label: 'رفض القضية', style: 2 }),
 new ButtonBuilder({ customId: 'Case-Reminder', label: 'تذكير بوقت المحكمة', style: 2 })
 ];
 const ActionRow = new ActionRowBuilder().addComponents(Buttons);
 await Channel.send({ content: `${Message.user}`, embeds: [Embed], components: [ActionRow] }).then(async () => {
 await Message.reply({ content: `**تم انشاء التذكرة بنجاح : ${ChannelTicket}**`, flags: 64 }).catch(() => { });
 }).catch(() => { })
 } break;
 }
 } else if (Message.isStringSelectMenu()) {
 switch (Message.customId) {
 case 'Select-Ticket-5': {
 switch (Message.values[0]) {
 case 'CloseTicket-5': {
 const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
 if (!Member.roles.cache.some((Role) => [TicketM7kma.TlbMo7my.Support, TicketM7kma.TlbMo7my.Management].includes(Role.id))) return await Message.reply({ content: `**ليس لديك صلاحيات***`, flags: 64 });
 await Message.reply({ content: `**— تـم إغـلاق تـذكـرتـك مـن قـبـل الإداري : ${Message.user}\n\n— سيتم إغلاق التذكرة بعد 5 ثواني**` });
 const Data = db.startsWith(`Ticket-${Message.guild.id}-`).map((Data) => ({ id: Data.ID }));
 const Embed = new EmbedBuilder();
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.addFields({ name: ' ', value: `رقم التكت | ${Message?.channel?.name?.split('-')[1]}` });
 Embed.addFields({ name: ' ', value: `قفل بواسطة | ${Message.user}` });
 for (const DataBase of Data) {
 const GetTicket = db.get(DataBase.id);
 if (GetTicket.Channel == Message.channel.id) {
 Embed.addFields({ name: ' ', value: `فتح بواسطة | <@${GetTicket.Member}>` });
 if (GetTicket.Moderator) Embed.addFields({ name: ' ', value: `استلم بواسطة | <@${GetTicket.Moderator}>` });
 db.delete(DataBase.id);
 }
 }
 const ChannelLog = Message.guild.channels.cache.get(TicketM7kma.TlbMo7my.ChannelLog);
 const transcript = await createTranscript(Message.channel, { returnType: 'attachment', fileName: `${Message.channel.name}.html` });
 await ChannelLog.send({ embeds: [Embed], files: [transcript] })
 setTimeout(async () => {
 await Message.channel.delete().catch(() => { });
 }, 10000)
 } break;
 case 'AddPerson-5': {
 const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
 if (!Member.roles.cache.some((Role) => [TicketM7kma.TlbMo7my.Support, TicketM7kma.TlbMo7my.Management].includes(Role.id))) return await Message.reply({ content: `**ليس لديك صلاحيات***`, flags: 64 });
 const TextInput = new TextInputBuilder({ customId: 'AddPerson-5', label: 'إضافة شخص', placeholder: 'ادخل ايدي الشخص الذي تريد اضافته', style: 1 });
 const ActionRow = new ActionRowBuilder({ components: [TextInput] });
 const Modal = new ModalBuilder({ customId: 'AddPerson-5', title: 'إضافة شخص', components: [ActionRow] });
 await Message.showModal(Modal);
 } break;
 case 'RemovePerson-5': {
 const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
 if (!Member.roles.cache.some((Role) => [TicketM7kma.TlbMo7my.Support, TicketM7kma.TlbMo7my.Management].includes(Role.id))) return await Message.reply({ content: `**ليس لديك صلاحيات***`, flags: 64 });
 const TextInput = new TextInputBuilder({ customId: 'RemovePerson-5', label: 'طرد شخص', placeholder: 'ادخل ايدي الشخص الذي تريد طرده', style: 1 });
 const ActionRow = new ActionRowBuilder({ components: [TextInput] });
 const Modal = new ModalBuilder({ customId: 'RemovePerson-5', title: 'طرد شخص', components: [ActionRow] });
 await Message.showModal(Modal);
 } break;
 }
 } break;
 case 'Select-Ticket-6': {
 switch (Message.values[0]) {
 case 'CloseTicket-6': {
 const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
 if (!Member.roles.cache.some((Role) => [TicketM7kma.Rf32dea.Support, TicketM7kma.Rf32dea.Management].includes(Role.id))) return await Message.reply({ content: `**ليس لديك صلاحيات***`, flags: 64 });
 await Message.reply({ content: `**— تـم إغـلاق تـذكـرتـك مـن قـبـل الإداري : ${Message.user}\n\n— سيتم إغلاق التذكرة بعد 5 ثواني**` });
 const Data = db.startsWith(`Ticket-${Message.guild.id}-`).map((Data) => ({ id: Data.ID }));
 const Embed = new EmbedBuilder();
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.addFields({ name: ' ', value: `رقم التكت | ${Message.channel.name.split('-')[1]}` });
 Embed.addFields({ name: ' ', value: `قفل بواسطة | ${Message.user}` });
 for (const DataBase of Data) {
 const GetTicket = db.get(DataBase.id);
 if (GetTicket.Channel == Message.channel.id) {
 Embed.addFields({ name: ' ', value: `فتح بواسطة | <@${GetTicket.Member}>` });
 if (GetTicket.Moderator) Embed.addFields({ name: ' ', value: `استلم بواسطة | <@${GetTicket.Moderator}>` });
 db.delete(DataBase.id);
 }
 }
 const ChannelLog = Message.guild.channels.cache.get(TicketM7kma.Rf32dea.ChannelLog);
 const transcript = await createTranscript(Message.channel, { returnType: 'attachment', 
 minify: true, 
 saveImages: true, 
 useCDN: true, 
 poweredBy: false, 
 fileName: `${Message.channel.name}.html` });
 await ChannelLog.send({ embeds: [Embed], files: [transcript] }).catch(() => { });
 setTimeout(async () => {
 await Message.channel.delete().catch(() => { });
 }, 10000)
 } break;
 case 'AddPerson-6': {
 const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
 if (!Member.roles.cache.some((Role) => [TicketM7kma.Rf32dea.Support, TicketM7kma.Rf32dea.Management].includes(Role.id))) return await Message.reply({ content: `**ليس لديك صلاحيات***`, flags: 64 });
 const TextInput = new TextInputBuilder({ customId: 'AddPerson-6', label: 'إضافة شخص', placeholder: 'ادخل ايدي الشخص الذي تريد اضافته', style: 1 });
 const ActionRow = new ActionRowBuilder({ components: [TextInput] });
 const Modal = new ModalBuilder({ customId: 'AddPerson-6', title: 'إضافة شخص', components: [ActionRow] });
 await Message.showModal(Modal);
 } break;
 case 'RemovePerson-6': {
 const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
 if (!Member.roles.cache.some((Role) => [TicketM7kma.Rf32dea.Support, TicketM7kma.Rf32dea.Management].includes(Role.id))) return await Message.reply({ content: `**ليس لديك صلاحيات***`, flags: 64 });
 const TextInput = new TextInputBuilder({ customId: 'RemovePerson-6', label: 'طرد شخص', placeholder: 'ادخل ايدي الشخص الذي تريد طرده', style: 1 });
 const ActionRow = new ActionRowBuilder({ components: [TextInput] });
 const Modal = new ModalBuilder({ customId: 'RemovePerson-6', title: 'طرد شخص', components: [ActionRow] });
 await Message.showModal(Modal);
 } break;
 }
 }
 }
 } else if (Message.isModalSubmit()) {
 switch (Message.customId) {
 case 'AddPerson-5': {
 const Member = Message.guild.members.cache.get(Message.fields.getTextInputValue('AddPerson-5'));
 if (!Member) return await Message.reply({ content: `**لا يمكنك إضافة شخص غير موجود**`, flags: 64 });
 await Message.channel.permissionOverwrites.edit(Member.id, { ViewChannel: true, SendMessages: true });
 await Message.reply({ content: `**— تـم إضـافـة شـخـص : ${Member}**` });
 } break;
 case 'RemovePerson-5': {
 const Member = Message.guild.members.cache.get(Message.fields.getTextInputValue('RemovePerson-5'));
 if (!Member) return await Message.reply({ content: `**لا يمكنك طرد شخص غير موجود**`, flags: 64 });
 await Message.channel.permissionOverwrites.edit(Member.id, { ViewChannel: false, SendMessages: false });
 await Message.reply({ content: `**— تـم طـرد شـخـص : ${Member}**` });
 } break;
 case 'AddPerson-6': {
 const Member = Message.guild.members.cache.get(Message.fields.getTextInputValue('AddPerson-6'));
 if (!Member) return await Message.reply({ content: `**لا يمكنك إضافة شخص غير موجود**`, flags: 64 });
 await Message.channel.permissionOverwrites.edit(Member.id, { ViewChannel: true, SendMessages: true });
 await Message.reply({ content: `**— تـم إضـافـة شـخـص : ${Member}**` });
 } break;
 case 'RemovePerson-6': {
 const Member = Message.guild.members.cache.get(Message.fields.getTextInputValue('RemovePerson-6'));
 if (!Member) return await Message.reply({ content: `**لا يمكنك طرد شخص غير موجود**`, flags: 64 });
 await Message.channel.permissionOverwrites.edit(Member.id, { ViewChannel: false, SendMessages: false });
 await Message.reply({ content: `**— تـم طـرد شـخـص : ${Member}**` });
 } break;
 }
 }
}