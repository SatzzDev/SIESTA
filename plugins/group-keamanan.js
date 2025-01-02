const { Cmd } = require('../lib/command.js');

Cmd({
    command: '^welcome$',
    onlyGroup: true,
    onlyAdmins: true,
    desc: 'Mengaktifkan/mematikan welcome',
    type: 'Group'
}, async (m, { conn, command, reply, text, groupName }) => {
    switch (text) {
        case 'on':
            global.db.data.chats[m.chat].welcome = 'on';
            reply('berhasil mengaktifkan welcome di grup ' + groupName);
            break;
        case 'off':
            global.db.data.chats[m.chat].welcome = 'off';
            reply('berhasil menonaktifkan welcome di grup ' + groupName);
            break;
        default:
            reply("contoh penggunaan:\n- .welcome on\n- .welcome off");
    }
});

Cmd({
    command: '^antilink$',
    onlyGroup: true,
    onlyAdmins: true,
    desc: 'Mengaktifkan/mematikan antilink',
    type: 'Group'
}, async (m, { conn, command, reply, text, groupName }) => {
    switch (text) {
        case 'on':
            global.db.data.chats[m.chat].antilink = 'on';
            reply(`berhasil mengaktifkan ${command} di grup ${groupName}`);
            break;
        case 'off':
            global.db.data.chats[m.chat].antilink = 'off';
            reply(`berhasil menonaktifkan ${command} di grup ${groupName}`);
            break;
        default:
            reply(`contoh penggunaan:\n- .${command} on\n- .${command} off`);
    }
});

Cmd({
    command: '^antidelete$',
    onlyGroup: true,
    onlyAdmins: true,
    desc: 'Mengaktifkan/mematikan antidelete',
    type: 'Group'
}, async (m, { conn, command, reply, text, groupName }) => {
    switch (text) {
        case 'on':
            global.db.data.chats[m.chat].antidelete = 'on';
            reply(`berhasil mengaktifkan ${command} di grup ${groupName}`);
            break;
        case 'off':
            global.db.data.chats[m.chat].antidelete = 'off';
            reply(`berhasil menonaktifkan ${command} di grup ${groupName}`);
            break;
        default:
            reply(`contoh penggunaan:\n- .${command} on\n- .${command} off`);
    }
});

Cmd({
    command: '^antiviewonce$',
    onlyGroup: true,
    onlyAdmins: true,
    desc: 'Mengaktifkan/mematikan antiviewonce',
    type: 'Group'
}, async (m, { conn, command, reply, text, groupName }) => {
    switch (text) {
        case 'on':
            global.db.data.chats[m.chat].antiviewonce = 'on';
            reply(`berhasil mengaktifkan ${command} di grup ${groupName}`);
            break;
        case 'off':
            global.db.data.chats[m.chat].antiviewonce = 'off';
            reply(`berhasil menonaktifkan ${command} di grup ${groupName}`);
            break;
        default:
            reply(`contoh penggunaan:\n- .${command} on\n- .${command} off`);
    }
});

Cmd({
    command: '^antiedit$',
    onlyGroup: true,
    onlyAdmins: true,
    desc: 'Mengaktifkan/mematikan antiedit',
    type: 'Group'
}, async (m, { conn, command, reply, text, groupName }) => {
    switch (text) {
        case 'on':
            global.db.data.chats[m.chat].antiedit = 'on';
            reply(`berhasil mengaktifkan ${command} di grup ${groupName}`);
            break;
        case 'off':
            global.db.data.chats[m.chat].antiedit = 'off';
            reply(`berhasil menonaktifkan ${command} di grup ${groupName}`);
            break;
        default:
            reply(`contoh penggunaan:\n- .${command} on\n- .${command} off`);
    }
});
