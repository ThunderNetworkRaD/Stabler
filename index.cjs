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

const fs = require("fs");

const { exec } = require('child_process');

async function checkModules () {
    return new Promise((resolve, reject) => {
        try {
            var modules = Object.getOwnPropertyNames(require('./package.json').dependencies)
            var toInstall =  '';
            modules.forEach((module) => {
                var version = eval(`require('./package.json').dependencies.${module}`)
                version = version.replace('^', '')
                if (fs.existsSync(`./node_modules/${module}/package.json`)) {
                    if (version != require(`./node_modules/${module}/package.json`).version) {
                        toInstall += `${module}@${version} `;
                    }
                } else {
                    toInstall += `${module}@${version} `;
                }
            })
            if (toInstall.length == 0) {
                console.log('All packages are already up to date');
                return resolve('OK');
            }
            console.log('Updating npm modules (' + toInstall + ')')
            exec(`npm i ${toInstall}`, (error, stdout, stderr) => {                                                                            
                if (error) {
                    console.error(`Error: ${error}`);
                    return;
                }
                console.log('Updated all the modules');
                resolve('OK');
                if (stderr != "") console.error(`Error: ${stderr}`);
            });
        } catch (e) {
            console.log(e)
            return reject('error');
        }
    })
}

async function checkUpdate () {
    return new Promise((resolve, reject) => {
        try {
            console.log('Checking on web for the latest version')
            require('axios').get('https://raw.githubusercontent.com/FIUSdevelopment/Stabler/V3/package.json')
            .then(function (response) {
                response = JSON.parse(JSON.stringify(response.data));
                console.log(`The latest version is ${response.version}\nYou have currently installed ${require('./package.json').version}`);
                if (response.version == require('./package.json').version) {
                    console.log('Your version is up to date');
                    checkModules().then(() => resolve('OK') );
                } else {
                    console.log('Your version is not up to date, Trying to update');
    
                    exec('git pull', (error, stdout, stderr) => {                                                                            
                        if (error) {
                            console.error(`Error: ${error}`);
                            return;
                        }
                        console.log('Updated\nChecking Modules');
                        checkModules().then(() => resolve('OK') );
                        if (stderr != "") console.error(`Error: ${stderr}`);
                    });
                }
            })
        } catch (e) {
            console.log(e)
            return reject('error');
        }
    })
} 

async function checkWeb () {
    return new Promise((resolve, reject) => {
        try {
            var axios = false;
    
            console.log('Checking for Web-Required module')
    
            if (fs.existsSync('./node_modules/axios/package.json')) {
                axios = true;
                console.log('Module Found');
                checkUpdate().then(() => resolve('OK'));
            } else {
                console.log('Module Not Found, installing')
                exec('npm i axios', (error, stdout, stderr) => {                                                                            
                    if (error) {
                        console.error(`Error: ${error}`);
                        return;
                    }
                    console.log('Module Installed');
                    checkUpdate().then(() => resolve('OK'));
                    if (stderr != "") console.error(`Error: ${stderr}`);
                });
            }
        } catch (e) {
            console.log(e)
            return reject('error');
        }
    })
}

checkWeb()
.then(() => {
    var colors = require('colors');
    colors.enable();

    import('./utils/std.mjs')
    .then(async (std) => {
        const { cin, cout, createLog, createCin } = std;

        async function home () {
            var cmd = await cin('Stabler -'.brightRed)
        
            var commands = fs.readdirSync('./stabler/commands').filter(file => file.endsWith(".cjs"));
            var status = 0;
            commands.forEach((command) => {
                command = require(`./stabler/commands/${command}`)
                if (command.name == cmd.toLocaleLowerCase()) {
                    status = 1;
                    if (command.name == 'help') command.run(commands)
                    else command.run();
                    home();
                }
            })
            if (status == 0) {
            
                home();
            }
        }

        require('figlet')('FIUS Development', function(err, fd) {
            require('figlet')('Stabler V'+require('./package.json').version, function(err, st) {
                console.log(
                    '\n',
                    String(fd).brightGreen+'\n',
                    String(st).rainbow+'\n',
                    '————————————————————[Statistics]————————————————————'.brightRed,
                    `\nRunning on Node ${process.version} on ${process.platform} ${process.arch}\nStabler Version: ${require('./package.json').version}\nMemory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`.gray,
                    `\nRun ${'help'.bgWhite.black} to get help`
                );
                
                createCin();
                home();
            })
        })
    })        
});