const EOF = Symbol("EOF"); // EOF end of file

function data(c) {

}

module.exports.parseHTML = function parseHTML(html) {
    console.log(html);
    let state = data;
    for (var c of html) {
        state = state(c);
    }
    state = state(EOF);
} 