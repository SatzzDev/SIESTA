const { Cmd } = require('../lib/command.js');
const fs = require('fs');
const { exec } = require('child_process');
const { getRandom } = require('../lib/myfunc'); // Pastikan getRandom didefinisikan
const mess = { wait: "Tunggu sebentar..." };

Cmd({
  command: '^bass$',
  desc: 'Mengubah audio menjadi efek bass',
  limit: true,
  type: 'Audio Effect',
}, async (m, { conn, mime, qmsg }) => {
  await applyAudioAudioEffect(m, conn, mime, qmsg, "-af equalizer=f=54:width_type=o:width=2:g=20");
});

Cmd({
  command: '^blown$',
  desc: 'Mengubah audio menjadi efek blown',
  limit: true,
  type: 'Audio Effect',
}, async (m, { conn, mime, qmsg }) => {
  await applyAudioAudioEffect(m, conn, mime, qmsg, "-af acrusher=.1:1:64:0:log");
});

Cmd({
  command: '^deep$',
  desc: 'Mengubah audio menjadi efek deep',
  limit: true,
  type: 'Audio Effect',
}, async (m, { conn, mime, qmsg }) => {
  await applyAudioAudioEffect(m, conn, mime, qmsg, "-af atempo=4/4,asetrate=44500*2/3");
});

Cmd({
  command: '^earrape$',
  desc: 'Mengubah audio menjadi efek earrape',
  limit: true,
  type: 'Audio Effect',
}, async (m, { conn, mime, qmsg }) => {
  await applyAudioAudioEffect(m, conn, mime, qmsg, "-af volume=12");
});

Cmd({
  command: '^fast$',
  desc: 'Mengubah audio menjadi cepat',
  limit: true,
  type: 'Audio Effect',
}, async (m, { conn, mime, qmsg }) => {
  await applyAudioAudioEffect(m, conn, mime, qmsg, '-filter:a "atempo=1.63,asetrate=44100"');
});

Cmd({
  command: '^nightcore$',
  desc: 'Mengubah audio menjadi efek nightcore',
  limit: true,
  type: 'Audio Effect',
}, async (m, { conn, mime, qmsg }) => {
  await applyAudioAudioEffect(m, conn, mime, qmsg, "-filter:a atempo=1.25,asetrate=44100*1.25");
});
Cmd({
  command: '^speedup$',
  desc: 'Mengubah audio menjadi lebih cepat',
  limit: true,
  type: 'Audio Effect',
}, async (m, { conn, mime, qmsg }) => {
  await applyAudioAudioEffect(m, conn, mime, qmsg, "-filter:a atempo=1.5");
});

Cmd({
  command: '^reverb$',
  desc: 'Mengubah audio menjadi efek reverb',
  limit: true,
  type: 'Audio Effect',
}, async (m, { conn, mime, qmsg }) => {
  await applyAudioAudioEffect(m, conn, mime, qmsg, '-af "aecho=0.8:0.88:60:0.4"');
});
/**
 * Fungsi untuk mengaplikasikan efek audio.
 * @param {Object} m Pesan WhatsApp.
 * @param {Object} conn Koneksi WhatsApp bot.
 * @param {String} mime Tipe MIME dari file media.
 * @param {Object} qmsg Pesan yang dikutip.
 * @param {String} set Efek filter FFmpeg.
 */
async function applyAudioAudioEffect(m, conn, mime, qmsg, set) {
  try {
      await m.reply(mess.wait);
      let media = await conn.downloadAndSaveMediaMessage(qmsg);
      let output = getRandom(".mp3");
      exec(`ffmpeg -i ${media} ${set} ${output}`, (err) => {
        fs.unlinkSync(media);
        if (err) return m.reply(`Error: ${err.message}`);
        let buff = fs.readFileSync(output);
        conn.sendMessage(
          m.chat,
          { audio: buff, mimetype: "audio/mpeg" },
          { quoted: m }
        );
        fs.unlinkSync(output);
      });
  } catch (e) {
    m.reply(`Error: ${e.message}`);
  }
}
