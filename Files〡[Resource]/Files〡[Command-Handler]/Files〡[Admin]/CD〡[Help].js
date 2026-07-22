"use strict";
import { EmbedBuilder } from 'discord.js';
export default {
    name: 'help',
    description: "قائمة الأوامر",
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message, { Prefix }) => {
        const commands = Client.Command.map(command => { return `**\`#\` : \`${command.name}\` 〡 ${command.description}**` }).join('\n');
        const Embed = new EmbedBuilder();
        Embed.setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
        Embed.setColor(Message.guild.members.me.displayHexColor);
        Embed.setDescription(commands);
        await Message.reply({ embeds: [Embed] });
    }
}