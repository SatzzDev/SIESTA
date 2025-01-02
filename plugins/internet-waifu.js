const { Cmd } = require("../lib/command.js");
const axios = require("axios");

Cmd({
  command: "^diffusion$",
  limit: true,
  type: "Internet",
}, async (m, { conn, reply, text }) => {
  if (!text) return reply("Mana promptnya! Humph😤");
  
  await reply(global.mess.wait);
  
  try {
    const response = await axios.get(`https://apidl.asepharyana.cloud/api/ai/waifu-diff?prompt=${encodeURIComponent(text)}&style=Anime`, { responseType: "arraybuffer" });
    
    const imageBuffer = Buffer.from(response.data, "binary");
    
    await conn.sendMessage(m.chat, { image: imageBuffer, caption: "*`W A I F U - D I F F U S I O N`*" }, { quoted: m });
  } catch (error) {
    console.error(error);
    await reply("Gagal mengunduh gambar!");
  }
});