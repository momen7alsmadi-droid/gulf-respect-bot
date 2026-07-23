import { Client, Collection } from 'discord.js';
import { connect } from 'mongoose';
import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter { }
class Ť extends Client {
 constructor() {
 super({ intents: 131071, partials: [1, 2, 5, 3, 4, 6, 0], emitter: MyEmitter.defaultMaxListeners = 99999999999 });
 this.Command = new Collection();
 this.SlashCommand = new Collection();
 this.Prefix = '=';
 this.Token = process.env.BOT_TOKEN || process.env.TOKEN;
 // MongoDB - اختياري، البوت يعمل بدونه
 const mongoURI = process.env.MONGODB_URI || '';
 if (mongoURI && !mongoURI.includes('<db_password>') && !mongoURI.includes('<password>')) {
 connect(mongoURI, {
 dbName: 'GulfBank',
 serverSelectionTimeoutMS: 5000,
 connectTimeoutMS: 5000,
 bufferCommands: false,
 }).then(() => console.log('✅ MongoDB connected')).catch(() => console.log('⚠️ MongoDB not available, bot will work without bank'));
 } else {
 console.log('⚠️ No MongoDB URI set, bank features disabled');
 }
 }
}
export default Ť;