"use strict";
import { ActionRowBuilder, AttachmentBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';
import { PermissionAds } from '../Files〡[Config]/Files〡[Config].js';
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 if (Message.isStringSelectMenu()) {
 switch (Message.customId) {
 case 'Ads-Select': {
 switch (Message.values[0]) {
 case 'Ads-1': {
 const Member = await Message.guild.members.fetch(Message.user.id, { focus: true });
 if (!Member.roles.cache.some(role => PermissionAds.Ads〡1.Role.includes(role.id))) return Message.reply({ content: `**ليس لديك صلاحيات لستخدام هذا الامر**`, flags: 64 });
 const Textinputs = [
 new TextInputBuilder({ customId: 'Custom-Ads〡1', label: 'الــخـبـر صــادر مــن', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡2', label: 'الـخـبـر', style: 2, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡3', label: 'الـمـوقـع', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡4', label: 'مُـوجـه الـخـبـر اِلــى', style: 1, required: true })
 ];
 const ActionRows = Textinputs.map(TextInput => new ActionRowBuilder().addComponents(TextInput));
 const Modal = new ModalBuilder({ customId: 'Ads〡1', title: 'اعلان عصابات', components: ActionRows });
 Message.showModal(Modal);
 } break;
 case 'Ads-2': {
 const Member = await Message.guild.members.fetch(Message.user.id, { focus: true });
 if (!Member.roles.cache.some(role => PermissionAds.Ads〡2.Role.includes(role.id))) return Message.reply({ content: `**ليس لديك صلاحيات لستخدام هذا الامر**`, flags: 64 });
 const Textinputs = [
 new TextInputBuilder({ customId: 'Custom-Ads〡1', label: 'الــخـبـر صــادر مــن', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡2', label: 'الـخـبـر', style: 2, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡3', label: 'الـمـوقـع', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡4', label: 'مُـوجـه الـخـبـر اِلــى', style: 1, required: true })
 ]
 const ActionRows = Textinputs.map(TextInput => new ActionRowBuilder().addComponents(TextInput));
 const Modal = new ModalBuilder({ customId: 'Ads〡2', title: 'اعلان وزارة الداخلية', components: ActionRows })
 Message.showModal(Modal)
 } break;
 case 'Ads-3': {
 const Member = await Message.guild.members.fetch(Message.user.id, { focus: true });
 if (!Member.roles.cache.some(role => PermissionAds.Ads〡3.Role.includes(role.id))) return Message.reply({ content: `**ليس لديك صلاحيات لستخدام هذا الامر**`, flags: 64 });
 const Textinputs = [
 new TextInputBuilder({ customId: 'Custom-Ads〡1', label: 'الــخـبـر صــادر مــن', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡2', label: 'الـخـبـر', style: 2, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡3', label: 'الـمـوقـع', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡4', label: 'مُـوجـه الـخـبـر اِلــى', style: 1, required: true })
 ]
 const ActionRows = Textinputs.map(TextInput => new ActionRowBuilder().addComponents(TextInput));
 const Modal = new ModalBuilder({ customId: 'Ads〡3', title: 'اعلان رئيس الجمهورية', components: ActionRows })
 Message.showModal(Modal)
 } break;
 case 'Ads-4': {
 const Member = await Message.guild.members.fetch(Message.user.id, { focus: true });
 if (!Member.roles.cache.some(role => PermissionAds.Ads〡4.Role.includes(role.id))) return Message.reply({ content: `**ليس لديك صلاحيات لستخدام هذا الامر**`, flags: 64 });
 const Textinputs = [
 new TextInputBuilder({ customId: 'Custom-Ads〡1', label: 'الــخـبـر صــادر مــن', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡2', label: 'الـخـبـر', style: 2, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡3', label: 'الـمـوقـع', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡4', label: 'مُـوجـه الـخـبـر اِلــى', style: 1, required: true })
 ]
 const ActionRows = Textinputs.map(TextInput => new ActionRowBuilder().addComponents(TextInput));
 const Modal = new ModalBuilder({ customId: 'Ads〡4', title: 'اعلان المجلس المحلي', components: ActionRows })
 Message.showModal(Modal)
 } break;
 case 'Ads-5': {
 const Member = await Message.guild.members.fetch(Message.user.id, { focus: true });
 if (!Member.roles.cache.some(role => PermissionAds.Ads〡5.Role.includes(role.id))) return Message.reply({ content: `**ليس لديك صلاحيات لستخدام هذا الامر**`, flags: 64 });
 const Textinputs = [
 new TextInputBuilder({ customId: 'Custom-Ads〡1', label: 'الــخـبـر صــادر مــن', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡2', label: 'الـخـبـر', style: 2, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡3', label: 'الـمـوقـع', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡4', label: 'مُـوجـه الـخـبـر اِلــى', style: 1, required: true })
 ]
 const ActionRows = Textinputs.map(TextInput => new ActionRowBuilder().addComponents(TextInput));
 const Modal = new ModalBuilder({ customId: 'Ads〡5', title: 'اعلان مسؤول العصابات', components: ActionRows })
 Message.showModal(Modal)
 } break;
 case 'Ads-6': {
 const Member = await Message.guild.members.fetch(Message.user.id, { focus: true });
 if (!Member.roles.cache.some(role => PermissionAds.Ads〡6.Role.includes(role.id))) return Message.reply({ content: `**ليس لديك صلاحيات لستخدام هذا الامر**`, flags: 64 });
 const Textinputs = [
 new TextInputBuilder({ customId: 'Custom-Ads〡1', label: 'الــخـبـر صــادر مــن', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡2', label: 'الـخـبـر', style: 2, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡3', label: 'الـمـوقـع', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡4', label: 'مُـوجـه الـخـبـر اِلــى', style: 1, required: true })
 ]
 const ActionRows = Textinputs.map(TextInput => new ActionRowBuilder().addComponents(TextInput));
 const Modal = new ModalBuilder({ customId: 'Ads〡6', title: 'اعلان رجل مجهول', components: ActionRows })
 Message.showModal(Modal)
 } break;
 case 'Ads-7': {
 const Member = await Message.guild.members.fetch(Message.user.id, { focus: true });
 if (!Member.roles.cache.some(role => PermissionAds.Ads〡7.Role.includes(role.id))) return Message.reply({ content: `**ليس لديك صلاحيات لستخدام هذا الامر**`, flags: 64 });
 const Textinputs = [
 new TextInputBuilder({ customId: 'Custom-Ads〡1', label: 'الــخـبـر صــادر مــن', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡2', label: 'الـخـبـر', style: 2, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡3', label: 'الـمـوقـع', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡4', label: 'مُـوجـه الـخـبـر اِلــى', style: 1, required: true })
 ]
 const ActionRows = Textinputs.map(TextInput => new ActionRowBuilder().addComponents(TextInput));
 const Modal = new ModalBuilder({ customId: 'Ads〡7', title: 'اعلان وزارة الاعلام', components: ActionRows })
 Message.showModal(Modal)
 } break;
 case 'Ads-8': {
 const Member = await Message.guild.members.fetch(Message.user.id, { focus: true });
 if (!Member.roles.cache.some(role => PermissionAds.Ads〡8.Role.includes(role.id))) return Message.reply({ content: `**ليس لديك صلاحيات لستخدام هذا الامر**`, flags: 64 });
 const Textinputs = [
 new TextInputBuilder({ customId: 'Custom-Ads〡1', label: 'الــخـبـر صــادر مــن', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡2', label: 'الـخـبـر', style: 2, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡3', label: 'الـمـوقـع', style: 1, required: true }),
 new TextInputBuilder({ customId: 'Custom-Ads〡4', label: 'مُـوجـه الـخـبـر اِلــى', style: 1, required: true })
 ]
 const ActionRows = Textinputs.map(TextInput => new ActionRowBuilder().addComponents(TextInput));
 const Modal = new ModalBuilder({ customId: 'Ads〡8', title: 'اعلان هيئة مكافحة الفساد', components: ActionRows })
 Message.showModal(Modal)
 } break;
 }
 }
 }
 } else if (Message.isModalSubmit()) {
 switch (Message.customId) {
 case 'Ads〡1': {
 const TextInput〡1 = Message.fields.getTextInputValue('Custom-Ads〡1')
 const TextInput〡2 = Message.fields.getTextInputValue('Custom-Ads〡2')
 const TextInput〡3 = Message.fields.getTextInputValue('Custom-Ads〡3')
 const TextInput〡4 = Message.fields.getTextInputValue('Custom-Ads〡4')
 const Channel = Message.guild.channels.cache.get(PermissionAds.Ads〡1.Channel)
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/Ads-1.jpg`, { name: 'Ads-1.jpg' });
 const Content = `**__ — \`\` ﷽ \`\`\n\n— إعـلانـات مـديـنـة قولف ريسبكت\n\n— الــخـبـر صــادر مــن : ${TextInput〡1}\n\n— الـخـبـر : ${TextInput〡2}\n\n— الـمـوقـع : ${TextInput〡3}\n\n— مُـوجـه الـخـبـر اِلــى : ${TextInput〡4}\n— مـسـؤول الـخـبـر : ${Message.user}__**`;
 Channel.send({ content: Content, files: [Attachment] });
 Message.reply({ content: `**تم ارسال اعلان بنجاح**`, flags: 64 })
 } break;
 case 'Ads〡2': {
 const TextInput〡1 = Message.fields.getTextInputValue('Custom-Ads〡1')
 const TextInput〡2 = Message.fields.getTextInputValue('Custom-Ads〡2')
 const TextInput〡3 = Message.fields.getTextInputValue('Custom-Ads〡3')
 const TextInput〡4 = Message.fields.getTextInputValue('Custom-Ads〡4')
 const Channel = Message.guild.channels.cache.get(PermissionAds.Ads〡1.Channel)
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/Ads-2.jpg`, { name: 'Ads-2.jpg' });
 const Content = `**__ — \`\` ﷽ \`\`\n\n— إعـلانـات مـديـنـة قولف ريسبكت\n\n— الــخـبـر صــادر مــن : ${TextInput〡1}\n\n— الـخـبـر : ${TextInput〡2}\n\n— الـمـوقـع : ${TextInput〡3}\n\n— مُـوجـه الـخـبـر اِلــى : ${TextInput〡4}\n— مـسـؤول الـخـبـر : ${Message.user}__**`;
 Channel.send({ content: Content, files: [Attachment] });
 Message.reply({ content: `**تم ارسال اعلان بنجاح**`, flags: 64 })
 } break;
 case 'Ads〡3': {
 const TextInput〡1 = Message.fields.getTextInputValue('Custom-Ads〡1')
 const TextInput〡2 = Message.fields.getTextInputValue('Custom-Ads〡2')
 const TextInput〡3 = Message.fields.getTextInputValue('Custom-Ads〡3')
 const TextInput〡4 = Message.fields.getTextInputValue('Custom-Ads〡4')
 const Channel = Message.guild.channels.cache.get(PermissionAds.Ads〡3.Channel)
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/Ads-3.jpg`, { name: 'Ads-3.jpg' });
 const Content = `**__ — \`\` ﷽ \`\`\n\n— إعـلانـات مـديـنـة قولف ريسبكت\n\n— الــخـبـر صــادر مــن : ${TextInput〡1}\n\n— الـخـبـر : ${TextInput〡2}\n\n— الـمـوقـع : ${TextInput〡3}\n\n— مُـوجـه الـخـبـر اِلــى : ${TextInput〡4}\n— مـسـؤول الـخـبـر : ${Message.user}__**`;
 Channel.send({ content: Content, files: [Attachment] });
 Message.reply({ content: `**تم ارسال اعلان بنجاح**`, flags: 64 })
 } break;
 case 'Ads〡4': {
 const TextInput〡1 = Message.fields.getTextInputValue('Custom-Ads〡1')
 const TextInput〡2 = Message.fields.getTextInputValue('Custom-Ads〡2')
 const TextInput〡3 = Message.fields.getTextInputValue('Custom-Ads〡3')
 const TextInput〡4 = Message.fields.getTextInputValue('Custom-Ads〡4')
 const Channel = Message.guild.channels.cache.get(PermissionAds.Ads〡4.Channel)
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/Ads-4.jpg`, { name: 'Ads-4.jpg' });
 const Content = `**__ — \`\` ﷽ \`\`\n\n— إعـلانـات مـديـنـة قولف ريسبكت\n\n— الــخـبـر صــادر مــن : ${TextInput〡1}\n\n— الـخـبـر : ${TextInput〡2}\n\n— الـمـوقـع : ${TextInput〡3}\n\n— مُـوجـه الـخـبـر اِلــى : ${TextInput〡4}\n— مـسـؤول الـخـبـر : ${Message.user}__**`;
 Channel.send({ content: Content, files: [Attachment] });
 Message.reply({ content: `**تم ارسال اعلان بنجاح**`, flags: 64 })
 } break;
 case 'Ads〡5': {
 const TextInput〡1 = Message.fields.getTextInputValue('Custom-Ads〡1')
 const TextInput〡2 = Message.fields.getTextInputValue('Custom-Ads〡2')
 const TextInput〡3 = Message.fields.getTextInputValue('Custom-Ads〡3')
 const TextInput〡4 = Message.fields.getTextInputValue('Custom-Ads〡4')
 const Channel = Message.guild.channels.cache.get(PermissionAds.Ads〡5.Channel)
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/Ads-5.jpg`, { name: 'Ads-5.jpg' });
 const Content = `**__ — \`\` ﷽ \`\`\n\n— إعـلانـات مـديـنـة قولف ريسبكت\n\n— الــخـبـر صــادر مــن : ${TextInput〡1}\n\n— الـخـبـر : ${TextInput〡2}\n\n— الـمـوقـع : ${TextInput〡3}\n\n— مُـوجـه الـخـبـر اِلــى : ${TextInput〡4}\n— مـسـؤول الـخـبـر : ${Message.user}__**`;
 Channel.send({ content: Content, files: [Attachment] });
 Message.reply({ content: `**تم ارسال اعلان بنجاح**`, flags: 64 })
 } break;
 case 'Ads〡6': {
 const TextInput〡1 = Message.fields.getTextInputValue('Custom-Ads〡1')
 const TextInput〡2 = Message.fields.getTextInputValue('Custom-Ads〡2')
 const TextInput〡3 = Message.fields.getTextInputValue('Custom-Ads〡3')
 const TextInput〡4 = Message.fields.getTextInputValue('Custom-Ads〡4')
 const Channel = Message.guild.channels.cache.get(PermissionAds.Ads〡6.Channel)
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/Ads-6.jpg`, { name: 'Ads-6.jpg' });
 const Content = `**__ — \`\` ﷽ \`\`\n\n— إعـلانـات مـديـنـة قولف ريسبكت\n\n— الــخـبـر صــادر مــن : ${TextInput〡1}\n\n— الـخـبـر : ${TextInput〡2}\n\n— الـمـوقـع : ${TextInput〡3}\n\n— مُـوجـه الـخـبـر اِلــى : ${TextInput〡4}\n— مـسـؤول الـخـبـر : ${Message.user}__**`;
 Channel.send({ content: Content, files: [Attachment] });
 Message.reply({ content: `**تم ارسال اعلان بنجاح**`, flags: 64 })
 } break;
 case 'Ads〡7': {
 const TextInput〡1 = Message.fields.getTextInputValue('Custom-Ads〡1')
 const TextInput〡2 = Message.fields.getTextInputValue('Custom-Ads〡2')
 const TextInput〡3 = Message.fields.getTextInputValue('Custom-Ads〡3')
 const TextInput〡4 = Message.fields.getTextInputValue('Custom-Ads〡4')
 const Channel = Message.guild.channels.cache.get(PermissionAds.Ads〡7.Channel)
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/Ads-7.jpg`, { name: 'Ads-7.jpg' });
 const Content = `**__ — \`\` ﷽ \`\`\n\n— إعـلانـات مـديـنـة قولف ريسبكت\n\n— الــخـبـر صــادر مــن : ${TextInput〡1}\n\n— الـخـبـر : ${TextInput〡2}\n\n— الـمـوقـع : ${TextInput〡3}\n\n— مُـوجـه الـخـبـر اِلــى : ${TextInput〡4}\n— مـسـؤول الـخـبـر : ${Message.user}__**`;
 Channel.send({ content: Content, files: [Attachment] });
 Message.reply({ content: `**تم ارسال اعلان بنجاح**`, flags: 64 })
 } break;
 case 'Ads〡8': {
 const TextInput〡1 = Message.fields.getTextInputValue('Custom-Ads〡1')
 const TextInput〡2 = Message.fields.getTextInputValue('Custom-Ads〡2')
 const TextInput〡3 = Message.fields.getTextInputValue('Custom-Ads〡3')
 const TextInput〡4 = Message.fields.getTextInputValue('Custom-Ads〡4')
 const Channel = Message.guild.channels.cache.get(PermissionAds.Ads〡8.Channel)
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/Ads-8.jpg`, { name: 'Ads-8.jpg' });
 const Content = `**__ — \`\` ﷽ \`\`\n\n— إعـلانـات مـديـنـة قولف ريسبكت\n\n— الــخـبـر صــادر مــن : ${TextInput〡1}\n\n— الـخـبـر : ${TextInput〡2}\n\n— الـمـوقـع : ${TextInput〡3}\n\n— مُـوجـه الـخـبـر اِلــى : ${TextInput〡4}\n— مـسـؤول الـخـبـر : ${Message.user}__**`;
 Channel.send({ content: Content, files: [Attachment] });
 Message.reply({ content: `**تم ارسال اعلان بنجاح**`, flags: 64 })
 } break;
 }
 }
}