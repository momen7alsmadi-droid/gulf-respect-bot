"use strict";
import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db'
import { Canvas, loadImage } from 'canvas-constructor/cairo';
import { Identity } from '../Files〡[Config]/Files〡[Config].js';
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[ID].json' })
import Ms from 'ms';
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 const Embed = new EmbedBuilder();
 if (Message?.guild) { Embed.setAuthor({ name: Message?.guild?.name, iconURL: Message?.guild?.iconURL({ forceStatic: true, size: 4096 }) }); }
 if (Message?.guild) { Embed.setFooter({ text: Message?.guild?.name, iconURL: Message?.guild?.iconURL({ forceStatic: true, size: 4096 }) }); }
 if (Message?.guild) { Embed.setColor(Message?.guild?.members.me.displayHexColor); }
 if (Message.isButton()) {
 switch (Message.customId) {
 case 'ID〡Submit': {
 const GetDataMember = Database.get(`ID〡${Message.user.id}`) || { Status: false }
 if (GetDataMember.Status === true) return await Message.reply({ content: 'لديك هوية مفعلة بالفعل', flags: 64 })
 Embed.setDescription(`**|▬▬\`\`شـروط إنـشـاء الـهـويـة\`\`▬▬|**
**
— [1] الاســم الــربــاعــي الــكــامــل: يــجــب أن يــكــون الاســم ربــاعــيــاً و حــقــيــقــيــاً، بــحــيــث يــتــضــمــن الاســم الأول، و اســم الأب، و اســم الــجــد، مــع مــراعــاة أن يــكــون الاســم الــرابــع هــو اســم الــقــبــيــلــة أو الــعــائــلــة

— [2] عــدم اســتــخــدام الــرمــوز و الــألــقــاب: يُــمــنــع اســتــخــدام الــرمــوز، الــألــقــاب أو الــأســمــاء الــمــســتــعــارة عــنــد إنــشــاء الــهــويــة؛ فــقــط الأســمــاء الــحــقــيــقــيــة مــعــتــمــدة

— [3] صــورة الــهــويــة : يُــفــضــل إضــافــة صــورة شــخــصــيــة مــلاءمــة تــعــكــس شــخــصــيــة الــلاعــب، مــع الــالــتــزام بــالــلــبــاس الــلائــق وصـورة ذات خـلـفـيـة بـيـضـاء او خـضـراء بـدون أسـتـخـدام اي وشـم أو قـنـاع


— [4] الــلــغــة الــرســمــيــة: يُــشــتــرط كــتــابــة الاســم و الــمــعــلــومــات الــشــخــصــيــة بــالــلــغــة الــعــربــيــة الــفــصــحــى، لــضــمــان الــوضــوح 

— [5] الــتــطــابــق مــع مــعــلــومــات الـمـواطـن: يــجــب أن تــتــطــابــق الــهــويــة الــمُدخــلــة مــع الــبــيــانــات الــمــســتــخــدمــة فــي الــحــســاب لــضــمــان الأمــان و الــمــوثــوقــيــة
 
— [6] الــمــوافــقــة عــلــى الــمــراجــعــة: يــحــتــفــظ ســيــرفــر قولف ريسبكت بــحــق مــراجــعــة الــهــويــة فــي أي وقــت لــضــمــان الــتــزامــهــا بــالــشــروط و الــســيــاســات، و قــد يُــتــم تــعــديــل الــهــويــة أو إلــغــاؤهــا فــي حــال وجــود مــخــالــفــات

— \`مـلـاحـظـة\` : بــمــجــرد الــمــتــابــعــة، يُــعــتــبــر الــمــســتــخــدم مــوافــقــاً عــلــى الــشــروط الــمــذكــورة، و أي مــخــالــفــة قــد تُــؤدي إلــى تــعــلــيــق أو إلــغــاء الــهــويــة فــوراً
**`)
 const Button = new ButtonBuilder({ customId: 'ID〡Submit-ID', label: 'قرأت الشروط', style: 2 })
 await Message.user.send({ embeds: [Embed], components: [{ type: 1, components: [Button] }] }).then(async () => {
 await Message.reply({ content: 'تم إرسال استبيان بنجاح الي الخاص بك', flags: 64 })
 }).catch(async () => {
 await Message.reply({ content: `يرجى التأكد من الخاص لديك`, flags: 64 })
 })
 } break;
 case 'ID〡Submit-ID': {
 const TextInput = [
 new TextInputBuilder({ customId: 'Character-Name', label: 'إسـم الـشـخـصـيـة', style: 1, required: true, minLength: 4, maxLength: 30 }),
 new TextInputBuilder({ customId: 'Character-Age', label: 'عـمـر الـشـخـصـيـة', style: 1, required: true, minLength: 1, maxLength: 3 }),
 new TextInputBuilder({ customId: 'Character-DOB', label: 'تـاريـخ مـيـلاد الـشـخـصـيـة', placeholder: '( يجب أن يكون بصيغة DD/MM/YYYY )', style: 1, required: true, minLength: 9, maxLength: 10 }),
 new TextInputBuilder({ customId: 'Birth-Place', label: 'مـكـان الـمـيـلاد', placeholder: 'بـولـيـتـو ، سـانـدي شـور ، لـوس أنـجـلـس', style: 1, required: true, minLength: 4, maxLength: 20 }),
 new TextInputBuilder({ customId: 'Current-Job', label: 'وظـيـفـتـك الـحـالـيـة', placeholder: 'مثلاً : تاكسي', style: 1, required: true, minLength: 4, maxLength: 20 })
 ]
 const ActionRow = TextInput.map(Map => new ActionRowBuilder({ components: [Map] }))
 const Modal = new ModalBuilder({ customId: 'ID〡Submit-ID', title: 'إنـشـاء الـهـويـة', components: ActionRow })
 await Message.showModal(Modal)
 } break;
 case 'ID〡View': {
 const TextInput = new TextInputBuilder({ customId: 'ID〡View-ID', label: 'ايدي الشخصية', style: 1, required: true, minLength: 19, maxLength: 19 })
 const Modal = new ModalBuilder({ customId: 'ID〡View-ID', title: 'عرض الهوية', components: [{ type: 1, components: [TextInput] }] })
 await Message.showModal(Modal)
 } break;
 case 'ID〡My': {
 const Data = Database.get(`ID〡${Message.user.id}`) || { Status: false }
 if (!Data) return await Message.reply({ content: 'لا يوجد هوية لديك', flags: 64 })
 if (Data && Data.Status === false) return Message.reply({ content: 'لم يتم الموافقة علي الهوية', flags: 64 })
 const DisplayAvatar = await loadImage(Data.Image);
 const ImageID = await loadImage(`ID.png`);
 async function Generate() {
 const canvas = new Canvas(ImageID.width, ImageID.height)
 .printImage(ImageID, 0, 0, ImageID.width, ImageID.height)
 .printCircularImage(DisplayAvatar, 605, 536, 250, 250)
 .setColor('#000001').setTextAlign('right').setTextFont(`60px EBGaramond`).printText(`${Data.Name}`, 1490, 303)
 .setColor('#000001').setTextAlign(`right`).setTextFont(`70px EBGaramond`).printText(`${Data.Age}`, 1490, 443)
 .setColor('#000001').setTextAlign(`right`).setTextFont(`70px EBGaramond`).printText(`${Data.DOB}`, 1285, 573)
 .setColor('#000001').setTextAlign(`right`).setTextFont(`70px EBGaramond`).printText(`${Data.BirthPlace}`, 1235, 690)
 .setColor('#000001').setTextAlign(`right`).setTextFont(`70px EBGaramond`).printText(`${Data.CurrentJob}`, 1400, 822)
 .setColor('#000001').setTextAlign(`right`).setTextFont(`40px EBGaramond`).printText(`${Data.CreationDate}`, 1460, 1042)
 .setColor('#000001').setTextAlign(`right`).setTextFont(`40px EBGaramond`).printText(`${Data.ExpirationDate}`, 480, 1042)
 .toBuffer();
 return canvas;
 }
 const Buffer = await Generate()
 const Attachment = new AttachmentBuilder(Buffer, { name: 'Image.png' })
 const Button = new ButtonBuilder({ customId: 'ID〡My', label: 'عرض هويتي', style: 2 })
 await Message.channel.send({ content: `${Message.user}`, files: [Attachment], components: [{ type: 1, components: [Button] }] })
 } break;
 case 'ID〡Accept': {
 const Content = Message.message.content.replace('<@', '').replace('>', '')
 const GetData = Database.get(`ID〡${Content}`)
 if (GetData) {
 if (GetData.MessageID === Message.message.id) {
 if (GetData.Status === true) return await Message.reply({ content: 'تم الموافقة علي الهوية', flags: 64 })
 const Member = await Message.guild.members.cache.get(Content);
 const Embed = new EmbedBuilder()
 Embed.setColor('Green')
 Embed.setDescription(`**__— عــزيــزي/عــزيــزتــي [${Member}]

— يــســرنــا إعــلامــك بــقــبــول طــلــبــك لــإنــشــاء الــهــويــة فــي قولف ريسبكت و نــهــنــئــك عــلــى انــضــمــامــك إلــى هــذه الـدولـة المـتـمـيـزة حــيــث الــعــدالــة والــديــمــقــراطــيــة أســاس الــنــجــاح.

— تــأكــد مــن مــراجــعــة بــيــانــات هــويــتــك والــالــتــزام بــالــقــوانــيــن لــتــكــون جــزءًا فــعــالاً مــن مــجــتــمــعــنــا الــراقــي.

 — نــتــمــنــى لــك تــجــربــة مــمــتــعــة ومــمــيــزة فــي قولف ريسبكت.

— مــع أطــيــب الــتــحــيــات،
الأحـوال الــمــدنــيــة__**`)
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/image-Accept.png`, { name: 'image-Accept.png' });
 Embed.setImage(`attachment://image-Accept.png`)
 await Message.message.edit({ components: [] })
 await Message.reply({ content: 'تم الموافقة علي الهوية', flags: 64 })
 Database.set(`ID〡${Content}`, { ...GetData, Status: true })
 await Member.roles.add('').catch(()=>{})
 await Member.send({ embeds: [Embed], files: [Attachment] }).catch(async () => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(async () => { })
 }
 }
 } break;
 case 'ID〡Reject': {
 const TextInput = new TextInputBuilder({ customId: 'ID〡Reject-ID', label: 'سبب الرفض', style: 2, required: true, minLength: 1, maxLength: 100 })
 const Modal = new ModalBuilder({ customId: 'ID〡Reject-ID', title: 'رفض الهوية', components: [{ type: 1, components: [TextInput] }] })
 await Message.showModal(Modal)
 } break;
 }
 } else if (Message.isModalSubmit()) {
 switch (Message.customId) {
 case 'ID〡Submit-ID': {
 const Character〡Name = Message.fields.getTextInputValue('Character-Name')
 const Character〡Age = Message.fields.getTextInputValue('Character-Age')
 const Character〡DOB = Message.fields.getTextInputValue('Character-DOB')
 const Birth〡Place = Message.fields.getTextInputValue('Birth-Place')
 const Current〡Job = Message.fields.getTextInputValue('Current-Job')
 await Message.deferUpdate({ })
 Embed.setDescription(`**يرجى ارسال صوره الشخصية - **`)
 await Message.editReply({ embeds: [Embed], components: [] })
 const filter = response => response.author.id === Message.user.id && response.attachments.size > 0 && response.attachments.every(attachment => attachment.contentType.startsWith('image/'));
 const Member = await Message.user.createDM();
 const collector = Member.createMessageCollector({ filter, max: 1, time: 120000 });
 collector.on('collect', async Message => {
 const Image = Message.attachments.first();
 if (Image) {
 Embed.setDescription(`**تم ارسال بيانات بنجاح يرجى الانتظار - **`)
 const Channel = await Client.channels.fetch(Identity.Channel)
 await Message.author.send({ embeds: [Embed], components: [] })
 Embed.addFields({ name: 'الاســم', value: `${Character〡Name}` })
 Embed.addFields({ name: 'العـمـر', value: `${Character〡Age}` })
 Embed.addFields({ name: 'تـاريـخ الـمـيـلاد', value: `${Character〡DOB}` })
 Embed.addFields({ name: 'مـكـان الـمـيـلاد', value: `${Birth〡Place}` })
 Embed.addFields({ name: 'وظـيـفـتـك الـحـالـيـة', value: `${Current〡Job}` })
 Embed.setImage(Image.url);
 Embed.setDescription(' ')
 const Buttons = [
 new ButtonBuilder({ customId: 'ID〡Accept', label: 'قبول', style: 3 }),
 new ButtonBuilder({ customId: 'ID〡Reject', label: 'رفض', style: 4 })
 ]
 const MessageID = await Channel.send({ content: `${Message.author}`, embeds: [Embed], components: [{ type: 1, components: Buttons }] })
 const creationDate = new Date().toISOString().split('T')[0];
 const expirationDate = new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0];
 Database.set(`ID〡${Message.author.id}`, { Name: Character〡Name, Age: Character〡Age, DOB: Character〡DOB, BirthPlace: Birth〡Place, CurrentJob: Current〡Job, Image: Image.url, Status: false, MessageID: MessageID.id, CreationDate: creationDate, ExpirationDate: expirationDate, Finished: Date.now() + Ms('90d') })
 }
 });
 collector.on('end', async (Collected) => {
 if (Collected.size === 0) {
 Embed.setDescription(`**لم يتم ارسال الصورة - **`)
 await Message.editReply({ embeds: [Embed], components: [] })
 }
 })
 } break;
 case 'ID〡View-ID': {
 const ID〡View = Message.fields.getTextInputValue('ID〡View-ID')
 const Member = await Message.guild.members.cache.get(ID〡View)
 if (!Member) return await Message.reply({ content: 'لا يوجد شخص بهذا الايدي', flags: 64 })
 const Data = Database.get(`ID〡${Message.user.id}`) || { Status: false }
 if (!Data) return await Message.reply({ content: 'لا يوجد هوية بهذا الايدي', flags: 64 })
 if (Data.Status === false) return Message.reply({ content: 'لم يتم الموافقة علي الهوية', flags: 64 })
 const DisplayAvatar = await loadImage(Data.Image);
 const ImageID = await loadImage(`ID.png`);
 async function Generate() {
 const canvas = new Canvas(ImageID.width, ImageID.height)
 .printImage(ImageID, 0, 0, ImageID.width, ImageID.height)
 .printCircularImage(DisplayAvatar, 605, 536, 250, 250)
 .setColor('#000001').setTextAlign('right').setTextFont(`60px EBGaramond`).printText(`${Data.Name}`, 1490, 303)
 .setColor('#000001').setTextAlign(`right`).setTextFont(`70px EBGaramond`).printText(`${Data.Age}`, 1490, 443)
 .setColor('#000001').setTextAlign(`right`).setTextFont(`70px EBGaramond`).printText(`${Data.DOB}`, 1285, 573)
 .setColor('#000001').setTextAlign(`right`).setTextFont(`70px EBGaramond`).printText(`${Data.BirthPlace}`, 1235, 690)
 .setColor('#000001').setTextAlign(`right`).setTextFont(`70px EBGaramond`).printText(`${Data.CurrentJob}`, 1400, 822)
 .setColor('#000001').setTextAlign(`right`).setTextFont(`40px EBGaramond`).printText(`${Data.CreationDate}`, 1460, 1042)
 .setColor('#000001').setTextAlign(`right`).setTextFont(`40px EBGaramond`).printText(`${Data.ExpirationDate}`, 480, 1042)
 .toBuffer();
 return canvas;
 }
 const Buffer = await Generate()
 const Attachment = new AttachmentBuilder(Buffer, { name: 'Image.png' })
 await Message.channel.send({ files: [Attachment], flags: 64 })
 } break;
 case 'ID〡Reject-ID': {
 const Content = Message.message.content.replace('<@', '').replace('>', '')
 const Reason = Message.fields.getTextInputValue('ID〡Reject-ID')
 const GetData = Database.get(`ID〡${Content}`)
 if (GetData) {
 if (GetData?.MessageID === Message.message.id) {
 const Member = await Message.guild.members.cache.get(Content.replace('ID〡', ''));
 const Embed = new EmbedBuilder()
 Embed.setColor('Red')
 Embed.setDescription(`**__عــزيــزي/عــزيــزتــي [${Member}]،

— نــأســف لــإبــلاغــك بــأنــه تــم رفــض طــلــبــك لــإنــشــاء الــهــويــة فــي قولف ريسبكت يــعــود ذلــك [${Reason}]

— نــدعــوك لــإعــادة الــتــقــديــم مــع مــراعــاة الــالــتــزام بــجــمــيــع الــشــروط والــقــوانــيــن الــمــعــلــنــة لــضــمــان قــبــول طــلــبــك مــســتــقــبــلاً.

مــع الــتــحــيــة،
الأحــوال الــمــدنــيــة__**`)
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/image-Accept.png`, { name: 'image-Accept.png' });
 Embed.setImage(`attachment://image-Accept.png`)
 await Message.message.edit({ components: [] })
 await Message.reply({ content: 'تم رفض الهوية', flags: 64 })
 Database.delete(`ID〡${Content}`)
 await Member.send({ embeds: [Embed], files: [Attachment] }).catch(async () => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(async () => { })
 }
 }
 } break;
 }
 }
}