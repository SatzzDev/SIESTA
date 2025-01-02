const { Cmd } = require("../lib/command.js")
const { getBuffer } = require("../lib/myfunc.js")
const axios = require('axios');
const cheerio = require('cheerio');
const {toAudio} = require('../lib/converter')
Cmd({
command:'^voiceml$',
type: "Internet",
limit: true
}, async(m, {conn, text}) => {
if (!text) return m.reply('nama hero?')
let btn = await soundML(text)
await conn.sendListMsg(m.chat, 'Result Of Heroes ' + text.toUpperCase(), 'Click The Button Bellow.', global.author, 'Click Here', 'Select One', 'Hot', btn, m)
})

Cmd({
command:'sendvoiceml',
}, async(m, {conn, text}) => {
let audioUrl = text;
let audio = await toAudio(await getBuffer(audioUrl), 'mp4')
conn.sendMessage(m.chat, {
    audio: audio,
    mimetype: 'audio/mp4',
    ptt: true, 
    waveform: new Uint8Array(64)
}, { quoted: global.fake });
})

async function soundML(query) {
return new Promise(async (resolve, reject) => {
try {
const res = await axios.get("https://mobile-legends.fandom.com/wiki/" + query + "/Audio/id");
const html = res.data;
const $ = cheerio.load(html);
const result = [];
$('audio').each((i, el) => {
const audio = $(el).attr('src').split('/revision/')[0];
const lirik = $(el).parent().parent().text().split(".ogg")[1].trim(); 
result.push([lirik,'.sendvoiceml ' + audio]);
});
resolve(result);
} catch (error) {
reject(new Error('Failed to fetch data'));
}
});
}