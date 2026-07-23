"use strict";
import { EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ActionRowBuilder } from 'discord.js';
import { VERSION } from '../../Files〡[Config]/Files〡[Config].js';
import { writeFileSync, readFileSync } from 'fs';

// شرح كل قسم
const SECTIONS_EXPLAINED = {
 main: {
 title: '🛡️ لوحة تحكم البوت - القائمة الرئيسية',
 description: `**اختر القسم الذي تريد تعديله من القائمة المنسدلة أدناه.**

**⚠️ ملاحظة:** بعد كل تعديل يجب **إعادة تشغيل البوت** على Railway لتطبيق التغييرات.`,
 fields: [
 { name: '🏷️ صلاحيات الأوامر', value: 'تحديد من يستخدم الأوامر الإدارية مثل النداء والإعلانات والنقاط' },
 { name: '🎫 نظام التذاكر', value: 'رولات استلام وإدارة التذاكر (تفعيل، مساعدة، شكاوى، الخ)' },
 { name: '👮 نظام الشرطة', value: 'رولات دخول/خروج العساكر والمخالفات والبلاغات' },
 { name: '🏛️ مجلس الشورى', value: 'أعضاء المجلس والتصويت ورولات الأحزاب' },
 { name: '📢 القنوات واللوقات', value: 'تحديد قنوات السجلات والإعلانات والنظام' },
 { name: '💼 التوظيف والتقديمات', value: 'رتب ورولات الوظائف الحكومية والعصابات' },
 { name: '📋 عرض الإعدادات', value: 'مشاهدة كل المعرفات الحالية المخزنة' },
 ]
 },
 perms: {
 title: '🏷️ صلاحيات الأوامر',
 description: 'هذه الرولات تحدد **من يستطيع استخدام الأوامر الإدارية**. إذا كنت تريد شخصاً يستخدم أمر معين، أعطه هذه الرتبة.',
 usage: '=تحكم صلاحية <اسم_الامر> <ايدي_الرتبة>',
 items: [
 ['نداء', '=نداء - إرسال نداء خاص لعضو'],
 ['اعلانات', '=قائمه-الاعلانات - إنشاء لوحة الإعلانات'],
 ['نقاط', '=اضافة-نقاط / =ازالة-نقاط / =تصفير-نقاط'],
 ['خط', '=خط - إرسال خط فاصل'],
 ['ادارة', '=سيطب-ادارة - لوحة نقاط الإدارة'],
 ['هوية', '=سيطب-الهوية - لوحة الهوية الوطنية'],
 ['تقديمات', '=تقديمات - لوحة التقديمات'],
 ['تكت', '=تكت - إنشاء لوحات التذاكر'],
 ['شوري', '=تسطيب-الشوري / =تصويت - مجلس الشورى'],
 ['عقوبات', '=انشاء-عقوبة / =حذف-عقوبة'],
 ['مخالف', '=مخالف - إعطاء سجن لعضو'],
 ['فك', '=فك - فك سجن عضو'],
 ['توظيف', '=توظيف / =تقاعد - توظيف وتقاعد الأعضاء'],
 ]
 },
 tickets: {
 title: '🎫 نظام التذاكر',
 description: 'التذاكر هي رومات خاصة تُفتح تلقائياً عندما يضغط عضو على زر. كل نوع تذكرة له رولات مسؤولة عنه.',
 usage: '=تحكم تذكرة <اسم_الرول> <ايدي_الرتبة>',
 items: [
 ['دعم-تفعيل', 'يستلم تذاكر التفعيل ويساعد الأعضاء الجدد'],
 ['مشرف-تفعيل', 'يشرف على تذاكر التفعيل (رتبة أعلى)'],
 ['اونر-تكت', 'يرى جميع التذاكر (للأونر فقط)'],
 ['دعم-مساعدة', 'يستلم تذاكر المساعدة والاستفسارات'],
 ['مشرف-مساعدة', 'يشرف على تذاكر المساعدة'],
 ['دعم-شكاوى', 'يستلم تذاكر الشكاوى العامة'],
 ['صلاحية-شكاوى', 'قيادة - ترى تذاكر الشكاوى'],
 ['دعم-تقديم', 'يستلم تذاكر تقديم الإدارة'],
 ]
 },
 police: {
 title: '👮 نظام الشرطة والعساكر',
 description: 'يتحكم في صلاحيات العساكر: من يستطيع دخول/خروج، إعطاء مخالفات، استلام بلاغات.',
 usage: '=تحكم شرطة <اسم_الرول> <ايدي_الرتبة>',
 items: [
 ['دخول-شرطة', 'رول يسمح للعسكري بتسجيل دخول'],
 ['خروج-شرطة', 'رول يسمح للعسكري بتسجيل خروج'],
 ['مباشر-شرطة', 'يستطيع رؤية قائمة المباشرين'],
 ['مسح-مباشر', 'يستطيع إعادة تعيين قائمة المباشرين'],
 ['نقاط-شرطة', 'يستطيع إضافة نقاط للعساكر'],
 ['حذف-نقاط-شرطة', 'يستطيع حذف نقاط العساكر'],
 ['تصفير-شرطة', 'يستطيع تصفير نقاط العساكر'],
 ['مخالفات-شرطة', 'يستطيع إنشاء لوحة المخالفات'],
 ['بلاغات-شرطة', 'يستطيع إنشاء لوحة البلاغات'],
 ['لوحة-شرطة', 'يستطيع إنشاء لوحة تسجيل العساكر'],
 ['سجل-مدني', 'يستطيع استخدام السجل المدني'],
 ]
 },
 shuri: {
 title: '🏛️ مجلس الشورى (البرلمان)',
 description: 'نظام المجلس يتيح للأعضاء رفع قرارات والتصويت عليها. يوجد حزبان: ديمقراطي وجمهوري.',
 usage: '=تحكم شورى <اسم_الرول> <ايدي_الرتبة>',
 items: [
 ['ديمقراطي', 'رول الحزب الديمقراطي'],
 ['جمهوري', 'رول الحزب الجمهوري'],
 ['رول-شورى', 'الرول العام لأعضاء المجلس'],
 ['رئيس-شورى', 'رئيس المجلس - يملك صلاحية القبول/رفض القرارات'],
 ['نائب-شورى', 'نائب الرئيس - نفس صلاحيات الرئيس'],
 ]
 },
 channels: {
 title: '📢 القنوات واللوقات',
 description: 'القنوات التي يرسل فيها البوت السجلات والتقارير تلقائياً.',
 usage: '=تحكم قناة <اسم_القناة> <ايدي_القناة>',
 items: [
 ['لوق-نقاط', 'يسجل إضافات وحذف نقاط الإدارة'],
 ['لوق-تذاكر', 'يسجل التذاكر المغلقة مع transcript'],
 ['قناة-هوية', 'قناة استخراج الهوية الوطنية'],
 ['قناة-عقوبات', 'يسجل المخالفات والعقوبات'],
 ['قناة-بلاغات', 'تصل إليها البلاغات من الأعضاء'],
 ['قناة-توظيف', 'يسجل عمليات التوظيف والتقاعد'],
 ]
 },
};

