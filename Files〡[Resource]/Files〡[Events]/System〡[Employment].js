"use strict";
import { EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db';
import { Employment } from '../Files〡[Config]/Files〡[Config].js';
const DataBase = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Employment].json' })
const TextMain = ({ Member, Admin, Rank }) => `**__— عـزيـزي الإداري : <@${Admin}>

— تـم تـوظـيـف الـعـضـو بـنـجـاح : ${Member}

— الـوظـيـفـة : ${Rank}

( مـنــصــة أبــشــر)__**`
let CheckAdmin = ({ Message }) => {
    const GetData = DataBase.get(`Employment〡${Message.message.id}`);
    if (!GetData) return Message.reply({ content: `**يرجى المحاولة مره اخري**`, flags: 64 });
    const Admin = Message.guild.members.cache.get(GetData.Admin);
    if (Admin.id !== Message.user.id) return Message.reply({ content: `**ليس لديك الصلاحية لتنفيذ هذا الأمر**`, flags: 64 });
}
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
    if (Message.isStringSelectMenu()) {
        switch (Message.customId) {
            case 'Employment-Select': {
                switch (Message.values[0]) {
                    case 'PublicSecurity': {
                        await CheckAdmin({ Message: Message });
                        const StringSelect = new StringSelectMenuBuilder({
                            customId: 'Interior-Role', placeholder: 'اختر الرتبة', options: [
                                { label: 'رئيس— رقباء', value: 'ChiefSergeant' },
                                { label: 'رقيب— أول', value: 'FirstSergeant' },
                                { label: 'وكيل — رقيب', value: 'StaffSergeant' },
                                { label: 'عريف', value: 'Corporal' },
                                { label: 'جندي — أول', value: 'FirstSoldier' },
                                { label: 'جندي', value: 'Soldier' },
                                { label: 'مستجد', value: 'Recruit' }
                            ]
                        })
                        await Message.message.edit({ content: `**يرجى اختيار الرتبة المطلوبة**`, components: [{ type: 1, components: [StringSelect] }] });
                    } break;
                    case 'SpecialForces': {
                        await CheckAdmin({ Message: Message });
                        const StringSelect = new StringSelectMenuBuilder({
                            customId: 'SpecialForces-Role', placeholder: 'اختر الرتبة', options: [
                                { label: 'رئيس— رقباء', value: 'ChiefSergeant' },
                                { label: 'رقيب— أول', value: 'FirstSergeant' },
                                { label: 'وكيل — رقيب', value: 'StaffSergeant' },
                                { label: 'عريف', value: 'Corporal' },
                                { label: 'جندي — أول', value: 'FirstSoldier' },
                                { label: 'جندي', value: 'Soldier' },
                                { label: 'مستجد', value: 'Recruit' }
                            ]
                        })
                        await Message.message.edit({ content: `**يرجى اختيار الرتبة المطلوبة**`, components: [{ type: 1, components: [StringSelect] }] });
                    } break;
                    case 'Justice': {
                        await CheckAdmin({ Message: Message });
                        const StringSelect = new StringSelectMenuBuilder({
                            customId: 'Justice-Role', placeholder: 'اختر الرتبة', options: [
                                { label: 'محامي', value: 'Lawyer' },
                                { label: 'قاضي', value: 'Judge' }
                            ]
                        })
                        await Message.message.edit({ content: `**يرجى اختيار الرتبة المطلوبة**`, components: [{ type: 1, components: [StringSelect] }] });
                    } break;
                    case 'AlShuri': {
                        await CheckAdmin({ Message: Message });
                        const StringSelect = new StringSelectMenuBuilder({
                            customId: 'AlShuri-Role', placeholder: 'اختر الرتبة', options: [
                                { label: 'الحزب — الجمهوري', value: 'RepublicanParty' },
                                { label: 'الحزب — الديموقراطي', value: 'DemocraticParty' }
                            ]
                        })
                        await Message.message.edit({ content: `**يرجى اختيار الرتبة المطلوبة**`, components: [{ type: 1, components: [StringSelect] }] });
                    } break;
                    case 'Press': {
                        await CheckAdmin({ Message: Message });
                        const GetData = DataBase.get(`Employment〡${Message.message.id}`);
                        const Member = Message.guild.members.cache.get(GetData.Member);
                        const Channel = Message.guild.channels.cache.get(Employment.Channel);
                        await Member.roles.add(Employment.Press.Role).catch(() => { });
                        await Member.roles.add(Employment.Press.Press).catch(() => { });
                        await Message.message.edit({ content: TextMain({ Member: Member, Admin: GetData.Admin, Rank: 'الصحافة' }), components: [], embeds: [], files: [] });
                        const Embed = new EmbedBuilder()
                        Embed.setTitle(`تم اعطاء الرتبة وزارة الصحافة`);
                        Embed.setImage(GetData.Image);
                        Embed.addFields({ name: 'العضو', value: `${Member}` });
                        Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
                        Embed.addFields({ name: 'الرتبة', value: 'الصحافة' });
                        await Channel.send({ embeds: [Embed] });
                        DataBase.delete(`Employment〡${Message.message.id}`);
                    } break;
                    case 'AntiCorruption': {
                        await CheckAdmin({ Message: Message });
                        const GetData = DataBase.get(`Employment〡${Message.message.id}`);
                        const Member = Message.guild.members.cache.get(GetData.Member);
                        const Channel = Message.guild.channels.cache.get(Employment.Channel);
                        await Member.roles.add(Employment.AntiCorruption.AntiCorruption).catch(() => { });
                        await Message.message.edit({ content: TextMain({ Member: Member, Admin: GetData.Admin, Rank: 'الهيئة المكافحة للفساد' }), components: [], embeds: [], files: [] });
                        const Embed = new EmbedBuilder()
                        Embed.setTitle(`تم اعطاء الرتبة الهيئة المكافحة للفساد`);
                        Embed.setImage(GetData.Image);
                        Embed.addFields({ name: 'العضو', value: `${Member}` });
                        Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
                        Embed.addFields({ name: 'الرتبة', value: 'الهيئة المكافحة للفساد' });
                        await Channel.send({ embeds: [Embed] });
                        DataBase.delete(`Employment〡${Message.message.id}`);
                    } break;
                    case 'TheBloods': {
                        await CheckAdmin({ Message: Message });
                        const GetData = DataBase.get(`Employment〡${Message.message.id}`);
                        const Member = Message.guild.members.cache.get(GetData.Member);
                        const Channel = Message.guild.channels.cache.get(Employment.Channel);
                        await Member.roles.add(Employment.TheBloods.TheBloods).catch(() => { });
                        await Member.roles.add(Employment.TheBloods.Role).catch(() => { });
                        await Message.message.edit({ content: TextMain({ Member: Member, Admin: GetData.Admin, Rank: 'العصابة بلود' }), components: [], embeds: [], files: [] });
                        const Embed = new EmbedBuilder()
                        Embed.setTitle(`تم اعطاء الرتبة العصابة بلود`);
                        Embed.setImage(GetData.Image);
                        Embed.addFields({ name: 'العضو', value: `${Member}` });
                        Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
                        Embed.addFields({ name: 'الرتبة', value: 'العصابة بلود' });
                        await Channel.send({ embeds: [Embed] });
                        DataBase.delete(`Employment〡${Message.message.id}`);
                    } break;
                    case 'ElNms': {
                        await CheckAdmin({ Message: Message });
                        const GetData = DataBase.get(`Employment〡${Message.message.id}`);
                        const Member = Message.guild.members.cache.get(GetData.Member);
                        const Channel = Message.guild.channels.cache.get(Employment.Channel);
                        await Member.roles.add(Employment.ElNms.ElNms).catch(() => { });
                        await Member.roles.add(Employment.ElNms.Role).catch(() => { });
                        await Message.deferUpdate({}).catch(() => { });
                        await Message.message.edit({ content: TextMain({ Member: Member, Admin: GetData.Admin, Rank: 'العصابة الإيطالية' }), components: [], embeds: [], files: [] });
                        const Embed = new EmbedBuilder()
                        Embed.setTitle(`تم اعطاء الرتبة العصابة الإيطالية`);
                        Embed.setImage(GetData.Image);
                        Embed.addFields({ name: 'العضو', value: `${Member}` });
                        Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
                        Embed.addFields({ name: 'الرتبة', value: 'العصابة الإيطالية' });
                        await Channel.send({ embeds: [Embed] });
                        DataBase.delete(`Employment〡${Message.message.id}`);
                    } break;
                    case 'Krabs': {
                        await CheckAdmin({ Message: Message });
                        const GetData = DataBase.get(`Employment〡${Message.message.id}`);
                        const Member = Message.guild.members.cache.get(GetData.Member);
                        const Channel = Message.guild.channels.cache.get(Employment.Channel);
                        await Member.roles.add(Employment.Krabs.Krabs).catch(() => { });
                        await Member.roles.add(Employment.Krabs.Role).catch(() => { });
                        await Message.message.edit({ content: TextMain({ Member: Member, Admin: GetData.Admin, Rank: 'العصابة كربس' }), components: [], embeds: [], files: [] });
                        const Embed = new EmbedBuilder()
                        Embed.setTitle(`تم اعطاء الرتبة العصابة كربس`);
                        Embed.setImage(GetData.Image);
                        Embed.addFields({ name: 'العضو', value: `${Member}` });
                        Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
                        Embed.addFields({ name: 'الرتبة', value: 'العصابة كربس' });
                        await Channel.send({ embeds: [Embed] });
                        DataBase.delete(`Employment〡${Message.message.id}`);
                    } break;
                }
            } break;
            case 'Interior-Role': {
                await CheckAdmin({ Message: Message });
                const GetData = DataBase.get(`Employment〡${Message.message.id}`);
                const RolesMap = {
                    'ChiefSergeant': { role: Employment.Interior.ChiefSergeants, rank: 'رئيس— رقباء' },
                    'FirstSergeant': { role: Employment.Interior.FirstSergeants, rank: 'رقيب— أول' },
                    'Sergeant': { role: Employment.Interior.Sergeant, rank: 'رقيب' },
                    'StaffSergeant': { role: Employment.Interior.StaffSergeants, rank: 'وكيل — رقيب' },
                    'Corporal': { role: Employment.Interior.Corporal, rank: 'عريف' },
                    'FirstSoldier': { role: Employment.Interior.FirstSoldier, rank: 'جندي — أول' },
                    'Soldier': { role: Employment.Interior.Soldier, rank: 'جندي' },
                    'Recruit': { role: Employment.Interior.Recruit, rank: 'مستجد' }
                };
                const SelectedRole = RolesMap[Message.values[0]];
                if (SelectedRole) {
                    const Member = Message.guild.members.cache.get(GetData.Member);
                    const Channel = Message.guild.channels.cache.get(Employment.Channel);
                    await Member.roles.add(Employment.RoleInterior).catch(() => { });
                    await Member.roles.add(Employment.RoleInterior2).catch(() => { });
                    await Member.roles.add(Employment.RoleInterior3).catch(() => { });
                    await Member.roles.add(SelectedRole.role).catch(() => { });
                    await Message.deferUpdate({}).catch(() => { });
                    await Message.message.edit({ content: TextMain({ Member: Member, Admin: GetData.Admin, Rank: SelectedRole.rank }), components: [], embeds: [], files: [] }).catch(() => { })
                    const Embed = new EmbedBuilder()
                    Embed.setTitle(`تم اعطاء الرتبة قوات الداخلية`);
                    Embed.setImage(GetData.Image);
                    Embed.addFields({ name: 'العضو', value: `${Member}` });
                    Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
                    Embed.addFields({ name: 'الرتبة', value: SelectedRole.rank });
                    await Channel.send({ embeds: [Embed] });
                    DataBase.delete(`Employment〡${Message.message.id}`);
                }
            } break;
            case 'SpecialForces-Role': {
                await CheckAdmin({ Message: Message });
                const GetData = DataBase.get(`Employment〡${Message.message.id}`);
                const RolesMap = {
                    'ChiefSergeant': { role: Employment.Interior.ChiefSergeants, rank: 'رئيس— رقباء' },
                    'FirstSergeant': { role: Employment.Interior.FirstSergeants, rank: 'رقيب— أول' },
                    'Sergeant': { role: Employment.Interior.Sergeant, rank: 'رقيب' },
                    'StaffSergeant': { role: Employment.Interior.StaffSergeants, rank: 'وكيل — رقيب' },
                    'Corporal': { role: Employment.Interior.Corporal, rank: 'عريف' },
                    'FirstSoldier': { role: Employment.Interior.FirstSoldier, rank: 'جندي — أول' },
                    'Soldier': { role: Employment.Interior.Soldier, rank: 'جندي' },
                    'Recruit': { role: Employment.Interior.Recruit, rank: 'مستجد' }
                };
                const SelectedRole = RolesMap[Message.values[0]];
                if (SelectedRole) {
                    const Member = Message.guild.members.cache.get(GetData.Member);
                    const Channel = Message.guild.channels.cache.get(Employment.Channel);
                    await Member.roles.add(Employment.RoleSpecialForces).catch(() => { });
                    await Member.roles.add(Employment.RoleSpecialForces2).catch(() => { });
                    await Member.roles.add(Employment.RoleSpecialForces3).catch(() => { });
                    await Member.roles.add(SelectedRole.role).catch(() => { });
                    await Message.deferUpdate({}).catch(() => { });
                    await Message.message.edit({ content: TextMain({ Member: Member, Admin: GetData.Admin, Rank: SelectedRole.rank }), components: [], embeds: [], files: [] });
                    const Embed = new EmbedBuilder()
                    Embed.setTitle(`تم اعطاء الرتبة قوات الخاصة`);
                    Embed.setImage(GetData.Image);
                    Embed.addFields({ name: 'العضو', value: `${Member}` });
                    Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
                    Embed.addFields({ name: 'الرتبة', value: SelectedRole.rank });
                    await Channel.send({ embeds: [Embed] });
                    DataBase.delete(`Employment〡${Message.message.id}`);
                }
            } break;
            case 'AlShuri-Role': {
                await CheckAdmin({ Message: Message });
                const GetData = DataBase.get(`Employment〡${Message.message.id}`);
                const RolesMap = {
                    'RepublicanParty': { role: Employment.AlShuri.RepublicanParty, rank: 'الحزب — الجمهوري' },
                    'DemocraticParty': { role: Employment.AlShuri.DemocraticParty, rank: 'الحزب — الديموقراطي' }
                };
                const SelectedRole = RolesMap[Message.values[0]];
                if (SelectedRole) {
                    const Member = Message.guild.members.cache.get(GetData.Member);
                    const Channel = Message.guild.channels.cache.get(Employment.Channel);
                    await Member.roles.add(Employment.AlShuri.Role).catch(() => { });
                    await Member.roles.add(SelectedRole.role).catch(() => { });
                    await Message.message.edit({ content: TextMain({ Member: Member, Admin: GetData.Admin, Rank: SelectedRole.rank }), components: [], embeds: [], files: [] });
                    const Embed = new EmbedBuilder()
                    Embed.setTitle(`تم اعطاء الرتبة الشورى`);
                    Embed.setImage(GetData.Image);
                    Embed.addFields({ name: 'العضو', value: `${Member}` });
                    Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
                    Embed.addFields({ name: 'الرتبة', value: SelectedRole.rank });
                    await Channel.send({ embeds: [Embed] });
                    DataBase.delete(`Employment〡${Message.message.id}`);
                }
            } break;
            case 'Justice-Role': {
                await CheckAdmin({ Message: Message });
                const GetData = DataBase.get(`Employment〡${Message.message.id}`);
                const RolesMap = {
                    'Lawyer': { role: Employment.Justice.Lawyer, rank: 'محامي' },
                    'Judge': { role: Employment.Justice.Judge, rank: 'قاضي' }
                };
                const SelectedRole = RolesMap[Message.values[0]];
                if (SelectedRole) {
                    const Member = Message.guild.members.cache.get(GetData.Member);
                    const Channel = Message.guild.channels.cache.get(Employment.Channel);
                    await Member.roles.add(Employment.Justice.Role).catch(() => { });
                    await Member.roles.add(SelectedRole.role).catch(() => { });
                    await Message.message.edit({ content: TextMain({ Member: Member, Admin: GetData.Admin, Rank: SelectedRole.rank }), components: [], embeds: [], files: [] });
                    const Embed = new EmbedBuilder()
                    Embed.setTitle(`تم اعطاء الرتبة وزارة العدل`);
                    Embed.setImage(GetData.Image);
                    Embed.addFields({ name: 'العضو', value: `${Member}` });
                    Embed.addFields({ name: 'مسؤول الأمر', value: `<@${GetData.Admin}>` });
                    Embed.addFields({ name: 'الرتبة', value: SelectedRole.rank });
                    await Channel.send({ embeds: [Embed] });
                    DataBase.delete(`Employment〡${Message.message.id}`);
                }
            } break;
        }
    }
}