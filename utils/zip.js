const AdmZip = require("adm-zip");
const path = require("path");

async function unzip(filepath, outputDir) {
    return new Promise((resolve, reject) => {
        try {
            const zip = new AdmZip(filepath);
            //var outputDir = path.parse(String(outputDir));
            zip.extractAllTo(String(outputDir));
            resolve('ok');
        } catch (e) {
            console.log(e)
            resolve('error')
        }
    })
}

module.exports = {
    unzip
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