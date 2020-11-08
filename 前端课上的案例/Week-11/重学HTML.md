# 1. HTML的定义：XML与SGML

## 1.1 DTD 与 XML namespace

http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd

http://www.w3.org/1999/xhtml

### 1.1.1 DTD

#### nbsp转义符

-  no-break space。不要在HTML中，使用 nbsp 达到体现空格的效果。因为 nbsp 本质的含义是：两个单词之间没有空间，直接链接。所以如果使用了 nbsp，两个单词看似是空开了，但是在语义上，这两个单词是连在一起的。会影响排版。
- 解决：如果要体现空格。要从 CSS 入手：white-space 属性，显示空格。

#### 记忆，在HTML要使用转义符，不能直接在HTML敲出：

- quot：双引号（quotation mark）

- amp ： & 符（ampersand）

- lt ：< 号（less-than sign）

- gt ：> 号（greater-than sign）

  ```html
  <!-- 举例：假设下列代码需要HTML-->
  <p> Hello World! </p>
  <p> Happy Code Every Day! </p>
  
  <!-- 写入网页中 -->
  <code>
    &lt;p> Hello World! &lt;/p>
  	&lt;p> Happy Code Every Day! &lt;/p>
  <code>
  ```

  

# 2. HTML 标签语义

## 2.1 语义化 wiki某页面

- HTML在编写时，要从大到小到排布标签。同时暂时不要考虑任何非结构的东西（css的部分不要管）。甚至空格，回车这些也用不着去理会。只专注HTML结构、语义的问题。

- 当没有一个确切的标签去处理语义的时候，用 class="xxx" 补充说明。
  - ​	`<p class="note">注记：一段斜体注释，没有合适的标签表示</p>