"use strict";
import { EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js';
import { VERSION, Founder, CommandPremission, TicketTf3el, Tickets2Sm, TicketT2dem, LogPoint, Dissenting, Reporting, Employment, Identity, AlShuri, Police, CivilRegistry } from '../Files〡[Config]/Files〡[Config].js';
import { writeFileSync, readFileSync } from 'fs';

const configPath = 'Files〡[Resource]/Files〡[Config]/Files〡[Config].js';

function updateConfigKey(key, value) {
    let c = readFileSync(configPath, 'utf8');
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedKey}:\\s*)'[^']*'`, 'g');
    if (regex.test(c)) {
        c = c.replace(regex, `$1'${value}'`);
    } else {
        // Try array format
        const arrRegex = new RegExp(`(${escapedKey}:\\s*\\[)'[^']*'(\\])`, 'g');
        c = c.replace(arrRegex, `$1'${value}'$2`);
    }
    writeFileSync(configPath, c, 'utf8');
    return true;
}

export default async function (Client, Message) {
    if (Message.isStringSelectMenu() && Message.customId === 'ControlPanel-Menu') {
        const isAdmin = Message.user.id === Founder || Message.member.roles.cache.has('1525548154299220159');
        if (!isAdmin) return Message.reply({ content: '❌ لا تملك صلاحية', flags: 64 });

        const section = Message.values[0];
        
        if (section === 'show') {
            const Embed = new EmbedBuilder()
                .setTitle('📋 جميع الإعدادات الحالية')
                .setColor('#00FF00')
                .addFields(
                    { name: '🏷️ صلاحيات الأوامر', value: `نداء: ${CommandPremission.Call}\nاعلانات: ${CommandPremission.Ads}\nنقاط: ${CommandPremission.AddPoint}\nخط: ${CommandPremission.Line}\nادارة: ${CommandPremission.SetupAdara}\nتكت: ${CommandPremission.SetupTicket}\nتوظيف: ${CommandPremission.Employment}\nعقوبات: ${CommandPremission.CreateDissenting}\nمخالف: ${CommandPremission.M5alf}\nفك: ${CommandPremission.Remove5alf}` },
                    { name: '🎫 التذاكر', value: `دعم تفعيل: ${TicketTf3el.Support}\nمشرف تفعيل: ${TicketTf3el.Management}\nاونر: ${TicketTf3el.Owner}\nدعم مساعدة: ${Tickets2Sm.Help.Support}\nدعم شكاوى: ${Tickets2Sm.El4away.Support}` },
                    { name: '📢 القنوات', value: `لوق نقاط: ${LogPoint.Channel}\nعقوبات: ${Dissenting.Channel}\nبلاغات: ${Reporting.Channel}\nتوظيف: ${Employment.Channel}\nهوية: ${Identity.Channel}` },
                    { name: '🏛️ الشورى', value: `ديمقراطي: ${AlShuri.Democratic}\nجمهوري: ${AlShuri.Republican}\nرئيس: ${AlShuri.Leader}\nنائب: ${AlShuri.Deputy}` },
                )
                .setFooter({ text: `v${VERSION} • =تحكم <اسم> <معرف> للتعديل` });
            return Message.reply({ embeds: [Embed], flags: 64 });
        }

        // فتح مودال للتعديل
        const sectionNames = {
            'perms': 'رولات الصلاحيات',
            'tickets': 'رولات التذاكر',
            'police': 'رولات الشرطة',
            'shuri': 'مجلس الشورى',
            'channels': 'قنوات النظام',
        };

        const modal = new ModalBuilder()
            .setCustomId(`ControlModal-${section}`)
            .setTitle(`تعديل ${sectionNames[section] || section}`);

        const input = new TextInputBuilder()
            .setCustomId('config-value')
            .setLabel('أدخل المعرفات الجديدة (مفصولة بفواصل)')
            .setStyle(2)
            .setPlaceholder('مثال: 123456789012345678,987654321098765432')
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder({ components: [input] }));
        await Message.showModal(modal);
    }

    if (Message.isModalSubmit() && Message.customId.startsWith('ControlModal-')) {
        const section = Message.customId.replace('ControlModal-', '');
        const value = Message.fields.getTextInputValue('config-value');
        const ids = value.split(',').map(s => s.trim()).filter(s => /^\d{17,20}$/.test(s));
        
        if (ids.length === 0) {
            return Message.reply({ content: '❌ لم يتم العثور على معرفات صالحة', flags: 64 });
        }

        const configKeys = {
            'perms': [['Call', 'نداء'], ['Ads', 'اعلانات'], ['AddPoint', 'نقاط'], ['Line', 'خط'], ['SetupAdara', 'ادارة'], ['SetupTicket', 'تكتات'], ['Employment', 'توظيف'], ['CreateDissenting', 'عقوبات'], ['M5alf', 'مخالف'], ['Remove5alf', 'فك']],
            'tickets': [['Support', 'دعم-تفعيل', 'TicketTf3el'], ['Management', 'مشرف-تفعيل', 'TicketTf3el'], ['Owner', 'اونر-تكت', 'TicketTf3el']],
            'police': [['Panel', 'لوحة-شرطة', 'Police'], ['PanelM5alfat', 'مخالفات-شرطة', 'Police'], ['PanelReport', 'بلاغات-شرطة', 'Police']],
            'shuri': [['Democratic', 'ديمقراطي', 'AlShuri'], ['Republican', 'جمهوري', 'AlShuri'], ['Leader', 'رئيس-شورى', 'AlShuri'], ['Deputy', 'نائب-شورى', 'AlShuri']],
            'channels': [['Channel', 'لوق-نقاط', 'LogPoint'], ['Channel', 'قناة-عقوبات', 'Dissenting'], ['Channel', 'قناة-بلاغات', 'Reporting'], ['Channel', 'قناة-توظيف', 'Employment']],
        };

        const keys = configKeys[section] || [];
        let updated = [];
        
        for (let i = 0; i < Math.min(keys.length, ids.length); i++) {
            const [key, label, parent] = keys[i];
            const fullKey = parent ? `${parent}.${key}` : key;
            try {
                updateConfigKey(label, ids[i]);
                updated.push(`${label}: ${ids[i]}`);
            } catch (e) {
                updated.push(`❌ ${label}: فشل`);
            }
        }

        await Message.reply({ 
            content: `✅ **تم تحديث ${updated.length} إعدادات:**\n${updated.map(u => `> ${u}`).join('\n')}\n\n⚠️ **يجب إعادة تشغيل البوت لتطبيق التغييرات**\n-# v${VERSION}`,
            flags: 64 
        });
    }
};