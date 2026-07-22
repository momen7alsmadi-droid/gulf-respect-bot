'use strict';
import Client from './Files〡[Resource]/Files〡[Client]/Client.js';
const client = new Client();
import { readdirSync } from 'fs';
readdirSync('./Files〡[Resource]/Files〡[Handler]/').forEach((Handler) => {
    import(`./Files〡[Resource]/Files〡[Handler]/${Handler}`).then(module => module.default(client));
});
client.login(client.Token)
