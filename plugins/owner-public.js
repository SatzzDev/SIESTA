const { Cmd } = require("../lib/command")


Cmd({
command: '^public$',
desc: 'mengubah mode bot menjadi public',
onlyOwner: true,
type: 'Pemilik'
}, async (m, {conn, command, reply}) => {
if (conn.public == true) return reply(`Already in Public Mode!`)
conn.public = true;
reply("Success Change To Public Mode");
})