# Part_I 状态机

## 1. 总论

浏览器完成整体渲染，需要五个步骤：

![01](images/toy%20browser.assets/01.png)

## 2. 有限状态机

有限状态机 == 状态机。

- 每一个状态都是一个独立的机器。
  - 在每一个机器里，我们可以做计算、存储、输出……
  - 所有的这些机器接受的输入是一致的
  - 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用）
- 每一个机器知道下一个状态
  - 每个机器都有确定的下一个状态（Moore）。摩尔状态机，较简单，程序基本写死了，不受输入影响，不可以做分支。
  - 每个机器根据输入决定下一个状态（Mealy）。米粒状态机，接受不同的输入，可以进入不同的状态中。代码变得复杂，但更灵活。



### 2.1 Mealy 状态机

state变量，永远表示当前状态 return一定有多个：是根据不同的 `input`，在 **if ... else** 中，决定返回

```jsx
// 用一个函数，定义一个状态
function state(input) {   // 参数就是输入
	// 函数体中，编写状态代码。根据输入，处理每个状态的逻辑。
	return next;   // 返回值作为下一个状态。
}

///////// 调用 /////////
while(input) {
	// 获取输入
	state = state(input)  // 把状态机的返回值作为下一个状态
}
```



# Part_II 实现 toy browser

## 1. HTTP请求

**最终实现：01_requese-response**

定义了 client 和 server 两个文件：

- `server`：利用 `node.js` 实现了一个简易版的服务器，用以监听 client 的 请求 Request，并给一个固定的 Response。
- `client`：构建请求 Request，并发送给 server；然后监听并接受 server 发来的 Response，同时对这个 Response 进行解析。



### 引子1：HTTP 协议的解析

![网络7层结构](images/toy%20browser.assets/%E7%BD%91%E7%BB%9C7%E5%B1%82%E7%BB%93%E6%9E%84.png)



**TCP 层**

- 流：TCP的数据，没有明显的分割范围，数据是按照顺序规范的。
- 端口：网卡根据端口，把接到的数据流，分发到需要的程序接口。
- require('net')；：node中对应的依赖库。

**IP 层**

- 包：传输的数据，是数据包为一个单位。根据网络情况，可大可小。
- IP地址：路由根据地址，分发数据包，最终达到目的网卡。
- libnet / libpcap：node中不需要负责IP，调用底层 C++的库。
  - libnet：封装IP数据报，并发送。
  - libpcap：提取网卡中的IP数据报（流经该路由的，目的地不是这里的IP包也可以抓取）。

**HTTP 协议**

客户端、服务端的 Request Responce 是一呼一应，相互对应的。

- Request：客户端最先发起。
- Response：服务端接收Request后，执行Response回应。



### 引子2：服务端环境准备

  server.js，需要接收 require 的三种信息：

`on` 监听报错、开始接受数据、完全接受数据时回调。

- on error：直接打印 error
- on data：
  - 当服务端接收到数据时触发
  - 数据保存到 body 数组中。
- on end
  - 数据接收完时触发
  - 用 `concat`，把数组中的内容拼起来。
  - 打印一下查看。
  - `response` 回复一个值，这里做测试用写死了。 writeHead，end



`http` 模块提供两种使用方式：

- 作为服务端使用时，创建一个HTTP服务器，监听HTTP客户端请求并返回响应。
- 作为客户端使用时，发起一个HTTP客户端请求，获取服务端响应。



`createSrever` 可以创建一个服务器，然后调用 `.listen` 方法监听端口。这是一个事件机制，每当收到一个客户端请求，就会调用里面的回调函数。

- 回调函数接收两个参数 `request, response` 。

```jsx
const http = require('http');

http.createServer((request, response) => {
    let body = [];
    request.on('error', (err) => {
        console.log(err);
    }).on('data',(chunk) => {
        body.push(chunk.toString());
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log("body:", body);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(' Hello World\n');
    });
}).listen(8088);

console.log("server started");
```



Http协议是一个文本协议，所以他的下层：Tcp协议中，相对应的“流”，其内容都可以看作是 string 字符串。

Http Request的三大结构：

- 请求行、请求头、请求体：
  - Request line：一行长度，method 方法 + path 地址 + HTTP 协议名 + 版本号
  - headers：长度不固定，是 KV 对，以一个 “空行” 表示结束。
  - body：是 KV 对，内容由 headers 的 Content-Type 字段决定。


![image-20201223112047125](images/toy%20browser.assets/image-20201223112047125.png)



### 第一步：实现一个 HTTP请求

`Request` -- `Response`：请求 -- 响应



`client.js`

```jsx
void async function (){
    // 实例化一个 request 类
    let request = new Request({
        mathod: "POST",
        host: "127.0.0.1",   // IP层
        port: "8088",        // Tcp层
        path: "/",
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name: "Moxy"
        }
    });

    // 异步发送 request，并等待结果 response
    let response = await request.isReloadNavigation();

    console.log(response);
}
```

实现一个 HTTP Request 请求。

请求结束，会调用 `send` 方法，返回一个 `promise`，`promise` 成功之后，会得到一个 `response` 对象。

- 在使用立即执行的函数表达式时，可以利用 void 运算符让 JavaScript 引擎把一个 `function` 关键字识别成函数表达式而不是函数声明（语句）。
  - 不然是个匿名的函数声明，会报错，加上void会形成语句并调用。
- 使用 `void` 要比在 `function` 外层加  ( ) 好，可以避免因为上一语句结尾没带分号导致的语法合并错误。



调试 node.js，会创建 .vscode 隐藏文件，创建 launch.json 

![image-20201223180143982](images/toy%20browser.assets/image-20201223180143982.png)

**总结：**

设计一个 HTTP 请求

- 设计一个 HTTP 请求的类
- content type 是一个必要的字段，要有默认值
- body 是 KV 格式
- 不同的 content-type 影响 body 的格式



### 第二步：response 格式 + send() 函数

class ResponseParser，**逐步接受 response文本**，并且进行分析。

**总结：**

send 函数

- 在 Request 的构造器中收集必要的信息。
- 设计一个 send 函数，把请求真实发送到服务器。
- send函数应该是异步的，所以返回 Promise。



### 第三步： 发送请求

#### 了解：response 格式

三部分组成：响应行、响应头、响应体。

- status line：HTTP版本号、HTTP状态码、HTTP状态文本 ==>（HTTP/1.1 200 OK）
  - 服务器状态码：
    - 500系列：服务器内部错误
    - 404：找不到网页
    - 200：获取到网页
    - 301、302、304：其他常见状态码
- headers + 空行
- body：由 headers 中的 Content-Type 决定
  - 这里是 node 最常见的 chunked body 格式：
    - 开头是一个 16 进制数字单独占一行；
    - 内容部分，多行。
    - 最后是一个 16进制的 0 单独占一行，表示结尾。


