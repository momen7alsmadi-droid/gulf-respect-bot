import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 /**
 * @param { import('discord.js').Client } Client
 */
const Events = async (Client) => {
 const eventsPath = join(__dirname, '../Files〡[Events]');
 const files = readdirSync(eventsPath).filter(f => f.endsWith('.js'));
 for (const event of files) {
 try {
 const EventsFind = await import(`file://${join(eventsPath, event)}`);
 const eventName = event.split('.')[0];
 Client.on(eventName, EventsFind.default.bind(null, Client));
 } catch (err) {
 console.error(`❌ Failed to load event ${event}:`, err.message);
 }
 }
 console.log(`✅ تم تحميل ${files.length} حدث بنجاح`);
};
export default Events;