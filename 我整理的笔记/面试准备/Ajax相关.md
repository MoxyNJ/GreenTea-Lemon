# PartⅠ Ajax

# 1. 综述

## 1.1 Ajax 简介

AJAX 全称为 Asynchronous JavaScript And XML，就是异步的 JS 和 XML。

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

- JSONP (JSON with Padding)，是一个非官方的跨域解决方案，只支持 get 请求。

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



# 1 特性

- 从浏览器中创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- 从 node.js 创建 [http](http://nodejs.org/api/http.html) 请求
- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)



## 1.1 API

![Axios系统学习笔记原理图](Ajax%E7%9B%B8%E5%85%B3/Axios%E7%B3%BB%E7%BB%9F%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0%E5%8E%9F%E7%90%86%E5%9B%BE.png)



| 基本方法                            | 作用                                     |
| :---------------------------------- | ---------------------------------------- |
| `axios(config)`                     | 通用/最本质的发任意类型请求的方式        |
| `axios(url[, config])`              | 可以只指定 url 发 get 请求               |
| **基本方法的别名**                  |                                          |
| `axios.request(config)`             | 等同于 `axios(config)`                   |
| `axios.get(url[, config])`          | 发 get 请求                              |
| `axios.delete(url[, config])`       | 发 delete 请求                           |
| `axios.post(url[, data, config])`   | 发 post 请求（`data` 请求体）            |
| `axios.put(url[, data, config])`    | 发 put 请求（`data` 请求体）             |
|                                     |                                          |
| axios.head(url[, config])           |                                          |
| axios.options(url[, config])        |                                          |
| axios.patch(url[, data[, config]])  |                                          |
|                                     |                                          |
| **额外配置**                        |                                          |
| `axios.defaults.xxx`                | 请求的默认全局配置                       |
| `axios.interceptors.request.use()`  | 添加请求拦截器                           |
| `axios.interceptors.response.use()` | 添加响应拦截器                           |
| **创建 axios 实例**                 |                                          |
| `axios.create([config])`            | 创建一个新的 axios (它没有下面的功能)    |
| **取消请求**                        |                                          |
| `axios.CancelToken()`               | 用于创建取消请求的错误对象               |
| `axios.Cancel()`                    | 用于创建取消请求的 token 对象            |
| `axios.isCancel()`                  | 是否是一个取消请求的错误                 |
| **并发调用 axios**                  |                                          |
| `axios.all(promises)`               | 用于批量执行多个异步请求                 |
| `axios.spread(callback)`            | 用来指定接收所有成功数据的回调函数的方法 |



## 1.2 基本方法

##### `axios(config)`

- 根据 `method` 属性值的不同，可以发送 get、post、delete、put 各种请求。
- 效果和 `axios.get()`、`axios.post()`、`axios.delete()`、`axios.put()` 相同。

```js
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

// 发送 GET 请求
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
})
```

##### `axios(url[, config])` 默认发送 GET 请求

```js
axios('/user/12345');
```



##### `axios.get()` 和 `axios.post()`

GET 请求：

```js
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
    .then(response  => {
    console.log(response);
})

// 上面的请求也可以这样做
axios.get('/user', {
    params: {
        ID: 12345
    }
}).then(response => {
    console.log(response);
})
```

POST 请求：

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
})
    .then(response => {
    console.log(response);
})
```



##### `axios.all()` 和 `axios.spread()`

并发执行：

```js
const getUserAccount = () => {
  return axios.get('/user/12345');
}

const getUserPermissions = () => {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread((acct, perms) => {
    // 两个请求现在都执行完成
  }));
```



## 1.3 config 配置

- [axios 中文文档](http://www.axios-js.com/zh-cn/docs/index.html#axios-head-url-config)

只有 `url` 是必需的。如果没有指定 `method`，请求将默认使用 `get` 方法。

以下是常用的配置请求：

```js
{
   // 用于请求的服务器 URL
  url: '/user',

  // 创建请求时使用的方法
  method: 'get', // default
      
  // 请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // URL == baseURL + url
  baseURL: 'https://some-domain.com/api/',
  
  // 跟在 URL 后面的参数
  params: {
    ID: 12345
  },
  
  // 请求体数据，只适用于 'PUT', 'POST', 和 'PATCH'
  data: {
    firstName: 'Fred'
  },
      
  // 指定请求超时的毫秒数(0 表示无超时时间)，ICU会自动中断请求
  timeout: 1000,

  // 服务器响应的数据类型：arraybuffer, blob, document, json, text, stream
  responseType: 'json', // default
}
```



以下是一般常见的配置

```js
{
//【请求拦截器】、【响应拦截器】
  // 允许在向服务器发送前，修改请求数据，用 PUT, POST 和 PATCH 方法中
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // 数据在传递给 then/catch 前，修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],
      
      
  // 跨域请求时是否需要使用凭证
  withCredentials: false, // default

   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  cancelToken: new CancelToken(function (cancel) {
  })
}
```



## 1.4 response 响应结果：

![image-20211129215622526](Ajax%E7%9B%B8%E5%85%B3/image-20211129215622526.png)

axios 请求响应的结果，包含一下信息：

```js
{
  status: 200, 			// 响应状态码
  statusText: 'OK',		// 响应字符串
  headers: {},			// 响应头
  data: {},    			// 响应体：默认会自动进行 JSON 解析

  config: {},           // 发送请求时的配置信息（请求类型、请求URL、请求体等等）
  request: {}           // XMLHttpRequest 实例对象
}
```

```js
axios.get('/user/12345')
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```



## 1.5 默认配置

如果同一个 axios 实例，定义了多个 axios 请求，且这些请求有相同的地方，比如他们的 baseURL 都是发送给同一个域名端口，比如他们的超时时间都定义为统一的 3000。这时便可以对这一系列 axios 请求进行默认配置定义，避免了每一个 axios 请求都需要再重新定义一次，增加了重复代码。

**默认配置的优先级顺序**

- `config` 的优先级是最高的：`config` 参数配置 > `defaults` 默认属性  >  `lib/defaults.js` 库的默认值。



全局的 axios 默认值，使用 `dafaults` 属性值配置。

```js
axios.defaults.method = 'GET'
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.params= {id:100};  // URL中传递的参数
axios.defaults.timeout = 3000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```



自定义实例默认值

```js
// 创建实例时，进行默认配置
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 创建实例后，进行默认配置
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```



## 1.6 创建实例

##### `axios.create([config])`

可以自由创建不同的 axios 实例，从而设置 `defaults` 默认配置参数等等不会相互干涉。

当项目较大，后端提供的端口有不同的服务器时，可以根据服务器的不同分别创建对应的 axios 实例，提高效率。

```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

