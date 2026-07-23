'use strict';
import { VERSION, ERR } from '../Files〡[Config]/Files〡[Config].js';
/**
* @param { import('discord.js').Client } Client
*/
export default async function (Client) {
  process.on('unhandledRejection', async function (Reason) {
    console.error(`[AntiCrash] [${ERR.GENERAL}] Unhandled Rejection (v${VERSION}):`, Reason?.stack || Reason);
  });
  process.on('uncaughtException', async function (Reason) {
    console.error(`[AntiCrash] [${ERR.GENERAL}] Uncaught Exception (v${VERSION}):`, Reason?.stack || Reason);
  });
  process.removeAllListeners('warning');
};