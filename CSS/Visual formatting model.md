# 视觉格式化模型 - CSS 2.2

---------------

视觉格式化模型 Visual formatting model：浏览器对于DOM树的可视化处理方式。

本文基于 CSS 2.2 的模型概念，不涉及 CSS 3 相关的知识（比如，flex排版，grid排版）。

# 1. 简介

在视觉格式化模型中，DOM树中的每个元素，基于盒模型，会生成一个或多个盒。然后根据排版规则，形成页面。

基本的排版规则：

- box dimensions and type.  
  - 盒子尺寸（content, padding, border, margin)、盒子类型（各种block）。
- position scheme (normal flow, float, and absolute positioning). 
  - 盒子的<u>定位方式</u> position 属性。
- relationships between elements in the document tree. 
  - DOM树的元素结构。
- external information (e.g., viewport size, intrinsic dimensions of images, etc.). 

## 1.1 基本概念

### 1.1.1 引入

1. leyout
   - 排版。有翻译为布局的，但称之为 'CSS排版' 更为合适。
2. Tag
   - 标签。相当于源代码，在HTML的代码中，书写的都是 <标签>。
3. element
   - 元素。通过一对标签表示出来的，添加了HTML语义。`<html> </html>` 就是一对标签。
4. box
   - 盒。在页面中，所有元素都被渲染成一个或多个矩形盒子。是排版和渲染的基本单位。
5. CSS Flow Layout
   - CSS 流式排版。就是'正常流'。
6. Normal Flow
   - 正常流。元素在页面中的基本排版规则。
   - 是CSS中对于元素的排版方式。元素渲染成众多盒子，然后通过流式排版，排版到页面中。
7. The stacking context
   - 层叠上下文。通过 z-index修改的，位于z轴视角下的上下文。

**viewport** 

- 视口。
- 浏览器会通过视口将页面内容呈现给用户。换句话说，视口通常可以理解为浏览器窗口大小（或可视区域）。
- 视口会涉及到 <u>intial containing block 初始包含块</u> 相关概念。

**convas**

- 画布
- 画布是文档最终呈现的页面（比如，一个word文档的实际页面大小就是 convas，显示屏的大小就是 viewprot）
- 如果视口比画布尺寸要小，浏览器会提供滚动机制 / 缩放机制。

**containing block**

- 包含块。
- 针对 position属性而来的。浏览器通过position属性，来确定应当基于什么参照物（包含块），决定该元素生成盒的位置。
- 元素的 position 值是 'relative' or 'static'：包含块是最近的 block container box 的边界。
- 元素的 position 值是 'fixed'：包含块是初始包含块，即适口大小。
- 元素的 position 值是 'absolute'：包含块是最近的 非static的、block container box 的边界。

包含块简单来说，就是可以包含其他盒子的块。而问题讨论的核心是以一个子盒子为视角，确定它的直接的父包含块是哪一个，以此为参考来渲染子盒子。

盒子会根据它的包含块的边界，来定位自己的位置。但是盒子不会被包含块的范围限制，如果盒子跑到包含块的外面，称为溢出（overflow）。

**initial containing block**

- 初始包含块
- 根元素所在的包含块。大小和视口的大小相当。

# 2. 盒类型

浏览器会通过语义，把HTML标签识别为一个个元素（elements）。然后浏览器又会把元素渲染成各种类型的盒子，最后，根据盒类型盒排版规则，把它们渲染到页面中，呈现给用户。下面会介绍 CSS 2.2 中，所有类型的盒子。

- 包含块类型，是通过 position 属性确定的；
- 盒类型，是通过 display 属性确定的。

## 2.1 名词总结

- block-level elements  块级元素
- inline-level elements  内联元素
- block-level box  块级盒子
- inline-level box  内联级盒子
- block box  块盒子
- inline box  行盒子
- block container box  块级容器盒子
- anonymous box  匿名盒子
- anonymous block box  匿名块级盒子
- anonymous inline box 匿名内联盒子

- element  元素
- principal box  主体盒
- principal block-level box 主体块级盒
- principal inline-level box 主体内联级盒
- replaced element  可替换的元素
- non-replaced element  不可替换的元素

## 2.2 盒的生成

开头讲过，浏览器根据元素的特性，来生成对应类型的盒。具体过程如下：

通常情况下，浏览器根据某元素的'display'属性，生成一个主体盒（principal box），这里是一对一关系，一个元素会生成一个主体盒。这个主体盒中包括了元素中的内容以及其他子盒。

'list-item'元素，浏览器在生成主体盒的同时，还会生成一个标记盒（marker box），类似列表项前的数字 / 小圆圈 / 小点点。所以，不是所有的元素都只生成一个主体盒，有可能会生成多个盒。但是，标记盒的定位方案与主体盒有关。结论，与主体盒相关的（标记盒、子元素生成的盒子、主体盒中的内容）元素，定位都与主体盒有关。

