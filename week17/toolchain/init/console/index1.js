var tty = require('tty');
var ttys = require('ttys');
var readline = require('readline');

var stdin = ttys.stdin;
var stdout = ttys.stdout;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");

// stdin.on('data', function(key) {
//     if (key === "\u0003") {
//         process.exit();
//     }

//     process.stdout.write(key.toString().charCodeAt(0).toString())
// })

function getChar() {
    return new Promise((resolve, reselectedect) => {
        stdin.on('data', key => {
            resolve(key)
        })
    })
}

function up(n = 1) {
    stdout.write('\033[' + n + 'A');
}

function down(n = 1) {
    stdout.write('\033[' + n + 'B');
}

function right(n = 1) {
    stdout.write('\033[' + n + 'C');
}

function left(n = 1) {
    stdout.write('\033[' + n + 'D');
}

void async function () {
    stdout.write('which one do you like it best? \n');
    let answer = await options(['vue', 'react', 'angular']);
    stdout.write('you choose ' + answer + '\n');
    process.exit();
    // while (true) {
    //     let char = await getChar();
    //     if (char === "\u0003") {
    //         break;
    //     }
    //     console.log(char.split("").map(c => c.charCodeAt(0)));
    // }
}()

async function options(choices) {
    let selected = 0;

    for (let i = 0; i < choices.length; i++) {
        let choice = choices[i];
        if (i === selected) {
            stdout.write('[x]' + choice + '\n');
        } else {
            stdout.write('[ ]' + choice + '\n');
        }
    }
    up(choices.length);
    right();
    while (true) {
        let char = await getChar();
        if (char === 'w' && selected > 0) {
            stdout.write(' ');
            left();
            selected--;
            up();
            stdout.write('x');
            left();
        }
        if (char === 's' && selected < choices.length - 1) {
            stdout.write(' ');
            left();
            selected++;
            down();
            stdout.write('x');
            left();
        }
        if (char === '\r') {
            down(choices.length - selected);
            left();
            return choices[selected];
        }
    }
}