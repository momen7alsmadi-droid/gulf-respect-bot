"use strict";
import { ButtonBuilder, EmbedBuilder } from 'discord.js';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
export default {
    name: 'تسطيب-الشوري',
    description: "تسطيب بانل الشوري",
    Founder: false,
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        // ✅ تم إلغاء التحقق من الصلاحية
        const Embed = new EmbedBuilder();
        Embed.setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
        Embed.setColor(Message.guild.members.me.displayHexColor);
        Embed.setImage(`https://i.postimg.cc/85XCjPCV/zip_3.jpg`)
        Embed.setDescription(`**__
ــشــكــراً لــاهــتــمــامــك بــوطــنــك وــحــرصــك عــلــى تــطــويــر الــتــشــريــعــات فــي قولف ريسبكت.

نــحــن نــثــمــن جــهــودــك كــعــضــو فــي الــبــرلــمــان وــنــدعــوك لــمــواصــلــة الــعــمــل الــجــاد لــتــحــقــيــق الــمــصــلــحــة الــعــامــة.

ــحــول زر “ــرفــع مــشــروع قــرار”:
هــذا الــزر يــتــيــح لــك تــقــديــم مــشــروع قــرار جــديــد لــلــبــرلــمــان.

ــيــُــرجــى الــتــأكــد مــن أن مــشــروع الــقــرار:
    1.    يــخــدم مــصــلــحــة الــدولــة وــالــمــجــتــمــع.
    2.    يــتــمــاشــى مــع قــوانــيــن وــتــشــريــعــات قولف ريسبكت.
    3.    يــرفــق بــبــيــان تــوضــيــحــي يُــبــرز أهــمــيــة الــقــرار وــأهــدافــه.
    4.    يــشــمــل الــتــفــاصــيــل الــلازمــة لــتــســهــيــل الــمــنــاقــشــة وــالــتــصــويــت.

ــمــلاحــظــة:
يــُــرجــى مــراجــعــة الــشــروط بــعــنــايــة وــالــتــأكــد مــن أن مــشــروع الــقــرار واضــح وــمــكــتــمــل، حــيــث يــُــعــد ذلــك خــطــوة أســاســيــة لــضــمــان مــنــاقــشــة فــعــالــة داخــل الــبــرلــمــان.

نــحــن هــنــا لــدعــمــك دائــمــاً وــنــتــمــنــى لــك الــتــوفــيــق فــي إثــراء الــبــرلــمــان بــمــبــادرتــك الــمــمــيــزة!
__**`);
        const AlShuriPoint = new ButtonBuilder({ customId: 'Al-Shuri-Setup', label: 'رفــع مــشــروع قــرار', style: 2, emoji: '<:GuLFResPecT:1416435232369934338>' });
        await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [AlShuriPoint] }] });
    }
}