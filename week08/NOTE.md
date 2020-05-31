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

- 选择器优先级练习
    - [inline id class 标签]
    - div#a.b .c[id=x] (0131) 
    - #a:not(#b) (0200) 
    - *.a (0 0 1 0) 
    - div.a (0 0 11)
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