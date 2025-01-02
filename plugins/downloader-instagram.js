const { Cmd } = require('../lib/command.js');
const {fetchJson,getBuffer} = require("../lib/myfunc")
const axios = require('axios');
const cheerio = require('cheerio');

Cmd({
command: '^(instagram|igdl|ig)$',
limit: true,
type: 'Pengunduh'
}, async (m, {conn, command}) => {
const {q} = m
if (!q) return m.reply(`Penggunaan Salah! contoh penggunaan:\n .${command} https://instagram.com/reel/xxxxx`)
const res = await fetchJson(`https://tools.betabotz.eu.org/tools/instagramdl?url=${q}`);
for (let i of res.result) {
conn.sendFileUrl(m.chat, i._url, '', m)
}
});