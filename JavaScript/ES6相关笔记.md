# 零、let 和 const 命令

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



# 一、数组的解构赋值

---

## 1. 基本用法

---

解构（Destructuring）：从数组或对象中提取值，然后赋值给变量。

- 数组或对象，指的是可遍历的结构。是否具有Iterator接口。

模式匹配：只要等号两边的模式相同，左边的变量就会被赋予对应的值。

```javascript
let [a, b, c] = [1, 2, 3];
```



允许指定默认值。 只要值是Undefined或未定义，就会使用默认值（null不会用默认值）。

```javascript
let [x = 'b', y = 'b'] = ['a']  // x='a', y='b'
```



对象的属性没有次序，所以针对对象的结构赋值，必须变量与属性同名。

```javascript
const {log} = console;   // 把console.log方法，赋值给log变量。
let { log, sin, cos } = Math; // 把Math中的数学方法，赋值给对应名称的变量。

log('Hello')   // hello，调用log()方法，便是调用console.log()方法。
```



对象解构赋值的实质，依然是模式匹配。即等式两边的形式必须一致。只是对象左右两边的出现了简写：

```javascript
// 没有简化的对象解构赋值：
// 这里等式左右两边的形式相等：
// 要点：左边对象的属性名与右边对象的属性名一一对应。则右边对象的值赋给左边对象的值。
let { v1 : happy } = { v1 : 'aaa', v2 : 'bbb' };
happy // 'aaa'

// 没有简化的对象解构赋值2：
// 等式两边的对象不仅形式相等，而且左边对象的值、左边对象的属性名、右边对象的属性名都一一相等。达到简化条件。
// v1是匹配的模式，即对象的属性名是匹配模式，属性值是匹配的数值。
let { v1 ：v1 } = { v1 : 'aaa', v2 : 'bbb' };
V1 // 'aaa'

// 对上面进行简化：
let { v1, v2 } = { v1 : 'aaa', v2 : 'bbb' };
v1  // 'aaa'
v2  // 'bbb'

// 最后通常是这样的：
// 先定义对象
var person = { 
  v1 : 'aaa',
  v2 : 'bbb'
}
// 后进行解构赋值
let { v1, v2 } = person;
v1;  // "aaa"

```



## array 的解构赋值

数组的解构，本质上和对象类似。也可以对数组中的各种方法进行解构赋值。

## string 的解构赋值

字符串中，数值解构赋值，把字符串看成类似数组的样子了。

```javascript
let [a, b, c, d] = 'hello';
a  // "h"
b  // "e"
c  // "l"
d  // "o"
```

字符串中，属性（方法） 的解构赋值，看成对象：

```javascript
let {length : len} = 'hello'
len     // 5
```

## number 和 boolean 的解构赋值

数字和布尔值的解构赋值，会先自动包装成 Number 和 Boolean。

## 函数参数的解构赋值

函数的参数如果是一个数组，那么在传参数的时候，数组已经自动转换成了变量。

下例中，add方法的参数是一个数组，有两个元素分别是x，y。在传入参数后，变成了两个变量：x，y。这其实就是利用了解构赋值。在函数内部，自动使用解构赋值，将参数数组中的两个元素值，分别赋值给两个变量x，y。

```javascript
function add([x, y]) {
  console.log(`x=${x}, y=${y}`); // x=1, y=2
  return x + y
}

add([1, 2]);
```



## 圆括号麻烦

在解构赋值中使用圆括号，会带来许多麻烦，尽量少用吧。



## 解构赋值的用处

### 交换变量的值

```javascript
let x = 1;
let y = 2;

[x, y] = [y, x];
```

### 从函数中返回多个值

把多个值放入 数组 / 对象中返回。然后在调用该函数后，利用解构赋值把 数组 / 对象中的值取出来。

### 遍历Map结构

利用解构赋值，可以很方便的一次性把 key/value 都获取出来。

