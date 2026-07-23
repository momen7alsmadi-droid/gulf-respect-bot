"use strict";
import { EmbedBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder } from 'discord.js';
import { Founder, VERSION, CommandPremission, CommandTf3el, TicketTf3el, Tickets2Sm, TicketT2dem, TicketM7kma, TicketHe2a, PermissionAds, Identity, Submissions, Police, Reporting, CivilRegistry, Voice, AlShuri, Employment, Dissenting, Circulars, LogPoint } from '../../Files〡[Config]/Files〡[Config].js';
import { writeFileSync, readFileSync } from 'fs';

const configPath = 'Files〡[Resource]/Files〡[Config]/Files〡[Config].js';

function updateConfig(key, value) {
    let c = readFileSync(configPath, 'utf8');
    const regex = new RegExp(`(${key}:\\s*)'[^']*'`, 'g');
    c = c.replace(regex, `$1'${value}'`);
    writeFileSync(configPath, c, 'utf8');
}

export default {
    name: 'لوحة-تحكم',
    description: "لوحة تحكم البوت من داخل الديسكورد (للإدارة العليا فقط)",
    aliases: ['تحكم', 'control', 'panel', 'settings'],
    run: async (Client, Message) => {
        // فقط للمالك أو أعلى رتبة
        const isAdmin = Message.author.id === Founder || Message.member.roles.cache.has('1525548154299220159');
        if (!isAdmin) return Message.reply({ content: `❌ **ERR-002**\n> هذه اللوحة للإدارة العليا فقط\n-# v${VERSION}` });

        const Args = Message.content.split(' ');
        const section = Args[1];
        const newValue = Args.slice(2).join(' ');

        if (!section) {
            // عرض القائمة الرئيسية
            const Embed = new EmbedBuilder()
                .setTitle('🛡️ لوحة تحكم البوت')
                .setColor('#FFD700')
                .setDescription(`**اختر القسم الذي تريد تعديله:**\n\n**📋 usage:** \`=تحكم <القسم> <القيمة>\`\n\n**📁 الأقسام المتاحة:**`)
                .addFields(
                    { name: '🏷️ رولات الصلاحيات', value: '`نداء` `اعلانات` `نقاط` `خط` `ادارة` `هوية` `تقديمات` `تكت` `شوري` `عقوبات` `مخالف` `فك` `توظيف`' },
                    { name: '🎫 رولات التذاكر', value: '`دعم-تفعيل` `مشرف-تفعيل` `اونر-تكت` `دعم-مساعدة` `مشرف-مساعدة` `دعم-شكاوى` `صلاحية-شكاوى` `دعم-تقديم`' },
                    { name: '👮 رولات الشرطة', value: '`دخول-شرطة` `خروج-شرطة` `مباشر-شرطة` `نقاط-شرطة` `مخالفات-شرطة` `بلاغات-شرطة` `سجل-مدني`' },
                    { name: '🏛️ مجلس الشورى', value: '`ديمقراطي` `جمهوري` `رول-شورى` `رئيس-شورى` `نائب-شورى`' },
                    { name: '📢 قنوات', value: '`لوق-نقاط` `لوق-تذاكر` `قناة-هوية` `قناة-عقوبات` `قناة-بلاغات` `قناة-توظيف`' },
                    { name: '📋 عرض الإعدادات', value: '`عرض` - عرض جميع الإعدادات الحالية' }
                )
                .setFooter({ text: `v${VERSION} • استخدم =تحكم عرض لمشاهدة كل القيم الحالية` });

            const Menu = new StringSelectMenuBuilder()
                .setCustomId('ControlPanel-Menu')
                .setPlaceholder('اختر القسم للتعديل السريع')
                .addOptions([
                    { label: 'عرض جميع الإعدادات', value: 'show', emoji: '📋' },
                    { label: 'رولات الصلاحيات', value: 'perms', emoji: '🏷️' },
                    { label: 'رولات التذاكر', value: 'tickets', emoji: '🎫' },
                    { label: 'رولات الشرطة', value: 'police', emoji: '👮' },
                    { label: 'مجلس الشورى', value: 'shuri', emoji: '🏛️' },
                    { label: 'قنوات النظام', value: 'channels', emoji: '📢' },
                ]);

            return Message.reply({ embeds: [Embed], components: [{ type: 1, components: [Menu] }] });
        }

        // عرض الإعدادات
        if (section === 'عرض') {
            const Embed = new EmbedBuilder()
                .setTitle('📋 جميع إعدادات البوت الحالية')
                .setColor('#00FF00')
                .setDescription('**🏷️ صلاحيات الأوامر:**')
                .addFields(
                    { name: 'نداء', value: `${CommandPremission.Call}`, inline: true },
                    { name: 'اعلانات', value: `${CommandPremission.Ads}`, inline: true },
                    { name: 'نقاط (اضافة/حذف)', value: `${CommandPremission.AddPoint}`, inline: true },
                    { name: 'خط', value: `${CommandPremission.Line}`, inline: true },
                    { name: 'ادارة', value: `${CommandPremission.SetupAdara}`, inline: true },
                    { name: 'هوية', value: `${CommandPremission.SetupID}`, inline: true },
                    { name: 'تقديمات', value: `${CommandPremission.SetupSubmissions}`, inline: true },
                    { name: 'تكتات', value: `${CommandPremission.SetupTicket}`, inline: true },
                    { name: 'شوري', value: `${CommandPremission.Al_ShuriSetup}`, inline: true },
                    { name: 'عقوبات', value: `${CommandPremission.CreateDissenting}`, inline: true },
                    { name: 'مخالف', value: `${CommandPremission.M5alf}`, inline: true },
                    { name: 'فك', value: `${CommandPremission.Remove5alf}`, inline: true },
                    { name: 'توظيف', value: `${CommandPremission.Employment}`, inline: true },
                    { name: '🎫 دعم تفعيل', value: `${TicketTf3el.Support}`, inline: true },
                    { name: '🎫 مشرف تفعيل', value: `${TicketTf3el.Management}`, inline: true },
                    { name: '📢 لوق النقاط', value: `${LogPoint.Channel}`, inline: true },
                    { name: '🚔 قناة عقوبات', value: `${Dissenting.Channel}`, inline: true },
                    { name: '📋 قناة بلاغات', value: `${Reporting.Channel}`, inline: true },
                    { name: '💼 قناة توظيف', value: `${Employment.Channel}`, inline: true },
                )
                .setFooter({ text: `v${VERSION} • للتعديل: =تحكم <اسم_القسم> <المعرف_الجديد>` });
            return Message.reply({ embeds: [Embed] });
        }

        // تعديل سريع
        const configMap = {
            // صلاحيات الأوامر
            'نداء': 'CommandPremission.Call',
            'اعلانات': 'CommandPremission.Ads',
            'نقاط': 'CommandPremission.AddPoint',
            'خط': 'CommandPremission.Line',
            'ادارة': 'CommandPremission.SetupAdara',
            'هوية': 'CommandPremission.SetupID',
            'تقديمات': 'CommandPremission.SetupSubmissions',
            'تكت': 'CommandPremission.SetupTicket',
            'شوري': 'CommandPremission.Al_ShuriSetup',
            'عقوبات': 'CommandPremission.CreateDissenting',
            'مخالف': 'CommandPremission.M5alf',
            'فك': 'CommandPremission.Remove5alf',
            'توظيف': 'CommandPremission.Employment',
            // تذاكر
            'دعم-تفعيل': 'TicketTf3el.Support',
            'مشرف-تفعيل': 'TicketTf3el.Management',
            'اونر-تكت': 'TicketTf3el.Owner',
            'دعم-مساعدة': 'Tickets2Sm.Help.Support',
            'مشرف-مساعدة': 'Tickets2Sm.Help.Management',
            'دعم-شكاوى': 'Tickets2Sm.El4away.Support',
            'صلاحية-شكاوى': 'Tickets2Sm.El4away.Permission',
            'دعم-تقديم': 'TicketT2dem.Support',
            // شرطة
            'دخول-شرطة': 'Police.Login',
            'خروج-شرطة': 'Police.Logout',
            'مباشر-شرطة': 'Police.OnDutyList',
            'نقاط-شرطة': 'Police.AddPoint',
            'مخالفات-شرطة': 'Police.PanelM5alfat',
            'بلاغات-شرطة': 'Police.PanelReport',
            'سجل-مدني': 'CivilRegistry.Registry',
            // شورى
            'ديمقراطي': 'AlShuri.Democratic',
            'جمهوري': 'AlShuri.Republican',
            'رول-شورى': 'AlShuri.Role',
            'رئيس-شورى': 'AlShuri.Leader',
            'نائب-شورى': 'AlShuri.Deputy',
            // قنوات
            'لوق-نقاط': 'LogPoint.Channel',
            'لوق-تذاكر': 'TicketTf3el.ChannelLog',
            'قناة-هوية': 'Identity.Channel',
            'قناة-عقوبات': 'Dissenting.Channel',
            'قناة-بلاغات': 'Reporting.Channel',
            'قناة-توظيف': 'Employment.Channel',
        };

        if (configMap[section] && newValue) {
            // التحقق من صحة المعرف
            if (!/^\d{17,20}$/.test(newValue)) {
                return Message.reply({ content: `❌ المعرف غير صالح! يجب أن يكون رقماً من 17-20 خانة` });
            }

            try {
                updateConfig(section, newValue);
                await Message.reply({ content: `✅ **تم تحديث \`${section}\`** بنجاح!\n> القيمة الجديدة: \`${newValue}\`\n> ⚠️ يلزم إعادة تشغيل البوت لتطبيق التغيير` });
            } catch (e) {
                await Message.reply({ content: `❌ **ERR-006**\n> فشل حفظ التغيير: ${e.message}` });
            }
        } else if (configMap[section] && !newValue) {
            return Message.reply({ content: `📋 **استخدام:** \`=تحكم ${section} <المعرف>\`\n> مثال: \`=تحكم نداء 123456789012345678\`` });
        } else {
            return Message.reply({ content: `❌ قسم غير معروف: \`${section}\`\n> استخدم \`=تحكم\` للمشاهدة الأقسام المتاحة` });
        }
    }
};