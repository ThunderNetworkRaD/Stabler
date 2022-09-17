const fs = require('fs');
const https = require("https");

async function download(pacchetto) {
    if (pacchetto) {
        fs.readFile(pacchetto, async (err, data) => {
            console.log(JSON.parse(data))
            JSON.parse(data).files.forEach(async function (name, url) {
                https.get(url,(res) => {
                    const filePath = fs.createWriteStream('./plugins/'+JSON.parse(data).name + name);
                    res.pipe('./plugins/' + JSON.parse(data).name + name);
                    filePath.on('finish',() => {
                        filePath.close();
                        console.log('Download Completed');
                    })
                })
            })
        })
    } else {
        console.log('Error')
    }
}

module.exports = download;