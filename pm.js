// arg 2 = what i have to do
// arg 3 = nome
// arg 4 = link
function exec (process) {
    require('figlet')('Stabler PM', function(err, fig) {
        console.log(fig)
        console.log(`Running on Node ${process.version} on ${process.platform} ${process.arch}\nMemory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
        switch (process.argv[2]){
            case 'dai':
                console.log('Mapping')
                require('./utils/files.js')
                .map('/bin/*.zip')
                .then((mapped) => {
                    console.log('Mapped')
                    let done;
                    mapped.forEach((dl) => {
                        var dl1 = dl.replace(`${process.cwd()}/bin/`, '')
                        if (done) {
                            return;
                        }
                        if (!a) {
                            var a = 1;
                        }
                        if (dl1 == a+'.zip') {
                            var a = a + 1;
                        }
                        if (dl1 != a+'.zip') {
                            done = true;
                            require('./utils/net.js')
                            .download(process.argv[4], `./bin/${a}.zip`)
                            .then((res) => {
                                if (res == 'ok') {
                                    console.log('Plugin Downloaded')
                                    console.log('Unzipping')
                                    require('./utils/zip.js')
                                    .unzip(`./bin/${a}.zip`, `./plugins/`)
                                    .then((res) => {
                                        if (res == 'ok') {
                                            console.log('Plugin Unzipped')
                                            console.log('Mapping')
                                            require('./utils/files.js')
                                            .map('/plugins/*/plugin.json')
                                            .then((mapped1) => {
                                                console.log('Mapped')
                                                mapped1.forEach((pl) => {
                                                    if (require(pl).name == process.argv[3]) {
                                                        var pl1 = pl.replace(`${process.cwd()}/plugins/`, '').replace('/plugin.json', '')
                                                        require('fs').readFile(`./plugins/${pl1}/plugin.json`, 'utf8', function readFileCallback(err, data){
                                                            if (err){
                                                                console.log(err);
                                                            } else {
                                                                console.log('Installing')
                                                                obj = JSON.parse(data);
                                                                obj.folderName = pl1;
                                                                json = JSON.stringify(obj);
                                                                require('fs').writeFile(`./plugins/${pl1}/plugin.json`, json, 'utf8', () => {
                                                                    console.log('Done')
                                                                });
                                                            }
                                                        });
                                                    }
                                                })

                                            })
                                        } else {
                                            console.log(`Canceled`)
                                        }
                                    })
                                } else {
                                    console.log(`Canceled`)
                                }
                            })
                        }
                    })
                })
                break;

            case 'download':
                console.log('Mapping')
                require('./utils/files.js')
                .map('/bin/*.zip')
                .then((mapped) => {
                    console.log('Mapped')
                    let done;
                    mapped.map((dl) => {
                        var dl1 = dl.replace(`${process.cwd()}/bin/`, '')
                        if (done) {
                            return;
                        }
                        if (!a) {
                            var a = 1;
                        }
                        if (dl1 == a+'.zip') {
                            var a = a + 1;
                        }
                        if (dl1 != a+'.zip') {
                            done = true;
                            require('./utils/net.js')
                            .download(process.argv[3], `./bin/${a}.zip`)
                            .then((res) => {
                                if (res == 'ok') {
                                    console.log('Plugin Downloaded')
                                    console.log('Unzipping')
                                    require('./utils/zip.js')
                                    .unzip(`./bin/${a}.zip`, `./plugins/`)
                                    .then((res) => {
                                        if (res == 'ok') {
                                            console.log('Plugin Unzipped')
                                            console.log('Done')
                                        } else {
                                            console.log(`Canceled`)
                                        }
                                    })
                                } else {
                                    console.log(`Canceled`)
                                }
                            })
                        }
                    })
                })

                break;
            
            case 'install':
                console.log('Mapping')
                require('./utils/files.js')
                .map('/plugins/*/plugin.json')
                .then((mapped) => {
                    console.log('Mapped')
                    mapped.forEach((pl) => {
                        if (require(pl).name == process.argv[3]) {
                            var pl1 = pl.replace(`${process.cwd()}/plugins/`, '').replace('/plugin.json', '')
                            require('fs').readFile(`./plugins/${pl1}/plugin.json`, 'utf8', function readFileCallback(err, data){
                                if (err){
                                    console.log(err);
                                } else {
                                    console.log('Installing')
                                    obj = JSON.parse(data);
                                    obj.folderName = pl1;
                                    json = JSON.stringify(obj);
                                    require('fs').writeFile(`./plugins/${pl1}/plugin.json`, json, 'utf8', () => {
                                        console.log('Done')
                                    });
                                }
                            });
                        }
                    })
                })
                break;

            case 'uninstall':
                console.log('Mapping')
                require('./utils/files.js')
                .map('/plugins/*/plugin.json')
                .then((mapped) => {
                    console.log('Mapped')
                    console.log('Scanning')
                    mapped.map((pl) => {
                        if (require(pl).name == process.argv[3]) {
                            console.log('Deleting')
                            require('fs')
                            .rmdir(`./plugins/${require(pl).folderName}`, { recursive: true }, () => {
                                console.log('Done')
                            })
                        }
                    })
                })

                break;

            case 'list':
                console.log('Mapping')
                require('./utils/files.js')
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
                console.log('pm dai <name> <url>')
                console.log('pm download <url>')
                console.log('pm install <name>')
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