const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const os = require('os');
const { reSize, getBuffer } = require('./myfunc')
const LOG_INFO = '[ INFO ]';
const LOG_ERROR = '[ ERROR ]';
const LOG_UPDATE = '[ UPDATE ]';

                           



exports.memberUpdate = async (conn, anu) => {
//if (!global.db.data.chats[anu.id].welcome) return {}
try {
let metadata = await conn.groupMetadata(anu.id);
const memk = metadata.participants.length;
const groupName = metadata.subject || '';
const groupDesc = metadata.desc || '';
const participants = anu.participants;
//const pp = await getBuffer(await conn.profilePictureUrl(anu.id, 'image').catch(_ => 'https://i.pinimg.com/originals/59/fe/0a/59fe0ad8cdbe4314797b29e8f033384c.jpg'));



for (let num of participants) {
//const pps = await getBuffer(await conn.profilePictureUrl(num, 'image').catch(_ => 'https://i.pinimg.com/originals/59/fe/0a/59fe0ad8cdbe4314797b29e8f033384c.jpg'));
const quoted = global.fake
const username = await conn.getName(num);
const chatData = global.db.data[anu.id] || {};
const swels = chatData.setwelcome && chatData.setwelcome !== '' ? chatData.setwelcome : 'Welcome, *@user*💐';
const swel = swels.replace('@user', `@${num.split('@')[0]}`).replace('@subject', groupName).replace('@desc', groupDesc);
const chatDataChats = global.db.data.chats[anu.id] || {};
const sbyes = chatDataChats.setbye && chatDataChats.setbye !== '' ? chatDataChats.setbye : 'Goodbye, *@user*💐';
const sbye = sbyes.replace('@user', `@${num.split('@')[0]}`).replace('@subject', groupName).replace('@desc', groupDesc);
  



switch (anu.action) {
case 'add':
await conn.sendMessage(
anu.id,
{
text: swel,
contextInfo: {
mentionedJid: [...swel.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net'),
externalAdReply:{
showAdAttribution: true, 
renderLargerThumbnail: true,
containsAutoReply: true, 
previewType: "PHOTO",
title: 'Welcome!',
body: `Read Description First.`, 
mediaType: "IMAGE", 
sourceUrl: global.sgc,
thumbnailUrl:'https://i.ibb.co.com/ggBtWS8/Journey-Game-Visuals-Farrukh-Abdur.jpg'
}
},
},{quoted});
break        
        
case 'remove':
await conn.sendMessage(
anu.id,
{
text: sbye,
contextInfo: {
mentionedJid: [...sbye.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net'),
externalAdReply:{
showAdAttribution: true, 
renderLargerThumbnail: true,
containsAutoReply: true, 
previewType: "PHOTO",
title: 'Goodbye!',
body: `Don't Comeback.`, 
mediaType: "IMAGE", 
sourceUrl: global.sgc,
thumbnailUrl:'https://i.ibb.co.com/ggBtWS8/Journey-Game-Visuals-Farrukh-Abdur.jpg'
}
},
},{quoted});
break       

case 'promote':
let pt =`*@${num.split('@')[0]}* is now an admin of ${groupName}. Keep up the good work!`
await conn.sendMessage(
anu.id,
{
text: pt,
contextInfo: {
mentionedJid: [...pt.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net'),
externalAdReply:{
showAdAttribution: true, 
renderLargerThumbnail: true,
containsAutoReply: true, 
previewType: "PHOTO",
title: 'Congratulations!',
body: `Good Job!`, 
mediaType: "IMAGE", 
sourceUrl: global.sgc,
thumbnailUrl:'https://i.ibb.co.com/ggBtWS8/Journey-Game-Visuals-Farrukh-Abdur.jpg'
}
},
},{quoted});
break      

case 'demote':
let dm = `*@${num.split('@')[0]}* has been demoted from admin in ${groupName}.`
await conn.sendMessage(
anu.id,
{
text: dm,
contextInfo: {
mentionedJid: [...dm.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net'),
externalAdReply:{
showAdAttribution: true, 
renderLargerThumbnail: true,
containsAutoReply: true, 
previewType: "PHOTO",
title: 'Condolences!',
body: `GG`, 
mediaType: "IMAGE", 
sourceUrl: global.sgc,
thumbnailUrl:'https://i.ibb.co.com/ggBtWS8/Journey-Game-Visuals-Farrukh-Abdur.jpg'
}
},
},{quoted});
break        
        
default:
}

}
    
} catch (error) {
console.log(chalk.bgRedBright(chalk.black(LOG_ERROR)), chalk.yellow(error));
}
    
} // end of exports