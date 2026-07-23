"use strict";
import { StringSelectMenuBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
const DataBase = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Employment].json' })
export default {
    name: 'تقاعد',
    description: "تقاعد",
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
    // متاح في جميع القنوات
        // ✅ تم إلغاء التحقق من الصلاحية
        const Agrs = Message.content.split(' ');
        const Member = Message.mentions.members.first() || Message.guild.members.cache.get(Agrs[1])
        if (!Member) return await Message.reply({ content: `**لا يوجد مستخدم مذكور**`, flags: 64 });
        const StringSelect = new StringSelectMenuBuilder({
            customId: 'Retirement-Select', placeholder: 'اختر الرتبة', options: [
                { label: 'الأمن–العام', value: 'PublicSecurity-Role-Retirement', emoji: '<:GulFRecPecT:1416537809958998118>' },
                { label: 'القوات—الخاصة', value: 'SpecialForces-Role-Retirement', emoji: '' },
                { label: 'وزارة — الــعــدل', value: 'Justice-Role-Retirement', emoji: '<a:GulfRecPecT:1416330236907360356>' },
                { label: 'مجلس  — النواب', value: 'AlShuri-Role-Retirement', emoji: '<:GuLFResPecT:1416435232369934338>' },
                { label: 'وزارة  — الصحافة', value: 'Press-Role-Retirement', emoji: '<:GuLFResPecT:1416537812265865256>' },
                { label: 'مكافحة — الفساد', value: 'AntiCorruption-Role-Retirement', emoji: '<:GuLFResPecT:1416435232369934338>' },
                { label: 'عصابة  — البلود', value: 'TheBloods-Role-Retirement', emoji: '<:GuLFResPecT:1416435007911886929>' },
                { label: 'عصابة — النمس', value: 'ElNms-Role-Retirement', emoji: '<:GuLFResPecT:1416435007911886929>' },
                { label: 'عصابة — الكربس', value: 'Krabs-Role-Retirement', emoji: '<:GuLFResPecT:1416435007911886929>' }
            ]
        })
        const MessageReply = await Message.reply({ content: `**يرجى ارسال صوره الموافقة**` });
        const Filter = (Message) => Message.author.id === Message.author.id && Message.attachments.size > 0;
        const Collector = Message.channel.createMessageCollector({ filter: Filter, time: 120000 });
        Collector.on('collect', async (CollectedMessage) => {
            const Attachment = CollectedMessage.attachments.first();
            if (!Attachment) return await MessageReply.edit({ content: `**يرجى إرفاق صورة**`, components: [] });
            DataBase.set(`Retirement〡${MessageReply.id}`, { Image: Attachment.url, Admin: Message.author.id, Member: Member.id, Rank: null })
            await MessageReply.edit({ content: `**يرجى اختيار الرتبة**`, components: [{ type: 1, components: [StringSelect] }] });
        });
    }
}