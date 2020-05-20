# toyBrowser
## 步骤
    - URL                HTTP
    - HTML               parse
    - DOM                css computing
    - DOM with CSS       latout
    - DOM with position  render
    - Bitmap

- HTML Parse
    1. 拆分文件
        - 总结
            - 为了方便管理，我们把parser单独拆到文件中
            - parser接收HTML文本作为参数，返回一颗DOM树
    2. 创建状态机
        - 查看web标准 [Tokenization]("https://html.spec.whatwg.org/multipage/parsing.html#tokenization")
        - 总结
            - 我们用FSM来实现HTML的分析
            - 在HTML标准中，已经规定了HTML的状态
            - Toy-Browser只挑选其中的一部分状态，完成一个最简版本

    3. 解析标签
        - 总结
            - 主要标签有：开始标签，结束标签，自封闭标签
            - 在这一步暂时忽略属性
    4. 创建元素
        - 总结
            - 在状态机中，除了状态迁移，我们还要会加入业务逻辑
            - 我们在标签结束状态提交标签token
    5. 处理属性
    6. 构建dom树
        - 总结
            - 从标签构建dom树的基本技巧是使用栈
            - 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
            - 自封闭节点可视为入栈后立刻出栈
            - 任何元素的父元素是它入栈前的栈顶
    7. 处理文本节点