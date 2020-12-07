
// 定义为 symbol 常量，禁止外部调用，变成私有变量。
const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");

export class Timeline {
    constructor(){
        // 动画队列。
        this[ANIMATIONS] = new Set();
    }

    start(){
        let startTime = Date.now();
        this[TICK] = () => {
            let t = Date.now() - startTime;
            for(let animation of this[ANIMATIONS]) {
                let t0 = t;
                if(animation.duration < t) {
                    this[ANIMATIONS].delete(animation);
                    t0 = animation.duration;
                }
                animation.receive(t0);
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
    add(animation){
        this[ANIMATIONS].add(animation);
    }
}

// 属性动画，把一对象的属性值，从A变成B。
export class Animation {
    // 参数：目标对象，属性值，初始值，末尾值，持续时间，差值函数（可选）。
    constructor(object, property, startValue, endValue, duration, timingFunction){
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
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