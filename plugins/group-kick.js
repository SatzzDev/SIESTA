require('../config')
const { Cmd } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")

const {ftxt, ttle} = require('../lib/scrapes')

Cmd({
command: 'kick|kik',
onlyAdmins: true,
desc: 'mengeluarkan Anggota',
type: 'Grup'
}, async (m, {conn, command}) => {
let {reply,q} = m
let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [q.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch((e) => { }) : ""; 
const groupName = groupMetadata.subject
const participants = m.isGroup ? await groupMetadata.participants : "";
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
if (!isAdmins) return reply("lu siapa kocak?")
await conn.groupParticipantsUpdate(m.chat, users, "remove")
})