import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 /**
 * @param { import('discord.js').Client } Client
 */
const Events = async (Client) => {
    const eventsPath = join(__dirname, '../Files〡[Events]');
    const files = await readdir(eventsPath);
    for (const event of files) {
        const EventsFind = await import(`file://${join(eventsPath, event)}`);
        const eventName = event.split('.')[0];
        Client.on(eventName, EventsFind.default.bind(null, Client));
    }
};
export default Events;