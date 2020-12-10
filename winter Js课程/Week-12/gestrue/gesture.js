
// 取HTML元素
let element = document.documentElement;

let isListeningMouse = false;

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

        if(event.buttons === 0) {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
            isListeningMouse = false;
        }
    };

    if(!isListeningMouse) {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        isListeningMouse = true;
    }
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
    context.points = [{
        t: Date.now(),
        x: point.clientX,
        y: point.clientY,
    }];

    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.isFlick = false;

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
        // console.log(dx,dy);
        // console.log("pan");
    }

    context.points = context.points.filter(point => Date.now() - point.t < 500);
    context.points.push({
        t: Date.now(),
        x: point.clientX,
        y: point.clientY,
    });
    // console.log("move", point.clientX, point.clientY);
}

let end = (point, context) => {
    if(context.isTap) {
        // console.log("tap");
        dispatch("tap", {});
        clearTimeout(context.handler);
    }
    if(context.isPan) {
        // console.log("panend");
        dispatch("pan",{
            clientX: point.clientX,
            clientY: point.clientY,
        });
    }
    if(context.isPress) {
        // console.log("pressend");
        dispatch("press",{
            clientX: point.clientX,
            clientY: point.clientY,
        });
    }
    
    context.points = context.points.filter(point => Date.now() - point.t < 500);
    let d, v;
    if(!context.points.length) {
        v = 0;
    } else {
        d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + 
            (point.clientY - context.points[0].y) ** 2);
        v = d / (Date.now() - context.points[0].t);
    }

    if (v > 1.5) {
        // console.log("flick");
        context.isFlick = true;
        dispatch("flick",{
            clientX: point.clientX,
            clientY: point.clientY,
        });
    } else {
        context.isFlick = false;
    }

    // console.log(v);
    // console.log("end", point.clientX, point.clientY);
}

let cancel = (point, context) => {
    clearTimeout(context.handler);
    console.log("cancel", point.clientX, point.clientY);
}

function dispatch(type, properties) {
    let event = new Event(type);
    for (let name in properties) {
        event[name] = properties[name];
    }
    element.dispatchEvent(event);
}