# 浏览器
- 过程
    - 浏览器首先使用http协议或者https协议，向服务端请求页面。
    - 把请求回来的html代码经过解析 构建成dom树
    - 计算DOM树上的CSS属性
    - 最后根据CSS属性对元素逐个进行渲染，得到内存中的位图
    - 一个可以选的步骤是对位图进行合成，这回极大地增加后续绘制的速度
    - 合成之后，再绘制到页面上。
- 值得一提的是
    - 我们从http请求回来开始，这个过程并非一般想象中的一步做完再做下一步。而是一条流水线，从HTTP请求回来就产生了流式的数据。后袖的DOM树构建，css计算，渲染，合成，绘制，都是尽可能地处理前一步的产出，不需要等上一步骤完全结束就开始了上一步的输出。所以在浏览网页的时候才会看到逐步出现的页面。
- HTTP/TCP
    - TCP 
        - 三次握手四次挥手
    - HTTP 是纯粹的文本协议，它是规定了使用 TCP 协议来传输文本格式的一个应用层协议
        - HTTP协议
            - HTTP1.1
                - [HTTP1.1](https://tools.ietf.org/html/rfc2616)
                - [HTTP1.1](https://tools.ietf.org/html/rfc7234)
        - HTTP格式
            - Request
                - 第一行被称为 request line[^1]
                    - method    [方法]
                    - path      [路径] 
                    - version   [协议和版本]
                - head 请求头
                    - 紧随着request line之后
                    - 由若干行组成，每行都是用冒号分隔的名称和值
                - body 请求体
                    - 在head之后, 由两个换行符[^2]分隔
                    - 可能包含文件或者表单数据
            - Response
                - 第一行被称为 response line[^3]
                    - version       [协议和版本]
                    - status code   [状态码]
                    - status text   [状态文本]
                - head 响应头
                    - 紧随着response line之后
                    - 由若干行组成，每行都是用冒号分隔的名称和值
                - body  响应体
                    - 在head之后, 由两个换行符[^3]分隔
                    - HTML代码
        - HTTP Method
            - [HTTP Method]('https://tools.ietf.org/html/rfc2616#section-5.1.1')
            - 8种请求方法
                - OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT
        - HTTP Status code / Status text
            - [status-code/status-text]('https://tools.ietf.org/html/rfc2616#section-6.1.1')
            - 常见状态码
                - 1xx：临时回应，表示客户端请继续。
                - 2xx：请求成功。
                - 3xx: 表示请求的目标有变化，希望客户端进一步处理。
                - 4xx：客户端请求错误。
                - 5xx：服务端请求错误。

                Status-Code | Status-Text 
                -           | -
                200         | OK
                301         | Moved Permanently
                302         | Found
                304         | Not Modified
                400         | Bad Request
                401         | Unauthorized
                403         | Forbidden
                404         | Not Found
                405         | Method Not Allowed
                500         | Internal Server Error
                502         | Bad Gateway
                503         | Service Unavailable

        - HTTP HEAD
            - [Request Header]('https://tools.ietf.org/html/rfc2616#section-5.3')
                
                Request Header      | 规定
                -                   |        -
                Accept              | 浏览器接收的格式
                Accept-Encoding     | 浏览器接收的编码方式
                Accept-Lanuage      | 浏览器接收的语言，用于服务端多语言判断
                Cache-Control       | 控制缓存的时效性
                Connection          | 连接方式，如果是Keep-Alive 且服务端支持，则会复用链接
                Host                | HTTP访问使用的域名
                If-Modified-Since   | 上次访问时的更改时间，如果服务端认为此时间后自己没有更新，则会给出304响应
                If-None-Match       | 次访问时使用的E-Tag 通常是页面的信息摘要，这个比更改时间更准确一些
                User-Agent          | 客户端标识
                Cookie              | 客户端存储的cookie字符串
            
            - [Response Header]('https://tools.ietf.org/html/rfc2616#section-6.2')
                
                Response Header     | 规定
                -                   | -
                Cache-Control       | 缓存控制，用于通知各级缓存保存的时间，例如max-age=0，表示不要缓存
                Connection          | 连接类型 Keep-Alive 表示复用连接
                Content-Encoding    | 内容编码方式，通常是gzip
                Content-Length      | 内容的长度，有利于浏览器判断内容是否已经结束
                Content-Type        | 内容类型 所有请求网页的都是text/html
                Date                | 当前的服务器日期
                ETag                | 页面的信息摘要，用于判断是否需要重新到服务端取回页面
                Expires             | 过期时间, 用于判断是否需要重新到服务端取回页面
                Keep-Alive          | 保持连接不断时需要的一些信息，如timeout=5, max=100
                Last-Modified       | 页面上次修改时间
                Server              | 服务器软件类型
                Set-Cookie          | 设置cookie 可以存在多个
                Via                 | 服务端的请求链路，对一些调试场景至关重要的一个头

        - HTTP Request Body
            - 常见body格式
                - application/json
                - application/x-www-form-urlencoded (表单格式上传)
                - mutipart/form-data (上传文件时)
                - text/xml

        - HTTPS
            - 作用
                1. 确定请求的目标服务端身份
                2. 保证传输的数据不会被网络中间节点窃听或者篡改
            - 标准
                - [https]('https://tools.ietf.org/html/rfc2818')

        - HTTP2
            - 标准
                - [HTTP2]('https://tools.ietf.org/html/rfc7540')


[^1]: 示例：GET / HTTP/1.1
[^2]: \r\n
[^3]: 示例：HTTP/1.1 200 OK
