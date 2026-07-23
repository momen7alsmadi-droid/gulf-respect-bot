"use strict";
import { Founder, Owners, VERSION, ERR } from '../Files〡[Config]/Files〡[Config].js';
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
	try {
		await Commands.run(Client, Message, Prefix);
	} catch (err) {
		console.error(`❌ [${ERR.GENERAL}] Error in command "${Command}":`, err.message);
		await Message.reply({ 
			content: `❌ **خطأ ${ERR.GENERAL}**\n> فشل تنفيذ الأمر \`${Prefix}${Command}\`\n> السبب: ${err.message?.slice(0, 200)}\n-# الإصدار: ${VERSION}` 
		}).catch(() => {});
	}
};