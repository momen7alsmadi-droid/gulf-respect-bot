"use strict";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';
import { Submissions } from '../Files〡[Config]/Files〡[Config].js';
import { JsonDatabase } from 'wio.db';
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Submissions].json' })
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 switch (Message.customId) {
 case 'Submissions-Menu': {
 switch (Message.values[0]) {
 case 'Internal': {
 const TextInputs = [
 new TextInputBuilder({ customId: 'Submissions-Internal-FullName', label: 'الاسـم الـثـلاثـي', placeholder: 'الاسـم الـثـلاثـي', style: 1, required: true, minLength: 3, maxLength: 30 }),
 new TextInputBuilder({ customId: 'Submissions-Internal-Age', label: 'الـعـمـر الـحـقـيـقـي', placeholder: 'الـعـمـر الـحـقـيـقـي', style: 1, required: true, minLength: 1, maxLength: 2 }),
 new TextInputBuilder({ customId: 'Submissions-Internal-Experience', label: 'خـبـراتـك', placeholder: 'خـبـراتـك', style: 2, required: true, minLength: 1, maxLength: 100 }),
 new TextInputBuilder({ customId: 'Submissions-Internal-Sector', label: 'الـقـطـاع الـمـقـدم عـلـيـه', placeholder: 'الـقـطـاع الـمـقـدم عـلـيـه', style: 1, required: true, minLength: 3, maxLength: 30 }),
 new TextInputBuilder({ customId: 'Submissions-Internal-Reason', label: 'سـبـب الـتـقـديـم', placeholder: 'سـبـب الـتـقـديـم', style: 2, required: true, minLength: 1, maxLength: 100 })
 ]
 const ActionRow = TextInputs.map(Input => new ActionRowBuilder().addComponents(Input))
 const Modal = new ModalBuilder({ customId: 'Submissions-Internal', title: 'تقديم للوظيفة الداخلية', components: ActionRow })
 await Message.showModal(Modal)
 } break;
 case 'Gangs': {
 const TextInputs = [
 new TextInputBuilder({ customId: 'Submissions-Gangs-FullName', label: 'الاسـم الـرباعي', placeholder: 'الاسـم الـرباعي', style: 1, required: true, minLength: 3, maxLength: 30 }),
 new TextInputBuilder({ customId: 'Submissions-Gangs-Age', label: 'الـعـمـر الـحـقـيـقـي', placeholder: 'الـعـمـر الـحـقـيـقـي', style: 1, required: true, minLength: 1, maxLength: 2 }),
 new TextInputBuilder({ customId: 'Submissions-Gangs-Experience', label: 'خـبـراتـك', placeholder: 'خـبـراتـك', style: 2, required: true, minLength: 1, maxLength: 100 }),
 new TextInputBuilder({ customId: 'Submissions-Gangs-Sector', label: 'العصابة الـمـقـدم عـلـيـه', placeholder: 'العصابة الـمـقـدم عـلـيـه', style: 1, required: true, minLength: 3, maxLength: 30 }),
 new TextInputBuilder({ customId: 'Submissions-Gangs-Reason', label: 'سـبـب الـتـقـديـم', placeholder: 'سـبـب الـتـقـديـم', style: 2, required: true, minLength: 1, maxLength: 100 })
 ]
 const ActionRow = TextInputs.map(Input => new ActionRowBuilder().addComponents(Input))
 const Modal = new ModalBuilder({ customId: 'Submissions-Gangs', title: 'تقديم للعصابة', components: ActionRow })
 await Message.showModal(Modal)
 } break;
 case 'Justice': {
 const TextInputs = [
 new TextInputBuilder({ customId: 'Submissions-Justice-FullName', label: 'الاسـم الرباعي', placeholder: 'الاسـم الرباعي', style: 1, required: true, minLength: 3, maxLength: 30 }),
 new TextInputBuilder({ customId: 'Submissions-Justice-Age', label: 'الـعـمـر الـحـقـيـقـي', placeholder: 'الـعـمـر الـحـقـيـقـي', style: 1, required: true, minLength: 1, maxLength: 2 }),
 new TextInputBuilder({ customId: 'Submissions-Justice-Experience', label: 'خـبـراتـك', placeholder: 'خـبـراتـك', style: 2, required: true, minLength: 1, maxLength: 100 }),
 new TextInputBuilder({ customId: 'Submissions-Justice-Sector', label: 'التخصص الـمـقـدم عـلـيـه', placeholder: 'التخصص الـمـقـدم عـلـيـه', style: 1, required: true, minLength: 3, maxLength: 30 }),
 new TextInputBuilder({ customId: 'Submissions-Justice-Reason', label: 'سـبـب الـتـقـديـم', placeholder: 'سـبـب الـتـقـديـم', style: 2, required: true, minLength: 1, maxLength: 100 })
 ]
 const ActionRow = TextInputs.map(Input => new ActionRowBuilder().addComponents(Input))
 const Modal = new ModalBuilder({ customId: 'Submissions-Justice', title: 'تقديم العدل', components: ActionRow })
 await Message.showModal(Modal)
 } break;
 case 'Consultation': {
 const TextInputs = [
 new TextInputBuilder({ customId: 'Submissions-Consultation-FullName', label: 'الاسـم الـثـلاثـي', placeholder: 'الاسـم الـثـلاثـي', style: 1, required: true, minLength: 3, maxLength: 30 }),
 new TextInputBuilder({ customId: 'Submissions-Consultation-Age', label: 'الـعـمـر الـحـقـيـقـي', placeholder: 'الـعـمـر الـحـقـيـقـي', style: 1, required: true, minLength: 1, maxLength: 2 }),
 new TextInputBuilder({ customId: 'Submissions-Consultation-Experience', label: 'خـبـراتـك', placeholder: 'خـبـراتـك', style: 2, required: true, minLength: 1, maxLength: 100 }),
 new TextInputBuilder({ customId: 'Submissions-Consultation-Reason', label: 'سـبـب الـتـقـديـم', placeholder: 'سـبـب الـتـقـديـم', style: 2, required: true, minLength: 1, maxLength: 100 })
 ]
 const ActionRow = TextInputs.map(Input => new ActionRowBuilder().addComponents(Input))
 const Modal = new ModalBuilder({ customId: 'Submissions-Consultation', title: 'تقديم الـبـرلـمـان', components: ActionRow })
 await Message.showModal(Modal)
 } break;
 case 'Authority': {
 const TextInputs = [
 new TextInputBuilder({ customId: 'Submissions-Authority-FullName', label: 'الاسـم الـثـلاثـي', placeholder: 'الاسـم الـثـلاثـي', style: 1, required: true, minLength: 3, maxLength: 30 }),
 new TextInputBuilder({ customId: 'Submissions-Authority-Age', label: 'الـعـمـر الـحـقـيـقـي', placeholder: 'الـعـمـر الـحـقـيـقـي', style: 1, required: true, minLength: 1, maxLength: 2 }),
 new TextInputBuilder({ customId: 'Submissions-Authority-Experience', label: 'خـبـراتـك', placeholder: 'خـبـراتـك', style: 2, required: true, minLength: 1, maxLength: 100 }),
 new TextInputBuilder({ customId: 'Submissions-Authority-Reason', label: 'سـبـب الـتـقـديـم', placeholder: 'سـبـب الـتـقـديـم', style: 2, required: true, minLength: 1, maxLength: 100 })
 ]
 const ActionRow = TextInputs.map(Input => new ActionRowBuilder().addComponents(Input))
 const Modal = new ModalBuilder({ customId: 'Submissions-Authority', title: 'تقديم الهيئة', components: ActionRow })
 await Message.showModal(Modal)
 } break;
 case 'Media': {
 const TextInputs = [
 new TextInputBuilder({ customId: 'Submissions-Media-FullName', label: 'الاسـم الـثـلاثـي', placeholder: 'الاسـم الـثـلاثـي', style: 1, required: true, minLength: 3, maxLength: 30 }),
 new TextInputBuilder({ customId: 'Submissions-Media-Age', label: 'الـعـمـر الـحـقـيـقـي', placeholder: 'الـعـمـر الـحـقـيـقـي', style: 1, required: true, minLength: 1, maxLength: 2 }),
 new TextInputBuilder({ customId: 'Submissions-Media-Experience', label: 'خـبـراتـك', placeholder: 'خـبـراتـك', style: 2, required: true, minLength: 1, maxLength: 100 }),
 new TextInputBuilder({ customId: 'Submissions-Media-Reason', label: 'سـبـب الـتـقـديـم', placeholder: 'سـبـب الـتـقـديـم', style: 2, required: true, minLength: 1, maxLength: 100 })
 ]
 const ActionRow = TextInputs.map(Input => new ActionRowBuilder().addComponents(Input))
 const Modal = new ModalBuilder({ customId: 'Submissions-Media', title: 'تقديم للإعلام', components: ActionRow })
 await Message.showModal(Modal)
 } break;
 case 'Resignation': {
 const TextInputs = [
 new TextInputBuilder({ customId: 'Submissions-Resignation-Name', label: 'اسـمـك ؟', placeholder: 'اسـمـك ؟', style: 1, required: true, minLength: 1, maxLength: 30 }),
 new TextInputBuilder({ customId: 'Submissions-Resignation-Age', label: 'عـمـرك ؟', placeholder: 'عـمـرك ؟', style: 1, required: true, minLength: 1, maxLength: 2 }),
 new TextInputBuilder({ customId: 'Submissions-Resignation-Job', label: 'وظـيـفـتـك ؟', placeholder: 'وظـيـفـتـك ؟', style: 1, required: true, minLength: 1, maxLength: 30 }),
 new TextInputBuilder({ customId: 'Submissions-Resignation-Reason', label: 'سـبـب الاسـتـقـالـة ؟', placeholder: 'سـبـب الاسـتـقـالـة ؟', style: 2, required: true, minLength: 1, maxLength: 100 }),
 new TextInputBuilder({ customId: 'Submissions-Resignation-Duration', label: 'مـدة خـدمـتـك الـوظـيـفـيـة ؟', placeholder: 'مـدة خـدمـتـك الـوظـيـفـيـة ؟', style: 1, required: true, minLength: 1, maxLength: 30 })
 ]
 const ActionRow = TextInputs.map(Input => new ActionRowBuilder().addComponents(Input))
 const Modal = new ModalBuilder({ customId: 'Submissions-Resignation', title: 'تقديم إسـتـقـالـة', components: ActionRow })
 await Message.showModal(Modal)
 } break;
 }
 } break;
 case 'Submissions-Internal': {
 const FullName = Message.fields.getTextInputValue('Submissions-Internal-FullName')
 const Age = Message.fields.getTextInputValue('Submissions-Internal-Age')
 const Experience = Message.fields.getTextInputValue('Submissions-Internal-Experience')
 const Sector = Message.fields.getTextInputValue('Submissions-Internal-Sector')
 const Reason = Message.fields.getTextInputValue('Submissions-Internal-Reason')
 const Channel = Client.channels.cache.get(Submissions.Internal.Channel)
 const Embed = new EmbedBuilder()
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setThumbnail(`https://i.postimg.cc/CMmXPrt2/ea002bb91c4e5c3d.webp`)
 Embed.setImage(`https://i.postimg.cc/QC4zFV1D/image.webp`)
 Embed.setDescription(`— 𝗪𝗼𝗹𝗳 𝗖𝗶𝘁𝘆 𝗩𝗿𝗣 || 100𝗞**
اسـتـبـيـان تـقـديـم الـعـسـكـريـة

𝟭 –الاسـم الـثلاثـي : ${FullName} 

𝟮 – الـعـمـر الـحـقـيـقـي : ${Age}

𝟯 – خـبـراتـك : ${Experience}

𝟰 – الـقـطاع الـمـقـدم عـلـيـه : ${Sector}

 𝟱 – سـبـب الـتـقـديـم : ${Reason}

الـقـطاعـات الـمـتـاحـة .

– 
– 

انـتـظـر الـرد مـن قـبـل

 – **`)
 const Buttons = [
 new ButtonBuilder({ customId: 'Submissions-Internal-Accept', label: 'قبول', style: 3 }),
 new ButtonBuilder({ customId: 'Submissions-Internal-Reject', label: 'رفض', style: 4 })
 ]
 const MessageID = await Channel.send({ embeds: [Embed], content: `${Message.user}`, components: [{ type: 1, components: Buttons }] })
 await Message.reply({ content: `**- تم ارسال التقديم بنجاح**`, flags: 64 })
 Database.set(`Submissions-Internal-${MessageID.id}`, { Member: Message.user.id, FullName: FullName, Age: Age, Experience: Experience, Sector: Sector, Reason: Reason })
 } break;
 case 'Submissions-Gangs': {
 const FullName = Message.fields.getTextInputValue('Submissions-Gangs-FullName')
 const Age = Message.fields.getTextInputValue('Submissions-Gangs-Age')
 const Experience = Message.fields.getTextInputValue('Submissions-Gangs-Experience')
 const Sector = Message.fields.getTextInputValue('Submissions-Gangs-Sector')
 const Reason = Message.fields.getTextInputValue('Submissions-Gangs-Reason')
 const Channel = Client.channels.cache.get(Submissions.Gangs.Channel)
 const Embed = new EmbedBuilder()
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setImage(`https://i.postimg.cc/CMPrHBnT/phonto.webp`)
 Embed.setDescription(`— 𝗪𝗼𝗹𝗳 𝗖𝗶𝘁𝘆 𝗩𝗿𝗣 || 100𝗞**
 اسـتـبـيـان تـقـديـم عـصـابـة

𝟭 –الاسـم الـثلاثـي : ${FullName}

𝟮 – الـعـمـر الـحـقـيـقـي : ${Age}

𝟯 – خـبـراتـك : ${Experience}

𝟰 – الـعـصـابـة الـمـقـدم عـلـيـه : ${Sector}

 𝟱 – سـبـب الـتـقـديـم : ${Reason}

الـعـصـابـات الـمـتـاحـة .

– 
- 
- 
انـتـظـر الـرد مـن قـبـل

 – **`)
 const Buttons = [
 new ButtonBuilder({ customId: 'Submissions-Gangs-Accept', label: 'قبول', style: 3 }),
 new ButtonBuilder({ customId: 'Submissions-Gangs-Reject', label: 'رفض', style: 4 })
 ]
 const MessageID = await Channel.send({ embeds: [Embed], content: `${Message.user}`, components: [{ type: 1, components: Buttons }] })
 await Message.reply({ content: `**- تم ارسال التقديم بنجاح**`, flags: 64 })
 Database.set(`Submissions-Gangs-${MessageID.id}`, { Member: Message.user.id, FullName: FullName, Age: Age, Experience: Experience, Sector: Sector, Reason: Reason })
 } break;
 case 'Submissions-Media': {
 const FullName = Message.fields.getTextInputValue('Submissions-Media-FullName')
 const Age = Message.fields.getTextInputValue('Submissions-Media-Age')
 const Experience = Message.fields.getTextInputValue('Submissions-Media-Experience')
 const Reason = Message.fields.getTextInputValue('Submissions-Media-Reason')
 const Channel = Client.channels.cache.get(Submissions.Media.Channel)
 const Embed = new EmbedBuilder()
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setThumbnail(`https://i.postimg.cc/1zy3YVh8/3-A212-E93-BE2-E-4-F10-A2-F8-E5-DBEF14-BA04.webpp`)
 Embed.setDescription(`— 𝗪𝗼𝗹𝗳 𝗖𝗶𝘁𝘆 𝗩𝗿𝗣 || 100𝗞**
اسـتـبـيـان تـقـديـم الاعـلام

𝟭 –الاسـم الـثلاثـي : ${FullName}

𝟮 – الـعـمـر الـحـقـيـقـي : ${Age}

𝟯 – خـبـراتـك : ${Experience}

 𝟰 – سـبـب الـتـقـديـم : ${Reason}

انـتـظـر الـرد مـن قـبـل

– 
 – 
**`)
 const Buttons = [
 new ButtonBuilder({ customId: 'Submissions-Media-Accept', label: 'قبول', style: 3 }),
 new ButtonBuilder({ customId: 'Submissions-Media-Reject', label: 'رفض', style: 4 })
 ]
 const MessageID = await Channel.send({ embeds: [Embed], content: `${Message.user}`, components: [{ type: 1, components: Buttons }] })
 await Message.reply({ content: `**- تم ارسال التقديم بنجاح**`, flags: 64 })
 Database.set(`Submissions-Media-${MessageID.id}`, { Member: Message.user.id, FullName: FullName, Age: Age, Experience: Experience, Reason: Reason })
 } break;
 case 'Submissions-Justice': {
 const FullName = Message.fields.getTextInputValue('Submissions-Justice-FullName')
 const Age = Message.fields.getTextInputValue('Submissions-Justice-Age')
 const Experience = Message.fields.getTextInputValue('Submissions-Justice-Experience')
 const Reason = Message.fields.getTextInputValue('Submissions-Justice-Reason')
 const Sector = Message.fields.getTextInputValue('Submissions-Justice-Sector')
 const Channel = Client.channels.cache.get(Submissions.Justice.Channel)
 const Embed = new EmbedBuilder()
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setThumbnail(`https://i.postimg.cc/s2sJRsG4/Magic-Eraser-230225-145733.webp`)
 Embed.setImage(`https://i.postimg.cc/x1KP7c8d/M7kma.webp`)
 Embed.setDescription(`**__– CIA COMMUNITY VRP || 70𝗸 .
– اسـتـبـيـان تـقـديـم العدل .

1 – الاسـم الـثـلاثـي : ${FullName}

2 – الـعـمـر الـحـقـيـقـي : ${Age}

3 – خـبـراتـك : ${Experience}

4 – التخصص الـمـقـدم عـلـيـه : ${Sector}

5 – سـبـب الـتـقـديـم : ${Reason}

– التخصصات الـمـتـاحـة .

 
 

– انـتـظـر الـرد مـن__**

<@&${Submissions.Justice.Permission[0]}> 
<@&${Submissions.Justice.Permission[1]}>`)
 const Buttons = [
 new ButtonBuilder({ customId: 'Submissions-Justice-Accept', label: 'قبول', style: 3 }),
 new ButtonBuilder({ customId: 'Submissions-Justice-Reject', label: 'رفض', style: 4 })
 ]
 const MessageID = await Channel.send({ embeds: [Embed], content: `${Message.user}`, components: [{ type: 1, components: Buttons }] })
 await Message.reply({ content: `**- تم ارسال التقديم بنجاح**`, flags: 64 })
 Database.set(`Submissions-Justice-${MessageID.id}`, { Member: Message.user.id, FullName: FullName, Age: Age, Experience: Experience, Sector: Sector, Reason: Reason })
 } break;
 case 'Submissions-Consultation': {
 const FullName = Message.fields.getTextInputValue('Submissions-Consultation-FullName')
 const Age = Message.fields.getTextInputValue('Submissions-Consultation-Age')
 const Experience = Message.fields.getTextInputValue('Submissions-Consultation-Experience')
 const Reason = Message.fields.getTextInputValue('Submissions-Consultation-Reason')
 const Channel = Client.channels.cache.get(Submissions.Consultation.Channel)
 const Embed = new EmbedBuilder()
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setThumbnail(`https://i.postimg.cc/MpcCj09F/d6934210ecc0c952.webp`)
 Embed.setImage(`https://i.postimg.cc/XYTTKZh7/cfbdb0f3833180e1.webp`)
 Embed.setDescription(`**__– CIA COMMUNITY VRP || 70𝗸 .
– اسـتـبـيـان تـقـديـم الـبـرلـمـان .

1 – الاسـم الـثـلاثـي : ${FullName}

2 – الـعـمـر الـحـقـيـقـي : ${Age}

3 – خـبـراتـك : ${Experience}

4 – سـبـب الـتـقـديـم : ${Reason}


– انـتـظـر الـرد مـن__**

<@&${Submissions.Consultation.Permission[0]}> 
<@&${Submissions.Consultation.Permission[1]}>`)
 const Buttons = [
 new ButtonBuilder({ customId: 'Submissions-Consultation-Accept', label: 'قبول', style: 3 }),
 new ButtonBuilder({ customId: 'Submissions-Consultation-Reject', label: 'رفض', style: 4 })
 ]
 const MessageID = await Channel.send({ embeds: [Embed], content: `${Message.user}`, components: [{ type: 1, components: Buttons }] })
 await Message.reply({ content: `**- تم ارسال التقديم بنجاح**`, flags: 64 })
 Database.set(`Submissions-Consultation-${MessageID.id}`, { Member: Message.user.id, FullName: FullName, Age: Age, Experience: Experience, Reason: Reason })
 } break;
 case 'Submissions-Authority': {
 const FullName = Message.fields.getTextInputValue('Submissions-Authority-FullName')
 const Age = Message.fields.getTextInputValue('Submissions-Authority-Age')
 const Experience = Message.fields.getTextInputValue('Submissions-Authority-Experience')
 const Reason = Message.fields.getTextInputValue('Submissions-Authority-Reason')
 const Channel = Client.channels.cache.get(Submissions.Authority.Channel)
 const Embed = new EmbedBuilder()
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setThumbnail(`https://i.postimg.cc/02SGMbpC/logo-o.webp`)
 Embed.setImage(`https://i.postimg.cc/44qbxzhd/phonto.webp`)
 Embed.setDescription(`— 𝗪𝗼𝗹𝗳 𝗖𝗶𝘁𝘆 𝗩𝗿𝗣 || 100𝗞**
— اسـتـبـيـان تـقـديـم الهيئة

𝟭 –الاسـم الـثلاثـي : ${FullName}

𝟮 – الـعـمـر الـحـقـيـقـي : ${Age} 

𝟯 – خـبـراتـك : ${Experience}

 𝟰 – سـبـب الـتـقـديـم : ${Reason}

انـتـظـر الـرد مـن قـبـل

– 
 – 
**`)
 const Buttons = [
 new ButtonBuilder({ customId: 'Submissions-Authority-Accept', label: 'قبول', style: 3 }),
 new ButtonBuilder({ customId: 'Submissions-Authority-Reject', label: 'رفض', style: 4 })
 ]
 const MessageID = await Channel.send({ embeds: [Embed], content: `${Message.user}`, components: [{ type: 1, components: Buttons }] })
 await Message.reply({ content: `**- تم ارسال التقديم بنجاح**`, flags: 64 })
 Database.set(`Submissions-Authority-${MessageID.id}`, { Member: Message.user.id, FullName: FullName, Age: Age, Experience: Experience, Reason: Reason })
 } break;
 case 'Submissions-Resignation': {
 const Name = Message.fields.getTextInputValue('Submissions-Resignation-Name')
 const Age = Message.fields.getTextInputValue('Submissions-Resignation-Age')
 const Job = Message.fields.getTextInputValue('Submissions-Resignation-Job')
 const Reason = Message.fields.getTextInputValue('Submissions-Resignation-Reason')
 const Duration = Message.fields.getTextInputValue('Submissions-Resignation-Duration')
 const Channel = Client.channels.cache.get(Submissions.Resignation.Channel)
 const Embed = new EmbedBuilder()
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setDescription(`— 𝗪𝗼𝗹𝗳 𝗖𝗶𝘁𝘆 𝗩𝗿𝗣 || 100𝗞**
اسـتـبـيـان تـقـديـم اسـتـقـالـة

𝟭 – الاسـم الـثلاثـي : ${Name}

𝟮 – الـعـمـر الـحـقـيـقـي : ${Age}

𝟯 – وظـيـفـتـك : ${Job}

𝟰 – سـبـب الاسـتـقـالـة : ${Reason}

 𝟱 – مـدة خـدمـتـك بالـوـظـيـقـة : ${Duration}

مـلاحـظـة مـهـمـة 

𝟭 – يـجـب اكـمـال يـومـيـن عـلـى الاقـل لـقـبـولـك
 

𝟮 –عـلـى الـطاقـم الاداري الٰتأكـيـد مـن اكـمـال المـدة الـمـحـدة


𝟮 — انـتـظـر الرد مـن
 **
انـتـظـر الـرد مـن قـبـل`)
 const Buttons = [
 new ButtonBuilder({ customId: 'Submissions-Resignation-Accept', label: 'قبول', style: 3 })
 ]
 const MessageID = await Channel.send({ embeds: [Embed], content: `${Message.user}`, components: [{ type: 1, components: Buttons }] })
 await Message.reply({ content: `**- تم ارسال التقديم بنجاح**`, flags: 64 })
 Database.set(`Submissions-Resignation-${MessageID.id}`, { Member: Message.user.id, FullName: Name, Age: Age, Job: Job, Reason: Reason, Duration: Duration })
 } break;
 case 'Submissions-Resignation-Accept': {
 const Data = Database.get(`Submissions-Resignation-${Message.message.id}`)
 if (!Data) return Message.reply({ content: `**عذرا لا يوجد بيانات في وقت الحالي**`, flags: 64 })
 const Member = Message.guild.members.cache.get(Data.Member)
 const Moderator = Message.guild.members.cache.get(Message.user.id)
 if (!Moderator.roles.cache.some(Role => Submissions.Resignation.Permission.includes(Role.id))) return await Message.reply({ content: `**- ليس لديك الصلاحية لقبول التقديم**`, flags: 64 })
 const Channel = Client.channels.cache.get(Submissions.Resignation.ChannelAccept)
 const Content = `**__– عـزيـزي المواطن ${Member} . 

– تشعرك لجنة الاستقالات ب♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜ قـبـولـك استقالتك يـرجـى مـنـك الـتـوجـة إلـى <#1426160552136409169>
لسحب رتبك
مسؤول القبول : ${Moderator}
( وشـكـرآ لـك )__**`
 await Member.send({ content: Content })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] })
 await Channel.send({ content: Content })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Submissions-Resignation-${Message.message.id}`)
 } break;
 // ! Buttons
 case 'Submissions-Internal-Accept': {
 const Data = Database.get(`Submissions-Internal-${Message.message.id}`)
 if (!Data) return Message.reply({ content: `**عذرا لا يوجد بيانات في وقت الحالي**`, flags: 64 })
 const Member = Message.guild.members.cache.get(Data.Member)
 const Moderator = Message.guild.members.cache.get(Message.user.id)
 if (!Moderator.roles.cache.some(Role => Submissions.Internal.Permission.includes(Role.id))) return await Message.reply({ content: `**- ليس لديك الصلاحية لقبول التقديم**`, flags: 64 })
 const Channel = Client.channels.cache.get(Submissions.Internal.ChannelAccept)
 const Content = `**__– عـزيـزي المـتـقـدم ${Member} .

