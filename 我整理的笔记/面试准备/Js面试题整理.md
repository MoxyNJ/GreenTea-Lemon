# 浏览器相关问题

## 1. http 返回码有哪些？

#### 概述

2XX，表示 Success  **成功** 的状态码。

3XX，表示 Redirection  **重定向** 的状态码。

4XX，表示 Client Error **客户端错误** 的状态码。

5XX，表示 Server Error **服务器错误** 的状态码。



200系列有三个，服务器：发全部资源(200)，不发资源(204)，发范围资源(206)

300系列有五个，服务器的资源：永久重定向(301)，临时重定向(302、307)，`post`切换为`get`后重定向(303)，访问不符合条件（304）

400系列有五个，服务器：无法理解(400)，权限验证(401)，不允许访问(403)，没有该资源(404)，禁止该方式访问(405)

500系列有三个，服务器：内部故障(500)，上游故障(502)，正忙(503)



#### 详述

200 OK：服务器端请求已 **正常处理**。

204 No Content：一般在 **只从客户端发送信息**， **服务器不需要发送新信息内容** 的情况下使用。

206 Partial Content：客户端进行 **范围请求**，服务端返回 **小范围内的资源**。



301 Moved Permanently：资源 **永久重定向**，客户端访问新的地址。

302 Found：资源 **临时重定向**，客户端暂时访问新地址。

303 See Other：服务器让客户端把 post 请求切换为 get 请求重定向访问新的地址。

304 Not Modified：和重定向关系不大，**资源已找到，但未符合条件**

307 Temporary Redirect：资源 **临时重定向**，客户端暂时访问新地址。和 302 类似，有 get 和 post 的访问差别。



400 Bad Request：服务端 **无法理解请求报文**，可能是格式错误。

401 Unauthorized：客户端需要对访问进行 **权限认证**。

403 Forbidden：**资源不允许访问**

404 Not Found：**没有找到资源**。

405 Method Not Allowed：服务器 **禁止使用该访问方式**。



500 Internal Server Error：服务完成执行请求时 **内部发生了故障**。

502 Bad Gateway：“中间商” 服务器（代理服务器、网关服务器），**无法访问上游服务器**。

503 Service Unavailable：服务器无法处理请求，**正忙**（超负荷、停机维护）。



## 2 如何判断一个变量是否为数组？

这道题实际上是在考两个方向的知识点：原型链和类型转换。

以下是 ES5 常用的判断方式。基于原型链，会导致如果绑定原型链后，会判断错误：

```js
var a = []; 
var b = {};
b.__proto__ = Array.prototype;

a.constructor === Array; 			// true，通过原型链访问构造函数来判断

a instanceof Array; 				// true, instanceof 基于原型链判断，可判断引用类型，
Array.prototype.isPrototypeOf(a); 	// true，isPrototypeOf 基于原型链判断，a 的原型链上是否有 Array.prototype

Object.getPrototypeOf(a) === Array.prototype;  	// true，获取原型链，判断是否是 Array.prototype
a.__proto__ === Array.prototype 				// true，获取原型链，判断是否是 Array.prototype
```

以下是可以准确判断的方式：

```js
Object.prototype.toString.call(a) === '[object Array]';   // true，通过 toString 方式判断类型，是最常用的方法。

Array.isArray(a) 					// true，直接判断出

// polyfill
if (!Array.isArray){ 
    Array.isArray = function(arg){ 
        return Object.prototype.toString.call(arg) === '[object Array]'; 
    }; 
}
```



## 3 快排

![这里写图片描述](Js%E9%9D%A2%E8%AF%95%E9%A2%98%E6%95%B4%E7%90%86/4abde1748817d7f35f2bf8b6a058aa40tplv-t2oaga2asx-watermark.awebp)

```js
// 原生 API，sort() 将元素转换为字符串，然后按照 UTF-16 进行排序。
// 即使数组内容全部是 number，也会转化为 string 然后再进行比较。
["c","b","a","A","C","B",3,2,1].sort()		// (9) [1, 2, 3, 'A', 'B', 'C', 'a', 'b', 'c']

// 快速排序

```

https://juejin.cn/post/6844903609885261832



## 4 同源策略和跨域资源共享

### 1 同源

同源是一种安全机制，为了预防某些恶意行为（例如 Cookie 窃取等），保护用户的隐私。不同源之间的页面，不准互相访问数据。

- 满足同源要具备三方面：**协议相同**、**域名相同**、**端口相同**。

- 通过 `window.origin` 或 `location.origin` 得到当前源。

```js
http://moxy.com/index.html
http://moxy.com/server.php
//同源

http://a.wang.com
http://wang.com
//不同源，域名必须一模一样
```

### 2 跨域

当用户在 A 域中访问服务器获取资源，服务器会正常的返回资源。而当用户试图在其他域的网站去访问 A 域的资源，出于安全原因，服务器就会拒绝这种访问方式。

- 浏览器发送请求时，会把本地域放在请求头中发送给服务器，以便服务器对齐对其进行验证。



**可以跨域使用`CSS`、`JS`和图片**

- 同源策略限制的是数据访问，我们引用 `CSS`、`JS` 和图片等资源不限制。



**同源策略会让三种行为受限：**

- Cookie、LocalStorage 和 IndexDB 访问受限
- 无法操作跨域 DOM（常见于 iframe）
- Javascript 发起的 XHR 和 Fetch 请求受限



### 3 CORS 跨域

"**跨域资源共享**"（Cross-origin resource sharing）。

- 允许浏览器向跨源服务器，发出 `XMLHttpRequest` 请求，从而克服了 `AJAX` 只能同源使用的限制。







实现 `CORS` 通信需要浏览器和服务器都支持。



#### 3.1 浏览器 CORS

浏览器会限制 **从脚本内发起** 的跨域 HTTP 请求。 例如 XHR 和 Fetch 就遵循同源策略。这意味着使用 API 的 Web 应用程序只能从加载应用程序的同一个域请求 HTTP 资源。

Web 程序发出跨域请求后，浏览器会 **自动** 向我们的 HTTP header 添加一个额外的请求头字段：`Origin`。`Origin` 标记了请求的站点来源：

```http
GET https://api.website.com/users HTTP/1/1
Origin: https://www.mywebsite.com           // <- 浏览器自己加的
```

 服务器返回的 response 也会添加一些响应头字段，这些字段将 **显式表明** 此服务器是否允许这个跨域请求。



#### 3.2 客户端 CORS

服务器开发人员，通过验证 `Origin` 是否允许跨域访问，然后在 HTTP 响应中添加额外的响应头字段 `Access-Control-*` 来表明是否允许跨域请求。



服务器端的设置：

- 如果允许某域名跨域，给该域名加上访问权限：将该域添加到 `Access-Control-Allow-Origin` 中。



#### 3.3 CORS存在的问题

不支持`IE8/9`，如果要在`IE8/9`使用`CORS`跨域需要使用`XDomainRequest`对象来支持`CORS`。



### 4 JSOP 跨域

全称：JSON with padding 

利用动态创建 `<script>` 标签向服务器发送 GET 请求，服务器收到请求后将数据放在一个指定的 **回调函数** 中并传送回来。







# 积累的问题

手写算法，用递归遍历一个树

promise 手写实现一个 sleep

当场用 vue 写一个 todoList 包括 **增删改查**，30分钟。























