# 7 Frame 和 windw

## 7.1 弹窗和 window 的方法

弹窗（popup）就是打开一个给定 URL 的新窗口。大多数浏览器都配置为在新选项卡中打开 URL，而不是一个单独的窗口。

```js
window.open("https://www.xxx.com/")
```

目前，进行OAuth 授权（使用 Google/Facebook/ ...登录），仍要使用弹窗，因为：

1. 弹窗是一个独立的窗口，有自己独立的 JavaScript 环境。因此为了安全起见，常用弹窗方式打开一个不信任的第三方网站。
2. 打开弹窗的代码很容易实现。



### 7.1.1 阻止弹窗

如果弹窗是在用户触发的事件处理程序（如 `onclick`）**之外调用**，大多数浏览器都会**默认阻止**此类弹窗。

```js
window.open('https://javascript.info');		// 弹窗被阻止

button.onclick = () => {					// 弹窗被允许
  window.open('https://javascript.info');
};
```



### 7.1.2 打开弹窗

 `window.open(url, name, params)`

- url：要在新窗口中加载的 URL。
- name：新窗口的名称。每个窗口都有一个 `window.name`，指定哪个窗口用于打开URL网页。
  - 如果已经有 name 名字的窗口，将在该窗口打开给定的 URL；否则会打开一个新窗口。
- params：新窗口的配置字符串。它包括设置，用逗号分隔。参数之间不能有空格，
  - 例如：`width=200,height=100`。

`params` 的设置项：

- 位置:
  - `left/top`（数字）：屏幕上窗口的左上角的坐标。这有一个限制：不能将新窗口置于屏幕外（offscreen）。
  - `width/height`（数字）：新窗口的宽度和高度。宽度/高度的最小值是有限制的，因此不可能创建一个不可见的窗口。
- 窗口功能：
  - `menubar`（yes/no）：显示或隐藏新窗口的浏览器菜单。
  - `toolbar`（yes/no）：显示或隐藏新窗口的浏览器导航栏（后退，前进，重新加载等）。
  - `location`（yes/no）：显示或隐藏新窗口的 URL 字段。Firefox 和 IE 浏览器不允许默认隐藏它。
  - `status`（yes/no）：显示或隐藏状态栏。同样，大多数浏览器都强制显示它。
  - `resizable`（yes/no）：允许禁用新窗口大小调整。不建议使用。
  - `scrollbars`（yes/no）：允许禁用新窗口的滚动条。不建议使用。



### 7.1.3 操纵/关闭弹窗

#### 操作弹窗

`open` 调用会返回对新窗口的引用。它可以用来操纵弹窗的属性，更改位置，甚至更多操作。

- **同源策略**：只有在窗口是同源的时，窗口才能自由访问彼此的内容（`相同的协议://domain:port`）。



#### 关闭弹窗

关闭一个窗口：`win.close()`。

检查一个窗口是否被关闭：`win.closed`。true 则表明已经被关闭



#### 调整弹窗

- `win.moveBy(x,y)`：将窗口相对于当前位置向右移动 `x` 像素，向下移动 `y` 像素。
  - 允许负值（向上/向左移动）。
- `win.moveTo(x,y)`：将窗口移动到屏幕上的坐标 `(x,y)` 处。
- `win.resizeBy(width,height)`：根据给定的相对于当前大小的 `width/height` 调整窗口大小。允许负值。
- `win.resizeTo(width,height)`：将窗口调整为给定的大小。
-  `window.onresize` 事件：当窗口尺寸发生改变，触发该事件。

没有最小化/最大化。无法通过 JavaScript 最小化、最大化个窗口。



#### 滚动窗口

- `win.scrollBy(x,y)`：相对于当前位置，将窗口向右滚动 `x` 像素，并向下滚动 `y` 像素。允许负值。
- `win.scrollTo(x,y)`：将窗口滚动到给定坐标 `(x,y)`。
- `elem.scrollIntoView(top = true)`：滚动窗口，使 `elem` 显示在 `elem.scrollIntoView(false)` 的顶部（默认）或底部。
-  `window.onscroll` 事件：窗口发生滚动时触发。



#### 聚焦/失焦

 `window.focus()` 和 `window.blur()` 方法可以使窗口获得或失去焦点。

在实际中它们被进行了严格地限制，因为在过去，恶意网站滥用这些方法。



## 7.2 跨窗口通信

“同源（Same Origin）”策略限制了窗口（window）和 frame 之间的相互访问。目的是为了提高安全性。



### 7.2.1 同源

如果两个 URL 具有相同的协议，域和端口，则称它们是“同源”的。

以下的几个 URL 都是同源的：

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

但是下面这几个不是：

- `http://**www.**site.com`（另一个域：`www.` 影响）
- `http://**site.org**`（另一个域：`.org` 影响）
- `**https://**site.com`（另一个协议：`https`）
- `http://site.com:**8080**`（另一个端口：`8080`）

“同源”策略规定：

