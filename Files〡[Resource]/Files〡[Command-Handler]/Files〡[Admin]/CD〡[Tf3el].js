"use strict";
import { AttachmentBuilder, EmbedBuilder } from 'discord.js';
import { CommandTf3el } from '../../Files〡[Config]/Files〡[Config].js';
import DB〡AdminPoint from '../../Files〡[DataBase]/DB〡[Admin-Point].js';
import DB〡Balance from '../../Files〡[DataBase]/DB〡[DataBase].js';
import { JsonDatabase } from 'wio.db'
const Points = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Points].json' })
export default {
    name: 'تفعيل',
    description: "تفعيل عضو",
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        if (!Message.member.roles.cache.has(CommandTf3el.Permission)) return;
        // متاح في جميع القنوات
        const Args = Message.content.split(' ');
        const Member = Message.guild.members.cache.get(Args[1]) || Message.mentions.members.first();
        if (!Member) return Message.reply({ content: `<a:GulfRecPecT:1415963988541313117> **يرجى منشن العضو بشكل صحيح**` })
        const Nickname = Args.slice(2).join(` `)
        if (!Nickname) return Message.reply({ content: `<a:GulfRecPecT:1415963988541313117> **يرجى ادخال ايدي العضو**` })
        await Member.setNickname(Nickname).catch(async () => {
            await Message.reply({ content: `**لايمكنك تفعيل العضو لانه تم تفعيله بالأساس **` })
        })
        CommandTf3el.AddRole.forEach(async (Role) => {
            Member.roles.add(Role).catch(async () => { })
        })
        Member.roles.remove(CommandTf3el.RemoveRole).catch(async () => { })
        const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/Welcome.png`, { name: 'Welcome.png' });
        const Embed = new EmbedBuilder()
        Embed.setDescription(`**__ — عـزيـزي الـعـضـو ${Member}

— تـم تـفـعـيـلـك فـي سـيـرفـر قـولـف ريـسـبـكـت الـعـظـيـم للـحـيـاة الـواقـعـيـة نـرجـوا مـنـك الإلـتـزام بـالـقـسـم وبـجـمـيـع الـقـوانـيـن .

— نـتـمـنـى قـراءة <#1420678895132344392> لـفـهـم نـظـامـهـا الـديـمـقـراطـي

( Welcome to - GULF RESPECT || 30k . )( مـع تـمـنـيـاتـنـا لـك بـالـتـوفـيـق )__**`)
        Embed.setImage('attachment://Welcome.png')
        Member.send({ embeds: [Embed], files: [Attachment] })
        Points.add(`Point-Tf3el-${Message.guild.id}-${Message.author.id}`, 2)
        await DB〡Balance.findOneAndUpdate({ _id: Member.id }, { $inc: { Bank: +5000 } }, { upsert: true, new: true })
        const EmbedSand = new EmbedBuilder()
        EmbedSand.setDescription(`**__— أهـلآ بـك فـي مـصـرف الـراجـحـي .

 <:GulfRecPecT:1415963984141488239> — عـزيـزنـا الـعـضـو .

<a:GulfRecPecT:1416329668579164290> — تـم تـفـعـيـل حـسـابـك الـمـصـرفـي بـنـجـاح .

— تـم إضـافـة : 5000 ريـال إلـى حـسـابـك الـمـصـرفـي .__**`)
        EmbedSand.setImage('https://i.postimg.cc/hjzk1Srt/jpg.jpg')
        await Member.send({ embeds: [EmbedSand] }).catch(() => { })
        await Member.send({
            content: `2`}).catch(() => { })
        await Message.reply({
            embeds: [{
                description: `**__ — عــزيــزي الـعـضـو : ${Member}

— تـم تـفـعـيـلـك من قبل الإداري (${Message.author}) بـنـجـاح— تـم تـفـعـيـل الـحـسـاب الـمـصـرفـي لـلـمـواطـن— قولف ريسبكت يـتـمنـى لـك تـجـربـة سـعـيـدة__**`}]
        })
        await Message.channel.send({ files: ['https://i.postimg.cc/hjzk1Srt/jpg.jpg'] })
    }
}