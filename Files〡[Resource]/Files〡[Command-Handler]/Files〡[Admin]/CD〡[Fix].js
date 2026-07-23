"use strict";
import { Founder, VERSION } from '../../Files〡[Config]/Files〡[Config].js';

// الرتب التي ستعاد للمالك
const MY_ROLES = [
    '1525548154299220159', // أعلى رتبة
    '1526425799429984377', // الرتبة الثانية
    '1525549017960808660', // الرتبة الثالثة
];

export default {
    name: 'اصلاح',
    description: "إصلاح رتب المالك بعد جلتش التفعيل",
    aliases: ['رتبتي', 'fix'],
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        // فقط للمالك
        if (Message.author.id !== Founder && !['1387331972094890036'].includes(Message.author.id)) {
            return Message.reply({ content: `❌ **ERR-002**\n> هذا الأمر مخصص للمالك فقط\n-# v${VERSION}` });
        }

        const Member = Message.member;
        let added = [];
        let failed = [];

        for (const roleId of MY_ROLES) {
            try {
                if (!Member.roles.cache.has(roleId)) {
                    await Member.roles.add(roleId);
                    added.push(`<@&${roleId}>`);
                }
            } catch (e) {
                failed.push(roleId);
            }
        }

        let msg = '';
        if (added.length > 0) {
            msg += `✅ **تم إرجاع ${added.length} رتب:** ${added.join(' ')}\n`;
        } else {
            msg += `ℹ️ جميع رتبك موجودة مسبقاً.\n`;
        }
        if (failed.length > 0) {
            msg += `❌ **ERR-006**: فشل إرجاع ${failed.length} رتب (تأكد أن البوت أعلى منها)\n`;
        }
        msg += `\n-# الإصدار: v${VERSION}`;

        await Message.reply({ content: msg });
    }
};