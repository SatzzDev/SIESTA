require('../config')
const { Cmd } = require('../lib/command.js');
const {runtime} = require("../lib/myfunc")

Cmd({
command: 'runtime',
onlyOwner: false,
desc: 'informasi bot aktif',
type: 'Informasi'
}, async (m, {conn, command}) => {
m.reply(runtime(process.uptime()));
})