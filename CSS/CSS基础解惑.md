# 1. position, float, display 的联系

### 相关概念：

层叠上下文： `z-index` 调整元素 z轴前后位置关系。



## 盒模型

### 外部显示类型

盒模型中，外部显示类型，决定了该盒子是块级盒子，还是内联盒子（block box，inline box）

### 内部显示类型

决定盒子内部是如何布局的。

- 默认：正常流。
- display: flex。稳步显示类型为block，内部显示类型为 flex。该盒子的所有直接子元素都会成为flex元素，会根据 [弹性盒子（Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) [）](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)规则进行布局。
- display: grid。同上，内部会变成 grid盒子。

### display

display可以改变盒子的外部显示类型是块级还是内联。也可以改变盒子的内部显示类型。

- `display: inline-block`：介于 内联 块级之前的状态：
  - 拥有部分 block 的性质：
    - width、height有效，可以设置盒子内容 content的大小；
    - padding、margin、border 会推开其他盒子。
  - 拥有部分 inline 的性质：
    - 盒子不会换行，多个内联盒子会并排排放；
  - 问题：
    - 如果设置了 width 内容宽度，则该盒子内的文本内容，会在盒内换行。不会横向溢出盒子，但文本内容过多，中纵向溢出盒子。
    - 如果没有设置 width 内容宽度，则该盒子的宽度，会随着文本内容的增多而撑开。但是如果盒子边界达到容器宽度，文本内容会在盒子中换行。



### 块级盒子（block box）

盒子的外部显示类型：`block`

- 盒子会变得和父容器一样宽；
- 每个盒子都会换行，纵向排列；
- width、height有效，可以设置盒子内容 content的大小；
- padding、margin、border 会推开其他盒子。

### 内联盒子（inline box）

盒子的外部显示类型：`inline`

- 盒子不会换行，多个内联盒子会并排排放；
- width、height无效，无法设置盒子内容 conte的大小；
- 垂直方向的 padding、margin、border 会被应用，但是不会把其他 inline的盒子推开；
- 水平方向的 padding、margin、border 会被应用，会把其他 inline的盒子推开。

### 页面流（page flow）



## 0. 格式化上下文

格式化上下文（formatting context）

- 行内格式化上下文 IFC（inline formatting context）：
- 块级格式化上下文 BFC（block formatting context）：

