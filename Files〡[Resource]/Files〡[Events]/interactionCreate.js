"use strict";
import { Founder, Owners } from '../Files〡[Config]/Files〡[Config].js';
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
    // ✅ تمكين المالك من تجاوز جميع صلاحيات الرولات
    if (Message.guild) {
        const userId = Message.user?.id || Message.author?.id;
        if (Owners.includes(userId) || userId === Founder) {
            // تجاوز fetch الأعضاء تلقائياً
            const originalFetch = Message.guild.members.fetch.bind(Message.guild.members);
            Message.guild.members.fetch = async function(...args) {
                const member = await originalFetch(...args);
                if (member?.id === userId) {
                    if (member.roles?.cache) {
                        member.roles.cache.has = () => true;
                        member.roles.cache.some = () => true;
                    }
                }
                return member;
            };
            // تجاوز العضو الحالي
            if (Message.member?.roles?.cache) {
                Message.member.roles.cache.has = () => true;
                Message.member.roles.cache.some = () => true;
            }
        }
    }

    // ! - Title : Running Emit Files
    Client.emit('Ticket〡[Tf3el]', (Client, Message)) // ! - Title : Running File Basics
    Client.emit('Ticket〡[Tlp-Owner]', (Client, Message)) // ! - Title : Running File Tlp-Owner
    Client.emit('Ticket〡[Help]', (Client, Message)) // ! - Title : Running File Help
    Client.emit('Ticket〡[El4akway]', (Client, Message)) // ! - Title : Running File El4away
    Client.emit('Ticket〡[T2dem-Admin]', (Client, Message)) // ! - Title : Running File T2dem-Admin
    Client.emit('Ticket〡[M7kma]', (Client, Message)) // ! - Title : Running File M7kma
    Client.emit('System〡[Tf3el]', (Client, Message)) // ! - Title : Running File Tf3el
    Client.emit('Ticket〡[He2a]', (Client, Message)) // ! - Title : Running File He2a
    Client.emit('System〡[Adara]', (Client, Message)) // ! - Title : Running File Adara
    Client.emit('System〡[Ads]', (Client, Message)) // ! - Title : Running File Ads
    Client.emit('System〡[Panel-ID]', (Client, Message)) // ! - Title : Running File Panel-ID
    Client.emit('System〡[Submissions]', (Client, Message)) // ! - Title : Running File Submissions
    Client.emit('System〡[Panel-Police]', (Client, Message)) // ! - Title : Running File Panel-Police
    Client.emit('System〡[Panel-Violations]', (Client, Message)) // ! - Title : Running File Panel-Violations
    Client.emit('System〡[Panel-Report]', (Client, Message)) // ! - Title : Running File Panel-Report
    Client.emit('System〡[Panel-CivilRegistry]', (Client, Message)) // ! - Title : Running File Panel-CivilRegistry
    Client.emit('System〡[Al-Shuri]', (Client, Message)) // ! - Title : Running File Al-Shuri
    Client.emit('System〡[Employment]', (Client, Message)) // ! - Title : Running File Employment
    Client.emit('System〡[Retirement]', (Client, Message)) // ! - Title : Running File Retirement
    Client.emit('System〡[Evaluation]', (Client, Message)) // ! - Title : Running File Evaluation
    Client.emit('System〡[Circulars]', (Client, Message)) // ! - Title : Running File Circulars
    // ! - Title : Running System Slash Command
    if (Message.isChatInputCommand()) {
        if (!Message?.guild) return
        const Command = Client.SlashCommand.get(Message.commandName);
        if (!Command) return;
        Command.run(Client, Message);
    }
}