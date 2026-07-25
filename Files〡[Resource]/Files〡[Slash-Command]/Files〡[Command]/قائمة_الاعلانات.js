"use strict";
import { ApplicationCommandOptionType } from "discord.js";

export default {
    name: "قائمة_الاعلانات",
    description: "إنشاء لوحة الإعلانات",
    type: 1,
    options: [

    ],
    run: async (Client, Message) => {
        await Message.deferReply({ flags: 64 });
        try {
            const { default: origCmd } = await import("../../Files〡[Command-Handler]/Files〡[Admin]/CD〡[Ads].js");

        let fakeContent = "Client.Prefix" + "قائمه-الاعلانات";
            const fakeMsg = {
                content: fakeContent,
                mentions: { members: { first: () => Message.options.getMember("العضو") || null } },
                reply: async (x) => { try { return await Message.editReply(x); } catch { return await Message.followUp(x); } },
                channel: Message.channel,
                author: Message.user,
                member: Message.member,
                guild: Message.guild,
                delete: () => {},
            };
            return origCmd.run(Client, fakeMsg, "Client.Prefix");
        } catch(e) {
            await Message.editReply({ content: "❌ خطأ: " + e.message }).catch(() => {});
        }
    }
};
