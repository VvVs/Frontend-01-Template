# 表达式
### Expressions
- Left Handsize
- Right Handsize
- 运算符
    - [运算符优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
    - Member
        - a.b
        - a[b]
        - foo\`string\`
            ```javascript
            var name = 'Jason';
            `hello${name}`;

            function foo() {
                console.log(arguments);
            }
            foo`hello ${name}`
            ```
        - super.b
        - super['b']
        - new.target
        - new Foo()
    - New
        - new Foo
    - Call
        - foo()
        - super()
        - foo()['b']
        - foo().b
    - update
        - a++
        - a--
        - --a
        - ++a
    - Unary
        - delete a.b
        - void 0;
        - typeof a;
        - +a
        - -a
        - ~a
        - !a
        ```javascript
        !!a // => true
        ```
        - await a
    - Exponental
        - **
    - Mutiplicative
        - /%
    - Additive
        - （+ -）
    - Shift
        - << >> >>>
    - Releationship
        - < > <= >= instanceof in
    - Equality
        - ==
        - != 
        - ===
        - !==
    - Bitsise
        - & ^ |    
    - Logical
        - &&
            - 短路逻辑
            ```Javascript
            function foo1() {
                console.log(1);
                return false;
            }

            function foo2() {
                console.log(2)
            }

            foo1() && foo2()
            ```
        - ||
    - Conditional
        - ? :
- 类型转换
    - 基础类型
        - undefined
        - boolean
        - string
        - number
        - object
        - symbol
        - null
    - 装箱拆箱
        - 装箱
            - 可以装箱的四种基本类型 boolean string number symbol 
            ```Javascript
            new Number(1);
            Number(1)
            new String('1');
            String(1)
            Object('1');
            Symbol('1')
            Object(Symbol("1))

            (function() {
                return this;
            }).apply(Symbol("x"))
            ```
        - 拆箱
            - 拆箱规则
                - 有了toPrimitive 只调用 toPrimitive 没有则调用默认的toPrimitive
                    - 优先使用valueOf的值 再使用toString的值
        ```Javascript
        1 + {} // "1[object Object]"
        1 + {valueOf() {return 2}} // 3
        1 + {toString() {return 2}} // 3
        1 + {toString() {return '4'}} // '14'
        1 + {valueof() {return 1}, toString() {return "2"}} // 2
        "1" + {valueOf() {return 1}, toString() {return "2"}} // "11"
        1 + {[Symbol.toPrimitive]() {return 6}, valueOf() {return 1}, toString() {return "2"}} // 7
        "1" + {valueOf() {return }, toString(){return '2'}} // "1undefined"
        "1" + {valueOf() {return {}}, toString(){return '2'}} // "12"
        ```
# 语句
    - Grammar
        - 简单语句
            - ExpressionStatement
            ```Javascript
            a = 1 + 2;
            ```
            - EmptyStatement
            ```Javascript
            ;
            ```
            - DebuggerStatement
            ```Javascript
            debugger
            ```
            - ThrowStatement
            ```Javascript
            throw a
            ```
            - ContinueStatement
            ```Javascript
            continue label1;
            ```
            - BreakStatement
            ```Javascript
            break label2;
            ```
            - ReturnStatement
            ```Javascript
            return 1 + 2;
            ```
        - 组合语句
            - BlockStatement
                - 由一对大括号开头
                - [[type]]: normal
                - [[value]]: -
                - [[target]]: -
            - IfStatement
            - SwitchStatement
            - IterationStatement
                - while
                - do while
                - for 
                - for in
                - for of
                ```Javascript
                function *p() {
                    yield 0;
                    yield 1;
                    yield 2;
                }

                for (var i of p()) {
                    console.log(i)
                }
                ```
                - for await
                ```Javascript
                function sleep(timer) {
                    return new Promise(resolve => setTimeout(resolve, timer));
                }

                async function* foo() {
                    var i = 0;
                    while(true) {
                        yield i++;
                        await sleep(1000);
                    }
                }

                void async function() {
                    var g = foo();
                    for await(var e of g) {
                        console.log(e)
                    }
                }()
                ```
            - WithStatement
            - LabelledStatement
            - TryStatement
                - [[type]]: return
                - [[value]]: -
                - [[target]]: label
            ```Javascript
            try {
                throw 2;
            } catch (e) {
                let e;
                console.log(e)
            } // Uncaught SyntaxError: Identifier 'e' has already been declared
            ```
        - 声明
            - FunctionDeclaration
            - GeneratorDeclaration
            ```Javascript
            function* foo() {
                yield 0;
                yield 1;
                yield 2;
            }

            var g = foo();
            g.next();
            ```
            - AsyncFunctionDeclaration
            ```Javascript
            function sleep(timer) {
                return new Promise(resolve => setTimeout(resolve, 1000))
            }

            void async function foo() {
                var i = 0;
                while(true) {
                    console.log(i++);
                    await sleep(1000)
                }
            }
            ```
            - AsyncGeneratorDeclaration
            ```Javascript
            function sleep(timer) {
                return new Promise(resolve => setTimeout(resolve, 1000))
            }

            async function* foo() {
                var i = 0;
                while(true) {
                    yield i++;
                    await sleep(1000)
                }
            }

            void async function() {
                var g = foo();
                console.log(await g.next())
                console.log(await g.next())
                console.log(await g.next())
                console.log(await g.next())
            }()
            ```
            - VariableDeclaration
                - var (变量提升)
                ```Javascript
                var x = 0;
                function foo() {
                    var o = {x : 1}
                    x = 2;
                    with(o) {
                        var x = 3;
                    }
                    console.log(x)
                }

                foo();
                console.log(x);
                ```
                - 最佳实践
                    - 不要再block里面写var
                    - 在函数体前面定义var
            - ClassDeclaration
            ```Javascript
            function foo() {
                class cls1{}
                class cls1{}
            } // Uncaught SyntaxError: Identifier 'cls1' has already been declared

            function foo() {
                cls1 = 1;
                class cls1{}
            } // Uncaught ReferenceError: Cannot access 'cls1' before initialization
            ```
            - LexicalDeclaration
    - Runtime
        - Completion Record
            - [[type]]: normal, break, continue, return , throw
            - [[value]]: Types (七种语言类型)
            - [[target]]: label
        - Lexical Environment