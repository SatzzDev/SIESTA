const { Cmd } = require("../lib/command.js");

Cmd({ command: '^buyprem' }, async (m, { conn, isPremium, reply }) => {
    let replyMessage = '*`PREMIUM USER`*\n' +
        '*Bronze*\n' +
        '> Rp. 0.00\n' +
        '> 5 Limit/Hari\n\n' +
        '*Silver*\n' +
        '> Rp.5.000.00\n' +
        '> 1 Bulan Masa Aktif\n' +
        '> 100 Limit/Hari\n\n' +
        '*Gold*\n' +
        '> Rp. 10.000.00\n' +
        '> 2 bulan Masa Aktif\n' +
        '> 500 Limit/Hari\n' +
        '> Free Fitur Request\n\n' +
        '*`METODE PEMBAYARAN`*\n' +
        '> DANA: 082398383300\n' +
        '> Yuk, buruan ambil paketnya!';

    conn.sendButtons(m.chat, '', replyMessage, global.author, [{type:"btn", text:"Beli Sekarang!", id:".payment"}], m);
});