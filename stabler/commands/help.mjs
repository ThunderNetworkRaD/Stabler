import chalk from 'chalk';

export var command = {
    name: 'help',
    description: 'Need help?',
    usage: 'help <!command>',
    run: async (oldcommands, commands) => {

        var newcommands = [];

        oldcommands.forEach((command) => {
            newcommands.push(command);
        })

        var wait = commands.length + 1;
        commands.forEach(async (command) => {
            wait--;
            command = await import(`./${command}`);
            command = command.command;
            newcommands.push(command);
        })

        while(wait > 0){
            wait--;
            newcommands.forEach((command) => {
                console.log(`${chalk.green(command.name)}:\nDescription: ${command.description}\nUsage: ${command.usage}\n`)
            })
        }
    }
}