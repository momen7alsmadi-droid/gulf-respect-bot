"use strict";
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, EmbedBuilder } from 'discord.js';
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 if (Message.isButton()) {
 if (Message.customId === 'Prosecution') {
 const Modal = new ModalBuilder({ customId: 'Prosecution-Modal', title: 'استدعاء النيابة' });
 const Input = new TextInputBuilder({ customId: 'Prosecution-User', label: 'ايدي الشخص المطلوب', style: 1, placeholder: 'أدخل ايدي الشخص', required: true });
 Modal.addComponents(new ActionRowBuilder({ components: [Input] }));
 await Message.showModal(Modal);
 }
 if (Message.customId === 'Call-Authority') {
 const Modal = new ModalBuilder({ customId: 'Call-Authority-Modal', title: 'استدعاء الهيئة' });
 const Input = new TextInputBuilder({ customId: 'Authority-User', label: 'ايدي الشخص المطلوب', style: 1, placeholder: 'أدخل ايدي الشخص', required: true });
 Modal.addComponents(new ActionRowBuilder({ components: [Input] }));
 await Message.showModal(Modal);
 }
 }
 if (Message.isModalSubmit()) {
 if (Message.customId === 'Prosecution-Modal') {
 const userId = Message.fields.getTextInputValue('Prosecution-User');
 const Member = Message.guild.members.cache.get(userId);
 if (!Member) return await Message.reply({ content: `❌ **ERR-004**\n> العضو غير موجود`, flags: 64 });
 const Embed = new EmbedBuilder()
 .setColor('Red')
 .setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL() })
 .setDescription(`**⚖️ استدعاء رسمي من النيابة العامة**\n\n— المستدعي: ${Member}\n— تم استدعائك من قبل: ${Message.user}\n— للمثول أمام النيابة العامة\n\n\`\`\`النيابة العامة - قولف ريسبكت\`\`\``)
 .setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL() });
 await Member.send({ embeds: [Embed] }).catch(() => {});
 await Message.reply({ content: `✅ **تم إرسال استدعاء النيابة إلى ${Member}**`, flags: 64 });
 }
 if (Message.customId === 'Call-Authority-Modal') {
 const userId = Message.fields.getTextInputValue('Authority-User');
 const Member = Message.guild.members.cache.get(userId);
 if (!Member) return await Message.reply({ content: `❌ **ERR-004**\n> العضو غير موجود`, flags: 64 });
 const Embed = new EmbedBuilder()
 .setColor('DarkRed')
 .setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL() })
 .setDescription(`**🔍 استدعاء رسمي من هيئة مكافحة الفساد**\n\n— المستدعي: ${Member}\n— تم استدعائك من قبل: ${Message.user}\n— للمثول أمام هيئة مكافحة الفساد\n\n\`\`\`هيئة مكافحة الفساد - قولف ريسبكت\`\`\``)
 .setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL() });
 await Member.send({ embeds: [Embed] }).catch(() => {});
 await Message.reply({ content: `✅ **تم إرسال استدعاء الهيئة إلى ${Member}**`, flags: 64 });
 }
 }
};