![image-20201223211743336](images/toy%20browser.assets/image-20201223211743336.png)



客户端准备发送请求：`send(connection)`

- 构建一个 `connection` ，如果没有就默认创建一个 `connection` 参数。
- 收到数据，传给 `parser`
- 根据 `parser` 的状态，`resolve Promise`。



`this.toString()` 构建的请求内容，是一个长的 `string`：

- 请求行（单行），请求头，空行，请求体

![image-20201223221801700](images/toy%20browser.assets/image-20201223221801700.png)



`data.toString()` 接受返回的响应内容，是一个长的 `string`：

- 响应行（单行），响应头，空行，响应体（开头一个16进制数字，中间是内容，结尾是一个0）

![image-20201223223036780](images/toy%20browser.assets/image-20201223223036780.png)



#### 补充：转义字符

JavaScript 中的常见转义字符：

| 转义序列 | 字符                                    |
| -------- | --------------------------------------- |
| `\b`     | 退格（BS 或 ASCII 符号 0x08 (8)）       |
| `\f`     | 换页（FF 或 ASCII 符号 0x0C (12)）      |
| `\n`     | 换行（LF 或 ASCII 符号 0x0A (10)）      |
| `\r`     | 回车（CR 或 ASCII 符号 0x0D (13))       |
| `\t`     | 水平制表符（HT 或 ASCII 符号 0x09 (9)） |
| `\'`     | 单引号                                  |
| `\"`     | 双引号                                  |
| `\&`     | &     and 符号                          |
| `\\`     | 反斜杠                                  |

换行（`\n`）和回车（`\r`）的区别：

来自打字机，以前的打字机要新起一行的时候有两步:   

1.  打字的机头回到开始位置,这就是 **回车**  `\r` ；
2.  纸张往上推进一行,这就是 **换行** `\n`  。

所以，`\r\n` 也就是 回车+换行，在HTML中表示一个真正的 **“切换到下一行”**。



题外话，写代码报错了：

- `Uncaught SyntaxError: Unexpected identifier` 异常，通常就是语法错误：
  - 导致的问题，就是在调试的过程中，打断点会不起作用；
  - 标点符号错了（逗号，点）；
  - 字符串类型的值没有加双引号；
  - 我找到的错误：`net.XXX`，写成了 `new.XXX`。



#### 总结

发送请求

- send 需要传递一个参数 connection，该参数用于：

  - `write` 属性存放了发送请求的内容；
  - `on` 方法监听发送请求的状况：“data” 表示正在接受数据，“error” 表示发生错误
  - `end` 方法用于断开 connection 链接。

- send 的方法要设计并支持传递一个已经建立好的 connection，如果没有传递就构建一个；

- send 中，收到数据是一个持续的过程，每当收到数据后，就传递给 parser 去解析；

- 如果 parser 解析完毕，`parser.isFinished` 就会为 `true`，此时便把 `parser.response` 的值，做为本次 `send` 的 `promise resolve` 结果返回

  

###  第四步：Response 解析（line+header）

**总结**

- `Response` 必须分段构造，所以我们要用一个 `ResponseParser` 类来“装配”；
- `ResponseParser` 分段处理 `ResponseText`，我们用状态机来分析文本结构。

在 `ResponseParser` 中：

- `receive` 负责遍历接收到的那个一长串字符串，通过 for 遍历，然后对每个提取的 char 调用 `receiveChar(char)` 去解析这个字符。
- `receiveChar(char)` 每当接收一个 char 字符就调用receiveChar判断状态，然后切换状态，或者接收字符。



状态机的基本工作原理：

1. 定义一些状态，通过定义的不同状态，把一长串字符串切割为一组组对应的数据；

2. 每个状态都需要特定的条件去触发，如一旦字符串遇到 `\r` +  `\n` 就表明响应行结束，响应头开始等等；

   - 所有状态都是通过 if ... else if ... 去判断并切换的。

   - 当进入某一个状态时，规则是先判断当前字符是否会触发进入下一个状态，如果不是，就对这个字符执行赋值操作，比如：

     ```jsx
     // 在这个片段是进入响应行的 key 字段判断。
     // current是当前字符，会先判断是否是进入下一个状态的标记 ':'（key字段结束），或者是下一个状态 '\n' 标记（K/V两个字段都结束）。
     // 如果是，就进入对应的下一个状态；如果不是，则该字符依然是 key 的内容，把当前字符加到 headName 属性中。
     if (char === ":") {
         this.current = this.WATTING_HEADER_SPACE;
     } else if (char === "\r") {
         this.current = this.WATTING_HEADER_BLOCK_END;
     } else {
         this.headName += char;
     }
     ```

`ResponseParser` 代码：

```jsx
class ResponseParser{
    constructor(){
        // status line 有 \r 和 \n 两个状态。
        this.WATTING_STATUS_LINE = 0;
        this.WATTING_STATUS_LINE_END = 1;
        // header name输入状态，name冒号后等待空格，value，header line end 四个状态
        this.WATTING_HEADER_NAME = 2;
        this.WATTING_HEADER_SPACE = 3;
        this.WATTING_HEADER_VALUE = 4;
        this.WATTING_HEADER_LINE_END = 5;
        // header之后，还要等一个空行。
        this.WATTING_HEADER_BLOCK_END = 6;  
        // body 格式不固定，所以这里不判断。
        this.WATTING_BODY=7;

        this.current = this.WATTING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {}
        this.headName = "";
        this.headValue = "";
    }

    receive(string){
        for (let i=0; i<string.length;i++){
            this.receiveChar(string.charAt(i));
        }
    }
    receiveChar(char){
        if(this.current ===  this.WATTING_STATUS_LINE){
            if(char === '\r')
                this.current = this.WATTING_STATUS_LINE_END;
            else
                this.statusLine += char;
        }else if(this.current ===  this.WATTING_STATUS_LINE_END){
            // console.log(string.charAt(i))
            // this.statusLine.push(char);
            if(char === '\n'){
                this.current = this.WATTING_HEADER_NAME;
           }
        }else if(this.current === this.WATTING_HEADER_NAME){
            // console.log(char);
            if(char === ':'){ 
                this.current = this.WATTING_HEADER_SPACE;
            }else if(char === '\r'){
                this.current = this.WATTING_HEADER_BLOCK_END;
            }else{
                this.headName += char;
            }
        }else if(this.current === this.WATTING_HEADER_SPACE){
            if(char === ' '){
                this.current = this.WATTING_HEADER_VALUE;
            }else{
                this.statusLine += char;
            }
        }else if(this.current === this.WATTING_HEADER_VALUE){
            if(char === '\r'){
                this.current = this.WATTING_HEADER_LINE_END;
                this.headers[this.headName] = this.headValue;
                this.headName = ''
                this.headValue = ''
            }else{
                this.headValue += char;
            }
        }else if(this.current === this.WATTING_HEADER_LINE_END){
            if(char === '\n'){
                this.current = this.WATTING_HEADER_NAME;
            }
        } else if(this.current === this.WATTING_HEADER_BLOCK_END){
            if(char === '\n'){
                this.current = this.WATTING_BODY;
            }
        }else if(this.current === this.WATTING_BODY){
            this.bodyParser.receiveChar(char); 
            // if(this.current === )
          
        } 
    }
}
```



