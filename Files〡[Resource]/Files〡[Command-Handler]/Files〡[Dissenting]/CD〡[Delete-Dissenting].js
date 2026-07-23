"use strict";
import { ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import Duration from 'humanize-duration';
import { JsonDatabase } from 'wio.db';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
const DataBase = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Dissenting].json' })
export default {
    name: 'حذف-عقوبة',
    description: "حذف عقوبة",
    Founder: false,
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        // ✅ تم إلغاء التحقق من الصلاحية
        const GetData = DataBase.get(`Dissenting〡${Message.guild.id}`);
        if (!GetData || GetData.length === 0) return Message.reply({ content: `**لا توجد بيانات لعرضها**` });
        const options = GetData.slice(0, 25).map((data, index) => {
            return {
                label: `عقوبة ${index + 1}`,
                description: `السبب: ${data.Reason} - المدة: ${Duration(data.Time, { round: true, language: 'ar', 'serialComma': true, 'units': ['d', 'h', 'm'] })}`,
                value: `${index}`
            };
        });
        const selectMenu = new StringSelectMenuBuilder()
        selectMenu.setCustomId('select-dissenting')
        selectMenu.setPlaceholder('اختر عقوبة')
        selectMenu.addOptions(options);
        const MessageReply = await Message.reply({ content: `**اختر عقوبة من القائمة أدناه:**`, components: [{ type: 1, components: [selectMenu] }] });
        const Filter = (Collected) => Collected.customId === 'select-dissenting' && Collected.user.id === Message.author.id;
        const Collector = MessageReply.createMessageComponentCollector({ filter: Filter, max: 1 });
        Collector.on('collect', async (Collected) => {
            const Value = parseInt(Collected.values[0]);
            const GetData = DataBase.get(`Dissenting〡${Message.guild.id}`);
            GetData.splice(Value, 1);
            DataBase.set(`Dissenting〡${Message.guild.id}`, GetData);
            Collected.update({ content: `**تم حذف العقوبة بنجاح**`, components: [] });
        });
    }
}