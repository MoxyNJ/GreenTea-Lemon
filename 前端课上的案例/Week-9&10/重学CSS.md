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



## 3. 收集：标准信息

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
    ```

   















