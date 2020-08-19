# 工具链 | 目录结构与初始化工具
- 初始化 yeoman-generator
- 按照官网流程
    - 创建package.json文件
        ```json 
            {  "name": "generator-name",
                "version": "0.1.0",
                "description": "",
                "files": [
                    "generators"
                ],
                "keywords": ["yeoman-generator"],
                "dependencies": {
                    "yeoman-generator": "^1.0.0"
                }
            }
        ```
    - 目录结构 (注意不要创建错目录)
        ├───package.json
        └───generators/
            ├───app/
            │   └───index.js
            └───router/
                └─
    - 创建index.js文件
        ```javascript
            module.exports = class extends Generator {
                // The name `constructor` is important here
                constructor(args, opts) {
                    // Calling the super constructor is important so our generator is correctly set up
                    super(args, opts);
                }

                method1() {
                    this.log('method 1 just ran');
                }
            };
        ```
    - 执行npm link
    - 创建tt-example目录并执行yo toytool

    - [文件系统]("https://yeoman.io/authoring/file-system.html")
        - `this.fs.copyTpl` 拷贝文件
    - [管理包依赖]("https://yeoman.io/authoring/dependencies.html")
        - `this.npmInstall` 安装依赖

# 发布系统 | 实现一个线上 Web 服务
- 组成结构
    - server 服务端
    - publish-tool
    - publish-server
- 技术点
    - nodeJs中的stream
    - [archiver](https://www.npmjs.com/package/archiver)
    - [unzipper](https://www.npmjs.com/package/unzipper)