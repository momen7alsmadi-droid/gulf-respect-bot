"use strict";
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, EmbedBuilder, ButtonBuilder, AttachmentBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db';
import { AlShuri } from '../Files〡[Config]/Files〡[Config].js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Al-Shuri].json' })
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 if (Message.isButton()) {
 switch (Message.customId) {
 case 'Al-Shuri-Setup': {
 const TextInputs = [
 new TextInputBuilder({ customId: 'Al-Shuri-Project', label: 'ماهو مشروع القرار', style: 2, required: true, maxLength: 300 }),
 new TextInputBuilder({ customId: 'Al-Shuri-Project-Description', label: ' الهدف من مشروع القرار', style: 2, required: true, maxLength: 300 }),
 ]
 const ActionRow = TextInputs.map((Input) => new ActionRowBuilder().addComponents(Input))
 const Modal = new ModalBuilder({ customId: 'Al-Shuri-Setup', title: 'مشروع', components: ActionRow })
 await Message.showModal(Modal)
 } break;
 case 'Al-Shuri-Yes': {
 if (!Message.guild.members.cache.get(Message.user.id).roles.cache.some(Role => AlShuri.Deputy === Role.id || AlShuri.Leader === Role.id)) return await Message.reply({ content: `ليس لديك صلاحية للقبول`, flags: 64 })
 const TextInput = new TextInputBuilder({ customId: 'Al-Shuri-Time', label: 'ميقات الجلسة', style: 2, required: true, maxLength: 2000 })
 const Modal = new ModalBuilder({ customId: 'Al-Shuri-Yes', title: 'ميقات الجلسة', components: [{ type: 1, components: [TextInput] }] })
 await Message.showModal(Modal)
 } break;
 case 'Al-Shuri-No': {
 if (!Message.guild.members.cache.get(Message.user.id).roles.cache.some(Role => AlShuri.Deputy === Role.id || AlShuri.Leader === Role.id)) return await Message.reply({ content: `ليس لديك صلاحية للقبول`, flags: 64 })
 const TextInput = new TextInputBuilder({ customId: 'Al-Shuri-Reason', label: 'سبب رفض', style: 2, required: true, maxLength: 2000 })
 const Modal = new ModalBuilder({ customId: 'Al-Shuri-No', title: 'سبب الرفض', components: [{ type: 1, components: [TextInput] }] })
 await Message.showModal(Modal)
 } break;
 case 'Al-Shuri-Vote': {
 if (!Message.guild.members.cache.get(Message.user.id).roles.cache.some(Role => AlShuri.Deputy === Role.id || AlShuri.Leader === Role.id)) return await Message.reply({ content: `ليس لديك صلاحية للقبول`, flags: 64 })
 const GetData = Database.get(`Al-Shuri-Vote〡${Message.guild.id}`)
 if (GetData && GetData.Status === true) return await Message.reply({ content: '**يوجد تصويت مناقشة مشروع القرار الذي يتم الان**', flags: 64 })
 const TextInput = new TextInputBuilder({ customId: 'Al-Shuri-Vote-Number', label: 'رقم القرار', style: 1, required: true })
 const Modal = new ModalBuilder({ customId: 'Al-Shuri-Vote', title: 'تصويت', components: [{ type: 1, components: [TextInput] }] })
 await Message.showModal(Modal)
 } break;
 case 'Al-Shuri-End': {
 if (!Message.guild.members.cache.get(Message.user.id).roles.cache.some(Role => AlShuri.Deputy === Role.id || AlShuri.Leader === Role.id)) return await Message.reply({ content: `ليس لديك صلاحية للقبول`, flags: 64 })
 const TextInput = new TextInputBuilder({ customId: 'Al-Shuri-Vote-Message', label: 'ايدي رسالة التصويت', style: 1, required: true })
 const Modal = new ModalBuilder({ customId: 'Al-Shuri-End', title: 'تصويت', components: [{ type: 1, components: [TextInput] }] })
 await Message.showModal(Modal)
 } break;
 case 'Al-Shuri-Vote-Yes': {
 const GetData = Database.get(`Vote〡${Message.message.id}`)
 if (GetData && GetData.some(Data => Data.Member === Message.user.id)) {
 return await Message.reply({ content: `لقد قمت بالفعل بالتصويت`, flags: 64 })
 }
 const Member = Message.guild.members.cache.get(Message.user.id);
 if (Member.roles.cache.has(AlShuri.Democratic)) {
 Database.push(`Vote〡${Message.message.id}`, { Type: 'Democratic', Member: Message.user.id, Vote: 'Yes' })
 Message.reply({ content: `تم التصويت بنجاح`, flags: 64 })
 } else if (Member.roles.cache.has(AlShuri.Republican)) {
 Database.push(`Vote〡${Message.message.id}`, { Type: 'Republican', Member: Message.user.id, Vote: 'Yes' })
 Message.reply({ content: `تم التصويت بنجاح`, flags: 64 })
 } else {
 await Message.reply({ content: `ليس لديك صلاحية للتصويت`, flags: 64 })
 }
 } break;
 case 'Al-Shuri-Vote-No': {
 const GetData = Database.get(`Vote〡${Message.message.id}`)
 if (GetData && GetData.some(Data => Data.Member === Message.user.id)) {
 return await Message.reply({ content: `لقد قمت بالفعل بالتصويت`, flags: 64 })
 }
 const Member = Message.guild.members.cache.get(Message.user.id);
 if (Member.roles.cache.has(AlShuri.Democratic)) {
 Database.push(`Vote〡${Message.message.id}`, { Type: 'Democratic', Member: Message.user.id, Vote: 'No' })
 Message.reply({ content: `تم التصويت بنجاح`, flags: 64 })
 } else if (Member.roles.cache.has(AlShuri.Republican)) {
 Database.push(`Vote〡${Message.message.id}`, { Type: 'Republican', Member: Message.user.id, Vote: 'No' })
 Message.reply({ content: `تم التصويت بنجاح`, flags: 64 })
 } else {
 await Message.reply({ content: `ليس لديك صلاحية للتصويت`, flags: 64 })
 }
 } break;
 }
 } else if (Message.isModalSubmit()) {
 switch (Message.customId) {
 case 'Al-Shuri-Yes': {
 const Time = Message.fields.getTextInputValue('Al-Shuri-Time')
 const GetData = Database.get(`Al-Shuri〡${Message.message.id}`)
 const Member = Client.users.cache.get(GetData.Member)
 const Channel = Client.channels.cache.get(AlShuri.Channel)
 const Embed = new EmbedBuilder()
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
 Embed.setThumbnail('https://i.postimg.cc/85XCjPCV/zip_3.jpg')
 Embed.setImage(`https://i.postimg.cc/85XCjPCV/zip_3.jpg`)
 Embed.setDescription(`**__— نـود إعلـامك بـأنـه تـم قبول — الـمـشـروع قـرار الـذي قـدمـتـه : ${Member}

— رقـم الـمـشـروع : ${GetData.NumberProject}

— المـشـروع قـرار المقبول : ${GetData.Project}

— ميقات الجلسة : ${Time}

— الـمـسـؤول عـن القبول : ${Message.user}

ـ تـحـيـات مـجـلـس الـنـواب - ♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜__**`)
 await Channel.send({ embeds: [Embed], content: `` })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] })
 await Member.send({
 content: `**__ — عـزيـزي عـضـو الـمـجلـس نـود إعلـامك بـأنـه تـم قبول — الـمـشـروع قـرار الـذي قـدمـتـه : ${Member}

— رقـم الـمـشـروع : ${GetData.NumberProject}

— المـشـروع قـرار المقبول : ${GetData.Project}

— ميقات الجلسة : ${Time}

— الـمـسـؤول عـن القبول : ${Message.user}

— عـزيـزي عـضـو الـبـرلـمـان__**
**\`\`\`ـ شـكـراً لـاهـتـمـامـك بـتـقـديـم مـشـروع الـقـرار.\`\`\`
ـ تـحـيـات مـجـلـس الـنـواب - ♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜ **` }).catch(() => { })
 await Message.reply({ content: `تم قبول المشروع بنجاح`, flags: 64 }).catch(() => { })
 await Message.message.edit({ components: [] }).catch(() => { })
 } break;
 case 'Al-Shuri-No': {
 const Reason = Message.fields.getTextInputValue('Al-Shuri-Reason')
 const GetData = Database.get(`Al-Shuri〡${Message.message.id}`)
 const Member = Client.users.cache.get(GetData.Member)
 await Member.send({
 content: `**__ — عـزيـزي عـضـو الـمـجلـس نـود إعلـامك بـأنـه تـم رفـض — الـمـشـروع قـرار الـذي قـدمـتـه وهو : ${Member}

— رقـم الـمـشـروع : ${GetData.NumberProject}

— المـشـروع قـرار الـمـرفـوض : ${GetData.Project}

— الـسـبـب : ${Reason}

— الـمـسـؤول عـن الـرفـض : ${Message.user}

— عـزيـزي عـضـو الـبـرلـمـان__**
**\`\`\`ـ شـكـراً لـاهـتـمـامـك بـتـقـديـم مـشـروع الـقـرار. فـي حـال رفـض مـشـروعـك، يـمـكـنـك اتـبـاع الـخـطـوات الـتـالـيـة:
 1. مـنـاقـشـة أسـبـاب الـرفـض مـع رئـيـس الـبـرلـمـان ومحـاولـة الـتـفـاهـم.
 2. إذا تـعـذر الـتـوصـل لاتـفـاق، الـتـوجـه إلـى وزارة الـعـدل لـتـقـديـم شـكـوى بـخـصـوص الـعـرقـلـة.
\`\`\`
ـ تـحـيـات مـجـلـس الـنـواب - ♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜ **` }).catch(() => { })
 await Message.reply({ content: `تم قبول المشروع بنجاح`, flags: 64 })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Al-Shuri〡${Message.message.id}`)
 } break;
 case 'Al-Shuri-Setup': {
 const Project = Message.fields.getTextInputValue('Al-Shuri-Project')
 const Description = Message.fields.getTextInputValue('Al-Shuri-Project-Description')
 const Maths = Math.floor(Math.random() * 999999)
 const Channel = Client.channels.cache.get(AlShuri.Setp1.Channel)
 const Embed = new EmbedBuilder()
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
 Embed.setThumbnail('https://i.postimg.cc/2j0wPcVh/1.webp')
 Embed.setDescription(`— رقـم الـمـشـروع : ${Maths}

— الـمـشـروع قـرار : ${Project}`)
 const Buttons = [
 new ButtonBuilder({ customId: 'Al-Shuri-Yes', label: 'قبول', style: 3 }),
 new ButtonBuilder({ customId: 'Al-Shuri-No', label: 'رفض', style: 4 }),
 ]
 const MessageID = await Channel.send({ embeds: [Embed], content: ``, components: [{ type: 1, components: Buttons }] })
 await Message.reply({ content: 'تم إرسال المشروع للبرلمان للمناقشة', flags: 64 })
 Database.set(`Al-Shuri〡${MessageID.id}`, { Project: Project, Description: Description, NumberProject: Maths, Member: Message.user.id, MessageID: MessageID.id })
 } break;
 case 'Al-Shuri-Reason': {
 const Reason = Message.fields.getTextInputValue('Al-Shuri-Reason')
 const GetData = Database.get(`Al-Shuri〡${Message.message.id}`)
 const Member = Client.users.cache.get(GetData.Member)
 await Member.send({
 content: `**__ — عـزيـزي عـضـو الـمـجلـس نـود إعلـامك بـأنـه تـم رفـض — الـمـشـروع قـرار الـذي قـدمـتـه وهو : ${Member}

— رقـم الـمـشـروع : ${GetData.NumberProject}

— المـشـروع قـرار الـمـرفـوض : ${GetData.Project}

— الـسـبـب : ${Reason}

— الـمـسـؤول عـن الـرفـض : ${Message.user}

— عـزيـزي عـضـو الـبـرلـمـان__**
**\`\`\`ـ شـكـراً لـاهـتـمـامـك بـتـقـديـم مـشـروع الـقـرار. فـي حـال رفـض مـشـروعـك، يـمـكـنـك اتـبـاع الـخـطـوات الـتـالـيـة:
 1. مـنـاقـشـة أسـبـاب الـرفـض مـع رئـيـس الـبـرلـمـان ومحـاولـة الـتـفـاهـم.
 2. إذا تـعـذر الـتـوصـل لاتـفـاق، الـتـوجـه إلـى وزارة الـعـدل لـتـقـديـم شـكـوى بـخـصـوص الـعـرقـلـة.\`\`\`
ـ تـحـيـات مـجـلـس الـنـواب - ♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜ **`, flags: 64
 }).catch(() => { })

 await Message.reply({ content: `تم إرسال رفض المشروع للعضو`, flags: 64 })
 Database.delete(`Al-Shuri〡${Message.message.id}`)
 } break;
 case 'Al-Shuri-Vote': {
 const NumberProject = Message.fields.getTextInputValue('Al-Shuri-Vote-Number')
 const GetData = Database.startsWith(`Al-Shuri〡`).map((Data) => ({ ID: Data.ID }))
 let found = false;
 for (const Data of GetData) {
 const GetData = Database.get(`${Data.ID}`)
 if (GetData && GetData.NumberProject === Number(NumberProject)) {
 found = true;
 const Channel = Client.channels.cache.get(AlShuri.VoteChannel)
 const Embed = new EmbedBuilder()
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) })
 Embed.setThumbnail(`https://i.postimg.cc/2j0wPcVh/1.webp`)
 Embed.setImage(`https://i.postimg.cc/zDys2gfz/cfbdb0f3833180e1.webp`)
 Embed.setDescription(`— رقـم الـمـشـروع : ${GetData.NumberProject}

 — صاحب المشروع : ${Message.user}

— الـمـشـروع قـرار : ${GetData.Project}`)
 const Buttons = [
 new ButtonBuilder({ customId: 'Al-Shuri-Vote-Yes', label: 'قبول', style: 2 }),
 new ButtonBuilder({ customId: 'Al-Shuri-Vote-No', label: 'رفض', style: 2 }),
 ]
 const ActionRow = new ActionRowBuilder().addComponents(Buttons)
 const MessageID = await Channel.send({ embeds: [Embed], components: [ActionRow] })
 Database.set(`Al-Shuri-Vote〡${Message.guild.id}`, { Project: GetData.Project, Channel: Message.channel.id, NumberProject: NumberProject, Member: Message.user.id, Status: true, MessageID: MessageID.id })
 return await Message.reply({ content: `تم إرسال التصويت للبرلمان`, flags: 64 })
 }
 }
 if (!found) return await Message.reply({ content: `❌ **لم يتم العثور على مشروع برقم ${NumberProject}**
> تأكد من رقم القرار الصحيح`, flags: 64 });
 } break;
 case 'Al-Shuri-End': {
 const MessageID = Message.fields.getTextInputValue('Al-Shuri-Vote-Message');
 const GetData = Database.get(`Al-Shuri-Vote〡${Message.guild.id}`)
 if (!GetData) return await Message.reply({ content: '**لا يوجد تصويت مناقشة مشروع القرار الذي يتم الان**', flags: 64 })
 if (GetData.MessageID !== MessageID) return Message.reply({ content: '**يرجى التأكد من أنك قمت بإرسال الرسالة الصحيحة**', flags: 64 });
 const Votes = Database.get(`Vote〡${GetData.MessageID}`);
 if (!Votes) return await Message.reply({ content: '**لا يوجد تصويت الان**', flags: 64 });
 const YesVotes = Votes.filter(vote => vote.Vote === 'Yes').length;
 const NoVotes = Votes.filter(vote => vote.Vote === 'No').length;
 const Year = new Date().getFullYear();
 const Month = String(new Date().getMonth() + 1).padStart(2, '0');
 const Day = String(new Date().getDate()).padStart(2, '0');
 const Channel = Message.guild.channels.cache.get('')
 const MessageEdit = await Channel.messages.fetch(GetData.MessageID)
 registerFont('NotoSansArabic.ttf', { family: 'Noto Sans Arabic' });
const Image = await loadImage('El-Shori.png');
 const Red = await loadImage('Red.png');
 const Yellow = await loadImage('Yellow.png');
 async function Generate() {
 let canvas = new Canvas(Image.width, Image.height)
 .printImage(Image, 0, 0, Image.width, Image.height)
 .setColor('#ffffff').setTextAlign('center').setTextFont(`43px EBGaramond`).printText(`${GetData.Project}`, 950, 220)
 .setColor('#ffffff').setTextAlign('center').setTextFont(`50px EBGaramond`).printText(`${NoVotes}`, 630, 1058)
 .setColor('#ffffff').setTextAlign('center').setTextFont(`50px EBGaramond`).printText(`${YesVotes}`, 1620, 1058)
 .setColor('#ffffff').setTextAlign('center').setTextFont(`35px EBGaramond`).printText(`${Year}/${Month}/${Day}`, 90, 1055);
 const yesCoordinates = [
 { x: 1810, y: 705 }, { x: 1730, y: 705 }, { x: 1650, y: 705 }, { x: 1570, y: 705 }, { x: 1490, y: 705 },
 { x: 1410, y: 705 }, { x: 1330, y: 705 }, { x: 1250, y: 705 }, { x: 1170, y: 705 }, { x: 1090, y: 705 },
 { x: 1810, y: 785 }, { x: 1730, y: 785 }, { x: 1650, y: 785 }, { x: 1570, y: 785 }, { x: 1490, y: 785 },
 { x: 1410, y: 785 }, { x: 1330, y: 785 }, { x: 1250, y: 785 }, { x: 1170, y: 785 }, { x: 1090, y: 785 },
 { x: 1810, y: 865 }, { x: 1730, y: 865 }, { x: 1650, y: 865 }, { x: 1570, y: 865 }, { x: 1490, y: 865 },
 { x: 1410, y: 865 }, { x: 1330, y: 865 }, { x: 1250, y: 865 }, { x: 1170, y: 865 }, { x: 1090, y: 865 },
 { x: 1810, y: 945 }, { x: 1730, y: 945 }, { x: 1650, y: 945 }, { x: 1570, y: 945 }, { x: 1490, y: 945 },
 { x: 1410, y: 945 }, { x: 1330, y: 945 }, { x: 1250, y: 945 }, { x: 1170, y: 945 }, { x: 1090, y: 945 }
 ];
 const noCoordinates = [
 { x: 780, y: 705 }, { x: 700, y: 705 }, { x: 620, y: 705 }, { x: 540, y: 705 }, { x: 460, y: 705 },
 { x: 380, y: 705 }, { x: 300, y: 705 }, { x: 220, y: 705 }, { x: 140, y: 705 }, { x: 60, y: 705 },
 { x: 780, y: 785 }, { x: 700, y: 785 }, { x: 620, y: 785 }, { x: 540, y: 785 }, { x: 460, y: 785 },
 { x: 380, y: 785 }, { x: 300, y: 785 }, { x: 220, y: 785 }, { x: 140, y: 785 }, { x: 60, y: 785 },
 { x: 780, y: 865 }, { x: 700, y: 865 }, { x: 620, y: 865 }, { x: 540, y: 865 }, { x: 460, y: 865 },
 { x: 380, y: 865 }, { x: 300, y: 865 }, { x: 220, y: 865 }, { x: 140, y: 865 }, { x: 60, y: 865 },
 { x: 780, y: 945 }, { x: 700, y: 945 }, { x: 620, y: 945 }, { x: 540, y: 945 }, { x: 460, y: 945 },
 { x: 380, y: 945 }, { x: 300, y: 945 }, { x: 220, y: 945 }, { x: 140, y: 945 }, { x: 60, y: 945 }
 ];
 let yesIndex = 0;
 let noIndex = 0;
 Votes.forEach(vote => {
 const color = vote.Type === 'Republican' ? Red : Yellow;
 if (vote.Vote === 'Yes') {
 if (yesIndex < yesCoordinates.length) {
 const coord = yesCoordinates[yesIndex++];
 canvas = canvas.printCircularImage(color, coord.x, coord.y, 30, 30);
 }
 } else if (vote.Vote === 'No') {
 if (noIndex < noCoordinates.length) {
 const coord = noCoordinates[noIndex++];
 canvas = canvas.printCircularImage(color, coord.x, coord.y, 30, 30);
 }
 }
 });
 return canvas.toBuffer();
 }
 const Buffer = await Generate();
 const totalYesVotes = Votes.filter(vote => vote.Vote === 'Yes').length;
 const totalNoVotes = Votes.filter(vote => vote.Vote === 'No').length;
 const finalDecision = totalYesVotes > totalNoVotes ? 'تـم تـمـريـر الـقـرار' : 'فـشـل الـمـشـروع فـي الـمـرور';
 const Embed = new EmbedBuilder()
 Embed.setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) })
 Embed.setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) })
 Embed.setThumbnail(`https://i.postimg.cc/2j0wPcVh/1.webp`)
 Embed.setDescription(`** \`نـتـائـج الـتـصـويـت عـلـى الـقـرار رقـم [ ${GetData.NumberProject} ]\`
— الـجـمـهـوريـون :${Votes.filter(vote => vote.Type === 'Republican').length}
— مـوافـقـة :${Votes.filter(vote => vote.Vote === 'Yes' && vote.Type === 'Republican').map(vote => `<@${vote.Member}>`).join(', ')}
— رفـض :${Votes.filter(vote => vote.Vote === 'No' && vote.Type === 'Republican').map(vote => `<@${vote.Member}>`).join(', ')}
— الـديـمـقـراطـيـون : ${Votes.filter(vote => vote.Type === 'Democratic').length}
— مـوافـقـة :${Votes.filter(vote => vote.Vote === 'Yes' && vote.Type === 'Democratic').map(vote => `<@${vote.Member}>`).join(', ')}
— رفـض :${Votes.filter(vote => vote.Vote === 'No' && vote.Type === 'Democratic').map(vote => `<@${vote.Member}>`).join(', ')}
— \`الـقـرار الـنـهـائـي\` : ${finalDecision}**
— عـنـوان الـمـشـروع : ${GetData.Project}`)
 const Attachment = new AttachmentBuilder(Buffer, { name: 'El-Shori.png' });
 Embed.setImage(`attachment://El-Shori.png`)
 Database.delete(`Al-Shuri-Vote〡${Message.guild.id}`)
 await Message.reply({ content: `تم إنهاء التصويت`, flags: 64 }).catch(() => {})
 await MessageEdit.edit({ embeds: [Embed], files: [Attachment], content: '__ __', components: [] });
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] })
 } break;
 }
 }
}