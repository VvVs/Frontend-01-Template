# 异步编程实践
- 红绿灯
    - 条件 绿灯亮10s, 红灯亮5s, 黄灯亮3s
    ```Javascript
        function green() {
                var divs = document.getElementsByTagName('div);
                for (var i = 0; i < divs.length; i++) {
                    divs[i].classList.remove('light');
                    document.getElementsByClassName('green')[0].classList.add('light');
                }
            }

            function red() {
                var divs = document.getElementsByTagName('div);
                for (var i = 0; i < divs.length; i++) {
                    divs[i].classList.remove('light');
                    document.getElementsByClassName('red')[0].classList.add('light');
                }
            }

            function yellow() {
                var divs = document.getElementsByTagName('div);
                for (var i = 0; i < divs.length; i++) {
                    divs[i].classList.remove('light');
                    document.getElementsByClassName('yellow')[0].classList.add('light');
                }
            }
    ```
    - setTimeout
        ```Javascript
            function go() {
                green();

                setTimeout(yellow, 10000);
                setTimeout(red, 12000);
                setTimeout(go, 17000);
            }
        ```
    - promise
        ```Javascript        
            function sleep(t) {
                return new Promise((reslove, reject) => {
                    setTimeout(resolve, t);
                })
            }
        
            function go() {
                green();

                sleep(1000).then(() => {
                    yellow();
                    return sleep(200);
                }).then(() => {
                    red();
                    return sleep(500)
                }).then(go)
            }
        ```
    - async await
        ```Javascript
            function sleep(t) {
                return new Promise((reslove, reject) => {
                    setTimeout(resolve, t);
                })
            }

            async function go() {
                while(true) {
                    green();
                    await sleep(1000);
                    yellow();
                    await sleep(200);
                    red();
                    await sleep(500);
                }
            }
        ```
    - generator
        ```Javascript
            function sleep(t) {
                return new Promise((reslove, reject) => {
                    setTimeout(resolve, t);
                })
            }

            function* go() {
                while(true) {
                    green();
                    yield sleep(1000);
                    yellow();
                    yield sleep(200);
                    red();
                    yield sleep(500)
                }
            }
        ```


# 寻路
- 深度优先搜索
- 广度优先搜索

# 正则
- 捕获 
    - ()
- 不捕获
    - (?:)
- match
    ```Javascript
        "abc".match(/a(b)c/) // ["abc", "b", index: 0, input: "abc", groups: undefined] 

        "abc".match(/a(b)|c/g) // ["ab", "c"]

        "[a=value]".match(/\[([^=]+)=([^\]]+)\]/) // ["[a=value]", "a", "value", index: 0, input: "[a=value]", groups: undefined]
    ```
- replace
    ```Javascript
        "abc".replace(/a(b)c/, function(str, $1) {
            console.log(str, $1);
            return $1 + $1;
        }) // abc b bb
    ```
- exec
    ```Javascript
        let lastIndex = 0;
        let token;

        do {
            token = inputElement.exec(source);
            console.log(token)
        } while (inputElement.lastIndex - lastIndex == token.length)
    ```
- lastIndex