"use strict";
import { TextInputBuilder, ActionRowBuilder, ModalBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db'
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[CivilRegistry].json' })
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 if (Message.isButton()) {
 switch (Message.customId) {
 case 'CivilRegistry〡Create': {
 const TextInputs = [
 new TextInputBuilder({ customId: 'CivilRegistry〡Create〡ID', label: 'ايدي العضو', style: 1, placeholder: 'اكتب ايدي العضو هنا', required: true }),
 new TextInputBuilder({ customId: 'CivilRegistry〡Create〡CriminalStatus', label: 'الحالة الجنائية', style: 1, placeholder: 'اكتب الحالة الجنائية هنا', required: true }),
 new TextInputBuilder({ customId: 'CivilRegistry〡Create〡PrisonEntries', label: 'عدد مرات دخول السجن', style: 1, placeholder: 'اكتب عدد مرات دخول السجن هنا', required: true }),
 new TextInputBuilder({ customId: 'CivilRegistry〡Create〡CriminalRecord', label: 'السوابق الجنائية', style: 1, placeholder: 'اكتب السوابق الجنائية هنا', required: true }),
 new TextInputBuilder({ customId: 'CivilRegistry〡Create〡EmploymentStatus', label: 'الحالة الوظيفية', style: 1, placeholder: 'اكتب الحالة الوظيفية هنا', required: true })
 ]
 const ActionRow = TextInputs.map(TextInput => new ActionRowBuilder().addComponents(TextInput));
 const Modal = new ModalBuilder({ customId: 'CivilRegistry〡Create〡Modal', title: 'إنشاء سجل', components: ActionRow });
 Message.showModal(Modal);
 } break;
 case 'CivilRegistry〡View': {
 const TextInput = new TextInputBuilder({ customId: 'CivilRegistry〡View〡ID', label: 'ايدي العضو', style: 1, placeholder: 'اكتب ايدي العضو هنا', required: true });
 const Modal = new ModalBuilder({ customId: 'CivilRegistry〡View〡Modal', title: 'استعلام سجل', components: [{ type: 1, components: [TextInput] }] });
 Message.showModal(Modal);
 } break;
 case 'CivilRegistry〡Edit': {
 const TextInputs = [
 new TextInputBuilder({ customId: 'CivilRegistry〡Edit〡ID', label: 'ايدي العضو', style: 1, placeholder: 'اكتب ايدي العضو هنا', required: true }),
 new TextInputBuilder({ customId: 'CivilRegistry〡Edit〡CriminalStatus', label: 'الحالة الجنائية', style: 1, placeholder: 'اكتب الحالة الجنائية هنا', required: false }),
 new TextInputBuilder({ customId: 'CivilRegistry〡Edit〡PrisonEntries', label: 'عدد مرات دخول السجن', style: 1, placeholder: 'اكتب عدد مرات دخول السجن هنا', required: false }),
 new TextInputBuilder({ customId: 'CivilRegistry〡Edit〡CriminalRecord', label: 'السوابق الجنائية', style: 1, placeholder: 'اكتب السوابق الجنائية هنا', required: false }),
 new TextInputBuilder({ customId: 'CivilRegistry〡Edit〡EmploymentStatus', label: 'الحالة الوظيفية', style: 1, placeholder: 'اكتب الحالة الوظيفية هنا', required: false })
 ]
 const ActionRow = TextInputs.map(TextInput => new ActionRowBuilder().addComponents(TextInput));
 const Modal = new ModalBuilder({ customId: 'CivilRegistry〡Edit〡Modal', title: 'تعديل سجل', components: ActionRow });
 Message.showModal(Modal);
 } break;
 }
 } else if (Message.isModalSubmit()) {
 switch (Message.customId) {
 case 'CivilRegistry〡Create〡Modal': {
 const ID = Message.fields.getTextInputValue('CivilRegistry〡Create〡ID');
 const CriminalStatus = Message.fields.getTextInputValue('CivilRegistry〡Create〡CriminalStatus');
 const PrisonEntries = Message.fields.getTextInputValue('CivilRegistry〡Create〡PrisonEntries');
 const CriminalRecord = Message.fields.getTextInputValue('CivilRegistry〡Create〡CriminalRecord');
 const EmploymentStatus = Message.fields.getTextInputValue('CivilRegistry〡Create〡EmploymentStatus');
 const Member = Message.guild.members.cache.get(ID);
 if (!Member) return Message.reply({ content: `**لا يوجد عضو بهذا الايدي**`, flags: 64 });
 Message.reply({
 content: `**__- تم تسجيل
بيانات الشخص
بنجاح (${Member.user})
في السجل المدني.__**`, flags: 64
 })
 Database.set(`CivilRegistry〡${Member.id}`, { Member: ID, CriminalStatus: CriminalStatus, PrisonEntries: PrisonEntries, CriminalRecord: CriminalRecord, EmploymentStatus: EmploymentStatus });
 } break
 case 'CivilRegistry〡View〡Modal': {
 const ID = Message.fields.getTextInputValue('CivilRegistry〡View〡ID');
 const Member = Message.guild.members.cache.get(ID);
 if (!Member) return Message.reply({ content: `**لا يوجد عضو بهذا الايدي**`, flags: 64 });
 const CivilRegistry = Database.get(`CivilRegistry〡${Member.id}`);
 if (!CivilRegistry) return Message.reply({ content: `**لا يوجد**` })
 Message.reply({
 content: `**__
- معلومات
السجل المدني 
${Member.user}

- الحالة الجنائية . : ${CivilRegistry.CriminalStatus}

- عدد مرات دخول السجن : ${CivilRegistry.PrisonEntries}

- السوابق الجنائية : ${CivilRegistry.CriminalRecord}

- الحالة الوظيفية . : ${CivilRegistry.EmploymentStatus}
__**`, flags: 64
 })
 } break
 case 'CivilRegistry〡Edit〡Modal': {
 const ID = Message.fields.getTextInputValue('CivilRegistry〡Edit〡ID');
 const Member = Message.guild.members.cache.get(ID);
 if (!Member) return Message.reply({ content: `**لا يوجد عضو بهذا الايدي**`, flags: 64 });
 const existingData = Database.get(`CivilRegistry〡${Member.id}`)
 if (!existingData) return Message.reply({ content: `**لا يوجد سجل مدني لهذا العضو**` });
 const updatedData = { ...existingData };
 const CriminalStatus = Message.fields.getTextInputValue('CivilRegistry〡Edit〡CriminalStatus');
 if (CriminalStatus) updatedData.CriminalStatus = CriminalStatus;
 const PrisonEntries = Message.fields.getTextInputValue('CivilRegistry〡Edit〡PrisonEntries');
 if (PrisonEntries) updatedData.PrisonEntries = PrisonEntries;
 const CriminalRecord = Message.fields.getTextInputValue('CivilRegistry〡Edit〡CriminalRecord');
 if (CriminalRecord) updatedData.CriminalRecord = CriminalRecord;
 const EmploymentStatus = Message.fields.getTextInputValue('CivilRegistry〡Edit〡EmploymentStatus');
 if (EmploymentStatus) updatedData.EmploymentStatus = EmploymentStatus;
 updatedData.Member = ID;
 Database.set(`CivilRegistry〡${Member.id}`, updatedData);
 Message.reply({
 content: `**__- تم تعديل
بيانات الشخص
بنجاح (${Member.user})
في السجل المدني.__**`, flags: 64
 })
 } break
 }
 }
}