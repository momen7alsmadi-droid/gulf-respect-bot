"use strict";
import { EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ActionRowBuilder } from 'discord.js';
import { VERSION, Founder, CommandPremission, TicketTf3el, Tickets2Sm, TicketT2dem, LogPoint, Dissenting, Reporting, Employment, Identity, AlShuri, Police, CivilRegistry } from '../Files〡[Config]/Files〡[Config].js';
import { writeFileSync, readFileSync } from 'fs';

const configPath = 'Files〡[Resource]/Files〡[Config]/Files〡[Config].js';

// شرح الأقسام
const SECTIONS = {
 perms: {
 title: '🏷️ صلاحيات الأوامر',
 desc: 'حدد من يستخدم الأوامر الإدارية',
 fields: [
 ['نداء', '=نداء - إرسال نداء خاص'],
 ['اعلانات', '=قائمه-الاعلانات - لوحة الإعلانات'],
 ['نقاط', '=اضافة-نقاط / =ازالة-نقاط'],
 ['خط', '=خط - خط فاصل'],
 ['ادارة', '=سيطب-ادارة - لوحة الإدارة'],
 ['هوية', '=سيطب-الهوية - الهوية'],
 ['تقديمات', '=تقديمات - لوحة التقديمات'],
 ['تكت', '=تكت - لوحات التذاكر'],
 ['شوري', '=تسطيب-الشوري / =تصويت'],
 ['عقوبات', '=انشاء-عقوبة / =حذف-عقوبة'],
 ['مخالف', '=مخالف - سجن عضو'],
 ['فك', '=فك - فك سجن'],
 ['توظيف', '=توظيف / =تقاعد'],
 ]
 },
 tickets: {
 title: '🎫 نظام التذاكر',
 desc: 'رولات استلام وإدارة التذاكر',
 fields: [
 ['دعم-تفعيل', 'يستلم تذاكر التفعيل'],
 ['مشرف-تفعيل', 'يشرف على تذاكر التفعيل'],
 ['اونر-تكت', 'يرى جميع التذاكر'],
 ['دعم-مساعدة', 'يستلم تذاكر المساعدة'],
 ['مشرف-مساعدة', 'يشرف على تذاكر المساعدة'],
 ['دعم-شكاوى', 'يستلم تذاكر الشكاوى'],
 ['صلاحية-شكاوى', 'قيادة الشكاوى'],
 ['دعم-تقديم', 'يستلم تذاكر تقديم الإدارة'],
 ]
 },
 police: {
 title: '👮 نظام الشرطة',
 desc: 'صلاحيات العساكر والمخالفات',
 fields: [
 ['دخول-شرطة', 'تسجيل دخول العسكري'],
 ['خروج-شرطة', 'تسجيل خروج العسكري'],
 ['مباشر-شرطة', 'رؤية قائمة المباشرين'],
 ['مسح-مباشر', 'مسح قائمة المباشرين'],
 ['نقاط-شرطة', 'إضافة نقاط للعساكر'],
 ['حذف-نقاط-شرطة', 'حذف نقاط العساكر'],
 ['تصفير-شرطة', 'تصفير نقاط العساكر'],
 ['مخالفات-شرطة', 'لوحة المخالفات'],
 ['بلاغات-شرطة', 'لوحة البلاغات'],
 ['لوحة-شرطة', 'لوحة العساكر الرئيسية'],
 ['سجل-مدني', 'السجل المدني'],
 ]
 },
 shuri: {
 title: '🏛️ مجلس الشورى',
 desc: 'أعضاء المجلس والأحزاب',
 fields: [
 ['ديمقراطي', 'الحزب الديمقراطي'],
 ['جمهوري', 'الحزب الجمهوري'],
 ['رول-شورى', 'رول عضو المجلس'],
 ['رئيس-شورى', 'رئيس المجلس'],
 ['نائب-شورى', 'نائب الرئيس'],
 ]
 },
 channels: {
 title: '📢 القنوات واللوقات',
 desc: 'قنوات السجلات والتقارير',
 fields: [
 ['لوق-نقاط', 'سجل نقاط الإدارة'],
 ['لوق-تذاكر', 'سجل التذاكر المغلقة'],
 ['قناة-هوية', 'قناة الهوية الوطنية'],
 ['قناة-عقوبات', 'سجل المخالفات'],
 ['قناة-بلاغات', 'قناة البلاغات'],
 ['قناة-توظيف', 'سجل التوظيف'],
 ]
 },
};

