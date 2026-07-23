"use strict";
import { ApplicationCommandOptionType, AttachmentBuilder } from 'discord.js';
import { Canvas } from 'canvas-constructor/cairo';
import { JsonDatabase } from 'wio.db';

const Points = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Points].json' });
const Voice = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Voice].json' });
const F = 'Noto Sans Arabic, sans-serif';

export default {
    name: "توب",
    description: "عرض توب النقاط كصورة",
    type: 1,
    options: [{ name: "النوع", description: "نوع التوب", type: ApplicationCommandOptionType.String, required: true,
        choices: [{ name: 'الإدارة', value: 'admin' }, { name: 'العساكر', value: 'police' }]
    }],
    run: async (Client, Message) => {
        try { (await import('canvas')).registerFont('NotoSansArabic.ttf', { family: 'Noto Sans Arabic, sans-serif' }); } catch {}
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
                    const total = (a.Point||0)+(a.Added||0)+(a.StartGame||0)+(a.JoinGame||0)+(a.AdminAssistant||0)+tf3el+voice+evalp;
                    entries.push({ id: a._id, points: total });
                }
            } else {
                const PoliceDB = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Police].json' });
                const keys = PoliceDB.all?.() || [];
                const seen = new Set();
                for (const k of keys) {
                    if (k.ID?.startsWith('Police-Point〡')) {
                        const uid = k.ID.replace('Police-Point〡', '');
                        if (!seen.has(uid)) {
                            seen.add(uid);
                            entries.push({ id: uid, points: (PoliceDB.get(`Police-Point〡${uid}`)||0)+(PoliceDB.get(`Police-AddPoint〡${uid}`)||0)+(PoliceDB.get(`Police-Violations〡${uid}`)||0)+(PoliceDB.get(`Police-Report〡${uid}`)||0) });
                        }
                    }
                }
            }
            entries.sort((a,b) => b.points - a.points);
            const top10 = entries.slice(0, 10);
            if (!top10.length) return Message.editReply({ content: '❌ لا توجد بيانات' });

            const W = 600, rows = top10.length;
            const H = 100 + rows * 70;
            const canvas = new Canvas(W, H)
                .setColor('#0a0a1a').printRectangle(0, 0, W, H)
                .setColor('#d4a853')
                .setTextFont(`bold 32px ${F}`).setTextAlign('center')
                .printText(type==='admin'?'🏆 توب الإدارة 🏆':'🏆 توب العساكر 🏆', W/2, 55);

            const medals = ['🥇','🥈','🥉'];
            for (let i = 0; i < rows; i++) {
                const entry = top10[i];
                const m = Message.guild.members.cache.get(entry.id);
                const display = m?.displayName || entry.id;
                const y = 100 + i * 70;
                const prefix = i < 3 ? medals[i] : `#${i+1}`;
                
                canvas.setColor(i%2===0?'#111130':'#0a0a1a').printRectangle(20, y, W-40, 65);
                canvas.setColor('#ffffff').setTextFont(`bold 22px ${F}`).setTextAlign('left')
                    .printText(prefix, 40, y+45)
                    .printText(display.slice(0, 25), 100, y+45);
                canvas.setColor('#d4a853').setTextAlign('right')
                    .printText(`${entry.points} نقطة`, W-40, y+45);
            }

            const buffer = canvas.toBuffer();
            await Message.editReply({ files: [new AttachmentBuilder(buffer, { name: 'top.png' })] });
        } catch (e) {
            await Message.editReply({ content: `❌ خطأ: ${e.message}` });
        }
    }
};