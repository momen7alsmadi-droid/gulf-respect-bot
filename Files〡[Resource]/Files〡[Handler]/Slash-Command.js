import { readdirSync } from 'fs';
/**
* @param { import('discord.js').Client } Client
*/
export default async (Client) => {
 const ApplicationCommands = [];
 const dirs = readdirSync(`${process.cwd()}/Files〡[Resource]/Files〡[Slash-Command]/`);
 for (const Dir of dirs) {
 const files = readdirSync(`${process.cwd()}/Files〡[Resource]/Files〡[Slash-Command]/${Dir}`).filter(f => f.endsWith('.js'));
 for (const Value of files) {
 try {
 const { default: Command } = await import(`file://${process.cwd()}/Files〡[Resource]/Files〡[Slash-Command]/${Dir}/${Value}`);
 if (!Command.name || !Command.run) continue;
 Client.SlashCommand.set(Command.name, Command);
 ApplicationCommands.push({
 name: Command.name,
 description: Command.description ? Command.description : null,
 type: Command.type,
 options: Command.options ? Command.options : null,
 });
 } catch (err) {
 console.error(`❌ Failed to load slash command ${Dir}/${Value}:`, err.message);
 }
 }
 }
 console.log(`✅ تم تحميل ${Client.SlashCommand.size} أمر سلاش بنجاح`);
 Client.on('ready', async () => {
 await Client.application.commands?.set(ApplicationCommands);
 console.log(`✅ تم تسجيل ${ApplicationCommands.length} أمر سلاش في ديسكورد`);
 });
};