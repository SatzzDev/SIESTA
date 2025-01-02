const { Cmd } = require('../lib/command.js');
const { fetchJson, getRandom } = require("../lib/myfunc");
const { uploadImg } = require('../lib/uploader');
const axios = require('axios');
const fs = require('fs');

Cmd({
  command: '^removebg$',
  limit: true,
  desc: 'Remove Background',
  type: 'Alat',
}, async (m, { conn, command, reply, qmsg, mime }) => {
await reply(global.mess.wait);
let imgbbUploader = require("imgbb-uploader") 
let media = await conn.downloadAndSaveMediaMessage(qmsg, "temp_" + m.sender);
const options = {
apiKey: 'a54fab7dfacaec0565cdfd619ce5dca5', 
imagePath: media,
expiration: 600,
};
let {url} = await imgbbUploader(options)
await conn.sendMessage(m.chat, { image: {url:`https://api.ryzendesu.vip/api/ai/removebg?url=${url}`}, caption: global.mess.success }, { quoted: m });
});