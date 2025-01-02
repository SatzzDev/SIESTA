require('../config');
const { Cmd } = require('../lib/command.js');

Cmd({
command: 'help',
desc: 'Maybe Can Help',
type: 'Informasi'
}, async (m, {conn, command}) => {
let { reply, q } = m;

reply(`
1. *APA ITU LIMIT?*
- \`\`\`Limit Merupakan batasan yang diberikan kepada pengguna dalam menggunakan fitur tertentu. Misalnya, jumlah pesan yang bisa dikirim atau perintah yang bisa digunakan.\`\`\`


2. *APA ITU GAME LIMIT?*
- \`\`\`Game Limit Merupakan Batasan yang khusus diterapkan pada penggunaan fitur game. Misalnya, jumlah permainan yang bisa dimainkan dalam sehari.\`\`\`


3. *BAGAIMANA CARA MENDAPATKAN LIMIT?*
- \`\`\`LIMIT DAN GAME LIMIT BISA KAMU BELI DENGAN BALANCE.\`\`\`

4. *APA ITU BALANCE?*
- \`\`\`Balance Merupakan Saldo yang dimiliki oleh pengguna\`\`\`


*"NOTE":*
2. id:
- *.buylimit* (perintah untuk membeli limit)
-  *.buyglimit* (perintah untuk membeli game limit)
- *.me* (perintah untuk melihat informasi pengguna)
`)
});