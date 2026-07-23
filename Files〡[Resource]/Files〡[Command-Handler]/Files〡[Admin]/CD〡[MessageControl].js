"use strict";
import { EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ActionRowBuilder } from 'discord.js';
import { VERSION } from '../../Files〡[Config]/Files〡[Config].js';
import { readFileSync, writeFileSync } from 'fs';

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

function loadDB() { return JSON.parse(readFileSync(DB_PATH, 'utf8')); }
function saveDB(db) { writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8'); }

export default {
    name: 'رسائل',
    description: "التحكم بجميع رسائل ومظاهر البوت - 57 عنصر",
    aliases: ['messages', 'msgs'],
    run: async (Client, Message) => {
        const isAdmin = Message.member.roles.cache.has('1525549017960808660');
        if (!isAdmin) return Message.reply({ content: '❌ للادارة العليا فقط' });

        const Args = Message.content.split(' ');
        const action = Args[1];
        const msgKey = Args[2];
        const newText = Args.slice(3).join(' ');

        // عرض كل الرسائل
        if (!action) {
            const db = loadDB();
            const total = Object.keys(db).length;
            const Embed = new EmbedBuilder()
                .setTitle('📝 التحكم بجميع رسائل ومظاهر البوت')
                .setColor('#FFD700')
                .setDescription(`**${total} عنصر قابل للتعديل**\n\n**للتعديل:** \`=رسائل تعديل <المفتاح> <النص>\`\n**للعرض:** \`=رسائل عرض <المفتاح>\`\n\n**المتغيرات:** \`{member}\` \`{admin}\` \`{server}\` \`{reason}\` \`{duration}\` \`{rank}\` \`{channel}\` \`{stars}\` \`{code}\` \`{version}\``)
                .addFields(
                    { name: '📨 التفعيل', value: '11 رسالة', inline: true },
                    { name: '🎫 التذاكر', value: '10 رسائل', inline: true },
                    { name: '🛡️ الإدارة', value: '14 رسالة', inline: true },
                    { name: '👮 الشرطة', value: '7 رسائل', inline: true },
                    { name: '🏛️ الحكومة', value: '9 رسائل', inline: true },
                    { name: '🎨 المظهر', value: '6 عناصر', inline: true },
                )
                .setFooter({ text: `v${VERSION} • اختر قسم من القائمة` });

            const Menu = new StringSelectMenuBuilder()
                .setCustomId('MsgCat')
                .setPlaceholder('اختر القسم لعرض رسائله...')
                .addOptions(Object.entries(CATEGORIES).map(([key, cat]) => ({
                    label: cat.name,
                    description: `${cat.messages.length} عنصر`,
                    value: key,
                })));

            const RefreshButton = new ButtonBuilder({ customId: 'Msg-Refresh', label: '🔄 تحديث', style: 2 });

            return Message.reply({ 
                embeds: [Embed], 
                components: [
                    { type: 1, components: [Menu] },
                    { type: 1, components: [RefreshButton] }
                ] 
            });
        }

        // عرض رسالة محددة
        if (action === 'عرض' && msgKey) {
            const db = loadDB();
            if (!db[msgKey]) return Message.reply({ content: '❌ مفتاح غير معروف' });
            const BackButton = new ButtonBuilder({ customId: 'Msg-Refresh', label: '🔄 رجوع للقائمة', style: 2 });
            return Message.reply({
                embeds: [{
                    title: `📝 ${db[msgKey].title}`,
                    description: `**المفتاح:** \`${msgKey}\`\n\n**النص:**\n\`\`\`${db[msgKey].content?.slice(0, 1500)}\`\`\``,
                    color: 0xFFD700,
                    footer: { text: `=رسائل تعديل ${msgKey} <النص>` }
                }],
                components: [{ type: 1, components: [BackButton] }]
            });
        }

        // تعديل رسالة
        if (action === 'تعديل' && msgKey && newText) {
            const db = loadDB();
            if (!db[msgKey]) return Message.reply({ content: '❌ مفتاح غير معروف' });
            db[msgKey].content = newText;
            saveDB(db);
            return Message.reply({ content: `✅ **تم تحديث \`${msgKey}\`**\n-# تغيير فوري • v${VERSION}` });
        }

        return Message.reply({ content: '❌ **الاستخدام:**\n`=رسائل` - عرض الكل\n`=رسائل عرض <مفتاح>` - عرض\n`=رسائل تعديل <مفتاح> <نص>` - تعديل' });
    }
};