"use strict";
import { Founder, Owners } from '../Files〡[Config]/Files〡[Config].js';
/**
* @param { import('discord.js').Client } Client
* @param { import('discord.js').Message } Message
*/
export default async (Client, Message) => {
	// ✅ تمكين المالك من تجاوز جميع صلاحيات الرولات
	if (Message.member?.roles?.cache && (Owners.includes(Message.author.id) || Message.author.id === Founder)) {
		Message.member.roles.cache.has = () => true;
		Message.member.roles.cache.some = () => true;
	}

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