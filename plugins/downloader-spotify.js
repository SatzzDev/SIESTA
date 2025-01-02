const { Cmd } = require('../lib/command.js');
const {fetchJson,getBuffer} = require("../lib/myfunc")
const spotify = require('@moonr/spotify')
const agent = require('fake-useragent')

Cmd({
command: '^(spotify(dl?)|spottydl)$',
limit: true,
desc: 'to Download Audio From Spotify',
type: 'Pengunduh'
}, async (m, {conn, command, text, reply}) => {
if (!text) return m.reply(`Penggunaan Salah! contoh penggunaan:\n .${command} https://spotify.com/xxxx`)
await reply(global.mess.wait)
let url = text
let res = await fetchJson('https://api.satzzdev.xyz/api/spotifydl?url='+url)
await conn.sendMessage(m.chat, {
audio:await getBuffer(res.data.fileUrl), 
mimetype:'audio/mpeg', 
ptt:false},{quoted:m})  
});