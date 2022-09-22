const chalk = require('chalk');
const fs = require('fs');
const figlet = require('figlet');

/*  _____     _____ ___ _   _ ____    ____                 _                                  _     ____   ___ ____  ____  
   / ___ \   |  ___|_ _| | | / ___|  |  _ \  _____   _____| | ___  _ __  _ __ ___   ___ _ __ | |_  |___ \ / _ \___ \|___ \ 
  / / __| \  | |_   | || | | \___ \  | | | |/ _ \ \ / / _ \ |/ _ \| '_ \| '_ ` _ \ / _ \ '_ \| __|   __) | | | |__) | __) |
 | | (__   | |  _|  | || |_| |___) | | |_| |  __/\ V /  __/ | (_) | |_) | | | | | |  __/ | | | |_   / __/| |_| / __/ / __/ 
  \ \___| /  |_|   |___|\___/|____/  |____/ \___| \_/ \___|_|\___/| .__/|_| |_| |_|\___|_| |_|\__| |_____|\___/_____|_____|
   \_____/                                                        |_| 
*/
/*____  _        _     _           
 / ___|| |_ __ _| |__ | | ___ _ __ 
 \___ \| __/ _` | '_ \| |/ _ \ '__|
  ___) | || (_| | |_) | |  __/ |   
 |____/ \__\__,_|_.__/|_|\___|_|   
*/

fs.readFile('./package.json', async (err, data) => {
    figlet('FIUS Development', function(err, fd) {
        figlet('Stabler V'+JSON.parse(data).version, function(err, st) {
            console.log(
                fd+'\n',
                st+'\n',
                chalk.red.bold('————————————————————[Statistics]————————————————————'),
                chalk.gray(`\nRunning on Node ${process.version} on ${process.platform} ${process.arch}\nStabler Version: ${JSON.parse(data).version}\nMemory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`),
            );
            console.log('Mapping')
            require('./utils/files.js')
            .map('/plugins/*/index.js')
            .then((mapped) => {
                console.log('Mapped')
                console.log('Starting')
                mapped.forEach((dl) => {
                    console.log('Starting '+dl)
                    require(dl)
                })
            })
        });
    });
})


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