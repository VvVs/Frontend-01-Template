# CSS
- 动画
    - @keyframe
        - animation
        - 属性
            - animation-name 时间曲线
            - animation-duration 动画的时长
            - animation-timing-function 动画的时间曲线
            - animation-delay 动画开始前的延迟
            - animation-iteration-count 动画播放的次数
            - animation-direction 动画的方向
        ```CSS
            @keyframes mykf {
                from {
                    background: red;
                }

                to {
                    background: yellow;
                }
            }

            div {
                animation: mykf 5s infinite;
            }
        ```
   
    - Transtion
        - 属性
            - transtion-property 要变换的属性
            - transtion-duration 变换的时长
            - transtion-timing-function 时间曲线 
            - transtion-delay 延迟

    - [cubic-bezier]('http://cubic-bezier.com')
        - timing-function 
            - x轴 TIME 时间
            - y轴 PROGRESSION 变换属性的百分比
        - 属性
            - ease  位移时推荐使用
            - linear   匀加速匀减速
            - ease-in  缓慢的启动快速出去（退出型动画）
            - ease-out 很高的速度进来逐渐停留到某一个位置
            - ease-in-out

    