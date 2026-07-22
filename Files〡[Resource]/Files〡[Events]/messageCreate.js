"use strict";
import { Founder } from '../Files〡[Config]/Files〡[Config].js';
/**
* @param { import('discord.js').Client } Client
* @param { import('discord.js').Message } Message
*/
export default async (Client, Message) => {
	const Prefix = Client.Prefix;
	const MessageContent = Message.content;
	const WithoutPrefix = MessageContent.startsWith(Prefix) ? MessageContent.slice(Prefix.length).trim() : null
	const Args = WithoutPrefix ? WithoutPrefix.split(/ +/) : null
	const Command = Args ? Args.shift().toLowerCase() : null
	if (Message.author.bot || !Message.guild) return;
	const Commands = await Client.Command.get(Command) || await Client.Command.find((Cmd) => Cmd.aliases && Cmd.aliases.includes(Command));
	if (!Commands) return;
	if (Commands.Founder) {
		if (!Founder.includes(Message.author.id)) return
	}
	await Commands.run(Client, Message, Prefix);
};