### 第五步：Response 解析 (body)

**总结：**

- `Response` 的 `body` 可能根据 `Content-Type` 有不同的结构，因此我们会采用子`Parser` 的结构的解决问题
- 以 `TrunkedBodyParser` 为例，我们同样用状态机来处理 `body` 的格式。


`TrunkedBodyParser` 的实例化时机：

```jsx
this.current = this.WATTING_HEADER_BLOCK_END;
// WATTING_HEADER_BLOCK_END 状态时，表明所有 header 都接受完毕。
// 在这里要先找一下Transfer-Encoding字段的值，来确定响应体中内容结构。
// 这里toy browser就写死使用 node 默认的 chunked 格式。
// 创建一个 TrunkedBodyParser 实例来接收即将到来的响应体。
if (this.headers["Transfer-Encoding"] === "chunked")
    this.bodyParser = new TrunkedBodyParser();
```

`bodyParser` 的调用时机：

```jsx
if (this.current === this.WATTING_BODY) {
    // 当状态机切换到 body 中时，
    // 把 char 传递给 TrunkedBodyParser的实例化对象 bodyParser 去处理
    // 全部的 char 都调用 bodyParser的receiveCha方法去处理
    this.bodyParser.receiveChar(char);
```

`TrunkedBodyParser` 类的定义中，关于16进制数字的转化：

```jsx
// chunked 的 length 是十六进制，这这行代码转化为10进制。
// 读取第一个值时，length为null，*16无效；
// 但如果读取第二个以上的值，每当有新的值加入，就会把旧的值乘16，然后把新加入的值放到个位数中。
this.length *= 16;
this.length += parseInt(char, 16);
```



最终的完整 parse：

```js
{
  StatusCode: '200',
  StatusText: 'OK',
  headers: {
    'Content-Type': 'text/html',
    Date: 'Wed, 17 Nov 2021 13:13:58 GMT',
    Connection: 'keep-alive',
    'Keep-Alive': 'timeout=5',
    'Transfer-Encoding': 'chunked'
  },
  body: ' Hello World\n\r\n'
}
```



问题： 最后 `console.log(response)` 不打印

- 原因：没有添加 get isFinished() 和 get response() 这两个方法。没有把状态机解析到的数据整合到 response 中返回。
- 如果发现 node 程序有些地方“不执行”的问题，肯定是自己的代码出现了问题，要找逻辑结构哪里落下了，或者哪个字符和标点敲错了。



## 2 HTML 解析

浏览器完成整体渲染，需要五个步骤：

![image-20201224173554802](images/toy%20browser.assets/image-20201224173554802.png)

今天要做的就是第二步，HTML 进过 parse 变成 DOM 树。

- 简略：实际上 Response 中的 body 是异步分段发送给浏览器的，浏览器的网络进程接收到一部分 body 字段，就通过进程间通信交给渲染进程，渲染进程进行同步渲染。这里一次性返回了全部 line + header + body 内容，简化了流程。



### 第一步：HTML parse 模块的文件拆分

- 为了方便文件管理，我们把 `parser` 单独拆到文件中
- `parser` 的作用：接受 `HTML` 文本作为参数，返回一颗 `DOM` 树，解析 HTML。

这里服务器发来 body 解析为一个字符串，结构是：

```js
`<html lang="en"> <head><title>test</title>
    <style>
      body #p1{color:#0f0;}
      div,p{padding:0;margin:0}
      p{width:30px;text-algin:center;font-size:24px;}
    
      </style>
    </head>
    <body>
    <img src="1.jpg"/>
    <p id="p1"></p>
    <div>Hello world!</div>
    </body>
    </html>`
```



### 第二步：用 有限状态机 FSM 实现 HTML 的分析

网址：html.spec.whatwg.org/multipage/

- 12.2.5 Tokenization 讲了 HTML的词法，是通过状态机描述的，可以直接获取。

- 用 FSM 实现 HTML 的分析
- 在 HTML 标准中，已经规定了 HTML 的状态
- Toy Browser 只挑选其中一部分状态，完成最简版本。



`parseHTML(html)` 用来解析 html 字符串，就是第一步的结构。

- state 表示当前状态，data 为开始解析，EOF 唯一字符为结束解析。



### 第三步：解析标签

- 标签有三种：开始标签、结束标签、自封闭标签。本步骤用状态机实现对三种标签的解析和识别。

- 根据标签的种类，设置对应的状态机。

```js
const EOF = Symbol("EOF"); // 文件终结

function data(c) {}

// 解析HTML，传入 html 参数为一个 .html 结构，最终转化为 dom 树。
module.exports.parseHTML = function parseHTML(html) {
  // 初始化状态是 data 状态，所以 state 最初赋值为 data
  let state = data;
  // 遍历 html 中的每一个元素，html是一个 string 可遍历
  // 然后执行 state(c)，进入每一个状态；返回下一个状态，等待执行。
  // 每一个状态都是一个高阶函数，返回另一个状态函数。
  for (let c of html) {
    state = state(c);
  }
  // 文件的终结字符必须是唯一的，采用 EOF Symbol。
  state = state(EOF);
};
```



### 第四步：创建元素

- 在状态机中，除了迁移状态，还要加入业务逻辑。
  - 创建 `token`，把字符加到 `token` 上，然后输出 `token`：`emit token`。
  - `currentToken` 用来保存获取的完整标签名，最后集中 `emit` 出去。
- 在结束标签的结束状态，提交标签 `token`。

 

### 第五步：处理属性

- 属性值氛围单引号、双引号、无引号三种写法，因此需要较多状态处理。

- 处理属性的方式跟标签类似，用一个 `currentAttribute` 暂存属性的 KV；

- 属性结束时，我们把属性加到标签 Token 上。 

  比如：

  ```js
  // 以下是每一个 currentToken
  {type: 'startTag', tagName: 'html', lang: 'en'}   // leng: 'en'，就是html的属性KV
  {type: 'startTag', tagName: 'head'}
  {type: 'startTag', tagName: 'title'}
  {type: 'text', content: 't'}
  {type: 'text', content: 'e'}
  {type: 'text', content: 's'}
  {type: 'text', content: 't'}
  ```



### 第六步：用token构建DOM树   <== 栈

![image-20211118102926234](images/toy%20browser.assets/image-20211118102926234.png)         ![image-20220630212008658](images/toy%20browser.assets/image-20220630212008658.png)

