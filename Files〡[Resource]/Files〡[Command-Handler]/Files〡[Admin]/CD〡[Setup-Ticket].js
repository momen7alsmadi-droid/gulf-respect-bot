"use strict";
import { AttachmentBuilder, ButtonBuilder, EmbedBuilder } from 'discord.js';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
export default {
 name: 'تكت',
 description: "تكت تفعيل",
 /**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Message } Message
 */
 run: async (Client, Message) => {
 // ✅ تم إلغاء التحقق من الصلاحية
 const Agrs = Message.content.split(' ');
 const Embed = new EmbedBuilder();
 Embed.setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 switch (Agrs[1]) {
 case 'تفعيل': {
 Embed.setDescription(`**__ — قـسـم الـتـفـعـيـل 
 – مـرحـبـا بـك عـزيـزي الـعـضـو فـي تكت الـتـفـعـيـل

 – لـلـتـفـعـيـل فـي قولف ريسبكت الـرجـاء الـنـقـر عـلـى ( تكت تـفـعـيـل )
 — ويـرجـى الالـتـزام بالانـظـمـة الـمـوضـحـة ادنـاه:
— يـمـنـع تـكـون خـامـل فـي الـتـذكـرة لمـدة 25m

— يـمـنـع الإزعـاج بـالـمـنـشـن 

— يـجـب تـبـادل الاحـتـرام مـع الإداري

 — يـرجـى الالـتـزام بـالـقـوانـيـن الموضحه أعـلاه
__\`\`\`ansi
[2;41m[2;37m 𝗚𝘂𝗹𝗙 𝗥𝗲𝗰𝗣𝗲𝗰𝗧 [0m[2;37m[2;41m[0m[2;41m[0m\`\`\`**`);
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/Tf3el.jpg`, { name: 'Tf3el.jpg' });
 Embed.setImage(`attachment://Tf3el.jpg`)
 const ButtonTF3el = new ButtonBuilder({ customId: 'TF3el-Ticket', label: 'فـعـل — نـفـسـك', style: 2 });
 await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [ButtonTF3el] }], files: [Attachment] });
 } break;
 case 'اونر': {
 Embed.setDescription(`**__
 – مـرحـبـآ بـك عـزيـزي الـعـضـو فـي قـسـم طلب اونر .— يـرجـى الألـتـزام باللائحة الـمـوضـحـة .

1 - أحـتـرام الاونرية .

2 - عـدم تـكـرار الـمـنـشـن .

3 - شـرح إسـتـفـسـارك أو شـكـوتـك .

 – نـرجـوا مـنـك الإلـتـزام بـالـقـوانـيـن وعـدم مـخـالـفـتـهـا__**
\`\`\` 𝗚𝘂𝗹𝗙 𝗥𝗲𝗰𝗣𝗲𝗰𝗧 \`\`\``);
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/Owner.jpg`, { name: 'Owner.jpg' });
 Embed.setImage(`attachment://Owner.jpg`)
 const Button_TlbOwner = new ButtonBuilder({ customId: 'Tickets-TlbOwner', label: 'طلب أونر', style: 2 });
 await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [Button_TlbOwner] }], files: [Attachment] });
 } break;
 case 'المساعدة': {
 Embed.setDescription(`**__
 – مـرحـبـآ بـك عـزيـزي الـعـضـو فـي قـسـم المساعدة .— يـرجـى الألـتـزام باللائحة الـمـوضـحـة .

1 - أحـتـرام الأدارة. 

2 - عـدم تـكـرار الـمـنـشـن .

3 - شـرح إسـتـفـسـارك أو شـكـوتـك .

 — نـرجـوا مـنـك الإلـتـزام بـالـقـوانـيـن وعـدم مـخـالـفـتـهـا__**
\`\`\` 𝗚𝘂𝗹𝗙 𝗥𝗲𝗰𝗣𝗲𝗰𝗧 \`\`\``);
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/Help.jpg`, { name: 'Help.jpg' });
 Embed.setImage(`attachment://Help.jpg`)
 const Button_2SmHelp = new ButtonBuilder({ customId: 'Tickets-2SmHelp', label: 'طـلـب — الـمـسـاعـدة', style: 2 });
 await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [Button_2SmHelp] }], files: [Attachment] });
 } break;
 case 'الشكاوى': {
 Embed.setDescription(`**__— مـرحـبـآ بـك عـزيـزي الـعـضـو فـي قـسـم الشكاوى العامة .— يـرجـى الألـتـزام باللائحة الـمـوضـحـة .

1 – أحـتـرام بين الطرفين.

2 - إيضاح شكواك بالتفصيل.

3 - شـرح شـكـوتـك .

3 - في حال الشكوى على اداري يرجى التوجه إلى طلب أونر.

 — نـرجـوا مـنـك الإلـتـزام بـالـقـوانـيـن وعـدم مـخـالـفـتـهـا__**
\`\`\` 𝗚𝘂𝗹𝗙 𝗥𝗲𝗰𝗣𝗲𝗰𝗧 \`\`\``);
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/El4kaway.jpg`, { name: 'El4kaway.jpg' });
 Embed.setImage(`attachment://El4kaway.jpg`)
 const Button_TlbOwner = new ButtonBuilder({ customId: 'Tickets-El4kawayEl3ama', label: 'رفع شكوى', style: 2 });
 await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [Button_TlbOwner] }], files: [Attachment] });
 } break;
 // !
 case 'تقديم': {
 Embed.setDescription(`**__- تـكـت تـقـديـم إداره

 - مـرحـبـاً بـك عـزيـزي الـعـضـو فـي سـيـرفـر قـولـف ريـسـبـكـت لـلـتـقـديـم عـلـى إدارة قـولـف ريـسـبـكـت قـم بـفـتـح تـكـت 

 - مـلاحـظـة

1-يـرجـى تـعـبـئـه الاسـتـبـيـان كـامـل

2- اذا تـم قـبـولـك يـرجـى الإسـتـعـداد لـ الـقـسـم 

3- اذا تـم قـبـولـك يـرجـى الالـتـزام ب الـقـوانـيـن كـامـلـة

- مـتـمـنـيـن لـكـم اوقـات مـمـتـعـه فـي قـولـف ريـسـبـكـت __**`);
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/T2dem.jpg`, { name: 'T2dem.jpg' });
 Embed.setImage(`attachment://T2dem.jpg`)
 const Button_T2demAdmin = new ButtonBuilder({ customId: 'Tickets-T2demAdmin', label: 'تقديم ادارة', style: 2 });
 await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [Button_T2demAdmin] }], files: [Attachment] });
 } break;
 case 'محكمة': {
 const Embed = new EmbedBuilder();
 Embed.setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setDescription(`**__— مـرحـبـاً بـك فـي وزارة الـعـدل .

 — لـرفـع قـضـيـة عـامـة أو جـنـائـيـة تـفـضـل بـرفـع ذلـك لـوزارة الـعـدل مـع كـامـل الـتـفـاصـيـل .

 — لـطـلـب مـحـامـي فـي أي قـضـيـة كـانـت يـمـكـنـك طـلـب ذلـك بـالـزر بالأسـفـل

— مـع تـحـيـات وزارة الـعـدل . __**`);
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/M7kma.jpg`, { name: 'M7kma.jpg' });
 Embed.setImage(`attachment://M7kma.jpg`)
 const TlbMo7my = new ButtonBuilder({ customId: 'TlbMo7my-Ticket', label: 'طلب-محامي', style: 2 });
 const Rf32dea = new ButtonBuilder({ customId: 'Rf32dea-Ticket', label: 'رفع قضيه', style: 2 });
 await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [TlbMo7my, Rf32dea] }], files: [Attachment] });
 } break;
 case 'هيئة': {
 const Embed = new EmbedBuilder();
 Embed.setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setThumbnail('https://i.postimg.cc/zv92XWYR/png.webp');
 Embed.setDescription(`**__ — مـرحـبـاً فـي هـيـئـة مـكـافـحـة الـفـسـاد 

— عـنـد رؤيـة اي فـسـاد فـي اي جـهـة كـانـت يـمـكـنـك تـقـديـم الـبـلاغ __**`);
 const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/He2a.jpg`, { name: 'He2a.jpg' });
 Embed.setImage(`attachment://He2a.jpg`)
 const He2a = new ButtonBuilder({ customId: 'He2a-Ticket', label: 'تبليغ هيئة', style: 2 });
 await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [He2a] }], files: [Attachment] });
 } break;
 default: {
 return Message.reply({ content: `**📋 استخدام الأمر:**\n\`=تكت تفعيل\` - لوحة تذاكر التفعيل\n\`=تكت اونر\` - لوحة تذاكر طلب أونر\n\`=تكت المساعدة\` - لوحة تذاكر المساعدة\n\`=تكت الشكاوى\` - لوحة تذاكر الشكاوى\n\`=تكت تقديم\` - لوحة تذاكر تقديم إدارة\n\`=تكت محكمة\` - لوحة تذاكر المحكمة\n\`=تكت هيئة\` - لوحة تذاكر هيئة مكافحة الفساد` });
 }
 }
 }
}