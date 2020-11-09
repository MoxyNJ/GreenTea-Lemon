# 重学CSS

----

# 一、CSS总论

CSS的标准语法：

- CSS 2.1：https://www.w3.org/TR/CSS21/grammar.html#q25.0
- CSS 3：https://www.w3.org/TR/css-syntax-3



## 1. CSS 2.1总体结构

- @charset：企业一般有预知，用的少。
- @import：用的少。
- rules
  - @media
  - @page
  - rule

 

## 2. CSS @规则

At-rules

- @charset ： https://www.w3.org/TR/css-syntax-3/
- @import ：https://www.w3.org/TR/css-cascade-4/
- @media ：https://www.w3.org/TR/css3-conditional/
- @page ： https://www.w3.org/TR/css-page-3/
- @counter-style ：https://www.w3.org/TR/css-counter-styles-3
- @keyframes ：https://www.w3.org/TR/css-animations-1/
- @fontface ：https://www.w3.org/TR/css-fonts-3/
- @supports ：https://www.w3.org/TR/css3-conditional/

- @namespace ：https://www.w3.org/TR/css-namespaces-3/



## 3. CSS 规则

rules

- 选择器 Selector
  - •	https://www.w3.org/TR/selectors-3/
  - •	https://www.w3.org/TR/selectors-4/
- 声明
  - Key
    - Properties
    - Variables：https://www.w3.org/TR/css-variables/
  - Value
    - https://www.w3.org/TR/css-values-4/



## 4. 🧪 实验：收集CSS标准文档的相关信息

通过爬虫的方法，抓取W3C网页的内容，提取有价值信息。

1. 网址：https://www.w3.org/TR

2. 选择tag：CSS，发现一共1k+的标准文档中，CSS有170+，是客户端过滤，所有文档已经都被加载到本地客户端。

3. 提取：

   ```javascript
   Array.prototype.slice.call(document.querySelector("#container").children)
       .filter(e => e.getAttribute("data-tag").match(/css/))
       .map(e => ({
       		name:e.children[1].innerText,
       		url:e.children[1].children[0].href
   		})
       )
   	
   
   // 第一步：提取1251个 list结果，全部转化为数组。
   // Array.prototype.slice.call()  
   //	 -把抓取的list，转换成数组。
   // document.querySelector("#container")  
   // 	 -获取 id="container" 的节点元素。通过观察DOM结构发现， 所有的list都在 id='container'中。
   // document.querySelector("#container").children
   //   -获取 container的所有子元素（1251个list）
   
   
   // 第二步：筛选出“data-tag”属性值是“css”的结果，一共有139个 list，保存在数组中。
   // array.filter(函数)
   //	 -返回一个新数组。数组中的成员是通过执行（函数）符合筛选条件的成员。array中的成员会依次执行'函数'
   // node.getAttribute("data-tag")
   //   -获取节点中，属性名是“dta-tag”的属性值，以便后面进行正则筛选。返回String。
   // string.match(正则) 
   //	 -在字符串中检索正则匹配的值。返回匹配成功的成员。
   // (/css/)
   //   -这里不能用相等判断，因为可能会有多个CSS标签。
   
   // 第三步：根据DOM结构，提取每个list的：标题文本 + URL。
   // Array.map(回调函数)
   //   -返回一个新数组。Array中，每个成员都会执行回调函数。处理后的成员，会保存在新数组中。
   // 回调函数：根据DOM结构，提取标题文本 + URL
   // 每个成员的返回一个对象，其中保存两个属性：name、url。
   ```

4. 检查结果，成功获取想要的信息后，对结果：JSON.stringify。将JavaScript值，转换为JSON字符串。

    ```jsx
   JSON.stringify(
       Array.prototype.slice.call(document.querySelector("#container").children)
           .filter(e => e.getAttribute("data-tag").match(/css/))
           .map(e => ({
                   name:e.children[1].innerText,
                   url:e.children[1].children[0].href
               })
           )
   )
   
   // 保存提取的字符串，存储在js文件中的standards变量中，留有备用。
   ```

