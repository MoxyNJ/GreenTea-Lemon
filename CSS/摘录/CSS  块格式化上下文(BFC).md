# CSS | 块格式化上下文(BFC)



### 文章目录

- [前言](http://81.69.57.175/CsdnArticle/Show?cdkey=bb78c7d89468446eac49d632b0ada02dtb&url=https://blog.csdn.net/qq_36145914/article/details/86998282#_2)
- [块格式化上下文（Block Formatting Context）](http://81.69.57.175/CsdnArticle/Show?cdkey=bb78c7d89468446eac49d632b0ada02dtb&url=https://blog.csdn.net/qq_36145914/article/details/86998282#Block_Formatting_Context_5)
- - [什么是BFC](http://81.69.57.175/CsdnArticle/Show?cdkey=bb78c7d89468446eac49d632b0ada02dtb&url=https://blog.csdn.net/qq_36145914/article/details/86998282#BFC_6)
  - [生成BFC的元素类型](http://81.69.57.175/CsdnArticle/Show?cdkey=bb78c7d89468446eac49d632b0ada02dtb&url=https://blog.csdn.net/qq_36145914/article/details/86998282#BFC_11)
  - [生成BFC与脱流](http://81.69.57.175/CsdnArticle/Show?cdkey=bb78c7d89468446eac49d632b0ada02dtb&url=https://blog.csdn.net/qq_36145914/article/details/86998282#BFC_19)
  - [BFC的规则](http://81.69.57.175/CsdnArticle/Show?cdkey=bb78c7d89468446eac49d632b0ada02dtb&url=https://blog.csdn.net/qq_36145914/article/details/86998282#BFC_24)
  - - [垂直放置](http://81.69.57.175/CsdnArticle/Show?cdkey=bb78c7d89468446eac49d632b0ada02dtb&url=https://blog.csdn.net/qq_36145914/article/details/86998282#_25)
    - [margin折叠（垂直外边距合并）](http://81.69.57.175/CsdnArticle/Show?cdkey=bb78c7d89468446eac49d632b0ada02dtb&url=https://blog.csdn.net/qq_36145914/article/details/86998282#margin_28)
    - [紧挨内容块](http://81.69.57.175/CsdnArticle/Show?cdkey=bb78c7d89468446eac49d632b0ada02dtb&url=https://blog.csdn.net/qq_36145914/article/details/86998282#_53)
    - - [存在浮动时](http://81.69.57.175/CsdnArticle/Show?cdkey=bb78c7d89468446eac49d632b0ada02dtb&url=https://blog.csdn.net/qq_36145914/article/details/86998282#_57)



# 前言

本文内容隶属于[定位方式](https://blog.csdn.net/qq_36145914/article/details/86690153)中的常规流，是块格式化上下文的详细内容（以下简称为BFC）

# 块格式化上下文（Block Formatting Context）

## 什么是BFC

BFC即Block Formatting Content “块级格式化上下文”
它是页面的一块渲染区域，有一套渲染规则，决定了子元素如何布局，以及和其他元素之间的关系和作用。
创建新BFC的盒子是独立布局的，盒子里的样式不会影响到外面的元素。

## 生成BFC的元素类型

会生成新BFC的元素有：

1. 根元素，即HTML元素
2. float的值不为none
3. overflow的值部位visible
4. display的值为inline-block、table-cell、table-caption
5. position的值为absolute或者fixed

## 生成BFC与脱流

流外元素（浮动元素，绝对定位元素等）生成新BFC的同时，会脱离常规流。
而inline-block，overflow不为visible的元素会生成新BFC，但并不脱离常规流。

## BFC的规则

### 垂直放置

- 在一个BFC中，从包含块的内容块(content)顶部开始, 盒在**垂直方向**一个接一个地放置，如下图所示：
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190211164007353.png)

### margin折叠（垂直外边距合并）

- 同一BFC**内**，相邻块级盒之间的垂直外边距会合并，取其中最大的margin值为相邻外边距。
  如下所示：

```html
      <div class="top"></div>
      <div class="bottom"></div>
	    div{
            width: 100px;
            height: 100px;
            border:solid royalblue
        }

        .top{
            margin-bottom: 30px;
        }

        .bottom{
            margin-top: 100px;
        }
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190211164231181.png)

### 紧挨内容块

- 在一个BFC中，每个盒的左外边距边缘，挨着包含块的左内容块边界（若direction为rtl，则从右向左格式化，右外边界挨着）。
  以ltr方向为例，如下所示：
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190211164933516.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MTQ1OTE0,size_16,color_FFFFFF,t_70)

#### 存在浮动时

1. 当存在浮动时，规则依然适用。前盒浮动时，后盒（last)上移，仍紧挨包含块左内容块边界。
   如下图所示
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190211170211240.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MTQ1OTE0,size_16,color_FFFFFF,t_70)
2. 不过，若last盒建立了一个新BFC，则last盒的布局会考虑浮动前盒。
   如下图所示：
   我们通过修改overflow属性使得后盒建立了新的BFC，因为考虑浮动的前盒，其并没有覆盖在浮动盒上，其宽度因浮动盒占据空间而变窄。
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190211170323210.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MTQ1OTE0,size_16,color_FFFFFF,t_70)