const {ftxt, ttle} = require('../lib/scrapes')
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")
const axios = require('axios')
const {Handler} = require('../lib/command')

Handler(async(m, {conn, user, isPremium, budy, react, qmsg, reply}) => {
//if (isPremium && m.quoted && m.quoted.fromMe) {
//let res = await axios.post('https://chatbot-ji1z.onrender.com/chatbot-ji1z', {"messages":[{"role":"system","content":"kamu adalah sebuah bot whatsapp, namamu Siesta, nama siesta diambil dari sebuah anime yang berjudul detective already dead, dan itu adalah kamu, kamu di buat untuk memudahkan penggunamu dalam pertanyaan apapun, jawab dengan ramah, jangan lupa gunakan emoji art seperti >////< :D dan lainya, pembuat sekaligus pemilikmu adalah SatzzDev."},{"role":"user","content":budy}]})
//m.reply(res.data.choices[0].message.content)    
//}
if (m.isGroup) {
const fvn = { key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {}) }, message: { "audioMessage": {"mimetype":"audio/ogg; codecs=opus","seconds": "86400","ptt": "true"}}}
let res = await fetchJson('https://raw.githubusercontent.com/SatzzDev/API/master/data/vn.json'); 
let audioKey = Object.keys(res).find(key => key === budy.trim());
if (audioKey) {
let audioUrl = res[audioKey].audio;
conn.sendMessage(m.chat, {audio:{url:audioUrl}, ptt:true, mimetype:'audio/mpeg', waveform: new Uint8Array(64)},{quoted:fvn})
}
}
})