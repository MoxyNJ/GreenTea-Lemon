# CSS | 行内格式化上下文(IFC)



### 文章目录

- [前言](http://81.69.57.175/CsdnArticle/Show?cdkey=1f622943326a4a9181427b1e15d96a3etb&url=https://blog.csdn.net/qq_36145914/article/details/87009453#_1)
- [行内格式化上下文 （Inline Formatting Contexts）](http://81.69.57.175/CsdnArticle/Show?cdkey=1f622943326a4a9181427b1e15d96a3etb&url=https://blog.csdn.net/qq_36145914/article/details/87009453#_Inline_Formatting_Contexts_6)
- - [水平放置](http://81.69.57.175/CsdnArticle/Show?cdkey=1f622943326a4a9181427b1e15d96a3etb&url=https://blog.csdn.net/qq_36145914/article/details/87009453#_7)
  - [垂直对齐](http://81.69.57.175/CsdnArticle/Show?cdkey=1f622943326a4a9181427b1e15d96a3etb&url=https://blog.csdn.net/qq_36145914/article/details/87009453#_19)
  - [行框](http://81.69.57.175/CsdnArticle/Show?cdkey=1f622943326a4a9181427b1e15d96a3etb&url=https://blog.csdn.net/qq_36145914/article/details/87009453#_23)
  - - [定义](http://81.69.57.175/CsdnArticle/Show?cdkey=1f622943326a4a9181427b1e15d96a3etb&url=https://blog.csdn.net/qq_36145914/article/details/87009453#_24)
    - [行高](http://81.69.57.175/CsdnArticle/Show?cdkey=1f622943326a4a9181427b1e15d96a3etb&url=https://blog.csdn.net/qq_36145914/article/details/87009453#_28)
    - [行宽](http://81.69.57.175/CsdnArticle/Show?cdkey=1f622943326a4a9181427b1e15d96a3etb&url=https://blog.csdn.net/qq_36145914/article/details/87009453#_45)
    - - [浮动字围](http://81.69.57.175/CsdnArticle/Show?cdkey=1f622943326a4a9181427b1e15d96a3etb&url=https://blog.csdn.net/qq_36145914/article/details/87009453#_48)
      - [溢出与分割](http://81.69.57.175/CsdnArticle/Show?cdkey=1f622943326a4a9181427b1e15d96a3etb&url=https://blog.csdn.net/qq_36145914/article/details/87009453#_52)
- [line-height 与 vertical-align](http://81.69.57.175/CsdnArticle/Show?cdkey=1f622943326a4a9181427b1e15d96a3etb&url=https://blog.csdn.net/qq_36145914/article/details/87009453#lineheight__verticalalign_63)



# 前言

本文内容隶属于[定位方式](https://blog.csdn.net/qq_36145914/article/details/86690153)中的*常规流* 章节，是行内格式化上下文的详细内容（以下简称为IFC）
下文会涉及到“包含块”和“文本方向direction”概念，若困惑，可参考[包含块](https://blog.csdn.net/qq_36145914/article/details/87193046)和[direction](https://blog.csdn.net/qq_36145914/article/details/87092125)。
如若对行内相关定义不甚了解，建议先阅读[盒类型 与 display 显示属性](https://blog.csdn.net/qq_36145914/article/details/86613007)一文中的行内部分。



# 行内格式化上下文 （Inline Formatting Contexts）

## 水平放置

- 在IFC中，盒是从包含块顶部，按相应文本方向，一个挨一个**水平放置**的。这些盒之间的**水平外边距，边框和内边距都有效**，而**垂直外边距不起作用**。
  示例：

```css
        span {
            padding: 20px;
            border: solid;
            margin: 30px;
        }
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190212095402738.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MTQ1OTE0,size_16,color_FFFFFF,t_70)

## 垂直对齐

- 盒在行内可以不同的方式垂直对齐：以它们的底部或者顶部对齐，或者以它们里面的文本的基线（baseline）对齐。
  具体规则请参考下一章——[line-height与vertical-align](https://blog.csdn.net/qq_36145914/article/details/87103801)

## 行框

### 定义

- 包含来自同一行所有盒的矩形区域叫做**行框(line box)**，行框是一个虚拟概念，并不实际渲染。
- 行框的宽度由包含块和浮动情况决定，行框的高度由[行高](https://blog.csdn.net/qq_36145914/article/details/87103801)决定。

### 行高

**行框总是足够高**，能够容纳它包含的所有盒。当若干行内级盒在水平方向上不能共存于一个行框时，它们会被分到多个垂直堆叠的行框里。行框间并无垂直间隔，并且它们**不会重叠**。

示例：

```html
    <div>
        <span>111</span>
        <span>222</span>
        <span>另起一行</span>
        <img src="./medal.png" alt="">
    </div>
```

本例中，行框宽度不足，后两个盒子另起一行。在计算行框高时，**不考虑非替换元素的内边距和边框**，而替换元素和inline-block则以外边距盒（margin box）参与计算。
所以，尽管下图中因为存在内外边距，元素盒渲染后有所重叠，但它们所处的行框实际并未重叠。（红线间的空间为第二行的行框）
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019021210174748.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MTQ1OTE0,size_16,color_FFFFFF,t_70)

### 行宽

- 一般来说，一个行框的左右边界均贴靠包含块。

#### 浮动字围

但当存在浮动盒时，浮动盒可能会跑到包含块边界与行框边界之间。行框的可用水平空间会因为浮动而减少，呈现出“字围”效果。
示例：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019021210282728.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MTQ1OTE0,size_16,color_FFFFFF,t_70)

#### 溢出与分割

- 当一行的行内级盒的总宽度小于所在行框的宽度时，它们在行框里的水平分布由’text-align’属性决定。
- 当行内盒超出行框宽度时，它会被分成几个盒，并且这些盒会跨多行框分布。如果一个行内块无法分割（如仅包含单个超出行宽的单词），那么该行内盒会从行框溢出。
  示例：
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190212105415523.png)
- 当一个行内盒被分割后，外边距，边框和内边距在分割处不会有视觉效果。
  示例：
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190212105952436.png)

# line-height 与 vertical-align

行框高度与垂直居中的具体规则，请参考下一章[ line-height 与 vertical-align](https://blog.csdn.net/qq_36145914/article/details/87103801)