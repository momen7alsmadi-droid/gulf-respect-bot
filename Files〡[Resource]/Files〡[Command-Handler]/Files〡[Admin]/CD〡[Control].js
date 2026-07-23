"use strict";
import { EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js';
import { readFileSync, writeFileSync } from 'fs';
import { VERSION } from '../../Files〡[Config]/Files〡[Config].js';

const CONFIG_PATH = 'Files〡[Resource]/Files〡[DataBase]/Files〡[Config].json';

function getConfig() { return JSON.parse(readFileSync(CONFIG_PATH, 'utf8')); }
function saveConfig(cfg) { writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf8'); }

// كل خيارات الكونفغ مع شرحها
const ALL_OPTIONS = {
    // === أساسيات ===
    'GuildID': { section: 'basic', name: 'آيدي السيرفر', desc: 'معرف السيرفر الرئيسي' },
    'Founder': { section: 'basic', name: 'آيدي المالك', desc: 'معرف مؤسس البوت' },
    
    // === صلاحيات الأوامر ===
    'CommandPremission.Call': { section: 'perms', name: 'صلاحية النداء', desc: '=نداء' },
    'CommandPremission.Ads': { section: 'perms', name: 'صلاحية الإعلانات', desc: '=قائمه-الاعلانات' },
    'CommandPremission.AddPoint': { section: 'perms', name: 'صلاحية النقاط', desc: '=اضافة/ازالة/تصفير-نقاط' },
    'CommandPremission.Line': { section: 'perms', name: 'صلاحية الخط', desc: '=خط' },
    'CommandPremission.SetupAdara': { section: 'perms', name: 'صلاحية الإدارة', desc: '=سيطب-ادارة' },
    'CommandPremission.SetupID': { section: 'perms', name: 'صلاحية الهوية', desc: '=سيطب-الهوية' },
    'CommandPremission.SetupSubmissions': { section: 'perms', name: 'صلاحية التقديمات', desc: '=تقديمات' },
    'CommandPremission.SetupTicket': { section: 'perms', name: 'صلاحية التذاكر', desc: '=تكت' },
    'CommandPremission.Al_ShuriSetup': { section: 'perms', name: 'صلاحية الشورى', desc: '=تسطيب-الشوري' },
    'CommandPremission.CreateDissenting': { section: 'perms', name: 'صلاحية العقوبات', desc: '=انشاء/حذف-عقوبة' },
    'CommandPremission.M5alf': { section: 'perms', name: 'صلاحية مخالف', desc: '=مخالف' },
    'CommandPremission.Remove5alf': { section: 'perms', name: 'صلاحية فك', desc: '=فك' },
    'CommandPremission.Employment': { section: 'perms', name: 'صلاحية التوظيف', desc: '=توظيف/تقاعد' },
    
    // === تذاكر ===
    'TicketTf3el.Support': { section: 'tickets', name: 'دعم التفعيل', desc: 'يستلم تذاكر التفعيل' },
    'TicketTf3el.Management': { section: 'tickets', name: 'مشرف التفعيل', desc: 'يشرف على تذاكر التفعيل' },
    'TicketTf3el.Owner': { section: 'tickets', name: 'أونر التذاكر', desc: 'يرى جميع التذاكر' },
    'TicketTf3el.Parent': { section: 'tickets', name: 'كاتجوري التفعيل', desc: 'مكان إنشاء تذاكر التفعيل' },
    'TicketTf3el.ChannelLog': { section: 'tickets', name: 'لوق التذاكر', desc: 'قناة سجلات التذاكر' },
    'Tickets2Sm.Owner.Owner': { section: 'tickets', name: 'رتبة الأونر', desc: 'تذكرة طلب أونر' },
    'Tickets2Sm.Owner.Parent': { section: 'tickets', name: 'كاتجوري الأونر', desc: 'مكان تذاكر الأونر' },
    'Tickets2Sm.Help.Support': { section: 'tickets', name: 'دعم المساعدة', desc: 'يستلم تذاكر المساعدة' },
    'Tickets2Sm.Help.Management': { section: 'tickets', name: 'مشرف المساعدة', desc: 'يشرف على تذاكر المساعدة' },
    'Tickets2Sm.Help.Parent': { section: 'tickets', name: 'كاتجوري المساعدة', desc: 'مكان تذاكر المساعدة' },
    'Tickets2Sm.El4away.Support': { section: 'tickets', name: 'دعم الشكاوى', desc: 'يستلم تذاكر الشكاوى' },
    'Tickets2Sm.El4away.Permission': { section: 'tickets', name: 'قيادة الشكاوى', desc: 'ترى تذاكر الشكاوى' },
    'Tickets2Sm.El4away.Parent': { section: 'tickets', name: 'كاتجوري الشكاوى', desc: 'مكان تذاكر الشكاوى' },
    'TicketT2dem.Support': { section: 'tickets', name: 'دعم تقديم الإدارة', desc: 'يستلم تذاكر التقديم' },
    'TicketT2dem.Parent': { section: 'tickets', name: 'كاتجوري تقديم الإدارة', desc: 'مكان تذاكر التقديم' },
    'TicketM7kma.TlbMo7my.Parent': { section: 'tickets', name: 'كاتجوري طلب محامي', desc: 'مكان تذاكر المحكمة' },
    'TicketM7kma.Rf32dea.Parent': { section: 'tickets', name: 'كاتجوري رفع قضية', desc: 'مكان تذاكر القضايا' },
    'TicketHe2a.Support': { section: 'tickets', name: 'دعم الهيئة', desc: 'يستلم تذاكر الهيئة' },
    'TicketHe2a.Management': { section: 'tickets', name: 'مشرف الهيئة', desc: 'يشرف على تذاكر الهيئة' },
    'TicketHe2a.Parent': { section: 'tickets', name: 'كاتجوري الهيئة', desc: 'مكان تذاكر الهيئة' },
    
    // === شرطة ===
    'Police.Panel': { section: 'police', name: 'لوحة العساكر', desc: 'صلاحية =بانل-العساكر' },
    'Police.PanelM5alfat': { section: 'police', name: 'لوحة المخالفات', desc: 'صلاحية =بانل-المخالفات' },
    'Police.PanelReport': { section: 'police', name: 'لوحة البلاغات', desc: 'صلاحية =بانل-ريبورت' },
    
    // === شورى ===
    'AlShuri.Democratic': { section: 'shuri', name: 'الحزب الديمقراطي', desc: 'رول الحزب' },
    'AlShuri.Republican': { section: 'shuri', name: 'الحزب الجمهوري', desc: 'رول الحزب' },
    'AlShuri.Role': { section: 'shuri', name: 'رول عضو الشورى', desc: 'الرول العام' },
    'AlShuri.Leader': { section: 'shuri', name: 'رئيس المجلس', desc: 'يملك صلاحية القبول/رفض' },
    'AlShuri.Deputy': { section: 'shuri', name: 'نائب الرئيس', desc: 'نفس صلاحيات الرئيس' },
    'AlShuri.Channel': { section: 'shuri', name: 'قناة الشورى', desc: 'قناة عرض المجلس' },
    'AlShuri.VoteChannel': { section: 'shuri', name: 'قناة التصويت', desc: 'قناة التصويت' },
    
    // === قنوات ===
    'LogPoint.Channel': { section: 'channels', name: 'لوق النقاط', desc: 'سجل نقاط الإدارة' },
    'Identity.Channel': { section: 'channels', name: 'قناة الهوية', desc: 'قناة استخراج الهوية' },
    'Dissenting.Channel': { section: 'channels', name: 'قناة العقوبات', desc: 'سجل المخالفات والعقوبات' },
    'Reporting.Channel': { section: 'channels', name: 'قناة البلاغات', desc: 'قناة البلاغات' },
    'Employment.Channel': { section: 'channels', name: 'قناة التوظيف', desc: 'سجل التوظيف' },
    'Dissenting.Role': { section: 'channels', name: 'رتبة المسجون', desc: 'توضع على المعاقب' },
    'Reporting.Role': { section: 'channels', name: 'رتبة البلاغات', desc: 'تستلم البلاغات' },
};

const SECTION_NAMES = {
    basic: { name: '⚙️ أساسيات', emoji: '⚙️' },
    perms: { name: '🏷️ صلاحيات الأوامر', emoji: '🏷️' },
    tickets: { name: '🎫 نظام التذاكر', emoji: '🎫' },
    police: { name: '👮 نظام الشرطة', emoji: '👮' },
    shuri: { name: '🏛️ مجلس الشورى', emoji: '🏛️' },
    channels: { name: '📢 القنوات والرولات', emoji: '📢' },
};

export default {
    name: 'لوحة-تحكم',
    description: "لوحة تحكم كاملة - تغيير فوري بدون إعادة تشغيل",
    aliases: ['تحكم', 'control', 'panel', 'settings'],
    run: async (Client, Message) => {
        const isAdmin = Message.member.roles.cache.has('1525549017960808660');
        if (!isAdmin) return Message.reply({ content: '❌ للادارة العليا فقط' });

        const Args = Message.content.split(' ');
        const section = Args[1];
        const optionKey = Args[2];
        const newValue = Args[3];

        // القائمة الرئيسية
        if (!section) {
            const Embed = new EmbedBuilder()
                .setTitle('🛡️ لوحة التحكم الكاملة')
                .setColor('#FFD700')
                .setDescription(`**${Object.keys(ALL_OPTIONS).length} إعداد قابل للتعديل - تغيير فوري!**\n\n**للتعديل:** \`=تحكم <المفتاح> <القيمة>\`\n**للعرض:** \`=تحكم عرض\`\n**للبحث:** \`=تحكم بحث <كلمة>\``)
                .addFields(
                    { name: '⚙️ أساسيات', value: 'آيدي السيرفر والمالك' },
                    { name: '🏷️ صلاحيات الأوامر', value: '13 أمر إداري' },
                    { name: '🎫 نظام التذاكر', value: '21 إعداد للتذاكر' },
                    { name: '👮 نظام الشرطة', value: '3 صلاحيات' },
                    { name: '🏛️ مجلس الشورى', value: '7 إعدادات' },
                    { name: '📢 القنوات والرولات', value: '7 قنوات ورولات' },
                )
                .setFooter({ text: `v${VERSION} • جميع التغييرات فورية بدون إعادة تشغيل` });

            const Menu = new StringSelectMenuBuilder()
                .setCustomId('Control-AllSections')
                .setPlaceholder('اختر القسم لعرض إعداداته...')
                .addOptions(Object.entries(SECTION_NAMES).map(([key, sec]) => ({
                    label: sec.name,
                    description: `${Object.values(ALL_OPTIONS).filter(o => o.section === key).length} إعدادات`,
                    value: key,
                    emoji: { name: sec.emoji }
                })));

            return Message.reply({ embeds: [Embed], components: [{ type: 1, components: [Menu] }] });
        }

        // عرض كل الإعدادات
        if (section === 'عرض') {
            const cfg = getConfig();
            const Embed = new EmbedBuilder()
                .setTitle('📋 جميع الإعدادات الحالية')
                .setColor('#00FF00');

            for (const [secKey, secName] of Object.entries(SECTION_NAMES)) {
                const opts = Object.entries(ALL_OPTIONS).filter(([k, o]) => o.section === secKey);
                if (opts.length > 0) {
                    const val = opts.map(([k, o]) => {
                        const parts = k.split('.');
                        let v = cfg;
                        for (const p of parts) v = v?.[p];
                        return `${o.name}: \`${v || 'فارغ'}\``;
                    }).join('\n');
                    Embed.addFields({ name: secName.name, value: val.slice(0, 1024) || 'لا يوجد' });
                }
            }
            Embed.setFooter({ text: `v${VERSION} • للتعديل: =تحكم <المفتاح> <القيمة>` });
            return Message.reply({ embeds: [Embed] });
        }

        // بحث
        if (section === 'بحث' && optionKey) {
            const results = Object.entries(ALL_OPTIONS).filter(([k, o]) => 
                k.toLowerCase().includes(optionKey.toLowerCase()) || 
                o.name.includes(optionKey) || 
                o.desc.includes(optionKey)
            );
            if (results.length === 0) return Message.reply({ content: `❌ لا توجد نتائج لـ "${optionKey}"` });
            const cfg = getConfig();
            const Embed = new EmbedBuilder()
                .setTitle(`🔍 نتائج البحث: "${optionKey}"`)
                .setColor('#FFD700')
                .setDescription(results.map(([k, o]) => {
                    const parts = k.split('.');
                    let v = cfg;
                    for (const p of parts) v = v?.[p];
                    return `**\`${k}\`** - ${o.name}\n> ${o.desc}\n> القيمة: \`${v || 'فارغ'}\`\n`;
                }).join('\n'))
                .setFooter({ text: `=تحكم ${results[0][0]} <قيمة> للتعديل` });
            return Message.reply({ embeds: [Embed] });
        }

        // عرض قسم محدد
        if (SECTION_NAMES[section] && !optionKey) {
            const cfg = getConfig();
            const opts = Object.entries(ALL_OPTIONS).filter(([k, o]) => o.section === section);
            const Embed = new EmbedBuilder()
                .setTitle(`${SECTION_NAMES[section].emoji} ${SECTION_NAMES[section].name}`)
                .setColor('#FFD700')
                .setDescription(opts.map(([k, o]) => {
                    const parts = k.split('.');
                    let v = cfg;
                    for (const p of parts) v = v?.[p];
                    return `**\`${k}\`** - ${o.name}: \`${v || 'فارغ'}\`\n-# ${o.desc}`;
                }).join('\n'))
                .setFooter({ text: `=تحكم <المفتاح> <القيمة> للتعديل الفوري • v${VERSION}` });

            const BackButton = new ButtonBuilder({ customId: 'ControlPanel-Back', label: '🔙 رجوع', style: 2 });
            return Message.reply({ embeds: [Embed], components: [{ type: 1, components: [BackButton] }] });
        }

        // تعديل مباشر: =تحكم GuildID 123
        if (ALL_OPTIONS[section] && newValue) {
            if (!/^\d{17,20}$/.test(newValue)) return Message.reply({ content: '❌ المعرف يجب أن يكون 17-20 رقم' });
            
            const cfg = getConfig();
            const parts = section.split('.');
            let obj = cfg;
            for (let i = 0; i < parts.length - 1; i++) {
                if (!obj[parts[i]]) obj[parts[i]] = {};
                obj = obj[parts[i]];
            }
            obj[parts[parts.length - 1]] = newValue;
            saveConfig(cfg);
            
            // تحديث مباشر للبوت
            await reloadConfig(Client, cfg);
            
            return Message.reply({ content: `✅ **تم تحديث \`${section}\` → \`${newValue}\`**\n-# تغيير فوري • v${VERSION}` });
        }

        if (ALL_OPTIONS[section] && !newValue) {
            const cfg = getConfig();
            const parts = section.split('.');
            let v = cfg;
            for (const p of parts) v = v?.[p];
            return Message.reply({ content: `**${ALL_OPTIONS[section].name}**\n> الحالي: \`${v || 'فارغ'}\`\n> للتعديل: \`=تحكم ${section} <المعرف>\`` });
        }

        return Message.reply({ content: `❌ غير معروف. استخدم \`=تحكم\` للقائمة أو \`=تحكم بحث <كلمة>\`` });
    }
};

async function reloadConfig(Client, cfg) {
    // تحديث البرفكس
    if (cfg.Prefix) Client.Prefix = cfg.Prefix;
    // تحديث التوكن (نادر)
    if (cfg.Token) Client.Token = cfg.Token;
    console.log('✅ Config hot-reloaded');
}