export default {
 name: 'لوحة-تحكم',
 description: "لوحة تحكم البوت من داخل الديسكورد (للإدارة العليا فقط)",
 aliases: ['تحكم', 'control', 'panel', 'settings'],
 run: async (Client, Message) => {
 const isAdmin = Message.member.roles.cache.has('1525549017960808660');
 if (!isAdmin) return Message.reply({ content: `❌ **ERR-002**\n> هذه اللوحة للإدارة العليا فقط\n> تحتاج رتبة: <@&1525549017960808660>\n-# v${VERSION}` });

 const Args = Message.content.split(' ');
 const category = Args[1]; // مثل: صلاحية, تذكرة, شرطة, شورى, قناة
 const settingName = Args[2]; // مثل: نداء, اعلانات, الخ
 const newValue = Args[3]; // المعرف الجديد

 // إذا كتب فقط =تحكم - عرض القائمة الرئيسية
 if (!category) {
 return showMainMenu(Message);
 }

 // إذا كتب =تحكم صلاحية - عرض عناصر القسم
 const categoryMap = {
 'صلاحية': 'perms',
 'صلاحيات': 'perms',
 'perms': 'perms',
 'تذكرة': 'tickets',
 'تذاكر': 'tickets',
 'tickets': 'tickets',
 'شرطة': 'police',
 'police': 'police',
 'شورى': 'shuri',
 'shuri': 'shuri',
 'قناة': 'channels',
 'قنوات': 'channels',
 'channels': 'channels',
 'عرض': 'show',
 };

 const section = categoryMap[category];
 if (!section) {
 return Message.reply({ content: `❌ قسم غير معروف: \`${category}\`\nاستخدم \`=تحكم\` للمشاهدة الأقسام` });
 }

 if (section === 'show') {
 return showAllSettings(Message);
 }

 const sectionData = SECTIONS_EXPLAINED[section];
 if (!settingName) {
 // عرض عناصر القسم
 const Embed = new EmbedBuilder()
 .setTitle(sectionData.title)
 .setColor('#FFD700')
 .setDescription(`${sectionData.description}\n\n**للتعديل:** \`=تحكم ${category} <الاسم> <المعرف>\`\n**مثال:** \`=تحكم ${category} ${sectionData.items[0][0]} 123456789012345678\``)
 .addFields(sectionData.items.map(([name, desc]) => ({ name: `\`${name}\``, value: desc, inline: false })))
 .setFooter({ text: `v${VERSION} • =تحكم للرجوع للقائمة الرئيسية` });

 const BackButton = new ButtonBuilder({ customId: 'ControlPanel-Back', label: '🔙 رجوع للقائمة الرئيسية', style: 2 });
 return Message.reply({ embeds: [Embed], components: [{ type: 1, components: [BackButton] }] });
 }

 // تعديل قيمة محددة
 if (!newValue || !/^\d{17,20}$/.test(newValue)) {
 return Message.reply({ content: `❌ **يرجى إدخال معرف صحيح**\n> \`=تحكم ${category} ${settingName} <المعرف>\`\n> مثال: \`=تحكم ${category} ${settingName} 123456789012345678\`` });
 }

 // قائمة التحويل من الاسم العربي إلى المفتاح في الكونفغ
 const configKeyMap = {
 'نداء': { key: 'Call', parent: 'CommandPremission' },
 'اعلانات': { key: 'Ads', parent: 'CommandPremission' },
 'نقاط': { key: 'AddPoint', parent: 'CommandPremission' },
 'خط': { key: 'Line', parent: 'CommandPremission' },
 'ادارة': { key: 'SetupAdara', parent: 'CommandPremission' },
 'هوية': { key: 'SetupID', parent: 'CommandPremission' },
 'تقديمات': { key: 'SetupSubmissions', parent: 'CommandPremission' },
 'تكت': { key: 'SetupTicket', parent: 'CommandPremission' },
 'شوري': { key: 'Al_ShuriSetup', parent: 'CommandPremission' },
 'عقوبات': { key: 'CreateDissenting', parent: 'CommandPremission' },
 'مخالف': { key: 'M5alf', parent: 'CommandPremission' },
 'فك': { key: 'Remove5alf', parent: 'CommandPremission' },
 'توظيف': { key: 'Employment', parent: 'CommandPremission' },
 'دعم-تفعيل': { key: 'Support', parent: 'TicketTf3el' },
 'مشرف-تفعيل': { key: 'Management', parent: 'TicketTf3el' },
 'اونر-تكت': { key: 'Owner', parent: 'TicketTf3el' },
 'دعم-مساعدة': { key: 'Support', parent: 'Tickets2Sm', sub: 'Help' },
 'مشرف-مساعدة': { key: 'Management', parent: 'Tickets2Sm', sub: 'Help' },
 'دعم-شكاوى': { key: 'Support', parent: 'Tickets2Sm', sub: 'El4away' },
 'صلاحية-شكاوى': { key: 'Permission', parent: 'Tickets2Sm', sub: 'El4away' },
 'دعم-تقديم': { key: 'Support', parent: 'TicketT2dem' },
 'دخول-شرطة': { key: 'Login', parent: 'Police' },
 'خروج-شرطة': { key: 'Logout', parent: 'Police' },
 'مباشر-شرطة': { key: 'OnDutyList', parent: 'Police' },
 'مسح-مباشر': { key: 'ResetOnDutyList', parent: 'Police' },
 'نقاط-شرطة': { key: 'AddPoint', parent: 'Police' },
 'حذف-نقاط-شرطة': { key: 'RemovePoint', parent: 'Police' },
 'تصفير-شرطة': { key: 'WhistlingPoint', parent: 'Police' },
 'مخالفات-شرطة': { key: 'PanelM5alfat', parent: 'Police' },
 'بلاغات-شرطة': { key: 'PanelReport', parent: 'Police' },
 'لوحة-شرطة': { key: 'Panel', parent: 'Police' },
 'سجل-مدني': { key: 'Registry', parent: 'CivilRegistry' },
 'ديمقراطي': { key: 'Democratic', parent: 'AlShuri' },
 'جمهوري': { key: 'Republican', parent: 'AlShuri' },
 'رول-شورى': { key: 'Role', parent: 'AlShuri' },
 'رئيس-شورى': { key: 'Leader', parent: 'AlShuri' },
 'نائب-شورى': { key: 'Deputy', parent: 'AlShuri' },
 'لوق-نقاط': { key: 'Channel', parent: 'LogPoint' },
 'لوق-تذاكر': { key: 'ChannelLog', parent: 'TicketTf3el' },
 'قناة-هوية': { key: 'Channel', parent: 'Identity' },
 'قناة-عقوبات': { key: 'Channel', parent: 'Dissenting' },
 'قناة-بلاغات': { key: 'Channel', parent: 'Reporting' },
 'قناة-توظيف': { key: 'Channel', parent: 'Employment' },
 };

 const mapping = configKeyMap[settingName];
 if (!mapping) {
 return Message.reply({ content: `❌ اسم غير معروف: \`${settingName}\`\n> استخدم \`=تحكم ${category}\` للمشاهدة الأسماء المتاحة` });
 }

 try {
 let c = readFileSync(configPath, 'utf8');
 
 // بناء النمط للبحث عنه
 let searchKey = mapping.key;
 let regex;
 if (mapping.sub) {
 regex = new RegExp(`(${mapping.parent}\\.${mapping.sub}\\.${searchKey}:\\s*')\\\\d*(')`, 'g');
 } else {
 regex = new RegExp(`(${mapping.parent}\\.${searchKey}:\\s*')\\\d*(')`, 'g');
 }
 
 if (!regex.test(c)) {
 // Try simpler pattern
 c = readFileSync(configPath, 'utf8');
 const simpleRegex = new RegExp(`(${searchKey}:\\s*)'[^']*'`, 'g');
 c = c.replace(simpleRegex, `$1'${newValue}'`);
 } else {
 c = readFileSync(configPath, 'utf8');
 c = c.replace(regex, `$1${newValue}'`);
 }
 
 writeFileSync(configPath, c, 'utf8');

 const BackButton = new ButtonBuilder({ customId: 'ControlPanel-Back', label: '🔙 رجوع للقائمة الرئيسية', style: 2 });
 await Message.reply({ 
 content: `✅ **تم تحديث \`${settingName}\`** بنجاح!\n> المعرف الجديد: \`${newValue}\`\n> ⚠️ **يجب إعادة تشغيل البوت على Railway** لتطبيق التغيير\n-# v${VERSION}`,
 components: [{ type: 1, components: [BackButton] }]
 });
 } catch (e) {
 await Message.reply({ content: `❌ **ERR-006**\n> فشل الحفظ: ${e.message?.slice(0, 200)}\n-# v${VERSION}` });
 }
 }
};

