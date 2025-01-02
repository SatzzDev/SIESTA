const { Cmd } = require('../lib/command.js');
const axios = require('axios');
const cheerio = require('cheerio');




// Command to restart the bot
Cmd({
command: '^soundmeme$',
desc:'menampilkan list random meme audio',
limit: true,
type: 'Internet',
}, async (m, {conn, command}) => {
let res = await getAllSound()
let sect = [{title: 'SOUND MEME', rows: res }]
conn.sendListMsgV3(m.chat, 'SOUNDS MEME', '', global.author, 'Click Here', sect, m)
});


Cmd({
command:'^sendvn$',
}, async (m, {conn, command}) => {
await conn.sendMessage(m.chat, {audio: {url:m.query}, ptt:true, mimetype:'audio/mpeg', waveform:new Uint8Array(64)},{quoted:m})
})


function getAllSound() {
return new Promise((resolve, reject) => {
axios.get('https://www.myinstants.com/en/index/id/')
.then(({ data }) => {
const $ = cheerio.load(data);
const hasil = [];
$('.instant').each((i, element) => {
const title = $(element).find('a.instant-link').text().trim();
const button = $(element).find('button.small-button');
const onclickAttr = button.attr('onclick');
const idMatch = onclickAttr ? onclickAttr.match(/play\('([^']+)'/) : null;
const id = idMatch ? `.sendvn https://www.myinstants.com${idMatch[1]}` : null;
if (title && id) {
hasil.push({ title, id });
}
});
resolve(hasil);
})
.catch((error) => {
console.error('Error fetching data:', error);
reject(error);
});
});
}