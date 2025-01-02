const { Cmd } = require("../lib/command")
const { generateProfilePicture } = require("../lib/myfunc")


Cmd({
command: '^bc$',
onlyOwner:true,
type:'Pemilik',
}, async (m, {conn, command, reply, text}) => {
if (!text) return reply('teksnya')
let userss = Object.keys(db.data.users)
let msg = await conn.sendMessage("status@broadcast", {text},{textArgb: 4294967295,backgroundArgb: 4280730844,statusJidList: userss, broadcast : true})
await conn.sendMessage(m.chat, {text:'done broadcasted!'},{quoted:msg})
})


Cmd({
command: '^(setppbot|setbotpp)$',
desc: 'Mengupdate Profile Bot',
onlyOwner: true,
type: 'Pemilik'
}, async (m, {conn, command, reply, mime, qmsg}) => {
const { S_WHATSAPP_NET } = require("@whiskeysockets/baileys");
const quoted = m.quoted ? m.quoted : m
let medis = await conn.downloadAndSaveMediaMessage(qmsg, "ppg");
var { img } = await generateProfilePicture(medis);
await conn.query({
tag: 'iq',
attrs: {
// target: '0',
to: S_WHATSAPP_NET,
type: 'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
reply("Profile picture has been changed.")
})