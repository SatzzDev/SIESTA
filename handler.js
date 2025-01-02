require("./config.js");
const {
  proto,
  getContentType,
  generateWAMessageFromContent,
  downloadContentFromMessage,
  prepareWAMessageMedia,
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const moment = require("moment-timezone");
const util = require("util");
const path = require("path");
const chalk = require("chalk");
const { exec } = require("child_process");
const { ftxt, ttle } = require("./lib/scrapes.js");
const {
  CS,
  jsonformat,
  reSize,
  ucapanWaktu,
  formatp,
  clockString,
  getBuffer,
  getCases,
  generateProfilePicture,
  sleep,
  fetchJson,
  runtime,
  pickRandom,
  getGroupAdmins,
  getRandom,
} = require("./lib/myfunc.js");

//━━━━━━━━━━━━━━━[ START OF EXPORT ]━━━━━━━━━━━━━━━━━//
module.exports = {
  async handler(conn, m, chatUpdate, store) {
    try {
      const { reply } = m;
      const { commands, handler } = require("./lib/command.js");
      const prefix = ".";
      const body =
        m.mtype === "conversation"
          ? m.message.conversation
          : m.mtype === "imageMessage"
          ? m.message.imageMessage.caption
          : m.mtype === "videoMessage"
          ? m.message.videoMessage.caption
          : m.mtype === "extendedTextMessage"
          ? m.message.extendedTextMessage.text
          : m.mtype === "buttonsResponseMessage"
          ? m.message.buttonsResponseMessage.selectedButtonId
          : m.mtype === "listResponseMessage"
          ? m.message.listResponseMessage.singleSelectReply.selectedRowId
          : m.mtype === "templateButtonReplyMessage"
          ? m.message.templateButtonReplyMessage.selectedId
          : m.mtype === "interactiveResponseMessage"
          ? JSON.parse(
              m.message.interactiveResponseMessage.nativeFlowResponseMessage
                .paramsJson
            ).id || m.text
          : "";
      const budy = typeof m.text == "string" ? m.text : "";
      const pushname = m.pushName || "No Name";
      const isCmd = body.startsWith(prefix);
      const command = body
        .replace(prefix, "")
        .trim()
        .split(/ +/)
        .shift()
        .toLowerCase();
      var args = body.trim().split(/ +/).slice(1);
      args = args.concat(["", "", "", "", "", ""]);
      const botNumber = await conn.decodeJid(conn.user.id);
      const isCreator = global.owner.includes(m.sender.split("@")[0])
        ? true
        : false;
      const isOwner = isCreator;
      const itsMe = m.sender == botNumber ? true : false;
      const from = m.chat;
      const q = args.join(" ").trim();
      const text = q;
      const quoted = m.quoted ? m.quoted : m;
      const mime = (quoted.msg || quoted).mimetype || "";
      const qmsg = quoted.msg || quoted;
      const senderNumber = m.sender.split("@")[0];
      const sender = senderNumber;
      const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : "";
      const groupName = m.isGroup ? await groupMetadata.subject : "";
      const participants = m.isGroup ? await groupMetadata.participants : "";
      const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
      const isBotAdmins = groupAdmins.includes(botNumber);
      const isAdmins = groupAdmins.includes(m.sender);
      const premium = JSON.parse(fs.readFileSync("./src/premium.json"));
      const _prem = require("./lib/premium.js");
      const isPremium = isOwner
        ? true
        : _prem.checkPremiumUser(m.sender, premium);

      global.fake = {
        key: {
          fromMe: false,
          participant: `0@s.whatsapp.net`,
          remoteJid: `0@s.whatsapp.net`,
        },
        message: {
          orderMessage: {
            itemCount: 1945,
            status: 1,
            surface: 2,
            message: global.author,
            orderTitle: global.botname,
            thumbnail: fs.readFileSync("./src/thumb.jpg"),
            sellerJid: `0@s.whatsapp.net`,
          },
        },
      };

      const react = async (emoti) => {
        return conn.sendMessage(m.chat, {
          react: {
            text: emoti,
            key: {
              remoteJid: m.chat,
              fromMe: false,
              key: m.key,
              id: m.key.id,
              participant: m.sender,
            },
          },
        });
      };
      const freply = async (teks) => {
        return conn.sendMessage(
          m.chat,
          { text: teks },
          {
            quoted: {
              key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "0@s.whatsapp.net",
              },
              message: {
                orderMessage: {
                  orderId: "594071395007984",
                  thumbnail: fs.readFileSync("./src/quoted.jpg"),
                  itemCount: new Date().getFullYear(),
                  status: "INQUIRY",
                  surface: "CATALOG",
                  message: `${global.botname}\nRuntime: ${runtime(
                    process.uptime()
                  )}`,
                  orderTitle: "SatganzDevs",
                  sellerJid: "6282170988479@s.whatsapp.net",
                  token: "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==",
                  totalAmount1000: "500000000000000",
                  totalCurrencyCode: "IDR",
                },
              },
            },
          }
        );
      };
      const isNumber = (x) => typeof x === "number" && !isNaN(x);
      let user = db.data.users[m.sender];
      let limitUser = 10;
      if (typeof user !== "object") db.data.users[m.sender] = {};
      if (user) {
        if (!("name" in user)) user.name = pushname;
        if (!("id" in user)) user.id = senderNumber;
        if (!isNumber(user.limit)) user.limit = limitUser;
        if (!isNumber(user.afkTime)) user.afkTime = -1;
        if (!("afkReason" in user)) user.afkReason = "";
      } else {
        global.db.data.users[m.sender] = {
          name: pushname,
          id: senderNumber,
          date: global.calender,
          limit: limitUser,
          afkTime: -1,
          afkReason: "",
        };
      }
      if (m.isGroup) {
        let chats = db.data.chats[m.chat];
        if (typeof chats !== "object") db.data.chats[m.chat] = {};
        if (chats) {
          if (!("antilink" in chats)) chats.antilink = false;
          if (!("antidelete" in chats)) chats.antidelete = false;
          if (!("antiviewonce" in chats)) chats.antiviewonce = false;
          if (!("antiedit" in chats)) chats.antiedit = false;
          if (!("welcome" in chats)) chats.welcome = false;
          if (!("setwelcome" in chats)) chats.setwelcome = false;
          if (!("setbye" in chats)) chats.sebye = false;
        } else
          global.db.data.chats[m.chat] = {
            antilink: false,
            antidelete: false,
            antiviewonce: false,
            antidelete: true,
            welcome: false,
            setwelcome: "",
            setbye: "",
          };
      }

      if (!conn.public) {
        if (!m.key.fromMe && !isCreator) return;
      }

      let cron = require("node-cron");
      let tasks = cron.getTasks();
      if (tasks.size < 1) {
        cron.schedule(
          "0 0 * * *",
          async () => {
            let user = Object.keys(global.db.data.users);
            let limitUser = isPremium
              ? global.limitawal.premium
              : global.limitawal.free;
            for (let jid of user) {
              global.db.data.users[jid].limit = limitUser;
            }
            console.log(
              chalk.green(" ‎ ‎ [ SYSTEM ]"),
              chalk.yellow("reset limit succesfully")
            );
          },
          { scheduled: true, timezone: "Asia/Jakarta", name: "RESET LIMIT" }
        );
      } else {
      }
      _prem.expiredCheck(conn, premium);

        
        
        
conn.suit = conn.suit ? conn.suit : {};
let game = Object.values(conn.suit).find((game) => game.id && game.status && [game.p, game.p2].includes(m.sender));
if (game) {
let winner = "";
let tie = false;
if (m.sender == game.p2 && /Y/i.test(m.text) && m.isGroup && game.status == "wait") {
if (/N/i.test(m.text)) {
conn.sendTextWithMentions(m.chat, `@${game.p2.split`@`[0]} declines the game, game cancelled`, m);
delete conn.suit[game.id];
return !0;
}
game.status = "play";
game.origin = m.chat;
clearTimeout(game.timer);
reply(`The game has been sent to the chat\n\n@${game.p.split`@`[0]} and \n@${game.p2.split`@`[0]}\n\nPlease choose your move in your respective chats\nClick https://wa.me/${botNumber.split`@`[0]}`);
if (!game.choice) conn.sendText(game.p, `Please choose \n\nRock🗿\nPaper📄\nScissors✂️`, m);
if (!game.choice2) conn.sendText(game.p2, `Please choose \n\nRock🗿\nPaper📄\nScissors✂️`, m);
game.choice_time = setTimeout(() => {
if (!game.choice && !game.choice2) conn.sendText(m.chat, `Both players are not willing to play,\nGame cancelled`);
else if (!game.choice || !game.choice2) {
winner = !game.choice ? game.p2 : game.p;
conn.sendTextWithMentions(m.chat, `@${(game.choice ? game.p2 : game.p).split`@`[0]} did not choose a move, game ends`, m);
}
delete conn.suit[game.id];
return !0;
}, game.timeout);
}
let player1 = m.sender == game.p;
let player2 = m.sender == game.p2;
let rock = /rock/i;
let paper = /paper/i;
let scissors = /scissors/i;
let regex = /^(rock|paper|scissors)/i;
if (player1 && regex.test(m.text) && !game.choice && !m.isGroup) {
game.choice = regex.exec(m.text.toLowerCase())[0];
game.text = m.text;
reply(`You have chosen ${m.text} ${!game.choice2 ? `\n\nWaiting for opponent to choose` : ""}`);
if (!game.choice2) conn.sendText(game.p2, "_Opponent has already chosen_\nNow it's your turn", 0);
}
if (player2 && regex.test(m.text) && !game.choice2 && !m.isGroup) {
game.choice2 = regex.exec(m.text.toLowerCase())[0];
game.text2 = m.text;
reply(`You have chosen ${m.text} ${!game.choice ? `\n\nWaiting for opponent to choose` : ""}`);
if (!game.choice) conn.sendText(game.p, "_Opponent has already chosen_\nNow it's your turn", 0);
}
let move1 = game.choice;
let move2 = game.choice2;
if (game.choice && game.choice2) {
clearTimeout(game.choice_time);
if (rock.test(move1) && scissors.test(move2)) winner = game.p;
else if (rock.test(move1) && paper.test(move2)) winner = game.p2;
else if (scissors.test(move1) && paper.test(move2)) winner = game.p;
else if (scissors.test(move1) && rock.test(move2)) winner = game.p2;
else if (paper.test(move1) && rock.test(move2)) winner = game.p;
else if (paper.test(move1) && scissors.test(move2)) winner = game.p2;
else if (move1 == move2) tie = true;
conn.sendText(game.origin, `_*Game Result*_ ${tie ? "\nTIE" : ""}\n\n@${game.p.split`@`[0]} (${game.text}) ${tie ? "" : game.p == winner ? ` Wins \n` : ` Loses \n`}@${game.p2.split`@`[0]} (${game.text2}) ${tie ? "" : game.p2 == winner ? ` Wins \n` : ` Loses \n`}\n\n+10 Limit`.trim(), m, {mentions: [game.p, game.p2]});
db.data.users[winner].limit += 5
delete conn.suit[game.id];
}
}
//━━━━━━━━━━━━━━━[ GAME TEBAK-ILMIAH ]━━━━━━━━━━━━━━━━━//  
conn.asahotak = conn.asahotak ? conn.asahotak : {}  
if (from in conn.asahotak){
const similarity = require('similarity')
const threshold = 0.72
let id = from
let json = JSON.parse(JSON.stringify(conn.tebakilmiah[id][1]))
if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
user.limit += 5
freply(`Jawabanmu Benar!\n+5 Limit`)
clearTimeout(conn.asahotak[id][3])
delete conn.asahotak[id]
} else if (similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) reply(`*Dikit Lagi!*`)
}     

conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}  
if (from in conn.siapakahaku){
const similarity = require('similarity')
const threshold = 0.72
let id = from
let json = JSON.parse(JSON.stringify(conn.siapakahaku[id][1]))
if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
user.limit += 5
freply(`Jawabanmu Benar!\n+5 Limit`)
clearTimeout(conn.siapakahaku[id][3])
delete conn.siapakahaku[id]
} else if (similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) reply(`*Dikit Lagi!*`)
}    

conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}  
if (from in conn.tebakgambar){
const similarity = require('similarity')
const threshold = 0.72
let id = from
let json = JSON.parse(JSON.stringify(conn.tebakgambar[id][1]))
if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
user.limit += 5
freply(`Jawabanmu Benar!\n+5 Limit`)
clearTimeout(conn.tebakgambar[id][3])
delete conn.tebakgambar[id]
} else if(similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) reply(`*Dikit Lagi!*`)
}    
conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}  
if (from in conn.tebakgambar){
const similarity = require('similarity')
const threshold = 0.72
let id = from
let json = JSON.parse(JSON.stringify(conn.tebakgambar[id][1]))
if (budy.toLowerCase() == json.jawaban.toLowerCase().trim()) {
user.limit += 5
freply(`Jawabanmu Benar!\n+5 Limit`)
clearTimeout(conn.tebakgambar[id][3])
delete conn.tebakgambar[id]
} else if(similarity(budy.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) reply(`*Dikit Lagi!*`)
}    

      //━━━━━━━━━━━━━━━[ HANDLE FUNCTION ]━━━━━━━━━━━━━━━━━//
      handler.map(async (handle) => {
        try {
          await handle.function(m, {
            chatUpdate,
            conn,
            budy,
            store,
            participants,
            groupName,
            groupMetadata,
            isOwner,
            user: db.data.users[m.sender],
            isAdmins,
            isBotAdmins,
            isPremium,
            chatUpdate,
            reply,
            freply,
            text,
            q,
            qmsg,
            args,
            pushname,
            react,
            mime,
          });
        } catch (error) {
          //console.error('Error in handler:', error);
          //conn.sendMessage(global.dev, {text: `*「 SYSTEM-ERROR 」*\n${util.format(error)}`, contextInfo: {externalAdReply: {title: "ERROR", thumbnailUrl: 'https://telegra.ph/file/f1ca5cb8154286a123548.jpg', mediaType: 1, renderLargerThumbnail: true}}},{quoted:global.fake})
        }
      });

      //━━━━━━━━━━━━━━━[ HANDLE COMMAND ]━━━━━━━━━━━━━━━━━//
      if (isCmd) {
        commands.map(async (cmd) => {
          if (cmd.command.test(command)) {
            try {
              if (cmd.limit && !isPremium && db.data.users[m.sender].limit < 1)
                return reply(global.mess.limit);
              if (cmd.onlyPrem && !isPremium) return reply(global.mess.premium);
              if (cmd.onlyOwner && !isOwner) return reply(global.mess.owner);
              if (cmd.onlyAdmins && !isAdmins) return reply(global.mess.admin);
              if (
                cmd.glimit &&
                !isPremium &&
                db.data.users[m.sender].glimit < 1
              )
                return reply(global.mess.glimit);
              if (cmd.onlyGroup && !m.isGroup) return reply(global.mess.group);

              await cmd.function(m, {
                conn,
                budy,
                store,
                participants,
                groupMetadata,
                isOwner,
                user: db.data.users[m.sender],
                isAdmins,
                isBotAdmins,
                isPremium,
                chatUpdate,
                reply,
                freply,
                text,
                q,
                qmsg,
                args,
                react,
                command,
              });

              if (cmd.limit && !isPremium) db.data.users[m.sender].limit -= 1;
              if (cmd.glimit && !isPremium) db.data.users[m.sender].glimit -= 1;
            } catch (err) {
              console.error(err);

              // Extract file and line number from the error stack
              const stackLines = err.stack.split("\n");
              const locationInfo = stackLines[1].trim();
              const filePath = locationInfo.match(/\(([^)]+)\)/)[1];
              const fileName = path.basename(filePath);
              const lineNumber = filePath.split(":")[1];

              reply("An error occurred. Please try again later.");

              const errorMessage = `*「 SYSTEM-ERROR 」*\n📄COMMAND: \`${command}\`\n📂FILE: \`${fileName}\`\n📍LINE: \`${lineNumber}\`\n\n${util.format(
                err
              )}`;
              conn.sendMessage(
                global.dev,
                {
                  text: errorMessage,
                  contextInfo: {
                    externalAdReply: {
                      title: "ERROR",
                      thumbnailUrl:
                        "https://telegra.ph/file/f1ca5cb8154286a123548.jpg",
                      mediaType: 1,
                      renderLargerThumbnail: true,
                    },
                  },
                },
                { quoted: global.fake }
              );
            }
          }
        });
      }
      if (isCmd) {
        console.log(
          " ‎ ‎",
          chalk.bgYellowBright(chalk.black("[ COMMAND ]")),
          chalk.green(moment.tz("Asia/Jakarta").format("HH:mm")),
          chalk.blue(`${command} [${args.length}]`),
          chalk.cyan("from"),
          chalk.red(`${pushname}`),
          m.isGroup ? `${chalk.red("in group")} ${chalk.red(groupName)}` : ""
        );
      }

      if (m.mtype === "interactiveResponseMessage") {
        conn.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.sender,
          },
        });
      }

      //━━━━━━━━━━━━━━━[ ERROR ]━━━━━━━━━━━━━━━━━//
    } catch (err) {
      if (err.message.includes("Cannot find module")) {
        let module = err.message.split("Cannot find module '")[1].split("'")[0];
        let text = `Module ${module} is not installed yet.
Click the button to install.`;
        return conn.sendButtons(
          global.dev,
          "",
          text,
          global.author,
          [
            {
              type: "btn",
              text: "INSTALL",
              id: `$ npm install ${module} --force`,
            },
          ],
          m
        );
      }
      console.log(
        " ‎ ‎ ",
        chalk.bgRedBright(chalk.black("[ ERROR ]")),
        chalk.yellow(util.format(err))
      );
      await conn.sendMessage(
        global.dev,
        {
          text: `*「 SYSTEM-ERROR 」*\n${util.format(err)}`,
          contextInfo: {
            externalAdReply: {
              title: "ERROR",
              thumbnailUrl: "https://telegra.ph/file/f1ca5cb8154286a123548.jpg",
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: m }
      );
    }
  }, //━━━━━━━━━━━━━━━[ END OF EXPORT ]━━━━━━━━━━━━━━━━━//
};
//━━━━━━━━━━━━━━━[ FILE UPDATE ]━━━━━━━━━━━━━━━━━\\
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(
    " ‎ ‎ ",
    chalk.bgCyanBright(chalk.black("「 UPDATE 」")),
    chalk.red(`${__filename}`)
  );
  delete require.cache[file];
  require(file);
});