在 HTML 结构中任何元素的父元素，反映到栈结构中，就是它入栈前的栈顶（有多个）；



- 从标签构建 DOM 树的基本技巧是使用 **栈**；
- 遇到开始标签时创建元素并入栈，遇到结束标签时出栈；
- 遇到连续的文本节点，就全部合并到一起。
- 自封闭节点可视为入栈后立即出栈；



### 第七步：将文本节点加到DOM树

- 文本节点与自封闭标签处理类似，入栈后立刻出栈。
- 多个文本节点如果相连，需要合并。



服务器端传过来的内容（一整个字符串）：

```js
`<html lang="en"> <head><title>test</title>
    <style>
      body #p1{color:#0f0;}
      div,p{padding:0;margin:0}
      p{width:30px;text-algin:center;font-size:24px;}
    
      </style>
    </head>
    <body>
    <img src="1.jpg"/>
    <p id="p1"></p>
    <div>Hello world!</div>
    </body>   
    </html>`
```



最终生成的 DOM 树（最外层包裹了一个 document 对象）：

![image-20211118112053488](images/toy%20browser.assets/image-20211118112053488.png)







## 3 CSS计算 CSS Computing

  ![image-20211118112247760](images/toy%20browser.assets/image-20211118112247760.png)

准备：环境准备 `npm install css`

- 是一个现成的 css paser，把 css 语法转换成 AST 抽象语法树。
- 本环节的工作是把 ATS 运用到 DOM 树上。
- 只考虑内联和 style 中的标签。



### 第一步：收集 CSS 规则

为什么要把对 CSS 规则的收集加在 endTag 环节：因为只有识别到 style 的 endTag 标签时，才能完整的摘取标签内的所有文本节点。这些文本节点就是要收集的 CSS 规则。

- 遇到 style标签时，我们把CSS规则保存起来。
- 我们调用 CSS Parser 来分析 CSS规则（现成的）。
- 我们必须要仔细研究此库分析 CSS规则的格式。

```js
let ast = css.parse(text);
console.log(JSON.stringify(ast, null, "    "));
```

使用 css 转换后生成 ast 抽象语法书，通过 `stringify` 展现这个结构： 

![image-20211118123049241](images/toy%20browser.assets/image-20211118123049241.png)

下文是删除了 `position` 字段的 `rules`，这就是接下来将要 compute CSS 所用到的规则。

- `body #p1`，空格隔开，直接放到一个属性值中，接下来的 `match` 计算中需要我们自己拆开；
- `div,p`，逗号隔开，分别放到了两个属性值中，这是规定了两个不同元素的 CSS 规则。

```js
"rules": [
    {
        "type": "rule",
        "selectors": [
            "body #p1"
        ],
        "declarations": [
            {
                "type": "declaration",
                "property": "color",
                "value": "#0f0",
            }
        ],
    },
    {
        "type": "rule",
        "selectors": [
            "div",
            "p"
        ],
        "declarations": [
            {
                "type": "declaration",
                "property": "padding",
                "value": "0",
            },
            {
                "type": "declaration",
                "property": "margin",
                "value": "0",
            }
        ],
    },
    {
        "type": "rule",
        "selectors": [
            "p"
        ],
        "declarations": [
            {
                "type": "declaration",
                "property": "width",
                "value": "30px",
            },
            {
                "type": "declaration",
                "property": "text-algin",
                "value": "center",
            },
            {
                "type": "declaration",
                "property": "font-size",
                "value": "24px",
            }
        ],
    }
]
```



### 第二步：应用 CSS 规则

本步骤主要是分析计算每个 CSS 规则的时机。

-  当我们创建一个元素的时候，就会立即计算 CSS。也就是该元素是否有 CSS 规则进行限制的判断时机是在 `startedTag` 阶段。
-  理论上，当我们分析一个元素时，所有的 CSS 规则已经收集完毕（在 hear 的 style 标签中收集）。
-  在真实的浏览器中，可能遇到写在 body 的 style 标签，需要重新执行 CSS 计算的情况，这里先忽略。



### 第三步：获取父元素序列

父元素序列，就是当前元素的一层层的所有父元素形成的序列。

- 在 computeCSS 函数中，我们必须知道所有的父元素才能判断元素与规则是否匹配。因为选择器有子孙选择器，父选择器。比如CSS规则：`div #id span{..}`，则 当前 `span` 元素必须有 `#id` 父元素，也必须有 `div` 父元素。
- 我们从上一步骤的 stack，可以获取本元素所有的父元素。
- 因为我们首先获取的是“当前元素”，所以我们获得和计算计算父元素匹配的顺序是从内向外。

```js
// 计算 CSS 规则
function computeCSS(element) {
  // stack是不断变化的，利用 slice 浅拷贝一份，concat 也行
  // reverse 是从当前元素开始往外层匹配的，所以要翻转一下
  let elements = stack.slice().reverse();
}
```



### 第四步：选择器与元素的匹配

- 选择器也要从当前元素从内向外排列，使用 `reverse`
- 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列。

列出服务器端发送过来的 HTML 内容：

```html
<html lang="en"> 
  <head>
    <title>test</title>
    <style>
      body #p1{color:#0f0;}
      div,p{padding:0;margin:0}
      p{width:30px;text-algin:center;font-size:24px;} 
    </style>
  </head>
  <body>
    <img src="1.jpg"/>
    <p id="p1"></p>
    <div>Hello world!</div>
  </body>   
</html>
```



### 第五步：匹配算法 match：选择器与元素匹配

  根据选择器的类似和元素属性，计算是否与当前元素匹配

- 这里实现了三种基本选择器（id、class、tagName）、`class` 带 空格 的选择器。

下文是实现范例，可以先跳过。

