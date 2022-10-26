// arg 2 = what i have to do
// arg 3 = nome
// arg 4 = link
function exec (process) {
    require('figlet')('Stabler PM', function(err, fig) {
        console.log(fig)
        console.log(`Running on Node ${process.version} on ${process.platform} ${process.arch}\nMemory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
        switch (process.argv[2]){

            case 'install':
                console.log('Getting plugin name')
                require('./utils/zip.js')
                .read(process.argv[3], 'plugin.json')
                .then((plf) => {
                    var plf = JSON.parse(plf)
                    console.log('Unzipping')
                    require('./utils/zip.js')
                    .unzip(process.argv[3], `./plugins/`)
                    .then((res) => {
                        if (res == 'ok') {
                            console.log('Plugin Unzipped')
                            console.log(`Searching for ${plf.name}(${plf.version})`)
                            console.log('--> Mapping')
                            require('@fiusdevelopment/files')
                            .map('/plugins/*/plugin.json')
                            .then((mapped) => {
                                console.log('--> Mapped')
                                mapped.forEach((pl) => {
                                    if (require(pl).name == plf.name) {
                                        var pl1 = pl.replace(`${process.cwd()}/plugins/`, '').replace('/plugin.json', '')
                                        require('fs').readFile(`./plugins/${pl1}/plugin.json`, 'utf8', (err, data) => {
                                            if (err){
                                                console.log('Error');
                                            } else {
                                                console.log('Installing')
                                                obj = JSON.parse(data);
                                                obj.folderName = pl1;
                                                json = JSON.stringify(obj);
                                                require('fs').writeFile(`./plugins/${pl1}/plugin.json`, json, 'utf8', () => {
                                                    console.log('Installing dependencies')
                                                    if (require('fs').existsSync(`./plugins/${pl1}/package.json`)) {
                                                        var toInstall = Object.getOwnPropertyNames(require(`./plugins/${pl1}/package.json`).dependencies)
                                                        console.log('To install: '+ toInstall)
                                                        toInstall.forEach((pacchetto) => {
                                                            console.log('Installing npm package '+pacchetto)
                                                            require('child_process')
                                                            .exec(`npm i ${pacchetto}`, (error, stdout, stderr) => {
                                                                if (error) {
                                                                    console.error(`Error: ${error}`);
                                                                    return;
                                                                }
                                                                console.log(`${stdout}`);
                                                                    if (stderr!= "") console.error(`Error: ${stderr}`);
                                                            });
                                                        })
                                                    } else console.log('No dependencies')
                                                    
                                                    console.log('Installing')
                                                    require('child_process')
                                                    .exec(require(`./plugins/${pl1}/plugin.json`).install, (error, stdout, stderr) => {                                                                            
                                                        if (error) {
                                                            console.error(`Error: ${error}`);
                                                            return;
                                                        }
                                                        console.log(`${stdout}`);
                                                        if (stderr != "") console.error(`Error: ${stderr}`);
                                                    });
                                                });
                                            }
                                        });
                                    }
                                })
                            })
                        } else {
                            console.log('Error')
                        }
                    })
                })
                break;

            case 'uninstall':
                console.log('Mapping')
                require('@fiusdevelopment/files')
                .map('/plugins/*/plugin.json')
                .then((mapped) => {
                    console.log('Mapped')
                    console.log('Scanning')
                    mapped.map((pl) => {
                        if (require(pl).name == process.argv[3]) {
                            console.log('Removing dependencies')
                            if (require('fs').existsSync(pl.replace('plugin.json', 'package.json'))) {
                                var toRemove = Object.getOwnPropertyNames(require(pl.replace('plugin.json', 'package.json')).dependencies)
                                console.log('To remove: '+ toRemove)
                                toRemove.forEach((pacchetto) => {
                                    console.log('Removing npm package '+pacchetto)
                                    require('child_process')
                                    .exec(`npm remove ${pacchetto}`, (error, stdout, stderr) => {                                                                            if (error) {
                                            console.error(`Error: ${error}`);
                                            return;
                                        }
                                        console.log(`${stdout}`);
                                        if (stderr!= "") console.error(`Error: ${stderr}`);
                                    });
                                })    
                            } else console.log('No dependencies')
                            console.log('Uninstalling')
                            require('child_process')
                            .exec(String(require(pl).uninstall), (error, stdout, stderr) => {                                                                            
                                if (error) {
                                    console.error(`Error: ${error}`);
                                    return;
                                }
                                console.log(`${stdout}`);
                                console.log('Deleting')
                                require('fs')
                                .rm(`./plugins/${require(pl).folderName}`, { recursive: true }, () => {
                                    console.log('The app will close automatically on finish - DO NOT CLOSE WITH ^C')
                                })
                                if (stderr != "") console.error(`Error: ${stderr}`);
                            });
                        }
                    })
                })

                break;

            case 'list':
                console.log('Mapping')
                require('@fiusdevelopment/files')
                .map('/plugins/*/plugin.json')
                .then((mapped) => {
                    console.log('Mapped')
                    mapped.map((pl) => {
                        console.log(`${require(pl).name} (${require(pl).version})`)
                    })
                })

                break;
            
            default: 
                console.log('Help')
                console.log('pm install <name> (Require a .zip file)')
                console.log('pm uninstall <name>')
                console.log('pm list')
                break;
        }
    });
}

exec(process)
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