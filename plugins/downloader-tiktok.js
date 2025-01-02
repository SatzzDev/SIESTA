const { Cmd } = require('../lib/command.js');
const {fetchJson,getBuffer} = require("../lib/myfunc")
const axios = require('axios');
const cheerio = require('cheerio');

Cmd({
command: '^(tiktok|ttdl|tt)$',
limit: true,
type: 'Pengunduh'
}, async (m, {conn, command}) => {
const {q} = m
if (!q) return m.reply(`Penggunaan Salah! contoh penggunaan:\n .${command} https://tiktok.com/vtxxxxx`)
let data = await fetchJson(`https://api.satganzdevs.tech/api/ttdl?url=${q}`) 
if (data.type === "video") {
let data = await fetchJson(`https://skizo.tech/api/tiktok?apikey=lanagalau&url=${q}`) 
let tkes = `ᯤ *Tik Tok - Downloader*

𖦹 *Region:* ${data.data.region}
𖦹 *Judul:* ${data.data.title}
𖦹 *Durasi:* ${data.data.duration}
𖦹 *Music:* ${data.data.music} ` 

await conn.sendMessage(m.chat, {video: {url: data.data.play}, caption: tkes}, {quoted: m})
await conn.sendMessage(m.chat, { audio: {url: data.data.music}, mimetype: 'audio/mp4'}, { quoted: m})
} else if (data.type === "image") {
for (let i of data.fallback.images) {
await conn.sendMessage(m.chat, {image: {url: i}}, {quoted: m})
}
}
});    

