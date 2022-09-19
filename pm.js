// arg 2 = what i have to do
// arg 3 = nome
// arg 4 = link
function exec (process) {
    require('figlet')('Stabler PM', function(err, fig) {
        console.log(fig)
        console.log(`Running on Node ${process.version} on ${process.platform} ${process.arch}\nMemory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
        switch (process.argv[2]){
            case 'install':
                require('./utils/net.js')
                .download(process.argv[4], `./bin/${process.argv[3]}.zip`)
                .then((res) => {
                    if (res == 'ok') {
                        console.log('Plugin Downloaded\nUnzipping')
                        require('./utils/zip.js')
                        .unzip(`./bin/${process.argv[3]}.zip`, `./plugins/`)
                        .then((res) => {
                            if (res == 'ok') {
                                console.log('Plugin Unzipped')
/*                                require('fs').readFile(`./plugins/${process.argv[3]}/plugin.json`, 'utf8', function readFileCallback(err, data){
                                    if (err){
                                        console.log(err);
                                    } else {
                                        console.log('Installing')
                                        obj = JSON.parse(data);
                                        obj.folderName = process.argv[3];
                                        json = JSON.stringify(obj);
                                        require('fs').writeFile(`./plugins/${process.argv[3]}/plugin.json`, json, 'utf8', () => {
                                            console.log('Installed')
                                        });
                                    }
                                });*/
                            } else {
                                console.log(`Canceled`)
                            }
                        })
                    } else {
                        console.log(`Canceled`)
                    }
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
                        } else console.log('Not this')
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