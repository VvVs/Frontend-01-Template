let currentToken = null;

function emit(token) {
    console.log(token);
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (c of html) {
        state = state(c)
    }

    state = state(EOF)
}