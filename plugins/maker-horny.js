const { Cmd } = require("../lib/command.js")
const { getBuffer } = require("../lib/myfunc.js")



Cmd({
command:'^tweetmaker$',
type:'Canvas',
limit:true,
}, async(m, {conn, reply, pushname, text}) => {
let comment = text.split('|')[1]
let username = text.split("|")[0]
if (!username || !comment || text.includes("-")) return reply("wrong format, try example: .tweetmaker satzz001|hello guys")
let pp = await getBuffer(await conn.profilePictureUrl(m.sender, "image").catch(_ => 'https://i.pinimg.com/564x/8b/11/a8/8b11a86980c64720a41ec22332a83115.jpg'))
const imgbbUploader = require('imgbb-uploader');
let pps = await imgbbUploader({apiKey: 'a54fab7dfacaec0565cdfd619ce5dca5', base64string: pp.toString("base64"), expiration: 600})
await conn.sendMessage(m.chat, {image: {url:
`https://some-random-api.com/canvas/misc/tweet?avatar=${pps.url}&displayname=${m.pushName}&username=${username}&comment=${comment}`}},{quoted:m})
})


Cmd({
command:'^horny$',
type:'Canvas',
limit:true,
}, async(m, {conn, reply, quoted, text}) => {
if (!m.quoted) return reply("tag orangnya")
let pp = await getBuffer(await conn.profilePictureUrl(m.quoted.sender, "image").catch(_ => 'https://i.pinimg.com/564x/8b/11/a8/8b11a86980c64720a41ec22332a83115.jpg'))
const imgbbUploader = require('imgbb-uploader');
let pps = await imgbbUploader({apiKey: 'a54fab7dfacaec0565cdfd619ce5dca5', base64string: pp.toString("base64"), expiration: 600})
await conn.sendMessage(m.chat, {image: {url:
`https://some-random-api.com/canvas/misc/horny?avatar=${pps.url}`}},{quoted:m})
})

Cmd({
command:'^gay$',
type:'Canvas',
limit:true,
}, async(m, {conn, reply, quoted, text}) => {
if (!m.quoted) return reply("tag orangnya")
let pp = await getBuffer(await conn.profilePictureUrl(m.quoted.sender, "image").catch(_ => 'https://i.pinimg.com/564x/8b/11/a8/8b11a86980c64720a41ec22332a83115.jpg'))
const imgbbUploader = require('imgbb-uploader');
let pps = await imgbbUploader({apiKey: 'a54fab7dfacaec0565cdfd619ce5dca5', base64string: pp.toString("base64"), expiration: 600})
await conn.sendMessage(m.chat, {image: {url:
`https://some-random-api.com/canvas/overlay/gay?avatar=${pps.url}`}},{quoted:m})
})
Cmd({
command:'^simpcard$',
type:'Canvas',
limit:true,
}, async(m, {conn, reply, quoted, text}) => {
if (!m.quoted) return reply("tag orangnya")
let pp = await getBuffer(await conn.profilePictureUrl(m.quoted.sender, "image").catch(_ => 'https://i.pinimg.com/564x/8b/11/a8/8b11a86980c64720a41ec22332a83115.jpg'))
const imgbbUploader = require('imgbb-uploader');
let pps = await imgbbUploader({apiKey: 'a54fab7dfacaec0565cdfd619ce5dca5', base64string: pp.toString("base64"), expiration: 600})
await conn.sendMessage(m.chat, {image: {url:
`https://some-random-api.com/canvas/misc/simpcard?avatar=${pps.url}`}},{quoted:m})
})