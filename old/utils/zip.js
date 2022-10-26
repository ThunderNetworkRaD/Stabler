const AdmZip = require('adm-zip');

async function unzip(filepath, outputDir) {
    return new Promise((resolve, reject) => {
        try {
            const zip = new AdmZip(filepath);
            zip.extractAllTo(String(outputDir));
            resolve('ok');
        } catch (e) {
            console.log(e)
            resolve('error')
        }
    })
}
async function read(filepath, name, utf) {
    return new Promise((resolve, reject) => {
        try {
            const zip = new AdmZip(filepath);
            var zipEntries = zip.getEntries();

            zipEntries.forEach((zipEntry) => {
                if (zipEntry.name == name) {
                    console.log('trovato')
                    resolve(zipEntry.getData().toString(utf || 'utf-8'));
                }
            });
        } catch (e) {
            console.log('Error')
            resolve('Error')
        }
    })
}

module.exports = {
    unzip,
    read
}
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