# 事件循环

## 事件循环是什么？

- 事件循环是浏览器执行任务的机制，它会不断循环判断消息队列中是否有任务，队列中的任务都是指宏任务，而宏任务中包含微任务队列，在宏任务结束前后执行微任务队列，知道微任务队列中为空才结束这个宏任务。

- 宿主环境提供的方法是宏任务，JS 自带的是微任务
- case one
```Javascript
    new Promise(resolve => resolve()).then(() => console.log(1))
    setTimeout(function() {
        console.log(2)
    }, 0);
    console.log(3)

    // 312
```
- case two
```Javascript
    new Promise(resolve => resolve()).then(() => console.log(1))

    setTimeout(function() {
        console.log(2);
        new Promise(resolve => resolve()).then(() => console.log(3))
    }, 0)

    console.log(4)
    console.log(5)

    // 45123
```
- case three
```Javascript
    async function foo() {
        console.log(1);
        await new Promise(resolve => resolve());
        console.log(2);
    }

    new Promise(resolve => (console.log(3), resolve())).then(() => console.log(4))

    setTimeout(function() {
        console.log(5);
        new Promise(resolve => resolve()).then(() => {
            console.log(6)
        })
    }, 0)

    console.log(7)
    console.log(8)
    foo();

    // 37814256
```
- case four
```Javascript
    new Promise(
        resolve => resolve()).
        then(
            ()=> setTimeout(
                () => console.log(0), 0), console.log(1))

    console.log(2);

    // 120
```
- case five
```Javascript
    async function foo1() {
        console.log(1)
        await foo2();
        console.log(2)
    }

    async function foo2() {
        console.log(3)
    }

    foo1();

    new Promise(resolve => (console.log(4), resolve())).then(() => console.log(5))

    // 13425
```