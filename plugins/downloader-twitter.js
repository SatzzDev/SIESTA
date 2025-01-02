const { Cmd } = require('../lib/command.js');
const {fetchJson,getBuffer} = require("../lib/myfunc")
const axios = require('axios');
const cheerio = require('cheerio');

Cmd({
command: '^(twitter|twitterdl|twtdl|twt)$',
limit: true,
type: 'Pengunduh'
}, async (m, {conn, command}) => {
const {q} = m
if (!q) return m.reply(`Penggunaan Salah! contoh penggunaan:\n .${command} https://twitter.com/xxxx`)
let res = await twitterDl(args[0]);
for (let x = 0; x < res.media.length; x++) {
let caption = 0 === x ? res.caption.replace(/https:\/\/t.co\/[a-zA-Z0-9]+/gi, "").trim() : "";
await conn.sendFile(m.chat, res.media[x].url, "", caption, m);
}
});    

async function twitterDl(url) {
const idMatch = /twitter\.com\/[^/]+\/status\/(\d+)/.exec(url),
id = idMatch ? idMatch[1] : null;
if (!id) throw "Invalid URL";
const res = await fetch(`https://tweetpik.com/api/tweets/${id}`);
if (200 !== res.status) throw res.statusText;
const json = await res.json();
if (json.media) {
const media = await Promise.all(json.media.map((async i => {
if (/video|animated_gif/.test(i.type)) {
return {
url: (await (await fetch(`https://tweetpik.com/api/tweets/${id}/video`)).json()).variants.pop().url,
type: i.type
};
}
return {
url: i.url,
type: i.type
};
})));
return {
caption: json.text,
media: media
};
}
throw "No media found";
}