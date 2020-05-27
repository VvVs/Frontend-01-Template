let EOF = Symbol("EOF"); // End Of File

function data (c) {
    if (c == "<") { // 开始标签
        return tagOpen;
    } else if (c == EOF) {
        return;
    } else {
        return data;
    }
}

function tagOpen(c) {
    if (c == '/') { // 匹配到 / 说明到了结束标签
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) { // 匹配到了字母说明到了标签名
        return tagName(c); 
    } else {
        return;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)
    } else if (c == ">") {

    } else if (c == EOF) {

    } else {

    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ] $/)) { // 匹配到空格则说明是属性值
        return beforeAttributeName;
    } else if (c == '/') {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        return tagName;
    } else if (c == ">") {
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == ">") {
        return data;
    } else if (c == "=") {
        return beforeAttributeName;
    } else {
        return beforeAttributeName;
    }
} 

function selfClosingStartTag(c) {
    if (c == ">") {
        currentToken.isSelfClosing = true;
        return data;
    } else if (c == EOF) {

    } else {
        
    }
}

module.exports.parseHTML = function parseHTML(html) {
    console.log(html);
    let state = data;
    for (let char of html) {
        state = state(c)
    }

    state = state(EOF)
}