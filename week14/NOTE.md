# 组件化
- 初始配置
    - 项目初始化
        - npm init -y
    - 安装webpack 以及 热更新
        - npm i webpack --save-dev
        - npm i webpack-dev-server --save-dev
        - npm i webpack-cli --save-dev
    - 安装bable
        - npm i babel-loader --save-dev
        - npm i @bable/preset-env --save-dev
        - npm i @babel/plugin-transform-react-jsx --save-dev
        - npm i @babel/core --save-dev
    - 配置webpack
        ```Javascript
            module.exports = {
                entry: './main.js'
            }
        ```
- 小知识
    - jsx 
        - 传入小写则是认为传递进来的是个字符串
        - 大写则认为是class function之类的
        - 在jsx里 父子树的构建是先子后父

- 关键点
    - 组件化核心
        - 怎么设计attribute
        - 怎么设计property
        - 怎么设计children
        - event
        - state
# 轮播组件
    - 正常流排版
        - white-space: nowrap;
    - 制造整数一定范围内的循环

        ```Javascript
            void async function() {
                let i = 0;
                while(true) {
                    await sleep(1000);
                    console.log(i);
                    i = (i + 1) % 7;
                }
            }();

            function sleep(t) {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, t);
                });
            }
        ```
    - requestAnimationFrame 需要嵌套两层
        - 找到浏览器下一帧 （浏览器会再下一帧生效）
        - 实践
            - 有两个动画时用setTimeout分开
    - 16ms 一帧 1000 / 60