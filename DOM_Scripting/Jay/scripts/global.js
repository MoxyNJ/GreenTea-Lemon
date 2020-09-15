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