<img src="/Users/moxyninja/GreenTea-Lemon/CSS/摘录/Source1/image-20201117220655806.png" alt="image-20201117220655806" style="zoom:67%;" />

## 2.3 Block & Inline

盒的生成，从大的范围来讲，有两大类盒子： 块（bloc  k），内联（inline）。

上文提到过：浏览器根据某元素的'display'属性，生成主体盒（principal box），划分了块和内联的概念，这里就可以进行进一步分析，后面会具体解释：

- 块类型的元素（block-level element），生成主体块级盒（principal block-level box）。
- 内联类型的元素（inline-level element），生成主体内联盒（principal block-level box）。

## 2.4 Block 系列

块（block）划分为四个概念：block-level element, block box, block-level box, block container box。这四个概念，不是单纯的相交或互斥，也不是单纯的A是比的子集，下面会分别介绍这四个概念。

涉及到的名词有：

- block-level element 块级元素
- block box 块盒
- block-level box  块级盒
  - principal block-level box  主体块级盒
- block container box 块级容器盒

先说结论：**block box = block-level box + block container box**
即，块盒：既满足块级盒的特性，又满足块级容器盒的特性。

### 2.3.1 Block-level element

块级元素，是在HTML层面来讲述的。即‘标签’语义化为一个个有意义的‘元素’。然后被CSS选择器所识别。在CSS的视角看来，HTML代码中的‘标签’都被识别为了‘元素’。而块级元素，就是元素中，被划分为块级的元素。

如何把元素划分为块级？

- 通过： display属性设置为 'block', 'list-item', 'table'，这些元素都是块级元素。

块级元素不直接用于格式化上下文或排版，这只是一个针对元素本身的属性概念。一个块级元素会被格式化成一个块（例如文章的一个段落），默认按照垂直方向依次排列。

### 2.3.2 Block-level box

块级盒的定义：

- 从来源上：块级盒是由块级元素生成而来的盒子；
- 从结果上：块级盒是参与块级格式化上下文（block formatting context）的盒子；
- 从自身角度：块级盒可以参与 BFC （块级盒外面可以是BFC）。

一个块级元素，至少会生成一个块级盒，但是有时候会生成多个（list-item列表元素，上文提到）。

**principal block-level box**

定义：每个块级盒子都会参与块格式化上下文（block formatting context的创建，而每个块级元素都会至少生成一个块级盒子，即主块级盒子（principal block-level box）。列表项元素会额外生成标示盒，放置项目符号。

主块级盒是由块级元素生成的盒。定义这样一个概念的目的是在于，涉及到定位方案上（position 属性相关），子元素生成盒的定位位置，通常会与主体块级盒相关。也就是会涉及到上文 containing block（包含块）的概念，个人认为，包含块和主体块级盒的概念是重复的。 

简单来说，主体块级盒盒包含块的概念，就是为 position 定位方案服务的。

### 2.3.3 Block container box

粗略来看，块容器盒顾名思义，它可以容纳块级概念的元素。也就是说这概念的定义，或者说区分这个概念，就是根据一个盒子包含的东西，是否是块级的。他是不是一个‘容器’。块容器盒这个概念，不参与当前块的排版和定位，只是为了描述当前盒和其后代盒之前的关系，为了确定后代盒的排版和定位。从这一点上，block container box 概念，和 containing block 相同。

块容器盒的定义：

- 从盒子包含物的内容上看：盒子里面可以有正常流，它就是块容器盒（block container box）。
- 从盒子包含物的类型上看：块容器盒只包含 block-level box 或者只包含 inline-level box。
  - 如果是只包含 inline-level box，则该块容器盒内部，是一个 IFC 内联格式上下文。
- 从自身角度：块容器盒可以容纳正常流（块容器盒里面可以是 BFC）。

**判断：什么类型的盒子，是 block container box？**

- 'display' 的值是以下参数时，该元素均是 block container（必须是 non-relpaced element 可替换元素）：
  - block：块
  - inline-block：内联块
  - list-item：列表
  - table-cells：表格子项
  - table-captions：表格标题
  - flex item：（CSS 3）flex盒子项
  - grid cells：（CSS 3）grid盒子项
- 'display' 的值是以下参数时，该元素不是 block container：
  - table-row：这里面要存放 table-cell，不能放正常流。
  - flex：这里面要存放 flex子项，不能放正常流。
  - grid：同上
  - ...
- 元素类型是 replace element，即可替换元素，均不是 block container box。replaced element 其内容不归 CSS 渲染，最后是要被其他内容物替换的，该元素本身就是一个空元素，没有内容。所以自然不是一个可以放块级盒子的'容器'。 可替换元素不是'容器'。

