"use strict";
import { EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
export default {
 name: 'تقديمات',
 description: "ارسال بانل االتقديمات",
 /**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Message } Message
 */
 run: async (Client, Message) => {
 // ✅ تم إلغاء التحقق من الصلاحية
 const Embed = new EmbedBuilder();
 Embed.setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setImage(`https://i.postimg.cc/85XCjPCV/zip_3.jpg`)
 Embed.setDescription(`__**– GULF RESPECT VRP || 30𝗸 .
 – لـوحـة تقديمات دولة قولف ريسبكت .

 — يُـرجـى اخـتـيـار الـوظـيـفـة المراد التقديم لها .

 – مكتب التوظيف في دولة قولف ريسبكت .
**__`)
 const StringMenu = new StringSelectMenuBuilder({ customId: 'Submissions-Menu', placeholder: 'اختر الوظيفة' })
 StringMenu.addOptions([
 { label: 'تـقـديـم・الـداخـلـيـة', description: 'تقديم الـداخـلـيـة', value: 'Internal' },
 { label: 'تـقـديـم・الـعـصـابـات', description: 'تقديم الـعـصـابـات', value: 'Gangs' },
 { label: 'تـقـديـم・الإعـلام', description: 'تقديم الإعـلام', value: 'Media' },
 { label: 'تـقـديـم・الـعـدل', description: 'تقديم الـعـدل', value: 'Justice' },
 { label: 'تـقـديـم・الـبـرلـمـان', description: 'تقديم الـبـرلـمـان', value: 'Consultation' },
 { label: 'تـقـديـم・الـهـيـئـة', description: 'تقديم الـهـيـئـة', value: 'Authority' },
 { label: 'تـقـديـم・إسـتـقـالـة', description: 'تقديم إسـتـقـالـة', value: 'Resignation' },
 ])
 await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [StringMenu] }] });
 }
}