"use strict";
import { AttachmentBuilder, EmbedBuilder } from 'discord.js';
import { CommandTf3el, VERSION } from '../../Files〡[Config]/Files〡[Config].js';
import { JsonDatabase } from 'wio.db'
const Points = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Points].json' })

export default {
    name: 'تفعيل',
    description: "تفعيل عضو",
    run: async (Client, Message) => {
        try {
            const Args = Message.content.split(' ');
            const Member = Message.guild.members.cache.get(Args[1]) || Message.mentions.members.first();
            if (!Member) return Message.reply({ content: `✅ **يرجى منشن العضو بشكل صحيح**\n-# v${VERSION}` })
            const Nickname = Args.slice(2).join(` `)
            if (!Nickname) return Message.reply({ content: `✅ **يرجى ادخال اسم العضو**\n-# v${VERSION}` })
            
            // تغيير الاسم
            await Member.setNickname(Nickname).catch(() => {})
            
            // إضافة الرولات
            for (const Role of CommandTf3el.AddRole) {
                if (Role) await Member.roles.add(Role).catch(() => {})
            }
            
            // حذف رول الانتظار إذا وجد
            if (CommandTf3el.RemoveRole) {
                await Member.roles.remove(CommandTf3el.RemoveRole).catch(() => {})
            }
            
            // رسالة الترحيب بالخاص
            const Attachment = new AttachmentBuilder(`Files〡[Resource]/Files〡[Image]/Welcome.png`, { name: 'Welcome.png' });
            const Embed = new EmbedBuilder()
            Embed.setDescription(`**__ — عـزيـزي الـعـضـو ${Member}\n\n— تـم تـفـعـيـلـك فـي سـيـرفـر قـولـف ريـسـبـكـت\n— نـرجـوا مـنـك الإلـتـزام بـالـقـسـم وبـجـمـيـع الـقـوانـيـن\n\n— مـع تـمـنـيـاتـنـا لـك بـالـتـوفـيـق __**`)
            Embed.setImage('attachment://Welcome.png')
            await Member.send({ embeds: [Embed], files: [Attachment] }).catch(() => {})
            
            // نقاط التفعيل
            Points.add(`Point-Tf3el-${Message.guild.id}-${Message.author.id}`, 2)
            
            // رد في القناة
            await Message.reply({
                embeds: [{
                    description: `**__ — عــزيــزي الـعـضـو : ${Member}\n\n— تـم تـفـعـيـلـك من قبل الإداري (${Message.author}) بـنـجـاح\n— قولف ريسبكت يـتـمنـى لـك تـجـربـة سـعـيـدَة__**`
                }]
            })
        } catch (err) {
            console.error('❌ Tf3el error:', err.message);
            await Message.reply({ 
                content: `❌ **خطأ ERR-100**\n> ${err.message?.slice(0, 150)}\n-# v${VERSION}` 
            }).catch(() => {});
        }
    }
};