const { Cmd } = require('../lib/command.js');


Cmd({
command: '^setwelcome$',
onlyGroup: true,
onlyAdmins: true,
desc: 'Mengubah ucapan selamat datang',
type: 'Grup'
}, async (m, {conn, command, reply, text}) => {
if (!text) return reply("contoh penggunaan: .setwelcome Welcome, @user,\n\n`NOTE:` \n- @user untuk yang join\n- @desc untuk menampilkan deskripsi grup\n- @subject untuk menampilkan nama grup");
global.db.data.chats[m.chat].setwelcome = text
reply('berhasil!')
})