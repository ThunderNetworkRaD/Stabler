const fs = require("fs");
import('./utils/std.mjs')
.then(async (std) => {
    const { cin, cout, createLog, createCin } = std;

    createCin();
    async function home () {
        var cmd = await cin('Stabler')

        var commands = fs.readdirSync('./stabler/commands').filter(file => file.endsWith(".cjs"));
        var status = 0;
        var oldcommands = [];
        commands.forEach((command) => {
            command = require(`./stabler/commands/${command}`)
            if (command.name == cmd.toLocaleLowerCase()) {
                status = 1;
                command.run();
                home();
            }
            oldcommands.push(command)
        })
        var commands = fs.readdirSync('./stabler/commands').filter(file => file.endsWith(".mjs"));
        commands.forEach(async (command) => {
            command = await import(`./stabler/commands/${command}`);
            if (command.command.name == cmd.toLocaleLowerCase()) {
                status = 1;
                if (command.command.name.toLocaleLowerCase() == "help") command.command.run(oldcommands, commands);
                else command.command.run();
                home();
            }
        })
        if (status == 0) {
           
            home();
        }
    }

    home();
})
