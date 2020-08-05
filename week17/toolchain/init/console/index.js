var tty = require('tty');
var ttys = require('ttys');
var readline = require('readline');

var stdin = ttys.stdin;
var stdout = ttys.stdout;

// stdout.write("aha   sun\n");
// stdout.write("\033[1A");
// stdout.write("tracy\n");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function ask(question) {
    return new Promise((resolve, reject) => {
        rl.question('What do you think of Node.js? ', (answer) => {
            // TODO: Log the answer in a database
            console.log(`Thank you for your valuable feedback: ${answer}`);
        
            resolve(answer);
        });        
    })
}

void async function () {
    console.log(await ask("your project name?"));
}();