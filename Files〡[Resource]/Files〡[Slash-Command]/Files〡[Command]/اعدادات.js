"use strict";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';
import { readFileSync, writeFileSync } from 'fs';

const CONFIG_PATH = process.cwd() + '/Files〡[Resource]/Files〡[DataBase]/Files〡[Config].json';
const OWNERS = ['1387331972094890036', '1154021789148659813'];

function getConfig() { return JSON.parse(readFileSync(CONFIG_PATH, 'utf8')); }
function saveConfig(cfg) { writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf8'); }

const SECTIONS = {
    basic: {
        label: '⚙️ الأساسيات', desc: 'معرف السيرفر والمؤسس', emoji: '⚙️',
        fields: { GuildID: 'معرف السيرفر', Founder: 'معرف المؤسس' }
    },
    perms: {
        label: '🏷️ صلاحيات الأوامر', desc: 'الرتب المسموح لها باستخدام الأوامر', emoji: '🏷️',
        fields: {
            'CommandPremission.Call': 'النداء', 'CommandPremission.Ads': 'الإعلانات',
            'CommandPremission.AddPoint': 'إضافة نقاط', 'CommandPremission.RemovePoint': 'إزالة نقاط',
            'CommandPremission.DeletePoint': 'تصفير نقاط', 'CommandPremission.Line': 'الخط',
            'CommandPremission.SetupAdara': 'سيطب إدارة', 'CommandPremission.SetupID': 'سيطب هوية',
            'CommandPremission.SetupSubmissions': 'تقديمات', 'CommandPremission.SetupTicket': 'تكت',
            'CommandPremission.Al_ShuriSetup': 'تسطيب الشورى', 'CommandPremission.CreateDissenting': 'إنشاء عقوبة',
            'CommandPremission.M5alf': 'مخالف', 'CommandPremission.Remove5alf': 'فك',
            'CommandPremission.Employment': 'توظيف'
        }
    },
    tickets: {
        label: '🎫 التذاكر', desc: 'إعدادات أنظمة التذاكر', emoji: '🎫',
        fields: {
            'TicketTf3el.Support': 'دعم تفعيل', 'TicketTf3el.Management': 'مشرف تفعيل',
            'TicketTf3el.Owner': 'أونر التذاكر', 'TicketTf3el.Parent': 'كاتجوري التفعيل',
            'TicketTf3el.ChannelLog': 'لوق التذاكر', 'Tickets2Sm.Owner.Owner': 'رتبة الأونر',
            'Tickets2Sm.Help.Support': 'دعم مساعدة', 'Tickets2Sm.Help.Management': 'مشرف مساعدة',
            'Tickets2Sm.El4away.Support': 'دعم شكاوى', 'TicketT2dem.Support': 'دعم تقديم',
            'TicketHe2a.Support': 'دعم الهيئة', 'TicketHe2a.Management': 'مشرف الهيئة'
        }
    },
    police: {
        label: '👮 الشرطة', desc: 'صلاحيات أنظمة الشرطة', emoji: '👮',
        fields: { 'Police.Panel': 'لوحة العساكر', 'Police.PanelM5alfat': 'لوحة المخالفات', 'Police.PanelReport': 'لوحة البلاغات' }
    },
    shuri: {
        label: '🏛️ الشورى', desc: 'إعدادات مجلس الشورى', emoji: '🏛️',
        fields: {
            'AlShuri.Democratic': 'الحزب الديمقراطي', 'AlShuri.Republican': 'الحزب الجمهوري',
            'AlShuri.Role': 'رول العضو', 'AlShuri.Leader': 'رئيس المجلس',
            'AlShuri.Deputy': 'نائب الرئيس', 'AlShuri.Channel': 'قناة الشورى', 'AlShuri.VoteChannel': 'قناة التصويت'
        }
    },
    channels: {
        label: '📢 القنوات', desc: 'معرفات القنوات والرولات', emoji: '📢',
        fields: {
            'LogPoint.Channel': 'لوق النقاط', 'Identity.Channel': 'قناة الهوية',
            'Dissenting.Channel': 'قناة العقوبات', 'Reporting.Channel': 'قناة البلاغات',
            'Employment.Channel': 'قناة التوظيف', 'Dissenting.Role': 'رتبة المسجون', 'Reporting.Role': 'رتبة البلاغات'
        }
    }
};

const MAIN_MENU_EMBED = new EmbedBuilder()
    .setTitle('🛡️ لوحة تحكم البوت المركزية')
    .setColor('#FFD700')
    .setDescription('أهلاً بك في لوحة التحكم الشاملة.\nاختر أحد الأقسام أدناه لتعديل الإعدادات بشكل فوري.')
    .addFields(
        { name: '⚙️ الأساسيات', value: 'معرف السيرفر والمؤسس', inline: true },
        { name: '🏷️ صلاحيات الأوامر', value: '15 صلاحية', inline: true },
        { name: '🎫 التذاكر', value: '12 إعداد', inline: true },
        { name: '👮 الشرطة', value: '3 صلاحيات', inline: true },
        { name: '🏛️ الشورى', value: '7 إعدادات', inline: true },
        { name: '📢 القنوات', value: '7 إعدادات', inline: true }
    )
    .setFooter({ text: '♜ CIA Community • تغييرات فورية بدون إعادة تشغيل' });

export default {
    name: "اعدادات",
    description: "لوحة تحكم البوت المركزية - كل الإعدادات من مكان واحد",
    type: 1,
    options: [],
    run: async (Client, Message) => {
        if (!OWNERS.includes(Message.user.id)) {
            return Message.reply({ content: '❌ هذا الأمر للمالكين فقط', flags: 64 });
        }
        await Message.deferReply({ flags: 64 });

        const sectionMenu = new StringSelectMenuBuilder()
            .setCustomId('Settings_Section')
            .setPlaceholder('اختر قسماً لتعديله...')
            .addOptions(Object.entries(SECTIONS).map(([k, v]) => ({
                label: v.label, description: v.desc, value: k, emoji: { name: v.emoji }
            })));

        await Message.editReply({
            embeds: [MAIN_MENU_EMBED],
            components: [{ type: 1, components: [sectionMenu] }]
        });
    }
};

// ─── معالج التفاعلات للوحة الإعدادات ───
export const settingsInteractionHandler = async (Client, Message) => {
    if (!OWNERS.includes(Message.user?.id || Message.author?.id)) return;

    // اختيار قسم
    if (Message.isStringSelectMenu() && Message.customId === 'Settings_Section') {
        const secKey = Message.values[0];
        const sec = SECTIONS[secKey];
        if (!sec) return;

        const cfg = getConfig();
        const items = Object.entries(sec.fields).map(([key, label]) => {
            const parts = key.split('.');
            let v = cfg;
            for (const p of parts) v = v?.[p];
            return `**\`${key}\`** - ${label}: \`${v || 'فارغ'}\``;
        }).join('\n');

        const embed = new EmbedBuilder()
            .setTitle(sec.label)
            .setColor('#FFD700')
            .setDescription(items + '\n\n**✏️ اختر عنصراً من القائمة أدناه لتعديله**');

        // قائمة منسدلة لاختيار الحقل المحدد
        const fieldMenu = new StringSelectMenuBuilder()
            .setCustomId('Settings_Field_' + secKey)
            .setPlaceholder('اختر العنصر لتعديله...')
            .addOptions(Object.entries(sec.fields).slice(0, 25).map(([key, label]) => ({
                label: label.slice(0, 100),
                description: 'القيمة الحالية: ' + (getFieldValue(cfg, key) || 'فارغ'),
                value: key
            })));

        const backBtn = new ButtonBuilder().setCustomId('Settings_Back').setLabel('🔙 رجوع').setStyle(2);

        await Message.update({
            embeds: [embed],
            components: [
                { type: 1, components: [fieldMenu] },
                { type: 1, components: [backBtn] }
            ]
        }).catch(() => {});
        return;
    }

    // اختيار حقل للتعديل ← فتح Modal
    if (Message.isStringSelectMenu() && Message.customId?.startsWith('Settings_Field_')) {
        const fieldKey = Message.values[0];
        const cfg = getConfig();
        const currentVal = getFieldValue(cfg, fieldKey) || '';

        const input = new TextInputBuilder()
            .setCustomId('SettingValue')
            .setLabel('القيمة الجديدة')
            .setPlaceholder('أدخل المعرف (17-20 رقم)')
            .setStyle(1)
            .setMinLength(17)
            .setMaxLength(20)
            .setValue(currentVal)
            .setRequired(true);

        const modal = new ModalBuilder()
            .setCustomId('Settings_Modal_' + fieldKey)
            .setTitle('تعديل: ' + fieldKey.split('.').pop())
            .setComponents([{ type: 1, components: [input] }]);

        await Message.showModal(modal);
        return;
    }

    // استقبال القيمة من Modal
    if (Message.isModalSubmit() && Message.customId?.startsWith('Settings_Modal_')) {
        const fieldKey = Message.customId.replace('Settings_Modal_', '');
        const newValue = Message.fields.getTextInputValue('SettingValue');

        if (!/^\d{17,20}$/.test(newValue)) {
            return Message.reply({ content: '❌ المعرف يجب أن يكون 17-20 رقم فقط', flags: 64 });
        }

        const cfg = getConfig();
        setFieldValue(cfg, fieldKey, newValue);
        saveConfig(cfg);

        return Message.reply({ content: `✅ **تم تحديث \`${fieldKey}\` → \`${newValue}\`**`, flags: 64 });
    }

    // زر الرجوع
    if (Message.isButton() && Message.customId === 'Settings_Back') {
        const sectionMenu = new StringSelectMenuBuilder()
            .setCustomId('Settings_Section')
            .setPlaceholder('اختر قسماً لتعديله...')
            .addOptions(Object.entries(SECTIONS).map(([k, v]) => ({
                label: v.label, description: v.desc, value: k, emoji: { name: v.emoji }
            })));

        await Message.update({
            embeds: [MAIN_MENU_EMBED],
            components: [{ type: 1, components: [sectionMenu] }]
        }).catch(() => {});
    }
};

function getFieldValue(obj, path) {
    const parts = path.split('.');
    let v = obj;
    for (const p of parts) v = v?.[p];
    return v;
}

function setFieldValue(obj, path, value) {
    const parts = path.split('.');
    let v = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        if (!v[parts[i]]) v[parts[i]] = {};
        v = v[parts[i]];
    }
    v[parts[parts.length - 1]] = value;
}