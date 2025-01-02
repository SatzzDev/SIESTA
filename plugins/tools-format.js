const { Cmd } = require("../lib/command") 
const {ftxt, ttle} = require("../lib/scrapes") 

Cmd({
command: '^formatteks$',
type: 'Alat'
}, async (m, {conn, command}) => {
if (!m.q) return m.reply("teksnya? ") 
m.reply(`${ftxt(m.q)}\n${ttle(m.q)}`) 
})