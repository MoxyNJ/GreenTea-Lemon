/*
 * @Description: 全局Js
 * @Date: 2020-09-12 17:42:34
 */
// 确保在文档完全加载后，运行Js函数
function addLoadEvent(func) {
    let oldonload = window.onload;
    if (typeof window.onload != "function")
        window.onload = func;
    else {
        window.onload = () => {
            oldonload();
            func();
        }
    }
}

// 与insertBefore对应，在目标元素的前面添加元素
function insertAfter(newElement, targetElement) {
    let parent = targetElement.parentNode;
    if (parent.lastChild == targetElement)
        parent.appendChild(newElement);
    else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

// 给元素额外添加一个Class名
function addClass(element, value) {
    if (!element.className)
        element.className = value;
    else
        element.className = element.className + " " + value;
}

// 高亮导航页选项块。高亮的选项块为了显示当前所处的网页/
// 如：当前在主页，则home块会高亮。
// 同时，利用这个函数，给特定页面的body添加id属性，然后使不通的网页，可以显示不同的背景图。
// 如：当前在主页，则body id="home"，背景图是主页特定的。
function highlightPage() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    let headers = document.getElementsByTagName('header');
    if (headers.hength === 0) return false;
    let navs = headers[0].getElementsByTagName('nav');
    if (navs.length === 0) return false;

    let links = navs[0].getElementsByTagName('a');
    let linkUrl;
    let pageUrl = window.location.href;
    for (let i = 0; i < links.length; i++) {
        linkUrl = links[i].getAttribute('href');
        if (pageUrl.indexOf(linkUrl) != -1) {
            links[i].className = "here";
            let linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id", linktext);
        }
    }
}

// 为主页提供一个banner轮播图
function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    let elem = ducument.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    let xpos = parseInt(elem.style.left);
    let ypos = parseInt(elem.style.top);
    if(xpos < final_x) {
        let dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    if(xpos > final_y) {
        let dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if(ypos < final_y) {
        let dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    }
    if(ypos > final_y) {
        let dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    let repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat, interval);

}



// 执行区域
addLoadEvent(highlightPage);