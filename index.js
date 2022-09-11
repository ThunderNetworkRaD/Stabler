import chalk from 'chalk';
import fs from 'fs';


fs.readFile('./package.json', async (err, data) => {
    console.log(
        chalk.red.bold('————————————————————[Statistics]————————————————————'),
        chalk.gray(`\nRunning on Node ${process.version} on ${process.platform} ${process.arch}\nStabler Version: ${JSON.parse(data).version}\nMemory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`),
    );
})


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