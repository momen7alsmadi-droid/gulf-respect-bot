"use strict";
import { EmbedBuilder } from 'discord.js';
import { Founder, Owners, VERSION } from '../../Files〡[Config]/Files〡[Config].js';

const AdminCommands = [
    // ═══════════ قسم التفعيل والتذاكر ═══════════
    { name: '═══ 📁 قسم التفعيل والتذاكر ═══', value: ' ' },
    { name: '=تفعيل @عضو الاسم', value: 'تفعيل عضو جديد وتغيير اسمه وإعطائه رولات التفعيل و 5000 ريال' },
    { name: '=تكت تفعيل', value: 'إنشاء لوحة تذاكر التفعيل لاستقبال الأعضاء الجدد' },
    { name: '=تكت اونر', value: 'إنشاء لوحة تذاكر طلب الأونر للشكاوى العليا' },
    { name: '=تكت المساعدة', value: 'إنشاء لوحة تذاكر المساعدة والاستفسارات' },
    { name: '=تكت الشكاوى', value: 'إنشاء لوحة تذاكر الشكاوى العامة' },
    { name: '=تكت تقديم', value: 'إنشاء لوحة تذاكر تقديم على الإدارة' },
    { name: '=تكت محكمة', value: 'إنشاء لوحة تذاكر المحكمة (طلب محامي + رفع قضية)' },
    { name: '=تكت هيئة', value: 'إنشاء لوحة تذاكر هيئة مكافحة الفساد' },
    
    // ═══════════ قسم الإدارة ═══════════
    { name: '═══ 📁 قسم الإدارة ═══', value: ' ' },
    { name: '=سيطب-ادارة', value: 'إنشاء لوحة الإدارة (نقاط - شعار - أفاتار - توب)' },
    { name: '=اضافة-نقاط @عضو عدد', value: 'إضافة نقاط لإداري في سجل نقاط الإدارة' },
    { name: '=ازالة-نقاط @عضو عدد', value: 'حذف نقاط من إداري في سجل نقاط الإدارة' },
    { name: '=تصفير-نقاط @عضو', value: 'تصفير جميع نقاط إداري بالكامل' },
    
    // ═══════════ قسم الإعلانات والتعاميم ═══════════
    { name: '═══ 📁 قسم الإعلانات والتعاميم ═══', value: ' ' },
    { name: '=قائمه-الاعلانات', value: 'إنشاء لوحة الإعلانات (8 أنواع: عصابات - داخلية - رئيس - مجلس - مسؤول عصابات - مجهول - إعلام - فساد)' },
    { name: '=قائمه-تعميمات', value: 'إنشاء لوحة التعاميم (تعاميم الأمن - تعاميم القوات - تعاميم الداخلية)' },
    
    // ═══════════ قسم الهوية والتقديمات ═══════════
    { name: '═══ 📁 قسم الهوية والتقديمات ═══', value: ' ' },
    { name: '=سيطب-الهوية تقديم-هوية', value: 'إنشاء لوحة تقديم الهوية الوطنية للأعضاء' },
    { name: '=سيطب-الهوية عرض-هوية', value: 'إنشاء لوحة عرض الهوية الشخصية' },
    { name: '=حذف-هوية @عضو', value: 'حذف الهوية الوطنية لعضو محدد' },
    { name: '=تقديمات', value: 'إنشاء لوحة التقديمات (الداخلية - العصابات - الإعلام - العدل - البرلمان - الهيئة - الاستقالة)' },
    
    // ═══════════ قسم الشرطة والعساكر ═══════════
    { name: '═══ 📁 قسم الشرطة والعساكر ═══', value: ' ' },
    { name: '=بانل-العساكر', value: 'إنشاء لوحة العساكر (تسجيل دخول - خروج - قائمة المباشرين - إعادة تعيين)' },
    { name: '=بانل-المخالفات', value: 'إنشاء لوحة المخالفات المرورية لتسجيل مخالفة على عضو' },
    { name: '=بانل-ريبورت', value: 'إنشاء لوحة البلاغات للإبلاغ عن المخالفين' },
    { name: '=السجل-المدني', value: 'إنشاء لوحة السجل المدني (إنشاء - استعلام - تعديل)' },
    { name: '=إضافة-نقاط-عسكري @عضو عدد', value: 'إضافة نقاط للعسكري في سجل الشرطة' },
    { name: '=إزالة-نقاط-عسكري @عضو عدد', value: 'حذف نقاط من العسكري في سجل الشرطة' },
    { name: '=نقاطي', value: 'عرض نقاطك كعسكري (نقاط الدخول - المخالفات - البلاغات - الإضافية)' },
    { name: '=تصفير-عسكري @عضو', value: 'تصفير جميع نقاط عسكري' },
    
    // ═══════════ قسم العقوبات ═══════════
    { name: '═══ 📁 قسم العقوبات والمخالفات ═══', value: ' ' },
    { name: '=انشاء-عقوبة المدة السبب', value: 'إنشاء عقوبة جديدة مثال: 30m قتل (s=ثواني m=دقائق h=ساعات d=أيام)' },
    { name: '=حذف-عقوبة', value: 'حذف عقوبة من قائمة العقوبات المخزنة' },
    { name: '=مخالف @عضو', value: 'إعطاء مخالفة وسجن لعضو مع إرفاق دليل (صورة)' },
    { name: '=فك @عضو', value: 'فك السجن عن عضو وإرجاع رتبه السابقة' },
    
    // ═══════════ قسم مجلس الشورى ═══════════
    { name: '═══ 📁 قسم مجلس الشورى ═══', value: ' ' },
    { name: '=تسطيب-الشوري', value: 'إنشاء لوحة رفع مشروع قرار في مجلس الشورى' },
    { name: '=بانل-شوري', value: 'عرض لوحة أعضاء مجلس النواب (رئيس - نائب - حزبين)' },
    { name: '=تصويت', value: 'إنشاء لوحة بدء وإنهاء التصويت على القرارات' },
    
    // ═══════════ قسم التوظيف ═══════════
    { name: '═══ 📁 قسم التوظيف ═══', value: ' ' },
    { name: '=توظيف @عضو', value: 'توظيف عضو في منصب (أمن - قوات خاصة - عدل - شورى - صحافة - فساد - عصابات) مع إرفاق صورة الموافقة' },
    { name: '=تقاعد @عضو', value: 'تقاعد عضو وسحب جميع رتبه الوظيفية' },
    
    // ═══════════ أوامر عامة ═══════════
    { name: '═══ 📁 أوامر عامة ═══', value: ' ' },
    { name: '=نداء @عضو السبب', value: 'إرسال نداء خاص للعضو في الخاص مع ذكر السبب' },
    { name: '=خط', value: 'إرسال خط فاصل جميل في القناة (يحذف الأمر تلقائياً)' },
    { name: '=النيابة', value: 'إنشاء لوحة استدعاء النيابة العامة للتحقيق' },
    { name: '=استدعاء-الهيئة', value: 'إنشاء لوحة استدعاء هيئة مكافحة الفساد' },
    { name: '=مساعدة', value: 'عرض قائمة الأوامر هذه' },
    { name: '=لوحة-تحكم', value: '🛡️ لوحة تحكم البوت من داخل الديسكورد - تعديل كل المعرفات (للإدارة العليا فقط)' },
    
    // ═══════════ أوامر سلاش ═══════════
    { name: '═══ 📁 أوامر سلاش (/) ═══', value: ' ' },
    { name: '/رولات', value: 'إعطاء أو إزالة رولات بالجملة (4 أقسام: إدارة - مناصب - عصابات - عامة)' },
];