`instance` 实例化对象功能和 `axios` 几乎是差不多的（后面会区分），可以使用的 API：

- 发送请求的各种方法；
- 默认配置 `defaults` 属性，拦截器 `interceptors` 属性。

```js
axios.prototype.request(config)

axios.prototype.get(url[, config])
axios.prototype.put(url[, data[, config]])
axios.prototype.delete(url[, config])
axios.prototype.post(url[, data[, config]])
axios.prototype.patch(url[, data[, config]])

axios.prototype.head(url[, config])
axios.prototype.options(url[, config])
```

- 但是没有 `cancel()` 、`all()`、`CancelToken()` 的这些方法。



## 1.7 拦截器

拦截器就是一些函数，分为请求拦截器和响应拦截器。

在发送请求时，会调用请求拦截器，对所有发送的请求进行最后的处理；

- 常常在这里进行合理性判断，取消请求，修改 config 参数等等；

在接收响应时，会调用响应拦截器，对所有接收的响应进行初次的处理；

- 通常在这里对数据进行预处理，比如统一对失败的请求进行结果统计；对响应数据进行格式化处理。

```js
// 添加请求拦截器 (config, error )
axios.interceptors.request.use(config => {
    console.log("请求拦截器 成功")   	// 在发送请求之前做些什么
    return config;
  }, error => {
	console.log("请求拦截器 失败")		// 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器 (response, error)
axios.interceptors.response.use(response => {
    console.log("响应拦截器 成功")   	// 对响应数据做点什么
    return response;
  }, error => {
    console.log("响应拦截器 失败")   	// 对响应错误做点什么
    return Promise.reject(error);
  });
```

- 内部使用 promise 实现的；
- 使用 `axios.interceptors.request.use` 和 `axios. interceptors.response.use` 方法。
- 请求拦截器的参数是（config，error），config 表示请求的配置参数；
- 响应拦截器的参数是（response，error），response 表示响应的全部结果；



拦截器的 Pomise 顺序：

```js
// 添加请求拦截器 (config, error )
axios.interceptors.request.use(config => {
    console.log("请求拦截器 成功")
	throw '参数出了问题'   // 这里让拦截器把请求状态调整为失败
  }, error => {
	console.log("请求拦截器 失败")
    return Promise.reject(error);
  });

// 添加响应拦截器 (response, error)
axios.interceptors.response.use(response => {
    console.log("响应拦截器 成功")  
    return response;
  }, error => {
    console.log("响应拦截器 失败")   
    return Promise.reject(error);
  });

// 发送请求
axios({
    method: 'GET',
    url: 'http://localhost:3000/posts'
}).then(response => {
    console.log(response)
}).catch(error =>{
    console.log(error)
})
```

此时的执行顺序：

1. axios 发送请求，`.then()` 等待 `promise`  决议；
2. Request interceptors 请求拦截器执行，
   - 输出：`请求拦截器 成功`  ；
   - throw 参数出了问题，保存在 error 中，然后 promise reject 继续失败决议；
3. Response interceptors 响应拦截器执行，
   - 输出：`响应拦截器 失败`，然后 promise reject 继续失败决议；
4. axios 请求的 `.then()` 接收到失败的 promise。
   - 输出：`参数出了问题`



拦截器的 Promise 顺序：

