# CSS | 置换元素（可替换元素）



### 文章目录

- [置换元素](http://81.69.57.175/CsdnArticle/Show?cdkey=5e72551c917e406b803d363dfa73b098tb&url=https://blog.csdn.net/qq_36145914/article/details/86616396#_2)
- - [定义](http://81.69.57.175/CsdnArticle/Show?cdkey=5e72551c917e406b803d363dfa73b098tb&url=https://blog.csdn.net/qq_36145914/article/details/86616396#_3)
  - [常见置换元素](http://81.69.57.175/CsdnArticle/Show?cdkey=5e72551c917e406b803d363dfa73b098tb&url=https://blog.csdn.net/qq_36145914/article/details/86616396#_5)
- [固有尺寸](http://81.69.57.175/CsdnArticle/Show?cdkey=5e72551c917e406b803d363dfa73b098tb&url=https://blog.csdn.net/qq_36145914/article/details/86616396#_23)
- [非置换元素](http://81.69.57.175/CsdnArticle/Show?cdkey=5e72551c917e406b803d363dfa73b098tb&url=https://blog.csdn.net/qq_36145914/article/details/86616396#_29)
- [**注意](http://81.69.57.175/CsdnArticle/Show?cdkey=5e72551c917e406b803d363dfa73b098tb&url=https://blog.csdn.net/qq_36145914/article/details/86616396#_32)


若文章有任何纰漏或未涉及你想了解的内容，欢迎在评论提出，我会尽最快速度回复。



# 置换元素

## 定义

置换元素是具有**固有尺寸**（intrinsic dimensions），浏览器根据**其标签和属性**决定显示内容的元素。

## 常见置换元素

1.视图元素，如`<img>`、`<object>`, `<video>` ；
\2. 表单元素，如`<textarea>`,`<input>` 。
\3. 某些元素只在一些特殊情况下表现为可替换元素，例如 `<audio>`和`<canvas>` 。
\4. 通过 CSS content 属性插入的对象 被称作 匿名可替换元素（anonymous replaced elements）。

置换元素的示例：

```html
<input type="button" value="确定">
<img src="../img/demo.png">
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190123194042229.png)

1. 浏览器根据img的src属性渲染出对应路径的图片。图片**具有固有尺寸，即你不做设置时，它就会照其固有尺寸渲染**。
2. 浏览器根据input的type属性将其渲染为浏览器默认样式的按钮，并根据value渲染按钮上的文本。

# 固有尺寸

一个元素具有固有尺寸，即它的宽高由其自身定义，并不受周围元素。**根据W3C文档，有且仅有全体替换元素是具有固有尺寸的**。

> Intrinsic dimensions
> The width and height as defined by the element itself, not imposed by the surroundings. In CSS2 it is assumed that all replaced elements – and only replaced elements – come with intrinsic dimensions.

# 非置换元素

非置换元素，即表面意思，不是置换元素的元素。

# **注意

一般行内元素是没有宽高属性的，但**行内置换元素有可修改的宽高属性**，其默认值即元素的固有宽高。
示例如下：

```css
        input,span{
            height: 200px;
            width: 200px;
            border:solid
        }
    <input type="text" placeholder="input作为置换元素可以设置宽高">
    <span>span作为行内非置换元素，设置宽高无效</span>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190326103924786.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MTQ1OTE0,size_16,color_FFFFFF,t_70)