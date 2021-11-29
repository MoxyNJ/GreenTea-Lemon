# PartⅠ Ajax

# 1. 综述

## 1.1 Ajax 简介

AJAX 全称为Asynchronous JavaScript And XML，就是异步的 JS 和XML。

通过 AJAX 可以在浏览器中向服务器发送异步请求，最大的优势：**无刷新获取数据**。AJAX 不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式。

## 1.2 XML 简介

XML 可扩展标记语言。
XML 被设计用来传输和存储数据。
XML 和HTML 类似，不同的是HTML 中都是预定义标签，而XML 中没有预定义标签，全都是自定义标签，用来表示一些数据。

```xml
<student>
	<name>孙悟空</name>
	<age>18</age>
	<gender>男</gender>
</student>
```

现在已经被JSON 取代了。

```json
{"name":"孙悟空","age":18,"gender":"男"}
```

## 1.3 AJAX 的特点

优点

1. 可以无需刷新页面而与服务器端进行通信
2. 允许你根据用户事件来更新部分页面内容

缺点

1. 没有浏览历史，不能回退
2. 存在跨域问题(同源)
3. SEO 不友好



# 2. HTTP 请求

### 2.1 不同类型的请求及其作用

1. `GET`: 从服务器端 **读取** 数据（查）
2. `POST`: 向服务器端 **添加** 新数据 （增）
3. `PUT`: **更新** 服务器端已经数据 （改）
4. `DELETE`: **删除** 服务器端数据 （删）



### 2.2 区别 一般http请求 与 ajax请求

ajax请求 是一种特别的 http请求
对服务器端来说, 没有任何区别, 区别在浏览器端
浏览器端发请求: 只有XHR 或fetch 发出的才是ajax 请求, 其它所有的都是非ajax 请求
浏览器端接收到响应
(1) 一般请求: 浏览器一般会直接显示响应体数据, 也就是我们常说的刷新/跳转页面
(2) ajax请求: 浏览器不会对界面进行任何更新操作, 只是调用监视的回调函数并传入响应相关数据



# 3. express

## 3.1 express 基本

![express](Ajax%E7%9B%B8%E5%85%B3/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70-16381543187302.png)

- https://www.expressjs.com.cn/

1. 初始化环境：`npm init --yes` 
2. 安装 express：`npm install express --save`
3. 代码边写好后，启动服务器：`node xxx.js`

服务器基本代码：

```js
// 1. 引入express
const express = require('express');

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 设置响应体
  response.send("Hello Ajax");
});

// 4. 监听端口，启动服务
app.listen(8000, () => {
  console.log("服务已经启动, 8000 端口监听中...");
 })
```



## 3.2 nodemon 基本

- https://www.npmjs.com/package/nodemon

一旦服务器的文件内容有修改，自动重新启动服务：

![nodemon](Ajax%E7%9B%B8%E5%85%B3/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70.png)

- `npm install -g nodemon`
- 安装后，使用`ndoemon server.js` 去启动程序。一旦代码发生变化，就会自动重新启动。



# 4. Ajax 使用

## 4.1 步骤：

```js
// 1.创建XMLHttpRequest对象
let xhr = new XMLHttpRequest();

// 2.设置请求信息（请求行 + 请求头）
// 请求行（请求方式 + URL）
xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300');
// 请求头（可省略）
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

// 3.发送请求（请求体）
xhr.send(body)
// post使用，get请求没有请求体


// 4.接收响应（事件绑定）
xhr.onreadystatechange = () => {
	// readyState 是 xhr对象中的属性, 表示状态 0 1 2 3 4
	if(xhr.readyState == 4 && xhr.status == 200){
        
        // xhr.responseXML 接收 xml格式 的响应数据
        // xhr.responseText 接收 文本格式 的响应数据
		const text = xhr.responseText;
        console.log('状态码', xhr.status); 
        console.log('状态字符串', xhr.statusText); 
        console.log('所有响应头', xhr.getAllResponseHeaders()); 
        console.log('响应体', xhr.response); 
	}
}
```



`readyState` 代表的状态：

0. －（未初始化）还没有调用 `send()` 方法；
1. －（载入）已调用 `send()` 方法，正在发送请求；
2. －（载入完成）`send()` 方法执行完成，已经发送请求，并接收到响应行和头 line + header 的信息；
3. －（解析）开始下载并解析响应体 body；
4. －（完成）响应内容下载并解析完成 / 或操作失败。

![在这里插入图片描述](Ajax%E7%9B%B8%E5%85%B3/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDk3MjAwOA==,size_16,color_FFFFFF,t_70-16381565628804.png)



## 4.2 API 总结：

