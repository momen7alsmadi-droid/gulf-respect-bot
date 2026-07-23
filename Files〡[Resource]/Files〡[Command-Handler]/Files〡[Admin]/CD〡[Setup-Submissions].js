"use strict";
import { EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { CommandPremission } from '../../Files〡[Config]/Files〡[Config].js';
export default {
    name: 'تقديمات',
    description: "ارسال بانل االتقديمات",
    /**
    * @param { import('discord.js').Client } Client
    * @param { import('discord.js').Message } Message
    */
    run: async (Client, Message) => {
        // ✅ تم إلغاء التحقق من الصلاحية
        const Embed = new EmbedBuilder();
        Embed.setAuthor({ name: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
        Embed.setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
        Embed.setColor(Message.guild.members.me.displayHexColor);
        Embed.setImage(`https://i.postimg.cc/85XCjPCV/zip_3.jpg`)
        Embed.setDescription(`__**– GULF RESPECT VRP || 30𝗸 .
<:GulfRecPecT:1415805541699158097> – لـوحـة تقديمات دولة قولف ريسبكت .

 <a:GulfRecPecT:1415964745017724990> — يُـرجـى اخـتـيـار الـوظـيـفـة المراد التقديم لها .

 <a:GulfRecPecT:1416352136295350396> – مكتب التوظيف في دولة قولف ريسبكت .
**__`)
        const StringMenu = new StringSelectMenuBuilder({ customId: 'Submissions-Menu', placeholder: 'اختر الوظيفة' })
        StringMenu.addOptions([
            { label: 'تـقـديـم・الـداخـلـيـة', description: 'تقديم الـداخـلـيـة', emoji: '<:GulFRecPecT:1416537809958998118>', value: 'Internal' },
            { label: 'تـقـديـم・الـعـصـابـات', description: 'تقديم الـعـصـابـات', emoji: '<:GuLFResPecT:1416435007911886929>', value: 'Gangs' },
            { label: 'تـقـديـم・الإعـلام', description: 'تقديم الإعـلام', emoji: '<:GuLFResPecT:1416537812265865256>', value: 'Media' },
            { label: 'تـقـديـم・الـعـدل', description: 'تقديم الـعـدل', emoji: '<a:GulfRecPecT:1416330236907360356>', value: 'Justice' },
            { label: 'تـقـديـم・الـبـرلـمـان', description: 'تقديم الـبـرلـمـان', emoji: '<:GuLFResPecT:1416435232369934338>', value: 'Consultation' },
            { label: 'تـقـديـم・الـهـيـئـة', description: 'تقديم الـهـيـئـة', emoji: '<:GuLFResPecT:1416435232369934338>', value: 'Authority' },
            { label: 'تـقـديـم・إسـتـقـالـة', description: 'تقديم إسـتـقـالـة', emoji: '<:GuLFResPecT:1416433069187137749>', value: 'Resignation' },
        ])
        await Message.channel.send({ embeds: [Embed], components: [{ type: 1, components: [StringMenu] }] });
    }
}