– تـبـارك لـك لـجـنـة الـقـبـول والـتـجـنـيـد فـي وزارة الـداخـلـيـة قـبـولـك فـي ${Data.Sector} يـرجـى مـنـك الـتـوجـة إلـى <#1426160552136409169>
لإسـتـلام رتـبـك الـعـسـكـريـة ويـرجـى مـراجـعـة الـشـاتـات العـسـكـريـة .
مسؤول القبول ${Moderator}
( وشـكـرآ لـك )__**`
 await Member.send({ content: Content }).catch(() => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Channel.send({ content: Content })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Submissions-Internal-${Message.message.id}`)
 } break;
 case 'Submissions-Gangs-Accept': {
 const Data = Database.get(`Submissions-Gangs-${Message.message.id}`)
 if (!Data) return Message.reply({ content: `**عذرا لا يوجد بيانات في وقت الحالي**`, flags: 64 })
 const Member = Message.guild.members.cache.get(Data.Member)
 const Moderator = Message.guild.members.cache.get(Message.user.id)
 if (!Moderator.roles.cache.some(Role => Submissions.Gangs.Permission.includes(Role.id))) return await Message.reply({ content: `**- ليس لديك الصلاحية لقبول التقديم**`, flags: 64 })
 const Channel = Client.channels.cache.get(Submissions.Gangs.ChannelAccept)
 const Content = `**__ عـزيـزي الـعـضـو ${Member} تـم قـبـولـك فـي 
عصابة ( ${Data.Sector} ) نـتـمـنـا ان تـتـوجه الـى https://discord.com/channels/1207729376960188447/1426160552136409169 لـ اخـذ الـرتـبـة 
مسؤول القبول ${Moderator}
__**`;
 await Member.send({ content: Content }).catch(() => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Channel.send({ content: Content })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Submissions-Gangs-${Message.message.id}`)
 } break;
 case 'Submissions-Media-Accept': {
 const Data = Database.get(`Submissions-Media-${Message.message.id}`)
 if (!Data) return Message.reply({ content: `**عذرا لا يوجد بيانات في وقت الحالي**`, flags: 64 })
 const Member = Message.guild.members.cache.get(Data.Member)
 const Moderator = Message.guild.members.cache.get(Message.user.id)
 if (!Moderator.roles.cache.some(Role => Submissions.Media.Permission.includes(Role.id))) return await Message.reply({ content: `**- ليس لديك الصلاحية لقبول التقديم**`, flags: 64 })
 const Channel = Client.channels.cache.get(Submissions.Media.ChannelAccept)
 const Content = `**__– عـزيـزي المـتـقـدم ${Member} .

– تشعرك لجنة القبول وزارة الإعلام قـبـولـك گ إعلامي يـرجـى مـنـك الـتـوجـة إلـى https://discord.com/channels/1207729376960188447/1426160552136409169
لاستلام رتبك
مسؤول القبول ${Moderator}
( وشـكـرآ لـك )__**`;
 await Member.send({ content: Content }).catch(() => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Channel.send({ content: Content })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Submissions-Media-${Message.message.id}`)
 } break;
 case 'Submissions-Justice-Accept': {
 const Data = Database.get(`Submissions-Justice-${Message.message.id}`)
 if (!Data) return Message.reply({ content: `**عذرا لا يوجد بيانات في وقت الحالي**`, flags: 64 })
 const Member = Message.guild.members.cache.get(Data.Member)
 const Moderator = Message.guild.members.cache.get(Message.user.id)
 if (!Moderator.roles.cache.some(Role => Submissions.Justice.Permission.includes(Role.id))) return await Message.reply({ content: `**- ليس لديك الصلاحية لقبول التقديم**`, flags: 64 })
 const Channel = Client.channels.cache.get(Submissions.Justice.ChannelAccept)
 const Content = `**__– عـزيـزي المـتـقـدم{${Member}} .

– الإدارة الـعـامـة للـقـبـول ب . وزارة العدل تـبـارك لـك شـرف الإنـضـمـام لـكـادر وزارة العدل 
 يـرجـى مـنـك عـزيـزي الـمتـقـدم الـتـوجـة إلـى https://discord.com/channels/1207729376960188447/1426160552136409169 لاســتـلام رتـبــة
{${Data.Sector}}
مـع كـامل تـحيـات /~~ 
الادارة العامة للقبول ب وزارة العدل ~~
مسؤول القبول ${Moderator}
( مـتـمـنـيـن لـك الـتـوفـيـق )__**`
 await Member.send({ content: Content }).catch(() => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Channel.send({ content: Content }).catch(() => { })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Submissions-Justice-${Message.message.id}`)
 } break;
 case 'Submissions-Consultation-Accept': {
 const Data = Database.get(`Submissions-Consultation-${Message.message.id}`)
 if (!Data) return Message.reply({ content: `**عذرا لا يوجد بيانات في وقت الحالي**`, flags: 64 })
 const Member = Message.guild.members.cache.get(Data.Member)
 const Moderator = Message.guild.members.cache.get(Message.user.id)
 if (!Moderator.roles.cache.some(Role => Submissions.Consultation.Permission.includes(Role.id))) return await Message.reply({ content: `**- ليس لديك الصلاحية لقبول التقديم**`, flags: 64 })
 const Channel = Client.channels.cache.get(Submissions.Consultation.ChannelAccept)
 const Content = `__**

عـزيـزي الـمُـتـقـدم{${Member}},

- تُـبـارك لـك رئـاسـة مـجـلـس الـشـورى أن تـم قـبـولـك گ ( عـضـو فـي مـجـلـس الـشـورى ) يـنـبـغـي عـلـيـك زيـارة رئـيـس مـجـلـس الـشـورى او نائب مجلس الـبـرلـمـان لإكـمـال بـعـض الإجـراءات 

مسؤول القبول ${Moderator}

~~مع تحيات رئاسة مجلس الـبـرلـمـان~~ .**__`;
 await Member.send({ content: Content }).catch(() => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Channel.send({ content: Content })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Submissions-Consultation-${Message.message.id}`)
 } break;
 case 'Submissions-Authority-Accept': {
 const Data = Database.get(`Submissions-Authority-${Message.message.id}`)
 if (!Data) return Message.reply({ content: `**عذرا لا يوجد بيانات في وقت الحالي**`, flags: 64 })
 const Member = Message.guild.members.cache.get(Data.Member)
 const Moderator = Message.guild.members.cache.get(Message.user.id)
 if (!Moderator.roles.cache.some(Role => Submissions.Authority.Permission.includes(Role.id))) return await Message.reply({ content: `**- ليس لديك الصلاحية لقبول التقديم**`, flags: 64 })
 const Channel = Client.channels.cache.get(Submissions.Authority.ChannelAccept)
 const Content = `__**

عـزيـزي الـمُـتـقـدم{${Member}},

- تُـبـارك لـك رئاسة هيئة مكافحة الفساد أن تـم قـبـولـك گ ( عـضـو فـي هيئة مكافحة الفساد ) يـنـبـغـي عـلـيـك زيـارة رئـيـس الهيئة او نائب الهيئة لإكـمـال بـعـض الإجـراءات 

مسؤول القبول ${Moderator}

~~مع تحيات رئاسة هيئة مكافحة الفساد ~~ .**__`
 await Member.send({ content: Content }).catch(() => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Channel.send({ content: Content })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Submissions-Authority-${Message.message.id}`)
 } break;
 // ! Reject
 case 'Submissions-Internal-Reject': {
 const Moderator = Message.guild.members.cache.get(Message.user.id)
 if (!Moderator.roles.cache.some(Role => Submissions.Internal.Permission.includes(Role.id))) return await Message.reply({ content: `**- ليس لديك الصلاحية لرفض التقديم**`, flags: 64 })
 const TextInput = new TextInputBuilder({ customId: 'Submissions-Internal-Reject-Reason', label: 'سبب الرفض', style: 2, required: true, maxLength: 1000, minLength: 10, placeholder: 'سبب الرفض' })
 const Modal = new ModalBuilder({ customId: 'Submissions-Internal-Reject-Modal', title: 'رفض تقديم الداخلية', components: [{ type: 1, components: [TextInput] }] })
 await Message.showModal(Modal)
 } break;
 case 'Submissions-Internal-Reject-Modal': {
 const TextInput = Message.fields.getTextInputValue('Submissions-Internal-Reject-Reason')
 const Data = Database.get(`Submissions-Internal-${Message.message.id}`)
 if (!Data) return Message.reply({ content: `**عذرا لا يوجد بيانات في وقت الحالي**`, flags: 64 })
 const Member = Message.guild.members.cache.get(Data.Member)
 const Channel = Client.channels.cache.get(Submissions.Internal.ChannelReject)
 const Content = `**__– عـزيـزي المـتـقـدم {${Member}} .

– تشعرك لـجـنـة الـقـبـول والـتـجـنـيـد فـي وزارة الـداخـلـيـة رفضك فـي {${Data.Sector}}

السبب: ${TextInput}

مسؤول الرفض ${Message.user}

( وشـكـرآ لـك )__**`
 await Member.send({ content: Content }).catch(() => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Channel.send({ content: Content }).catch(() => { })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Submissions-Internal-${Message.message.id}`)
 } break;
 // ! End;
 case 'Submissions-Gangs-Reject': {
 const Moderator = Message.guild.members.cache.get(Message.user.id)
 if (!Moderator.roles.cache.some(Role => Submissions.Gangs.Permission.includes(Role.id))) return await Message.reply({ content: `**- ليس لديك الصلاحية لرفض التقديم**`, flags: 64 })
 const TextInput = new TextInputBuilder({ customId: 'Submissions-Gangs-Reject-Reason', label: 'سبب الرفض', style: 2, required: true, maxLength: 1000, minLength: 10, placeholder: 'سبب الرفض' })
 const Modal = new ModalBuilder({ customId: 'Submissions-Gangs-Reject-Modal', title: 'رفض تقديم العصابات', components: [{ type: 1, components: [TextInput] }] })
 await Message.showModal(Modal)
 } break;
 case 'Submissions-Gangs-Reject-Modal': {
 const TextInput = Message.fields.getTextInputValue('Submissions-Gangs-Reject-Reason')
 const Data = Database.get(`Submissions-Gangs-${Message.message.id}`)
 if (!Data) return Message.reply({ content: `**عذرا لا يوجد بيانات في وقت الحالي**`, flags: 64 })
 const Member = Message.guild.members.cache.get(Data.Member)
 const Channel = Client.channels.cache.get(Submissions.Gangs.ChannelReject)
 const Content = `**__– عـزيـزي الـعـضـو {${Member}}
 
– تـم رفضك فـي 
عصابة ( ${Data.Sector} ) 

السبب : ${TextInput}

مسؤول الرفض ${Message.user}

__**`
 await Member.send({ content: Content }).catch(() => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Channel.send({ content: Content })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Submissions-Gangs-${Message.message.id}`)
 } break;
 case 'Submissions-Media-Reject': {
 const Moderator = Message.guild.members.cache.get(Message.user.id)
 if (!Moderator.roles.cache.some(Role => Submissions.Media.Permission.includes(Role.id))) return await Message.reply({ content: `**- ليس لديك الصلاحية لرفض التقديم**`, flags: 64 })
 const TextInput = new TextInputBuilder({ customId: 'Submissions-Media-Reject-Reason', label: 'سبب الرفض', style: 2, required: true, maxLength: 1000, minLength: 10, placeholder: 'سبب الرفض' })
 const Modal = new ModalBuilder({ customId: 'Submissions-Media-Reject-Modal', title: 'رفض تقديم الإعلام', components: [{ type: 1, components: [TextInput] }] })
 await Message.showModal(Modal)
 } break;
 case 'Submissions-Media-Reject-Modal': {
 const TextInput = Message.fields.getTextInputValue('Submissions-Media-Reject-Reason')
 const Data = Database.get(`Submissions-Media-${Message.message.id}`)
 if (!Data) return Message.reply({ content: `**عذرا لا يوجد بيانات في وقت الحالي**`, flags: 64 })
 const Member = Message.guild.members.cache.get(Data.Member)
 const Channel = Client.channels.cache.get(Submissions.Media.ChannelReject)
 const Content = `**__– عـزيـزي المـتـقـدم {${Member}} .

– تشعرك لجنة القبول بـ وزارة الإعلام رفضك كـ إعلامي

السبب: ${TextInput}

مسؤول الرفض ${Message.user}

( وشـكـرآ لـك )__**`
 await Member.send({ content: Content }).catch(() => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Channel.send({ content: Content })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Submissions-Media-${Message.message.id}`)
 } break;
 case 'Submissions-Justice-Reject': {
 const Moderator = Message.guild.members.cache.get(Message.user.id)
 if (!Moderator.roles.cache.some(Role => Submissions.Justice.Permission.includes(Role.id))) return await Message.reply({ content: `**- ليس لديك الصلاحية لرفض التقديم**`, flags: 64 })
 const TextInput = new TextInputBuilder({ customId: 'Submissions-Justice-Reject-Reason', label: 'سبب الرفض', style: 2, required: true, maxLength: 1000, minLength: 10, placeholder: 'سبب الرفض' })
 const Modal = new ModalBuilder({ customId: 'Submissions-Justice-Reject-Modal', title: 'رفض تقديم العدل', components: [{ type: 1, components: [TextInput] }] })
 await Message.showModal(Modal)
 } break;
 case 'Submissions-Justice-Reject-Modal': {
 const TextInput = Message.fields.getTextInputValue('Submissions-Justice-Reject-Reason')
 const Data = Database.get(`Submissions-Justice-${Message.message.id}`)
 if (!Data) return Message.reply({ content: `**عذرا لا يوجد بيانات في وقت الحالي**`, flags: 64 })
 const Member = Message.guild.members.cache.get(Data.Member)
 const Channel = Client.channels.cache.get(Submissions.Justice.ChannelReject)
 const Content = `**__– عـزيـزي المـتـقـدم {${Member}} .

– الإدارة الـعـامـة للـقـبـول ب . وزارة العدل تشعرك بانه قد تم رفضك 

السبب : ${TextInput}

مـع كـامل تـحيـات /~~ 
الادارة العامة للقبول ب وزارة العدل ~~
مسؤول الرفض ${Message.user}
( مـتـمـنـيـن لـك الـتـوفـيـق )__**`
 await Member.send({ content: Content }).catch(() => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Channel.send({ content: Content })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Submissions-Justice-${Message.message.id}`)
 } break;
 case 'Submissions-Consultation-Reject': {
 const Moderator = Message.guild.members.cache.get(Message.user.id)
 if (!Moderator.roles.cache.some(Role => Submissions.Consultation.Permission.includes(Role.id))) return await Message.reply({ content: `**- ليس لديك الصلاحية لرفض التقديم**`, flags: 64 })
 const TextInput = new TextInputBuilder({ customId: 'Submissions-Consultation-Reject-Reason', label: 'سبب الرفض', style: 2, required: true, maxLength: 1000, minLength: 10, placeholder: 'سبب الرفض' })
 const Modal = new ModalBuilder({ customId: 'Submissions-Consultation-Reject-Modal', title: 'رفض تقديم الـبـرلـمـان', components: [{ type: 1, components: [TextInput] }] })
 await Message.showModal(Modal)
 } break;
 case 'Submissions-Consultation-Reject-Modal': {
 const TextInput = Message.fields.getTextInputValue('Submissions-Consultation-Reject-Reason')
 const Data = Database.get(`Submissions-Consultation-${Message.message.id}`)
 if (!Data) return Message.reply({ content: `**عذرا لا يوجد بيانات في وقت الحالي**`, flags: 64 })
 const Member = Message.guild.members.cache.get(Data.Member)
 const Channel = Client.channels.cache.get(Submissions.Consultation.ChannelReject)
 const Content = `__**

عـزيـزي الـمُـتـقـدم{${Member}},

- تشعرك 
 رئـاسـة مـجـلـس الـشـورى أن تـم رفضك گ ( عـضـو فـي مـجـلـس الـشـورى ) 

السبب : ${TextInput}

مسؤول الرفض ${Message.user}

~~مع تحيات رئاسة مجلس الـبـرلـمـان~~ .**__`
 await Member.send({ content: Content }).catch(() => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Channel.send({ content: Content })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Submissions-Consultation-${Message.message.id}`)
 } break;
 case 'Submissions-Authority-Reject': {
 const Moderator = Message.guild.members.cache.get(Message.user.id)
 if (!Moderator.roles.cache.some(Role => Submissions.Authority.Permission.includes(Role.id))) return await Message.reply({ content: `**- ليس لديك الصلاحية لرفض التقديم**`, flags: 64 })
 const TextInput = new TextInputBuilder({ customId: 'Submissions-Authority-Reject-Reason', label: 'سبب الرفض', style: 2, required: true, maxLength: 1000, minLength: 10, placeholder: 'سبب الرفض' })
 const Modal = new ModalBuilder({ customId: 'Submissions-Authority-Reject-Modal', title: 'رفض تقديم الهيئة', components: [{ type: 1, components: [TextInput] }] })
 await Message.showModal(Modal)
 } break;
 case 'Submissions-Authority-Reject-Modal': {
 const TextInput = Message.fields.getTextInputValue('Submissions-Authority-Reject-Reason')
 const Data = Database.get(`Submissions-Authority-${Message.message.id}`)
 if (!Data) return Message.reply({ content: `**عذرا لا يوجد بيانات في وقت الحالي**`, flags: 64 })
 const Member = Message.guild.members.cache.get(Data.Member)
 const Channel = Client.channels.cache.get(Submissions.Authority.ChannelReject)
 const Content = `__**

عـزيـزي الـمُـتـقـدم{${Member}},

- تشعرك رئاسة هيئة مكافحة الفساد أن تـم رفضك گ ( عـضـو فـي هيئة مكافحة الفساد )

السبب : ${TextInput}

مسؤول الرفض ${Message.user}

~~مع تحيات رئاسة هيئة مكافحة الفساد ~~ .**__`
 await Member.send({ content: Content }).catch(() => { })
 await Member.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Channel.send({ content: Content })
 await Channel.send({ files: ['https://i.postimg.cc/4d3c5wf1/image.png'] }).catch(() => { })
 await Message.message.edit({ components: [] }).catch(() => { })
 Database.delete(`Submissions-Authority-${Message.message.id}`)
 } break;
 }
}