### 2.3.4 Block box

既满足了（block-level box）的要求，又满足了（block container）的要求的盒子，是块盒（block box）。

<img src="/Users/moxyninja/GreenTea-Lemon/CSS/摘录/Source1/image-20201117221955368.png" alt="image-20201117221955368"  />

- 块级盒 block-level box：描述了元素与其父元素和兄弟元素之间的行为。
- 块容器盒 block container box：描述了元素跟其后代之间的行为。

也就是说，这个盒子既能放得下 BFC，也可以放在一个BFC中。

- 从外部显示来讲，这个盒子是一个 block-level box：它能参与到一个 BFC 中。
- 从内部显示来讲，这个盒子是一个 block container box：它的后代盒子可以是块级的，可以放 BFC 。

- 有些块级盒不是块容器盒：表格 table；
- 有些块容器盒不是块级盒：非替换行内块 non-replaced inline-block、非替换表格单元格 non-replaced table-cell。

### 2.3.5 Anonymous block box

匿名块盒。

如果一个块容器盒（block container box 图中的div）里面有一个块级盒子（block-level box 图中的p），那么这个快容器盒中的其他元素，就会都被强制渲染为块级盒子（图中 Some text 生成了一个匿名块盒）。

```html
<div>
	Some text
  <p>More text</p>
</div>
```

<img src="/Users/moxyninja/Library/Application Support/typora-user-images/image-20201117211214724.png" alt="image-20201117211214724" style="zoom:%;" />

引申：**Anonymous inline box**

匿名行内盒

如果一个块容器盒（block container box）：里面没有块级盒（block-level box），但是里面有行内盒（inline box），那么这个快容器盒中的其他元素（只剩text文本元素了），就会都被强制渲染为行内级盒子（  text 生成了一个匿名行内盒）。

```html
<p>Some <em>emphasized</em> text.</p>
```

总结：

匿名盒子（Anonymous box）分为：Anonymous block box 和 Anonymous inline box。

直接暴露在一个 block container 中的文本，不是被包装成匿名块盒子，就是被包装成匿名行内盒子。同时，匿名盒子 CSS 无法直接选中。对匿名盒子的渲染，通常参考父元素的样式。也就是说，此时所有可继承的 CSS 属性值都为 `inherit` ，而所有不可继承的 CSS 属性值都为 `initial`。



### 2.3.6 Q & A

1. 关于 block-level box 和 block container box：
   - 这两个盒子不是不是互斥的，即这两个盒子是有交集的。这个交集就是 block box。

2. 什么情况下，一个 block-level box，不是 block container box：
   - 这个问题换句话说：一个块级盒子，在什么情况下，它不能包含其他块级。
   - 答：如果这个盒子是可替换元素时，不能作为 block container box，不能作为'容器'。
   - 原因：replaced element 其内容不归 CSS 渲染，最后是要被其他内容物替换的。所以自然不是一个可以放块级盒子的'容器'。 可替换元素不是'容器'。

## 2.4 Inline 系列

以下翻译中，‘行内’可以等效替换为‘内联’。

### 2.4.1 Inline-level element

定义：display属性设置为 'inline', 'inline-block', 'inline-table'，这些元素都是行内级元素。

行内级元素不直接用于格式化上下文或排版，这只是一个针对元素本身的属性概念。行内级元素的内容可以分布在多行显示。

### 2.4.2 Inline-level box

行内级盒的定义：

- 从来源上：行内级盒是由行内级元素生成而来的盒子；
- 从结果上：行内级是参与行内级格式化上下文（inline formatting context）的盒子。

**atomic inline-level box**

原子行内级盒：是行内级盒子的子集。它不参与行内级格式化上下文。因为原子行内级盒的内容不会被拆分成多行显示。

### 2.4.3 Inline box

行内盒

行内盒是行内级盒子中，那些不可替换元素(non-replaced element) 生成的。这一点和











### non-replaced element

不可替换元素。

可以理解为正常的元素。绝大多数元素都是不可替换的：元素的内容通过CSS渲染，然后在网页中展示，而不是被替换成其他内容。

### replaced element

可替换元素。

在CSS中，有些元素的展现效果不是由 CSS 来控制，它们是外部对象。通过浏览器识别元素类型，来替换该元素内容，而不是通过 CSS 来渲染。换句话说，该元素原本是一个空元素，没有内容。浏览器根据标签含义，替换成一个相应内容。

进一步解释，CSS 只可以调整可替换元素的位置，而不能修改元素内容的样式。

- 典型的可替换元素有：
  - `<iframe>`
  - `<video>`
  - `<embed>`
  - `<img>`
- 特定情况下，是可替换元素的有：
  - `<option>`
  - `<audio>`
  - `<canvas>`
  - `<object>`
  - `<applet>`



