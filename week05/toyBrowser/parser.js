let css = require('css');

let currentToken = null;
let currentAttibute = null;

let stack = [{ type: 'document', children: [] }];
let currentTextNode = null;

let rules = [];
function addCSSRules(text) {
    let ast = css.parse(text);
    rules.push(...ast.stylesheet.rules);
}

function match(element, selector) {
    if (!selector || !element.attributes) return false;

    let combineSelectors = selector.split(/(?=[.#])/);

    for (s of combineSelectors) {
        let attr;
        if (s.charAt() == '#') {
            attr = element.attributes.filter(attr => attr.name === 'id')[0];
            if (!attr || attr.value !== selector.replace('#', '')) return false;
        } else if (s.charAt() === '.') {
            attr = element.attributes.filter(attr => attr.name === 'class')[0];
            if (!attr || attr.value.split(' ').indexOf(s.replace('.', '')) === -1) return false;
        } else {
            if (element.tagName !== s) return false;
        }
    }
    return true;
}

function specificity(selector) {
    let p = [0, 0, 0, 0];
    let selectorParts = selector.split(' ');
    for (let part of selectorParts) {
        let parts = part.split(/(?=[.#])/);
        parts.forEach(item => {
            if (item.charAt(0) == '#') {
                p[1] += 1;
            } else if (item.charAt(0) == '.') {
                p[2] += 1;
            } else {
                p[3] += 1;
            }
        })
    }
    return p;
}

function compare(sp1, sp2) {
    if (sp1[0] - sp2[0]) return sp1[0] - sp2[0];
    if (sp1[1] - sp2[1]) return sp1[1] - sp2[1];
    if (sp1[2] - sp2[2]) return sp1[2] - sp2[2];

    return sp1[3] - sp2[3];
}

function computeCSS(element) {
    let elements = stack.slice().reverse();
    if (!element.computedStyle) {
        element.computedStyle = {};
    }

    for (let rule of rules) {
        let selectorParts = rule.selectors[0].split(' ').reverse();

        if (!match(element, selectorParts[0])) continue;

        let matched = false;

        let j = 1;
        for (let i = 0; i < elements.length; i++) {
            if (match(elements[i]), selectorParts[j]) {
                j++;
            }
        }

        if (j >= selectorParts.length) {
            matched = true;
        }
        if (matched) {
            let sp = specificity(rule.selectors[0]);
            let computedStyle = element.computedStyle;
            for (let declaration of rule.declarations) {
                if (!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {};
                }

                if (!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                } else if (compare(sp, computedStyle[declaration.property].specificity) >= 0) {
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
            }
        }
    }
}

function emit(token) {
    let top = stack[stack.length - 1];
    if (token.type == 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attributes: []
        }

        element.tagName = token.tagName;

        for (p in token) {
            if (p != 'type' && p != 'tagName') {
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }
        computeCSS(element);

        top.children.push(element);

        if (!token.isSelfClosing) {
            stack.push(element);
        }
        currentTextNode = null;

    } else if (token.type == 'endTag') {
        if (top.tagName != token.tagName) {
            throw new Error('Tag start end doesn\'t match!');
        } else {
            if (top.tagName == 'style') {
                addCSSRules(top.children[0].content);
            }
            stack.pop();
        }
        currentTextNode = null;
    } else if (token.type == 'text') {
        if (currentTextNode == null) {
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}

const EOF = Symbol('EOF'); // EOF: End Of File 

function data(c) {
    if (c == '<') {
        return tagOpen;
    } else if (c == EOF) {
        emit({
            type: 'EOF'
        })
        return;
    } else {
        emit({
            type: 'text',
            content: c
        })
        return data;
    }
}

function tagOpen(c) {
    if (c == '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c);
    } else {
        return data(c);
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)
    } else if (c == '>') {
        return data;
    } else if (c == EOF) {
        return 'endTagOpen: EOF';
    } else {
        return 'endTagOpen: else';
    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == '/') {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c == '>') {
        emit(currentToken);
        return data;
    } else {
        currentToken.tagName += c;
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == '/' || c == '>' || c == EOF) {
        return afterAttributeName(c);
    } else if (c == '=') {
        return 'beforeAttributeName: =';
    } else {
        currentAttibute = {
            name: '',
            value: ''
        }
        return attributeName(c);
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
        return afterAttributeName(c);
    } else if (c == '=') {
        return beforeAttributeValue;
    } else if (c == '\u0000') {
        return 'attributeName: null';
    } else if (c == '\'' || c == '\"' || c == '<') {
        return 'attributeName: \' \" <';
    } else {
        currentAttibute.name += c;
        return attributeName;
    }
}

function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]^/)) {
        return afterAttributeName;
    } else if (c == '/') {
        return selfClosingStartTag;
    } else if (c == '=') {
        return beforeAttributeValue;
    } else if (c == '>') {
        currentToken[currentAttibute.name] = currentAttibute.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {
        return 'afterAttributeName: EOF';
    } else {
        currentToken[currentAttibute.name] = currentAttibute.value;
        currentAttibute = {
            name: '',
            value: ''
        }
        return attributeName(c);
    }
}

function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
        return beforeAttributeValue;
    } else if (c == '\"') {
        return doubleQuotedAttributeValue;
    } else if (c == '\'') {
        return singleQuotedAttributeValue;
    } else if (c == '>') {
        emit(currentToken);
        return data;
    } else {
        return unquotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c) {
    if (c == '\"') {
        currentToken[currentAttibute.name] = currentAttibute.value;
        return afterQuotedAttributeValue;
    } else if (c == '\u0000') {
        return 'doubleQuotedAttributeValue: null';
    } else if (c == EOF) {
        return 'doubleQuotedAttributeValue: EOF';
    } else {
        currentAttibute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c) {
    if (c == '\'') {
        currentToken[currentAttibute.name] = currentAttibute.value;
        return afterQuotedAttributeValue;
    } else if (c == '\u0000') {
        return 'singleQuotedAttributeValue: null';
    } else if (c == EOF) {
        return 'singleQuotedAttributeValue: EOF';
    } else {
        currentAttibute.value += c;
        return singleQuotedAttributeValue;
    }
}

function unquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttibute.name] = currentAttibute.value;
        return beforeAttributeName;
    } else if (c == '/') {
        currentToken[currentAttibute.name] = currentAttibute.value;
        return selfClosingStartTag;
    } else if (c == '>') {
        currentToken[currentAttibute.name] = currentAttibute.value;
        emit(currentToken);
        return data;
    } else if (c == '\u0000') {
        return 'unquotedAttributeValue: null';
    } else if (c == '\"' || c == '\'' || c == '<' || c == '=' || c == '`') {
        return 'unquotedAttributeValue: \"\'<=`';
    } else if (c == EOF) {
        return 'unquotedAttributeValue: EOF';
    } else {
        currentAttibute.value += c;
        return unquotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == '/') {
        return selfClosingStartTag;
    } else if (c == '>') {
        currentToken[currentAttibute.name] = currentAttibute.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {
        return 'afterQuotedAttributeValue: EOF';
    } else {
        return 'afterQuotedAttributeValue: else';
    }
}

function selfClosingStartTag(c) {
    if (c == '>') {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if (c == EOF) {
        return 'selfClosingStartTag: EOF';
    } else {
        return 'selfClosingStartTag: else';
    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (let c of html) {
        // console.log(c);
        try {
            state = state(c);
        } catch (e) {
            return;
        }
    }
    state = state(EOF);
    return stack[0];
}