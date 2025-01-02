require("../config")
const { Cmd } = require('../lib/command.js');


Cmd({
command: 'ssweb',
limit: true,
desc: 'to screenshot a website',
type: 'Alat'
}, async (m, {conn, command}) => {
let {reply,q} = m
let {ssweb} = require("../lib/scrapes")
reply(global.mess.wait)
let res = await ssweb(q)
conn.sendMessage(m.chat, {image: res.result, caption: 'nih'},{quoted:m})
})