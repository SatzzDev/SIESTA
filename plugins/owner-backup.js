const { Cmd } = require('../lib/command.js');
const fs = require('fs');
const archiver = require('archiver');
const chalk = require("chalk");
const { exec } = require('child_process');

Cmd({
    command: 'backup',
    onlyOwner: true,
    desc: 'Membackup Bot',
    type: 'Pemilik'
}, async (m, { conn, command }) => {
    try {
        const tanggal = new Date().toLocaleDateString('id', { weekday: 'long' }) + ',' + ' ' + new Date().toLocaleDateString("id", { day: 'numeric', month: 'long', year: 'numeric' });
        const backupFileName = `SIESTA-MD ${tanggal}.zip`;
        const output = fs.createWriteStream(backupFileName);
        const archive = archiver('zip', { zlib: { level: 9 } });

        archive.pipe(output);

        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                console.log(chalk.bgRedBright(chalk.black("[ ERROR ]")), chalk.yellow(err));
            } else {
                throw err;
            }
        });

        archive.glob('**/*', { cwd: './', ignore: ['node_modules/**/*', 'session/**', '**/.*', backupFileName] });
        await archive.finalize();

        await conn.sendMessage(m.sender, { document: { url: `./${backupFileName}` }, mimetype: "application/zip", fileName: backupFileName }, { quoted: m });

        // Tambahkan direktori ke safe directory Git
        exec('git config --global --add safe.directory /home/container', (error) => {
            if (error) {
                console.error(chalk.bgRedBright(chalk.black("[ GIT CONFIG ERROR ]")), chalk.yellow(error.message));
                return;
            }

            // Jalankan perintah Git
            exec('git add . && git commit -m "Backup otomatis: ' + tanggal + '" && git push', (error, stdout, stderr) => {
                if (error) {
                    console.error(chalk.bgRedBright(chalk.black("[ GIT ERROR ]")), chalk.yellow(error.message));
                    return;
                }
                if (stderr) {
                    console.error(chalk.bgRedBright(chalk.black("[ GIT STDERR ]")), chalk.yellow(stderr));
                    return;
                }
                console.log(chalk.bgGreenBright(chalk.black("[ GIT SUCCESS ]")), chalk.white(stdout));
            });
        });

        // Hapus file backup setelah selesai
        fs.unlinkSync(backupFileName);

    } catch (err) {
        console.error(chalk.bgRedBright(chalk.black("[ ERROR ]")), chalk.yellow(err));
    }
});
