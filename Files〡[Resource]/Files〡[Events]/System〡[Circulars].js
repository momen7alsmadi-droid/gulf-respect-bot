"use strict";

import { ActionRowBuilder, AttachmentBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';
import { Circulars, Line } from '../Files〡[Config]/Files〡[Config].js';

/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
    if (Message.isButton()) {
        switch (Message.customId) {
            case 'Circulars-1': {
                const Member = Message.guild.members.cache.get(Message.user.id);
                if (!Circulars.Circular〡1.Role.some(roleId => Member.roles.cache.has(roleId))) return Message.reply({ content: 'ليس لديك الصلاحية لإصدار تعاميم الأمن', flags: 64 });
                const TextInput = [
                    new TextInputBuilder
                        ({ customId: 'Circulars-Content', label: 'تص التعميم', style: 2, required: true }),
                    new TextInputBuilder({ customId: 'Circulars-IssuedBy', label: 'التعميم صادر من', style: 1, required: true }),
                    new TextInputBuilder({ customId: 'Circulars-Date', label: 'في تاريخ', style: 1, required: true }),
                    new TextInputBuilder({ customId: 'Circulars-ImageLink', label: 'رابط صورة', style: 1, required: false }),
                ]
                const ActionRow = TextInput.map(Input => new ActionRowBuilder().addComponents(Input));
                const Modal = new ModalBuilder({ customId: 'Circulars-1', title: 'تعاميم الأمن', components: ActionRow });
                await Message.showModal(Modal);
            } break;
            case 'Circulars-2': {
                const Member = Message.guild.members.cache.get(Message.user.id);
                if (!Circulars.Circular〡2.Role.some(roleId => Member.roles.cache.has(roleId))) return Message.reply({ content: 'ليس لديك الصلاحية لإصدار تعاميم القوات', flags: 64 });
                const TextInput = [
                    new TextInputBuilder({ customId: 'Circulars-Content', label: 'تص التعميم', style: 2, required: true }),
                    new TextInputBuilder({ customId: 'Circulars-IssuedBy', label: 'التعميم صادر من', style: 1, required: true }),
                    new TextInputBuilder({ customId: 'Circulars-Date', label: 'في تاريخ', style: 1, required: true }),
                    new TextInputBuilder({ customId: 'Circulars-ImageLink', label: 'رابط صورة', style: 1, required: false }),
                ]
                const ActionRow = TextInput.map(Input => new ActionRowBuilder().addComponents(Input));
                const Modal = new ModalBuilder({ customId: 'Circulars-2', title: 'تعاميم القوات', components: ActionRow });
                await Message.showModal(Modal);
            } break;
            case 'Circulars-3': {
                const Member = Message.guild.members.cache.get(Message.user.id);
                if (!Circulars.Circular〡3.Role.some(roleId => Member.roles.cache.has(roleId))) return Message.reply({ content: 'ليس لديك الصلاحية لإصدار تعاميم الداخلية', flags: 64 });
                const TextInput = [
                    new TextInputBuilder({ customId: 'Circulars-Content', label: 'تص التعميم', style: 2, required: true }),
                    new TextInputBuilder({ customId: 'Circulars-IssuedBy', label: 'التعميم صادر من', style: 1, required: true }),
                    new TextInputBuilder({ customId: 'Circulars-Date', label: 'في تاريخ', style: 1, required: true }),
                    new TextInputBuilder({ customId: 'Circulars-ImageLink', label: 'رابط صورة', style: 1, required: false }),
                ]
                const ActionRow = TextInput.map(Input => new ActionRowBuilder().addComponents(Input));
                const Modal = new ModalBuilder({ customId: 'Circulars-3', title: 'تعاميم الداخلية', components: ActionRow });
                await Message.showModal(Modal);
            } break;
        }
    } else if (Message.isModalSubmit()) {
        switch (Message.customId) {
            case 'Circulars-1': {
                const Content = Message.fields.getTextInputValue('Circulars-Content');
                const IssuedBy = Message.fields.getTextInputValue('Circulars-IssuedBy');
                const Date = Message.fields.getTextInputValue('Circulars-Date');
                const ImageLink = Message.fields.getTextInputValue('Circulars-ImageLink');
                if (ImageLink) {
                    try {
                        const CheckImage = new URL(ImageLink);
                        if (!CheckImage.protocol.startsWith('http')) {
                            return Message.reply({ content: 'رابط الصورة غير صالح', flags: 64 });
                        }
                    } catch (error) {
                        return Message.reply({ content: 'رابط الصورة غير صالح', flags: 64 });
                    }
                }
                const Random = Math.floor(Math.random() * 99999);
                const Channel = Message.guild.channels.cache.get(Circulars.Circular〡1.Channel);
                await Message.reply({ content: 'تم إصدار التعاميم بنجاح', flags: 64 });
                await Channel.send(TextMain({ Message: Message, Random: Random, Content: Content, IssuedBy: IssuedBy, Date: Date, ImageLink: ImageLink, User: Message.user }));
                await Channel.send({ files: [Line] })
            } break;
            case 'Circulars-2': {
                const Content = Message.fields.getTextInputValue('Circulars-Content');
                const IssuedBy = Message.fields.getTextInputValue('Circulars-IssuedBy');
                const Date = Message.fields.getTextInputValue('Circulars-Date');
                const ImageLink = Message.fields.getTextInputValue('Circulars-ImageLink');
                if (ImageLink) {
                    try {
                        const CheckImage = new URL(ImageLink);
                        if (!CheckImage.protocol.startsWith('http')) {
                            return Message.reply({ content: 'رابط الصورة غير صالح', flags: 64 });
                        }
                    } catch (error) {
                        return Message.reply({ content: 'رابط الصورة غير صالح', flags: 64 });
                    }
                }
                const Channel = Message.guild.channels.cache.get(Circulars.Circular〡2.Channel);
                const Random = Math.floor(Math.random() * 99999);
                await Message.reply({ content: 'تم إصدار التعاميم بنجاح', flags: 64 });
                await Channel.send(TextMain({ Message: Message, Random: Random, Content: Content, IssuedBy: IssuedBy, Date: Date, ImageLink: ImageLink, User: Message.user }));
                await Channel.send({ files: [Line] })
            } break;
            case 'Circulars-3': {
                const Content = Message.fields.getTextInputValue('Circulars-Content');
                const IssuedBy = Message.fields.getTextInputValue('Circulars-IssuedBy');
                const Date = Message.fields.getTextInputValue('Circulars-Date');
                const ImageLink = Message.fields.getTextInputValue('Circulars-ImageLink');
                if (ImageLink) {
                    try {
                        const CheckImage = new URL(ImageLink);
                        if (!CheckImage.protocol.startsWith('http')) {
                            return Message.reply({ content: 'رابط الصورة غير صالح', flags: 64 });
                        }
                    } catch (error) {
                        return Message.reply({ content: 'رابط الصورة غير صالح', flags: 64 });
                    }
                }
                const Channel = Message.guild.channels.cache.get(Circulars.Circular〡3.Channel);
                const Random = Math.floor(Math.random() * 99999);
                await Message.reply({ content: 'تم إصدار التعاميم بنجاح', flags: 64 });
                await Channel.send(TextMain({ Message: Message, Random: Random, Content: Content, IssuedBy: IssuedBy, Date: Date, ImageLink: ImageLink, User: Message.user }));
                await Channel.send({ files: [Line] })
            } break;
        }
    }
}
const TextMain = ({ Message,Random, Content, IssuedBy, Date, ImageLink, User }) => {
    const Texting = `**__ \`\`\` — تـعـمـيـمـات ، الـداخـلـيـة \`\`\`__

\`\` # \`\` - الـتـعـمـيـم رقـم : ${Random}

\`\` # \`\` - يـنـص الـتـعـمـيـم عـلـى : ${Content}

\`\` # \`\`- الـتـعـمـيم صـادر مـن : ${IssuedBy}

\`\` # \`\`- في تاريخ : ${Date}

\`\` # \`\` - المـسـؤول عـن الـتـعـمـيـم : ${User}

\`\` # \`\` -  .**`
    if (!ImageLink) return { content: `${Texting}` }
    if (ImageLink) return { content: `${Texting}`, files: [ImageLink] }
}

