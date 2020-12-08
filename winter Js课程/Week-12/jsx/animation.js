
// 定义为 symbol 常量，禁止外部调用，变成私有变量。
const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start-time");

export class Timeline {
    constructor(){
        // 动画队列。
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
    }

    start(){
        let startTime = Date.now();
        this[TICK] = () => {
            let now = Date.now();
            for(let animation of this[ANIMATIONS]) {
                let t;

                if(this[START_TIME].get(animation) < startTime ) 
                    t = now - startTime;
                else
                    t = now - this[START_TIME].get(animation);

                if(animation.duration < t) {
                    this[ANIMATIONS].delete(animation);
                    t = animation.duration;
                }
                animation.receive(t);
            }
            requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }


    pause(){

    }
    resume(){

    }

    reset(){

    }
    add(animation, startTime){
        if(arguments.length < 2){
            // 支持手动添加时间，如果不手动添加。赋默认值Date.now()。
            // 此处的startTime表示该动画的开始时间。
            startTime = Date.now();
        }
        this[ANIMATIONS].add(animation);
        this[START_TIME].set(animation, startTime);
    }
}

// 属性动画，把一对象的属性值，从A变成B。
export class Animation {
    // 参数：目标对象，属性值，初始值，末尾值，持续时间，开始时间，差值函数（可选）。
    constructor(object, property, startValue, endValue, duration, delay, timingFunction){
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction;
    }
    // time是虚拟时间，由timeLine构建的，表示该动画已经执行的时间
    // 动画已经执行的时间 + 动画尚未执行的时间 = 动画时间 ===> time + 尚未执行的时间 == duration。
    receive(time){
        let range = this.endValue - this.startValue;
        // 均匀变化：（范围✖️虚拟时间）/ 持续时间
        this.object[this.property] = this.startValue + range * time / this.duration;
    }
}