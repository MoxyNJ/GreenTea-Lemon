import {
    Component
} from "./framework.js"
import {
    enableGesture
} from "./gesture.js"
import {
    Timeline,
    Animation
} from "./animation.js"
import {
    ease
} from "./ease.js"

export class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    render() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel") 
        for (let record of this.attributes.src) {
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${record}')`; 

            this.root.appendChild(child);
        }
        enableGesture(this.root);
        let timeline = new Timeline;
        timeline.start();

        let children = this.root.children;

        // 鼠标按下拖动时的相对位置。[0, 1, 2, 3] 是有效位置，没有设置截断值。
        let position = 0;
        this.root.addEventListener("start", event => {
            timeline.pause();
        })

        this.root.addEventListener("pan", event => {
            let x = event.clientX - event.startX;
            let current = position - ((x - x % 500) / 500);
            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;
                children[pos].style.transition = "none";
                children[pos].style.transform = `translate(${- pos * 500 + offset * 500 + x % 500}px)`;
            }
        });
        this.root.addEventListener("panEnd", event => {
            let x = event.clientX - event.startX;
            position = position - Math.round(x / 500);
            for (let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
                let pos = position + offset;
                pos = (pos + children.length) % children.length;
                if (offset === 0) {
                    position = pos;
                }
                children[pos].style.transition = "";
                children[pos].style.transform = `translate(${- pos * 500 + offset * 500}px)`;
            }
        });
        //自动播放功能
        setInterval(() => {
            let children = this.root.children;
            let nextIndex = (position + 1) % children.length; 

            let current = children[position];
            let next = children[nextIndex];

            next.style.transition = "none";    
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

            timeline.add(new Animation(current.style, "transform", 
                - position * 500, - 500 - position * 500, 
                500, 0, ease, v => `translateX(${v}px)`
            ));
            timeline.add(new Animation(next.style, "transform", 
                500 - nextIndex * 500, - nextIndex * 500,
                500, 0, ease, v => `translateX(${v}px)`
            ));
            position = nextIndex;
        }, 3000);


        // 鼠标拖动功能
        // this.root.addEventListener("mousedown", event => {
        //     let children = this.root.children;
        //     // 鼠标的初始位置。只看x即可，y不用考虑。
        //     let startX = event.clientX;

        //     let move = event => {
        //         // 鼠标移动的距离。
        //         let x = event.clientX - startX;

        //         // 找出当前位置的图片
        //         let current = position;
        //         // let current = position - ((x - x % 500) / 500); // 好像 current 和 position 作用相同。                // 把当前位置的图片，前一个和后一个图片，都放到正确的位置。
        //         for(let offset of [-1,0,1]) {
        //             let pos = current + offset;
        //             pos = (pos + children.length) % children.length;
        //             children[pos].style.transition = "none";
        //             children[pos].style.transform = `translate(${- pos * 500 + offset * 500 + x % 500}px)`;
        //         }
        //     }

        //     let up = event => {
        //         let x = event.clientX - startX;

        //         // 如果拖够了一半的位置，就判断为拖到下一张图片；否则就是上一张图片。
        //         // round取近似值。
        //         position = position - Math.round( x / 500);
        //         // console.log(`position=${position}, round=${Math.round(x / 500)}`);
        //         for(let offset of [0, - Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
        //             let pos = position + offset;
        //             pos = (pos + children.length) % children.length;
        //             if (offset === 0) {
        //                 position = pos;
        //                 }
        //             children[pos].style.transition = "";
        //             children[pos].style.transform = `translate(${- pos * 500 + offset * 500}px)`;
        //         }
        //         document.removeEventListener("mousemove", move);
        //         document.removeEventListener("mouseup", up);
        //     }

        //     document.addEventListener("mousemove", move); 
        //     document.addEventListener("mouseup", up); 
        // }); 

        // 自动播放功能
        // let currentIndex = 0;
        // setInterval(() => {
        //     let children = this.root.children;
        //     let nextIndex = (currentIndex + 1) % children.length; 

        //     let current = children[currentIndex];
        //     let next = children[nextIndex];

        //     next.style.transition = "none";    // 做这个移动的时候，不希望有动画，要立刻执行。
        //     next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

        //     // why use setTimeout? 
        //     setTimeout(() => {
        //         next.style.transition = "";        // 取消“none”的限制，恢复css原本的控制权。
        //         current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
        //         next.style.transform = `translateX(${- nextIndex * 100}%)`;

        //         currentIndex = nextIndex;
        //     }, 16);
        // }, 3000);

        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}