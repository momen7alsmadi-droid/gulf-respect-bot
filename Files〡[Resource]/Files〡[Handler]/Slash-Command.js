import { readdirSync, readdir } from 'fs';
/**
* @param { import('discord.js').Client } Client
*/
export default async (Client) => {
    const ApplicationCommands = [];
    readdirSync(`${process.cwd()}/Files〡[Resource]/Files〡[Slash-Command]/`).forEach((Dir) => {
        readdir(`${process.cwd()}/Files〡[Resource]/Files〡[Slash-Command]/${Dir}`, async (Err, Folders) => {
            Folders.forEach(async (Value) => {
                if (!Value.endsWith('.js')) return;
                const { default: Command } = await import(`file://${process.cwd()}/Files〡[Resource]/Files〡[Slash-Command]/${Dir}/${Value}`);
                Client.SlashCommand.set(Command.name, Command);
                ApplicationCommands.push({
                    name: Command.name,
                    description: Command.description ? Command.description : null,
                    type: Command.type,
                    options: Command.options ? Command.options : null,
                });
            });
        });
    });
    Client.on('ready', async () => {
        await Client.application.commands?.set(ApplicationCommands);
    });
};
