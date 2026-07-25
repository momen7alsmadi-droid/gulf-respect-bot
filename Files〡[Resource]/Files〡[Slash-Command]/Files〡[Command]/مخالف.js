"use strict";
import { ApplicationCommandOptionType } from "discord.js";

export default {
    name: "مخالف",
    description: "إعطاء مخالفة وسجن",
    type: 1,
    options: [
        { name: "العضو", description: "العضو المخالف", type: ApplicationCommandOptionType.User, required: true }
    ],
    run: async (Client, Message) => {
        await Message.deferReply({ flags: 64 });
        try {
            const { default: origCmd } = await import("../../Files〡[Command-Handler]/Files〡[Dissenting]/CD〡[Give-Dissenting].js");

        let fakeContent = "Client.Prefix" + "مخالف";
        const memberOpt = Message.options.getMember("العضو");
        if (memberOpt) fakeContent += " <@" + memberOpt.id + ">";
        for (const o of Message.options.data || []) {
          if (o.type === 3 && o.name !== "العضو" && o.name !== "النوع" && o.name !== "إجراء") fakeContent += " " + Message.options.getString(o.name);
          if (o.type === 4) fakeContent += " " + Message.options.getInteger(o.name);
          if (o.name === "النوع" || o.name === "إجراء") fakeContent += " " + Message.options.getString(o.name);
        }
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
