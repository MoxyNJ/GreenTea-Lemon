import {Component, createElement} from "./framework.js"

class Carousel extends Component {
    constructor(){
        super();
        this.attributes = Object.create(null);
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    render(){
        // console.log(this.attributes.src);    //  打印一下，看看地址有没有被成功的传递进来
        this.root = document.createElement("div");
        this.root.classList.add("carousel")         // 为这个div添加一个class属性：carousel，为了方便添加CSS属性。
        for(let record of this.attributes.src) {    // 利用let of把照片地址添加到div子元素上 
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${record}')`;    //添加地址到backgroundImage，字符串要转义。
            child.style.display = "none";     // 照片默认是不显示的，轮到谁显示谁。
            
            this.root.appendChild(child);
        }
        return this.root;
    }
    mountTo(parent){
        parent.appendChild(this.render());
    }
}

let d = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];

// document.body.appendChild(a);
let a = <Carousel src={d}/>;
a.mountTo(document.body);