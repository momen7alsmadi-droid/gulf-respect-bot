"use strict";
import { writeFileSync, readFileSync } from 'fs';
import { VERSION } from '../../Files〡[Config]/Files〡[Config].js';

const FOUNDER_ID = '1387331972094890036';
const CONFIG_PATH = 'Files〡[Resource]/Files〡[DataBase]/Files〡[Config].json';

export default {
    name: 'مالك',
    description: "إدارة الملاك المشاركين (للمالك فقط)",
    aliases: ['owner', 'owners'],
    run: async (Client, Message) => {
        // فقط الملاك الحاليون (يقرأ من الملف الحي)
        const cfg = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
        const allOwners = [FOUNDER_ID, ...(cfg.Owners || [])];
        if (!allOwners.includes(Message.author.id) && Message.author.id !== FOUNDER_ID) {
            return Message.reply({ content: '❌ هذا الأمر للمالكين فقط' });
        }

        const Args = Message.content.split(' ');
        const action = Args[1];
        const target = Message.mentions.members?.first();

        // cfg already loaded above

        // عرض الملاك الحاليين
        if (!action || action === 'عرض') {
            const owners = cfg.Owners || [];
            const names = owners.map(id => {
                const member = Message.guild.members.cache.get(id);
                return member ? `${member.user.username} (\`${id}\`)` : `\`${id}\``;
            }).join('\n');
            return Message.reply({ 
                embeds: [{
                    title: '👑 الملاك الحاليون',
                    description: names || 'لا يوجد',
                    color: 0xFFD700,
                    footer: { text: `=مالك اضافة @شخص • =مالك حذف @شخص • v${VERSION}` }
                }]
            });
        }

        // إضافة مالك
        if (action === 'اضافة' && target) {
            if (cfg.Owners.includes(target.id)) {
                return Message.reply({ content: `❌ ${target} مضاف بالفعل` });
            }
            cfg.Owners.push(target.id);
            writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf8');
            
            // تحديث فوري
            const { Owners } = await import('../../Files〡[Config]/Files〡[Config].js');
            // تحديث مصفوفة الملاك في الذاكرة
            
            return Message.reply({ content: `✅ **تمت إضافة ${target.user.username}** كمالك مشارك!\n> عنده الآن كل صلاحيات البوت\n> المعرف: \`${target.id}\`\n-# v${VERSION}` });
        }

        // حذف مالك
        if (action === 'حذف' && target) {
            if (target.id === '1387331972094890036') {
                return Message.reply({ content: '❌ لا يمكنك إزالة المالك المؤسس!' });
            }
            cfg.Owners = cfg.Owners.filter(id => id !== target.id);
            writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf8');
            return Message.reply({ content: `✅ **تمت إزالة ${target.user.username}** من الملاك\n-# v${VERSION}` });
        }

        return Message.reply({ content: '❌ **الاستخدام:**\n`=مالك` - عرض الملاك\n`=مالك اضافة @شخص` - إضافة مالك\n`=مالك حذف @شخص` - حذف مالك' });
    }
};