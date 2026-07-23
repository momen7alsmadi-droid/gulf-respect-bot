"use strict";
import { EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder } from 'discord.js';
import { readFileSync } from 'fs';
import { VERSION } from '../Files〡[Config]/Files〡[Config].js';

const CONFIG_PATH = 'Files〡[Resource]/Files〡[DataBase]/Files〡[Config].json';
const OWNERS = ['1387331972094890036', '1154021789148659813'];

const SECTIONS = {
    basic: { name: '⚙️ أساسيات', keys: ['GuildID','Founder'] },
    perms: { name: '🏷️ صلاحيات الأوامر', keys: ['CommandPremission.Call','CommandPremission.Ads','CommandPremission.AddPoint','CommandPremission.Line','CommandPremission.SetupAdara','CommandPremission.SetupID','CommandPremission.SetupSubmissions','CommandPremission.SetupTicket','CommandPremission.Al_ShuriSetup','CommandPremission.CreateDissenting','CommandPremission.M5alf','CommandPremission.Remove5alf','CommandPremission.Employment'] },
    tickets: { name: '🎫 التذاكر', keys: ['TicketTf3el.Support','TicketTf3el.Management','TicketTf3el.Owner','TicketTf3el.Parent','TicketTf3el.ChannelLog','Tickets2Sm.Owner.Owner','Tickets2Sm.Help.Support','Tickets2Sm.Help.Management','Tickets2Sm.El4away.Support','Tickets2Sm.El4away.Permission','TicketT2dem.Support','TicketHe2a.Support','TicketHe2a.Management'] },
    police: { name: '👮 الشرطة', keys: ['Police.Panel','Police.PanelM5alfat','Police.PanelReport'] },
    shuri: { name: '🏛️ الشورى', keys: ['AlShuri.Democratic','AlShuri.Republican','AlShuri.Role','AlShuri.Leader','AlShuri.Deputy','AlShuri.Channel','AlShuri.VoteChannel'] },
    channels: { name: '📢 القنوات', keys: ['LogPoint.Channel','Identity.Channel','Dissenting.Channel','Reporting.Channel','Employment.Channel','Dissenting.Role','Reporting.Role'] },
};

function isOwner(id) { return OWNERS.includes(id); }

export default async function (Client, Message) {
    const uid = Message.user?.id || Message.author?.id;
    if (!isOwner(uid)) return;

    // زر رجوع
    if (Message.isButton() && Message.customId === 'CtrlBack') {
        await Message.deferUpdate();
        const Embed = new EmbedBuilder().setTitle('🛡️ لوحة التحكم').setColor('#FFD700')
            .setDescription('اختر قسماً من القائمة أدناه')
            .addFields(Object.entries(SECTIONS).map(([k,v]) => ({ name: v.name, value: `${v.keys.length} إعداد`, inline: true })))
            .setFooter({ text: `v${VERSION} • للتعديل: =تحكم <المفتاح> <القيمة>` });
        const Menu = new StringSelectMenuBuilder().setCustomId('CtrlCat').setPlaceholder('اختر قسماً...')
            .addOptions(Object.entries(SECTIONS).map(([k,v]) => ({ label: v.name, value: k, description: `${v.keys.length} إعداد` })));
        await Message.update({ embeds: [Embed], components: [{ type: 1, components: [Menu] }] }).catch(() => {});
        return;
    }

    // اختيار قسم
    if (Message.isStringSelectMenu() && Message.customId === 'CtrlCat') {
        await Message.deferUpdate();
        const sec = SECTIONS[Message.values[0]];
        if (!sec) return;
        const cfg = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
        const items = sec.keys.map(k => {
            const parts = k.split('.');
            let v = cfg;
            for (const p of parts) v = v?.[p];
            return `**\`${k}\`** = \`${v || 'فارغ'}\``;
        }).join('\n');
        const Embed = new EmbedBuilder().setTitle(sec.name).setColor('#FFD700').setDescription(items)
            .setFooter({ text: 'للتعديل: =تحكم <المفتاح> <القيمة> • v' + VERSION });
        const Back = new ButtonBuilder().setCustomId('CtrlBack').setLabel('🔙 رجوع').setStyle(2);
        await Message.update({ embeds: [Embed], components: [{ type: 1, components: [Back] }] }).catch(() => {});
        return;
    }

    // توافق مع القديم
    if (Message.isStringSelectMenu() && (Message.customId === 'Control-AllSections' || Message.customId === 'ControlPanel-MainMenu')) {
        await Message.deferUpdate();
        const sec = SECTIONS[Message.values[0]];
        if (!sec && Message.values[0] !== 'show') return;
        if (Message.values[0] === 'show') {
            const cfg = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
            const Embed = new EmbedBuilder().setTitle('📋 الإعدادات').setColor('#00FF00')
                .addFields({ name: '🏷️ صلاحيات', value: `نداء: ${cfg.CommandPremission?.Call}\nتكت: ${cfg.CommandPremission?.SetupTicket}` })
                .addFields({ name: '📢 قنوات', value: `لوق: ${cfg.LogPoint?.Channel}\nعقوبات: ${cfg.Dissenting?.Channel}` })
                .setFooter({ text: `v${VERSION}` });
            const Back = new ButtonBuilder().setCustomId('CtrlBack').setLabel('🔙 رجوع').setStyle(2);
            await Message.update({ embeds: [Embed], components: [{ type: 1, components: [Back] }] }).catch(() => {});
            return;
        }
        const cfg = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
        const items = sec.keys.map(k => {
            const parts = k.split('.');
            let v = cfg;
            for (const p of parts) v = v?.[p];
            return `**\`${k}\`** = \`${v || 'فارغ'}\``;
        }).join('\n');
        const Embed = new EmbedBuilder().setTitle(sec.name).setColor('#FFD700').setDescription(items)
            .setFooter({ text: '=تحكم <المفتاح> <القيمة> • v' + VERSION });
        const Back = new ButtonBuilder().setCustomId('CtrlBack').setLabel('🔙 رجوع').setStyle(2);
        await Message.update({ embeds: [Embed], components: [{ type: 1, components: [Back] }] }).catch(() => {});
    }
};