const fs = require('fs');
const child_process = require("child_process");

var arrayToInstall = [];
var arrayOfAll = ['chalk', 'readline', 'figlet', 'adm-zip', 'util', 'glob'];

if (!fs.existsSync('./node_modules/chalk/package.json')) arrayToInstall.push('chalk');
if (!fs.existsSync('./node_modules/readline/package.json')) arrayToInstall.push('readline');
if (!fs.existsSync('./node_modules/figlet/package.json')) arrayToInstall.push('figlet');
if (!fs.existsSync('./node_modules/adm-zip/package.json')) arrayToInstall.push('adm-zip');
if (!fs.existsSync('./node_modules/@fiusdevelopment/files/package.json')) arrayToInstall.push('@fiusdevelopment/files');
if (!fs.existsSync('./node_modules/@fiusdevelopment/net/package.json')) arrayToInstall.push('@fiusdevelopment/net');


console.log(` ___           _        _ _           \n\
|_ _|_ __  ___| |_ __ _| | | ___ _ __ \n\
 | || \'_ \\/ __| __/ _\` | | |/ _ \\ \'__|\n\
 | || | | \\__ \\ || (_| | | |  __/ |   \n\
|___|_| |_|___/\\__\\__,_|_|_|\\___|_|\n\
————————————————————[Statistics]————————————————————\n\
Running on Node ${process.version} on ${process.platform} ${process.arch}\n\
Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n\
${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
);

if (arrayToInstall.length != 0){
    console.log('Installing');
    arrayToInstall.forEach((pacchetto) => {
        child_process.exec(`npm i ${pacchetto}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`);
                return;
            }
            console.log(`${stdout}`);
            if (stderr!= "") console.error(`Error: ${stderr}`);
        });
    })
} else {
    console.log('\n\n\nNothing to install');
};
/*
()
[]
{}
#
@
$
'
"
`
*/