- 如果我们有对另外一个窗口（例如，一个使用 `window.open` 创建的弹窗，或者一个窗口中的 iframe）的引用，并且该窗口是同源的，那么我们就具有对该窗口的全部访问权限。
- 否则，如果该窗口不是同源的，那么我们就无法访问该窗口中的内容：变量，文档，任何东西。
  - 唯一的例外是 `location`：我们可以修改它（进而重定向用户）。但无法读取 `location`（因此，我们无法看到用户当前所处的位置，也就不会泄漏任何信息）。



### 7.2.2 iframe

一个 `<iframe>` 标签承载了一个单独的嵌入的窗口，它具有自己的 `document` 和 `window`。

访问属性：

- `iframe.contentWindow` ：获取 `<iframe>` 中的 window。
- `iframe.contentDocument` ：获取 `<iframe>` 中的 document，
  - 是 `iframe.contentWindow.document` 的简写形式。



当访问嵌入的窗口中的变量时，浏览器会检查 iframe 是否具有相同的源。如果不是，则拒绝访问，仅允许：

- 对 `location` 进行**写入**；
- 通过 `iframe.contentWindow` 获取对内部 window 的引用。



### 7.2.3 子域 - document.domain

根据定义，两个具有不同域的 URL 具有不同的源。

但是，如果窗口的二级域相同，例如 `john.site.com`，`peter.site.com` 和 `site.com`（它们共同的二级域是 `site.com`），可以使浏览器忽略差异，使它们作为“同源”的来对待，进行跨窗口通信。

为了做到这一点，每个这样的窗口都执行下面的代码：

```javascript
document.domain = 'site.com';
```



### 7.2.4 集合 - window.frames

`SomeWindow.frames`：保存了该窗口下的全部 `<iframe>` 的 **window 对象**。

- 通过索引获取：`SomeWindow.frames[0]` ：文档中的第一个 iframe 的 window 对象。
- 通过名称获取：`SomeWindow.frames.iframeName` ：获取 `name="iframeName"` 的 window 对象。

```js
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```



一个 iframe 内可能嵌套了其他的 iframe。相应的 `window` 对象会形成一个层次结构（hierarchy）。

可以通过以下方式获取：

- `SomeWindow.frames` —— “子”窗口的集合（用于嵌套的 iframe）。
- `SomeWindow.parent` —— 对“父”（外部）窗口的引用。
- `SomeWindow.top` —— 对最顶级父窗口的引用。

```js
SomeWindow.frames[0].parent === window; // true
```



### 7.2.5 sandbox - iframe 特性

`sandbox` 特性（attribute）允许在 `<iframe>` 中禁止某些行为，防止执行不被信任的代码。

- 它通过将 iframe 视为非同源的，或者应用其他限制来实现 iframe 的“沙盒化”。



一个空的 `"sandbox"` 特性会施加最严格的限制。用一个以空格分隔的列表，列出要移除的限制。

```html
<iframe sandbox="allow-forms allow-popups">
```

- `allow-same-origin`：默认情况下，`"sandbox"` 会为 iframe 强制实施“不同来源”的策略。
  - 它使浏览器将 `iframe` 视为来自另一个源，即使其 `src` 指向的是同一个网站也是如此。
- `allow-top-navigation`：允许 `iframe` 更改 `parent.location`。
- `allow-forms`：允许在 `iframe` 中提交表单。
- `allow-scripts`：允许在 `iframe` 中运行脚本。
- `allow-popups`：允许在 `iframe` 中使用 `window.open` 打开弹窗。
- 查看 [官方手册](https://developer.mozilla.org/zh/docs/Web/HTML/Element/iframe) 获取更多内容。



### 7.2.6 跨窗口通信

`postMessage` 接口允许两个具有任何源的窗口之间进行通信。

因此，这是解决“同源”策略的方式之一。它允许来自于 `john-smith.com` 的窗口与来自于 `gmail.com` 的窗口进行通信，并交换信息，但前提是它们双方必须均同意并调用相应的 JavaScript 函数。这可以保护用户的安全。



#### postMessage

发送方必须调用窗口的 postMessage 方法。

- 想把消息发送给 `targetWin`，就要调用： `targetWin.postMessage(data, targetOrigin)`。

- data：要发送的数据。
  - 可以是任何对象，数据会被 “结构化序列化算法（structured serialization algorithm）”进行克隆。
  - IE 浏览器只支持字符串，因此需要用 `JSON.stringify` 方法进行处理，以支持该浏览器。

- targetOrigin：指定目标窗口的源，只有目标源窗口发送的信息，才能获得。
  - 这是一种安全措施。
  - 如果我们不希望做这个检查，可以将 `targetOrigin` 设置为 `*`。



#### onmessage

为了接收消息，目标窗口应该在 `message` 事件上有一个处理程序。

- 当 `postMessage` 被调用时触发该事件，并且 `targetOrigin` 检查成功。

调用：`window.addEventListener("message", function(event){ ... };`

- `data`：从 `postMessage` 传递来的数据。
- `origin`：发送方的源，例如 `http://site.com`。
- `source`：对发送方窗口的引用。方便立即用 `source.postMessage(...)` 发送回信息。

要为 `message` 事件分配处理程序，我们应该使用 `addEventListener`。 `window.onmessage` 不起作用。





