"use strict";
import { ButtonBuilder, EmbedBuilder } from 'discord.js';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
export default {
 name: 'سيطب-ادارة',
 description: "سيطب ادارة",
 /**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Message } Message
 */
 run: async (Client, Message) => {
 // ✅ تم إلغاء التحقق من الصلاحية
 const Embed = new EmbedBuilder();
 Embed.setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setImage(`https://cdn.discordapp.com/attachments/1420678812374532198/1443382907484897320/zip_-_3.jpg?ex=693d4dd5&is=693bfc55&hm=e8aec1be463b3df2b428000d58800ddb4a4b5007b4c6b95fdab138735cd27fe4&`)
 Embed.setDescription(`__** — لوحة الادارة

\`اهلاً بك عزيزي الإداري ب لوحة الادارة\`

 — لرؤية نقاطك يرجى النقر على (نقاطي)

 — ل وضع شعار الادارة على اسمك يرجى النقر على (شعار الادارة)

 — لوضع إطار الادارة على افتارك يرجى النقر على (أفتار الادارة )

 — لرؤية نقاط اداري آخر يرجى الضغط على ( رؤية نقاط اداري)

 — لرؤية توب النقاب في الادارة او المتصدرين يرجى الضغط على ( توب نقاط )**__`);
 const AdaraPoint = new ButtonBuilder({ customId: 'Adara-Point', label: 'نقاطي', style: 2 });
 const Adara43ar = new ButtonBuilder({ customId: 'Adara-43ar', label: 'شعار الادارة', style: 2 });
 const AdaraAfitar = new ButtonBuilder({ customId: 'Adara-Afitar', label: 'أفتار الادارة ', style: 2 });
 const TopPoint = new ButtonBuilder({ customId: 'Adara-Top', label: 'توب نقاط', style: 2 });
 const Point = new ButtonBuilder({ customId: 'Adara-Point-Admin', label: 'رؤية نقاط اداري', style: 2 });
 await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [AdaraPoint, Adara43ar, AdaraAfitar, TopPoint, Point] }] });
 }
}