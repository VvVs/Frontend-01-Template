let currentToken = null;
let currentAttibute = null;

let stack = [
    {
        type: 'document',
        children: []
    }
]

function emit(token) {
    let top = stack[stack.length - 1];
    if(token.type == 'startTag') {
      let element = {
        type: 'element',
        children: [],
        attributes: []
      }
  
      element.tagName = token.tagName;
  
      for(p in token) {
        if(p != 'type' && p != 'tagName') {
          element.attributes.push({
            name: p,
            value: token[p]
          })
        }
      }
      computeCSS(element);
  
      top.children.push(element);
  
      if(!token.isSelfClosing) {
        stack.push(element);
      }
      currentTextNode = null;
  
    } else if(token.type == 'endTag') {
      if(top.tagName != token.tagName) {
        throw new Error('Tag start end doesn\'t match!');
      } else {
        if(top.tagName == 'style') {
          addCSSRules(top.children[0].content);
        }
        stack.pop();
      }
      currentTextNode = null;
    } else if(token.type == 'text'){
      if(currentTextNode == null) {
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
  if(c == '<') {
    return tagOpen;
  } else if(c == EOF) {
    emit({
      type: 'EOF'
    })
    return ;
  } else {
    emit({
      type: 'text',
      content: c
    })
    return data;
  }
}

function tagOpen(c) {
  if(c == '/') {
    return endTagOpen;
  } else if(c.match(/^[a-zA-Z]$/)) {
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
  if(c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
  } else if(c == '>') {
    return data;
  } else if(c == EOF) {
    return 'endTagOpen: EOF';
  } else {
    return 'endTagOpen: else';
  }
}

function tagName(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c == '/') {
    return selfClosingStartTag;
  } else if(c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c;
    return tagName;
  } else if(c == '>') {
    emit(currentToken);
    return data;
  } else {
    currentToken.tagName += c;
    return tagName;
  }
}

function beforeAttributeName(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c == '/' || c == '>' || c == EOF) {
    return afterAttributeName(c);
  } else if(c == '=') {
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
  if(c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
    return afterAttributeName(c);
  } else if(c == '=') {
    return beforeAttributeValue;
  } else if(c == '\u0000') {
    return 'attributeName: null';
  } else if(c == '\'' || c == '\"' || c == '<') {
    return 'attributeName: \' \" <';
  } else {
    currentAttibute.name += c;
    return attributeName;
  }
}

function afterAttributeName(c) {
  if(c.match(/^[\t\n\f ]^/)) {
    return afterAttributeName;
  } else if(c == '/') {
    return selfClosingStartTag;
  } else if(c == '=') {
    return beforeAttributeValue;
  } else if(c == '>') {
    currentToken[currentAttibute.name] = currentAttibute.value;
    emit(currentToken);
    return data;
  } else if(c == EOF) {
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
  if(c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
    return beforeAttributeValue;
  } else if(c == '\"') {
    return doubleQuotedAttributeValue;
  } else if(c == '\'') {
    return singleQuotedAttributeValue;
  } else if(c == '>') {
    emit(currentToken);
    return data;
  } else {
    return unquotedAttributeValue(c);
  }
}

function doubleQuotedAttributeValue(c) {
  if(c == '\"') {
    currentToken[currentAttibute.name] = currentAttibute.value;
    return afterQuotedAttributeValue;
  } else if(c == '\u0000') {
    return 'doubleQuotedAttributeValue: null';
  } else if(c == EOF) {
    return 'doubleQuotedAttributeValue: EOF';
  } else {
    currentAttibute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(c) {
  if(c == '\'') {
    currentToken[currentAttibute.name] = currentAttibute.value;
    return afterQuotedAttributeValue;
  } else if(c == '\u0000') {
    return 'singleQuotedAttributeValue: null';
  } else if(c == EOF) {
    return 'singleQuotedAttributeValue: EOF';
  } else {
    currentAttibute.value += c;
    return singleQuotedAttributeValue;
  }
}

function unquotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttibute.name] = currentAttibute.value;
    return beforeAttributeName;
  } else if(c == '/') {
    currentToken[currentAttibute.name] = currentAttibute.value;
    return selfClosingStartTag;
  } else if(c == '>') {
    currentToken[currentAttibute.name] = currentAttibute.value;
    emit(currentToken);
    return data;
  } else if(c == '\u0000') {
    return 'unquotedAttributeValue: null';
  } else if(c == '\"' || c == '\'' || c == '<' || c == '=' || c == '`'){
    return 'unquotedAttributeValue: \"\'<=`';
  } else if(c == EOF) {
    return 'unquotedAttributeValue: EOF';
  } else {
    currentAttibute.value += c;
    return unquotedAttributeValue;
  }
}

function afterQuotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c == '/') {
    return selfClosingStartTag;
  } else if(c == '>') {
    currentToken[currentAttibute.name] = currentAttibute.value;
    emit(currentToken);
    return data;
  } else if(c == EOF) {
    return 'afterQuotedAttributeValue: EOF';
  } else {
    return 'afterQuotedAttributeValue: else';
  }
}

function selfClosingStartTag(c) {
  if(c == '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if(c == EOF) {
    return 'selfClosingStartTag: EOF';
  } else {
    return 'selfClosingStartTag: else';
  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for(let c of html) {
    // console.log(c);
    try {
      state = state(c);
    } catch(e) {
      return;
    }
  }
  state = state(EOF);
}