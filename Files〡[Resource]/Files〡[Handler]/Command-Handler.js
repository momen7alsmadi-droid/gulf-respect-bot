import { readdirSync, readdir } from 'fs';
/**
 * @param { import('discord.js').Client } Client
 */
export default async (Client) => {
    readdirSync('./Files〡[Resource]/Files〡[Command-Handler]/').forEach(dir => {
        readdir(`./Files〡[Resource]/Files〡[Command-Handler]/${dir}/`, (errN, files) => {
            if (errN) return console.log(errN);
            files.forEach(async (file) => {
                const { default: Commands } = await import(`../Files〡[Command-Handler]/${dir}/${file}`);
                if (!Commands.name || !Commands.run) return;
                Client.Command.set(Commands.name, Commands);
            });
        });
    });
};