- `let xhr = new XMLHttpRequest();`：创建 XHR 对象的构造函数
- `xhr.status`：响应状态码值，如 200、404
- `xhr.statusText`：响应状态文本，如 ’ok‘、‘not found’
- `xhr.readyState`：标识请求状态的只读属性 0-1-2-3-4
- `xhr.onreadystatechange`：绑定 readyState 改变的监听
- `xhr.responseType`：指定响应数据类型，如果是 ‘json’，得到响应后自动解析响应
- `xhr.response`：响应体数据，类型取决于 responseType 的指定
- `xhr.timeout`：指定请求超时时间，默认为 0 代表没有限制
- `xhr.ontimeout`：绑定超时的监听
- `xhr.onerror`：绑定请求网络错误的监听
- `xhr.open()`：初始化一个请求，参数为：(method, url[, async])
- `xhr.send(data)`：发送请求
- `xhr.abort()`：中断请求 （发出到返回之间）
- `xhr.getResponseHeader(name)`：获取指定名称的响应头值
- `xhr.getAllResponseHeaders()`：获取所有响应头组成的字符串
- `xhr.setRequestHeader(name, value)`：设置请求头



## 4.3 案例

### 4.3.1 请求一个 json 数据响应

服务器中添加一条规则：

```js
// all  表明该规则可以适配 post get 等全部请求方式
app.all('/json-server', (request, response) => {
  // 设置响应头, 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 设置响应头, 设置允许自定义头信息
  response.setHeader('Access-Control-Allow-Headers', '*');
  // 响应一个数据
  const data = {
    name: 'atguigu'
  };
  // 对象序列化为字符串
  let str = JSON.stringify(data)
  // 设置响应体 
  response.send(str);
});
```

客户端中发送 Ajax：

```js
// 1.发送请求
const xhr = new XMLHttpRequest();

// 2.初始化
xhr.open('GET', 'http://127.0.0.1:8000/json-server');
// 自动转换: 设置响应体数据的类型
xhr.responseType = 'json';

// 3.发送
xhr.send();

// 4.事件绑定
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status >= 200 && xhr.status < 300){
            // 转化为 json 有两种方式
            // [1]手动用 JSON.parse(xhr.response)
            // [2]自动转换，在初始化是设置解析类型为：responseType
            console.log(xhr.response); // 已经自动变成 json
        }
    }
}
```



### 4.3.2 请求超时与网络异常

```js
// 超时设置 （2秒）
xhr.timeout = 2000;
// 超时回调
xhr.ontimeout = function(){
	alert('网络超时，请稍后重试')
}
// 网络异常回调
xhr.onerror = function(){
	alert('网络异常，请稍后重试')
}

// 手动取消请求
xhr.abort()
```



# 5 跨域

## 5.1 同源策略

同源策略(Same-Origin Policy) 最早由 Netscape 公司提出，是浏览器的一种安全策略；

- 同源： 协议、域名、端口号必须完全相同

- 跨域： 违背同源策略就是跨域

## 5.2 如何解决跨域

### 5.2.1 JSONP

JSONP 是什么

- JSONP (JSON with Padding)，是一个非官方的跨域解决方案，只支持get 请求。

JSONP 怎么工作的？

- 在网页有一些标签天生具有跨域能力，比如：`img`、 `link`、 `iframe`、 `script`。JSONP 就是利用 `script` 标签的跨域能力来发送请求的。

JSONP 使用

```js
// 【客户端】
// 1.动态的创建一个script标签
let script = document.createElement("script");

// 2.设置script的src，设置接收数据的回调函数。
//   把回调函数名通过URL传递给服务器，让服务器调用。
script.src = "http://localhost:3000/testAJAX?callback=handle";
function handle(data) {
	console.log(data.name);
};

// 3.将script添加到body中
document.body.appendChild(script);



// 【服务器】
//  服务器返回必须是一个函数调用，这个函数客户端必须提前声明，不然无法调用
all.get("/testAJAX" , function (req , res) {
	console.log("收到请求");
	const callback = req.query.callback; 
	const obj = {
		name: "Moxy",
		age: 18
	}
    const data = JSON.stringify(obj);
    res.send(`${callback}(${data})`)      // handle(data)
});
```



### 5.2.2 CORS

CORS（Cross-Origin Resource Sharing），跨域资源共享。CORS 是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持 get 和 post 请求。跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。



CORS 使用

- 通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。

服务端：

```js
all.get("/testAJAX" , function (req , res) {
	//通过res设置响应头，允许跨域请求
	//res.set("Access-Control-Allow-Origin","http://127.0.0.1:3000");
	res.set("Access-Control-Allow-Origin","*");
	res.send("testAJAX 返回的响应");
});
```



# 6 fetch - AJAX

`fetch` 的基本使用：

请求：`fetch('URL', {init})`

响应：`.then(response => { .. })`处理响应信息

```js
fetch('http://127.0.0.1:8000/fetch-server?vip=10', {
    //请求方法
    method: 'POST',
    //请求头
    headers: {
        name: 'Nliver'
    },
    //请求体
    body: 'username=admin&password=admin'
}).then(response => {
	// 不能直接获取，而是要根据数据类型，处理后 return，在下一个 then 拿到数据。
    // return response.text();
    return response.json();
}).then(response => {
    console.log(response);
})
```



# PartⅡ Axios

Promise based HTTP client for  the browser and node.js.

- `npm install axios`

- `yarn add axios`

# 1.1 基本使用

`axios()` 发送请求。

`axios.request()` 发送请求。

`axios.post(url, data, config)`：URL地址、请求体、可选参数。















# PartⅢ Webpack





# PartⅣ npm / yarn













































































































