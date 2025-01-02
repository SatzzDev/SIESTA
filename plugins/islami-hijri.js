const { Cmd } = require('../lib/command')


Cmd({
command: '^(hijri|hijricalendar)$',
type: 'Religi'
}, async (m, { conn, command, text }) => {
return m.reply(global.hijri);
});