function updateSetting(settingName, newValue) {
 const map = {
 'نداء': 'CommandPremission.Call',
 'اعلانات': 'CommandPremission.Ads',
 'نقاط': 'CommandPremission.AddPoint',
 'خط': 'CommandPremission.Line',
 'ادارة': 'CommandPremission.SetupAdara',
 'هوية': 'CommandPremission.SetupID',
 'تقديمات': 'CommandPremission.SetupSubmissions',
 'تكت': 'CommandPremission.SetupTicket',
 'شوري': 'CommandPremission.Al_ShuriSetup',
 'عقوبات': 'CommandPremission.CreateDissenting',
 'مخالف': 'CommandPremission.M5alf',
 'فك': 'CommandPremission.Remove5alf',
 'توظيف': 'CommandPremission.Employment',
 'دعم-تفعيل': 'TicketTf3el.Support',
 'مشرف-تفعيل': 'TicketTf3el.Management',
 'اونر-تكت': 'TicketTf3el.Owner',
 'دعم-مساعدة': 'Tickets2Sm.Help.Support',
 'مشرف-مساعدة': 'Tickets2Sm.Help.Management',
 'دعم-شكاوى': 'Tickets2Sm.El4away.Support',
 'صلاحية-شكاوى': 'Tickets2Sm.El4away.Permission',
 'دعم-تقديم': 'TicketT2dem.Support',
 'دخول-شرطة': 'Police.Login',
 'خروج-شرطة': 'Police.Logout',
 'مباشر-شرطة': 'Police.OnDutyList',
 'مسح-مباشر': 'Police.ResetOnDutyList',
 'نقاط-شرطة': 'Police.AddPoint',
 'حذف-نقاط-شرطة': 'Police.RemovePoint',
 'تصفير-شرطة': 'Police.WhistlingPoint',
 'مخالفات-شرطة': 'Police.PanelM5alfat',
 'بلاغات-شرطة': 'Police.PanelReport',
 'لوحة-شرطة': 'Police.Panel',
 'سجل-مدني': 'CivilRegistry.Registry',
 'ديمقراطي': 'AlShuri.Democratic',
 'جمهوري': 'AlShuri.Republican',
 'رول-شورى': 'AlShuri.Role',
 'رئيس-شورى': 'AlShuri.Leader',
 'نائب-شورى': 'AlShuri.Deputy',
 'لوق-نقاط': 'LogPoint.Channel',
 'لوق-تذاكر': 'TicketTf3el.ChannelLog',
 'قناة-هوية': 'Identity.Channel',
 'قناة-عقوبات': 'Dissenting.Channel',
 'قناة-بلاغات': 'Reporting.Channel',
 'قناة-توظيف': 'Employment.Channel',
 };
 
 const configKey = map[settingName];
 if (!configKey) return false;
 
 let c = readFileSync(configPath, 'utf8');
 const parts = configKey.split('.');
 const lastKey = parts[parts.length - 1];
 
 // استبدال القيمة
 const regex = new RegExp(`(${lastKey}:\\s*)'[^']*'`, 'g');
 let found = false;
 c = c.replace(regex, (match, prefix) => {
 found = true;
 return `${prefix}'${newValue}'`;
 });
 
 if (found) {
 writeFileSync(configPath, c, 'utf8');
 return true;
 }
 return false;
}

