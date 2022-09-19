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
module.exports = {
    map
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