# CSS 2.2 | 盒类型 与 display 显示属性



### 文章目录

- 前言
- 盒类型
- 1. 块级元素与块盒

  - 1.1 定义
    - 1.2 定义详解
    - 1.3 匿名块级盒

- 2. 行内元素与行盒
     - 2.1 定义
     - 2.2 行内盒详解
     - 2.2 匿名行内盒

- display 属性
- 感谢

# 前言

 本文是[视觉格式化模型](https://blog.csdn.net/qq_36145914/article/details/86609690)的第一章节，重点讲述CSS 2.1规定的盒类型，及相应display属性。
 本文将不涉及table布局及CSS3中的flex，grid等CSS3。这三类将另开篇，单独讲解。
 文中会提到盒类型对格式化上下文的影响，如果你之前没有接触过格式化上下文，不用紧张，你暂时可以将格式化上下文理解为具有特定排版规则的环境，我会在后续文章中详细讲解。

# 盒类型

 盒的类型影响其在[视觉格式化模型](https://blog.csdn.net/qq_36145914/article/details/86609690)中的排版放置行为。盒类型，宏观上可分为 **块(block)** 和 **行内(inline)** 两类。

## 1. 块级元素与块盒

  我们通常说的 **块(block)** 实际上细分为三个相互关联，又相互区别的子概念——**块级元素（block-level element)**，**块级盒（block-level box)**，**块容器盒（block container box）**

### 1.1 定义

- **块级元素 Block-level elememts**，即display属性为block，在文档中被格式化为块（block）的元素。
- **块级盒指 block-level box**参与块格式上下文（block formatting context)的盒。
  每个块级元素都会生成一个**主块级盒**（principal block-level box），用来包含后代盒及其内容，任何定位方案都与主块级盒有关。
  'list-item’元素（如li）还会生成额外盒，又称**标记盒（marker box）**，额外盒会根据主块级盒进行放置。
- 除 replaced element 置换元素外，一个块级盒也是一个**块容器盒 block container box**。
  一个块容器盒要么只包含 block-level box，要么建立行级格式化上下文（inline formatting context)而只包含行级盒 inline-level box。匿名盒知识 Anonymous。
  - block container box 是 block-level box 的一个子集。
- 不是所有的块容器盒都是块级盒。非替换的行内块（inline-block）是块级容器，但不是块级盒。
- 作为块级容器 block container box 的块级盒 block-level box 也叫块盒（block box）。
  - 按照这个意思，就是 block cintainer box分为两类：一类是其内容包含 IFC，一类是其内容包含 BFC。 block box，就是第二类，内容包含 BFC的 block container box。
  - block box 是 block container box的一个子集。
  - **错误！ 看winter的**
- 在没有争议时，这三个概念可以统一简称为“块 block”。

### 1.2 定义详解

1. Q：额外盒/标记盒的特性是什么，实际表现形式如何？
   A：标记盒，就是列表的前置标识所在的盒。它跟随列表项主块级盒的放置而放置，不能被CSS单独修改。
   实际表现形式参见下例：

```css
      div{
            display: list-item;
            list-style-type:square;
            list-style-position:inside;
        }
       <div>我是一个list-item，前面有一个额外盒</div>
```

![在这里插入图片描述](/Users/moxyninja/GreenTea-Lemon/CSS/摘录/source/20190124135258420.png)