export default async function (Client, Message) {
 // التحقق من الصلاحية
 const isAdmin = Message.member?.roles?.cache?.has('1525549017960808660');
 
 // زر الرجوع
 if (Message.isButton() && Message.customId === 'ControlPanel-Back') {
 if (!isAdmin) return Message.reply({ content: '❌ لا تملك صلاحية', flags: 64 });
 
 const Embed = new EmbedBuilder()
 .setTitle('🛡️ لوحة تحكم البوت - القائمة الرئيسية')
 .setColor('#FFD700')
 .setDescription('**اختر القسم الذي تريد تعديله من القائمة المنسدلة.**')
 .addFields(
 { name: '🏷️ صلاحيات الأوامر', value: 'من يستخدم الأوامر الإدارية' },
 { name: '🎫 نظام التذاكر', value: 'رولات استلام وإدارة التذاكر' },
 { name: '👮 نظام الشرطة', value: 'رولات العساكر والمخالفات' },
 { name: '🏛️ مجلس الشورى', value: 'أعضاء المجلس والتصويت' },
 { name: '📢 القنوات واللوقات', value: 'قنوات السجلات والإعلانات' },
 { name: '📋 عرض جميع الإعدادات', value: 'مشاهدة كل المعرفات الحالية' },
 )
 .setFooter({ text: `v${VERSION} • المسؤول: <@&1525549017960808660>` });

 const Menu = new StringSelectMenuBuilder()
 .setCustomId('ControlPanel-MainMenu')
 .setPlaceholder('اختر القسم الذي تريد تعديله...')
 .addOptions([
 { label: '🏷️ صلاحيات الأوامر', description: 'من يستخدم الأوامر الإدارية', value: 'perms' },
 { label: '🎫 نظام التذاكر', description: 'رولات استلام وإدارة التذاكر', value: 'tickets' },
 { label: '👮 نظام الشرطة', description: 'رولات العساكر والمخالفات', value: 'police' },
 { label: '🏛️ مجلس الشورى', description: 'أعضاء المجلس والتصويت', value: 'shuri' },
 { label: '📢 القنوات واللوقات', description: 'قنوات السجلات والإعلانات', value: 'channels' },
 { label: '📋 عرض جميع الإعدادات', description: 'مشاهدة كل المعرفات الحالية', value: 'show' },
 ]);

 await Message.update({ embeds: [Embed], components: [{ type: 1, components: [Menu] }] });
 return;
 }

 // القائمة الرئيسية
 if (Message.isStringSelectMenu() && Message.customId === 'ControlPanel-MainMenu') {
 if (!isAdmin) return Message.reply({ content: '❌ لا تملك صلاحية', flags: 64 });

 const section = Message.values[0];
 if (section === 'show') {
 const Embed = new EmbedBuilder()
 .setTitle('📋 جميع الإعدادات الحالية')
 .setColor('#00FF00')
 .addFields(
 { name: '🏷️ صلاحيات الأوامر', value: `نداء: ${CommandPremission.Call}\nاعلانات: ${CommandPremission.Ads}\nنقاط: ${CommandPremission.AddPoint}\nخط: ${CommandPremission.Line}\nادارة: ${CommandPremission.SetupAdara}\nتكت: ${CommandPremission.SetupTicket}\nتوظيف: ${CommandPremission.Employment}` },
 { name: '🎫 التذاكر', value: `دعم تفعيل: ${TicketTf3el.Support}\nمشرف تفعيل: ${TicketTf3el.Management}\nاونر: ${TicketTf3el.Owner}\nدعم مساعدة: ${Tickets2Sm.Help.Support}\nدعم شكاوى: ${Tickets2Sm.El4away.Support}` },
 { name: '📢 القنوات', value: `لوق نقاط: ${LogPoint.Channel}\nعقوبات: ${Dissenting.Channel}\nبلاغات: ${Reporting.Channel}\nتوظيف: ${Employment.Channel}\nهوية: ${Identity.Channel}` },
 { name: '🏛️ الشورى', value: `ديمقراطي: ${AlShuri.Democratic}\nجمهوري: ${AlShuri.Republican}\nرئيس: ${AlShuri.Leader}\nنائب: ${AlShuri.Deputy}` },
 )
 .setFooter({ text: `v${VERSION}` });

 const BackButton = new ButtonBuilder({ customId: 'ControlPanel-Back', label: '🔙 رجوع للقائمة الرئيسية', style: 2 });
 await Message.update({ embeds: [Embed], components: [{ type: 1, components: [BackButton] }] });
 return;
 }

 const data = SECTIONS[section];
 if (!data) return;

 const Embed = new EmbedBuilder()
 .setTitle(data.title)
 .setColor('#FFD700')
 .setDescription(`**${data.desc}**\n\n**للتعديل:** \`=تحكم <الاسم> <المعرف>\`\n**مثال:** \`=تحكم ${data.fields[0][0]} 123456789012345678\``)
 .addFields(data.fields.map(([name, desc]) => ({ name: `\`${name}\``, value: desc, inline: false })))
 .setFooter({ text: `v${VERSION} • =تحكم للرجوع للقائمة` });

 const BackButton = new ButtonBuilder({ customId: 'ControlPanel-Back', label: '🔙 رجوع للقائمة الرئيسية', style: 2 });
 await Message.update({ embeds: [Embed], components: [{ type: 1, components: [BackButton] }] });
 }
};