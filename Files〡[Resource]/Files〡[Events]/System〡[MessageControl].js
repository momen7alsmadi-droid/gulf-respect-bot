"use strict";
import { EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder } from 'discord.js';
import { readFileSync, writeFileSync } from 'fs';
import { VERSION } from '../Files〡[Config]/Files〡[Config].js';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';
const OWNERS = ['1387331972094890036', '1154021789148659813'];

const CATS = {
    activation: { name: '📨 التفعيل', keys: ['welcome','activation','bank','quizTitle','quizPass','quizFail','quizLinks','quizQuestion1','quizQuestion2','quizQuestion3','quizQuestion4','activationTestImage','btnActivate','btnTf3elTicket'] },
    tickets: { name: '🎫 التذاكر', keys: ['ticketTf3el','ticketOwner','ticketHelp','ticketShakwa','ticketT2dem','ticketM7kma','ticketHe2a','ticketClose','ticketTf3elInside','ticketHe2aForm','btnOwnerTicket','btnHelpTicket','btnShakwaTicket','btnT2demTicket','btnLawyerTicket','btnCaseTicket','btnHe2aTicket','he2aLogo','he2aTicketImage','he2aTicketFormImage'] },
    admin: { name: '🛡️ الإدارة', keys: ['adaraPanel','adaraNicknamePrefix','adaraPointsTitle','adaraPointsFields','adaraTopTitle','callAdmin','evaluationDM','evaluationEmbedTitle','evaluationEmbedDesc','evaluationRateTitle','employmentConfirm','employmentImageRequest','employmentSelectRank','lineDivider','adaraAvatarFrame','adminBadgeText','callAdminImage','evaluationRateImage','noPermissionMsg','memberNotFoundMsg','doneMsg','lineImage'] },
    police: { name: '👮 الشرطة', keys: ['policeLogin','policeLogout','policePanel','violationsPanel','reportPanel','civilPanel','prisonDM','prisonNicknameFormat','btnViolation','btnReport','selectPolice','selectViolation'] },
    government: { name: '🏛️ الحكومة', keys: ['shuriPanel','votePanel','adsPanel','circularsPanel','submissionsPanel','idPanel','idCardName','prosecutionDM','authorityDM','shuriLogo','submissionsLogo','idCardLogo','btnProsecution','btnAuthority','selectAds','selectSubmissions'] },
    employment: { name: '💼 التوظيف', keys: ['employmentConfirm','employmentImageRequest','employmentSelectRank','selectEmployment','selectRetirement'] },
    appearance: { name: '🎨 المظهر', keys: ['serverName','serverLogo','welcomeImage','embedColor','footerText','errorFormat','bankLogo'] },
};

function isOwner(id) { return OWNERS.includes(id); }

export default async function (Client, Message) {
    const uid = Message.user?.id || Message.author?.id;
    if (!isOwner(uid)) return;

    // زر رفع صورة الخط
    if (Message.isButton() && Message.customId === 'Msg-UploadLine') {
        await Message.reply({ content: '📷 **ارفع صورة الخط الآن في هذه القناة** (خلال 30 ثانية)', flags: 64 });
        const filter = m => m.author.id === uid && m.attachments.size > 0;
        const collector = Message.channel.createMessageCollector({ filter, max: 1, time: 30000 });
        collector.on('collect', async (m) => {
            const url = m.attachments.first().url;
            const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
            db.lineImage = { title: 'صورة الخط', content: url };
            writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
            await m.delete().catch(() => {});
            await Message.followUp({ content: `✅ **تم تحديث صورة الخط!**\n-# استخدم =خط لإرسالها`, flags: 64 });
        });
        return;
    }

    // زر رجوع
    if (Message.isButton() && Message.customId === 'Msg-Back') {
        const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
        const Embed = new EmbedBuilder().setTitle('📝 رسائل البوت').setColor('#FFD700')
            .setDescription('اختر قسماً من القائمة أدناه')
            .addFields(Object.entries(CATS).map(([k,v]) => ({ name: v.name, value: `${v.keys.length} عنصر`, inline: true })))
            .setFooter({ text: `v${VERSION}` });
        const Menu = new StringSelectMenuBuilder().setCustomId('MsgCat').setPlaceholder('اختر قسماً...')
            .addOptions(Object.entries(CATS).map(([k,v]) => ({ label: v.name, value: k, description: `${v.keys.length} عنصر` })));
        await Message.update({ embeds: [Embed], components: [{ type: 1, components: [Menu] }] }).catch(() => {});
        return;
    }

    // اختيار قسم
    if (Message.isStringSelectMenu() && Message.customId === 'MsgCat') {
        const cat = CATS[Message.values[0]];
        if (!cat) return;
        const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
        const items = cat.keys.map(k => `**\`${k}\`** - ${db[k]?.title || '???'}`).join('\n');
        const Embed = new EmbedBuilder().setTitle(cat.name).setColor('#FFD700').setDescription(items)
            .setFooter({ text: 'اختر عنصراً من القائمة للتعديل' });
        const Menu = new StringSelectMenuBuilder().setCustomId('MsgEdit').setPlaceholder('اختر عنصراً للتعديل...')
            .addOptions(cat.keys.slice(0, 25).map(k => ({ label: (db[k]?.title || k).slice(0, 100), value: k, description: (db[k]?.content || '').slice(0, 100) })));
        const Back = new ButtonBuilder().setCustomId('Msg-Back').setLabel('🔙 رجوع').setStyle(2);
        await Message.update({ embeds: [Embed], components: [{ type: 1, components: [Menu] }, { type: 1, components: [Back] }] }).catch(() => {});
        return;
    }

    // اختيار عنصر للتعديل
    if (Message.isStringSelectMenu() && Message.customId === 'MsgEdit') {
        const key = Message.values[0];
        const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
        if (!db[key]) return;
        // نعرض النص الحالي مع زر تعديل
        const Embed = new EmbedBuilder().setTitle(db[key].title).setColor('#FFD700')
            .setDescription(`**المفتاح:** \`${key}\`\n\n**النص الحالي:**\n\`\`\`${(db[key].content || '').slice(0, 1500)}\`\`\``)
            .setFooter({ text: 'للتعديل: اكتب في القناة =رسائل تعديل ' + key + ' <النص الجديد>' });
        const Back = new ButtonBuilder().setCustomId('Msg-Back').setLabel('🔙 رجوع').setStyle(2);
        const btns = [{ type: 1, components: [Back] }];
        if (key === 'lineImage') {
            const UploadBtn = new ButtonBuilder().setCustomId('Msg-UploadLine').setLabel('📷 رفع صورة الخط').setStyle(3);
            btns.unshift({ type: 1, components: [UploadBtn] });
        }
        await Message.update({ embeds: [Embed], components: btns }).catch(() => {});
        return;
    }
};