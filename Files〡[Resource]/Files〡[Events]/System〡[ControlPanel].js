"use strict";
import { EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder } from 'discord.js';
import { readFileSync } from 'fs';
import { VERSION } from '../Files〡[Config]/Files〡[Config].js';

const CONFIG_PATH = 'Files〡[Resource]/Files〡[DataBase]/Files〡[Config].json';

function getConfig() { return JSON.parse(readFileSync(CONFIG_PATH, 'utf8')); }

const ALL_OPTIONS = {
    'GuildID': { section: 'basic', name: 'آيدي السيرفر' },
    'Founder': { section: 'basic', name: 'آيدي المالك' },
    'CommandPremission.Call': { section: 'perms', name: 'النداء' },
    'CommandPremission.Ads': { section: 'perms', name: 'الإعلانات' },
    'CommandPremission.AddPoint': { section: 'perms', name: 'النقاط' },
    'CommandPremission.Line': { section: 'perms', name: 'الخط' },
    'CommandPremission.SetupAdara': { section: 'perms', name: 'الإدارة' },
    'CommandPremission.SetupID': { section: 'perms', name: 'الهوية' },
    'CommandPremission.SetupSubmissions': { section: 'perms', name: 'التقديمات' },
    'CommandPremission.SetupTicket': { section: 'perms', name: 'التذاكر' },
    'CommandPremission.Al_ShuriSetup': { section: 'perms', name: 'الشورى' },
    'CommandPremission.CreateDissenting': { section: 'perms', name: 'العقوبات' },
    'CommandPremission.M5alf': { section: 'perms', name: 'مخالف' },
    'CommandPremission.Remove5alf': { section: 'perms', name: 'فك' },
    'CommandPremission.Employment': { section: 'perms', name: 'التوظيف' },
    'TicketTf3el.Support': { section: 'tickets', name: 'دعم التفعيل' },
    'TicketTf3el.Management': { section: 'tickets', name: 'مشرف التفعيل' },
    'TicketTf3el.Owner': { section: 'tickets', name: 'أونر التذاكر' },
    'TicketTf3el.Parent': { section: 'tickets', name: 'كاتجوري التفعيل' },
    'TicketTf3el.ChannelLog': { section: 'tickets', name: 'لوق التذاكر' },
    'Tickets2Sm.Owner.Owner': { section: 'tickets', name: 'رتبة الأونر' },
    'Tickets2Sm.Help.Support': { section: 'tickets', name: 'دعم المساعدة' },
    'Tickets2Sm.Help.Management': { section: 'tickets', name: 'مشرف المساعدة' },
    'Tickets2Sm.El4away.Support': { section: 'tickets', name: 'دعم الشكاوى' },
    'Tickets2Sm.El4away.Permission': { section: 'tickets', name: 'قيادة الشكاوى' },
    'TicketT2dem.Support': { section: 'tickets', name: 'دعم تقديم الإدارة' },
    'TicketHe2a.Support': { section: 'tickets', name: 'دعم الهيئة' },
    'TicketHe2a.Management': { section: 'tickets', name: 'مشرف الهيئة' },
    'Police.Panel': { section: 'police', name: 'لوحة العساكر' },
    'Police.PanelM5alfat': { section: 'police', name: 'لوحة المخالفات' },
    'Police.PanelReport': { section: 'police', name: 'لوحة البلاغات' },
    'AlShuri.Democratic': { section: 'shuri', name: 'الحزب الديمقراطي' },
    'AlShuri.Republican': { section: 'shuri', name: 'الحزب الجمهوري' },
    'AlShuri.Role': { section: 'shuri', name: 'رول الشورى' },
    'AlShuri.Leader': { section: 'shuri', name: 'رئيس المجلس' },
    'AlShuri.Deputy': { section: 'shuri', name: 'نائب الرئيس' },
    'AlShuri.Channel': { section: 'shuri', name: 'قناة الشورى' },
    'AlShuri.VoteChannel': { section: 'shuri', name: 'قناة التصويت' },
    'LogPoint.Channel': { section: 'channels', name: 'لوق النقاط' },
    'Identity.Channel': { section: 'channels', name: 'قناة الهوية' },
    'Dissenting.Channel': { section: 'channels', name: 'قناة العقوبات' },
    'Reporting.Channel': { section: 'channels', name: 'قناة البلاغات' },
    'Employment.Channel': { section: 'channels', name: 'قناة التوظيف' },
    'Dissenting.Role': { section: 'channels', name: 'رتبة المسجون' },
    'Reporting.Role': { section: 'channels', name: 'رتبة البلاغات' },
};

