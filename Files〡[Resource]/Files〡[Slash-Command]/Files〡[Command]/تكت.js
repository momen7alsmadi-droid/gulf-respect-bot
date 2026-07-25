"use strict";
import { ApplicationCommandOptionType } from "discord.js";

export default {
    name: "تكت",
    description: "إنشاء لوحة تذاكر",
    type: 1,
    options: [
        { name: "النوع", description: "نوع التذكرة", type: ApplicationCommandOptionType.String, required: true, choices: [{ name: "تفعيل", value: "تفعيل" }, { name: "اونر", value: "اونر" }, { name: "المساعدة", value: "المساعدة" }, { name: "الشكاوى", value: "الشكاوى" }, { name: "تقديم", value: "تقديم" }, { name: "محكمة", value: "محكمة" }, { name: "هيئة", value: "هيئة" }] }
    ],
    run: async (Client, Message) => {
        await Message.deferReply({ flags: 64 });
        try {
            const { default: origCmd } = await import("../../Files〡[Command-Handler]/Files〡[Admin]/CD〡[Setup-Ticket].js");

        let fakeContent = "Client.Prefix" + "تكت";
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
