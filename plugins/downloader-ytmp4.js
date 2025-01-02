const { Cmd } = require('../lib/command.js');
const { getBuffer, getRandom, fetchJson } = require("../lib/myfunc")
const { ytmp4 } = require('ruhend-scraper')


Cmd({
command: 'ytmp4|ytvideo',
limit: true,
desc: 'to Download Audio From Youtube',
type: 'Pengunduh'
}, async (m, {conn, command, text, reply}) => {
if (m.quoted && m.quoted.fromMe) {
m.quoted.delete()
}
if (!text) return reply(`Example : .${command} https://youtube.com/watch?v=PtFMh6Tccag%27`)
if (!text.includes('https')) return reply('itu bukan link kak, kalau mau nyari dan download musik make .play')
await reply(global.mess.wait)
const res = await fetchJson('https://api.satzzdev.xyz/api/ytmp4?url=' + text);  
conn.sendMessage(m.chat, { video: {url:res.download.url}, mimetype: 'video/mp4'}, { quoted: m });
})