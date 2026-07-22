'use strict';
/**
* @param { import('discord.js').Client } Client
*/
export default async function (Client) {
  process.on('unhandledRejection', async function (Reason) { });
  process.on('uncaughtException', async function (Reason) { });
  process.removeAllListeners('warning');
}