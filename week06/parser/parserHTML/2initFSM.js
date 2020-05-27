let EOF = Symbol("EOF"); // End Of File

function data () {

}

module.exports.parseHTML = function parseHTML(html) {
    console.log(html);
    let state = data;
    for (let char of html) {
        state = state(c)
    }

    state = state(EOF)
}