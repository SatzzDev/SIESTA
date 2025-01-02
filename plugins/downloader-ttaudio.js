const { Cmd } = require('../lib/command.js');
const {fetchJson, getBuffer} = require("../lib/myfunc")

Cmd({
command: 'ttmp3|ttaudio',
limit: true,
desc: 'to Download Audio From Tiktok',
type: 'Pengunduh'
}, async (m, {conn, command}) => {
if (!m.query) return m.reply(`Example : ${command} https://youtube.com/watch?v=PtFMh6Tccag%27`)
const url = m.query;
let data = await fetchJson(`https://tools.betabotz.eu.org/tools/tiktokdl?url=${m.text}`) 
//m.reply(JSON.stringify(data))
conn.sendMessage(m.chat, { audio: await getBuffer(data.result.data.music), mimetype: "audio/mpeg"},{ quoted: m });
})