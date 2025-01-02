const fs = require('fs');
const { Cmd, commands } = require('../lib/command.js');
const { runtime } = require('../lib/myfunc.js')

Cmd({
command: '^menu$',
desc: 'Informasi perintah',
type: 'Informasi',
}, async (m, { conn, isOwner, command, isPremium }) => {
const PREFIX = '^[.,!]';
const commandsList = {};
commands.forEach(cmd => {
if (cmd.dontAddCommandList === false && cmd.command !== undefined) {
try {
const match = cmd.command.toString().match(/(\W*)([\w\s\d]*)/);
const commandName = match ? match[2].trim() : '';
const handler = PREFIX.match(/\[(\W*)\]/)?.[1]?.[0] || '.';
if (commandName) {
if (!commandsList[cmd.type]) commandsList[cmd.type] = [];
commandsList[cmd.type].push(handler + commandName);
}
} catch (error) {
console.error('Error processing command:', error);
}
}
});
let bodyText = '┌────⭓ *`「 ALL MENU 」`* ──⭓\n';
bodyText += '│\n';

for (const category in commandsList) {
bodyText += `│┌──*「 ${category.toUpperCase()} 」*\n`;  
commandsList[category].forEach((cmd, i) => {
bodyText += `││ ⇒ ${cmd.replace(/[":]/g, "")}\n`;  
});
bodyText += '│└───────\n│\n│\n';
}

bodyText += '└────────────⭓\n'; 
await conn.sendMessage(
m.chat,{
image: fs.readFileSync('./src/menus.jpg'),
caption: bodyText,
},{ quoted: {key: {
fromMe: false,
participant:`0@s.whatsapp.net`,
remoteJid:'0@s.whatsapp.net',
},
message: {
orderMessage: {
orderId: "594071395007984",
thumbnail: fs.readFileSync("./src/quoted.jpg"),
itemCount: new Date().getFullYear(),
status: "INQUIRY",
surface: "CATALOG",
message: `${global.botname}\nRuntime: ${runtime(process.uptime())}`,
orderTitle: "SatganzDevs  ",
sellerJid: "6281226416919@s.whatsapp.net",
token: "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==",
totalAmount1000: "500000000000000",
totalCurrencyCode: "IDR",
},
}}});
})