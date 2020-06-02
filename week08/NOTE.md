# CSS
- 简单选择器
    - *
    - .
    - #id
- 复合选择器
    - <简单选择器><简单选择器><简单选择器>
    - * 或者 div必须写前面
- 复杂选择器
    - <复合选择器> "<space>" <复合选择器>
    - <复合选择器> ">" <复合选择器>
    - <复合选择器> "~" <复合选择器>
    - <复合选择器> "+" <复合选择器>
    - <复合选择器> "||" <复合选择器>
- 选择器列表
    - 逗号分隔选择器结合的列表

- 选择器优先级练习 [选择器优先级计算]('https://drafts.csswg.org/selectors-3/#specificity')
    - [inline id class 标签]
    - div#a.b .c[id=x] (0131) 
    - #a:not(#b) (0200) 
    - *.a (0 0 1 0) 
    - div.a (0 0 1 1)
- 伪类
    - 链接
        - :any-
        - :visited
        - :hover
        - :link
        - :active
        - :target
    - 树结构
        - :empty
        - :nth-child()
        - :nth-last-child()
        - :first-child :last-child :only-child-
    - 逻辑
        - :not伪类
        - :where :has

- 伪元素
    - ::before
    - ::after
    ```HTML
        <div>
            <::before/>
            content
            <::after/>
        </div>
    ```
    - ::first-letter
        - font系列
        - color系列
        - backgorund系列
        - word-spacing
        - letter-spacing
        - text-decoration
        - text-transform
        - line-height
        - float
        - vertical-align
        - 盒模型 margin padding border
    - ::fitst-line
    ```HTML
        <::first-line> content content  </::first-line>
        content content 
        content content 
    ```
        - font系列
        - color系列
        - backgorund系列
        - word-spacing
        - letter-spacing
        - text-decoration
        - text-transform
        - line-height

## 排版
-   源代码| 语义| 表现
    -|-|-
    标签 | 元素 |  盒
    Tag | Element | Box

- HTML代码中可以书写开始标签，结束标签，和自封闭标签。
- 一对起止标签标示一个元素
- DOM树中存储的是元素和其他类型的节点(Node)
- CSS选择器选中的是元素
- CSS选择器选中的元素，在排版时可能产生多个盒
- 排版和渲染的基本单位是盒

- 盒
    - 盒模型
        - margin
        - border
        - padding
        - content

        - 真实宽度
            - 主轴是横向
                - width = content + padding-left + padding-right + border-right + border-left + margin-left + margin-right
        
            - box-sizing
                - content-box
                    - content-box = content
                    - border-box = padding + border + content
    
- 正常流 normal flow
    - 思考
        - 我们是如何写字的
            - 从左到右书写
            - 同一行写的文字都是对齐的
            - 一行写满了 就换到下一行
    - 正常流排版
        - 收集盒进行
        - 计算盒在行中的排布
        - 计算行的排布
    
        - IFC (inline-formating-context)
            - 如果一个inline-box中没有文字 基线在底部
            - 如果一个inline-box中有文字 基线在文字下缘
            ```HTML
                <div style="font-size: 50px; line-height: 100px; background-color: pink;">
                    <div style="vertical-align: baseline; overflow: visible; display: inline-block; width: 1px; height: 1px;">
                        <div style="width: 1000px; height: 1px; background: red;"></div>
                    </div>
                    Hello
                    <div style="line-height: 70px; vertical-align: baseline; width: 100px; height: 100px; background: aqua; display: inline-block;"></div>
                </div>
            ```
            - top 和 bottom 不遵循line-height规则 始终是撑高之后的top和bottom
            - vertical-align
                - baseline
                - top
                - bottom
                - middle™
                - text-top
                - text-bottom

                - inline-block只建议使用
                    - top
                    - bottom
                    - middle
        - BFC (block-formating-context)
            - 纵向排版的块级盒子
            - 只会发生在BFC中边距折叠 （margin折叠）

- float与clear