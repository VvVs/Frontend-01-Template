import { createElement, Text, Wrapper } from "./createElement";
import { Timeline, Animation } from "./animation";
import { ease } from "./cubicBezier";
import enableGesture from "./gesture";

import css from "./carousel.css";
console.log(css);

// let style = document.createElement('style');
// style.innerHTML = css[0][1];
// document.documentElement.appendChild(style);

export class Carousel {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name, value) { //attribute
        // this.attributes.set(name, value);
        this[name] = value;
    }

    appendChild(child) {
        this.children.push(child);
    }

    render() {
        let timeline = new Timeline();
        // window.xtime = timeline;
        timeline.start();

        let position = 0;

        let nextPicStopHandler = null;

        let children = this.data.map((url, currentPosition) => {
            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
            let nextPosition = (currentPosition + 1) % this.data.length;
            // console.log(lastPosition, currentPosition, nextPosition);
            let offset = 0;

            let onStart = () => {
                timeline.pause();
                clearTimeout(nextPicStopHandler);

                let currentElement = children[currentPosition];

                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px/)[1]);
                offset = currentTransformValue + 500 * currentPosition;
            }

            let onPan = event => {
                let currentElement = children[currentPosition];
                let lastElement = children[lastPosition];
                let nextElement = children[nextPosition];

                let dx = event.clientX - event.startX;

                // console.log(currentElement.style.transform);
                let currentTransformValue = -500 * currentPosition + offset + dx;
                let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
                let nextTransformValue = 500 - 500 * nextPosition + offset + dx;

                lastElement.style.transform = `translateX(${lastTransformValue}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue}px)`;

                console.log(offset);
            }

            let onPanend = event => {
                let direction = 0;
                let dx = event.clientX - event.startX;

                console.log("flick", event.isFlick);

                if (dx + offset > 250 || dx > 0 && event.isFlick) {
                    direction = 1;
                } else if (dx + offset < -250 || dx < 0 && event.isFlick) {
                    direction = -1;
                }

                timeline.reset();
                timeline.start();

                console.log(timeline);

                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let lastAnimation = new Animation(lastElement.style, 'transform', 
                    -500 - 500 * lastPosition + offset + dx, -500 - 500 * lastPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
                let currentAnimation = new Animation(currentElement.style, 'transform', 
                    -500 * currentPosition + offset + dx, -500 * currentPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
                let nextAnimation = new Animation(nextElement.style, 'transform', 
                    500 - 500 * nextPosition + offset + dx, 500 - 500 * nextPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);

                timeline.add(lastAnimation);
                timeline.add(currentAnimation);
                timeline.add(nextAnimation);

                position = (position - direction + this.data.length) % this.data.length;

                nextPicStopHandler = setTimeout(nextPic, 3000);
            }

            // console.log(i);
            let element = <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true} />;
            element.style.transform = "translateX(0px)";
            element.addEventListener('dragstart', event => event.preventDefault());
            return element;
        });
        let root = <div class="carousel">
            {children}
        </div>

        let nextPic = () => {
            let nextPostion = (position + 1) % this.data.length;
            let currentNode = children[position];
            let nextNode = children[nextPostion];

            let currentAniamtion = new Animation(currentNode.style, "transform", -100 * position,
                -100 - 100 * position, 500, 0, ease, v => `translateX(${5 * v}px)`);

            let nextAnimation = new Animation(nextNode.style, "transform", 100 - 100 * nextPostion,
                -100 * nextPostion, 500, 0, ease, v => `translateX(${5 * v}px)`);

            timeline.add(currentAniamtion);
            timeline.add(nextAnimation);

            position = nextPostion;

            // currentNode.style.transition = 'ease 0s';
            // nextNode.style.transition = 'ease 0s';

            // 起始位置
            // currentNode.style.transform = `translateX(${-100 * position}%)`;
            // nextNode.style.transform = `translateX(${100 - 100 * nextPostion}%)`;

            // setTimeout(() => {
            // currentNode.style.transition = 'ease 0.5s';
            // nextNode.style.transition = 'ease 0.5s';

            // 终止位置
            // currentNode.style.transform = `translateX(${- 100 - 100 * position}%)`;
            // nextNode.style.transform = `translateX(${-100 * nextPostion}%)`;

            // position = nextPostion;
            // }, 16);

            // window.stophandler = setTimeout(nextPic, 3000);
            nextPicStopHandler = setTimeout(nextPic, 3000);
        }

        nextPicStopHandler = setTimeout(nextPic, 3000);

        return root;
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }
}