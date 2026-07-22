'use strict';
/**
* @param { import('discord.js').Client } Client
*/
export default async function (Client) {
  process.on('unhandledRejection', async function (Reason) {
    console.error('[AntiCrash] Unhandled Rejection:', Reason);
  });
  process.on('uncaughtException', async function (Reason) {
    console.error('[AntiCrash] Uncaught Exception:', Reason);
  });
  process.removeAllListeners('warning');
}