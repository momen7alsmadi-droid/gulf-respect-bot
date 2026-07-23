"use strict";
import { EmbedBuilder } from 'discord.js';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
import { JsonDatabase } from 'wio.db';
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Al-Shuri].json' })
export default {
    name: 'بانل-شوري',
    description: "اضافة نقاط للاداريين",
    Founder: false,
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        // ✅ تم إلغاء التحقق من الصلاحية
        const Embed = new EmbedBuilder()
        Embed.setColor(Message.guild.members.me.displayHexColor);
        Embed.setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ extension: 'png' }) });
        Embed.setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL({ extension: 'png' }) });
        Embed.setImage(`https://i.postimg.cc/85XCjPCV/zip_3.jpg`)
        Embed.setDescription(`**__ أعـضـاء مـجـلـس الـنـواب فـي وولـف سـيـتـي__**
**
— رئـيـس الـمـجـلـس :

— نـائـب الـمـجـلـس :

— الـحـزب الديموقراطي :

— الـحـزب الـجـمـهـوري :**`);
        const MessageID = await Message.channel.send({ embeds: [Embed] });
        Database.set(`Al-Shuri-Panel〡`, { MessageID: MessageID.id, ChannelID: Message.channel.id });
    }
}