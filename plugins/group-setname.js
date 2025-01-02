require('../config')
const { Cmd } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
command: 'setnamegc|setsubject',
onlyGroup: true,
onlyAdmins: true,
desc: 'Mengubah Nama Grup',
type: 'Grup'
}, async (m, {conn, command}) => {
let {reply,q} = m
if (!q) return reply("Text ?");
await conn.groupUpdateSubject(m.chat, q).then((res) => reply('done')).catch((err) => reply("error"));
})