```js
// Promise
// 设置请求拦截器  config 配置对象
axios.interceptors.request.use(function (config) {
    console.log('请求拦截器 成功 - 1号');
    //修改 config 中的参数
    config.params = {
        a: 100
    };

    return config;
}, function (error) {
    console.log('请求拦截器 失败 - 1号');
    return Promise.reject(error);
});

axios.interceptors.request.use(function (config) {
    console.log('请求拦截器 成功 - 2号');
    //修改 config 中的参数
    config.timeout = 2000;
    return config;
}, function (error) {
    console.log('请求拦截器 失败 - 2号');
    return Promise.reject(error);
});

// 设置响应拦截器
axios.interceptors.response.use(function (response) {
    console.log('响应拦截器 成功 1号');
    return response.data;
    // return response;
}, function (error) {
    console.log('响应拦截器 失败 1号')
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    console.log('响应拦截器 成功 2号')
    return response;
}, function (error) {
    console.log('响应拦截器 失败 2号')
    return Promise.reject(error);
});

//发送请求
axios({
    method: 'GET',
    url: 'http://localhost:3000/posts'
}).then(response => {
    console.log('自定义回调处理成功的结果');
    console.log(response);
});
```

- 流程: 请求拦截器2 => 请求拦截器1 => 发ajax请求 => 响应拦截器1 => 响应拦截器 2 => 请求的回调



## 1.8 取消请求

```js
axios({
    method: 'GET',
    url: 'http://localhost:3000/posts',
    // 1. 添加配置对象属性
    cancelToken: new axios.CancelToken((c) => {  
    })
})

let cancel // 用于保存取消请求的函数
const getProducts = () => {
  axios({
    url: 'http://localhost:4000/products1',
    cancelToken: new axios.CancelToken( c => { 
      // c 是用于取消当前请求的函数,保存取消函数,用于之后可能需要取消当前请求
      cancel = c;
    })
  }).then(
    response => {
      cancel = null
      console.log('请求1成功了', response.data)
    },
    error => {
      cancel = null
      console.log('请求1失败了', error.message, error) 
      // 请求1失败了 强制取消请求 Cancel {message: "强制取消请求"}
    }
  )
}

// 执行取消请求的函数
const cancelReq = () => {
  // alert('取消请求')
  if (typeof cancel === 'function'){
    cancel('强制取消请求')
  } else {
    console.log('没有可取消的请求')
  }
}
```

- 在 `axios` 中设置了 `cancelToken` 属性，然后把其中的回调函数 `cancel` 放到外部环境中。
- 当希望该请求取消时，调用 `cancel` 方法即可。
- 在请求完成、或失败后，要及时清空 `cancel` 的引用。

可以配合节流和防抖进行复习：

- 节流：技能

- 防抖：回城



# 2 Axios 封装

- https://juejin.cn/post/6968630178163458084#heading-13

- https://juejin.cn/post/6999932338566070308

- https://juejin.cn/post/6847009771606769677

看一下 react 是如何封装的



大致分为三个阶段：

**1、请求之前**

一般的接口都会有鉴权认证（token），因此在接口的请求头里面，我们需要带上token值以通过服务器的鉴权认证。

- 但是如果每次请求的时候再去添加，会大大的加大工作量，而且很容易出错。使用 axios 提供了拦截器机制，在请求的拦截器中可以添加token。

```js
// 请求拦截
axios.interceptors.request.use((config) => {
  //....省略代码
  config.headers.x_access_token = token
  return config
}, function (error) {
  return Promise.reject(error)
})
```

**2、响应之后**

请求接口，并不是每一次请求都会成功。那么当接口请求失败的时候的统一处理：

- 可以获取到服务器返回的状态码，然后根据状态码进行相对应的操作。

```js
// 响应拦截
axios.interceptors.response.use(function (response) {
  if (response.data.code === 401 ) { //
    //用户 token 失效，清空用户信息
    sessionStorage.user = ''
    sessionStorage.token = ''
    window.location.href = '/';//返回登录页
    //接口 Promise 返回错误状态，错误信息 msg
    return Promise.reject(msg)
  }
  if(response.status!==200||response.data.code!==200){
    // 接口请求失败，具体根据实际情况判断
    message.error(msg);//提示错误信息
    return Promise.reject(msg)//接口Promise返回错误状态
  }
  return response
}, function (error) {
  if (axios.isCancel(error)) {
    requestList.length = 0
    throw new axios.Cancel('cancel request')
  } else {
    message.error('网络请求失败,请重试')
  }
  return Promise.reject(error)
})
```

**3、使用axios**

我在网易云音乐项目中的封装：

`config.js` 保存一些常量。

```js
const devBaseURL = "http://123.207.32.32:9001";
const proBaseURL = "http://123.207.32.32:9001";

export const BASE_URL = process.env.NODE_ENV === "development" ? devBaseURL : proBaseURL;
export const TIMEOUT = 5000;
```

`request.js` 请求之前 + 响应之后

```js
import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

instance.interceptors.request.use(
  (config) => {
    // 1.发送网络请求时, 在界面的中间位置显示Loading的组件
    // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么取消请求，并直接跳转到登录页面s [shi]
    // 3.params/data序列化的操作
    return config;
  },
  (err) => {
    return 0;
  }
);

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    // 判断HTTP状态码，然后进行对应的操作
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log("请求错误");
          break;
        case 401:
          console.log("未授权访问");
          break;
        default:
          console.log("其他错误信息");
      }
    }
    return err;
  }
);

export default instance;
```

`player.js` 的                                                                                                                                                                                                                 

```js
import request from "./request";
export function getSongDetail(ids) {
  return request({
    url: "/song/detail",
    params: {
      ids,
    },
  });
}

export function getLyric(id) {
  return request({
    url: "/lyric",
    params: {
      id,
    },
  });
}
```

