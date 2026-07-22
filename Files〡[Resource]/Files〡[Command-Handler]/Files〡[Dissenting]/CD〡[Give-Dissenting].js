"use strict";
import { EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import Duration from 'humanize-duration';
import { JsonDatabase } from 'wio.db';
import { CommandPremission, Dissenting } from '../../Files〡[Config]/Files〡[Config].js';
const DataBase = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Dissenting].json' })
export default {
    name: 'مخالف',
    description: "اعطاء سجن",
    Founder: false,
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        if (!Message.member.roles.cache.has(CommandPremission.M5alf)) return Message.reply({ content: `**ليس لديك الصلاحية لتنفيذ هذا الامر**` });
        const Agrs = Message.content.split(` `);
        const Member = Message.mentions.members.first() || Message.guild.members.cache.get(Agrs[1]);
        if (!Member) return Message.reply({ content: `**يرجى منشن العضو بشكل الصحيح**` });
        const GetData = DataBase.get(`Dissenting〡${Message.guild.id}`) || [];
        if (!GetData || GetData.length === 0) return Message.reply({ content: `**لا توجد بيانات لعرضها**` });
        const options = GetData.slice(0, 25).map((data, index) => {
            return {
                label: `عقوبة : ${data.Reason}`,
                description: `المدة: ${Duration(data.Time, { round: true, language: 'ar', 'serialComma': true, 'units': ['d', 'h', 'm'] })}`,
                value: `${index}`
            };
        });
        const selectMenu = new StringSelectMenuBuilder()
        selectMenu.setCustomId('select-dissenting')
        selectMenu.setPlaceholder('اختر عقوبة')
        selectMenu.addOptions(options);
        const MessageReply = await Message.reply({ content: `**يرجى ارسال الدليل:**` });
        const Filter = (Collected) => Collected.author.id === Message.author.id && Collected.attachments.size > 0;
        const Collector = Message.channel.createMessageCollector({ filter: Filter, max: 1, time: 60000 });
        Collector.on('collect', async (Collected) => {
            const Attachment = Collected.attachments.first();
            if (Attachment) {
                const Filter = (Collected) => Collected.user.id === Message.author.id && Collected.customId === 'select-dissenting';
                const MessageReply2 = await MessageReply.edit({ content: `**اختر عقوبة**`, components: [{ type: 1, components: [selectMenu] }] });
                const Collector2 = MessageReply2.createMessageComponentCollector({ filter: Filter, max: 1 });
                Collector2.on('collect', async (Collected) => {
                    const Value = parseInt(Collected.values[0]);
                    const Roles = Member.roles.cache.map(role => role.id);
                    DataBase.set(`Dissenting〡${Member.id}`, { Time: Date.now() + GetData[Value].Time, Reason: GetData[Value].Reason, Roles: Roles, Member: Member.id, Nick: Member.displayName, Stats: true })
                    await Member.setNickname(`${GetData[Value].Reason}`).catch(() => { });
                    await Member.roles.remove(Roles).catch(() => { });
                    await Member.roles.add(Dissenting.Role).catch(() => { });
                    const Channel = Message.guild.channels.cache.get(Dissenting.Channel);
                    const Embed = new EmbedBuilder();
                    Embed.setColor('Red')
                    Embed.setImage(Attachment.url)
                    Embed.addFields({ name: `العضو : `, value: `${Member}` })
                    Embed.addFields({ name: `العقوبة : `, value: `${GetData[Value].Reason}` })
                    Embed.addFields({ name: `المدة : `, value: `${Duration(GetData[Value].Time, { round: true, language: 'ar', 'serialComma': true, 'units': ['d', 'h', 'm'] })}` })
                    Embed.addFields({ name: `مسؤول : `, value: `${Message.author}` })
                    Embed.setThumbnail(Message.guild.iconURL({ dynamic: true }))
                    Embed.setFooter({ text: `تم مخالفة العضو بواسطة ${Message.author.username}`, iconURL: Message.author.displayAvatarURL({ dynamic: true }) })
                    Channel.send({ embeds: [Embed] }).catch(() => { });
                    Member.send({
                        content: `**__
 عزيزي العضو {${Member}}
        
        لقد تم سجنك 
        
        بسبب : ${GetData[Value].Reason}
        
        لمدة : ${Duration(GetData[Value].Time, { round: true, language: 'ar', 'serialComma': true, 'units': ['d', 'h', 'm'] })}__**`
                    }).catch(() => { });
                    MessageReply.edit({ content: `**تم سجن العضو بنجاح **`, components: [] });
                });
            } else {
                MessageReply.edit({ content: `**يرجى إرفاق الصورة**` });
            }
        });
    }
}