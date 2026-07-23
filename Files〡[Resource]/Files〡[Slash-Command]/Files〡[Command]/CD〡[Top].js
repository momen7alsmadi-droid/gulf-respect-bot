"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas, loadImage } from 'canvas-constructor/cairo';
import { JsonDatabase } from 'wio.db';

const Points = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Points].json' });
const Voice = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Voice].json' });

export default {
    name: "توب",
    description: "عرض توب النقاط كصورة",
    type: 1,
    options: [
        { name: "النوع", description: "نوع التوب", type: ApplicationCommandOptionType.String, required: true, choices: [
            { name: 'الإدارة', value: 'admin' },
            { name: 'العساكر', value: 'police' },
        ]}
    ],

    run: async (Client, Message) => {
        await Message.deferReply();
        const type = Message.options.getString('النوع');

        try {
            let entries = [];

            if (type === 'admin') {
                const { default: DBAdmin } = await import('../../Files〡[DataBase]/DB〡[Admin-Point].js');
                const all = await DBAdmin.find({}).catch(() => []);
                for (const a of all) {
                    const tf3el = Points.get(`Point-Tf3el-${Message.guild.id}-${a._id}`) || 0;
                    const voice = Voice.get(`Admin〡${a._id}`) || 0;
                    const evalp = Points.get(`Evaluation〡${a._id}`) || 0;
                    const total = (a.Point||0) + (a.Added||0) + (a.StartGame||0) + (a.JoinGame||0) + (a.AdminAssistant||0) + tf3el + voice + evalp;
                    entries.push({ id: a._id, points: total });
                }
            } else {
                const PoliceDB = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Police].json' });
                // Get all keys
                const keys = PoliceDB.all?.() || [];
                const seen = new Set();
                for (const k of keys) {
                    if (k.ID?.startsWith('Police-Point〡')) {
                        const uid = k.ID.replace('Police-Point〡', '');
                        if (!seen.has(uid)) {
                            seen.add(uid);
                            const login = PoliceDB.get(`Police-Point〡${uid}`) || 0;
                            const add = PoliceDB.get(`Police-AddPoint〡${uid}`) || 0;
                            const viol = PoliceDB.get(`Police-Violations〡${uid}`) || 0;
                            const report = PoliceDB.get(`Police-Report〡${uid}`) || 0;
                            entries.push({ id: uid, points: login + add + viol + report });
                        }
                    }
                }
            }

            entries.sort((a, b) => b.points - a.points);
            const top10 = entries.slice(0, 10);

            const W = 600, H = 60 + top10.length * 70;
            const canvas = new Canvas(W, Math.max(H, 200))
                .setColor('#1a1a2e')
                .printRectangle(0, 0, W, Math.max(H, 200))
                .setColor('#c9a84c')
                .setTextFont('bold 36px DejaVu Sans')
                .setTextAlign('center')
                .printText(type === 'admin' ? '🏆 توب الإدارة 🏆' : '🏆 توب العساكر 🏆', W / 2, 50);

            for (let i = 0; i < top10.length; i++) {
                const entry = top10[i];
                const member = Message.guild.members.cache.get(entry.id);
                const displayName = member?.displayName || entry.id;
                const y = 110 + i * 70;
                const medals = ['🥇', '🥈', '🥉'];
                const prefix = i < 3 ? medals[i] : `#${i + 1}`;

                // صف ملون بالتناوب
                canvas.setColor(i % 2 === 0 ? '#16213e' : '#1a1a2e')
                    .printRectangle(20, y - 5, W - 40, 60);

                // ترتيب
                canvas.setColor('#ffffff')
                    .setTextFont('bold 24px DejaVu Sans')
                    .setTextAlign('left')
                    .printText(prefix, 40, y + 38);

                // اسم
                canvas.printText(displayName.slice(0, 25), 120, y + 38);

                // نقاط
                canvas.setColor('#c9a84c')
                    .setTextAlign('right')
                    .printText(`${entry.points} نقطة`, W - 40, y + 38);
            }

            const buffer = canvas.toBuffer();
            const att = new AttachmentBuilder(buffer, { name: 'top.png' });
            await Message.editReply({ files: [att] });
        } catch (e) {
            await Message.editReply({ content: `❌ فشل إنشاء التوب: ${e.message}` });
        }
    }
};