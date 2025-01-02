const { Cmd } = require("../lib/command.js");
const { fetchJson } = require("../lib/myfunc");

Cmd({
command: "^lirik$",
limit: true,
type: "Pencarian",
},
async (m, { conn, command, text, reply, react}) => {
try {
if (!text) return reply('usage example: .' + command + ' a year ago')
await react('⏳')
let response = await fetchJson(`https://lirikapi.vercel.app/api/${text}`)
await await conn.sendMessage(m.chat, {
image:{
url:response.image}, 
caption:`*\`( LYRICS SEARCH )\`*


> TITLE: *${response.title}*
> ARTIST: *${response.artist}*
> LYRICS:\n${response.lyrics} `},{quoted:m})
await react('🎉')
} catch (error) {
console.log(error)
reply('error, silahkan coba command .lirikv2')
}
//await reply(data.result.lyrics)
})

Cmd({
command: "^lirikv2$",
limit: true,
type: "Pencarian",
},
async (m, { conn, command, text, reply, react}) => {
if (!text) return reply('usage example: .' + command + ' a year ago')
await react('⏳')
let response = await fetchJson(`https://apilyrics.vercel.app/search?query=${text}`)
let allResult = response.map((res, index) => {
return [res.fullTitle, `.getslyrics ${res.url}|${res.image}`];
});
await conn.sendListMsg(m.chat, 'Result Of ' + text, '', global.author, 'Buka', 'Result', 'Matched', allResult, m);
await react('🎉')
//await reply(data.result.lyrics)
})

Cmd({
command: '^getslyrics$',
type: "Misc",
},
async (m, { conn, command, text, reply, react}) => {
await react('⏳')
let response = await fetchJson(`https://apilyrics.vercel.app/lyrics?url=${text.split("|")[0]}`)
await conn.sendMessage(m.chat, {image:{url:text.split("|")[1]}, caption: response.lyrics},{quoted:m})
await react('🎉')
})