module.exports = {
    name: 'exit',
    description: 'Close the program',
    usage: 'exit',
    run: async () => {
        process.exit()
    }
}