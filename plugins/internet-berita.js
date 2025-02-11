require('../config')
const { Cmd } = require('../lib/command.js');
let { getpttur, ftxt, ttle } = require("../lib/scrapes")

Cmd({
command: 'berita',
onlyOwner: false,
desc: 'Mendapatkan Berita Terkini',
type: 'Internet'
}, async (m, {conn, command}) => {
const menuItems = [
{ title: ttle("News"), rows: ["Nasional", "Regional", "Internasional", "Politik", "Peristiwa", "Hukum"] },
{ title: ttle("Showbiz"), rows: ["Selebritis", "Film", "Musik", "Trivia", "Viral"] },
{ title: ttle("Edukasi"), rows: ["Sains", "Pendidikan", "Kampus"] },
{ title: ttle("Food & Travel"), rows: ["UMKM", "Travel", "Kuliner", "Startup"] },
{ title: ttle("Oto & Tekno"), rows: ["Otomotif", "Teknologi", "Gadget"] },
{ title: ttle("Sport"), rows: ["Bola"] }
];
const itemList = menuItems.map(item => ({
title: item.title,
rows: item.rows.map(row => ({
title: row,
id: `.berita ${row.toLowerCase().replace(/\s+/g, '-')}`
}))
}));
if (!m.query) return conn.sendListMsgV3(m.chat, '', 'berita apa?', global.author, ttle("PILIH"), itemList, m);
let {pitutur} = require("../lib/scrapes")
let res = await pitutur(m.query)
let sex = []
for (let rizz of res.result) {
sex.push({title: rizz.day, rows: [{ title: rizz.hour, description: rizz.title, id: `.getberita ${rizz.url}`}]})
}
let j = m.query.toUpperCase()
conn.sendListMsgV3(m.chat, ftxt(`BERITA - ${j}`), '', global.author, ttle(j), sex, m)
})