```jsx
//////// 正则方法 ////////
function match(element, selctor) {
    if (!selctor || !element || !element.attributes) return false;
    if (selector.match(/^\#\w|\#\w[\n\t\f ]\.\w|\#\w[\n\t\f ]\w$/)) {
        let attr = element.attributes.filter(a => a.name === 'id')[0];
        if (attr && attr.value === selctor.replace("#", '')) {
            return true;
        }
    } else if (selctor.match(/^\.\w|\#\w[\n\t\f ]\.\w|\#\w[\n\t\f ]\w$/)) {
        let attr = element.attributes.filter(a => a.name === 'class')[0];
        if (attr && attr.value === selctor.replace(".", '')) {
            return true;
        }
    } else {
        if (element.tagName === selector) {
            return true;
        } else if (selector.match(/^\w|\w[\n\t\f ]\#\w|$\w[\n\t\f ]\.\w$/)) {
            return true;
        }
    }
    return false;
}

////////////状态机方法 ////////////
function match(element, allSelector) {
    if (!allSelector || !element.attributes) {
        return false;
    }
    let tagSelector = [];
    let idSelector = [];
    let classSelector = [];
    let start = selectorStart;
    let currentSelectorName = "";
    for (let c of allSelector) {
        start = start(c)
    }
    start(EOF);

    function selectorStart(c) {
        if (c === '.') {
            return classSelectorName;
        } else if (c === '#') {
            return idSelectorName;
        } else if (c === EOF) {
            return;
        } else {
            return selectorName(c)
        }
    }

    function classSelectorName(c) {
        if (c === '.' || c === '#' || c === EOF) {
            classSelector.push(currentSelectorName);
            return selectorStart(c);
        } else {
            currentSelectorName += c
            return classSelectorName;
        }
    }

    function idSelectorName(c) {
        if (c === '.' || c === '#' || c === EOF) {
            idSelector.push(currentSelectorName);
            currentSelectorName = "";
            return selectorStart(c);
        } else {
            currentSelectorName += c
            return idSelectorName;
        }
    }

    function selectorName(c) {
        if (c === '.' || c === '#' || c === EOF) {
            tagSelector.push(currentSelectorName);
            currentSelectorName = "";
            return selectorStart(c);
        } else {
            currentSelectorName += c
            return selectorName;
        }
    }
    let count = 0;
    if (idSelector.length != 0) {
        let attr = element.attributes.filter(attr => attr.name === "id")[0]
        if (attr) {
            let ids = attr.value.split(" ")
            for (let i = 0; i < idSelector.length; i++) {
                if (ids.includes(idSelector[i])) count++;
            }
        }
    }
    if (classSelector.length !== 0) {
        let attr = element.attributes.filter(attr => attr.name === "class")[0]
        if (attr) {
            let classNames = attr.value.split(" ")
            for (let i = 0; i < classSelector.length; i++) {
                if (classNames.includes(classSelector[i])) count++;
            }
        }
    }
    if (tagSelector.length !== 0) {
        if (element.tagName === tagSelector[0]) {
            count++;
        }
    }
    let sumLength = idSelector.length + classSelector.length + tagSelector.length
    return count === sumLength

}
```



### 第六步：生成 computed 属性

当某条 CSS 规则的选择器和某个元素匹配成功后，`matched === true` 就把该条 CSS 属性的具体规则生成为一个 `computedStyle`。

- 需要先取出该元素的 `computedStyle = element.computedStyle`，然后在此基础上修改这个新的 `computedStyle ` 以免把之前放置进去的规则删掉。



### 第七步：specificity 的计算逻辑

- `priority`：优先级
- `specificity`：特征、专一性

```css
/* 规则的优先级，要按照优先级顺序来判断是否运用该规则。 */
 [0,	0,		0,		0]
inline	id    class	 tagName
```

比如当前有两条规则去修改某一元素的 CSS：

```css
div div #id { ... }

div #my #id { ... }
```

第一条规则的 `specificity` 值为 `[0, 1, 0, 2]` ，合计 `102`；

第二条规则的 `specificity` 值为 `[0, 2, 0, 1]` ，合计 `201`；

采用进位制比较，从最左边位数往右比，某个位置一旦能比出大小，就能得出结论，不再比右边的数字。

- CSS 规则是根据 `specificity` 和后来优先规则覆盖。
- specificity 是个四元组，越左边权重越高（开头已说）。
- 一个 CSS 规则的 `specificity` 根据包含的简单选择器相加而成。



插曲：使用 `JSON.stringify(dom, null, "   ")` 时，发现有循环引用的问题，无法正确输出，查到如下代码可以解决循环引用的问题：

