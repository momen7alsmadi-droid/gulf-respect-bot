"use strict";
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { Roles } from '../../Files〡[Config]/Files〡[Config].js';

export default {
 name: "رولات",
 description: "اعطاء او ازالة رولات",
 type: ApplicationCommandOptionType.Subcommand,
 options: [
 {
 name: "العضو",
 description: "يرجى كتابة اليوزر او منشن او ايدي",
 type: ApplicationCommandOptionType.User,
 required: true
 },
 {
 name: "رولات",
 description: "اعطاء او ازالة رولات",
 type: ApplicationCommandOptionType.String,
 required: true,
 choices: [
 { name: 'اضافة', value: 'add' },
 { name: 'ازالة', value: 'remove' },
 ]
 },
 {
 name: "قسم-رولات",
 description: "يرجى اختيار القسم",
 type: ApplicationCommandOptionType.String,
 required: true,
 choices: [
 { name: 'الإدارة', value: 'Admins' },
 { name: 'المناصب', value: 'positions' },
 { name: 'العصابات', value: 'Gangs' },
 { name: 'العامة', value: 'General' },
 ]
 }
 ],

 /**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').ChatInputCommandInteraction } Message
 */
 run: async function (Client, Message) {
 const UserAdmin = Message.guild.members.cache.get(Message.user.id);
 if (!UserAdmin.roles.cache.some(role => ['1387331972094890036', '1387331972094890036' , '1387331972094890036'].includes(role.id))) return Message.reply({ content: `**ليس لديك الصلاحية لتنفيذ هذا الامر**`, flags: 64 });
 const Member = Message.options.getUser('العضو');
 const Action = Message.options.getString('رولات');
 const RoleSection = Message.options.getString('قسم-رولات');
 const GuildMember = await Message.guild.members.fetch(Member.id).catch(() => null);
 const sectionNames = {
 Admins: 'الإدارة',
 positions: 'المناصب',
 Gangs: 'العصابات',
 General: 'العامة'
 };
 const Replace = sectionNames[RoleSection] || RoleSection;
 if (!GuildMember) return Message.reply({ content: `**لم يتم العثور على العضو في السيرفر**`, flags: 64 });
 if (Member.bot) return Message.reply({ content: `**لا يمكن اعطاء رولات للبوتات**`, flags: 64 });
 const sectionRoles = Roles[RoleSection] || [];
 if (!sectionRoles.length) return Message.reply({ content: `**لا توجد رولات في هذا القسم**`, flags: 64 });
 let rolesToProcess = [];
 if (Action === 'add') {
 rolesToProcess = sectionRoles.filter(id => !GuildMember.roles.cache.has(id));
 } else {
 rolesToProcess = sectionRoles.filter(id => GuildMember.roles.cache.has(id));
 }
 if (!rolesToProcess.length) {
 return Message.reply({ content: `**لا توجد رولات ${Action === 'add' ? 'للإضافة' : 'للإزالة'} للعضو ${Member} في قسم ${Replace}**`, flags: 64 });
 }
 const selectMenus = [];
 const maxOptionsPerMenu = 25;
 for (let i = 0; i < rolesToProcess.length; i += maxOptionsPerMenu) {
 const chunk = rolesToProcess.slice(i, i + maxOptionsPerMenu);
 const options = await Promise.all(chunk.map(async roleId => {
 const role = await Message.guild.roles.fetch(roleId).catch(() => null);
 if (!role) return null;
 return {
 label: role.name,
 value: roleId,
 description: `${Action === 'add' ? 'إضافة' : 'إزالة'} رول ${role.name}`,
 default: false
 };
 }));
 const validOptions = options.filter(o => o);
 if (validOptions.length) {
 selectMenus.push({
 type: 3,
 custom_id: `role_${Action}_${RoleSection}_${i / maxOptionsPerMenu}`,
 placeholder: `اختر الرولات`,
 options: validOptions,
 min_values: 1,
 max_values: validOptions.length
 });
 }
 }
 const maxMenusPerMessage = 5;
 const messageCount = Math.ceil(selectMenus.length / maxMenusPerMessage);
 for (let idx = 0; idx < messageCount; idx++) {
 const batch = selectMenus.slice(idx * maxMenusPerMessage, (idx + 1) * maxMenusPerMessage);
 const components = batch.map(menu => ({ type: 1, components: [menu] }));
 const content = idx === 0
 ? `**الرجاء اختيار الرولات التي تريد ${Action === 'add' ? 'إضافتها' : 'إزالتها'} للعضو ${Member} من قسم ${Replace}**`
 : `**المزيد من الرولات (${idx + 1}/${messageCount})**`;
 if (idx === 0) {
 await Message.reply({ content, components, flags: 64 });
 } else {
 await Message.followUp({ content, components, flags: 64 });
 }
 }

 // معالج الاختيارات
 const filter = (interaction) => {
 return interaction.customId.startsWith(`role_${Action}_${RoleSection}`) && interaction.user.id === Message.user.id;
 };

 const collector = Message.channel.createMessageComponentCollector({
 filter,
 time: 300000 // 5 دقائق
 });

 collector.on('collect', async (interaction) => {
 try {
 const selectedRoles = interaction.values;
 
 // تطبيق الرولات على العضو
 if (Action === 'add') {
 await GuildMember.roles.add(selectedRoles);
 } else {
 await GuildMember.roles.remove(selectedRoles);
 }

 // جلب أسماء الرولات المطبقة فقط
 const appliedRoleNames = await Promise.all(selectedRoles.map(async roleId => {
 const role = await Message.guild.roles.fetch(roleId).catch(() => null);
 return role ? role.name : roleId;
 }));

 // إرسال رسالة التأكيد للمستخدم
 await interaction.reply({
 content: `**تم ${Action === 'add' ? 'إضافة' : 'إزالة'} الرولات بنجاح ✅**`,
 flags: 64
 });

 // إرسال الرسالة في القناة المخصصة
 if (Action === 'add') {
 const Channel = Message.guild.channels.cache.get('1387331972094890036');
 if (Channel) {
 const Embed = new EmbedBuilder()
 .setColor(Message.guild.members.me.displayColor)
 .setDescription(`** تم اعطاء الرتب هذي من قبل : <@${Message.user.id}>


الشخص اللي وصلت له الرتبه : <@${Member.id}>


الرتب المعطاه : ${appliedRoleNames.join(', ')} **`)
 .setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) })
 .setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 await Channel.send({ embeds: [Embed] });
 }
 } else {
 const Channel = Message.guild.channels.cache.get('1387331972094890036');
 if (Channel) {
 const Embed = new EmbedBuilder()
 .setColor(Message.guild.members.me.displayColor)
 .setDescription(`** تم سحب الرتب هذي من قبل : <@${Message.user.id}>


الشخص اللي انسحبت منه الرتب : <@${Member.id}>


الرتب المسحوبة : ${appliedRoleNames.join(', ')} **`)
 .setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) })
 .setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 await Channel.send({ embeds: [Embed] });
 }
 }
 } catch (error) {
 console.error('خطأ في تطبيق الرولات:', error);
 if (!interaction.replied && !interaction.deferred) {
 await interaction.reply({
 content: `**حدث خطأ أثناء ${Action === 'add' ? 'إضافة' : 'إزالة'} الرولات ❌**`,
 flags: 64
 });
 }
 }
 });

 collector.on('end', () => {
 // يمكن إضافة رسالة هنا عند انتهاء وقت الاختيار
 });
 }
};
