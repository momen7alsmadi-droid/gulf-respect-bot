"use strict";
import { ApplicationCommandOptionType } from "discord.js";

export default {
    name: "بانل_شوري",
    description: "عرض لوحة مجلس الشورى",
    type: 1,
    options: [

    ],
    run: async (Client, Message) => {
        await Message.deferReply({ flags: 64 });
        try {
            const { default: origCmd } = await import("../../Files〡[Command-Handler]/Files〡[Al-Shuri]/CD〡[Panel-Al-Shuri].js");

        let fakeContent = "Client.Prefix" + "بانل-شوري";
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
