# toolchain
- tools
    - 初始化(最核心，决定了剩下的工具是什么，怎么用。)
        - yeoman
        - create-react-app
        - vue-cli
    - 开发/调试
        - dev-tool / chrome
        - webpack-dev-server
        - mock
        - wireshark
        - charles
    - 测试
        - mocha
        - jest
    - 发布
        - lint
        - jenkins

# yeoman
    - 安装
        - npm install yeoman-generator
    - 三大核心功能
        - 从用户收集信息的能力 
        - 对npm的操作的能力
        - 对文件模板的能力
    - 执行顺序
        - 顺序向下执行

- Generator
    - Generator是生成项目的东西 类似于 vue-cli create-react-app
    - yeoman是Generator的Generator 可以用yeoman的基础设施轻易的写出Generator 

# npm
    - 关于npm link
        - 例如命名为tracy 相当于在本机中全局安装了一个tracy的包 调yo tracy会在本机中找tracy这个包去执行