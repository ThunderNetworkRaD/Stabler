import {  } from 'node:fs';
import { writeFile, readFile, mkdir } from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
var name, rl;

export function getTime () {
    const date_time = new Date();
    const year = date_time.getFullYear();
    const month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    const day = ("0" + date_time.getDate()).slice(-2);
    const hours = date_time.getHours();
    const minutes = date_time.getMinutes();
    const seconds = date_time.getSeconds();
    return({year, month, day, hours, minutes, seconds})
};

export function createLog () {
    mkdir('./logs', { recursive: true });
    var time = getTime();
    name = `${time.year}.${time.month}.${time.day}.${time.hours}.${time.minutes}.${time.seconds}.log`;
    writeFile(`./logs/${name}`, '');
    return(name)
};

export function log (string) {
    readFile(`./logs/${name}`, 'utf8')
    .then(async (err, data) => {
        if (!data) data = '';
        data += string + '\n';
        writeFile(`./logs/${name}`, data);
    })
};

export function createCin (input, output) {
    if (!input) input = stdin;
    if (!output) output = stdout;
    rl = readline.createInterface({ input, output });
};

export function cin (question) {
    return new Promise((resolve, reject) => {
        try {
            rl.question(`${question} `)
            .then(async (answer) => {
                return resolve(answer);
            })
        } catch (e) {
            console.log(e)
            return resolve('error');
        }
    })
};

export async function cout (string) {
    var time = getTime();
    string = `[${time.year}.${time.month}.${time.day}-${time.hours}:${time.minutes}:${time.seconds}] | ${String(string)}`
    console.log(string);
    log(string);
};

export default { cin, createCin, cout, createLog, log }