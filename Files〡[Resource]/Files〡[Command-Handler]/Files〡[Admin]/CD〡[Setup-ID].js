"use strict";
import { ButtonBuilder, EmbedBuilder } from 'discord.js';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
export default {
    name: 'سيطب-الهوية',
    description: "بانل الهويات",
    Founder: false,
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
            case 'تقديم-هوية': {
                const Buttons = [
                    new ButtonBuilder({ customId: 'ID〡Submit', label: 'تقديم هوية', style: 2, emoji: '<:GulfRecPecT:1415805541699158097>' }),
                    new ButtonBuilder({ customId: 'ID〡View', label: 'عرض هوية شخص اخر', style: 2, emoji: '<:GulfRecPecT:1415805541699158097>' })
                ]
                Embed.setDescription(`**__إنشاء هوية وطنية

<a:GulfRecPecT:1415964745017724990> — اهلاً بك عزيزي العضو

<:GulfRecPecT:1416209216024084641> — لإنشاء هوية يرجى النقر على(انشاء-هوية)

 لـعـرض بـطـاقـة شـخـص آخـر أنـقـر عـلـى (عـرض هـويـة شـخـص)__**`);
Embed.setImage(`https://i.postimg.cc/XYTXddyv/81f0fb1178d76250.png`)
                await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: Buttons }] });
            } break;
            case 'عرض-هوية': {
                const Buttons = [
                    new ButtonBuilder({ customId: 'ID〡My', label: 'عرض هويتي', style: 2, emoji: '' })
                ]
                Embed.setDescription(`**__عرض هوية وطنية

— اهلاً بك عزيزي العضو

— لـعـرض هويتك أنـقـر عـلـى (عـرض هـويـتي)__**`);
                await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: Buttons }] });
            } break;
        }
    }
}