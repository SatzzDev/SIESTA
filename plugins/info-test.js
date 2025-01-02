const { Cmd } = require('../lib/command');
const { prepareWAMessageMedia } = require('@whiskeysockets/baileys');
const speed = require("performance-now")
const { performance } = require('perf_hooks')
const { sizeFormatter  } = require('human-readable')
const os = require('os')

const formatp = sizeFormatter({
std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
})


Cmd({
command: '^ping|test$',
desc: 'Pengetesan',
type: "Informasi"
}, async (m, { conn }) => {
const used = process.memoryUsage()
let timestamp = speed()
let latensi = speed() - timestamp
let neww = performance.now()
let oldd = performance.now()
let respon = `
\`Kecepatan Respon\` 
> ${latensi.toFixed(4)} _Detik_ 

\`Info Server\`
> RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

\`Penggunaan Memori NodeJS\`
${Object.keys(used).map((key, _, arr) => `> ${key.padEnd(Math.max(...arr.map(v=> v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

`.trim()

m.reply(respon);
});

Cmd({
command:'^speed$',
desc: 'informasi kecepatan bot',
type:'Informasi'
}, async (m, {conn}) => {
const timestampp = speed();
const latensi = speed() - timestampp
//m.reply(`Kecepatan: ${latensi.toFixed(4)} Detik`)
await conn.relayMessage(m.chat,  {
requestPaymentMessage: {
currencyCodeIso4217: 'IDR',
amount1000: 1000000000,
requestFrom: m.sender,
noteMessage: {
extendedTextMessage: {
text: `Kecepatan: ${latensi.toFixed(4)} Detik`,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
}}}}}}, {quoted:m})
})