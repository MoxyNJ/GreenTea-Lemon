# CSS | 视觉格式化模型(Visual formatting model)



### 文章目录

- [视觉格式化模型的简介](http://81.69.57.175/CsdnArticle/Show?cdkey=6c59affa0ceb4d6895e16e0cd82d0398tb&url=https://blog.csdn.net/qq_36145914/article/details/86609690#_1)
- [布局](http://81.69.57.175/CsdnArticle/Show?cdkey=6c59affa0ceb4d6895e16e0cd82d0398tb&url=https://blog.csdn.net/qq_36145914/article/details/86609690#_3)
- - [1.盒类型与显示属性](http://81.69.57.175/CsdnArticle/Show?cdkey=6c59affa0ceb4d6895e16e0cd82d0398tb&url=https://blog.csdn.net/qq_36145914/article/details/86609690#1_16)
  - [2.盒模型尺寸](http://81.69.57.175/CsdnArticle/Show?cdkey=6c59affa0ceb4d6895e16e0cd82d0398tb&url=https://blog.csdn.net/qq_36145914/article/details/86609690#2_19)
  - [3.定位方式](http://81.69.57.175/CsdnArticle/Show?cdkey=6c59affa0ceb4d6895e16e0cd82d0398tb&url=https://blog.csdn.net/qq_36145914/article/details/86609690#3_25)
  - [4.格式化上下文](http://81.69.57.175/CsdnArticle/Show?cdkey=6c59affa0ceb4d6895e16e0cd82d0398tb&url=https://blog.csdn.net/qq_36145914/article/details/86609690#4_29)



# 视觉格式化模型的简介

- 可视化格式模型(Visual formatting model)，即浏览器处理DOM树的方式。

# 布局

DOM树由若干盒子组成，这些盒子的布局受如下几点因素控制:

1. 盒类型与显示属性（display：block,inline,inline-block,flex,etc.）
2. 盒模型尺寸（width,height,padding,border,margin）
3. 定位方式（normal flow, float, and absolute）
4. 格式化上下文（BFC,IFC,GFC,FFC）
5. 元素间关系（父子，兄弟等）
6. 额外信息（viewport，置换元素如图片的实际尺寸等）

 接下来，将分篇幅解析这些控制因素。

## 1.盒类型与显示属性

1. [盒类型与显示属性](https://blog.csdn.net/qq_36145914/article/details/86613007)

## 2.盒模型尺寸

1. [盒模型的宽度计算规则](https://blog.csdn.net/qq_36145914/article/details/87617799)
2. [盒模型的高度计算规则](https://blog.csdn.net/qq_36145914/article/details/87617799)
3. [相对定位下，盒偏移量的计算规则](https://blog.csdn.net/qq_36145914/article/details/87258389)
4. [margin与padding 百分比](https://blog.csdn.net/qq_36145914/article/details/87619937)

## 3.定位方式

1. [定位方式](https://blog.csdn.net/qq_36145914/article/details/86690153)

## 4.格式化上下文

1. [块格式化上下文(BFC)](https://blog.csdn.net/qq_36145914/article/details/86998282)
2. [行内格式化上下文(IFC)](https://blog.csdn.net/qq_36145914/article/details/87009453)