const SECTION_NAMES = {
    basic: { name: '⚙️ أساسيات' },
    perms: { name: '🏷️ صلاحيات الأوامر' },
    tickets: { name: '🎫 نظام التذاكر' },
    police: { name: '👮 نظام الشرطة' },
    shuri: { name: '🏛️ مجلس الشورى' },
    channels: { name: '📢 القنوات والرولات' },
};

async function showMainMenu(Message) {
    const Embed = new EmbedBuilder()
        .setTitle('🛡️ لوحة التحكم الكاملة')
        .setColor('#FFD700')
        .setDescription(`**${Object.keys(ALL_OPTIONS).length} إعداد قابل للتعديل**\n\nاختر قسم من القائمة المنسدلة أدناه`)
        .addFields(
            { name: '⚙️ أساسيات', value: 'آيدي السيرفر والمالك', inline: true },
            { name: '🏷️ صلاحيات', value: '13 أمر', inline: true },
            { name: '🎫 التذاكر', value: '14 إعداد', inline: true },
            { name: '👮 الشرطة', value: '3 صلاحيات', inline: true },
            { name: '🏛️ الشورى', value: '7 إعدادات', inline: true },
            { name: '📢 القنوات', value: '7 إعدادات', inline: true },
        )
        .setFooter({ text: `v${VERSION} • تغيير فوري` });

    const Menu = new StringSelectMenuBuilder()
        .setCustomId('Control-AllSections')
        .setPlaceholder('اختر القسم لعرض إعداداته...')
        .addOptions(Object.entries(SECTION_NAMES).map(([key, sec]) => ({
            label: sec.name,
            description: `${Object.values(ALL_OPTIONS).filter(o => o.section === key).length} إعدادات`,
            value: key,
        })));

    await Message.update({ embeds: [Embed], components: [{ type: 1, components: [Menu] }] }).catch(() => {});
}

async function showSection(Message, section) {
    const cfg = getConfig();
    const secName = SECTION_NAMES[section];
    if (!secName) return;

    const opts = Object.entries(ALL_OPTIONS).filter(([k, o]) => o.section === section);
    
    const Embed = new EmbedBuilder()
        .setTitle(`${secName.name} - ${opts.length} إعدادات`)
        .setColor('#FFD700')
        .setDescription(opts.map(([k, o]) => {
            const parts = k.split('.');
            let v = cfg;
            for (const p of parts) v = v?.[p];
            return `**\`${k}\`** - ${o.name}: \`${v || 'فارغ'}\``;
        }).join('\n'))
        .setFooter({ text: `=تحكم <المفتاح> <القيمة> للتعديل • v${VERSION}` });

    const BackButton = new ButtonBuilder({ customId: 'ControlPanel-Back', label: '🔙 رجوع للقائمة الرئيسية', style: 2 });
    await Message.update({ embeds: [Embed], components: [{ type: 1, components: [BackButton] }] }).catch(() => {});
}

export default async function (Client, Message) {
    const isAdmin = Message.member?.roles?.cache?.has('1525549017960808660');
    if (!isAdmin) return;

    // زر الرجوع
    if (Message.isButton() && Message.customId === 'ControlPanel-Back') {
        await showMainMenu(Message);
        return;
    }

    // القائمة الرئيسية الجديدة
    if (Message.isStringSelectMenu() && Message.customId === 'Control-AllSections') {
        await showSection(Message, Message.values[0]);
        return;
    }

    // القائمة القديمة (للتوافق)
    if (Message.isStringSelectMenu() && Message.customId === 'ControlPanel-MainMenu') {
        const section = Message.values[0];
        if (section === 'show') {
            const cfg = getConfig();
            const Embed = new EmbedBuilder()
                .setTitle('📋 الإعدادات الحالية')
                .setColor('#00FF00')
                .addFields(
                    { name: '🏷️ صلاحيات', value: `نداء: ${cfg.CommandPremission?.Call}\nتكت: ${cfg.CommandPremission?.SetupTicket}\nتوظيف: ${cfg.CommandPremission?.Employment}` },
                    { name: '🎫 تذاكر', value: `دعم تفعيل: ${cfg.TicketTf3el?.Support}\nاونر: ${cfg.TicketTf3el?.Owner}` },
                    { name: '📢 قنوات', value: `لوق نقاط: ${cfg.LogPoint?.Channel}\nعقوبات: ${cfg.Dissenting?.Channel}\nتوظيف: ${cfg.Employment?.Channel}` },
                    { name: '🏛️ شورى', value: `رئيس: ${cfg.AlShuri?.Leader}\nنائب: ${cfg.AlShuri?.Deputy}` },
                )
                .setFooter({ text: `v${VERSION}` });
            const BackButton = new ButtonBuilder({ customId: 'ControlPanel-Back', label: '🔙 رجوع', style: 2 });
            await Message.update({ embeds: [Embed], components: [{ type: 1, components: [BackButton] }] });
            return;
        }
        await showSection(Message, section);
    }
};