import { readdirSync } from 'fs';
/**
 * @param { import('discord.js').Client } Client
 */
export default async (Client) => {
    const dirs = readdirSync('./Files〡[Resource]/Files〡[Command-Handler]/');
    for (const dir of dirs) {
        const files = readdirSync(`./Files〡[Resource]/Files〡[Command-Handler]/${dir}/`).filter(f => f.endsWith('.js'));
        for (const file of files) {
            try {
                const { default: Commands } = await import(`../Files〡[Command-Handler]/${dir}/${file}`);
                if (!Commands.name || !Commands.run) continue;
                Client.Command.set(Commands.name, Commands);
            } catch (err) {
                console.error(`❌ Failed to load command ${dir}/${file}:`, err.message);
            }
        }
    }
    console.log(`✅ تم تحميل ${Client.Command.size} أمر بنجاح`);
};