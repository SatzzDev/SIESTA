require('../config')
const { Cmd } = require('../lib/command.js');
const {runtime} = require("../lib/myfunc")
const {ttle,ftxt} = require("../lib/scrapes")

Cmd({
command: '^(owner|creator)$',
onlyOwner: false,
desc:'menampilkan kontak developer',
type: 'Informasi'
}, async (m, {conn, command, store, botNumber}) => {
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001) 
const loli = [[global.dev,"Satzz.","Developer",'It always seems impossible until it\'s done.']]
let vcard = `
BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:Kurniawan Satria
N;CHARSET=UTF-8:Satria;Kurniawan;;;
item1.TEL;waid=6282170988479:+62 821-7098-8479
item1.X-ABLabel:Phone
DESCRIPTION;CHARSET=UTF-8:It always seems impossible until it's done.
ORG;CHARSET=UTF-8:Developer
BDAY:June, 05 2007
END:VCARD
`
/*conn.sendMessage(m.chat, {contacts: { contextInfo:{
externalAdReply: {
showAdAttribution: true,
mediaType: 1,
title: 'SatzzDev.',
sourceUrl: global.link,
renderLargerThumbnail: true,
thumbnailUrl: 'https://i.pinimg.com/originals/6b/45/3a/6b453a1ed9673d56e34673b281ede225.jpg'}}, 
contacts: [{ vcard }], displayName: 'Сатрия Дев' }},{quoted:m}); */
let key = await conn.sendContactArray(m.chat, loli, m)
//await conn.sendButtons(m.chat, '', 'itu kontak ownerku, kalo mau nanya nanya, tanya aja:v', global.author, [{ type: 'url', text: 'Grup Bot', id: global.sgc },{ type: 'url', text: 'Instagram', id: 'https://instagram.com/krniwnstria' },{ type: 'url', text: 'Github', id: 'https://github.com/SatganzDevs' }], key)
})