async function showMainMenu(Message) {
 const data = SECTIONS_EXPLAINED.main;
 const Embed = new EmbedBuilder()
 .setTitle(data.title)
 .setColor('#FFD700')
 .setDescription(data.description)
 .addFields(data.fields)
 .setFooter({ text: `v${VERSION} • جميع الصلاحيات الآن تحت رتبة 1525549017960808660` });

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

 await Message.reply({ embeds: [Embed], components: [{ type: 1, components: [Menu] }] });
}

async function showAllSettings(Message) {
 const { CommandPremission, TicketTf3el, Tickets2Sm, TicketT2dem, LogPoint, Dissenting, Reporting, Employment, Identity, AlShuri, Police, CivilRegistry } = await import('../../Files〡[Config]/Files〡[Config].js');
 
 const Embed = new EmbedBuilder()
 .setTitle('📋 جميع إعدادات البوت الحالية')
 .setColor('#00FF00')
 .addFields(
 { name: '🏷️ صلاحيات الأوامر', value: `نداء: ${CommandPremission.Call}\nاعلانات: ${CommandPremission.Ads}\nنقاط: ${CommandPremission.AddPoint}\nخط: ${CommandPremission.Line}\nادارة: ${CommandPremission.SetupAdara}\nتكت: ${CommandPremission.SetupTicket}\nتوظيف: ${CommandPremission.Employment}\nعقوبات: ${CommandPremission.CreateDissenting}\nمخالف: ${CommandPremission.M5alf}\nفك: ${CommandPremission.Remove5alf}` },
 { name: '🎫 التذاكر', value: `دعم تفعيل: ${TicketTf3el.Support}\nمشرف تفعيل: ${TicketTf3el.Management}\nاونر: ${TicketTf3el.Owner}\nدعم مساعدة: ${Tickets2Sm.Help.Support}\nدعم شكاوى: ${Tickets2Sm.El4away.Support}` },
 { name: '📢 القنوات', value: `لوق نقاط: ${LogPoint.Channel}\nعقوبات: ${Dissenting.Channel}\nبلاغات: ${Reporting.Channel}\nتوظيف: ${Employment.Channel}\nهوية: ${Identity.Channel}` },
 { name: '🏛️ الشورى', value: `ديمقراطي: ${AlShuri.Democratic}\nجمهوري: ${AlShuri.Republican}\nرئيس: ${AlShuri.Leader}\nنائب: ${AlShuri.Deputy}` },
 )
 .setFooter({ text: `v${VERSION}` });

 const BackButton = new ButtonBuilder({ customId: 'ControlPanel-Back', label: '🔙 رجوع للقائمة الرئيسية', style: 2 });
 await Message.reply({ embeds: [Embed], components: [{ type: 1, components: [BackButton] }] });
}