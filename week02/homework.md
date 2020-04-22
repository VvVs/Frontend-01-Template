## 匹配number直接量
+ 匹配整数
    ```
        /^-?\\d+$/
    ```
+ 匹配浮点数
    ```
        /^(\d+\.)|(\d)|[\D.]/
    ```
+ 匹配二进制
    ```
        /^[01]+$/
    ```
+ 匹配非0的十进制
    ```
        /^[1-9][0-9]?$/;
    ```
+ 匹配十六进制
    ```
        \b0[xX][0-9a-fA-F]+\b
    ```
## 写一个UTF-8 Encoding函数
+ 参考了其他同学的答案
```Javascript
    function Encoding(data) {
        const code = encodeURIComponent(data);
        const bytes = [];
        for (let i of code) {
            const c = code.charAt(i);
            if (c === '%') {
                const hex = code.charAt(i + 1) + code.charAt(i + 2);
                const hexVal = parseInt(hex, 16);
                bytes.push(hexVal);
                i += 2;
            } else bytes.push(c.charCodeAt(0));
        }
        return bytes;
    }
```

## 匹配String直接量
+ 参考了老师的答案
```
"(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*"
```
```
'(?:[^'\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*'
```