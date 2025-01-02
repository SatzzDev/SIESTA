const { Cmd } = require('../lib/command.js');
const yts = require("yt-search");
const ytdl = require("@distube/ytdl-core")
const axios = require("axios") 
const fs = require("fs")
const fetch = require("node-fetch") 
const { ytsearch, ytmp3 } = require('ruhend-scraper')
const { fetchJson, getRandom,getBuffer } = require('../lib/myfunc.js')
const util = require('util')
const youtubedl = require('youtube-dl-exec')

Cmd({
  command: 'play|ytplay',
  limit: true,
  desc: 'Play audio from YouTube',
  type: 'Pengunduh'
}, async (m, { conn, command, text, reply }) => {
if (!text) return reply(`Example : .${command} Patience - Take That`);
await reply(global.mess.wait);
let search = await yts(text)
const { title, description, videoId, thumbnail} = search.all[0]; 
const contextInfo = {
externalAdReply: {
title,
body: 'YOUTUBE-PLAY',
thumbnailUrl: thumbnail,
mediaType: 1,
renderLargerThumbnail: true,
showAdAttribution: true,
sourceUrl: `https://youtu.be/${videoId}`
}
};
if (!search) return m.reply('Tidak di temukan, coba untuk membalikkan judul dan author nya');
const url = `https://youtu.be/${videoId}`;
const thumb = `https://i.ytimg.com/vi/${videoId}/0.jpg`;
const res = await fetchJson('https://api.satzzdev.xyz/api/ytmp3?url=' + url);  
conn.sendMessage(m.chat, { audio: {url:res.download.url}, ptt: false, mimetype: 'audio/mp4', contextInfo }, { quoted: m });
});