- [JSON.stringify出现 “Converting circular structure to JSON” | OECOM](https://www.oecom.cn/json-stringify-error/)

缓存中保存所有遇到的 `object`，每次添加一个 `object` 到 `cache` 中时，就判断 `cache` 中是否已经保存过该对象，如果保存过，则丢弃该对象。

```js
function JSONToStr(str) {
  var cache = [];
  var str = JSON.stringify(dom, function (key, value) {
    if (typeof value === "object" && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // 移除，或者对这个值进行基本处理。
        return;
      }
      // 收集所有的值
      cache.push(value);
    }
    return value;
  });
  cache = null; // 清空变量，便于垃圾回收机制回收
  return str;
}
```



### 最终生成的 DOM 树

服务器发来的HTML文件：

```js
`<html lang="en">
        <head>
            <title>test</title>
        <style>
            body #p1{color:#0f0;}
            div,p{padding:0;margin:0}
            p{width:30px;text-algin:center;font-size:24px;}
            div body{padding:20px}
        </style>
    </head>
    <body>
        <img src="1.jpg"/>
        <p id="p1"></p>
        <div>Hello world!</div>
    </body>   
    </html>`
```



最终生成的 DOM 树，保存在文件 `DOMWithCSS.js` 中：

```jsx
let dom = {
  type: "document",
  children: [
    {
      type: "element",
      children: [
        {
          type: "text",
          content: "\n        ",
        },
        {
          type: "element",
          children: [
            {
              type: "text",
              content: "\n            ",
            },
            {
              type: "element",
              children: [
                {
                  type: "text",
                  content: "test",
                },
              ],
              attributes: [],
              tagName: "title",
              computedStyle: {},
              parent: {
                tageName: "head",
                type: "element",
              },
            },
            {
              type: "text",
              content: "\n        ",
            },
            {
              type: "element",
              children: [
                {
                  type: "text",
                  content:
                    "\n            body #p1{color:#0f0;}\n            div,p{padding:0;margin:0}\n            p{width:30px;text-algin:center;font-size:24px;}\n            div body{padding:20px}\n        ",
                },
              ],
              attributes: [],
              tagName: "style",
              computedStyle: {},
              parent: {
                tageName: "head",
                type: "element",
              },
            },
            {
              type: "text",
              content: "\n    ",
            },
          ],
          attributes: [],
          tagName: "head",
          computedStyle: {},
          parent: {
            tageName: "html",
            type: "element",
          },
        },
        {
          type: "text",
          content: "\n    ",
        },
        {
          type: "element",
          children: [
            {
              type: "text",
              content: "\n        ",
            },
            {
              type: "element",
              children: [],
              attributes: [
                {
                  name: "src",
                  value: "1.jpg",
                },
                {
                  name: "isSelfClosing",
                  value: true,
                },
              ],
              tagName: "img",
              computedStyle: {},
              parent: {
                tageName: "body",
                type: "element",
              },
            },
            {
              type: "text",
              content: "\n        ",
            },
            {
              type: "element",
              children: [],
              attributes: [
                {
                  name: "id",
                  value: "p1",
                },
              ],
              tagName: "p",
              computedStyle: {
                color: {
                  value: "#0f0",
                  specificity: [0, 1, 0, 1],
                },
                padding: {
                  value: "0",
                  specificity: [0, 0, 0, 1],
                },
                margin: {
                  value: "0",
                  specificity: [0, 0, 0, 1],
                },
                width: {
                  value: "30px",
                  specificity: [0, 0, 0, 1],
                },
                "text-algin": {
                  value: "center",
                  specificity: [0, 0, 0, 1],
                },
                "font-size": {
                  value: "24px",
                  specificity: [0, 0, 0, 1],
                },
              },
              parent: {
                tageName: "body",
                type: "element",
              },
            },
            {
              type: "text",
              content: "\n        ",
            },
            {
              type: "element",
              children: [
                {
                  type: "text",
                  content: "Hello world!",
                },
              ],
              attributes: [],
              tagName: "div",
              computedStyle: {
                padding: {
                  value: "0",
                  specificity: [0, 0, 0, 1],
                },
                margin: {
                  value: "0",
                  specificity: [0, 0, 0, 1],
                },
              },
              parent: {
                tageName: "body",
                type: "element",
              },
            },
            {
              type: "text",
              content: "\n    ",
            },
          ],
          attributes: [],
          tagName: "body",
          computedStyle: {},
          parent: {
            tageName: "html",
            type: "element",
          },
        },
        {
          type: "text",
          content: "   \n    ",
        },
      ],
      attributes: [
        {
          name: "lang",
          value: "en",
        },
      ],
      tagName: "html",
      computedStyle: {},
      parent: {
        type: "document",
      },
    },
    {
      type: "text",
      content: "\r\n",
    },
  ],
};
```



## 4. 排版 layout

![image-20201227145132517](images/toy%20browser.assets/image-20201227145132517.png)

### 第一步：根据浏览器属性进行排版

使用 Flex 排版技术进行排版。

![image-20211118200822141](images/toy%20browser.assets/image-20211118200822141.png)

如果主轴 Main Axis是横轴，则对应的属性有：

- flex-direction: row
  - Main 方向的属性：width，x，left，right
  - Cross方向的属性：height，y，top，bottom

 

如果主轴 Main Axix是竖轴，则对应的属性有：

- flex-direction：column
- Main 方向的属性：height，y，top，bottom
- Cross 方向的属性：width，x，left，right



确定调用 layout 进行排版的时机：

- 在 `emit` 中进入 `endTag`  判断时，此 element 已经成型。当一个 element 被识别完毕，就应当把这个 element 排版。



一个元素的位置，是通过 6 个属性决定的：

就左右宽度而言：`width`, `left`, `right`

就上下高度而言：`height`, `top`, `bottom`





### 第二步：收集元素进行(háng)

![image-20211118203718900](images/toy%20browser.assets/image-20211118203718900.png)

![image-20211118203737913](images/toy%20browser.assets/image-20211118203737913.png)

![image-20211118203747840](images/toy%20browser.assets/image-20211118203747840.png)

分行

- 根据主轴尺寸，把元素分进当前行中：
  - 如果当前行的剩余尺寸不足以容纳当前元素，就新建一个当前行，把元素放入下一个当前行中。
  - 每当放进一个新的元素，就要
    - 计算行的剩余空间；
    - 计算行的高度，高度应当是所有子元素的最高。
- 若设置了 `no-wrap`，则强行分配进第一行，不会新建当前行，然后压缩空间。



### 第三步：计算主轴

![image-20211118222912757](images/toy%20browser.assets/image-20211118222912757.png)

![image-20211118222934245](images/toy%20browser.assets/image-20211118222934245.png)



计算主轴的方向：

- 找出所有带有 flex 属性的子元素：
  - 如果有 flex 子元素，则把剩余空间分配给这些子元素；
  - 如果没有，则参考 父容器的 `justifyContent` 属性去决定剩余空间的排布。
    - `flex-start`, `flex-end`, `center`,     `space-between`, `space-around`, `space-evenly`。
    - 从左往右，从右往左，全部居中（剩余空间两边平均分配）
    - 元素之间间隔相同，容器两端没有空隙；剩余空间平均分配给元素两遍，容器两端的间隔是元素之间间隔的一半；两端和元素之间的空隙全部平均分配。

- 因为只支持 flex 为单个参数，所以若剩余空间为负数（不允许折行），所有 flex 元素为 0，等比压缩剩余元素



### 第四步：计算交叉轴

![image-20211119105219808](images/toy%20browser.assets/image-20211119105219808.png)



计算交叉轴的方向：

- 判断容器是否定义了 `crossSize` 总高度：
  - 如果没有定义，就遍历每一行的高度，然后加起来撑起来容器高度；
    - 每一行的行高，就是每一行中最大元素的高度，这个在上面元素入行是已经计算出来。

  - 如果定义了总高度，就根据 `align-content` 判断如何分配剩余空间：
    - `start`、 `center`、`space-between`、`space-around`、`stretch` 
    - 从头往下排、居中（剩余空间上下等分）、每行间距相等、每行上下分配相等的空间（每行间距相等，容器两端间距是每行间距的一半）、每行等比例拉伸填满

  - 确定了容器内整体行高剩余空间的分配，还要进一步确定每一行中较低的元素是如何分配每一行中的剩余空间。因为每一行的高度是被该行最高元素撑开的，则较低元素需要解决剩余空间的分配问题。
    - 行高 `flex-align` 和 `item-align`，确定单个元素的具体位置：
      - `align-self` ：`stretch`、`center`、`start`、`end`，拉伸以填满高度、居中、顶部、底部
      - `align-items`：与 `self` 不同 `items` 是直接定义父 flex 容器盒子上的，一次性修改全部的 flex item。
      - `self` 的优先级更高，指定的范围更小。




### 最终排版的 DOM 树

服务器发来的信息：

```js
`<html maaa=a>
        <head>
          <style>
            #container {
              width: 500px;
              height: 300px;
              display: flex;
            }
        
            #container #myid {
              width: 200px;
            }

            #container .c1 {
              flex: 1;
            }
          </style>
        </head>
        <body>
          <div id="container">
            <div id="myid"></div>
            <div class="c1" />
          </div>
        </body>
        </html>`
```

最终经过排版后的 DOM 树，`data.js`：

