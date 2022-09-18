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
                        .unzip(`./bin/${process.argv[3]}.zip`, `./plugins/${process.argv[3]}`)
                        .then((res) => {
                            if (res == 'ok') {
                                console.log('Plugin Unzipped')
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