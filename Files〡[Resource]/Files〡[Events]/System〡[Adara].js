"use strict";
import { EmbedBuilder, ModalBuilder, TextInputBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db'
import { Canvas, loadImage } from 'canvas-constructor/cairo';
const Points = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Points].json' })
const Voice = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/Files〡[Voice].json' })
import DB〡AdminPoint from '../Files〡[DataBase]/DB〡[Admin-Point].js';
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 if (Message.isButton()) {
 switch (Message.customId) {
 case 'Adara-43ar': {
 const Member = Message.guild.members.cache.get(Message.user.id);
 Member.setNickname(`ᴳᴿ⎰⇝ ˻${Member.displayName}˺`).then(async () => {
 await Message.reply({ content: `**تم وضع شعار الادارة على اسمك بنجاح**`, flags: 64 });
 }).catch(async (Error) => {
 await Message.reply({ content: `**لا يمكنك تغيير اسمك الآن**`, flags: 64 });
 });
 } break;
 case 'Adara-Afitar': {
 registerFont('NotoSansArabic.ttf', { family: 'Noto Sans Arabic' });
const ImageAdar = await loadImage('El43ar.png');
 const Member = Message.guild.members.cache.get(Message.user.id);
 const ImageAvatar = await loadImage(Member.user.displayAvatarURL({})?.replace(`.webp`, `.png`)?.replace(`.gif`, `.png`) || 'https://cdn.discordapp.com/embed/avatars/2.png');
 async function Generate() {
 let canvas = new Canvas(ImageAvatar.width, ImageAvatar.height)
 .printImage(ImageAvatar, 0, 0, ImageAvatar.width, ImageAvatar.height)
 .printImage(ImageAdar, 0, 0, ImageAvatar.width, ImageAvatar.height)
 .toBuffer();
 return canvas;
 }
 const Buffer = await Generate();
 Member.send({ files: [Buffer] }).then(async () => {
 await Message.reply({ content: `**تم ارسال إطار الادارة على افتارك بنجاح**`, flags: 64 }).catch(() => { });
 }).catch(async () => {
 await Message.reply({ content: `**لا يمكنك إرسال الصورة الآن**`, flags: 64 }).catch(() => { });
 });
 } break;
 case 'Adara-Point': {
 let FindAdmin = DB〡AdminPoint.findOne({ _id: Message.user.id }).catch(() => {})
 if (!FindAdmin) FindAdmin = new DB〡AdminPoint({ _id: Message.user.id, Point: 0, Added: 0, StartGame: 0, JoinGame: 0, AdminAssistant: 0, Added: 0 }).save();
 const Tf3el = Points.get(`Point-Tf3el-${Message.guild.id}-${Message.user.id}`)
 const Voice〡Point = Voice.get(`Admin〡${Message.user.id}`)
 const Evaluation〡Point = Points.get(`Evaluation〡${Message.user.id}`)
 const Embed = new EmbedBuilder();
 Embed.setAuthor({ name: Message.user.username, iconURL: Message.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setDescription(`__**نقاط الاداري (${Message.user})

التكتات | (${FindAdmin.Point || 0})
التفعيل | (${Tf3el || 0})
فتح اقيام | (${FindAdmin.StartGame || 0})
دخول الاقيام | (${FindAdmin.JoinGame || 0})
الرقابي | (${FindAdmin.AdminAssistant || 0})
التافيك | (${Voice〡Point || 0})
الإضافية | (${FindAdmin.Added || 0})
نقاط التقييم | (${Evaluation〡Point || 0})
الإجمالي | (${Number(FindAdmin.Point || 0) + Number(Tf3el || 0) + Number(FindAdmin.Added || 0) + Number(Voice〡Point || 0) + Number(FindAdmin.StartGame || 0) + Number(FindAdmin.JoinGame || 0) + Number(FindAdmin.AdminAssistant || 0) + Number(Evaluation〡Point || 0)})**__`);
 await Message.reply({ embeds: [Embed], flags: 64 });
 } break;
 case 'Adara-Top': {
 const allAdmins = DB〡AdminPoint.find({}).catch(() => {});
 const adminPoints = allAdmins.map(admin => {
 const Tf3el = Number(Points.get(`Point-Tf3el-${Message.guild.id}-${admin._id}`)) || 0;
 const Voice〡Point = Number(Voice.get(`Admin〡${admin._id}`)) || 0;
 const Evaluation〡Point = Number(Points.get(`Evaluation〡${admin._id}`)) || 0;
 const totalPoints =
 (Number(admin.Point) || 0) +
 (Number(Tf3el) || 0) +
 (Number(admin.Added) || 0) +
 (Number(Voice〡Point) || 0) +
 (Number(admin.StartGame) || 0) +
 (Number(admin.JoinGame) || 0) +
 (Number(admin.AdminAssistant) || 0) +
 (Number(Evaluation〡Point) || 0);
 return { id: admin._id, points: totalPoints };
 });
 adminPoints.sort((a, b) => b.points - a.points);
 const top10Admins = adminPoints.slice(0, 10);
 const Embed = new EmbedBuilder();
 Embed.setTitle('توب نقاط في الادارة');
 Embed.setColor(Message.guild.members.me.displayHexColor);
 top10Admins.forEach((admin, index) => {
 const Member = Message.guild.members.cache.get(admin.id);
 if (Member) {
 Embed.addFields({ name: ` `, value: `**${index + 1}. ${Member} — نقاط ${admin.points}**`, inline: false });
 }
 });
 await Message.reply({ embeds: [Embed], flags: 64 });
 } break;
 case 'Adara-Point-Admin': {
 const TextInput = new TextInputBuilder({ customId: 'Adara-Point-Admin', label: 'الرجاء ادخال ايدي', style: 2, minLength: 18, maxLength: 19, required: true });
 const Modal = new ModalBuilder({ customId: 'Adara-Point-Admin-Modal', title: 'رؤية نقاط', components: [{ type: 1, components: [TextInput] }] });
 await Message.showModal(Modal);
 } break;
 };
 } else if (Message.isModalSubmit()) {
 switch (Message.customId) {
 case 'Adara-Point-Admin-Modal': {
 const TextInput = Message.fields.getTextInputValue('Adara-Point-Admin');
 const Member = Message.guild.members.cache.get(TextInput);
 if (!Member) return Message.reply({ content: `**الرجاء ادخال ايدي صحيح**`, flags: 64 });
 let FindAdmin = DB〡AdminPoint.findOne({ _id: Member.id }).catch(() => {})
 if (!FindAdmin) new DB〡AdminPoint({ _id: Member.id, Point: 0, Added: 0, StartGame: 0, JoinGame: 0, AdminAssistant: 0, Added: 0 }).save();
 const Tf3el = Points.get(`Point-Tf3el-${Message.guild.id}-${Member.id}`)
 const Voice〡Point = Voice.get(`Admin〡${Member.id}`)
 const Evaluation〡Point = Points.get(`Evaluation〡${Member.id}`)
 const Embed = new EmbedBuilder();
 Embed.setAuthor({ name: Member.displayName, iconURL: Member.user.displayAvatarURL({ forceStatic: true, size: 4096 }) });
 Embed.setFooter({ text: `${Message.guild.name}`, iconURL: Message.guild.iconURL({ forceStatic: true, size: 4096 }) });
 Embed.setColor(Message.guild.members.me.displayHexColor);
 Embed.setDescription(`__**نقاط الاداري (${Member})

التكتات | (${FindAdmin.Point || 0})
التفعيل | (${Tf3el || 0})
فتح اقيام | (${FindAdmin.StartGame || 0})
دخول الاقيام | (${FindAdmin.JoinGame || 0})
الرقابي | (${FindAdmin.AdminAssistant || 0})
التافيك | (${Voice〡Point || 0})
الإضافية | (${FindAdmin.Added || 0})
نقاط التقييم | (${Evaluation〡Point || 0})
الإجمالي | (${Number(FindAdmin.Point || 0) + Number(Tf3el || 0) + Number(Evaluation〡Point || 0) + Number(FindAdmin.Added || 0) + Number(Voice〡Point || 0) + Number(FindAdmin.StartGame || 0) + Number(FindAdmin.JoinGame || 0) + Number(FindAdmin.AdminAssistant || 0)})**__`);
 await Message.reply({ embeds: [Embed], flags: 64 });
 } break;
 };
 };
};