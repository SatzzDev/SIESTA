const { Cmd } = require('../lib/command.js');
const { CS, jsonformat,reSize, ucapanWaktu, formatp, clockString, getBuffer, getCases, generateProfilePicture, sleep, fetchJson, runtime, pickRandom, getGroupAdmins, getRandom } = require("../lib/myfunc")


Cmd({
command: '^close$',
onlyAdmins: true,
desc: 'menutup Grup',
type: 'Grup'
}, async (m, {conn, command}) => {
let {reply} = m
conn.groupSettingUpdate(m.chat, 'announcement')
})
