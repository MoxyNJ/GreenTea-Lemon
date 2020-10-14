# 一、let 和 const 命令

## 1. let 命令

------

### 1.1 基本用法

var和let：与var不同，let只在代码块内有效。{ 一个大括号，就是一个代码块 }

for循环：设置循环变量部分（两个分号）是一个父作用域，循环体内部（大括号）是子作用域。

其实个人认为，和Java中的变量效果一样了。



## 2. const命令

------

const就是常量。声明的时候必须初始化，一旦声明后，不可以修改。

### 本质

简单数据类型：number，string，boolean，值就保存在变量指向的那个内存地址，就相当于常量了。这和Java中相同，都保存在常量池中。

所以，const是利用指针的固定（指向另一个固定的地址）的方式，来保证变量的数值不变。

利用const，将一个变量指向一个对象。则const指向这个对象这是件事情是不可改变的，也就是说，变量中保存的内存地址是不可改变的。但是指向的那个“对象”，是可以改变内容的。可以动态的给对象中增删属性。

Object.freeze(obj)，可以冻结一个对象，令这个对象无法删改属性。

## 3. ES6 声明变量的六种方法

-------------

ES5方法：

- var

- function

ES6方法：

- let

- const

面向对象：

- import

- class



## 4. 顶层对象

------

- var、function 的声明变量，默认是顶层对象的属性（window、global对象）

- let、const、class命令声明的全局变量，不属于顶层对象的属性。



# 二、字符串的表示

-----------------------

## 1. ES6的改进

-------------------------

增加了大括号表示法，将码点放入大括号中，解决字符在双字节的时候，被误认为是两个单字节的情况。

JavaScript有 6 种方法可以表示一个字符：

```javascript
'\u{7A}' === 'Z' // true ES6 新方案
'\u007A' === 'z' // true
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
```

字符串的遍历：

```javascript
let x = 'abc'
for (let point of x) {
    console.log(point)
}
// "a"
// "b"
// "c"
```



## 2. 模板字符串

---

template string 增强版的字符串：类似于所见即所得，也就是说可以和你输入的样子一样输出（字符串中的回车，也会被正确的显示出来）。

在模板字符串中，变量名、函数调用等等，用：`${}`  的方式表示出来。

```javascript
// 以前的写法
console.log('User ' + user.name + ' is not authorized to do ' + action);

// 模板字符串的写法
console.log(`User ${user.name} is not authorized to do ${action}`);

// 函数调用：
console.LOG(`this is function: ${func()}`);

```



## 3. 标签模板

---

函数调用中的一种特殊形式。

标签：指的就是函数。模板字符串：就是函数的参数。

```javascript
//  这两者是相等的,反引号中的字符串，会被识别为一个数组。
func1`hello`
func1(['hello'])

//  这两者是相等的,在大括号中遇到计算，会先计算然后当作参数传递给函数
let a = 5;
let b = 10;
func2`Hello ${ a + b } world $ { a * b } `
func2(['Hello ', ' world ', ''], a + b, a * b)
func2(['Hello ', ' world ', ''], 15, 50)

// 例子1
// func2 函数会收到的第一个参数，是一个数组。数组的成员就是模板字符串中，没有被变量替换的部分： Hello world。
// func2 函数被替换掉的部分，会当成普通参数，在后面依次传入：15，50。
fucntion func2(s, v1, v2) {
    console.log(s[0]);
    console.log(s[1]);
    console.log(s[2]);
    console.log(v1);
    console.log(v2);
	return "OK";
}

func2`Hello ${ a + b } world $ { a * b } `
// 依次输出：
// "Hello "
// " world "
// ""
// 15
// 50
// "OK"

// 例子2
// 函数参数第一个永远是数组。
// 反引号中的字符串，被每个变量断开，最终传递给函数的参数顺序是：
// 函数中的参数：str, V1, V2, V3....
// 字符串被传递时，切割的顺序：str[0], v1, str[1], v2, str[2], v3, str[3]...
let total = 30;
let msg = passthru`The total is ${total} (${total*1.05} with tax)`;
// 识别： passtru(['The total is ', '(', ' with tax)'], 30, 31.5)
function passthru(s, v1, v2){
    let result = '';
    let i = 0;

    while (i < literals.length) {  
        result += literals[i];
        i++;
        
        if (i < arguments.length) {
            result += arguments[i];
        }
    }

    return result;
}
msg // "The total is 30 (31.5 with tax)"
```



看到：`passthru`函数采用 rest 参数的写法如下。





