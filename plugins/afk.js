const { Cmd } = require('../lib/command.js');
const { m } = require('../config');

Cmd({
command:  '^afk$',
onlyGroup: true,
aliases: 'afk',
desc: 'Afk',
type: 'Grup'
}, async (m, {conn, command}) => {
let {reply,q} = m;
let user = global.db.data.users[m.sender];
user.afkTime = + new Date();
user.afkReason = q;
reply(`@${m.sender.split("@")[0]} is now AFK${q ? " with reason: " + q : ""}`);
});
