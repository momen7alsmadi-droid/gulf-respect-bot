"use strict";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, ModalBuilder, PermissionsBitField, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { TicketHe2a } from '../Files〡[Config]/Files〡[Config].js';
import { createTranscript } from "discord-html-transcripts"
import { JsonDatabase } from 'wio.db';
const db = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[DataBase].json' });
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
    if (Message.isButton()) {
        switch (Message.customId) {
            case 'He2a-Ticket': {
                const Data = db.get(`Ticket-${Message.guild.id}-${Message.user.id}-He2a`);
                if (Data) return await Message.reply({ content: `**لقد قمت بالفعل بإنشاء تذكرة**`, flags: 64 });
                db.add(`Count-${Message.guild.id}`, 1);
                const Count = db.get(`Count-${Message.guild.id}`).toString().padStart(3, '0');
                const ChannelTicket = await Message.guild.channels.create({
                    name: `Ticket-${Count}`,
                    type: ChannelType.GuildText,
                    parent: TicketHe2a.Parent,
                    permissionOverwrites: [
                        {
                            id: Message.guild.roles.everyone,
                            deny: [PermissionsBitField.Flags.ViewChannel]
                        },
                        {
                            id: Message.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                        },
                        {
                            id: TicketHe2a.Support,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                        },
                        {
                            id: TicketHe2a.Management,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                        },
                        {
                            id: TicketHe2a.ToManagement,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
                        }
                    ]
                })
                db.set(`Ticket-${Message.guild.id}-${Message.user.id}-He2a`, { Channel: ChannelTicket.id, Member: Message.user.id, Guild: Message.guild.id });
                const Embed = new EmbedBuilder();
                Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
                Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
                Embed.setColor(Message.guild.members.me.displayHexColor);
                Embed.setThumbnail('https://i.postimg.cc/zv92XWYR/png.webp');
                Embed.setImage('https://i.postimg.cc/cCK5Sh2S/He2a.webp');
                Embed.setDescription(`**__— مـرحـبـاً فـي هـيـئـة مـكـافـحـة الـفـسـاد 

— يرجى الالتزام بالأنظمة الموضحة ادناه

— احترام الموظف

-شرح بلاغك و تقديم الأدلة  الكافية

— عدم الإزعاج بالمنشن__**`);
                const StringSelect = new StringSelectMenuBuilder({ customId: 'Select-Ticket-7', placeholder: 'خيارات التكت' });
                StringSelect.addOptions([
                    { label: 'قـفـل الـتـكـت', value: 'CloseTicket-7' },
                    { label: 'إضـافـة شـخـص', value: 'AddPerson-7' },
                    { label: 'طـرد شـخـص', value: 'RemovePerson-7' },
                ]);
                await ChannelTicket.send({ content: `${Message.user} - <@&${TicketHe2a.Support}>`, embeds: [Embed], components: [{ type: 1, components: [StringSelect] }] });
                await ChannelTicket.send({
                    content: `**— عزيزي المواطن : ${Message.user}

\`نشكرك على مساهمتك في بناء بيئة نزيهة وخالية من الفساد. نحن في هيئة مكافحة الفساد نضمن لك السرية التامة في جميع البلاغات المقدمة، ونسعى إلى تحقيق العدالة بأعلى درجات المهنية والحياد.\`

يرجى منك تعبئة الاستبيان أدناه بدقة لتزويدنا بجميع التفاصيل اللازمة:
   1.    نوع البلاغ:

    2.    اسم الجهة أو الشخص(إن وجد)

    3.    تفاصيل الحادثة (وصف مختصر)

    4.    المكان الذي وقع فيه الحادث:

    5.    تاريخ وقوع الحادث (تقريبي):

    6.    هل لديك أدلة أو مستندات تدعم البلاغ؟
    •    نعم (يرجى إرفاقها)
    •    لا
    7.    هل تود أن تبقى مجهول الهوية؟
    •    نعم
    •    لا
    8.    ملاحظات إضافية أو تفاصيل قد تساعد في التحقيق:

— تنويه:
    •    جميع البلاغات تُعامل بسرية تامة لضمان حماية خصوصيتك وحقوقك كمبلغ.
    •    ستتم مراجعة البلاغ من قبل فريق مختص في أسرع وقت ممكن، وسنتخذ الإجراءات المناسبة بناءً على الأدلة والمعلومات المقدمة.
    •    لا يتحمل المُبلِّغ أي مسؤولية قانونية عن تقديم البلاغ طالما كان البلاغ مبنيًا على حقائق صادقة.
    
    هيئة مكافحة الفساد - قولف ريسبكت**`})
                await ChannelTicket.send({ files: ['https://i.postimg.cc/nzdJm2Pc/IMG-1946.jpg'] }).then(async () => {
                    await Message.reply({ content: `**تم انشاء التذكرة بنجاح : ${ChannelTicket}**`, flags: 64 }).catch(() => { });
                }).catch(() => { })
            } break;
        }
    } else if (Message.isStringSelectMenu()) {
        switch (Message.customId) {
            case 'Select-Ticket-7': {
                switch (Message.values[0]) {
                    case 'CloseTicket-7': {
                        const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
                        if (!Member.roles.cache.some((Role) => [TicketHe2a.Support, TicketHe2a.Management].includes(Role.id))) return await Message.reply({ content: `**لا يمكنك استلام التكت**`, flags: 64 });
                        await Message.reply({ content: `**— تـم إغـلاق تـذكـرتـك مـن قـبـل الإداري : ${Message.user}\n\n— سيتم إغلاق التذكرة بعد 40 ثانية**` });
                        const Data = db.startsWith(`Ticket-${Message.guild.id}-`).map((Data) => ({ id: Data.ID }));
                        const Embed = new EmbedBuilder();
                        Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
                        Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
                        Embed.setColor(Message.guild.members.me.displayHexColor);
                        Embed.addFields({ name: ' ', value: `رقم التكت | ${Message?.channel?.name?.split('-')[1]}` });
                        Embed.addFields({ name: ' ', value: `قفل بواسطة | ${Message.user}` });
                        for (const DataBase of Data) {
                            const GetTicket = db.get(DataBase.id);
                            if (GetTicket.Channel == Message.channel.id) {
                                Embed.addFields({ name: ' ', value: `فتح بواسطة | <@${GetTicket.Member}>` });
                                if (GetTicket.Moderator) Embed.addFields({ name: ' ', value: `استلم بواسطة | <@${GetTicket.Moderator}>` });
                                db.delete(DataBase.id);
                            }
                        }
                        const ChannelLog = Message.guild.channels.cache.get(TicketHe2a.ChannelLog);
                        const transcript = await createTranscript(Message.channel, { returnType: 'attachment', fileName: `${Message.channel.name}.html` });
                        await ChannelLog.send({ embeds: [Embed], files: [transcript] })
                        setTimeout(async () => {
                            await Message.channel.delete().catch(() => { });
                        }, 10000)
                    } break;
                    case 'AddPerson-7': {
                        const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
                        if (!Member.roles.cache.some((Role) => [TicketHe2a.Support, TicketHe2a.Management].includes(Role.id))) return await Message.reply({ content: `**لا يمكنك استلام التكت**`, flags: 64 });
                        const TextInput = new TextInputBuilder({ customId: 'AddPerson-7', label: 'إضافة شخص', placeholder: 'ادخل ايدي الشخص الذي تريد اضافته', style: 1 });
                        const ActionRow = new ActionRowBuilder({ components: [TextInput] });
                        const Modal = new ModalBuilder({ customId: 'AddPerson-7', title: 'إضافة شخص', components: [ActionRow] });
                        await Message.showModal(Modal);
                    } break;
                    case 'RemovePerson-7': {
                        const Member = await Message.guild.members.fetch(Message.user.id, { force: true, cache: true });
                        if (!Member.roles.cache.some((Role) => [TicketHe2a.Support, TicketHe2a.Management].includes(Role.id))) return await Message.reply({ content: `**لا يمكنك استلام التكت**`, flags: 64 });
                        const TextInput = new TextInputBuilder({ customId: 'RemovePerson-7', label: 'طرد شخص', placeholder: 'ادخل ايدي الشخص الذي تريد طرده', style: 1 });
                        const ActionRow = new ActionRowBuilder({ components: [TextInput] });
                        const Modal = new ModalBuilder({ customId: 'RemovePerson-7', title: 'طرد شخص', components: [ActionRow] });
                        await Message.showModal(Modal);
                    } break;

                }
            }
        }
    } else if (Message.isModalSubmit()) {
        switch (Message.customId) {
            case 'AddPerson-7': {
                const Member = Message.guild.members.cache.get(Message.fields.getTextInputValue('AddPerson-7'));
                if (!Member) return await Message.reply({ content: `**لا يمكنك إضافة شخص غير موجود**`, flags: 64 });
                await Message.channel.permissionOverwrites.edit(Member.id, { ViewChannel: true, SendMessages: true });
                await Message.reply({ content: `**— تـم إضـافـة شـخـص : ${Member}**` });
            } break;
            case 'RemovePerson-7': {
                const Member = Message.guild.members.cache.get(Message.fields.getTextInputValue('RemovePerson-7'));
                if (!Member) return await Message.reply({ content: `**لا يمكنك طرد شخص غير موجود**`, flags: 64 });
                await Message.channel.permissionOverwrites.edit(Member.id, { ViewChannel: false, SendMessages: false });
                await Message.reply({ content: `**— تـم طـرد شـخـص : ${Member}**` });
            } break;
        }
    }
}