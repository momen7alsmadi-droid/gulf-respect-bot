"use strict";
import { StringSelectMenuBuilder, TextInputBuilder, ModalBuilder, EmbedBuilder } from 'discord.js';
import { Violations } from '../Files〡[Config]/Files〡[Config].js';
import DB〡Balance from '../Files〡[DataBase]/DB〡[DataBase].js';
import DB〡Finance from '../Files〡[DataBase]/DB〡[Ministry of Finance].js';
import { JsonDatabase } from 'wio.db';
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Violations].json' })
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 switch (Message.customId) {
 case 'Violations〡Member': {
 const TextInput = new TextInputBuilder({ customId: 'Violations〡Member〡ID', label: 'أيدي العضو', placeholder: 'أيدي العضو', style: 1, required: true })
 const Modal = new ModalBuilder({ customId: 'Violations〡Member〡Modal', title: 'اعطاء مخالفة', components: [{ type: 1, components: [TextInput] }] })
 await Message.showModal(Modal)
 } break;
 case 'Violations〡Member〡Modal': {
 const ID = Message.fields.getTextInputValue('Violations〡Member〡ID')
 const Member = Message.guild.members.cache.get(ID)
 if (!Member) return Message.reply({ content: 'لا يوجد عضو بهذا الأيدي', flags: 64 })
 const StringSelectMenu = new StringSelectMenuBuilder({ customId: 'Violations〡Member〡Modal〡Violation', placeholder: 'اختر المخالفة', required: true })
 StringSelectMenu.addOptions(Violations.Violations.map((violation, index) => ({ label: violation.Violation, description: `${violation.Description}`, value: `${index + 1}-$${Member.user.id}` })));
 await Message.reply({ content: `${Member}`, components: [{ type: 1, components: [StringSelectMenu] }], flags: 64 })
 } break;
 case 'Violations〡Member〡Modal〡Violation': {
 await Message.deferUpdate({ })
 const [Violation, ID] = Message.values[0].split('-')
 const Member = Message.guild.members.cache.get(ID.replace('$', ''))
 if (!Member) return Message.editReply({ content: 'لا يوجد عضو بهذا الأيدي', components: [] })
 const ViolationData = Violations.Violations[Violation - 1]
 if (!ViolationData) return Message.editReply({ content: 'لا يوجد مخالفة بهذا الرقم', components: [] })
 await Message.editReply({ content: `**تم قيد المخالفة بنجاح**`, components: [] });
 await Member.send({
 content: `**__
عزيزي العضو{${Member}}

تشعركم الادارة العامة للمرور بـ دولة قولف ريسبكت 

بانه لقد تم قيد مخالفة {${ViolationData.Violation}}

بمبلغ {${ViolationData.Price}}

في حال يوجد اعتراض على المخالفة يرجى التوجه لوزارة العدل و رفع قضية على : ${Message.user}

~~مع تحيات الادارة العامة للمرور ~~
__**` }).catch(() => { })
 const Embed = new EmbedBuilder()
 Embed.setDescription(`**__— إلى عناية رجل الأمن المحترم،

— نشكرك على التزامك بواجبك في تطبيق النظام والمحافظة على أمن قولف ريسبكت. جهودك المبذولة تعكس تفانيك في دعم استقرار المدينة وتعزيز دور وزارة المالية عبر تحصيل المخالفات النظامية.

— استمر في أداء مهامك بكل جدية، فأنت الركيزة الأساسية في الحفاظ على النظام والعدل في وطننا.

وزارة الداخلية - قولف ريسبكت__**`)
 Embed.setThumbnail(`https://i.postimg.cc/CMmXPrt2/ea002bb91c4e5c3d.webp`)
 Message.user.send({ embeds: [Embed] }).catch(() => { })
 Database.add(`Police-Violations〡${Message.user.id}`, 1);
 let Data = DB〡Balance.findOneAndUpdate({ _id: Member.id }, { $setOnInsert: { Bank: 0, Cash: 0 } }, { new: true, upsert: true }).catch(() => {});
 Data.Bank -= ViolationData.Price
 await Data.save()
 const Finance = DB〡Finance.findOne({ _id: 'Ministry of Finance' }).catch(() => {})
 Finance.Money += ViolationData.Price
 await Finance.save()
 } break;
 }
}