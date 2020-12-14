import {Component,STATE, ATTRIBUTE} from "./framework.js"
import {enableGesture} from "./gesture.js"
import {Timeline, Animation} from "./animation.js"
import {ease} from "./ease.js"

export {STATE, ATTRIBUTE} from "./framework.js"

export class Carousel extends Component {
    constructor() {
        super();
    }

    render() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel") 
        for (let record of this[ATTRIBUTE].src) {
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${record}')`; 

            this.root.appendChild(child);
        }
        enableGesture(this.root);
        let timeline = new Timeline;
        timeline.start();

        let handler = null;
        
        let children = this.root.children;

        this[STATE].position = 0

        let t = 0;
        let ax = 0;

        this.root.addEventListener("start", event => {
            timeline.pause();
            clearInterval(handler);
            let progress = (Date.now() - t) / 500;
            ax = ease(progress) * 500 - 500;
        })

        this.root.addEventListener("pan", event => {
            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - ((x - x % 500) / 500);
            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;
                children[pos].style.transition = "none";
                children[pos].style.transform = `translate(${- pos * 500 + offset * 500 + x % 500}px)`;
            }
        });
        this.root.addEventListener("end", event => {
            
            timeline.reset();
            timeline.start();
            // 3秒钟后，重启自动播放
            handler = setInterval(nextPicture, 3000);

            if(event.isFlick) {
                if(event.velocity < 0) {
                    direction = Math.ceil((x % 500) / 500);
                } else {
                    direction = Math.floor((x % 500) / 500);
                }
            }

            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - ((x - x % 500) / 500);

            // [-1. 0. 1] 代表是哪个方向的图片
            let direction = Math.round((x % 500) / 500);

            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                // 负数变正数
                pos = (pos % children.length + children.length) % children.length;

                children[pos].style.transition = "none";
                timeline.add(new Animation(children[pos].style, "transform", 
                    - pos * 500 + offset * 500 + x % 500, 
                    - pos * 500 + offset * 500 + direction * 500, 
                    500, 0, ease, v => `translateX(${v}px)`));
            }

            this[STATE].position = this[STATE].position - ((x - x % 500) / 500) - direction;
            // 负数变正数
            this[STATE].position = (this[STATE].position % children.length + children.length) % children.length;
            
            this.triggerEvent("Change", {position: this[STATE].position});
        });
        
        //自动播放功能
        let nextPicture = () => {
            let children = this.root.children;
            let nextIndex = (this[STATE].position + 1) % children.length; 

            let current = children[this[STATE].position];
            let next = children[nextIndex];

            // 图片切换的动画，添加到timeline中。
            t = Date.now();

            timeline.add(new Animation(current.style, "transform", 
                - this[STATE].position * 500, - 500 - this[STATE].position * 500, 
                500, 0, ease, v => `translateX(${v}px)`
            ));
            timeline.add(new Animation(next.style, "transform", 
                500 - nextIndex * 500, - nextIndex * 500,
                500, 0, ease, v => `translateX(${v}px)`
            ));

            this[STATE].position = nextIndex;
            this.triggerEvent("Change", {position: this[STATE].position});
        }
        
        handler = setInterval(nextPicture, 3000);

        return this.root;
    }
}