调用：

```js
getSongDetail(idx).then( res => {
    console.log(res)
})

getLyric(idx).then( res => {
    console.log(res)
})
```



# PartⅢ Webpack

# 1. 定义

[Webpack 官网](webpackjs.com./api/)

[掘金 - 分析 webpack 原理](https://juejin.cn/post/7023242274876162084)

放到了最下面



## 1.2 webpack 产生的背景

首先，为什么打包？因为：

1. 各个依赖文件的关系难以梳理，耦合程度较高，代码难以维护。
2. 把所有依赖包都打包成为一个js文件（bundle.js）文件，会有效降低文件请求次数，一定程度提升性能。
3. 逻辑多、文件多，项目复杂度提高

为什么要用webpack？因为：

1. webpack 除提供上述功能外，还充当了“翻译官”的角色，例如将 TS、ES6 翻译为低版本的语法，将less、sass 翻译为 css 等功能。
2. 强大而灵活，plugin 可插拔，按需加载。



重点：

1. 理解前端模块化，各种模块化方式是如何实现的；
2. 理解 Webpack 打包的核心思路；
3. 理解 Webpack 中的 ‘关键人物’；



## 1.3 前端模块化

早起模块化的实现方法：

不同的 module（moduleA.js， moduleB.js，moduleC.js） 会放在不同的 js 文件中。但是如果把所有的 js 文件通过 `script` 标签引入同一个 HTML 文件中时，这些 js 文件都会绑定到全局作用域中。这就导致了如果在不同的 js 文件中不小心使用了相同的变量名，就会发生命名冲突和值的覆盖。

为了避免这种命名空间的冲突，会采用模块化封装，下面是一个早期的封装方式，采用立即执行函数 IIFE 和 闭包实现：

```js
// 定义模块内的模块作用域
(function(window){
    var name = "susan"
    var sex = "female"
    functioon tell(){
        console.log("im ", this.name)
    }
    window.susanModule = {tell}
})(window)
```

最终这个 susanModule 绑定在了 window 全局对象中，在 node 环境中是 global 对象。

封装的好处就是，该暴露的数值可以暴露，想隐藏的数值也隐藏。

- 这里的例子中 name  和 sex 的变量就变得无法修改，而只能通过 tell function 去访问，达到了对数据的封装，提升安全性。



### 模块化的优点

- 模块化的封装（该暴露的暴露，该隐藏的隐藏）
- 重用性（不同的网页可以通用相同的模块）
- 解除耦合（不同的模块之间不会相互关联影响）



## 1.4 模块化方案进化史

随着模块化优势体现，开发者更倾向于使用模块化协同开发项目，于是在发展过程中形成了很多规范：AMD、COMMONJS、ES6 MODULE



### 1.4.1 AMD

Asynchronous Module Definition（异步模块定义）
定义最早，目前很少使用。

```js
// 求和模块，参数依次是：当前模块名、依赖的模块、模块内容
define("getSum", ["math"], function(math){
	return function (a,b){
    	log("sum:"+ math.sum(a, b))
    }
})
```
### 1.4.2 COMMONJS

2009年出的规范，原本是为服务端的规范，后来 nodejs 采用 commonjs 模块化规范

- 模块必须显示的引入

```js
// 通过require函数来引用
const math = require("./math");

// 通过exports将其导出
exports.getSum = function(a,b){
	return a + b;
}
```



### 1.4.3 ES6 MODULE

目前使用最多的便是这个，JavaScript 提供了原生支持的模块打包方式，使用 `import` 和 `export`。

```js
// 通过import函数来引用
import math from "./math";

// 通过export将其导出
export function sum(a, b){
	return a + b;
}
```


## 1.5 Webpack 的打包机制

根据 `import` 引入等关键字，将依赖文件打包成一个文件。



### 1.5.1 输出文件

输出文件的大体结构：

```js
(function(module) {
	var installedModules = {};
    function __webpack_require__(moduleId){
    	// SOME CODE
    }
    // 。。。
    return __webpack_require__(0); // entry file
})([ /* modules array */])
```

上述结构中的核心方法：

```js
function __webpack_require__(moduleId){
	// check if module is in cache
    if(installedModules[moduleId]){
    	return installedModules[moduleId].exports;
    }
    // create a new module (and put into cache)
    var module = installedModules[moduleId] = {
    	i: moduleId,
        l: false,
        exports: {}
    };
    // exe the module func
    modules[moduleId].call{
    	module.exports,
        module,
        module.exports,
        __webpack_require__
    };
    // flag the module as loaded
    module.l = true;
    // return the exxports of the module
    return module.exports;
}
```
### 1.5.2 Webpack打包过程

1. 从入口文件开始，分析整个应用的依赖树
2. 将每个依赖模块包装起来，放到一个数组中等待调用
3. 实现模块加载的方法，并把它放到模块执行的环境中，确保模块间可以互相调用
4. 把执行入口文件的逻辑放在一个函数表达式中，并立即执行这个函数



# 2. 配置开发环境 -- npm、包管理器

-  创建一个工程：`npm init`
- 也可以使用 `npm init -y`，直接生成了一个默认配置的 `package.json`，不需要一路回车。

分析：`package.json` 版本信息文件

![image-20211201103612904](Ajax%E7%9B%B8%E5%85%B3/image-20211201103612904.png)

- 运行自定义命令：`npm run test`，就可以运行 `test` 后面命令的值，类似一个快捷键。这里就执行了后面的 `echo..` 这个命令。



安装时的命令：

- `npm config set registry https://registry.npm.taobao.org` 下载包的地址调整为淘宝镜像
- `npm install loadash --save`
  - `--save`，npm5xx 以上可省略。下载好包后，还会把这个包放到 `package.json` 的 `dependencies` 字段下保存：`"loadash: "^1.0.0`。
  - `--save-dev`，指定当前环境是开发环境。会把这个包放到 `package.json` 的 `devDependencies` 字段下保存：`"loadash: "^1.0.0`。
  - `--only=prod`，`--only=dev` 指定这个包安装在生产环境下 / 开发环境下。如果不指定，则默认会安装在 `node_modules` 中。在较大的工程项目中会实现环境区分， 比如只安装 `dependencies` 提升安装速度。
- `npm` 安装 `webpack-cli`，`webpack-dev-server`。
  - 事实上，在 `node_modules` 中项目已经装好了这些依赖，不需要在重新 `npm` 安装后才能运行 `webpack-dev-server` ，可以直接：`./node_modules/.bin/webpack-dev-server` 运行该依赖。



![image-20211201105853475](Ajax%E7%9B%B8%E5%85%B3/image-20211201105853475.png)

主要有两种依赖：

1. `dependencies` 生产环境下的依赖。通常项目迁移到别处时，重现安装依赖会默认 `dependencies` 中的依赖，这里放和项目习惯的功能模块。
2.  `devDependencies`  开发环境下的依赖。 通常反正构建工具、质量检测工具。



语义化版本：

在 `dependencies` 和 `devDependencies`  中的依赖，可以使用语义化版本号。重新安装依赖 `npm install` 后，会实现自动更新小版本或中版本，在不该动大版本的情况下，不需要用户手动修改版本号，就可以尽可能的使最新的版本。

- `^version`：会自动更新中版本和小版本；
  - `^1.0.1`  ==> `1.x.x`
- `~version`：会自动更新小版本；
  - `~1.0.1` ===> `1.0.x`
- `version`：不更新，只安装规定的版本。



`package.json` 中的 `"scripts"` 字段

```json
"scripts" : {
    "test": "echo \"Error: no test specifed\" && exit 1",
    "dev" : 
}
```

`dev`：运行 `npm run dev` 可以原地启动一个 webpack 开发服务器。

`build`：运行 `npm run build` 可以对代码格式做校验，对文件进行打包。



`npm install` 的过程：

1. 寻找包版本信息文件 (package.json)，依照它来进行安装；
2. 查找 `package.json` 中的依赖，并检查项目中其他的版本信息文件；
3. 如果发现了新包，就更新版本信息文件； 



#### 问题一：执行 `npm install xxx -???`

| npm install xxx + | [不写]   /  -s  /  --save     | -d  /  --save-dev             | -g  /  --global            |
| ----------------- | ----------------------------- | ----------------------------- | -------------------------- |
| 安装方式          | 项目默认安装                  | 项目默认安装                  | 操作系统全局安装           |
| 安装位置          | node_modules 文件夹下         | node_modules 文件夹下         | AppDataAppData\Roaming\npm |
| 模块引入          | dependencies 字段下           | devDependencies 字段下        | dependencies 字段下        |
| 使用              | `./node_modules/.bin/webpack` | `./node_modules/.bin/webpack` | `webpack` 直接启动         |
|                   |                               |                               |                            |



#### 问题二：webpack 各文件的作用？

| 文件名                |                                                     |      |
| --------------------- | --------------------------------------------------- | ---- |
| `node_modules` 文件夹 | 项目引入的模块都放置在这里                          |      |
| `dist` 文件夹         | 打包成功后，文件会放置在这里                        |      |
| `dist/index.html`     | 打包后，html 入口文件                               |      |
| `dist/main.js`        | 打包后，js 文件                                     |      |
|                       |                                                     |      |
| `src` 文件夹          | 编写的代码文件都放置在这里                          |      |
| `src/App.jsx`         | React 包裹在最外层的组件                            |      |
| `src/index.jsx`       | React 接入 html 的入口文件                          |      |
| `src/index.html`      | html 入口文件                                       |      |
|                       |                                                     |      |
| `package.json`        | 默认的配置文件                                      |      |
| `package-lock.json`   |                                                     |      |
| `webpack.config.js`   | webpack 额外的配置文件，通常在这里调整 webpack 设置 |      |
| `.babelrc`            | 调整 babel 的设置文件                               |      |
|                       |                                                     |      |



# 3. Webpack 核心特性

## 3.1 安装和入口

入口文件： `src/index.js` 当运行 `webpack ` 进行打包后，会把 `index` 入口文件中引入的全部模块打包起来，放到 `dist/main.js` 中。

如果想修改入口文件，就需要自定义配置，通常会在根目录一个定义文件 `webpack.config.js` 来修改和定义配置：

![image-20211201111848287](Ajax%E7%9B%B8%E5%85%B3/image-20211201111848287.png)

- `entry` ：工程资源的入口，俗称入口文件，可以理解为依赖树的根，可以有多个入口，每个入口都会有一个对应的打包结果： `./app.js`。
- `output` ：打包结果，俗称出口文件：`dist/bundule.js`。
  - `path` ：必须是绝对路径，所以这里用到了 `path.join()` 校验地址；
  - `filename`：打包结果的文件名。



`webpack-dev-server`：监听工程文件的改动，可以自动打包文件，刷新浏览器。

- `port`，修改默认的服务器地址，：`localhost:8080`



## 3.2 loader - 文件加载器

`loader` 是一个文件维度的操作，通常文件的操作的包，就需要用 loader 加载。比如后面会讲到的 babel 就需要通过 loader 加载。



接着上文的 webpack.config.js 文件

![image-20211201115208378](Ajax%E7%9B%B8%E5%85%B3/image-20211201115208378.png)

可以让 webpack 打包和引入 css、less、scss、png 等各种模块；

`npm install css-loader --save-dev`，安装可以引入 css 的 loader。

在 `webpack.config.js` 使用 `loader`。

- `module` 下的 `rules` 中配置。
  - `test`：`.css` 处理 `.css` 文件。
  - `use`：这个文件需要被哪些 loader 来处理；
    - `style-loader`：自动生成一个样式 style 标签，加载该样式；
    - `css-loader`：让  js 可以解析  `import sytle.css`  这个代码；

**注意，loader 的实际配置顺序是从下往上的，和书写的方式相反。**

- 所以我们想优先加载的配置，要放在末尾。这里的顺序是固定的，即，先加载 `css-loader` 再加载 `style-loader`。

生效后，可以解析 js 代码中的 `import sytle.css` 这类文件了。



## 3.3 plugins - 插件

节点维度的处理。

`plugin` 通过事件监听机制，改变文件打包后的输出结果。

- 比如，对资源进行压缩处理，让文件更快的从服务端传递给浏览器。从代码中去掉不需要的内容，如注释、换行、空格等等，减小整体体积。



安装一个压缩的 plugin：`npm install uglifyjs-webpack-plugin --save-dev`

安装后，就可以在 `webpack.config.js` 的 `plugin` 中引入并生效：

1. 在文件的开头需要引入这个库：`const UglifyJSPlugin = require('uglifyjs-webpack-plugin')` 
2. 在 `plugin` 字段中创建并引入这个库：

![image-20211201120058877](Ajax%E7%9B%B8%E5%85%B3/image-20211201120058877.png)



# 4. webpack 构建工程

## 4.1 构建

模拟一个 `react` 项目的构建过程：

- `npm install react react-dom`
- 安装 webpack 依赖，webpack 和 webpack 的命令行 cil工具。
  - `npm install webpack webpack-cli -d`
    - development 开发环境下安装，是 `--save-dev` 的简写。模块会写入到 `devDependencies ` 字段下，安装在项目的 `node_modules` 中。需要输入 `./node_modules/.bin/webpack` 命令使用 webpack。
  - `npm install webpack webpack-cli -g`
    - 安装在电脑操作系统的全局中，可以输入 `webpack` 命令直接启动。一般会安装到AppDataAppData\Roaming\npm目录下
  - `npm install webpack webpack-cli`
    - 默认，在生产环境下安装



## 4.2 babel

`babel` 可以把 ES6、Jsx 等形式的 js 文件，转化为 ES5 版本的 js 文件。通常使用 loader 引入。

相关的常用库有 (5)：

- `@babel/core`、`@babel/cil`、`@babel/preset-env`、`@babel/preset-react`、`babel-loader`



- `npm install @babel/core @babel/cil -g`

  - 安装 babel 的核心库 core 和命令行 cil 工具。

- `npm install @babel/preset-env @babel/preset-react` 

  - 安装 babel 的转换规则，这个包可以把高版本的 JS 代码转换为 低版本的 ES5；

  - `preset-env` 可以把高版本 Js 代码转化为 ES5；

  - `preset-react` 可以把 Jsx 格式的文件转化为 Js 文件；

  - 安装好后，可以把包含 ES5 的代码 `test.js` ，通过在命令行运行 `babel test.js --presets=@babel/preset-env` 直接转化为  ES5 代码:

    ```js
    // test.js 文件
    [1,2,3].map((item) => {
        console.log(item)
    })
    ```

    ![image-20211201122704381](Ajax%E7%9B%B8%E5%85%B3/image-20211201122704381.png)

- `npm install babel-loader` 

  - 通过 loader 的方式引入 babel，需要这个库的支持。



**改进1：**可以在 `package.json` 中制定 babel 规则：

![image-20211201122807296](Ajax%E7%9B%B8%E5%85%B3/image-20211201122807296.png)

这样就不需要在输入 `babel test.js --presets=@babel/preset-env`  去寻找规则，直接 `babel test.js` 就可以了。

**改进2：**直接创建一个独立的文件 `.babelrc` ，可以更方便的修改 babel 规则。

- `babel` 会优先查找 `.babelrc` 这个文件，如果不存在就会遍历到 `package.json` 中去寻找。

![image-20211201123112000](Ajax%E7%9B%B8%E5%85%B3/image-20211201123112000.png)



在项目中引入 `babel`，通过文件操作层级的 `loader`。

在 `webpack.config.js` 中自定义：

![image-20211201123935562](Ajax%E7%9B%B8%E5%85%B3/image-20211201123935562.png)

- test：通过正则，引入 .js 和 .jsx 格式文件。
- exclude：排除在外的地址，不转换 node_modules 中的文件。
- use：
  - loader：加载方式使用 babel-loader，需要提前 npm 安装 `babel-loader`。

```js
module.exports = {
  module:{
    rules: [
      {
        test: /\.jsx?/,							// 需要转化 .js 和 .jsx 文件
        exclude: /node_modules/,		// 排除 node_modules 地址的文件
        use: {
					loader: 'babel-loader',		// 使用babel-loader加载babel规则
          options: {
            babelrc: false,					// 告知babel，没有babelrc规则文件，babel规则都在这里找
            presets: [							// 引入babel转化规则
              require.resolve('@babel/preset-react'),		// 转化jsx语法
              [require.resolve('@babel/preset-env', {module: false})] //转化高版本JS语法，
            ],													//不转化module规则，因为webpack支持import,export规则
            cacheDirecrtory: ture,			//需要添加缓存，默认是false，添加缓存后可以提升加载速度
          }
      	}
      }
    ]
  }
}
```



## 4.3 html-webpack-plugin

插件的基本作用就是转化并生成 html 文件。

- 为 html 文件中引入的外部资源如 script、link 动态添加每次 compile 后的 hash，防止引用缓存的外部文件问题；
- 可以生成创建 html 入口文件，比如单页面可以生成一个 html 文件入口，配置 N 个 html-webpack-plugin 可以生成 N 个页面入口；

安装：`npm install html-webpack-plugin -d`

配置：在 `webpack.config.js` 中，

1. 引入 `const HtmlWebPackPlugin = require('html-webpack-plugin')`

2. 在 module 中配置：

   ```js
   const HtmlWebPackPlugin = require('html-webpack-plugin')
   const path = require('path')   // 会把所有路径引入，并转化为绝对路径
   
   module.exports = {
     module: {
      // 上面 babel 相关设置在这里
     },
     plugins :[
       new HTMLWebPackPlugin({														// 引入HTMLWebPackPlugin
         template: path.resolve(__dirname, 'src/index.html'),    // 打包的文件地址
         filename: 'index.html'					 // 文件打包完后在目标地址中的名字，通常与原文件名称相同
       })
     ]
   }
   ```

   

import 不想写后缀：

`import ./text.js` node.js 中，默认可以不写 .js 文件后缀，在 webpack.consig.js 中可以配置更多的文件：

```js
module.exports = {
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json']
  }
}
```

指定 jsx 的入口文件：

```js
module.exports = {
  entry: path.resolve(__dirname, 'src/index.jsx')
}
```



## 4.4 wepack-dev-server

webpack-dev-server 是一个小型的node.js Express 服务器。 简单来说，webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为 webpack 打包生成的资源文件提供Web服务。

1.  webpack-dev-server 有两种模式支持自动刷新——iframe模式和inline模式。
   - 在 iframe 模式下：页面是嵌套在一个 iframe 内，在代码发生改动的时候，这个 iframe 会重新加载；
   - 在 inline 模式下：一个小型的 webpack-dev-server 客户端会作为入口文件打包，这个客户端会在后端代码改变的时候动态刷新页面。
2. webpac-dev-server 支持 Hot Module Replacement，即模块热替换，在前端代码变动的时候无需整个刷新页面，只把变化的部分替换掉。使用 HMR 功能也有两种方式：命令行方式和 Node.js API。



使用 HMR 热替换，`webpack.config.js`：

1. 引入 `webpack`

```js
const webpack = require('webpack')
module.exports = {
  // ... 其他文件
  plygins:[
    // ... 其他文件
    ,
    new webpack.HotModuleReplacementPlugin()
  ],
    devServer: {
      hot: true;
    }
}
```

2. 对需要热更新的文件添加配置，在 `index.jsx` 入口文件，添加：

```js
import App from "./App"

if(module.hot) {      // 如果发现module中有hot属性，表明已经设置了热替换，则引入热替换功能
  module.hot.accept( error => {
      if(error) console.log("热替换出BUG了")
    })
}
```

3. `webpack-dev-server --open` 启动服务，查看是否有效果。
   - 在 `scripts` 中，可以配置命令行提升代码效率，不需要再输入一长串的命令了，只需要 `npm run start`：



# 5. webpack 性能优化

1. 打包结果优化

2. 构建过程优化

3. Tree-Shaking



## 5.1 打包体积优化

webpack 自带的压缩方式

1. 安装 `npm install webpack-bundle-analyzer` 可视化 webpack 分析器，打包过程中会出现分析后的页面
2. 在 webpack.config.js 中，开头引入`const TerserPlugin = require('terser-webpack-plugin')`
3. 配置：

```js
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin({
      cache: true,   // 使用缓存，加快构建速度
      parallel： true,   // 开启多线程，提高打包速度
      terserOptions: {
      compress: {			// 	移除无用代码：断点、控制台输出等等
      unsed: true,
      drop_debugger: true, 
      drop_console: true,
      dead_code: true
    }
    }
    })]
  }
}
```



执行后，可以通过 `webpack-bundle-analyzer` 查看哪些文件体积大，然后针对性的优化。

![image-20211201162815017](Ajax%E7%9B%B8%E5%85%B3/image-20211201162815017.png)



WebPack 5 自带。

内部本身就自带 js 压缩功能，他内置了 terser-webpack-plugin 插件，我们不用再下载安装。而且在 mode=“production” 的时候会自动开启 js 压缩功能。

> 如果你要在开发环境使用，就用下面：

```js
  // webpack.config.js中
  module.exports = {
     optimization: {
       usedExports: true, //只导出被使用的模块
       minimize : true // 启动压缩
     }
  }
```



## 5.2 打包速度优化

思路一，减少干活的量：从文件体积上减小。删掉体积大的，用不上的文件，不去打包，比如：

```js
module:{
  rules: [
    {
      exclude: /node_loader/,
    }
  ]
}
```

思路二，增加干活的人：采用多线程打包，可以根据cpu数量构建线程池，有两种常见的库：

- `HappyPack`

- `thread-loader`

思路三，提前干活：预编译一些不常变化的模块。

思路四，缓存：虽然时效性会差，但上次编译过的模块，如果没有修改，应该依然可用。

思路五，使用更好的库，比如：

- `fast-sass-loader`，快速的处理 sass 文件，比 `sass-loader` 速度更快。



## 5.3 Tree-Shaking

webpack 自带的优化方法，顾名思义，摇晃树把不好的树叶都晃下来，这里的实现原理是把文件中的无用代码全部消除。

- 作用：例如定义了一个 util，里面很多公用的方法，但是很多方法没有用到，那么在 dev 环境打包时候，输出文件中就可以看到很多没用到的方法声明，但是在 product 生产环境打包时候，输出文件中就没有这些方法，消除掉这部分没用的代码。



# 6 问题

## 6.1 plugin 是什么

plugin 是节点纬度的操作。某一个事件节点，会触发特定的 plugin。

-   从机制上来说，plugin 基于 **事件监听** 实现。
    -   Webpack 运行的生命周期中会广播出许多事件（钩子），Plugin 可以 **监听事件**，在合适的时机通过 Webpack 提供的 API 改变输出结果。
-   从结果上来说，plugin 是一个 **扩展器 / 拦截器**。
    -   webpack 打包的是基于事件驱动的，plugin 通过监听 webpack 打包过程中的某些节点，从而通过 **回调函数** 执行各种任务。



## 6.2 loader 是什么

loader 是文件纬度的操作。通过 loader 可以将各种格式的文件转化为浏览器可识别的格式。

它具有三个特点：文件加载器、一个函数、单一职责。

-   它是 **文件加载器**。它能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等。

-   它只是 **一个函数**，是一个封装的 JavaScript 模块。它接收其他代码，然后返回将其转化后的结果，并且一个文件还可以链式的经过多个 `loader` 转化（如 ` scss-loader => css-loader => style-loader` ）。

-   一个 `Loader` 的 **职责是单一的**，只需要完成一种转化。如果一个源文件需要经历多步转化才能正常使用，就通过多个 `Loader` 去转化。



## 6.3 区分： loader 和 plugin

loader 是文件维度的操作，将 Webpack 不认识的、多种多样的格式内容转化为认识的、低版本的内容。

- 比如使用 babel 把所有的 js 文件都进行转化，`babel-loader`
- CSS 相关的引入：`css-loader`、`sass-loader`、`sass-loader`
    - `style-loader` 通过动态添加 `style` 标签的方式，引入样式到节点上。
    - `postcss `、`postcss-loader`、`postcss-preset-env` 自动添加CSS3属性前缀
- 导入图片和使用地址：`url-loader`、`file-loader`
- 解析 `.vue` 文件：`vue-loader`



plugin 是节点维度的操作，比如 `index.html` 所谓入口文件，需要引入全部的 js  库等等。插件（Plugin）可以贯穿 Webpack 打包的生命周期，执行不同的任务

- 使用 `html-webpack-plugin`，把打包好的 js 和 css 文件自动引入 HTML 中。

- 使用 `clean-webpack-plugin`，在每次打包前，清空上次打包遗留的历史文件。



## 6.2 Webpack 是什么？

一个现代 JavaScript 应用程序的静态模块打包器

1. 默认：只对 js 进行处理，其他类型文件	需要配置 loader 或者插件进行处理。
2. 打包：将各个依赖文件进行梳理打包，形成一个 JS 依赖文件。



从历史看来，前端正在经历蓬勃发展：

- 更方便的实现 html，出现 jsx
- 更好用的实现 css，出现 sass less
- 更好的模块化开发，出现 AMD，commonJs，ES6
- 把各种新方案应用到支持较旧的浏览器中，出现 babel
- 因为文件格式越来越多样，转化方式越来越多，出现了对打包方式、打包速度等优化的需求。
- Webpack 应运而生，是一个模块打包的解决方案，也是一个融合前端新技术的平台；

只要在 Webpack 中简单配置，就可以使用 jsx、TypeScript、babel 等各种各样的功能，所以，Webpack 是：

- 是前端发展的产物：
- 模块化打包方案；
- 工程化方案。
