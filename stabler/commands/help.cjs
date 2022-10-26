module.exports = {
    name: 'help',
    description: 'Need help?',
    usage: 'help',
    run: async (commands) => {
        commands.forEach((command) => {
            command = require(`./${command}`);
            console.log(`\n${String(command.name).red}:\nDescription: ${command.description}\nUsage: ${command.usage}\n`)
        })
    }
}