"use strict";
import { ButtonBuilder, ChannelType, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { JsonDatabase } from 'wio.db'
import { Questions } from '../Files〡[Config]/Files〡[Config].js';
const Database = new JsonDatabase({ databasePath: 'Files〡[Resource]/Files〡[DataBase]/DB〡[Database].json' })
/**
 * @param { import('discord.js').Client } Client
 * @param { import('discord.js').Interaction } Message
*/
export default async function (Client, Message) {
 if (Message.isButton()) {
 switch (Message.customId) {
 case `TF3el-${Message.user.id}`: {
 const questions = ["ما اسمك؟", "كم عمرك؟", "ما هو ايديك؟", 'وين شفت سيرفر ♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜ العظيم'];
 let currentQuestionIndex = 0;
 if (Database.get(`T3erf-${Message.user.id}`)) Database.delete(`T3erf-${Message.user.id}`);
 const askNextQuestion = async () => {
 if (currentQuestionIndex < questions.length) {
 const Embed = new EmbedBuilder();
 Embed.setTitle(`سؤال : ${currentQuestionIndex + 1}`);
 Embed.setDescription(`**# ${questions[currentQuestionIndex]}**`);
 Embed.setImage(`https://i.postimg.cc/D0cnk85n/8ae3b4c3ee514803.png`)
 await Message.message.edit({ embeds: [Embed], components: [] });
 currentQuestionIndex++;
 }
 };
 const filter = response => response.author.id === Message.user.id;
 const collector = Message.channel.createMessageCollector({ filter, max: questions.length, error: ['time'] });
 collector.on('collect', async response => {
 const GetQuestion = Database.get(`T3erf-${Message.user.id}`) || [];
 GetQuestion.push({ question: response.content, correctAnswer: questions[currentQuestionIndex - 1] });
 Database.set(`T3erf-${Message.user.id}`, GetQuestion);
 await response.delete();
 await askNextQuestion();
 });
 await askNextQuestion();
 collector.on('end', async collected => {
 if (collected.size === questions.length) {
 Database.set(`Yes-${Message.user.id}`, 0);
 Database.set(`No-${Message.user.id}`, 0);
 Database.set(`Index-${Message.user.id}`, 0);
 let currentQuestionIndex = Database.get(`Index-${Message.user.id}`) || 0;
 await askQuestion({ index: currentQuestionIndex, Message: Message, Type: 'Se' });
 }
 });
 } break;
 }
 if (Message.customId.startsWith('true_') || Message.customId.startsWith('false_')) {
 let correctCount = Database.get(`Yes-${Message.user.id}`) || 0;
 let incorrectCount = Database.get(`No-${Message.user.id}`) || 0;
 let currentQuestionIndex = Database.get(`Index-${Message.user.id}`) || 0;
 const [response, index] = Message.customId.split('_');
 const q = Questions[parseInt(index)];
 if ((response === 'true' && q.correctAnswer === "خطأ") || (response === 'false' && q.correctAnswer === "صح")) {
 incorrectCount++;
 } else {
 correctCount++;
 }
 Database.set(`Yes-${Message.user.id}`, correctCount);
 Database.set(`No-${Message.user.id}`, incorrectCount);
 Database.set(`Index-${Message.user.id}`, currentQuestionIndex + 1);
 if (incorrectCount >= 3) {
 await Message.deferUpdate({ })
 await Message.editReply({
 content: `**__ يؤسفنا عزيزي المستخدمابلاغك برفضك في تفعيل ♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜\` العظيم \`نتمنى منك مراجعة القوانين ثم بعدها الاجابه :

- <#1437464747917185095>__**`, components: [], embeds: []
 });
 if (Database.has(`Yes-${Message.user.id}`)) Database.delete(`Yes-${Message.user.id}`)
 if (Database.has(`No-${Message.user.id}`)) Database.delete(`No-${Message.user.id}`)
 if (Database.has(`Index-${Message.user.id}`)) Database.delete(`Index-${Message.user.id}`)
 if (Database.has(`T3erf-${Message.user.id}`)) Database.delete(`T3erf-${Message.user.id}`)
 setTimeout(async () => {
 const Tf3el = new ButtonBuilder({ customId: `TF3el-${Message.user.id}`, label: 'بـدء أخـتـبـار الـتـفـعـيـل', style: 3 });
 await Message.channel.send({ content: `${Message.user}`, components: [{ type: 1, components: [Tf3el] }] });
 }, 3000)
 } else if (currentQuestionIndex + 1 < Questions.length) {
 await askQuestion({ index: currentQuestionIndex + 1, Message: Message });
 } else {
 const GetQuestion = Database.get(`T3erf-${Message.user.id}`) || [];
 await Message.deferUpdate({ })
 const userAnswers = GetQuestion.map(q => q.question);
 const responseContent = `**اسمك | ${userAnswers[0]}**\n**عمرك | ${userAnswers[1]}**\n**ايديك | ${userAnswers[2]}**\n**وين شفت سيرفر ♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜ العظيم | ${userAnswers[3]}**`;
 await Message.editReply({ content: responseContent, components: [], embeds: [] });
 await Message.channel.send({
 content: `**__
— عزيزي العضو:( ${Message.user} )

— لقد تم إكمال المقابلة الكتابية .

— عدد الإجابات الصحيحة : ${correctCount}

— عدد الإجابات الخاطئة : ${incorrectCount}
__**` })
 const Embed = new EmbedBuilder()
 Embed.setDescription(`**__ نهنئك عزيزي العضو في قبولك في تفعيل سيرفر ♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜\`العظيم\`

«وَإِنَّهُ لَقَسَمٌ لَّوْ تَعْلَمُونَ عَظِيمٌ» 

الـقـسـم لـ سيرفر وولـف سـيـتي الـعـظـيـم :

اقسم بالله العظيم وعلى كتابه الكريم انني لن افكر في تخريب سيرفر ♜𝑪𝑰𝑨 𝑪𝒐𝒎𝒎𝒖𝒏𝒊𝒕𝒚♜ او مساعده التخريب او النشر او إلحاق الضرر بالسيرفر او تشويه السمعه والله على ما اقول شهيد__**

**__— بـعـد قـول الـقـسـم عـزيـزي ${Message.user} الـعـضـو يـرجـى الـضـغـط عـلـى الـروابـط الـتـالـيـة:

— https://youtu.be/bgr02997vuE?si=YDI0KHInpr8vWEyG

— https://www.tiktok.com/@wc.064?_t=8sNqZbIRdnb&_r=1
و الاشتراك في القنوات و ارسال الدليل هنا شاكرين ومقدرين جهودك\`\`\`وولــف سـيـتـي الـعـظـيـم\`\`\`__**`)
 const Image = new AttachmentBuilder('Files〡[Resource]/Files〡[Image]/2Sm.jpg', { name: '2Sm.jpg' })
 Embed.setImage('attachment://2Sm.jpg')
 if (Database.has(`Yes-${Message.user.id}`)) Database.delete(`Yes-${Message.user.id}`)
 if (Database.has(`No-${Message.user.id}`)) Database.delete(`No-${Message.user.id}`)
 if (Database.has(`Index-${Message.user.id}`)) Database.delete(`Index-${Message.user.id}`)
 if (Database.has(`T3erf-${Message.user.id}`)) Database.delete(`T3erf-${Message.user.id}`)
 await Message.channel.send({ embeds: [Embed], files: [Image] });
 }
 }
 }
}
const askQuestion = async ({ index, Message, Type }) => {
 const q = Questions[index];
 const Embed = new EmbedBuilder();
 Embed.setTitle(`سؤال : ${index + 1}`);
 Embed.setDescription(`**# ${q.question}**`);
 Embed.setImage(`https://i.postimg.cc/D0cnk85n/8ae3b4c3ee514803.png`)
 const ButtonTrue = new ButtonBuilder({ customId: `true_${index}`, label: 'صح', style: 3 });
 const ButtonFalse = new ButtonBuilder({ customId: `false_${index}`, label: 'خطأ', style: 4 });
 if (Type === 'Se') {
 await Message.message.edit({ embeds: [Embed], components: [{ type: 1, components: [ButtonTrue, ButtonFalse] }] });
 } else {
 await Message.deferUpdate({ })
 await Message.editReply({ embeds: [Embed], components: [{ type: 1, components: [ButtonTrue, ButtonFalse] }] });
 }
};