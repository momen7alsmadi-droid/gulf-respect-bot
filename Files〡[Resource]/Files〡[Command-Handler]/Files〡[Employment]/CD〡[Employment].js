"use strict";
import { StringSelectMenuBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
const DataBase = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Employment].json' })
export default {
    name: 'توظيف',
    description: "توظيف",
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        // متاح في جميع القنوات
        if (!Message.member.roles.cache.has(CommandPremission.Employment)) return Message.reply({ content: `**ليس لديك الصلاحية لتنفيذ هذا الامر**` });
        const Agrs = Message.content.split(' ');
        const Member = Message.mentions.members.first() || Message.guild.members.cache.get(Agrs[1])
        if (!Member) return await Message.reply({ content: `**لا يوجد مستخدم مذكور**`, flags: 64 });
        const StringSelect = new StringSelectMenuBuilder({
            customId: 'Employment-Select', placeholder: 'اختر الرتبة', options: [
                { label: 'الأمن–العام', value: 'PublicSecurity', emoji: '<:GulFRecPecT:1416537809958998118>' },
                { label: 'القوات—الخاصة', value: 'SpecialForces', emoji: '<:GuLFResPecT:1416538236217724929>' },
                { label: 'وزارة — الــعــدل', value: 'Justice', emoji: '<a:GulfRecPecT:1416330236907360356>' },
                { label: 'مجلس  — النواب', value: 'AlShuri', emoji: '<:GuLFResPecT:1416435232369934338>' },
                { label: 'وزارة  — الصحافة', value: 'Press', emoji: '<:GuLFResPecT:1416537812265865256>' },
                { label: 'مكافحة — الفساد', value: 'AntiCorruption', emoji: '<:GuLFResPecT:1416435232369934338>' },
                { label: 'عصابة  — البلود', value: 'TheBloods' },
                { label: 'عصابة — النمس', value: 'ElNms' },
                { label: 'عصابة — الكربس', value: 'Krabs' }
            ]
        })
        const MessageReply = await Message.reply({ content: `**يرجى ارسال صوره الموافقة**` });
        const Filter = (CollectedMessage) => CollectedMessage.author.id === Message.author.id && CollectedMessage.attachments.size > 0;
        const Collector = Message.channel.createMessageCollector({ filter: Filter, time: 120000 });
        Collector.on('collect', async (CollectedMessage) => {
            const Attachment = CollectedMessage.attachments.first();
            if (!Attachment) return await MessageReply.edit({ content: `**يرجى إرفاق صورة**`, components: [] });
            DataBase.set(`Employment〡${MessageReply.id}`, { Image: Attachment.url, Admin: Message.author.id, Member: Member.id, Rank: null })
            await MessageReply.edit({ content: `**يرجى اختيار الرتبة**`, components: [{ type: 1, components: [StringSelect] }] });
        });
    }
}