"use strict";
import { ModalBuilder, TextInputBuilder, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder } from 'discord.js';
import { readFileSync, writeFileSync } from 'fs';
import { VERSION } from '../Files〡[Config]/Files〡[Config].js';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

const CATEGORIES = {
    activation: { name: '📨 التفعيل', messages: ['welcome','activation','bank','quizTitle','quizPass','quizFail','quizLinks','quizQuestion1','quizQuestion2','quizQuestion3','quizQuestion4','activationTestImage','btnActivate','btnTf3elTicket'] },
    tickets: { name: '🎫 التذاكر', messages: ['ticketTf3el','ticketOwner','ticketHelp','ticketShakwa','ticketT2dem','ticketM7kma','ticketHe2a','ticketClose','ticketTf3elInside','ticketHe2aForm','btnOwnerTicket','btnHelpTicket','btnShakwaTicket','btnT2demTicket','btnLawyerTicket','btnCaseTicket','btnHe2aTicket','he2aLogo','he2aTicketImage','he2aTicketFormImage'] },
    admin: { name: '🛡️ الإدارة', messages: ['adaraPanel','adaraNicknamePrefix','adaraPointsTitle','adaraPointsFields','adaraTopTitle','callAdmin','evaluationDM','evaluationEmbedTitle','evaluationEmbedDesc','evaluationRateTitle','employmentConfirm','employmentImageRequest','employmentSelectRank','lineDivider','adaraAvatarFrame','adminBadgeText','callAdminImage','evaluationRateImage','noPermissionMsg','memberNotFoundMsg','doneMsg'] },
    police: { name: '👮 الشرطة', messages: ['policeLogin','policeLogout','policePanel','violationsPanel','reportPanel','civilPanel','prisonDM','prisonNicknameFormat','btnViolation','btnReport','selectPolice','selectViolation'] },
    government: { name: '🏛️ الحكومة', messages: ['shuriPanel','votePanel','adsPanel','circularsPanel','submissionsPanel','idPanel','idCardName','prosecutionDM','authorityDM','shuriLogo','submissionsLogo','idCardLogo','btnProsecution','btnAuthority','selectAds','selectSubmissions'] },
    employment: { name: '💼 التوظيف', messages: ['employmentConfirm','employmentImageRequest','employmentSelectRank','selectEmployment','selectRetirement'] },
    appearance: { name: '🎨 المظهر', messages: ['serverName','serverLogo','welcomeImage','embedColor','footerText','errorFormat','bankLogo'] }
};

async function showMainMenu(Message) {
    const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
    const Embed = new EmbedBuilder()
        .setTitle('📝 التحكم بجميع رسائل ومظاهر البوت')
        .setColor('#FFD700')
        .setDescription(`**${Object.keys(db).length} عنصر قابل للتعديل**\n\nاختر قسم من القائمة المنسدلة أدناه.`)
        .addFields(
            { name: '📨 التفعيل', value: '11', inline: true },
            { name: '🎫 التذاكر', value: '10', inline: true },
            { name: '🛡️ الإدارة', value: '14', inline: true },
            { name: '👮 الشرطة', value: '7', inline: true },
            { name: '🏛️ الحكومة', value: '9', inline: true },
            { name: '🎨 المظهر', value: '6', inline: true },
        )
        .setFooter({ text: `v${VERSION}` });

    const Menu = new StringSelectMenuBuilder()
        .setCustomId('Messages-Category')
        .setPlaceholder('اختر القسم...')
        .addOptions(Object.entries(CATEGORIES).map(([key, cat]) => ({
            label: cat.name, description: `${cat.messages.length} عنصر`, value: key
        })));

    const RefreshButton = new ButtonBuilder({ customId: 'Msg-Refresh', label: '🔄 تحديث', style: 2 });

    await Message.update({ 
        embeds: [Embed], 
        components: [{ type: 1, components: [Menu] }, { type: 1, components: [RefreshButton] }] 
    }).catch(() => {});
}

async function showCategory(Message, category) {
    const cat = CATEGORIES[category];
    if (!cat) return;
    const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));

    const Embed = new EmbedBuilder()
        .setTitle(`📝 ${cat.name} - ${cat.messages.length} عنصر`)
        .setColor('#FFD700')
        .setDescription(cat.messages.map(k => `**\`${k}\`** - ${db[k]?.title || '???'}`).join('\n'))
        .setFooter({ text: `اختر عنصر للتعديل • v${VERSION}` });

    const Menu = new StringSelectMenuBuilder()
        .setCustomId('Messages-Edit')
        .setPlaceholder('اختر العنصر المراد تعديله...')
        .addOptions(cat.messages.map(k => ({
            label: (db[k]?.title || k).slice(0, 100),
            description: (db[k]?.content || '').slice(0, 100),
            value: k,
        })));

    const BackButton = new ButtonBuilder({ customId: 'Msg-Back', label: '🔙 رجوع للأقسام', style: 2 });

    await Message.update({ 
        embeds: [Embed], 
        components: [{ type: 1, components: [Menu] }, { type: 1, components: [BackButton] }] 
    }).catch(() => {});
}

export default async function (Client, Message) {
    const isAdmin = Message.member?.roles?.cache?.has('1525549017960808660');
    if (!isAdmin) return;

    // زر الرجوع
    if (Message.isButton() && Message.customId === 'Msg-Back') {
        await showMainMenu(Message);
        return;
    }

    // زر التحديث
    if (Message.isButton() && Message.customId === 'Msg-Refresh') {
        await showMainMenu(Message);
        return;
    }

    // اختيار قسم
    if (Message.isStringSelectMenu() && Message.customId === 'Messages-Category') {
        await showCategory(Message, Message.values[0]);
        return;
    }

    // اختيار عنصر للتعديل
    if (Message.isStringSelectMenu() && Message.customId === 'Messages-Edit') {
        const key = Message.values[0];
        const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
        if (!db[key]) return;

        const Modal = new ModalBuilder()
            .setCustomId(`MsgEdit-${key}`)
            .setTitle(`تعديل: ${db[key].title?.slice(0, 45)}`);

        const Input = new TextInputBuilder()
            .setCustomId('newText')
            .setLabel('النص الجديد')
            .setStyle(2)
            .setValue(db[key].content || '')
            .setRequired(true);

        Modal.addComponents(new ActionRowBuilder({ components: [Input] }));
        await Message.showModal(Modal);
    }

    // حفظ التعديل
    if (Message.isModalSubmit() && Message.customId.startsWith('MsgEdit-')) {
        const key = Message.customId.replace('MsgEdit-', '');
        const newText = Message.fields.getTextInputValue('newText');
        const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
        if (!db[key]) return Message.reply({ content: '❌ مفتاح غير معروف', flags: 64 });
        db[key].content = newText;
        writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
        await Message.reply({ 
            content: `✅ **تم تحديث \`${key}\`** (${db[key].title})\n-# تغيير فوري • v${VERSION}`,
            flags: 64 
        });
    }
};