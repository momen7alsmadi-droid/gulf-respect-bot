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
        connect(process.env.MONGODB_URI || 'mongodb+srv://da7m:<db_password>@cluster0.q6vbhwi.mongodb.net/?appName=Cluster0', {
            dbName: 'GulfBank',
            socketTimeoutMS: 45000,
            connectTimeoutMS: 30000,
        });
    }
}
export default Ť;