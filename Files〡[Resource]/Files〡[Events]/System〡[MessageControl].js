"use strict";
import { ModalBuilder, TextInputBuilder, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { readFileSync, writeFileSync } from 'fs';
import { VERSION } from '../Files〡[Config]/Files〡[Config].js';

const DB_PATH = 'Files〡[Resource]/Files〡[DataBase]/DB〡[AutoLine].json';

const CATEGORIES = {
    activation: { name: '📨 التفعيل', messages: ['welcome', 'activation', 'bank'] },
    tickets: { name: '🎫 التذاكر', messages: ['ticketTf3el', 'ticketOwner', 'ticketHelp', 'ticketShakwa', 'ticketT2dem', 'ticketM7kma', 'ticketHe2a', 'ticketClose'] },
    admin: { name: '🛡️ الإدارة', messages: ['adaraPanel', 'callAdmin', 'evaluationDM', 'employmentConfirm', 'lineDivider'] },
    police: { name: '👮 الشرطة', messages: ['policeLogin', 'policeLogout', 'policePanel', 'violationsPanel', 'reportPanel', 'civilPanel', 'prisonDM'] },
    government: { name: '🏛️ الحكومة', messages: ['shuriPanel', 'votePanel', 'adsPanel', 'circularsPanel', 'submissionsPanel', 'idPanel', 'prosecutionDM', 'authorityDM'] },
    general: { name: '⚙️ عام', messages: ['serverName'] }
};

export default async function (Client, Message) {
    const isAdmin = Message.member?.roles?.cache?.has('1525549017960808660');
    if (!isAdmin) return;

    // قائمة الأقسام → قائمة الرسائل في القسم
    if (Message.isStringSelectMenu() && Message.customId === 'Messages-Category') {
        const category = Message.values[0];
        const cat = CATEGORIES[category];
        if (!cat) return;

        const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));

        const Embed = new EmbedBuilder()
            .setTitle(`📝 ${cat.name} - ${cat.messages.length} رسائل`)
            .setColor('#FFD700')
            .setDescription(cat.messages.map(k => `**\`${k}\`** - ${db[k]?.title || '???'}`).join('\n'))
            .setFooter({ text: `اختر رسالة من القائمة للتعديل • v${VERSION}` });

        const Menu = new StringSelectMenuBuilder()
            .setCustomId('Messages-Edit')
            .setPlaceholder('اختر الرسالة المراد تعديلها...')
            .addOptions(cat.messages.map(k => ({
                label: db[k]?.title?.slice(0, 100) || k,
                description: db[k]?.content?.slice(0, 100) || '',
                value: k,
            })));

        await Message.update({ embeds: [Embed], components: [{ type: 1, components: [Menu] }] });
        return;
    }

    // اختيار رسالة للتعديل → فتح مودال
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
            .setValue(db[key].content)
            .setRequired(true);

        Modal.addComponents(new ActionRowBuilder({ components: [Input] }));
        await Message.showModal(Modal);
    }

    // حفظ التعديل من المودال
    if (Message.isModalSubmit() && Message.customId.startsWith('MsgEdit-')) {
        const key = Message.customId.replace('MsgEdit-', '');
        const newText = Message.fields.getTextInputValue('newText');

        const db = JSON.parse(readFileSync(DB_PATH, 'utf8'));
        if (!db[key]) return Message.reply({ content: '❌ مفتاح غير معروف', flags: 64 });

        db[key].content = newText;
        writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');

        await Message.reply({
            content: `✅ **تم تحديث \`${key}\`** (${db[key].title})\n-# أعد تشغيل البوت لتطبيق التغيير • v${VERSION}`,
            flags: 64
        });
    }
};