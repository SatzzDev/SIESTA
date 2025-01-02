`GET PLUGINS`
const { Cmd } = require("../lib/command") 

Cmd({
command: '^(approve|approveall)$', 
onlyAdmin: true, 
onlyGroup: true, 
desc: "Menerima semua permintaan join", 
type: "Group"
}, async (m, {conn, command}) => {
let response = await conn.groupRequestParticipantsList(m.chat) 
if (response.length === 0) return m.reply("tidak ada request join") 
let mem = []
for (let kontol of response) {
mem.push(kontol.jid) 
}
await conn.groupRequestParticipantsUpdate(m.chat, mem, "approve") 
m.reply(`success approve ${mem.length} member`) 
})



Cmd({
command: '^(reject|rejectall)$', 
onlyAdmin: true, 
onlyGroup: true, 
desc: "reject all participants request", 
type: "Group"
}, async (m, {conn, command}) => {
let response = await conn.groupRequestParticipantsList(m.chat) 
if (response.length === 0) return m.reply("tidak ada request join") 
let mem = []
for (let kontol of response) {
mem.push(kontol.jid) 
}
await conn.groupRequestParticipantsUpdate(m.chat, mem, "reject") 
m.reply(`success reject ${mem.length} member`) 
})