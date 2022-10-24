function catchError(message, err, origin, reason) { 
    console.log(chalk.gray('—————————————————————————————————'));
    console.log(
        chalk.white('['),
        chalk.red.bold('AntiCrash'),
        chalk.white(']'),
        chalk.gray(' : '),
        chalk.white.bold(message),
    );
    console.log(chalk.gray('—————————————————————————————————'));
    console.log(err, origin, reason);
}
process.on('unhandledRejection', (err, origin) => {
    catchError('Unhandled Rejection/Catch', err, origin);
});
process.on('uncaughtException', (err, origin) => {
    catchError('Uncaught Exception/Catch', err, origin);
});
process.on('multipleResolves', (type, promise, reason) => {
    catchError('Multiple Resolves', type, promise, reason);
});
  