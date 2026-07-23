"use strict";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';
import { Reporting } from '../Files〡[Config]/Files〡[Config].js';
import { JsonDatabase } from 'wio.db'
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Police].json' })
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 if (Message.isButton()) {
 switch (Message.customId) {
 case 'Report〡Panel': {
 const TextInputs = [
 new TextInputBuilder({ customId: 'Report〡Panel-Report', label: 'البلاغ', placeholder: 'اكتب البلاغ هنا', style: 2, required: true }),
 new TextInputBuilder({ customId: 'Report〡Panel-Location', label: 'الموقع', placeholder: 'اكتب الموقع هنا', style: 2, required: true })
 ]
 const ActionRows = TextInputs.map(TextInput => new ActionRowBuilder().addComponents(TextInput))
 const Modal = new ModalBuilder({ customId: 'Report〡Panel', title: 'نظام البلاغات في ♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜', components: ActionRows })
 await Message.showModal(Modal)
 } break;
 case 'Report〡Panel-Accept': {
 const Member = Message.guild.members.cache.get(Message.user.id)
 if (!Member.roles.cache.some(Role => Reporting.Role.includes(Role.id))) return Message.reply({ content: `**ليس لديك الصلاحية لاستلام البلاغات**`, flags: 64 });
 Database.add(`Police-Report〡${Message.user.id}`, 1);
 const userIdMatch = Message.message.content.match(/<@(\d+)>/);
 if (!userIdMatch) return Message.reply({ content: `**لم يتم العثور على معرف المستخدم في الرسالة**`, flags: 64 });
 const User = Message.guild.members.cache.get(userIdMatch[1]);
 if (!User) return Message.reply({ content: `**لم يتم العثور على المستخدم في الخادم**`, flags: 64 });
 const Embed = new EmbedBuilder()
 Embed.setDescription(`**__— عزيزي المواطن ${User}

— تم استلام بلاغك من قبل وزارة الداخلية [${Message.user}] في ♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜. نود أن نؤكد انه سيتم التعامل معه بأقصى درجات الجدية والسرعة

— إذا كانت هناك أي مستجدات أو تطورات بشأن البلاغ، سيتم التواصل معك مباشرة. شكراً لتعاونك وحرصك على أمن وسلامة المجتمع.

وزارة الداخلية - ♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜__**`)
 User.send({ embeds: [Embed] }).catch(async () => { });
 Message.reply({
 content: `**__- عزيزي العسكري ${Message.user} لقد تم استلام البلاغ بنجاح

- يرجى مباشرة البلاغ

~~مع تحيات وزارة الداخلية ~~
__**`
 })
 await Message.message.edit({ components: [] }).catch(async () => { });
 } break;
 }
 } else if (Message.isModalSubmit()) {
 switch (Message.customId) {
 case 'Report〡Panel': {
 const 〡Report = Message.fields.getTextInputValue('Report〡Panel-Report')
 const Location = Message.fields.getTextInputValue('Report〡Panel-Location')
 const Channel = Message.guild.channels.cache.get(Reporting.Channel)
 const Button = new ButtonBuilder({ customId: 'Report〡Panel-Accept', label: 'استلام', style: 2 })
 Channel.send({
 content: `**__
صاحب بلاغ : ${Message.user}

البلاغ : ${〡Report}

الموقع:${Location}

لاستلام البلاغ يرجى النقر على {استلام}
__**
{@here}`,
 components: [{ type: 1, components: [Button] }]
 })
 Message.reply({ content: `** تم إرسال البلاغ بنجاح**`, flags: 64 })
 } break;
 }
 }
}