```js
const dom = {
  type: "document",
  children: [
    {
      type: "element",
      children: [
        {
          type: "text",
          content: "\n        ",
        },
        {
          type: "element",
          children: [
            {
              type: "text",
              content: "\n          ",
            },
            {
              type: "element",
              children: [
                {
                  type: "text",
                  content:
                    "\n            #container {\n              width: 500px;\n              height: 300px;\n              display: flex;\n            }\n        \n            #container #myid {\n              width: 200px;\n            }\n\n            #container .c1 {\n              flex: 1;\n            }\n          ",
                },
              ],
              attributes: [],
              tagName: "style",
              computedStyle: {},
              parent: {
                tageName: "head",
                type: "element",
              },
              style: {},
            },
            {
              type: "text",
              content: "\n        ",
            },
          ],
          attributes: [],
          tagName: "head",
          computedStyle: {},
          parent: {
            tageName: "html",
            type: "element",
          },
          style: {},
        },
        {
          type: "text",
          content: "\n        ",
        },
        {
          type: "element",
          children: [
            {
              type: "text",
              content: "\n          ",
            },
            {
              type: "element",
              children: [
                {
                  type: "text",
                  content: "\n            ",
                },
                {
                  type: "element",
                  children: [],
                  attributes: [
                    {
                      name: "id",
                      value: "myid",
                    },
                  ],
                  tagName: "div",
                  computedStyle: {
                    width: {
                      value: "200px",
                      specificity: [0, 2, 0, 0],
                    },
                  },
                  parent: {
                    tageName: "div",
                    type: "element",
                  },
                  style: {
                    width: 200,
                    left: 0,
                    right: 200,
                    top: 0,
                    bottom: 300,
                    height: 300,
                  },
                },
                {
                  type: "text",
                  content: "\n            ",
                },
                {
                  type: "element",
                  children: [],
                  attributes: [
                    {
                      name: "class",
                      value: "c1",
                    },
                    {
                      name: "isSelfClosing",
                      value: true,
                    },
                  ],
                  tagName: "div",
                  computedStyle: {
                    flex: {
                      value: "1",
                      specificity: [0, 1, 1, 0],
                    },
                  },
                  parent: {
                    tageName: "div",
                    type: "element",
                  },
                  style: {
                    flex: 1,
                    width: 300,
                    left: 200,
                    right: 500,
                    top: 0,
                    bottom: 300,
                    height: 300,
                  },
                },
                {
                  type: "text",
                  content: "\n          ",
                },
              ],
              attributes: [
                {
                  name: "id",
                  value: "container",
                },
              ],
              tagName: "div",
              computedStyle: {
                width: {
                  value: "500px",
                  specificity: [0, 1, 0, 0],
                },
                height: {
                  value: "300px",
                  specificity: [0, 1, 0, 0],
                },
                display: {
                  value: "flex",
                  specificity: [0, 1, 0, 0],
                },
              },
              parent: {
                tageName: "body",
                type: "element",
              },
              style: {
                width: 500,
                height: 300,
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch",
                justifyContent: "flex-start",
                flexWrap: "nowrap",
                alignContent: "stretch",
              },
            },
            {
              type: "text",
              content: "\n        ",
            },
          ],
          attributes: [],
          tagName: "body",
          computedStyle: {},
          parent: {
            tageName: "html",
            type: "element",
          },
          style: {},
        },
        {
          type: "text",
          content: "\n        ",
        },
      ],
      attributes: [
        {
          name: "undefined",
        },
      ],
      tagName: "html",
      computedStyle: {},
      parent: {
        type: "document",
      },
      style: {},
    },
    {
      type: "text",
      content: "\r\n",
    },
  ],
};
```



## 5 渲染 render

安装环境：images包

把网页内容绘制到图片，然后显示图片

- [NPM --- image 库](npmjs.com/package/imges)
- `npm install --save-dev images`

### 第一步：绘制单个元素

- 绘制需要依赖一个图形环境
  - 这里采用了 `npm` 包，`images`；
- 绘制在一个 `viewport` 上进行
  - 与绘制相关的属性：background-color、border、background-image等

```js
// ------------- client.js 客户端的调用方式 ------------- 
// 1. viewport是底板，所有内容都绘制到这个图片上
// 2. 调用 render 方法，先尝试绘制单个元素
// 3. 保存图片
// render, create a images instead of a screen
  let viewport = images(800, 600);
  render(viewport, dom.children[0].children[3].children[1].children[3]);

  // save & show images
  viewport.save("viewport.jpg");


// ------------- render.js 的调用方式 ------------- 
const images = require("images");

function render(viewport, element) {
  // 收到一个元素后，就创建一个对应尺寸的 imgage
  if (element.style) {
    let img = images(element.style.width, element.style.height);

    // 背景色的解析
    if (element.style["background-color"]) {
      let color = element.style["background-color"] || "rgb(0,0,0)";
      // 提取背景色
      color.match(/rgb\((\d+),(\d+),(\d+)\)/);
      // img 的 API
      img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1);
      // 绘制到总画面的左上角
      viewport.draw(img, element.style.left || 0, element.style.top || 0);
    }
  }

  // 递归调用 render 实现对子元素的渲染
  if (element.children) {
    for (let child of element.children) {
      render(viewport, child);
    }
  }
}

module.exports = render;
```

这里只实现了背景色的绘制，最终的效果展示：

![viewport](images/toy%20browser.assets/viewport.jpg)



### 第二步：绘制DOM树

- 递归调用子元素的绘制方法，完成DOM 树的绘制
- 忽略一些不需要绘制的节点
- 实际浏览器中，文字绘制是难点，需要依赖字体库，把字体转换成图片去渲染，我们这里忽略。
- 实际浏览器中，还会对一些图层做 `compositing`，我们这里也忽略了。



#### 最终效果：

![image-20201227200039332](images/toy%20browser.assets/image-20201227200039332.png)

文件结构：

- server.js
- client.js
- layout.js
- parser.js
- render.js
- node_modules
  - `npm install --save-dev css`
  - `npm install --save-dev images`



```js
rgb(84,80,74);
rgb(111,138,140);
rgb(157,131,119);
rgb(168,105,69);
rgb(159,85,64);
rgb(119,226,203);
rgb(184,204,206);
rgb(112,156,167);

rgb(185,135,118);
rgb(189,219,218);
rgb(53,76,98);
```



## 6 测试

### 6.1 t1

```html
<html maaa=a>
    <head>
        <style>
            #container {
                width: 1000px
                height: 800px;
                display: flex;
                background-color: rgb(255,255,255);
            }
            #container #myid {
                width: 200px;
                height: 300px;
                background-color: rgb(84,80,74);
            }
            #container .c1 {
                flex: 1;
                background-color: rgb(111,138,140);
            }
            #container .c2 {
                flex: 1;
                background-color: rgb(157,131,119);
            }
            #container .c3 {
                flex: 1;
                background-color: rgb(168,105,69);
            }
            #container .c4 {
                flex: 1;
                background-color: rgb(159,85,64);
            }
            #container .c5 {
                flex: 1;
                background-color: rgb(119,226,203);
            }
            #container .c6 {
                flex: 1;
                background-color: rgb(184,204,206);
            }
            #container .c7 {
                flex: 1;
                background-color: rgb(112,156,167);
            }
            #container .c8 {
                flex: 1;
                background-color: rgb(185,135,118);
            }
        </style>
    </head>
    <body>
        <div id="container">
            <div id="myid"></div>
            <div class="c1"></div>
            <div class="c2"></div>
            <div class="c3"></div>
            <div class="c4"></div>
            <div class="c5"></div>
            <div class="c6"></div>
            <div class="c7"></div>
            <div class="c8"></div>
        </div>
    </body>
</html>
```

