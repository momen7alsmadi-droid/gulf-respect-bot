'use strict';
import 'dotenv/config';
import { patchConsole } from './Files〡[Resource]/Files〡[Handler]/ArabicConsole.js';
import Client from './Files〡[Resource]/Files〡[Client]/Client.js';
const client = new Client();
import { readdirSync } from 'fs';
import { startServer } from './Files〡[Resource]/Files〡[Handler]/KeepAlive.js';

// إصلاح ظهور العربية في الطرفية
patchConsole();

// تشغيل سيرفر Keep-Alive
startServer();

async function loadHandlers() {
    const handlers = readdirSync('./Files〡[Resource]/Files〡[Handler]/').filter(f => f !== 'KeepAlive.js');
    await Promise.all(handlers.map(async (Handler) => {
        const module = await import(`./Files〡[Resource]/Files〡[Handler]/${Handler}`);
        await module.default(client);
    }));
}

loadHandlers().then(() => {
    client.login(client.Token);
}).catch((err) => {
    console.error('Failed to load handlers:', err);
    client.login(client.Token);
});
