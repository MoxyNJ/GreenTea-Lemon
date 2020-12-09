
// 取HTML元素
let element = document.documentElement;

// mouse事件
element.addEventListener("mousedown", event => {
    start(event);
    let mousemove = event => {
        move(event);
        };

    let mouseup = event => {
        end(event);
        element.removeEventListener("mousemove", mousemove);
        element.removeEventListener("mouseup", mouseup);
    };

    element.addEventListener("mousemove", mousemove);
    element.addEventListener("mouseup", mouseup);
});

//触屏事件
element.addEventListener("touchstart", event => {
    for(let touch of event.changedTouches) {
        start(touch);
    }
});

element.addEventListener("touchmove", event => {
    for(let touch of event.changedTouches) {
        move(touch);
    }
});
element.addEventListener("touchend", event => {
    for(let touch of event.changedTouches) {
        end(touch);
    }
});
element.addEventListener("touchcancel", event => {
    for (const touch of event.changedTouches) {
        cancel(touch);
    }
})

let handler;
let startX, startY;
let isPan = false, isTap = true, isPress = false;

// 触点监听：
let start = (point) => {
    // console.log("start", point.clientX, point.clientY);
    startX = point.clientX, startY = point.clientY;

    isTap = true;
    isPan = false;
    isPress = false;

    // 监控：0.5s事件
    handler = setTimeout(() => {
        isTap = false;
        isPan = false;
        isPress = true;
        handler = null;    // 如果执行了这里，表明 handler被执行，置为null，相当于自我删除。是为防止该setTimeout被多次clear。
        console.log("press");
    }, 500)
}

let move = (point) => {
    // 监控：移动10px
    let dx = point.clientX - startX, dy = point.clientY - startY;
    
    if (!isPan && dx ** 2 + dy ** 2 > 100) {
        isTap = false;
        isPan = true;
        isPress = false;
        console.log("panStart");
        clearTimeout(handler);
    }
    if(isPan) {
        console.log(dx,dy);
        console.log("pan");
    }
    // console.log("move", point.clientX, point.clientY);
}

let end = (point) => {
    if(isTap) {
        console.log("tap");
        clearTimeout(handler);
    }
    if(isPan) {
        console.log("panend");
    }
    if(isPress) {
        console.log("pressend");
    }
     console.log("end", point.clientX, point.clientY);
}

let cancel = (point) => {
    clearTimeout(handler);
    console.log("cancel", point.clientX, point.clientY);
}