toy browser render：

![viewport1637307974235](images/toy%20browser.assets/viewport1637307974235.jpg)

chrome render：

![image-20211119154950564](images/toy%20browser.assets/image-20211119154950564.png)

### 6.2 t2 测试 flex 比例缩小

`html` 代码没变，只改变了 css 大小

```css
#container {
    width: 1000px
    height: 800px;
    display: flex;
    background-color: rgb(255,255,255);
}
#container #myid {
    width: 200px;
    height: 300px;
    background-color: rgb(84,80,74);
}
#container .c1 {
    flex: 1;
    background-color: rgb(111,138,140);
}
#container .c2 {
    flex: 1;
    background-color: rgb(157,131,119);
}
#container .c3 {
    flex: 1;
    background-color: rgb(168,105,69);
}
#container .c4 {
    flex: 1;
    background-color: rgb(159,85,64);
}
#container .c5 {
    flex: 1;
    background-color: rgb(119,226,203);
}
#container .c6 {
    flex: 4;
    background-color: rgb(184,204,206);
}
#container .c7 {
    flex: 6;
    background-color: rgb(112,156,167);
}
#container .c8 {
    flex: 8;
    background-color: rgb(185,135,118);
}
```

toy browser render：

![viewport1637308213776](images/toy%20browser.assets/viewport1637308213776.jpg)

chrome render：

![image-20211119155139574](images/toy%20browser.assets/image-20211119155139574.png)

### 6.3 t3

```html
<html maaa=a>
<head>
    <style>
        #container {
            width: 1000px
            height: 800px;
            display: flex;
            background-color: rgb(255,255,255);
        }
        #container #myid {
            width: 200px;
            height: 300px;
            background-color: rgb(84,80,74);
        }
        #container .c1 {
            flex: 1;
            background-color: rgb(111,138,140);
        }
        #container .c2 {
          width: 300px;
          height: 150px;
          background-color: rgb(157,131,119);
        }
        #container .c3 {
            flex: 1;
            background-color: rgb(168,105,69);
        }
        #container .c4 {
            flex: 5;
            background-color: rgb(159,85,64);
        }
        #container .c5 {
          width: 200px;
          height: 400px;
            background-color: rgb(119,226,203);
        }
        #container .c6 {
          width: 80px;
          height: 500px;
          background-color: rgb(184,204,206);
        }
        #container .c7 {
            flex: 1;
            background-color: rgb(112,156,167);
        }
        #container .c8 {
            flex: 3;
            background-color: rgb(185,135,118);
        }
    </style>
</head>
<body>
    <div id="container">
        <div id="myid"></div>
        <div class="c1"></div>
        <div class="c2"></div>
        <div class="c3"></div>
        <div class="c4"></div>
        <div class="c5"></div>
        <div class="c6"></div>
        <div class="c7"></div>
        <div class="c8"></div>
    </div>
</body>
</html>
```

toy browser render：

![viewport1637309514321](images/toy%20browser.assets/viewport1637309514321.jpg)

chrome render：

![image-20211119161200637](images/toy%20browser.assets/image-20211119161200637.png)

# Part_III 实现的功能

### `DOM` 部分：

可以从服务器获取 HTML 代码，并进行解析：

支持的格式：

```html
document		  ==> 最外层包裹了一个 document 	
<div></div>       ==> 标签全部定义为 element
"   "             ==> 文字全部定义为 text

<style></style>   ===> 其内容代码会被 CSS Compute 识别并解析
```



提取 DOM 中一个节点的结构：

依次是：

- 节点类型
- 子节点
- 节点属性
- 节点标签名
- 节点已计算的CSS属性
- 父节点
- 节点的 CSS 属性

```js
{
  "type": "element",
  "children": [],
  "attributes": [{ "name": "id", "value": "myid"}],
  "tagName": "div",
  "computedStyle": {
    "width": {
      "value": "200px",
      "specificity": [0,2,0,0]
    },
    "height": {
        "value": "300px",
        "specificity": [0,2,0,0]
    },
    "background-color": {
        "value": "rgb(84,80,74)",
        "specificity": [0,2,0,0]
    }
  },
  "parent": {
    "tageName": "div",
    "type": "element"
  },
  "style": {
    "width": 200,
    "height": 300,
    "background-color": "rgb(84,80,74)",
    "left": 0,
    "right": 200,
    "top": 0,
    "bottom": 300
  }
},
```



### `CSS` 部分：

实现了：`computed CSS`：

通过对每一个 CSS 规则进行 权重 `specificity` 计算，比较应用哪一个 CSS 规则；



可以识别：

- `width`、`height`
- 单位：`px`、`number`



### `Flex` 部分：

- 主轴 Main Axis 的确定：
  - `flex-direction`: row、column

```js
// 	确定 main 主轴，以及计算位置时需要考虑的变量：
  // mainSize 主轴尺寸
  // mainStart， mainEnd 主轴的边界（包含了方向问题）
  // mainSign 表示从左往右排，从右往左排时的符号，正负1
  // mainBase 从左/从右开始
  // cross 交叉轴同理
  let mainSize,
    mainStart,
    mainEnd,
    mainSign,
    mainBase,
	crossSize,
    crossStart,
    crossEnd,
    crossSign,
    crossBase;
```

- 计算主轴是否允许折行，如果折行需要进行剩余空间的分配；如果不允许需要利用 flex item 的 `flex` 属性确定压缩比例。
  - 计算主轴和交叉轴的剩余空间，并通过属性判断剩余空间的处理方式；
  - 父容器的 `justifyContent` 属性去决定主轴剩余空间的排布。
    - `flex-start`, `flex-end`, `center`,     `space-between`, `space-around`, `space-evenly`。



- 交叉轴：计算主轴每一行的行高，行高的剩余空间如何处理：
  - 就根据 `align-content` 判断如何分配剩余空间：
    - `start`、 `center`、`space-between`、`space-around`、`stretch` 
  - 行高 `flex-align` 和 `item-align`，确定单个元素的具体位置：
    - `align-self` ：`stretch`、`center`、`start`、`end`，拉伸以填满高度、居中、顶部、底部
    - `align-items`：与 `self` 不同 `items` 是直接定义父 flex 容器盒子上的，一次性修改全部的 flex item。
    - `self` 的优先级更高，指定的范围更小。



`Layout` 部分，左侧是代码中定义的属性，右侧是 CSS Flex 的正确名称。

实现了对 DOM 元素 的 Flex 布局：

- `flexDirection`：同 `flex-direction`
- `alignContent`：同 `align-content`
- `alignItems`：同 `align-item`
- `justifyContent`：同 `justify-content`
- `flexWrap`：同 `flex-wrap`，属性有：auto、nowrap