- [Block-level boxes](https://www.w3.org/TR/CSS22/visuren.html#block-level) participate in a [block formatting](https://www.w3.org/TR/CSS22/visuren.html#block-formatting) context.
- [Inline-level boxes](https://www.w3.org/TR/CSS22/visuren.html#inline-level) participate in an [inline formatting](https://www.w3.org/TR/CSS22/visuren.html#inline-formatting) context. 
- 块级格式化上下文中，包含块级盒子。
- 行内格式化上下文中，包含内联盒子。

- block container box：包含 block-level boxes 、由 inline-level boxes 建立的 IFC组成。
- Block-level boxes：在 BFC中的盒子，都是 Block-level boxes。
  - block-level box: a block-level box is also a block container box unless it is a table box or the principal box of a replaced element.
- Block-level elements：块级的元素。或者 display的值为 'block', 'list-item', 'table'。个人认为 Block-level elements 可以和 Block-level boxes 含义等同，一个是HTML角度，一个是CSS渲染角度。

Block-level boxes 和 block container boxes 的区别：

- 未替换的 inline blicks + table cells 是 block container boxes，但他们不是 Block-level boxes。

- block boxes：block container boxes。或者说部分 Block-level boxes。
- winter说的 Block Container 就是文中的 block cintainer boxes



#### Block formatting contexts







## BFC 块级格式化上下文

### 1 引入概念：

### 1.0 Box

页面中，任何一个元素，都可以看成是一个Box。

Box分为：

- Block-level Box：块级盒，
- Inline-level Box：行级盒，
- 匿名盒。 

### 1.1 Block

- Block Container 块级容器：里面能装BFC的盒子，也就是能容纳正常流的盒子，就能容纳 BFC。
- Block-level Box 块级盒：能放进BFC里的盒子，也就是这个盒子外面可以有 BFC。
- Block Box 块盒子 = Block Container + Block-level Box  ，换句话说：  
  - 里外都有BFC的盒子 = 里面有BFC的盒子 + 外面有BFC的盒子

### 1.2 Block Container

一个重要的判断依据：这些盒子的里面是不是可以有正常流。以下都是 Block Container：

- display: block
- display: inline-block
- display: table-cell
- display: flex 的 item：flex盒的子项目。
- display: grid 的 cell：grid的子项目。
- display: table-caption：表格的标题。

### 1.3 Block-level Box

这里顺带一提，display通常有两对值，块级 / 行内级 两种都有对应关系。

<img src="/Users/moxyninja/GreenTea-Lemon/winter Js课程/Week-9&10/source/Block-level Box.png" alt="image-20201110214259360" style="zoom: 33%;" />

line-box 行盒：文字 / inline-box内联盒排出来的一整行盒，就是 line-box。

最终，纵向上看，排版就是一列列的 line-box 和 block-level-box 组成。所以，块级的叫BFC，行内的叫IFC。

 <img src="/Users/moxyninja/GreenTea-Lemon/CSS/排布.png" alt="image-20201115220544855" style="zoom:33%;" />



inline-level-box 行内级别的盒





以下都不是 Block Container：

- table-row：不是 Block Container，因为它里面是 table-cell，不是正常流。
- display: flex：不是 Block Container，它的子项目是。
- ... 

BFC的表现：

- 一个BFC中的浮动元素，不会“越界”挤压另一个BFC的文本内容，可以达到清除浮动的效果。
- 不同的BFC中，不会有 margin callapse 外边距压缩问题。
- 块级盒子的左边界，必须于包含块的左边界对齐。

### BFC的生成条件（4类）：

- floats：float元素，因为浮动元素是内部，是一个正常流。
- absolutely positioned elements。绝对、固定定位的元素，position：fixed、absolute。
- block cintainers：能放BFC的盒子。Block-level Box不能放，不可以。
- overflow属性不是visible的元素（hidden，scroll，auto，inherit）。当内容移除元素边框时的处理方式。

换一种记忆方式：

- 可以容纳正常流的盒，都可以创建BFC +  Block Box 里外都是BFC，同时 `overflow: 不是visible`。





## containing block 包含块

大多数情况下，包含块就是这个元素最近的祖先[块级元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements)的[Content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model#content-area)，少数情况下不是这样。

### 如何确定一个元素的 Containing Block 包含块，由position属性确定：

- 

### 包含块的作用

元素的尺寸和位置，受包含块的影响。以下属性，在设置属性值为**百分比**时，该计算值结果，就是通过元素的包含块计算得来：

- 元素的尺寸：width、height、padding、margin
- 元素的位置：绝对定位（position：absolute、fixed）元素的偏移值属性（top、left、bottom、right）。

### 包含块的确定：

确定一个元素的包含块的过程完全依赖于这个元素的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 属性：

- static / relative：父元素的内容框 content。或者有可能建立一个新的格式化上下文。
- absolute：一层层的父元素中，是非 static 的元素( fixed, absolute, relative, sticky)。
- fixed：根元素（html / body）





## 1. position

CSS **`position`**属性用于指定一个元素在文档中的定位方式。[`top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/top)，[`right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/right)，[`bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/bottom) 和 [`left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/left) 属性则决定了该元素的最终位置。

- static：默认。元素使用正常流的方式排版。此时 `top`, `right`, `bottom`, `left` 和 `z-index `属性无效。
- relative：相对定位。元素在正常流中，会相对于该元素原始位置（static位置）进行移动。
- absolute：绝对定位。元素被移除正常流，会相对于上级的、非static的元素移动。
- fixed：固对定位。元素被移除正常流，会相对于视口（viewport）移动，会创建一个新的层叠上下文。
- sticky：元素在正常流中，相对*最近滚动祖先（nearest scrolling ancestor）*和 [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_Block) (最近块级祖先 nearest block-level ancestor)移动。会创建一个新的层叠上下文。一个sticky元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上。



## 2. float

float CSS属性指定一个元素应沿其容器的左侧或右侧放置，允许**文本**和**内联元素**环绕它。该元素从网页的正常流动(文档流)中移除。

- 判定为浮动元素的标准：float的计算值，不是 none 的元素。float通常会受display的影响。
- 浮动的定位方式：元素浮动后，会被移除正常流，然后向左/向右**平移（在该行内块中移动）**，一直平移到触碰容器边框 / 另一个浮动元素。

### clear

**`clear`** [CSS](https://developer.mozilla.org/en-US/docs/CSS) 属性指定一个元素是否必须移动(清除浮动后)到在它之前的浮动元素下面。适用于浮动和非浮动元素。

- 针对 float 元素：可以让该 float元素不是按照**平移**的方式排到其他浮动元素后，而是另起一行，拍到第一个。
- 针对 非float 元素：可以让该元素的文本 / 内联元素，不是环绕 float元素。而是将该元素的边框边界，全部移到 float元素的下方。同时会发生外边距折叠。

- none：不清除浮动
- left：清除左浮动，向下移动。
- right：清除右浮动，向下移动。
- both：左右浮动全部清除，向下移动。