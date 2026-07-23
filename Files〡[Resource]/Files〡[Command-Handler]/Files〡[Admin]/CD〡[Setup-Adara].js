"use strict";
import { ButtonBuilder, EmbedBuilder } from 'discord.js';

export default {
    name: 'سيطب-ادارة',
    description: "سيطب ادارة",
    run: async (Client, Message) => {
        try {
            const Embed = new EmbedBuilder()
                .setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL() })
                .setColor('#FFD700')
                .setDescription(`**لوحة الادارة**\n\nاهلاً بك عزيزي الاداري بلوحة الادارة\n\n- نقاطي: لرؤية نقاطك\n- شعار الادارة: لوضع الشعار على اسمك\n- افتار الادارة: لوضع اطار على افتارك\n- توب نقاط: لرؤية توب النقاط\n- رؤية نقاط اداري: لرؤية نقاط اداري آخر`);

            const buttons = [
                new ButtonBuilder({ customId: 'Adara-Point', label: 'نقاطي', style: 2 }),
                new ButtonBuilder({ customId: 'Adara-43ar', label: 'شعار الادارة', style: 2 }),
                new ButtonBuilder({ customId: 'Adara-Afitar', label: 'افتار الادارة', style: 2 }),
                new ButtonBuilder({ customId: 'Adara-Top', label: 'توب نقاط', style: 2 }),
                new ButtonBuilder({ customId: 'Adara-Point-Admin', label: 'رؤية نقاط اداري', style: 2 }),
            ];

            await Message.channel.send({ 
                embeds: [Embed], 
                components: [{ type: 1, components: buttons }] 
            });
        } catch (err) {
            await Message.reply({ 
                content: `❌ ERR-103: ${err.message?.slice(0, 200)}` 
            }).catch(() => {});
        }
    }
};