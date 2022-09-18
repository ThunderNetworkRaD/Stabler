const https = require("https");
const fs = require('fs');

async function download (url, path) {
    return new Promise((resolve, reject) => {
        try {
            https.get(url,(res) => {
                const filePath = fs.createWriteStream(path);
                res.pipe(filePath);
                filePath.on('finish',() => {
                    filePath.close();
                    resolve('ok');
                })
            })
        } catch (e) {
            console.log(e);
            resolve('error');
        }
    })
}

module.exports = {
    download
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