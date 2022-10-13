function map (folder) {
    return new Promise((resolve, reject) => {
        try {
            const { glob } = require('glob');
            const { promisify } = require('util');
            const globPromise = promisify(glob);
        
            globPromise(`${process.cwd()}${folder}`)
            .then((mapped) => resolve(mapped))
        } catch (e) {
            console.log(e);
            resolve('error');
        }
    })
}
function mkdir (file) {
    return new Promise((resolve, reject) => {
        try {
            var fs = require('fs');
            var dir = file;
            
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            resolve('OK');
        } catch (e) {
            console.log(e);
            resolve('error');
        }
    })
}

module.exports = {
    map,
    mkdir
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