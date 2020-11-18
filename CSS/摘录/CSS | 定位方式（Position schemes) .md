# CSS | 定位方式（Position schemes)



### 文章目录

- [前言](http://81.69.57.175/CsdnArticle/Show?cdkey=1b1c024223eb4280b0d459695719280atb&url=https://blog.csdn.net/qq_36145914/article/details/86690153#_2)
- [定位方案](http://81.69.57.175/CsdnArticle/Show?cdkey=1b1c024223eb4280b0d459695719280atb&url=https://blog.csdn.net/qq_36145914/article/details/86690153#_5)
- [流内&流外](http://81.69.57.175/CsdnArticle/Show?cdkey=1b1c024223eb4280b0d459695719280atb&url=https://blog.csdn.net/qq_36145914/article/details/86690153#_12)
- [误导的“标准文档流”](http://81.69.57.175/CsdnArticle/Show?cdkey=1b1c024223eb4280b0d459695719280atb&url=https://blog.csdn.net/qq_36145914/article/details/86690153#_16)
- [Position 属性](http://81.69.57.175/CsdnArticle/Show?cdkey=1b1c024223eb4280b0d459695719280atb&url=https://blog.csdn.net/qq_36145914/article/details/86690153#Position__27)
- [盒偏移](http://81.69.57.175/CsdnArticle/Show?cdkey=1b1c024223eb4280b0d459695719280atb&url=https://blog.csdn.net/qq_36145914/article/details/86690153#_43)
- - [盒偏移量计算](http://81.69.57.175/CsdnArticle/Show?cdkey=1b1c024223eb4280b0d459695719280atb&url=https://blog.csdn.net/qq_36145914/article/details/86690153#_53)
  - [详细解析](http://81.69.57.175/CsdnArticle/Show?cdkey=1b1c024223eb4280b0d459695719280atb&url=https://blog.csdn.net/qq_36145914/article/details/86690153#_68)
  - - [Normal flow 常规流](http://81.69.57.175/CsdnArticle/Show?cdkey=1b1c024223eb4280b0d459695719280atb&url=https://blog.csdn.net/qq_36145914/article/details/86690153#Normal_flow__69)
    - - [relative](http://81.69.57.175/CsdnArticle/Show?cdkey=1b1c024223eb4280b0d459695719280atb&url=https://blog.csdn.net/qq_36145914/article/details/86690153#relative_74)
    - [float](http://81.69.57.175/CsdnArticle/Show?cdkey=1b1c024223eb4280b0d459695719280atb&url=https://blog.csdn.net/qq_36145914/article/details/86690153#float_80)
    - [absolute](http://81.69.57.175/CsdnArticle/Show?cdkey=1b1c024223eb4280b0d459695719280atb&url=https://blog.csdn.net/qq_36145914/article/details/86690153#absolute_82)



# 前言

 本文是[视觉格式化模型](https://blog.csdn.net/qq_36145914/article/details/86609690)的第二章，重点介绍CSS2.1中的三大定位方式。

# 定位方案

CSS 2 中，可以采取三种定位方案对盒进行布局：
**常规流（normal flow)** : 常规流包括块格式化，行格式化与相对定位。
**浮动** : 一个盒浮动时，会先按照常规流来摆放，再从常规流中取出并向左或向右偏移。
**绝对定位**：一个盒在绝对定位时，会从常规流中完全脱离出来，不再对后续兄弟元素产生影响，并相对其包含块来指定位置。

# 流内&流外

如果一个元素是浮动、绝对定位或根元素，那么它就在常规流之外，被称为流外（out of flow）的元素。
如果一个元素不是常规流之外的元素，那么它被称流内（in-flow）的元素。元素A的常规流包括元素A以及其包含在其常规流下的一级元素，即如果元素A的常规流内有流外元素B，则流外元素B以及它的常规流下的内容则不属于元素A的流。

# 误导的“标准文档流”

  在进入接下来的内容前，我们先纠正一个伪定义——“标准文档流”。标准文档流是一个我们或多或少接触过的说法，它并不是normal flow的译名，它在常规流的基础上夹杂了很多不负责任的内容，在此我们对其进行如下纠正。

1. 经过[盒类型与显示属性](https://blog.csdn.net/qq_36145914/article/details/86613007)的学习，你应该知道一个块容器盒中有且仅有一种格式上下文，根本就不存在“从上到下，从左到右”的布局方式。
2. 通过对“流内流外”定义的学习，你应该知道每一个流外元素都会产生新的流，而html 根元素也只是单纯的一个流外元素。所谓“脱离标准文档流”实际上指的是脱离根元素的常规流。“标准文档流”显然只适用于一层脱流，无法表述元素B脱离从html根元素脱离的元素A的流”这样更进一层的情况。
3. 空白折叠与布局没有关系。我们仅通过 white-space 属性设置如何处理元素内的空白。浮动或绝对定位下元素的空白处理并无特别之处。

# Position 属性

Static
元素生成的盒子按照常规流方式拜访，此时盒偏移量（top,right,bottom,left）不起作用

Relative
盒的位置会先根据常规流方式计算，然后相对其在常规流中的位置进行偏移。相对定位的盒子并不脱离常规流，它仍在常规流中保持占位。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190211094137685.gif)

absolute
盒的位置由盒偏移量（top,right,bottom,left）决定，这些属性指定了盒相对于第一个非static定位的父元素的偏移距离。盒偏移量同时也参与绝对定位的盒尺寸计算。绝对定位的盒会脱离常规流，意味着它不会影响兄弟元素的布局。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190211100431395.gif)
fixed
固定定位（fixed）是一种特殊的绝对定位，除了会相对于参照（通常为浏览器窗口）外，盒的位置根据绝对定位方案计算。

# 盒偏移

如果元素的’position’属性不是’static’，则可被称为是定位元素（positioned）。定位元素生成定位盒（positioned boxes），根据以下4个属性布局：
top/right/bottom/left，分别代表盒四方向上的偏移量。

以下，仅举例说明TOP，其它类似：
Absolute： 绝对定位下，TOP指定了盒的上外边距边界离包含块的上边界的距离。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190211102036723.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MTQ1OTE0,size_16,color_FFFFFF,t_70)
Relative: 相对定位下，偏移量参照该盒自身的上边界。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190211104232901.gif)

## 盒偏移量计算

1.指定长度
偏移量是到参照边的固定距离。允许负值

2.百分比
偏移量left,right的百分比设置参照包含块宽度；
偏移量top,bottom的百分比设置参照包含块高度；
允许负值

3.auto
对于非替换元素，该值的效果取决于那些相关的值也是’auto’的属性。非替换元素的详细情况，见绝对定位的width和height章节。对于替换元素，该值的影响只取决于替换内容的固有尺寸。替换元素的详细情况，见绝对定位的width和height章节

## 详细解析

### Normal flow 常规流

常规流中的盒属于一个格式化上下文，可能是块或是行内（格式化上下文），但不能两者都是。块级盒参与块格式化上下文。行内级盒参与行内格式化上下文。
[块格式化上下文BFC](https://blog.csdn.net/qq_36145914/article/details/87009453)
[行内格式化上下文IFC](https://blog.csdn.net/qq_36145914/article/details/87009453)

#### relative

相对定位下，盒相对于其常规流中的位置进行偏移，且不影响后续盒的布局。
相对定位的位移遵循[盒偏移量的计算规则](https://blog.csdn.net/qq_36145914/article/details/87258389)
相对定位的元素可能会被其它盒遮盖，也可能被遮盖，这取决于重叠盒的[堆叠上下文与层级](https://blog.csdn.net/qq_36145914/article/details/87281870)。

### float

### absolute

绝对定位模型（absolute与fixed）中，盒相对其包含块进行偏移[盒偏移量的计算规则](https://blog.csdn.net/qq_36145914/article/details/87258389)，位移遵循它会从常规流中移除。绝对定位的盒会为常其后代建立新包含块与相应上下文。
绝对定位的元素可能会被其它盒遮盖，也可能被遮盖，这取决于重叠盒的[堆叠上下文与层级](https://blog.csdn.net/qq_36145914/article/details/87281870)。