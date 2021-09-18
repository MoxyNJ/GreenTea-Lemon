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
  if (xpos < final_x) {
    let dist = Math.ceil((final_x - xpos) / 10);
    xpos = xpos + dist;
  }
  if (xpos > final_y) {
    let dist = Math.ceil((xpos - final_x) / 10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    let dist = Math.ceil((final_y - ypos) / 10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    let dist = Math.ceil((ypos - final_y) / 10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  let repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
  elem.movement = setTimeout(repeat, interval);
}

// 幻灯片的展示,位置放在intro段落的后面。
function prepareSlideshow() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("intro")) return false;
  let intro = document.getElementById("intro");
  let slideshow = document.createElement("div");
  slideshow.setAttribute("id", "slideshow");
  let frame = document.createElement("img");
  frame.setAttribute("src", "images/frame.gif");
  frame.setAttribute("alt", "");
  frame.setAttribute("id", "frame");
  slideshow.appendChild(frame);
  let preview = document.createElement("img");
  preview.setAttribute("src", "images/slideshow.gif");
  preview.setAttribute("alt", "a glimpse of what awaits you");
  preview.setAttribute("id", "preview");
  slideshow.appendChild(preview);
  insertAfter(slideshow, intro);
  let links = document.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    links[i].onmouseover = function () {
      let destination = this.getAttribute("href");
      if (destination.indexOf("index.html") != -1) {
        moveElement("preview", 0, 0, 5);
      }
      if (destination.indexOf("about.html") != -1) {
        moveElement("preview", -150, 0, 5);
      }
      if (destination.indexOf("photos.html") != -1) {
        moveElement("preview", -300, 0, 5);
      }
      if (destination.indexOf("live.html") != -1) {
        moveElement("preview", -450, 0, 5);
      }
      if (destination.indexOf("contact.html") != -1) {
        moveElement("preview", -600, 0, 5);
      }
    }
  }
}

// 9月23日，添加About函数
function showSection(id) {
  let sections = document.getElementsByTagName("section");
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getAttribute("id") != id) {
      sections[i].style.display = "none";
    } else {
      sections[i].style.display = "block";
    }
  }
}

function prepareInternalnav() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  le t articles = document.getElementsByTagName("article");
  if (articles.length == 0) return false;
  let navs = articles[0].getElementsByTagName("nav");
  if (navs.length == 0) return false;
  let nav = navs[0];
  let links = nav.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    let sectionId = links[i].getAttribute("href").split("#")[1];
    if (!document.getElementById(sectionId)) continue;
    document.getElementById(sectionId).style.display = "none";
    links[i].destination = sectionId;
    links[i].onclick = function () {
      showSection(this.destination);
      return false;
    }
  }
}

// 执行区域
addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);