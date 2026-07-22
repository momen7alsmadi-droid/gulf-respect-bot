"use strict";
import { ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';
export default {
    name: 'استدعاء-الهيئة',
    description: "استدعاء الهيئة",
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        if (!Message.member.roles.cache.has('')) return Message.reply({ content: `**ليس لديك الصلاحية لتنفيذ هذا الامر**` });
        const Embed = new EmbedBuilder()
        Embed.setDescription(`**بالضغط على هذا الزر، سيتم إرسال استدعاء رسمي للشخص المطلوب من قِبل هيئة مكافحة الفساد.

الاستدعاء يُستخدم فقط للحالات التي تتطلب تحقيقًا رسميًا في قضايا تتعلق بمكافحة الفساد.

نُذكركم بأهمية الالتزام بالأنظمة واللوائح، وضمان سرية الإجراء واحترام خصوصية الأطراف المعنية.

تنبيه:
    •    يُرجى التحقق من كافة التفاصيل قبل إرسال الاستدعاء.
    •    استخدام الاستدعاء في غير محله قد يُعرضك للمساءلة الإدارية.
\`\`\`هيئة مكافحة الفساد - قولف ريسبكت\`\`\`**`)
        Embed.setColor(Message.guild.members.me.displayHexColor)
        Embed.setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL({ dynamic: true }) })
        const Button = new ButtonBuilder({ customId: 'Call-Authority', label: 'استدعاء الهيئة', style: 2, emoji: '' })
        await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [Button] }] })
    }
}