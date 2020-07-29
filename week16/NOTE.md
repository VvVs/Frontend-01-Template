# 手势
- 手势的几种事件
    - tap 点击
    - pan 拖拽
    - flick 快速滑动并离开
    - press 长期按在屏幕上再分开

- 关于touchevent
    - 最重要的是changedTouches
    - 不需要在element上监听 在某一个上起始就在某一个上面触发 （天然的目标锁定） 

- pointerEven
    - 兼容性考虑
        - mouseEvent
        - touchEvent

- 判断是否处于触摸屏模式
    - document.ontouchstart !== null

- 自定义事件
    - [Event()]("https://developer.mozilla.org/en-US/docs/Web/API/Event/Event")

- matrix
    - 四要素rotate scale translate skew 加入skew不会再反解出来原值。