const MemberCommands = [
    { name: '═══ 📁 أوامر متاحة للجميع ═══', value: ' ' },
    { name: '=مساعدة', value: 'عرض قائمة الأوامر المتاحة لك' },
    { name: '=نقاطي', value: 'عرض نقاطك كعسكري في وزارة الداخلية' },
];

export default {
    name: 'مساعدة',
    description: "عرض قائمة الأوامر",
    aliases: ['help', 'اوامر', 'الاوامر', 'مساعده'],
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message, { Prefix }) => {
        // التحقق إذا كان المستخدم من الإدارة العليا
        const isAdmin = Message.member.id === Founder || 
                       Owners.includes(Message.member.id) || 
                       Message.member.roles.cache.has('1525548154299220159') ||
                       Message.member.roles.cache.has('1526425799429984377');
        
        const commands = isAdmin ? AdminCommands : MemberCommands;
        
        const Embed = new EmbedBuilder();
        Embed.setAuthor({ name: `📋 ${Message.guild.name} - قائمة الأوامر`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
        Embed.setColor(isAdmin ? '#FFD700' : '#5865F2');
        Embed.setThumbnail(Message.guild.iconURL({ forceStatic: true, size: 4096 }));
        
        if (isAdmin) {
            Embed.setTitle('🛡️ **قائمة الإدارة العليا - جميع أوامر البوت** 🛡️');
            Embed.setFooter({ text: `🛡️ القائمة الكاملة للإدارة • عدد الأقسام: 10 • Prefix: ${Prefix}` });
        } else {
            Embed.setTitle('📋 **قائمة الأوامر المتاحة للأعضاء**');
            Embed.setFooter({ text: `📋 قائمة الأعضاء • للمزيد تواصل مع الإدارة` });
        }

        // تقسيم الأوامر إلى مجموعات للإرسال
        const fieldsPerEmbed = isAdmin ? 25 : 25;
        const embeds = [];
        
        for (let i = 0; i < commands.length; i += fieldsPerEmbed) {
            const chunk = commands.slice(i, i + fieldsPerEmbed);
            const embed = new EmbedBuilder()
                .setColor(isAdmin ? '#FFD700' : '#5865F2');
            
            if (i === 0) {
                embed.setAuthor({ name: `📋 ${Message.guild.name} - قائمة الأوامر`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
                embed.setThumbnail(Message.guild.iconURL({ forceStatic: true, size: 4096 }));
                if (isAdmin) {
                    embed.setTitle('🛡️ **قائمة الإدارة العليا - جميع أوامر البوت** 🛡️');
                } else {
                    embed.setTitle('📋 **قائمة الأوامر المتاحة للأعضاء**');
                }
            }
            
            let description = '';
            for (const cmd of chunk) {
                if (cmd.value === ' ') {
                    description += `\n${cmd.name}\n`;
                } else {
                    description += `**\`${cmd.name}\`**\n> ${cmd.value}\n\n`;
                }
            }
            embed.setDescription(description || 'لا توجد أوامر');
            
            if (isAdmin && i + fieldsPerEmbed >= commands.length) {
                embed.setFooter({ text: `🛡️ القائمة الكاملة للإدارة • ${AdminCommands.filter(c => c.value !== ' ').length} أمر • Prefix: ${Prefix} • v${VERSION}` });
            } else if (!isAdmin) {
                embed.setFooter({ text: `📋 للمزيد من الأوامر تواصل مع الإدارة • v${VERSION}` });
            }
            
            embeds.push(embed);
        }

        // إرسال جميع الأقسام
        await Message.reply({ embeds: [embeds[0]] });
        for (let i = 1; i < embeds.length; i++) {
            await Message.channel.send({ embeds: [embeds[i]] });
        }
    }
};