2. Q：为什么置换元素可以是块级盒，但不是块级容器盒？
   A：在[ 置换元素](https://blog.csdn.net/qq_36145914/article/details/86616396) 一文中，我们提到，CSS渲染模型并不考虑对置换元素内容的渲染，而是依据其标签和属性，决定显示内容。这意味着，CSS渲染模型并不会深入置换元素内部。因此，置换元素并没有充当容器的客观条件。
   而从置换元素的html实现上看，img等单标签元素自然无法嵌入子盒。而select，textarea等元素虽是双标签，但其内部由shadowDOM封装，与文档的主DOM树分开渲染，故也无法作为容器，嵌套子盒。
   ![在这里插入图片描述](/Users/moxyninja/GreenTea-Lemon/CSS/摘录/source/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MTQ1OTE0,size_16,color_FFFFFF,t_70.png)
   *注意：绝大多数置换元素默认是行内元素，但你可以通过display:block将其设置为块级。

3. Q：为什么一个块容器盒要么只包含块级盒，要么建立行内格式化上下文并只包含行内盒? 
         在实际开发中，块容器盒内可以既有块级元素又有行内元素的情况，这和定义是冲突吗？
   A：一个块容器盒中不可能同时有块级盒和行内盒，换言之，一个块容器盒中不可能同时有行格式化上下文和块格式化上下文。假如一个块容器盒内的元素既要遵循BFC按垂直方向顺序放置，元素单独成行，又按IFC水平方向紧挨着顺序放置，那么必然产生矛盾。
   假如一个块容器盒既有裸露的行内盒，又有块级盒，裸露的行内盒则会被一个匿名盒（ anonymous block box）包含，以保持上下文统一。（[见下1.3节](http://81.69.57.175/CsdnArticle/Show?cdkey=b04f9c3339fa4226a7d9eeccf6749430tb&url=https://blog.csdn.net/qq_36145914/article/details/86613007#p3)）

4. Q: 非替换的行内块（inline-block）为什么是块级容器，但不是块级盒？
   A: inline-block，顾名思义，外部为inline，内部为block。
   非替换行内块是块级容器，意味着它内部可生成上下文环境，且默认为块级上下文。而其不是块级盒，意味着它自身不参加块级格式化上下文。最直观的表现为行内块自身不单独成行，但内部可设置宽高。
   示例如下：

```css
        div{
            border:royalblue solid;
            display: inline-block;
            text-align: center;
            line-height: 80px;
            height: 80px;
        }
    <div>我在这行</div>
    <div>我也在这行</div>
```

![在这里插入图片描述](/Users/moxyninja/GreenTea-Lemon/CSS/摘录/source/2019012517022994.png)



### 1.3 匿名块级盒


  当一个块容器盒内既有裸露的行内元素又有块级元素时，为了保持格式化上下文的统一，我们会将行内元素包含于一个匿名块级盒中。

- 匿名块级盒的可继承属性将从其父容器盒继承，无法继承的属性则取默认值。
- 匿名盒无法被CSS选择器选中。
  示例如下：

```css
       *{ 
            margin: 0;
            padding: 0;
        }
        .father{
            font-size: 26px;
            color:royalblue;
            margin: 10px;
        }
        .son{
            font-size: 14px;
            color:olivedrab;
        }
    <div class="father">
        <span>Anonymous box is here.</span>
        <div class="son">Child is here</div>
        <span>Anonymous box is here too.</span>
        <div class="son">Child is here too</div>
    </div>
```

![在这里插入图片描述](/Users/moxyninja/GreenTea-Lemon/CSS/摘录/source/20190124151557446.png)
 在示例中，行内元素被包含于匿名块级盒，独占一行。其字体大小和颜色继承自父级块容器盒，而无法继承的margin属性取默认值，设置为0。

 注: W3C文档中，有一个行内盒包含块级盒的匿名盒案例，此做法虽为html5所允许，但有违嵌套语义常规，且在实际开发中，完全没有必要。故此处不作类似举例。



## 2.行内元素与行盒

### 2.1 定义

1. **行内级元素 inline-level box** 是与块级元素相对的概念，指不会形成新内容块的元素，其内容可分布于多行。
2. 行内级元素生成**行内级盒（inline-level box）**，即参与行内格式化上下文的盒。
3. **行内盒（inline box）**是特殊的行内级盒，其内容参与行内格式化上下文。也就是说，inline box 包含了其他inline-level box。inline box的内容盒，也参与行内格式化上下文。inline box的内容，均是 inline-level box。
   （inline box 对外参与块级格式化上下文）这句话是错误的，不准确。
4. **原子行内级盒（atomic inline-level boxes）** 不属于inline box 的行内级盒（inline-block、replaced elements生成的盒等）。它们作为独立不透明盒（single opaque box）参与所在行内格式化上下文。
5. 综上所述：**inline-level box = atomic inline-level box + inline box**



### 2.2 行内盒详解

1. Q：哪些类型的行内级盒是行内盒？哪些不是？
   A：inline box： <1>non-replaced element 生成的 inline-level box。<2>'display’值为’inline’。
        不是 inline box： inline replaced element & inline-block。行内替换元素，行内块。原因： inline box的区分，主要是看它是否可以包含其他 inline-level box。是看它的内容是否是 IFC（参与行内格式化上下文）。
2. Q：行内盒内容参加它的包含行内格式化上下文具体含义是什么？（行内格式化上下文以下简称IFC）
   A：首先，“包含” 指的是行内盒**被包含**的块容器，也就是行内盒所在的块容器。行内级盒都会参加所在块容器内的IFC。
   而行内盒（inline box）更进一步，其子内容也遵循父级所在的IFC。也就是说，inline box 是 inline-level box 的子集。
   举个例子，IFC中规定了行宽，行内盒中内容也遵循父级所在的IFC，即当其内容超出行宽时，也会折行。

```css
        div{
            width: 150px;
            border:royalblue solid;
        }
        span{
            border:orange solid;
        }
   <div>
        <span>我练功发自真心， 啊♂，乖♂乖♂换♂行</span>
    </div>
```

![在这里插入图片描述](/Users/moxyninja/GreenTea-Lemon/CSS/摘录/source/20190125111243694.png)

非 inline box：inline-block，行内替换元素等，不会换行，不归CSS渲染。最直白的例子——作为非行内盒的图片不会因为超出行宽而劈成两半分行显示。

```css
        img{
            width: 200px;
            height: 200px;
        }
```

![在这里插入图片描述](/Users/moxyninja/GreenTea-Lemon/CSS/摘录/source/20190125133320711.png)

3. Q：哪些行内元素生成的行内级盒是原子行内级盒？ 如何理解“原子”和“独立非透明盒”
   A：行内替换元素，inline-block生成的行内级盒是原子行内级盒。所谓原子性，即不可再分，主要表现为，无论是否超过行框约束，都不会出现折行，就如Q&A2示例中的图片；
   独立非透明盒(singleopaque box)，是一个通用术语，在测试领域，也被称为黑盒(black box)。所谓独立非透明盒，即原子盒的内部不参与外部IFC，而遵循内部自有的格式化上下文。又如Q&A2示例中的图片，它并不受外部IFC行框限制，可以设置独立的宽高。



### 2.2 匿名行内盒

与匿名块级盒类似的，为了避免格式化上下文不统一，也存在匿名行内盒。当任何文本直接包含于块级容器时，将会被当作匿名行内元素对待，并生成相应匿名行内盒。

- 与匿名块级盒一样，匿名行内盒从它们的父级块盒继承了可继承的属性，不可继承的属性取其默认值。
- 匿名行内盒也无法被CSS选择器选中。
- 根据’white-space’属性合并起来的空白字符内容，不会生成任何匿名行内盒。
  示例如下：

```css
        div{
            white-space: nowrap; 
            color: royalblue;
            border:springgreen solid;
            margin: 20px;
        }

        span{
            color: seagreen
        }
```

![在这里插入图片描述](/Users/moxyninja/GreenTea-Lemon/CSS/摘录/source/20190125135555772.png)
![在这里插入图片描述](/Users/moxyninja/GreenTea-Lemon/CSS/摘录/source/20190125144402402.png)
在示例中，匿名行内盒与span排列在一行，字体颜色继承自父级块容器，而无法继承的margin被置为默认值0。因为white-space设置为nowrap，即合并空白符和换行符，所以这些被合并的空白字符不会产生匿名盒

如果将white-space设为pre，即保留各种空白符，则现象如下:
空白符也生成了匿名盒，包含了一系列空白符和首尾各一个换行符
![在这里插入图片描述](/Users/moxyninja/GreenTea-Lemon/CSS/摘录/source/201901251355557723.png)
![在这里插入图片描述](/Users/moxyninja/GreenTea-Lemon/CSS/摘录/source/20190125144452149.png)

# display 属性 CSS2.2

display属性可用于指定html元素的盒类型，其取值有：

- block
  让元素生成一个块盒
- inline-block
  让元素生成一个行内级块容器，即内部被格式化成一个块盒，而元素本身会被格式化成一个**原子行内级盒**
- inline
  让元素生成一个或多个行内盒
- list-item
  让元素生成一个主块盒和一个标记盒。
- none
  该值会让元素不在格式化结构（formatting structure）中出现（即在视觉媒体中，元素不会生成盒也不会影响布局）。后代元素也不会生成任何盒，该元素及其内容会从格式化结构中全部移除。这种行为不能通过给后代设置’display’属性来重写
  有关元素的显示切换与可见性，详细请参考[显示切换](https://blog.csdn.net/qq_36145914/article/details/86504236)

# 参考

> [W3C CSS2.2官方文档](https://www.w3.org/TR/CSS22/visuren.html#inline-boxes)
> [ayqy CSS2.1 2016版翻译](http://www.ayqy.net/doc/css2-1/cover.html#minitoc)

# 感谢

感谢MDN，stackoverflow。社区中大佬的无私分享，让我们这些后来者能更容易地理解某些生涩的概念。



# 包含块

containing block 包含块。

- 包含块是针对 position属性而来的。决定了position属性，基于什么参照物（包含块），来决定该元素生成盒的位置。
- initial containing block 初始包含块：根元素所在的包含块。大小和视口大小相当。
- 元素的 position 值是 'relative' or 'static', 包含块是最近的 block container box 的边界。
- 元素的 position 值是 'fixed'，包含块是初始包含块，即适口大小。
- 元素的 position 值是 'absolute'，包含块是最近的 非static的、block container box 的边界。



