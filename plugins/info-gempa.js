require('../config')
const { Cmd } = require('../lib/command.js');
const axios = require('axios');
const cheerio = require('cheerio');



Cmd({
command: '^(infogempa|gempa)$',
onlyPrem: true,
desc: 'Mendapatkan Informasi Gempa',
type: 'Informasi'
}, async (m, {conn, command}) => {
try {
let res = await Gempa();
if (res.length > 0) {
const latestEarthquake = res[0]; // Assuming the first row is the latest earthquake
const message = `*\`INFO - GEMPA\`*
⭔ _Tanggal:_ ${latestEarthquake.Tanggal}
⭔ _Jam:_ ${latestEarthquake.Jam}
⭔ _Lintang:_ ${latestEarthquake.Lintang}
⭔ _Bujur:_ ${latestEarthquake.Bujur}
⭔ _Magnitudo:_ ${latestEarthquake.Magnitudo}
⭔ _Kedalaman:_ ${latestEarthquake.Kedalaman}
⭔ _Wilayah:_ ${latestEarthquake.Wilayah}`;
m.reply(message);
} else {
m.reply('No earthquake data found.');
}
} catch (error) {
console.error('Error fetching earthquake data:', error);
m.reply('Failed to fetch earthquake data.');
}
})




function Gempa() {
return new Promise((resolve, reject) => {
axios.get('https://www.bmkg.go.id/gempabumi-terkini.html')
.then(({ data }) => {
const $ = cheerio.load(data);
const tableRows = $('.blog-grid .table-responsive table tbody tr');
const dataGempa = [];
tableRows.each((index, element) => {
const tds = $(element).find('td');
const rowData = {
Tanggal: $(tds[1]).text().split(' ')[0].trim(),
Jam: $(tds[1]).text().split(' ')[1].trim() + ' ' + $(tds[1]).text().split(' ')[2],
Lintang: $(tds[2]).text().trim(),
Bujur: $(tds[3]).text().trim(),
Magnitudo: $(tds[4]).text().trim(),
Kedalaman: $(tds[5]).text().trim(),
Wilayah: $(tds[6]).text().trim()
};
dataGempa.push(rowData);
});
resolve(dataGempa);
})
.catch((error) => {
console.error('Error fetching earthquake data:', error);
reject(error);
});
});
}

// Example usage
//Gempa().then(console.log).catch(console.error);
