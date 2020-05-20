# 编程语言通识
## 语言按语法分类
- 非形式语言
    - 英文， 中文
- 形式语言（乔姆斯基谱系）
    - 0型 无限制文法
    - 1型 上下文相关法
    - 2型 上下文无关法
    - 3型 正则文法

- 产生式（BNF）
    - 用尖括号括起来的名称来表示语法结构名
    - 语法结构分成基础结构和需要用其他语言结构定义的复合结构
        - 基础结构称终结符
        - 复合结构称非终结符
    - 引号和中间的字符表示终结符
    - 可以有括号
    - * 表示重复多次
    - | 表示或
    - + 表示至少一次
- 图灵完备性
    - 命令式(图灵机)  图灵完备性：一切可计算的问题都能计算，这样的虚拟机或者编程语言就叫图灵完备的
        - goto
        - if 和 while
    - 声明式
        - lambda
            - 递归
- 动态与静态
    - 动态
        - 在用户设备/在线服务器上
        - 产品实际运行时
        - Runtime
    - 静态
        - 在程序员设备上
        - 产品开发时
        - Compiletime
- 类型系统
    - 动态类型系统/静态类型系统
    - 强类型弱类型 (强类型无隐式转换，弱类型有隐式转换)
        - String + Number
        - String == Boolean
    - 符合结构
        - 结构体 （对象）
        - 函数签名 
    - 子类型
        - 逆变
        - 协变

## Unicode
- Unicode (字符集) 
- 码点 （正整数对用的字符就是码点）
- 参考网站
    - http://home.unicode.org （官网）
    - https://www.fileformat.info/info/unicode/
- Basic Latin 
    - js代码限制在ASCII兼容部分
- BMP (基本字符平面)
- \u转译 
    - 适应的两个场景
        - 标识符/变量名
        - 字符串
- InputElement
    - WhiteSpace
        - TAB ("\t")
        - VT (纵向制表符)
        - FF (FormFeed)
        - SP
        - NBSP (处理排版 不间断) no-break 处理排版时，如果是普通的SP，会在一行放不下时，将它左右断开;NBSP 它的左右不会断开
        - ZWNBSP (Zero-Width) 零宽空格 \uFEFF
        - USP
    - LineTerminator
        - LineFeed LF \n
        - CARRIAGE RETURN CR \r
    - Comment
    - Token
        - 代码结构
            - IdentifierName
                - Identifier
                    - 变量名
                    - 属性名
                    - Keywords (关键字)
            - Punctuator (符号)
        - 有效信息
            - Literal (直接量)
                - Undefined
                - Null
                - String
                - ASCLL
                    - 编码
                        - Unicode
                        - UCS U+0000 - U+FFFF
                        - GB
                            - GB2312
                            - GBK(GB13000)
                            - GB18030
                        - ISO-8859
                        - BIG5
                    - Charactor
                    - CodePoint
                    - Encoding
                        - UTF
                    - Grammar
                        - "abc"
                            - 支持任何非双引号和反斜杠的字母
                        - 'abc'
                        - 
                        ```Javascript
                            `abc`
                        ```
                        - 转译
                            - \x
                            - \u
                            - 除了这些 ' " \ b f n r t v 则表示自己
                            ```Javascript
                                "\x10"
                                "\u000A"
                            ```
                - Number
                    - IEEE 754 Double Float
                    - Grammar
                        - DecimaLiteral
                            - 0
                            - 0.
                            - .2
                            - 1e3
                        - BinaryIntegerLiteral (2进制)
                            - 0b111
                        - octuallntegerLiteral (8进制)
                            - 0o10
                        - HexIntergerLiteral (16进制)
                            - 0xFF
                        - 最佳实践
                            - 浮点数比较 精度判断
                            - Number.MAX_SAFE_INTEGER
                - Object
                - Boolean
                    - true
                    - false
                - Symbol

### 关于自身
+ 不会的东西还是太多了，作业做起来都费劲。。。。