```javascript
// 定义一个map结构
let map = new Map();
map.set('first', 'hello')
map.set('second', 'world')

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

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



### 模板标签的应用

- 过滤HTML字符串，防止用户输入恶意内容：SaferHTML
- 实现多语言转换（国际化处理）。

- 实现在Javascript中，嵌入其他语言。
  - 模板字符串的限制：如果内嵌其他语言，可能会出现字符串转义，导致语义与内嵌语言不同。



# 三、字符串的新增方法

-----

## String.fromCodePoint()

-------

`String.fromCharCode()` : ES5方法，用于从Unicode码点返回对应的字符。局限性：无法识别码点大于0xFFFF的字符。比如：0x20BB7，会被识别为0x0BB7，最高位的2被舍弃了。

`String.fromCodePoint() ` : ES6方法，可以识别大于0xFFFF的字符。

```javascript
String.fromCodePoint(0x20BB7)   // "𠮷"
String.fromCodePoint(0x78, 0x1f680) === 'x\uD83D\uDE80y' // true
```



## 实例方法

------

### codePointAt()

扩展运算符（`...`）进行展开运算。

```
let arr = [...'𠮷a']; // arr.length === 2
arr.forEach(
  ch => console.log(ch.codePointAt(0).toString(16))
);
// 20bb7
// 61
```



# 四、正则的扩展

------

正则表达式有点难，我先空下了。



# 五、数值的扩展

----

## 1. 二进制和八进制

二进制的表示：0b、0B

八进制的表示：0o、00

```javascript
0b111110111 === 503 // true
0o767 === 503 // true

// Number方法，转换为十进制
Number('0b111')   // 7
Number('0o10')    // 8
```



## 2. 指数运算符

----

`**` ：表示两个数的指数运算。

### 右结合

多个指数运算符连用，是从最右边开始计算（从后往前）。

`**=` ：指数运算符与等号的结合

```javascript
a **= 2;
//   相当于 a = a * a
```



## 3. BigInt 数据类型

为了配合科学和金融方面的精确计算，改进64位浮点数的精度限制。

普通number类型的数据，精度只有53个二进制位，>=2^1024的数值，便无法表示。

ES202 引入了一种新的数据类型 BigInt（大整数）。只用来表示整数，任何位数的整数都可以精确表示。



### BigInt的特点

- BigInt类型的数据，末尾必须添加后缀n

  ```javascript
  const a = 2412354223454235624654546345363463543645376n
  const b = 1234n
  // 添加 n 是为了和普通number数值进行区分。
  ```



- BigInt可以表示各种进制。前缀是各种进制的前缀，后缀是 n。

  ```javascript
  0b1100n // 二进制
  0O777N  // 八进制
  0xFFn   // 十六进制
  ```

  

- BigInt与普通整数不相等，所以两者不能进行混合运算。

  ```javascript
  42n === 42 // false
  ```



- BigInt不能使用负号 - ，会与asm.js冲突

  ```javascript
  -42n // 正确
  +42n // 报错
  ```



- BigInt类型，支持：+，-，*，/，**  五个运算符。

- BigInt.asUintN(width, BigInt) ，BigInt.asIntN(width, BigInt) 这两个方法没看懂，可以看一下第四版的教材。



# 六、函数的扩展

---

## 1.  参数的默认值

----

函数的参数，现在可以指定默认值了，直接在定义参数后面写上即可。

```javascript
function log(x, y = 'World') {
    console.log(x, y)
}
log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```



### 特点

- 默认值一旦定义，不可以在函数体中再次修改。

- 函数一旦使用了参数默认值，函数的参数中，不可以有同名参数

  ```javascript
  function func(x, x, y) { .... }     // 允许 
  function func(x, x, y = 1) { ... }  // 不允许
  ```

  

## 函数的解构赋值

---

- 可以指定默认值，当数值未定义，则使用默认值。
  如果赋的值是undefined，会使用默认值。但是null不会使用默认值，而是赋值为null。

  ```javascript
  function add(x=30, y=40) {
    return x + y;
  }
  
  add(1,2);   // 3
  add(1,);   // 41
add() ;    // 70
  add(,2);   // 报错
  add(,)     // 报错
  add(undefined, undefined)   // 70
  ```
  
  

























