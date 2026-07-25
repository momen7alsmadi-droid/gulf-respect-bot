"use strict";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';
import { readFileSync, writeFileSync } from 'fs';

const ROOT = process.cwd();
const CONFIG_PATH = ROOT + '/Files〡[Resource]/Files〡[DataBase]/Files〡[Config].json';
const MSG_DB_PATH = ROOT + '/Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';
const SUPER_OWNERS = ['1387331972094890036', '1154021789148659813']; // m_smadi + sp9a فقط
function getAllOwners() {
    try { return [...SUPER_OWNERS, ...(getConfig().Owners || [])]; } catch { return SUPER_OWNERS; }
}

function getConfig() { return JSON.parse(readFileSync(CONFIG_PATH, 'utf8')); }
function saveConfig(cfg) { writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf8'); }
function getMsgDB() { return JSON.parse(readFileSync(MSG_DB_PATH, 'utf8')); }
function saveMsgDB(db) { writeFileSync(MSG_DB_PATH, JSON.stringify(db, null, 2), 'utf8'); }

// ─── أقسام الإعدادات ───
const SECTIONS = {
    basic: { label: '⚙️ الأساسيات', fields: { GuildID: 'معرف السيرفر', Founder: 'معرف المؤسس' } },
    perms: {
        label: '🏷️ صلاحيات الأوامر',
        fields: { 'CommandPremission.Call':'نداء','CommandPremission.Ads':'إعلانات','CommandPremission.AddPoint':'إضافة نقاط','CommandPremission.RemovePoint':'إزالة نقاط','CommandPremission.DeletePoint':'تصفير نقاط','CommandPremission.Line':'خط','CommandPremission.SetupAdara':'سيطب إدارة','CommandPremission.SetupID':'سيطب هوية','CommandPremission.SetupSubmissions':'تقديمات','CommandPremission.SetupTicket':'تكت','CommandPremission.Al_ShuriSetup':'تسطيب الشورى','CommandPremission.CreateDissenting':'إنشاء عقوبة','CommandPremission.M5alf':'مخالف','CommandPremission.Remove5alf':'فك','CommandPremission.Employment':'توظيف' }
    },
    tickets: {
        label: '🎫 التذاكر',
        fields: { 'TicketTf3el.Support':'دعم تفعيل','TicketTf3el.Management':'مشرف تفعيل','TicketTf3el.Owner':'أونر','TicketTf3el.Parent':'كاتجوري','TicketTf3el.ChannelLog':'لوق','Tickets2Sm.Owner.Owner':'رتبة الأونر','Tickets2Sm.Help.Support':'دعم مساعدة','Tickets2Sm.Help.Management':'مشرف مساعدة','Tickets2Sm.El4away.Support':'دعم شكاوى','TicketT2dem.Support':'دعم تقديم','TicketHe2a.Support':'دعم الهيئة','TicketHe2a.Management':'مشرف الهيئة' }
    },
    police: { label: '👮 الشرطة', fields: { 'Police.Panel':'لوحة العساكر','Police.PanelM5alfat':'لوحة المخالفات','Police.PanelReport':'لوحة البلاغات' } },
    shuri: { label: '🏛️ الشورى', fields: { 'AlShuri.Democratic':'حزب ديمقراطي','AlShuri.Republican':'حزب جمهوري','AlShuri.Role':'رول العضو','AlShuri.Leader':'الرئيس','AlShuri.Deputy':'النائب','AlShuri.Channel':'القناة','AlShuri.VoteChannel':'قناة تصويت' } },
    channels: { label: '📢 القنوات', fields: { 'LogPoint.Channel':'لوق النقاط','Identity.Channel':'قناة الهوية','Dissenting.Channel':'قناة العقوبات','Reporting.Channel':'قناة البلاغات','Employment.Channel':'قناة التوظيف','Dissenting.Role':'رتبة المسجون','Reporting.Role':'رتبة البلاغات' } }
};

// ─── أقسام الرسائل ───
const MSG_CATEGORIES = {
    activation: { name: '📨 التفعيل', keys: ['welcome','activation','bank','quizTitle','quizPass','quizFail','quizLinks','activationTestImage','btnActivate','btnTf3elTicket'] },
    tickets: { name: '🎫 التذاكر', keys: ['ticketTf3el','ticketOwner','ticketHelp','ticketShakwa','ticketT2dem','ticketM7kma','ticketHe2a','ticketClose','btnOwnerTicket','btnHelpTicket','btnShakwaTicket'] },
    admin: { name: '🛡️ الإدارة', keys: ['adaraPanel','adaraNicknamePrefix','callAdmin','evaluationDM','noPermissionMsg','memberNotFoundMsg','doneMsg','lineImage'] },
    police: { name: '👮 الشرطة', keys: ['policeLogin','policeLogout','policePanel','violationsPanel','reportPanel','civilPanel','prisonDM','btnViolation','btnReport'] },
    government: { name: '🏛️ الحكومة', keys: ['shuriPanel','votePanel','adsPanel','circularsPanel','submissionsPanel','idPanel','btnProsecution','btnAuthority'] },
    appearance: { name: '🎨 المظهر', keys: ['serverName','serverLogo','welcomeImage','embedColor','footerText','errorFormat'] }
};

const MAIN_EMBED = (isSuper) => new EmbedBuilder()
    .setTitle('🛡️ لوحة تحكم البوت المركزية')
    .setColor('#FFD700')
    .setDescription('اختر أحد الأزرار أدناه للتحكم في إعدادات البوت.')
    .addFields(
        { name: '⚙️ التحكم', value: 'تعديل جميع معرفات وصلاحيات البوت', inline: true },
        { name: '📝 الرسائل', value: 'تعديل جميع رسائل ونصوص البوت', inline: true },
        ...(isSuper ? [{ name: '👑 الملاك', value: 'إدارة ملاك البوت (حصري)', inline: true }] : [])
    )
    .setFooter({ text: '♜ CIA Community • تغييرات فورية' });

// ─── بناء أزرار اللوحة الرئيسية ───
function getMainButtons(userId) {
    const btns = [
        new ButtonBuilder().setCustomId('Panel_Control').setLabel('⚙️ التحكم').setStyle(1),
        new ButtonBuilder().setCustomId('Panel_Messages').setLabel('📝 الرسائل').setStyle(1)
    ];
    if (SUPER_OWNERS.includes(userId)) {
        btns.push(new ButtonBuilder().setCustomId('Panel_Owners').setLabel('👑 الملاك').setStyle(4));
    }
    return btns;
}

// ─── مساعدات ───
function getFieldValue(obj, path) { const parts = path.split('.'); let v = obj; for (const p of parts) v = v?.[p]; return v; }
function setFieldValue(obj, path, value) { const parts = path.split('.'); let v = obj; for (let i = 0; i < parts.length - 1; i++) { if (!v[parts[i]]) v[parts[i]] = {}; v = v[parts[i]]; } v[parts[parts.length - 1]] = value; }

function backToMain(message) {
    const uid = message.user?.id || message.author?.id;
    return message.update({
        embeds: [MAIN_EMBED(SUPER_OWNERS.includes(uid))],
        components: [{ type: 1, components: getMainButtons(uid) }]
    }).catch(() => {});
}

// ═══════════════════════════════════════════════════════════════
export default {
    name: "اعدادات",
    description: "لوحة تحكم البوت المركزية",
    type: 1,
    options: [],
    run: async (Client, Message) => {
        const allOwners = getAllOwners();
        const isSuper = SUPER_OWNERS.includes(Message.user.id);
        if (!allOwners.includes(Message.user.id)) return Message.reply({ content: '❌ للمالكين فقط', flags: 64 });
        await Message.deferReply({ flags: 64 });
        await Message.editReply({ embeds: [MAIN_EMBED(isSuper)], components: [{ type: 1, components: getMainButtons(Message.user.id) }] });
    }
};

// ═══════════════════════════════════════════════════════════════
// معالج التفاعلات
// ═══════════════════════════════════════════════════════════════
export const settingsInteractionHandler = async (Client, Message) => {
    const uid = Message.user?.id || Message.author?.id;
    const allOwners = getAllOwners();
    if (!allOwners.includes(uid)) return;

    // ─── اللوحة الرئيسية ───
    if (Message.isButton() && Message.customId === 'Panel_Control') {
        const menu = new StringSelectMenuBuilder().setCustomId('Ctrl_Section').setPlaceholder('اختر قسماً...')
            .addOptions(Object.entries(SECTIONS).map(([k,v]) => ({ label: v.label, value: k, description: Object.keys(v.fields).length + ' إعداد' })));
        const back = new ButtonBuilder().setCustomId('Panel_Back').setLabel('🔙 رجوع للرئيسية').setStyle(2);
        await Message.update({ embeds: [new EmbedBuilder().setTitle('⚙️ التحكم بالإعدادات').setColor('#FFD700').setDescription('اختر قسماً من القائمة أدناه')], components: [{ type:1, components:[menu] }, { type:1, components:[back] }] }).catch(()=>{});
        return;
    }

    if (Message.isButton() && Message.customId === 'Panel_Messages') {
        const menu = new StringSelectMenuBuilder().setCustomId('Msg_Section').setPlaceholder('اختر قسماً من الرسائل...')
            .addOptions(Object.entries(MSG_CATEGORIES).map(([k,v]) => ({ label: v.name, value: k, description: v.keys.length + ' رسالة' })));
        const back = new ButtonBuilder().setCustomId('Panel_Back').setLabel('🔙 رجوع للرئيسية').setStyle(2);
        await Message.update({ embeds: [new EmbedBuilder().setTitle('📝 التحكم بالرسائل').setColor('#FFD700').setDescription('اختر قسماً من القائمة أدناه لتعديل رسائله')], components: [{ type:1, components:[menu] }, { type:1, components:[back] }] }).catch(()=>{});
        return;
    }

    if (Message.isButton() && Message.customId === 'Panel_Back') { return backToMain(Message); }

    if (Message.isButton() && Message.customId === 'Panel_Back') { return backToMain(Message); }

    // ─── 👑 إدارة الملاك (لـ m_smadi + sp9a فقط) ───
    if (Message.isButton() && Message.customId === 'Panel_Owners') {
        if (!SUPER_OWNERS.includes(Message.user?.id || Message.author?.id)) return;
        const cfg = getConfig();
        const owners = cfg.Owners || [];
        const list = owners.length > 0
            ? owners.map((id, i) => `${i + 1}. <@${id}> (\`${id}\`)`).join('\n')
            : 'لا يوجد ملاك إضافيون';

        const embed = new EmbedBuilder().setTitle('👑 إدارة الملاك').setColor('#FFD700')
            .setDescription('**الملاك الحاليون:**\n' + list + '\n\nاختر إجراءً من القائمة أدناه');

        const menu = new StringSelectMenuBuilder().setCustomId('Owner_Action').setPlaceholder('اختر إجراءً...')
            .addOptions([
                { label: '➕ إضافة مالك', value: 'add', description: 'إضافة مالك جديد للبوت' },
                { label: '➖ حذف مالك', value: 'remove', description: 'حذف مالك من القائمة' },
                { label: '📋 عرض الملاك', value: 'show', description: 'عرض قائمة الملاك الحاليين' }
            ]);
        const back = new ButtonBuilder().setCustomId('Panel_Back').setLabel('🔙 رجوع للرئيسية').setStyle(2);
        await Message.update({ embeds: [embed], components: [{ type:1, components:[menu] }, { type:1, components:[back] }] }).catch(()=>{});
        return;
    }

    if (Message.isStringSelectMenu() && Message.customId === 'Owner_Action') {
        const action = Message.values[0];
        if (action === 'show') {
            const cfg = getConfig();
            const owners = cfg.Owners || [];
            const list = owners.length > 0 ? owners.map((id,i) => (i+1)+'. <@'+id+'>').join('\n') : 'لا يوجد';
            return Message.reply({ content: '👑 **الملاك:**\n' + list, flags: 64 });
        }
        if (action === 'add') {
            const input = new TextInputBuilder().setCustomId('OwnerId').setLabel('معرف المالك الجديد (18 رقم)').setStyle(1).setMinLength(18).setMaxLength(20).setRequired(true);
            const modal = new ModalBuilder().setCustomId('Owner_Add').setTitle('➕ إضافة مالك جديد').setComponents([{ type:1, components:[input] }]);
            return await Message.showModal(modal);
        }
        if (action === 'remove') {
            const cfg = getConfig();
            const owners = cfg.Owners || [];
            if (owners.length === 0) return Message.reply({ content: '❌ لا يوجد ملاك للحذف', flags: 64 });
            const menu = new StringSelectMenuBuilder().setCustomId('Owner_Remove').setPlaceholder('اختر المالك لحذفه...')
                .addOptions(owners.slice(0,25).map((id,i) => ({ label: id, value: id, description: 'مالك #'+(i+1) })));
            return await Message.reply({ content: 'اختر المالك الذي تريد حذفه:', components: [{ type:1, components:[menu] }], flags: 64 });
        }
        return;
    }

    if (Message.isModalSubmit() && Message.customId === 'Owner_Add') {
        const newId = Message.fields.getTextInputValue('OwnerId');
        if (!/^\d{17,20}$/.test(newId)) return Message.reply({ content: '❌ معرف غير صالح', flags: 64 });
        const cfg = getConfig();
        if (!cfg.Owners) cfg.Owners = [];
        if (cfg.Owners.includes(newId)) return Message.reply({ content: '❌ هذا المالك مضاف بالفعل', flags: 64 });
        cfg.Owners.push(newId);
        saveConfig(cfg);
        return Message.reply({ content: '✅ **تمت إضافة المالك** <@' + newId + '>', flags: 64 });
    }

    if (Message.isStringSelectMenu() && Message.customId === 'Owner_Remove') {
        const removeId = Message.values[0];
        const cfg = getConfig();
        cfg.Owners = (cfg.Owners || []).filter(id => id !== removeId);
        saveConfig(cfg);
        return Message.reply({ content: '✅ **تم حذف المالك** <@' + removeId + '>', flags: 64 });
    }

    // ─── قسم الإعدادات: اختيار حقل ───
    if (Message.isStringSelectMenu() && Message.customId === 'Ctrl_Section') {
        const sec = SECTIONS[Message.values[0]];
        if (!sec) return;
        const cfg = getConfig();
        const items = Object.entries(sec.fields).map(([k,l]) => '**`' + k + '`** - ' + l + ': `' + (getFieldValue(cfg,k)||'فارغ') + '`').join('\n');
        const menu = new StringSelectMenuBuilder().setCustomId('Ctrl_Field_' + Message.values[0]).setPlaceholder('اختر عنصراً لتعديله...')
            .addOptions(Object.entries(sec.fields).slice(0,25).map(([k,l]) => ({ label: l.slice(0,100), value: k, description: (getFieldValue(cfg,k)||'فارغ').slice(0,100) })));
        const back = new ButtonBuilder().setCustomId('Panel_Control').setLabel('🔙 رجوع للأقسام').setStyle(2);
        await Message.update({ embeds: [new EmbedBuilder().setTitle(sec.label).setColor('#FFD700').setDescription(items)], components: [{ type:1, components:[menu] }, { type:1, components:[back] }] }).catch(()=>{});
        return;
    }

    if (Message.isStringSelectMenu() && Message.customId?.startsWith('Ctrl_Field_')) {
        const key = Message.values[0];
        const current = getFieldValue(getConfig(), key) || '';
        const input = new TextInputBuilder().setCustomId('CtrlVal').setLabel('المعرف الجديد (17-20 رقم)').setStyle(1).setMinLength(17).setMaxLength(20).setValue(current).setRequired(true);
        const modal = new ModalBuilder().setCustomId('Ctrl_Modal_' + key).setTitle('تعديل: ' + key.split('.').pop()).setComponents([{ type:1, components:[input] }]);
        await Message.showModal(modal);
        return;
    }

    if (Message.isModalSubmit() && Message.customId?.startsWith('Ctrl_Modal_')) {
        const key = Message.customId.replace('Ctrl_Modal_', '');
        const val = Message.fields.getTextInputValue('CtrlVal');
        if (!/^\d{17,20}$/.test(val)) return Message.reply({ content: '❌ 17-20 رقم فقط', flags: 64 });
        const cfg = getConfig(); setFieldValue(cfg, key, val); saveConfig(cfg);
        return Message.reply({ content: '✅ **`' + key + '` → `' + val + '`**', flags: 64 });
    }

    // ─── قسم الرسائل: اختيار رسالة ───
    if (Message.isStringSelectMenu() && Message.customId === 'Msg_Section') {
        const cat = MSG_CATEGORIES[Message.values[0]];
        if (!cat) return;
        const db = getMsgDB();
        const items = cat.keys.map(k => '**`' + k + '`** - ' + (db[k]?.title || '??')).join('\n');
        const menu = new StringSelectMenuBuilder().setCustomId('Msg_Field_' + Message.values[0]).setPlaceholder('اختر رسالة لتعديلها...')
            .addOptions(cat.keys.slice(0,25).map(k => ({ label: (db[k]?.title || k).slice(0,100), value: k, description: (db[k]?.content || '').slice(0,100) })));
        const back = new ButtonBuilder().setCustomId('Panel_Messages').setLabel('🔙 رجوع للأقسام').setStyle(2);
        await Message.update({ embeds: [new EmbedBuilder().setTitle(cat.name).setColor('#FFD700').setDescription(items)], components: [{ type:1, components:[menu] }, { type:1, components:[back] }] }).catch(()=>{});
        return;
    }

    if (Message.isStringSelectMenu() && Message.customId?.startsWith('Msg_Field_')) {
        const key = Message.values[0];
        const db = getMsgDB();
        const current = db[key]?.content || '';
        const input = new TextInputBuilder().setCustomId('MsgVal').setLabel('النص الجديد').setStyle(2).setValue(current.slice(0, 1000)).setMaxLength(2000).setRequired(true);
        const modal = new ModalBuilder().setCustomId('Msg_Modal_' + key).setTitle('تعديل: ' + (db[key]?.title || key)).setComponents([{ type:1, components:[input] }]);
        await Message.showModal(modal);
        return;
    }

    if (Message.isModalSubmit() && Message.customId?.startsWith('Msg_Modal_')) {
        const key = Message.customId.replace('Msg_Modal_', '');
        const val = Message.fields.getTextInputValue('MsgVal');
        const db = getMsgDB();
        if (!db[key]) db[key] = { title: key, content: '' };
        db[key].content = val;
        saveMsgDB(db);
        return Message.reply({ content: '✅ **`' + key + '`** تم تحديثه', flags: 64 });
    }
};