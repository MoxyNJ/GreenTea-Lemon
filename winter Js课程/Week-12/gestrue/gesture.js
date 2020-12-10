
// 取HTML元素
let element = document.documentElement;

// mouse事件
element.addEventListener("mousedown", event => {
    
    let context = Object.create(null);
    contexts.set("mouse" + (1 << event.button), context);

    start(event, context);
    let mousemove = event => {
        let button = 1;

        while(button <= event.buttons) {
            if(button & event.buttons) {
                // order of buttons & button property is not same
                let key;
                if (button === 2) 
                    key = 4;
                else if (button === 4) 
                    key = 2;
                else
                    key = button;
                let context = contexts.get("mouse" + key);
                move(event, context);
            }
            button = button << 1;
        }
    };

    let mouseup = event => {
        let context = contexts.get("mouse" + (1 << event.button));
        end(event, context);
        contexts.delete("mouse" + (1 << event.button));
        element.removeEventListener("mousemove", mousemove);
        element.removeEventListener("mouseup", mouseup);
    };

    element.addEventListener("mousemove", mousemove);
    element.addEventListener("mouseup", mouseup);
});

let contexts = new Map();

//触屏事件
element.addEventListener("touchstart", event => {
    for(let touch of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context);
        start(touch, context);
    }
});

element.addEventListener("touchmove", event => {
    for(let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        move(touch, context);
    }
});
element.addEventListener("touchend", event => {
    for(let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        end(touch, context);
        contexts.delete(touch.identifier);
    }
});
element.addEventListener("touchcancel", event => {
    for (const touch of event.changedTouches) {
        cancel(touch, context);
    }
});

// 触点监听：
let start = (point, context) => {
    // console.log("start", point.clientX, point.clientY);
    context.startX = point.clientX, context.startY = point.clientY;

    context.isTap = true;
    context.isPan = false;
    context.isPress = false;

    // 监控：0.5s事件
    context.handler = setTimeout(() => {
        context.isTap = false;
        context.isPan = false;
        context.isPress = true;
        context.handler = null;    // 如果执行了这里，表明 handler被执行，置为null，相当于自我删除。是为防止该setTimeout被多次clear。
        console.log("press");
    }, 500)
}

let move = (point, context) => {
    // 监控：移动10px
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
    
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
        context.isTap = false;
        context.isPan = true;
        context.isPress = false;
        console.log("panStart");
        clearTimeout(context.handler);
    }
    if(context.isPan) {
        console.log(dx,dy);
        console.log("pan");
    }
    // console.log("move", point.clientX, point.clientY);
}

let end = (point, context) => {
    if(context.isTap) {
        console.log("tap");
        clearTimeout(context.handler);
    }
    if(context.isPan) {
        console.log("panend");
    }
    if(context.isPress) {
        console.log("pressend");
    }
    console.log("end", point.clientX, point.clientY);
    console.log(point);
}

let cancel = (point, context) => {
    clearTimeout(context.handler);
    console.log("cancel", point.clientX, point.clientY);
}
