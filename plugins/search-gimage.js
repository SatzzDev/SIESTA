require("../config")
const { Cmd } = require('../lib/command.js');
const { fetchJson, pickRandom } = require('../lib/myfunc.js')

Cmd({
command: 'gimage|googleimage',
limit: true,
desc: 'Mencari Gambar Dengan Google',
type: 'Internet'
}, async (m, {conn, command}) => {
let {reply,q} = m
if (!q) return reply('masukan query image!')
let res = await fetchJson(`https://aemt.me/googleimage?query=${q}`)
await conn.sendButtons(m.chat, '*`GIMAGE`*', '', author, [{type:'btn',text:'NEXT',id:`.gimage ${q}`}], m, {img: await pickRandom(res.result)})
})