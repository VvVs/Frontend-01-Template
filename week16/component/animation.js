export class Timeline {
    constructor() {
        this.animations = new Set();
        this.finishedAnimations = new Set();
        this.requestID = null;
        this.addTime = new Map();
        this.state = 'inited';

        this.tick = () => { // 每帧实现的函数
            // console.log("tick");
            let t = Date.now() - this.startTime;
            // let animations = this.animations.filter(animation => !animation.finished);

            for (let animation of this.animations) {
                let { object, property, template, start, end, duration, timingfunction, delay } = animation;

                let addTime = this.addTime.get(animation);

                if (t < delay + addTime) {
                    continue;
                }

                let progression = timingfunction((t - delay - addTime) / duration); // 0 - 1之间的数

                if (t > duration + delay + addTime) {
                    progression = 1;
                    this.animations.delete(animation);
                    this.finishedAnimations.add(animation);
                    // animation.finished = true;
                }

                let value = animation.valueFromProgression(progression);
                // console.log(value);
                object[property] = template(value);
            }

            // if (true || animations.length)
            if (this.animations.size)
                this.requestID = requestAnimationFrame(this.tick);
            else {
                this.requestID = null;
            }
        }
    }

    start() {
        if (this.state != 'inited')
            return;
        this.state = 'playing';
        this.startTime = Date.now();
        this.tick();
    }

    resume() {
        if (this.state != 'paused')
            return;
        this.state = 'playing';
        this.startTime += Date.now() - this.pauseTime;
        this.tick();
    }

    pause() {
        if (this.state != 'playing')
            return;
        this.state = 'paused';
        this.pauseTime = Date.now();
        if (this.requestID !== null) {
            cancelAnimationFrame(this.requestID);
            this.requestID = null;
        }
    }

    reset() {
        if (this.state == 'playing')
            this.pause();

        this.animations = new Set();
        this.finishedAnimations = new Set();
        this.addTime = new Map();
        this.requestID = null;
        this.state = 'playing';
        this.startTime = Date.now();
        this.pauseTime = null;
        this.state = "inited";
    }

    restart() {
        if (this.state == 'playing')
            this.pause();
        
        for (let animation of this.finishedAnimations) {
            this.animations.add(animation);
        }

        this.finishedAnimations = new Set();
        this.requestID = null;
        this.state = 'playing';
        this.startTime = Date.now();
        this.pauseTime = null;
        this.tick();
    }

    add(animation, addTime) {
        this.animations.add(animation);
        // animation.finished = false;

        if (this.state === "playing" && this.requestID === null)
            this.tick();
        if (this.state == 'playing')
            this.addTime.set(animation, addTime != void 0 ? addTime : Date.now() - this.startTime)
            // animation.addTime = addTime != void 0 ? addTime : Date.now() - this.startTime;
        else
            this.addTime.set(animation, addTime != void 0 ? addTime : 0);
    }
}

export class Animation {
    constructor(object, property, start, end, duration, delay, timingfunction, template) {
        this.object = object;
        this.property = property;
        this.template = template;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay;
        this.timingfunction = timingfunction;
    }

    valueFromProgression(progression) {
        return this.start + progression * (this.end - this.start);
    }
}

export class ColorAnimation {
    constructor(object, property, start, end, duration, delay, timingfunction, template) {
        this.object = object;
        this.property = property;
        this.template = template || (v => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay;
        this.timingfunction = timingfunction;
    }

    valueFromProgression(progression) {
        return {
            r: this.start.r + progression * (this.end.r - this.start.r),
            g: this.start.g + progression * (this.end.g - this.start.g),
            b: this.start.b + progression * (this.end.b - this.start.b),
            a: this.start.a + progression * (this.end.a - this.start.a),
        }
    }
}

/**
 * let animation = new Animation(object, property, start, end, duration, delay, timingfunction);
 * let animation2 = new Animation(object, property, start, end, duration, delay, timingfunction);
 *
 * let timeline = new Timeline();
 *
 * timeline.add(animation);
 * timeline.add(animation2);
 *
 * timeline.start();
 * timeline.stop();
 * timeline.pause();
 * timeline.resume();
 *
 * setTimeout
 * setInterval
 * RequeseAnimationFrame
 */