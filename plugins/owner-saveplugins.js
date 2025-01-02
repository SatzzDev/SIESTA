const { Cmd } = require('../lib/command.js');





Cmd({
command: '^(saveplugins|sp)$',
onlyOwner: true,
desc: 'Mengupdate plugins',
type: 'Pemilik'
}, async (m, {conn, command, text, reply}) => {
const path = require("path") 
if (!text) return reply(`where is the path?\n\nexample:\n.${command} menu.js`)
if (!m.quoted.text) return reply(`reply code`)
let paths = path.join(__dirname, `./${text}${!/\.js$/i.test(text) ? '.js' : ''}`)
await require('fs').writeFileSync(paths, m.quoted.text)
m.reply(`Saved ${paths} to file!`)
});