5. 制作爬虫工具，在w3c的任意一个页面中运行，可以遍历到每个需要的标准文档。

   ```javascript
   let standards = [复制的JSON.stringify];
   
   // 把原网页的内容，替换为一个iframe框架。
   let iframe = document.createElement("iframe");
   document.body.innerHTML = "";
   document.body.appendChild(iframe);
   
   
   // handler变量，指向一个匿名函数：作用是执行resolve()，即promise状态为完成，然后清空监听。
   // 具体的使用：
   // 传递的参数为：iframe框架，"load"加载事件。
   // 返回一个Promise对象，该对象执行：
   		// element.addEventListener(event, handler)
   		// 先定义一个监听事件，如果iframe框架，load加载完毕，就执行回调函数 hander
   		// handler中，会先把Promise状态置为“已完成”，然后取消事件监听。
   function happen(element, event) {
       return new Promise(function(resolve){
           let handler = () => {
               resolve();
               element.removeEventListener(event, handler);
           }
           element.addEventListener(event, handler);
       })
   }
   
   // 遍历standards中每个成员，讲每个成员都加载一次，到iframe中。然后尝试打印一下成员的标题
   // 测试是否加载成功。
   // 使用 async/asait的目的，是为了确保每次当前网页加载完成，然后在执行下一次循环
   		// 是为了提供一个断点，提供的方法是用Promise添加一个事件，监听到后再取消这个事件。特别巧妙。
   void async function() {
       for(let standard of standards) {
           iframe.src = standard.url;    // 新建一个 iframe框架，载入 url
           console.log(standard.name);   // 打印url对应的标题
           await happen(iframe, "load");
       }
   }();
   // 这里使用小括号，直接执行了该函数。
   ```

6. 假设：想提取标准文档中的class="propdef"，也就是相关属性的定义信息：

   ```javascript
   // 如果想抓取带有 class="propdef"的内容
   // 在每个标准文档中，看DOM结构发现“属性内容”，在 propdef中。
   // 对 匿名async函数进行修改即可显示。
   void async function() {
       for(let standard of standards) {
           iframe.src = standard.url; 
           console.log(standard.name);   
           await happen(iframe, "load"); 
           console.log(iframe.contentDocument.querySelectorAll(".propdef"));
         //  这里假设想要提取属性相关的定义，直接在DOM中找到该定义的位置，然后提取。
       }
   }();
```

- 面对大量信息，运用自动化手段，提取相关文档的信息。

# 二、CSS选择器

HTML的命名空间：HTML、SVG、MathML。有三个命名空间，在CSS选择器中，需要用 ｜ 单竖线进行分割。

## 1. 选择器语法

**简单选择器**

- `*`： 通用选择器，适配任何元素
- `div`：type selector，类型选择器。根据元素的tagName属性选择。 
- `.cls`：class selector。可以用空白做分隔符，指定多个class，只要匹配一个就可以了。
- `#id`：id selector。严格匹配。
- `[attr=value]`：属性选择器。[属性名字=值]，包含了 class 和 id 选择器。（可匹配多个）
- `:hover`：伪类选择器，表达元素特殊的状态，与HTML没有关系，大部分来自交互/函数。
- `::before`：伪元素选择器，也可用单冒号，只是不好区分。可以选择不存在的元素。

**复合选择器 combined**  

- <简单选择器><简单选择器><简单选择器>：多个简单选择器相连，选中的元素必须匹配所有简单选择器。
- `*` / `div` ，必须写在最前面。
- 伪类 / 伪元素，必须在写最后面。

**复杂选择器**
针对元素的结构进行条件选择。

- <复合选择器>`<sp>`<复合选择器>：用空格分割，子孙选择器。左边是元素的祖先（父级以上）
- <复合选择器>`">"`<复合选择器>：子孙选择器。左边必须是元素的父级。
- <复合选择器>`"~"`<复合选择器>：邻居选择器。
- <复合选择器>`"+"`<复合选择器>：邻居选择器。
- <复合选择器>`"||"`<复合选择器>：表格 table时，可以选中某一个列。

<选择器>`,`<选择器>：逗号之前是“或”的关系，两个选择器并列链接。



## 2. 选择器的优先级





















