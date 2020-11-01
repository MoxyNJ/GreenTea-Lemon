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

// 函数 + 对象解构赋值
let func =({ v1, v2 }) => v1 + ' ' + v2

// 函数本身应该的写法
function func(person) {
  return person.v1 + ' ' + person.v2
}

func(person) // "aaa bbb"
```



## 2. 惰性求值

默认值是一个表达式，则这个表达式是惰性求值的，只在用到的时候才会求值。

 

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
  
- 当函数的参数变成对象时，在调用该方法，也传递一个对象参数。那可以利用解构赋值，把对象中的变量拆解为对应名字的变量。

  ```javascript
  function fuc({x=4, y=5, z} = {}) {
    console.log(x,y,z);
  }
  
  fuc({})       // 传递一个空对象：4 5 undefined 
  fuc({x:1, y:2, z:3})    // 传递参数：1 2 3
  fuc()    // 语法报错。不能参数为空。
  ```

- 可以发现，如果函数定义时，参数是一个对象，则在调用的时候，不传递一个对象过去，不会触发解构赋值，而是直接语法报错。

  - 因为语法直接不通过了，根本就没有后面解构赋值的事情。

  解决方法：

  - 利用双重默认值。在定义函数时，把参数对象当成一个普通变量，进行一个整体的参数赋值（即，把这个参数对象默认值设定为一个空对象）。
  - 在调用函数时，没有参数（对象参数）。则过程是这样的：先触发参数的函数解构（赋默认值为空对象），然后触发参数中的属性的默认赋值。

  ```javascript
  // 原问题，参数不能为空。
  function fuc({x=4, y=5, z}) {
    console.log(x,y,z);
  }
  fuc()    // 语法报错。不能参数为空。
  
  // 改进后，可以为空。
  function fuc({x=4, y=5, z} = {}) {
    console.log(x,y,z);
  }
  fuc()    // 可以触发默认赋值：4 5 undefined
  ```

  

### 属性：function.length

length属性：保存没有指定默认值的参数个数。（指定了几个，就少几个）



### 作用域

设置了参数的默认值，**函数的参数**就会形成一个自己的作用域。之后，参数作用域中的参数，会重新声明。



```javascript
// 函数中，y的默认值不是外部变量1，而是参数1中的x。因为此时参数有一个自己的作用域。
var x = 1;
function f(x, y = x) {
  return y 
}
f(2)  // 2

// 
var x = 1;
function f(y=x) {
  console.log(x);  // 1
  x = 2;
  console.log(x);  // 1 
  console.log(y);  // 1 
}

```



参数作用域有关疑问：参数作用域和函数体中的作用域之间是什么关系？兄弟、父子？

- 我感觉肯定是父子关系，参数作用域是父，函数体中的作用域是子。这样参数作用域中重新定义的变量，函数体中才能正确调用。
- 或者兄弟关系也有可能，成立的前提是：
  - 1. 参数作用域是兄，函数体作用域是子。
    2. 弟弟作用域可以调用哥哥作用域中的变量。

```javascript
  let x = 1

  function foo(x, y = function () {
    console.log("2:" + x); // 2:undefined
    x = 2
    console.log("3:" + x); // 2
  }) {
    var x = 3
    console.log("1:" + x); // 1:3
    y()
    console.log("4:" + x) // 4:3
  }

  foo()
  console.log(x) // 1

// 执行顺序：
// 1. 调用foo()：
//		1.1 参数创建一个自己的作用域，然后x，y两个参数进行重新声明：x=undefined， y=f().
//		1.2 在y参数中的函数没有被调用，所以不会执行。
// 		1.3 参数作用域结束，但函数尚未调用结束，参数作用域没有从内存中清空。
// 2. 进入foo函数体中：
//    2.1 声明作用域内变量，x = 3
//		2.2 打印，1：3
//		2.3 调用y()：
//				2.3.1 y()的父作用域是参数作用域，参数作用域中，x=undefined，y=f()
//				2.3.2 打印，2: undefined
//				2.3.3 赋值，x = 2
//				2.3.4 打印，3: 2
//				2.3.5 y()函数执行完毕
// 		2.4 此时执行完y()函数，打印 x变量，是foo中的 x。打印，4: 3
// 3. 打印全局变量中的x，1

```

### 属性：function.name

保存函数的函数名。



## 箭头函数

```javascript
// case 1 
    // 参数不用加括号，函数只有return不用加中括号
    let f = function(v) { 
      reteurn (v + 1)
    }
    // 箭头函数：
    let f = v => (v + 1)


// case 2
    // 没有参数，直接写一个括号
    let f = function() {return 5}
    // 箭头函数：
    let f = () => 5;


// case 3
    // 箭头函数 + 函数解构赋值
    let person = {
      v1 : 'aaa',
      v2 : 'bbb'
    }

    let f = ({ firstName, lastName }) => firstName + ' ' + lastName;

    // 等同于
    function f(person) {
      return person.first + ' ' + person.last;
    }

    // 调用该函数
    f(person)   // "aaa bbb"
```



### 使用注意点

1. 箭头函数中的 this，指向定义时所在的对象，而不是使用时所在的对象。是固定不变的.
   - 不是因为箭头函数内部有绑定`this`的机制，实际原因是箭头函数根本没有自己的`this`，导致内部的`this`就是外层代码块的`this`。正是因为它没有`this`，所以也就不能用作构造函数。
     - 这三个变量也不存在，是指向外层函数的对应变量：`arguments`、`super`、`new.target`。

2. 箭头函数中，arguments 对象，不存在。

3. 箭头函数不能用做 Generator 函数，不可使用 yield 命令

4. 不可以使用 new，当作构造函数来使用。



## 尾调用

尾调用（Tail Call）：某个函数的最后一步，是调用另一个函数。 

```javascript
// 尾调用
// 顺序：先执行f函数，然后执行g函数，最后返回g函数（如果有return）。
function f(x) {
	return g(x)
}

// 不是尾调用，g()函数，只是在f()函数中调用。
// 顺序：先执行f函数，然后执行g函数，接着返回g函数，最后返回f函数。
function f(x) {
  g(x);
}
```

### 尾调用优化

在一个函数中调用另一个函数，如此套娃下去，会形成一个“调用栈”。即如果 在 f1函数中调用 f2函数，会产生“现场保存”的问题。f2函数在调用中，会保存f1函数的变量值等等内容。直到f2执行完，f1执行完，现场保存的内容才被删除。

但是尾调用是函数的最后一步操作，不需要保存上一个函数的相关数据。上一个函数的数据不会再调用了。

```javascript
// 支持的浏览器较少，这里不写了，没什么意义。
```



## 尾递归

递归：函数调用自身

尾递归：在函数的末尾调用自身。

- 这里也尾调用一样，也存在一个“现场保存”的问题。如果是尾递归，就不需要保存上一个函数的相关变量等信息，防止“栈溢出”。



### 柯里化（currying）

将多参数的函数转换成单参数的形式。

# 七、数组的扩展

## 1. 扩展运算符

Rest参数，把调用函数时的所有参数，都变成一个数组。相比于arguments[ ] 数组，使用Rest参数是真正的数组。可以使用array.length。

扩展运算符（spread）是三个点（`...`）。Rest参数的逆运算，将一个数组拆分为用逗号分隔的参数序列。

```javascript
 function fuc(...args) {
   let sum = 0;
   for(let i = 0; i < args.length; i++) {
      sum += args[i];
   }
   return sum
 }

 fuc(1,2,3);     // 6
 fuc(1,2,3,4,5)  // 15
```

## 扩展运算符的应用

### 1 替代函数的 apply 方法

apply()可以利用其参数2传递到是数组，但最终可以拆开的特性，被ES5之前使用。

```javascript
// apply() 拆开数组
function func(a1,a2,a2){
  
}
func.apply(null, [arg1, arg2, ...]) // 使用 apply()
func(arg1, arg2, ...)   // 使用 apply() 相当于达到这个效果
```



### 回顾 `apply() call() bind()` 

```javascript
// 作用域一：window作用域
function sum(num1, num2, num3) {
  // 作用域二：sum函数作用域
  return num1 + num2 + num3
}
function callSum(num1, num2, num3) {
  // 作用域三：callSum作用域
  return sum.apply(this, arguments)
}

callSum(10,20,30);    			

```

- 要点一：调用顺序。调用callSum函数，而callSum函数又调用sum函数。

- 要点二：this的指向。此时使用apply()方法调用sum函数，设定sum函数的this，传入的第一个参数指向哪里，sum函数的this就指向哪里。在本例中，传入的`this`是callSum中的，指向全局变量window，此时sum中的this指向全局变量。

  - this，表示调用这个方法的对象是谁。当前：表示是window调用这个方法的。

- 要点三：apply和call的参数区别。使用apply()，call()，作用是一样的。第二个参数是都是调用sum函数时，原本应当传入的参数。区别是call()和正常的sum调用一样，参数一个一个进去。而apply是只能传入一个参数，这个参数可以是数组（包含了所有原本要传入的参数），可以是arguments对象（把callSum的参数全部传入到sum函数中）。

- 要点四：apply()可以拆分数组：上例子中，sum.apply(this, arguments)的调用，实际上最终在传给sum()方法参数的时候，先自动把arguments对象拆分成了一个个单独的参数，才传递给sum()。

  - 应用：`func.apply(null, array)` 这样可以把一个数组，自动拆分后传递给func()函数，参数1设置为 null，有一个缺点，使func原本的this值变成空。而现在ES6得到了改进，可以使用`...` 来拆分数组，apply()这种拆分方式过时。 

    ```javascript
    var x = 1  // 全局变量 x
    let person = {
      x : 2,    // person对象中的变量 x
      sum : function(v1, v2, v3) {
        console.log(this.x)
      },
    }
    
    person.sum(1, 2, 3)   // this保存person，打印：2
    person.sum.apply(null, [1, 2, 3])   // 删掉了this，打印：1
    ```

### 区分：`bind()`

这个方法会返回一个新建的函数（方法）。

call() 和 apply()，不会新建函数，也不会改变原函数的 this 指向，只是临时性的“借调”。而 bind() 会直接创建一个新的函数，它是永久性的改变了this值。

```javascript
var newFunc = f1.bind(person)

// 复制一个f1()函数，命名为newFunc()，改变newFunc()函数的this指向person对象。
```



### 2 复制数组

把一个数组的内容，深拷贝。而不是两个不同变量名，指向相同的数组。

```javascript
const a1 = [1, 2]

// 浅拷贝，只是把a2指向了a1，两个变量指向同一个数组。
const a2 = a1

// concat()方法
const a2 = a1.concat();

// ... 方法一
const a2 = [...a1]

// ... 方法二
const [...a2] = a1
```



### 3 合并数组

目前，数组的合并都是浅拷贝。即合并后的新数组，与合并前的旧数组，相同下标都指向同一个地址。

```javascript
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
const arr = arr1.concat(arr2, arr3);
arr // [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
const arr = [...arr1, ...arr2, ...arr3]
arr // [ 'a', 'b', 'c', 'd', 'e' ]

// 浅拷贝
arr1[0] === arr[0]   // true
arr2[0] === arr[2]   // true 
```



### 4 与解构复制结合

```javascript
const [v1, ...vn] = [1, 2, 3, 4, 5, 6, 7]
v1   // 1
vn   // [2, 3, 4, 5, 6, 7]

// 只能放在最后一个参数，否则报错
const [...vn, v1] = [1, 2, 3, 4, 5];
const [v1, ...vn, v2] = [1, 2, 3, 4, 5];
// 报错
```



### 5 字符串转换为数组

```javascript
let str = 'hello'
[...str]    // [ "h", "e", "l", "l", "o" ]
```



### 6 实现Iterator接口的对象、Map和Set结构、Generator函数

任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组。譬如：`Nodelist`对象利用`...`就可以变成数组。

原因：扩展运算符的实现，实质是调用Iterator接口。因此由此引申，只要是具有Iterator接口的对象，都可以使用扩展运算符：

- Map、Set、Generator函数等等

  

## 2. Array.from()方法

作用：将特定对象转换为真正的数组：

- 类似数组的对象 (array-like object)：NodeList集合、arguments对象等等
- 可遍历的对象 (iterable object)：Set、Map、Generator函数返回遍历器等等

```js
// array-like object
let arrayLike = {
  '0' : 'a',
  '1' : 'b',
  '2' : 'c',
}
// ES5 方法
	// 1. slice(切割函数,如果不填参数，则不分割数组，返回原来的数组（浅拷贝))
	// 2. []，最开头的[]是因为这是一个实例方法，必须要有一个实例对象，其内容无意义，所以为空。
	// 3. call(arrayLike)方法，使这个实例方法的this绑定到arraylike上。
		// 相当于“arrayLike.slice()”，但是arrayLike不是数组，没有slice方法，所以才这样使用。
var arr1 = [].slice.call(arrayLike)   // ['a', 'b', 'c']
// ES6 方法
	// 改进之处，就是直接在Array对象上设定了一个静态方法，可以直接调用了。
let arr2 = Array.from(arrayLike)			// ['a', 'b', 'c']
```



## 3. Array.of()方法

作用：将一组number，转换为数组。

```javascript
Array.of(3)  // [3]
Array.of(3, 11, 6)  // [3, 11, 6]
```

### 对比：Array()、new Array()

`Array()`是数组构造函数。在创建只有一个number类型元素的数组时，会遇到困难。

`Array.of()` 不会有这个问题。

```javascript
Array(3)   // [ , , ]
// 一个参数且为number时，参数表示创建数组时，元素的个数。
// 如果想创建一个只有一个元素、且值为number类型的数组时，调用Array()无法正确创建。
// 但是调用 Array.of()就可以了。

Array(3, 11, 8) // [3, 11, 8]
// 多个参数时，参数时表示创建数组时，元素的值。
```



## 实例方法：

## 3. copyWithin()

```javascript
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

作用：修改数组中的元素值。把数组内A下标的元素，复制到B下标中，覆盖B下标原有的元素。

参数1：从该位置开始替换数据。如果为负数，则倒数。
参数2（可选）：从该为位置开始读取数据，默认 0。如果为负数，表示从末尾开始计算（从1开始计数）。
参数3（可选）：到该位置**前**停止读取数据(不包括该数)，默认为末尾（数组长度）。如果为负数，表示从末尾开始计算（从1开始计数）。

返回：修改后的数组。

```javascript
[1, 2, 3, 4, 5].copyWithin(0, 3)   // (5) [4, 5, 3, 4, 5]
// 表示从0开始替换数据，替换的内容是从3开始直到末尾。

[1, 2, 3, 4, 5].copyWithin(0, -3, -2)  // (5) [3, 2, 3, 4, 5]
// -3，-2:表示倒着数：第一个是5，第二个是4，第三个是3。替换的内容是“3”
// 从0开始替换数据，替换的内容是“3”，所以只替换第一个数。

[1, 2, 3, 4, 5].copyWithin(0, -3, -1)  // (5) [3, 4, 3, 4, 5]
// -3，-1:表示倒着数：第一个是5，第二个是4，第三个是3。替换的内容是“3, 4”
// 从0开始替换数据，替换的内容是“3, 4”，所以替换第零个、第一个数。
```



## 4. find() 和 findIndex()

### `find()`

作用：找出第一个符合条件的数组成员。条件是所有成员依次执行参数的回调函数，执行结果为`true`。

参数1：回调函数。

- 回调函数的参数：
  - 参数1:value。当前的值
  - 参数2:index。当前的下标
  - 参数3:arr。指向原数组

参数2（可选）：绑定回调函数的this对象（或者说修改回调函数的this值）

返回：第一个符合条件的数组成员。没有符合条件的成员，返回undefined

```javascript
// 简单用法
[1, 4, -5, 10].find((n) => n < 0)  // -5
// 回调函数/条件：第一个小于0的成员

// 回调函数用到三个参数：
[1, 2, 3, 4, 5, 6, 7].find(
  (value, index, arr) => {
			return (value > 3 && arr[index] > 5)
  }
)
// 6

// 用到 参数2，绑定回调函数的this。
let person = {
 	name : 'Moxy',
  age : 25,
}

function cp(value) {
  if(value === this.age) {
    console.log(this.name)
    return true
  }
}

// 这里的回调函数，可以使用箭头函数，箭头函数是定义时确定this，是固定不变的，不是运行时变化。
[10, 15, 20, 25, 30].find(cp, person) 
// "Moxy"
// 25

// 🙅‍错误的写法，这里的this在定义时，指向window函数，所以不可以这样使用。
let p = [10, 15, 20, 25, 30].find((value) => {
  if(value === this.age){
    console.log(this.name)
    return true
  }
}, person)

```

### `findIndex()`

与`find()` 几乎相同。唯一的不同，是没有符合条件的成员，返回 `-1` 



## 5. fill()

作用：给定值，填充一个数组。

参数1：填充的内容
参数2（可选）：填充的起始位置
参数3（可选）：填充的结束位置（不包括）

返回：填充后的数组(其实就是原数组)。

```javascript
// 填充number
let arr = ['a', 'b', 'c', 'd']
arr.fill(10, 2, 3)  // (4) ["a", "b", 10, "d"]
arr     // (4) ["a", "b", 10, "d"]

// 填充对象
let person = {
  name : "Moxy",
  age : 25,
}
let arr = ['a', 'b', 'c', 'd']
arr.fill(person, 2, 4)  
// (4) ["a", "b", {name: "Moxy", age: 25}, {name: "Moxy", age: 25}]
// arr[3]填充的那个对象，和person指向同一个内存地址，即同一个对象。是浅拷贝。
```



## 6. entries()，keys() 和 values()

作用：遍历数组。都会返回一个遍历器对象（Iterator）。可以用`let ... of`循环遍历。

### `entries()`：k/v 遍历

### `keys()`：k 遍历

### `values()`：v 遍历

```javascript
// 使用 for of 方法遍历
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"

// 使用 next() 遍历
let myIterator = ['a', 'b'].entries()
myIterator.next().value   // 0 "a" 
myIterator.next().value   // 1 "b"
```



## 7. includes()

作用：类似字符串includes()方法。判断某个数组是否包含特定的值。

参数1：要查找的值。

参数2（可选）：搜索的起始位置，如果负数，则倒着数（从1开始数，不是从0）。

返回：布尔值。是否包含

```javascript
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true

[1, 2, 3, 4].includes(3, -1)  // false
[1, 2, 3, 4].includes(3, -2)  // true
```



### 对比：`indexOf()` 

作用：查找数组中是否有特定的值。

返回：第一个匹配的数组下标，或没找到返回 -1

```javascript
// indexOf() 的问题：
// indexOf() 匹配机制是使用 === ，会对NaN误判：
[NaN].indexOf(NaN)   // -1
```



### 对比：Map 和 Set 中的 has() 方法

- Map 的`has()`方法，是用来查找键名的：
  - `Map.prototype.has(key)`、`WeakMap.prototype.has(key)`、`Reflect.has(target, propertyKey)`。
- Set 的`has()`方法，是用来查找值的：
  - `Set.prototype.has(value)`、`WeakSet.prototype.has(value)`。



## 8. flat() 和 flatMap()

### `flat()`

flat  a.水平的、平坦的。  n. 公寓、单元房

作用1：如果数组中的元素，还是一个数组，则使用`flat()`可以展开（拉平）这个数组，变成元素。使原数组变成一个一维的数组。

作用2：如果数组中，有的元素为空：`[1, 2, , 3]` 会清除空位 `[1, 2, 3]`

参数：要拉平的层数，默认为1。`Infinity`表示不论有几层，都给他拉开

返回：展开后的新数组，原数组不会被影响。

```javascript
[1, 2, [3, [4, 5]]].flat()   // [1, 2, 3, [4, 5]]
[1, 2, [3, [4, 5]]].flat(2)  // // [1, 2, 3, 4, 5]
[1, 2, [3, [4, 5]]].flat(Infinity)  // // [1, 2, 3, 4, 5]
```

### `flatMap()`

作用：1. 对原数组的每个成员执行回调函数。2. 执行完毕后，将数组展开（执行`flat()`）

参数1：回调函数

- value：当前成员
- index：成员下标
- Array：原数组

参数2（可选）：绑定函数里面的this

返回：新数组，不改变原数组。

```javascript
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]

// 过程：
// 先变成：[[2, 4], [3, 6], [4, 8]].flat()
// 最后变成：[2, 4, 3, 6, 4, 8]
```



## 9 数组的空位

`[1, 2, 3, , 4]`

空位不是`undefined` ，`undefined` 的值就是`undefined` 。



## 10. sort()的排序

`sort()`的参数，可以传递一个`compare(value1, value2)`比较函数，自定义排序规则：

- 每一组（相邻的元素）前后比较：
  - 如果函数`return -1`，则不改变这两个元素的前后顺序。（其实负数都不改变）
  - 如果函数`return 1`， 则改变这两个元素的前后顺序。（0、或正数都改变）



# 八、对象的扩展

## 1. 对象的简洁表示法

对于属性：一个变量名，指代了 “变量名 ： 变量值”，变得更简洁。 

对于方法：`一个方法名()`，指代了 “`方法名 ： function()`”，变得更简洁。



- 这样是可以的：直接在对象中添加已经定义好的变量，作为属性
  - 省略了冒号和后面的赋值。
  - 属性名就是变量名，属性值就是变量指向的地址中的值。
- 这样是可以的：在对象中定义方法，不写function，而是直接`方法名()` 的方式。
  - 省略了冒号和前面的function关键字。

```javascript
// 属性的简写
let name = 'Moxy' // 属性
let person {   // 对象
  name
}
person.name  // "Moxy"
name  // "Moxy"


// 方法的简写
let person = {
  callName(){
    return "Moxy"
  }
}
// 以前的写法：
let person = {
  callName : function() {
    return "Moxy"
  }
}

// 以后这种形式别认不出来,大括号中其实是一个对象。
module.exports = { getItem, setItem, clear };
// 相当于：
module.exports = {
  getItem : getItem,
  setItem : setItem,
  clear : clear,
}

// 以后这种输出形式要认出来：
let person1 = { name: "Moxy"}
let person2 = { name: "Ninjee"}
console.log({person1, person2})  // 利用了对象的简洁表示法，变量名 = 变量名 ：变量值
// 相当于：console.log({person1: {...}, person2 : {...} })
```



## 2. 属性名表达式

ES5时代的属性定义：

- 标识符作属性名：`.` 点运算符
- 表达式作属性名：`[ ]` 方括号运算符
- 字面量方式：大括号中使用`：` 冒号运算符

```javascript
// 点运算符
obj.name = 'Moxy'
// 方括号运算符
obj.['a' + 'g' + 'e'] = 25
// 冒号运算符
var obj = {
  name : 'Moxy'
  age : 25
}
```

ES6新增方式：

- 在使用`: ` 冒号运算符，允许使用`[ ]` 方括号运算符 

```javascript
let person = {
  'first name': 'Moxy',   // 字符串
  [last name] : 'Ninjee'  // 方括号
}
```



## 3. name 属性

- 对象的方法：保存方法名。
- 对象的方法，使用 getter 和 setter 函数。则 name 属性保存在：get.name 和 set.name。
- bind() 方法创造的函数，name 保存在 bind().name 中
- `Function` 构造函数创造的函数， name 属性保存的值：`anonymous`
- 对象的方法名，是一个Symbol，name 属性保存的值：这个 Symbol值定义时的字符串描述。



## 4. 属性的可枚举、遍历

### 4.1 可枚举性 enumerable

当`Object.getOwnPropertyDescriptor` 中，`enumerable` 的属性为 false 时，是不可枚举的。

以下方法用到了 可枚举属性：

- `for...in`循环：遍历。对象自身可枚举的 + 继承可枚举的属性。
- `Object.keys(obj)`：返回数组，成员是 key。对象自身且可枚举的属性。
- `JSON.stringify(obj)`：串行化。对象自身且可枚举的属性。
- `Object.assign(obj)`： 返回新数组。拷贝。对象自身且可枚举的属性。

```javascript
let person = {
  name : 'Moxy',
}
Object.getOwnPropertyDescriptor(person, 'name')
// configurable: true
// enumerable: true    // 可枚举性。
// value: "Moxy"
// writable: true


```

- Class 的原型方法，都是不可枚举的。
- 几乎所有Js自带的各种方法，都不可枚举（有待考证，我记得在Js高级程序设计书中有提到过）



### 4.2 遍历

**五种方法**

- `for...in`循环：遍历。对象自身可枚举的 + 继承可枚举的属性。
- `Object.keys(obj)`：返回一个数组，成员key 是对象自身、且可枚举的属性（不含Symbol属性）
- `Object.getOwnPropertySymbols(obj)`： 返回一个数组，成员 key 对象自身的**所有 Symbol 属性**的 key。
- `Object.getOwnPropertyNames(obj)`：返回一个数组，成员 key 是对象自身的**所有属性**（不含Symbol属性）
- `Reflect.ownKeys(obj)`： 返回一个数组，成员 key 是对象自身的**所有属性**（含有Symbol） 

**遍历过程 & 排序**

- 遍历全部 数值 key：数值升序排列。
- 遍历全部 字符串 key：加入时间升序排列。
- 遍历全部 Symbol key：加入时间升序排列。



## 5. super

具体怎么用暂时没搞懂，看完Class再说。

```javascript
Object.setPrototypeOf(obj1, obj2);
// 作用：修改 参数1 的原型对象为 参数2。

```



## 6. 对象的扩展运算符 `...`

> 这里的**“属性”**，是广义的， 不区分属性和方法。在对象中，所有**变量**，都可以理解为属性。
>
> ```javascript
> let person = {
>   name : "Moxy",
>   age : 25,
>   man : true,
>   callName() = {
>     console.log(this.name)
>   }
> }
> ```
>
> 

### 6.1 解构赋值

模式匹配：左边是一个对象，那么右边也必须是对象。
下例中：`...d` 会把等式右边所有没有匹配上的变量，全赋值到一个新建的对象中。即 d 变量指向一个对象。

```javascript
let {a, b, c, ...d} = {a:1, b:2, d:3, e:4 }
a // 1
b // 2
c // undefined
d // {d:3, e:4}
```

#### 要点

- 解构赋值中的 ... 运算符，必须是最后一个参数，不能写在前面。这很好理解，如果写在前面，按顺序执行代码的时候，轮到执行 ... 运算符，会把等式右边剩余尚未匹配的变量，全部匹配到 ... 中，那么 ... 后面的参数就没有意义了。
- 解构赋值是浅拷贝。（数组、对象、函数是引用内存地址，不是复制）

### 6.2 扩展运算符

`...` ：可以拷贝对象的属性。取出参数对象的所有可遍历的属性值，赋值给当前对象。

- 通俗的理解：`{ ...person }` 就相当于把person对象中，所有的属性**展开**，放到大括号中，赋值给左边变量

模式匹配：等式左右两边，都是对象。

- **数值的赋值，不是浅拷贝，而是深拷贝。这是因为，扩展运算符复制的是属性值，换句话说，是这个属性变量中保存的那个值。**
  - **这个值，如果是基本类型（String、number、boolean），则保存的就是实际的数值，直接拷贝数值。**
  - **这个值，如果是引用类型（Object、Function等），则保存的就是引用的地址，拷贝的是引用地址。**

```javascript
let p1 = { a: 3, b: 4 }
let p2 = { ...p1 }
p2   // { a: 3, b: 4 }
p2.a = 10
p2   // { a: 10, b: 4 }
p1   // { a: 3, b: 4 }
```



`...` 的效果，等同于：`Object.assign()`。
源对象（source）的所有可枚举属性(和方法)，复制到目标对象（target）。

参数1：目标对象，
参数2：源对象，
参数3（可选）：源对象，

```javascript
Object.assign(target, source1, source2);
```

#### 要点

多个相同的属性值复制到目标对象，会依次覆盖，最终会保存最后赋值的数值。
和`...` 一样，拷贝的是属性的值，值是什么类型（实际数值、引用内存地址），拷贝的就是什么类型。

- 完整克隆一个对象的全部属性，要记得再克隆一个对象原型的属性

```javascript
// 两者效果相同，只拷贝了对象的属性。
let anotherPerson = {...person}

let anotherPerson = Object.assign({}, person)
```



扩展运算符可以合并两个对象。

```javascript
let person = { ...person1, ...person2}     // 相当于把两个对象的属性都展开，赋值给左边变量

// 等同于
let person = Object.assign({ }, a, b)

// 这样修改、添加属性变得特别方便：
let newPerson = {
  ...person,
  name: "Moxy",
  age: 25,
}
// 等同于
let newPerson = Object.assign({ }, person, { name: "Moxy", age:25,})

// 如果重复复制相同的属性名，则按照顺序依次覆盖，最终复制最后的那个属性名。
// 那么最开头的 ...person 就有种对新对象所有属性初始化的效果，后面可以随意覆盖。
```



扩展运算符，可以添加表达式：

```javascript
let x = 1
let newPerson = {
  ...(x === 1 ? person1 : person2),
  age : 20,
}
```



扩展运算符，与取值函数 get 有冲突。get() 方法会被执行，导致报错。具体我还没搞懂。



## 7. 链判断运算符

## 以往的方法

判断一个对象中，某个属性是否存在，需要先判断这个对象是否存在：

```javascript
问题一：
// 判断：message.body.user.firstName 属性是否存在。

// 错误。不能直接断定这个属性存在。这样有风险，要判断。
let firstName = message.body.user.firstName;

// 正确，要逐次往里判断。
// 同时，如果不存在这个属性，避免风险，给一个默认值‘defaul’
let firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';

问题二：
// 如果只有一层，可以用三元运算符判断：
// 比如，判断 person.name是否存在。先判断对象是否存在。
let firstName = person ? person.name : undefined
```

## 新的方法 ES2020，先不看了。。。



# 8. Null判断运算符

原先：使用 或 来设置默认值。
但是会有一个问题，如果默认值为：null、undefined、空字符串、false、0。默认值都会生效。

```javascript
let newPerson = oldPerson || 'Moxy'
```

改进：ES2020 定义了 Null 判断运算符 `??` ，只有左侧的值为 `null` 或 `undefined` 时，才会返回右侧的值。

```javascript
let newPerson = oldPerson ?? 'Moxy'
```



# 九、对象的新增方法

## 1. Object.is()

和严格相等运算符的作用基本一直。

Object.is 和 === 区分：

```javascript
Object.is('foo', 'foo')   // true
Object.is({}, {})         // false

Object.is(+0, -0) // false
+0 === -0         //true

Object.is(NaN, NaN) // true
NaN === NaN         // false
```



## 2. Object.assign()

在上面的 ... 扩展运算符有讲解。要搭配起来理解。

作用：对象的合并。将源对象（source）的所有可枚举属性，复制到目标对象（target）。

参数1：目标对象，
参数2：源对象，
参数3（可选）：源对象，

返回：无

要点：

- 目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
- 只拷贝源目标自身的、且可枚举的属性
- 如果参数只有一个，则会直接返回该对象（不是对象的话，会转换成对象）
- 浅拷贝。只是在拷贝属性的值（如果是基本类型，就是数值；如果是引用类型，就是地址）

```javascript
Object.assign(target, source1, source2)
target   // 合并后的对象
```



## 3. Object.getOwnPropertyDescriptors()

**Object.getOwnPropertyDescriptor()**

作用：找到目标对象的一个属性的描述对象（descriptor）

**Object.getOwnPropertyDescriptors()**

作用：找到目标对象的所有的自身属性，他们的描述对象。

参数：目标对象

返回：一个对象。保存着找到的描述对象。该对象的属性名，就是目标对象的属性名，该对象的属性值，就是目标对象这个属性的描述对象。

```javascript
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
```



#### 回顾：

ECMA的两种属性：

1. 数据属性：有四个 descriptor。
   1. Configurable：是否可以：delete删除属性、修改属性特性、修改属性为访问器属性。
   2. Enumerable：是否可以遍历
   3. Writable,：是否可以写入
   4. Value：读取get该属性时，会读取这里的内容。
2. 访问器属性：有四个 descriptor。不包含value数据值。
   1. Configurable：是否可以：delete删除属性、修改属性特性、修改属性为访问器属性。
   2. Enumerable：是否可以遍历
   3. Get：读取属性时调用该位置保存的函数。默认：undefined
   4. Set：写入属性时调用该位置保存的函数。默认：undefined

访问器属性的定义：

1. ES5，创建对象时：可以直接定义：`set 属性名() {...}	`  和 `get 属性名() {...}	` 

2. 如果已经定义为数据属性，想添加get set 修改为访问器属性，必须通过`Object.defineProperty()`。

3. ES6，创建对象时：可以在class中定义：constructor、get、set。

   ```javascript
   // ES5 方法
   var person1 = {
     _name : "Moxy",
     set name(value) { this._name = value },
   	get name() { return this._name}
   }
   
   // 已经创建对象的方法
   var person2 = {_name : "Moxy"}
   
    Object.defineProperty(person2, "name", {
      configurable : false,
      enumerable : false,
      set : function(value) { this._name = value },
      get : function() { return this._name}
    })
   
   // ES6 方法
   class person3 {
     constructor(){ this._name = 'moxy' }
     set name(value) { this._name = value}
   	get name() { return this._name}
   }
   
   ```

   

访问器属性的访问，像正常的访问数据的方式就可以。（ES5，ES6尚不清楚）

1. get 的访问：person.name = 'Moxy'
2. set 的访问：person.name

`Object.getOwnPropertyDescriptors()` 这个方法就是为了弥补，`Object.assign()`无法正确拷贝访问器属性。遇到访问器属性（无法拷贝 get 和 set 属性），会自动转换为数据属性。

完整拷贝对象所有属性（数据属性+访问器属性）的实现方式：

1. `Object.getOwnPropertyDescriptors()` 获取对象中所有的属性（数据属性 + 访问器属性）
2. `Object.defineProperties(obj, 所有的属性)` 把所有的属性，利用该方法“写入”新对象中。

```javascript
// 使用 Object.assign()， 访问器属性转换成了数据属性
let person = {
  _name: "Moxy",
  age : 25,
}
let person2 = {}
Object.assign(person2, person)
Object.getOwnPropertyDescriptor(person2, '_name')
// configurable: true
// enumerable: true
// value: "Moxy"
// writable: true


// 两个函数配合复制，实现了把对象中，所有的访问器属性的，全部复制
let person = {
  name : "moxy",
  set name(value) { console.log(`set value is : ${value}`)},
  get name() {console.log(`get value`)},
}
let person2 = {}
Object.defineProperties(person2, Object.getOwnPropertyDescriptors(person))
Object.getOwnPropertyDescriptor(person2, 'name')
// configurable: true
// enumerable: true
// get: ƒ name()
// set: ƒ name(value)




// 如果只是单个复制一个访问器属性，这样也可,但是不优雅。
// 需要注意的是：Object.getOwnPropertyDescriptor 返回的是特定属性的[[特征值]]。
// 使用[[特征值]]的时候，需要前面再加上属性名， name : 
let person = {
  name : "moxy",
  set name(value) { console.log(`set value is : ${value}`)},
  get name() {console.log(`get value`)},
}
let person2 = {}
Object.defineProperties(person2, { name : Object.getOwnPropertyDescriptor(person,'name')} )
Object.getOwnPropertyDescriptor(person2, 'name')

```



### 配合 Oject.create() 实现对象的浅拷贝（浅克隆）

```javascript
// 获取指定对象的原型对象
Object.getPrototypeOf(person)    
//依照proto为原型，添加propertiesObject为属性（可选），创建一个新的对象。
Object.create(proto, [propertiesObject]) 

let person2 = Object.create(Object.getPrototypeOf(person),
  Object.getOwnPropertyDescriptors(person));
```



## 4. `__proto__` 属性

### Object.setPrototypeOf()，Object.getPrototypeOf()

### 4.1  `__proto__` 属性

一个引用。指向当前对象的原型对象（prototype）。

继承：

```javascript
// ES5
const obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj;

// ES6
var obj = Object.create(someOtherObj);
obj.method = function() { ... };
```

应当不直接用`__proto__`属性，而是用 set get 和 create 来访问/修改`__proto__`。

- Object.setPrototypeOf()（写操作：当前对象写入一个原型对象。）
  Object.getPrototypeOf()（读操作：读取当前对象的对原型对象。）
  Object.create()（生成操作：把某个对象当作原型对象，创建一个新对象。）

### 4.2 Object.setPrototypeOf()

作用：设置一个对象的原型对象（prototype）。

参数1：目标对象 obj
参数2：原型对象 proto

返回：参数对象本身

```javascript
let father = {
  name: "moxy"
}
let son = Object.setPrototypeOf({ } , father);
// son {
// 	__proto__: 
// 		name: "moxy"
// }

// 相当于：但是不推荐这样用。
let son = {
  __proto__: father
}
```



### 4.3 Object.getPrototypeOf()

作用：读取一个对象的原型对象。

参数：要读取的对象

返回：引用：执行那个原型对象

```javascript
Object.getPrototypeOf(son)
// {name: "moxy"}
```



## 5. Object.keys()，Object.values()，Object.entries()

为`for...of`循环遍历的方法。具体请看：《属性的遍历》

### 5.1 Object.keys()

作用：获取对象自身的、可遍历的属性名 key

参数：特定对象

返回：数组。成员是特定对象自身的、所有可遍历的属性名 key

### 5.1 Object.values()

作用：获取对象自身的、可遍历的属性值 value

参数：特定对象

返回：数组。成员是特定对象自身的、所有可遍历的属性值 value

### 5.1 Object.entries()

作用：获取对象自身的、可遍历的键值对 k/v

参数：特定对象

返回：数组。成员是对象，特定对象自身的、所有可遍历的键值对 k/v



## 6. Object.fromEntries() 

作用：将一个键值对数组转为对象。是`Object.entries()`的逆操作。

参数：多组键值对，看例子。

返回：生成的对象

```javascript
let person = Object.fromEntries([
  ['name','Moxy'],
  ['age', 25],
  ['man', true],
])
// age: 25
// man: true
// name: "Moxy"
```

### 应用：Map结构的配合使用

```javascript
// 方式一
let person = new Map([
  ['name','Moxy'],
  ['age', 25],
  ['man', true],
]) 
let person2 = Object.fromEntries(person)
// age: 25
// man: true
// name: "Moxy"

// 方式二
let person = new Map().set('name', 'Moxy').set('age', 25).set('man', true)
let person2 = Object.fromEntries(person)

```

# 十、Symbol

原始数据类型，Symbol，表示一个独一无二的值。

参数：接受一个string，表示对这个Symbol实例的**描述**。**描述符**

```javascript
let s1 = Symbol('s')
let s2 = Symbol('s')
s1.toString()   // "Symbol(s)"
s2.toString()   // "Symbol(s)"
s1 === s2       // false，可以看出，虽然字符串相等，但两个Symbol还是不同。
```

## 特点

1. Symbol值不能与其他类型参与运算，报错

```javascript
let sym = Symbol('S')
"this is " + sym   // 报错
`this is ${sym}`   // 报错
```

2. Symbol值可以转字符串、布尔值
3. Symbol值不可以转number。

```javascript
let sym = Symbol('S')

// 转字符串
String(sym)     // Symbol('S')
sym.toString()  // Symbol('S')

// 转布尔值
Boolean(sym)    // true
!sym            // false
```



### Symbol.prototype.description

相当于：toString()

```javascript
sym.toString()  // Symbol('S')
sym.description  // 'S' 

```



### 属性名 Symbol 的写法

```javascript
let name = Symbol()       // 属性
let callName = Symbol()   // 方法

// 对象定义时
let person = {
  [name] : "moxy"
 	[callName]() { console.log(this[name]) },
}

// 对象已定义
let person = {}
person[name] = "moxy"
person[callName] = function() {
    console.log(this[name]);    
}

// 修改描述符：
let person = {}
Object.defineProperty(person, name, {
  value : "Hello",
})
```



### 属性名 Symbol的使用

不可以用点运算符，只能用方括号运算符。

- 使用Symbol类型的引用（变量），与普通变量相比，就是多加一个[方括号]即可。不能使用点运算符。

```javascript
let name = Symbol("name");
let callName = Symbol("callName")
let person = {}

// 定义属性
person.name = "moxy"  // 属性名是普通字符串
person[name] = "moxy" // 属性名是Symbol类型
person[callName]() {      //定义一个名称是Symbol类型的函数
  console.log(this.[name])
}

// 使用属性
person[name]          // "moxy"
person["name"]        // undefined
person[callName]()    // "moxy"
```



## 属性名的遍历

遍历对象的时候，以下方法会**忽略**是 Symbol的属性名：

1.  `for...in`、`for...of`循环
2. `Object.keys()`、`Object.getOwnPropertyNames()``
3. ``JSON.stringify()`

### `Object.getOwnPropertySymbols()` 

作用：获取指定对象的所有 Symbol属性名。

参数：对象

返回：数组。成员当前对象的所有 Symbol值的属性名

```javascript
let person = {}
let a = Symbol('a')
let b = Symbol('b')
person[a] = "aaa"
person[b] = "bbb"

let personSymbol = Object.getOwnPropertySymbols(person)
// (2) [Symbol(a), Symbol(b)]
```



### `Reflect.ownKeys()`
返回所有类型的键名，包括常规键名和 Symbol 键名。



## 6. Symbol.for()，Symbol.keyFor() 

### Symbol.for()

作用：创建/赋值 一个Symbol类型。可以使用同一个 Symbol 标识符。

参数：字符串，要创建/赋值的 Symbol 的标识符。

- 过程：根据参数字符串，搜索是否已经有该标识符的 Symbol类型，如果有，则引用其地址；如果没有，则根据参数，创建一个新的 Symbol类型。

- Symbol.for( ) 创建的Symbol，有一个**登记的过程**。登记在全局环境中供搜索，而Symbol() 不会。

```javascript
let s1 = Symbol.for('name');
let s2 = Symbol.for('name');

s1 === s2 // true
```



### `Symbol.keyFor()`

作用：根据标识符 string，在已经登记的 Symbol名单中，查找该 Symbol。

参数：string，要查找的标识符

返回：引用。找到的 Symbol 地址。 / undefined 没找到。



## 8. 内置的 Symbol “值”

### Symbol.hasInstance

指向一个内部方法。当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，调用该方法。

下例中，调用 instanceof 函数，最终调用了 Person类中的，Symbol.hasInstance。

函数的返回：布尔值，true 表示 instanceof 判断类相同，false 表示不相同。

```javascript
// 例子一
class Person {
  [Symbol.hasInstance](value) {
    return value instanceof Array;
  }
}

let person1 = new Person()
[1,2,3] instanceof person1   // true

// 例子二
// class + static 类方式
class DoubleNumber {
  static [Symbol.hasInstance](value) {
    return Number(value) % 2 === 0    // 判断是否是 2 的倍数
    // true，表示是2的倍数，
  }
}

// 等同于： const 方式
const DoubleNumber2 = {
  [Symbol.hasInstance](value) {
    return Number(value) % 2 === 0
  }
}

1 instanceof DoubleNumber  // false 不能被2整除
2 instanceof DoubleNumber  // true 可以被2整除
```



### Symbol.isConcatSpreadable

Spreadable  a. 可扩展的，可传播的

该属性是一个布尔值。表示对象用于`Array.prototype.concat()`时，是否可以展开。

如果是数组：默认**支持展开**，值为 undefined。如果等于true，也是支持展开。
如果是类数组对象：默认**不支持展开**。

#### 回顾 concat()

作用：合并两个/多个数组。

参数：要合并的数组。

返回：新数组，合并后的数组（浅拷贝，只拷贝值）。

问题：合并的数组/类数组对象中，会有是作为整体合并，还是展开为一个个元素再合并的问题。

```javascript
let arr1 = ['a','b','c']
let arr2 = [1,2,3]
let arr3 = ['x','y','z']

let allArr = arr1.concat(arr2, arr3)
// (9) ["a", "b", "c", 1, 2, 3, "x", "y", "z"]

```



如果是数组：默认**支持展开**，值为 undefined。如果等于true，也是支持展开。

```javascript
let arr1 = ['a','b','c']
let arr2 = [1,2,3]
let arr3 = ['x','y','z']

arr1[Symbol.isConcatSpreadable]  // 数组默认：undefined
let allArr1 = arr1.concat(arr2, arr3)
// (9) ["a", "b", "c", 1, 2, 3, "x", "y", "z"]

arr2[Symbol.isConcatSpreadable] = false
let allArr2 = arr1.concat(arr2, arr3)
// (7) ["a", "b", "c", Array(3), "x", "y", "z"]
//                    (3) [1, 2, 3]
```



如果是类数组对象：默认**不支持展开**。

```javascript
let arr1 = [1,2,3]
let arr2 = [6,7,8]
let obj = {
  length: 3,
  0: 'a',
  1: 'b',
  2: 'c',
}
arr1.concat(obj, arr2)    // 默认不支持展开
//(7) [1, 2, 3, {…}, 6, 7, 8]
//              {0: "a", 1: "b", 2: "c", length: 3}

obj[Symbol.isConcatSpreadable] = true
arr1.concat(obj, arr2)  // 可以展开了
// (9) [1, 2, 3, "a", "b", "c", 6, 7, 8]
```



### Symbol.species

指向一个构造函数。创建衍生对象时，调用该属性中的函数。`Symbol.species`是一个 getter 函数。

例子中，Father类，继承 Array数组。然后 a 是 Father 的实例化，b 是 a 的衍生对象。

a 和 b 既是 Father 的实例，也是 Father 的实例。

```javascript
class Father extends Array { }

let a = new Father(1,2,3)   // Father(3) [1, 2, 3]
let b = a.map(x => x*2)     // Father(3) [2, 4, 6]

b instanceof Father  // true
b instanceof Array   // true
```



如果给 Father 类中，设置 Symbol.species 指向调用方法。该方法是一个构造函数，衍生对象在被创建时，会调用该方法。

定义`Symbol.species`属性采用`get`取值器。

```javascript
// 默认的`Symbol.species`属性的写法。
static get [Symbol.species]() {
  return this;
}

// 对上例的Father设置一个衍生对象调用方法
class Father extends Array { 
	static get [Symbol.species]() { return Array }  // 调用Array创建衍生对象，而不是 Father
}

let a = new Father(1,2,3)   // Father(3) [1, 2, 3]
let b = a.map(x => x*2)     // Father(3) [2, 4, 6]

// b 是被Array创建的
b instanceof Father // false
b instanceof Array // true

// a 不受影响
a instanceof Father // true
a instanceof Array // true
```

#### Promise

Promise对象，会返回一个新的Promise实例。如果调用 then方法，会继续返回一个Promise实例。

```javascript
class T1 extends Promise {}

let a = new T1 (r => r)
let b = a.then (r => r)

a === b  // false 两个Promise实例不相等
b instanceof T1
b instanceof Promise  // 可以看到，b是由T1的构造函数创建的。
```



如果希望 then() 方法返回的Promise实例，是由 Promise沟村函数创建的，而不是 T1，需要用到 Symbol.species。创建一个 getter函数。

```javascript
class T2 extends Promise {
  static get [Symbol.species]() {
    return Promise;
  }
}

let a = new T2(r => r)
let b = a.then(v => v) 
b instanceof T2 // false
b instanceof Promise // true
```



Symbol.match、Symbol.replace、Symbol.search、Symbol.split、 实际上就是对应的String字符串中的方法。个人认为，多设计一个Symbol的目的，就是为了可以方便的，在一个新建的实例对象中“覆盖 / 重写”该方法。

### Symbol.match

`match()` ：可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。

作用：指向一个函数。调用时，需要一个String实例来调用。`str.match(Obj)`，"str"最终会作为参数，传递给match 指向的那个函数。在对象添加了Symbol.match属性后，就会有两个调用match的方式：

- String实例：调用字符串对象的`prototype.match()`方法。
- 对象实例：调用对象的 `[Symbol.match]()` 方法。

参数：实例对象，里面保存着Symbol.match属性。

返回：函数的返回值。

```javascript
class Person {
	[Symbol.match](value){
		return '执行该方法：' + value
	}
}
let p = new Person()

'value'.match(p)   // "执行该方法：value"
// 相当于
p[Symbol.match]('value')  // "执行该方法：value"


// 下面两个调用，效果是一样的
'str'.prototype.match(newObj) 
newObj[Symbol.match]('str')

//如果采用正则匹配 ：regexp
String.prototype.match(regexp)
regexp[Symbol.match](this)
```



### Symbol.replace

`replace()` ：用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

Symbol.replace 的两个调用方法：

- 字符串实例：调用字符串对象的`prototype.replace()`方法。
- 对象实例：调用实例对象的`[Symbol.replace](this, )` 方法。

作用：指向一个方法。方式与上文 match 大致相同。

参数1： 实例对象。
参数2：

返回：方法的返回值。

```javascript
// 下面两个调用，效果是一样的
'str'.prototype.replace(searchValue, replaceValue)
searchValue[Symbol.replace](this, replaceValue)
```



### Symbol.search

search() ：用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。

```javascript
// 下面两个调用，效果是一样的
String.prototype.search(regexp)
regexp[Symbol.search](this)
```



### Symbol.split

```javascript
// 下面两个调用，效果是一样的
String.prototype.split(separator, limit)
separator[Symbol.split](this, limit)
```



### Symbol.iterator

该属性，指向该对象的默认遍历器方法。

```javascript
const person = {}
person[Symbol.iterator] = function*() {
  yield 1
  yield 2
  yield 3
}

[...person]   // (3) [1, 2, 3]
// 或：
for(let value of person){
    console.log(value)
}
// 1
// 2
// 3
```



### Symbol.toPrimitive

作用：执行一个方法。该方法的触发：该对象被转为原始类型的值。

参数：字符串参数，表示当前的运算模式：
	Number：转成数值
	String：转成字符串
	Default：数值，字符串都可转

返回：该对象对应的原始类型值。



### Symbol.toStringTag

作用：指向一个方法。在该对象上，调用`Object.prototype.toString` 时，如果该属性存在，则采取以下方案：

- 调用该属性指向的方法；
- 该方法在执行后，return '字符串'。则该字符串就是该对象的类型（instanceof 判断类型)

也就是说，这个属性可以用来定制`[object Object]`或`[object Array]`中`object`后面的那个字符串。

```javascript
// 方法一
let person = {}
a[Symbol.toStringTag] =  'func'
a.toString()   // "[object func]"

// 方法二
class person {
   get [Symbol.toStringTag]() {    // 问题1：为什么这里必须要有 get？
    return 'func'
  }
}

let personSon = new person()
personSon.toString()

// 问题2: 为什么 person[Symbol.toStringTag] 是 undefined？
```



### Symbol.unscopables

与 with 相关，感觉用不到，没细看。

# 十、Map 和 Set 结构

## 1. Set

类似数组的数据结构，但是成员的值都是唯一的。也就是说不会有重复的值。

```javascript
// 初始化：可以接受具有Iterator接口的数据结构
const set = new Set([1,2,3,4,5])
[...set]   // (5)[1,2,3,4,5]
set.size   // 5


// 添加：重复的成员不会被添加
set.add([1,2,100])     // Set(6) {1, 2, 3, 4, 5, 100}
[...set]   // [1,2,3,4,5,100]


// 去除数组中重复成员的方法：
// 方法一：
[...new Set([1,2,2,3,3,4])]  //(4) [1, 2, 3, 4]

// 方法二：
function func(array) {
  return array.from(new Set(array))
}
func([1,2,2,3])   //[1,2,3]
// 利用原理：参数array生成一个Set结构（消除重复成员），再用Array.from将Set结构转为数组。
let set = new Set([1,2,2,3])
let array = Array.from(set)   // [1,2,3]

```



Set新增数值不发生类型转换： 5 和 “5” 是两个不同的值。

判断的算法：Same-value-zero equality 类似于“===”。不同点： Set 加入值是，NaN等于自身；严格相等运算符 NaN 不等于自身：

```javascript
NaN === NaN   // false

// 可以看到，不会重复添加两个NaN，说明内部判断 NaN相等
let set = new Set([1, NaN, 2])
set.add(NaN, 3)       // Set(3) {1, NaN, 2}

// add添加，参数如果带[方括号]，会直接变成添加该数组：
set.add([NaN, 3])     // Set(3) {1, NaN, [NaN, 3]}

```



### Set 的实例属性和方法

#### 实例属性：

- `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
- `Set.prototype.size`：返回`Set`实例的成员总数。

#### Set 实例的方法

分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

#### 四个操作方法：

- `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。
- `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `Set.prototype.clear()`：清除所有成员，没有返回值。

#### 四个遍历方法：

- `Set.prototype.keys()`：返回键名的遍历器
- `Set.prototype.values()`：返回键值的遍历器。values是它的默认遍历器
- `Set.prototype.entries()`：返回键值对的遍历器
- `Set.prototype.forEach()`：使用回调函数遍历每个成员，无返回值。

```javascript
let set = new Set(['red', 'green', 'yellow'])
for(let v of set.keys()) {
  console.log(v)
}
// red 	
// green	 
// yellow


for(let v of set.entries()) {
  console.log(v)
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]


// 默认遍历器，就是values()。
Set.prototype[Symbol.iterator] === Set.prototype.values    // true
// 所以，可以直接用 for of 遍历，不需要 values()
for(let v of set) {
  console.log(v)
}


// forEach()，参数固定（可省略）：值、键、对象本身
set.forEach((value, key, mySet) => 
  console.log(key + " : " + value ))
// red : red
// green : green
// yellow : yellow


// ...扩展运算符内部使用for...of循环，所以也可以用于Set结构
[...set]  // red   green    yellow
// ...遍历循环，相当于一个数组了
[...set] instanceof Array      //true
```



数组的`map`和`filter`方法也可以间接用于 Set ，实现 并集、交集、差集：

- `filter()`: 规定一个条件。符合条件的元素将被返回，组成新数组。
- `map()` : 返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。

```javascript
let a = new Set([1,2,3])
let b = new Sete([2,3,4])

// 并集
let union = new Set([...a, ...b])
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)))  // 从 a 中，依次判断是否含有b成员
// Set {2, 3}

// 差集：a 相对于 b 的差集
let difference = new Set([...a].filter(x => !b.has(x)));
```



## 2. WeakSet

特点：类似 Set 结构，不重复的值的集合。

不同的是：

	1. 成员只能是对象（不能是 Number、Boolean、Symbol、String）；
 	2.  WeakSet 的对象是**弱引用**，即垃圾回收机制：**不考虑WeakSet对垃圾回收的影响**。换句话说，就是如果某个对象，其他方式的引用次数为 0 后，就会被垃圾回收，WeakSet的引用不在考虑范围内。
 	3. 参数：数组/类数组对象，成员必须是对象，也就是非基本数据类型都可以。
 	4. WeakSet 不能遍历，因为成员是弱引用，随时都可能消失。WeakSet没有 size属性，没有 forEach 属性。

```javascript
// 创建 WeakSet数据结构
const ws = new WeakSet();

//参数：一个数组/类数组对象，成员必须是非基本数据类型（对象、数组等等）
const a = [[1,2],[3,4]]
const ws = new WeakSet(a)
// WeakSet {Array(2), Array(2)} 
// 可以看到，a数组 的成员，变成WeakSet保存的对象中的成员，不是a数组是WeakSet的成员。

const b = [1,2,3,4]
const ws2 = new WeakSet(b)
// Uncaught TypeError: Invalid value used in weak set
// 类型错误：b数组的成员，都是数字，所以不可以。

const c = ['happy', 'every', 'day']
const ws3 = new WeakSet(c)
// Uncaught TypeError: Invalid value used in weak set
// 类型错误：c数组的成员，都是字符串，不可以。

const d = [['happy', 'every'], ['day', '!']]
const ws4 = new WeakSet(c)
// WeakSet {Array(2), Array(2)}
```



### 实例方法

- **WeakSet.prototype.add(value)**：向 WeakSet 实例添加一个新成员。
- **WeakSet.prototype.delete(value)**：清除 WeakSet 实例的指定成员。
- **WeakSet.prototype.has(value)**：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

```javascript
class obj1 {}
class obj2 {}
class obj3 {}
const ws = new WeakSet([obj1])  // 创建一个WeakSet数据结构，参数必须是数组、类数组对象。

ws.add(obj2)   // WeakSet {ƒ, ƒ}
ws.add(obj3)   // WeakSet {ƒ, ƒ, ƒ}
ws.has(obj2)   // true
ws.delete(obj2)  // true
ws.has(obj2)     // false
ws.delete(obj2)  // false
```



## 3. Map

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构）。传统用字符串当作键。

Map数据结构，是一种Hash结构，类似对象，也是k/v对组合。不同的是，key不仅仅是字符串或symbol，支持多种类型。

- Object 结构：“字符串/Symbol —— 值” 对应
- Map 结构：“值——值” 对应

构造函数： new Map()，接受参数：一个数组，数组的成员是多个数组，每个数组成员是`[key, value]` 组合。

```javascript
// 创建
const m = new Map();

// 添加，读取
m.set(person, 'Moxy')
m.get(person)    // "Moxy"

// 判断是否存在，删除
m.has(person)    // true
m.delete(person) // true

m.has(person)    // false
m.has(person)    // false
```

#### 构造函数传入参数创建：

```javascript
// 构造函数传入参数创建：
const m = new Map([
  ['name', 'Moxy'],
  ['age', 25],
  ['man', true],
])
// Map(3) {"name" => "Moxy", "age" => 25, "man" => true}

// 背后的逻辑是：
const items = [
  ['name', 'Moxy'],
  ['age', 25],
  ['man', true],  
]

const map = new Map()
items.forEach(
	([key, value]) => map.set(key,value)
)
// Map(3) {"name" => "Moxy", "age" => 25, "man" => true}

// 注意：使用forEach循环，赋值时，注意要添加[方括号]：[key, value],因为要与items中形式一致。
```

> 事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个**双元素数组**的数据结构（详见《Iterator》一章）都可以当作`Map`构造函数的参数。这就是说，`Set`、`Map`，都可以用来生成新的 Map。

```javascript
const set = new Set([
  ['name', 'Moxy'],
  ['age', 25],
  ['man', true]
])
const m1 = new Map(set)
// Map(3) {"name" => "Moxy", "age" => 25, "man" => true}
```



### 要点：

- 对同一个键多次赋值，后面的值将覆盖前面的值。
- 只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
- 反过来说，如果两个内容相同的数组，作为两个键放入Map中，因为内存地址的不同，也会判定为两个键。

```javascript
// 1. 对同一个键多次赋值，后面的值将覆盖前面的值。
map.set('name', 'Moxy').set('name', 'NJ')
// Map(1) {"name" => "NJ"}

// 2. 只有对同一个对象的引用，Map 结构才将其视为同一个键。
// 如果是基本类型：Boolean、Number、String，不存在地址引用问题；
// 如果面对的是数组、对象等，会发现这样无法读取：
const map = new Map();

map.set(['a'], 555);
map.get(['a'])     // undefined
// 这是因为，['a'] 是一个数组，两个数组的引用地址是完全不相同的，所以无法读取到。
// 必须用同一个变量来引用：
let k1 = ['a']
map.set(k1, 555);
map.get(k1)   // 555

// 3. 如果两个内容相同的数组，作为两个键放入Map中，因为内存地址的不同，也会判定为两个键。
const map = new Map()
map.set(['a'], 555);
map.set(['a'], 666);
map.set(['a'], 777);
map  // Map(3) {["a"] => 555, ["a"] => 666, ["a"] => 777}
```



### Map实例属性：

- size属性：保存Map结构的成员总数。

### Map实例方法：

1. Map.prototype.set(key, value)：

- 作用：给 Map结构中添加成员。
- 参数：key + value
- 返回：添加后的Map。所以可以采用链式写法来添加成员：`map.set(1, 'a').set(2, 'b').set(3, 'c')`

2. Map.prototype.get(key)

- 作用：读取 key对应的 value。找不到返回 undefined

3. Map.prototype.has(key)

- 作用：返回一个布尔值，判断key是否在当前Map实例中

4. Map.prototype.delete(key)

- 作用：删除某个 key。返回 true成功，false失败

5. Map.prototype.clear()

- 作用：删除所有成员，无返回值。

### Map的遍历方法：

Map 结构拥有：3 个遍历器生成函数 + 1 个遍历方法。遍历顺序 ===  插入顺序。

- `Map.prototype.keys()`：返回 key 的遍历器。
- `Map.prototype.values()`：返回 value 的遍历器。
- `Map.prototype.entries()`：返回 [ key , value] 的遍历器。
- `Map.prototype.forEach()`：遍历 Map 的所有成员。
  - 两个参数：回调函数 + 函数中this指向的对象
    - 回调函数：三个参数（key，value，map）
    - this指向的对象：引用，指向一个对象。在回调函数中使用this，会执行这个对象。

```javascript
const map = new Map([
  [1, 'aaa'],
  [2, 'bbb'],
  [3, 'ccc'],
  [4, 'ddd'],
])

// map.entries()
for (let item of map.entries()) {
  console.log(item);
}
// (2) [1, "aaa"]
// (2) [2, "bbb"]
// (2) [3, "ccc"]
// (2) [4, "ddd"]

// 等同于：map.entries()，再次复习：Map成员是双值对的数组
for (let [key, value] of map) {
  console.log(key, value);
}
// 因为Map的默认遍历器接口，就是 entries()
map[Symbol.iterator] === map.entries  // true


// forEach方法：value、key、map 三个参数，可以省略。
map.forEach((value, key, map) => {
  console.log("Key: %s, Value: %s", key, value);
});
// Key: 1, Value: aaa
// Key: 2, Value: bbb
// Key: 3, Value: ccc
// Key: 4, Value: ddd

// forEach方法：第二个参数传入一个对象，可以绑定this
// 此时需要注意：不可以使用箭头函数，会出现 this 的固定定义问题（this在箭头函数是定义是确定的）
let person = { name : "moxy"}
map.forEach(function(value, key, map) {
  console.log("Name: %s, Key: %s, Value: %s",this.name, key, value);
}, person);
// Name: moxy, Key: 1, Value: aaa
// Name: moxy, Key: 2, Value: bbb
// Name: moxy, Key: 3, Value: ccc
// Name: moxy, Key: 4, Value: ddd
```



#### Map 结构转换为数组

```javascript
// 使用 [...扩展运算符]
[...map.keys()]
// (4) [1, 2, 3, 4]
[...map.values()]
// (4) ["aaa", "bbb", "ccc", "ddd"]
[...map.entries()]
// (4) [Array(2), Array(2), Array(2), Array(2)]
// (4) [[1, "aaa"], [2, "bbb"], [3, "ccc"], [4, "ddd"]]
[...map]   // 默认遍历器，调用：entries()
// (4) [[1, "aaa"], [2, "bbb"], [3, "ccc"], [4, "ddd"]]

```

#### Map结构的遍历和过滤：

转换为数组后，配合 `map()` 和 `filter()`，可以实现Map 的遍历和过滤。



## 4. WeakMap

`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。**弱引用**。

补充：JavaScript 的七种数据类型

1. 基本数据类型 / 原始数据类型：Nudefined, Null, String, Boolean, Number, Symbol
2. 引用数据类型 ： Object

不同点：

1. `WeakMap`只接受对象（引用数据类型）作为键名（`null`除外）。不支持原始数据类型（其他 6 种）
2. `WeakMap`的键名所指向的对象，不计入垃圾回收机制。（和WeakSet相同，可以看看WeakSet）
3. 没有遍历操作（即没有`keys()`、`values()`和`entries()`方法），也没有`size`属性。
4. 无法清空，即不支持`clear`方法。
   - 3 和 4，都是因为WeakMap是**弱引用**，遍历会具有不确定性，无法准确的给出“当前时间点”一定存在的成员。（这一点课MySQL数据库学习的，事务的安全问题很相似）

`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

### WeakMap 和 WeakSet，可以避免内存泄漏风险，现在还没掌握什么是内存泄漏。

# 十一、Proxy 代理

一种“元编程”（meta programming），对编程语言进行编程。Proxy提供了一个中间环节，即外界访问某个对象时，中间假设的一个“拦截”，可以对访问的数据进行过滤/改写。

**个人理解**：Proxy一旦拦截了即将进行的操作，就会只执行Proxy中的拦截代码，原始函数调用就不执行了。例如：在拦截  get() 操作的时候。如果不架设 Proxy 拦截，那么get() 方法中的代码会正常执行。一旦架设了 Proxy 去拦截 get() 操作，那么原本 get() 中的代码就不会被执行。转而去执行 Proxy 中 get() 中的拦截代码。所以，其实在Proxy中，对get() 的拦截代码，也是一个几乎一模一样的 get() 函数（参数个数，get操作等等，一摸一样）。

- 个人的再理解：原本的 get() 代码到底会不会执行？我不确定，因为拦截了相应的操作后（比如拦截get），执行拦截代码的返回值依然要和原本要执行的操作返回值类型匹配：
  - 比如`Object.keys()`要遍历对象中的成员，返回成员属性名。那么，拦截函数`ownKeys()`的返回值，就必须是类型相同的“数组/类数组对象”，否则会报错。“数组/类数组对象”中，必须是对象中，真实存在的属性名，如果是其他内容，不会传递，而是传递‘空’。【详情见下面的`ownKeys()`】

Proxy，代理，“代理器”。

#### 补充：

```javascript
Reflect.get(target, propertyKey[, receiver])
```

作用：从目标对象上，获取指定属性值。

参数1: 目标对象
参数2: 要获取的属性名 key
参数3: 可选，设置一个this指向的对象。要获取的属性中，有getter函数，那么其中 this会指向receiver对象。

返回：属性值

```javascript
// Reflect.get()
let person = {
    name : 'Moxy',
    get callName(){ return this.name }
}
let smallPerson = { name : "NJ" }

Reflect.get(person, "callName")              // "Moxy" , 默认指向了目标对象
Reflect.get(person, "callName", null)        // "", null 指向了 window对象
Reflect.get(person, "callName", smallPerson) // "NJ", 指向了 smallPerson对象
```



### 构造函数

```javascript
let proxy = new Proxy(target, handler)

```

target：要拦截的目标对象；
handler：一个配置对象，用来定义拦截的行为。

```javascript
let proxy = new Proxy(person,{
  get : function(target, propKey){
    return "拦截成功，无法读取数据。"
  }
})
proxy.name  // "拦截成功，无法读取数据。"
proxy.age   // "拦截成功，无法读取数据。"

// 要点2:不能用目标函数读取，否则无效。必须用Proxy实例：
person.name   // "Moxy"
proxy.name    // "拦截成功，无法读取数据。"
```



#### object.proxy 属性

默认：undefined，可以将定义好的proxy对象，绑定到这个属性上：

```javascript
let p = new Proxy(person,{
  get: function(target, propKey){
    return "拦截成功，无法读取数据"
  }
})

let object = {
  proxy : p
}
object.proxy // Proxy {name: "Moxy", age: 25, class: true}
object.proxy.name  // "拦截成功，无法读取数据"
```



### 要点

1. Proxy 实际可以用自己的定义覆盖了语言的原始定义：重载（overload）运算符（比如点运算符）
2. 要启用 在目标函数上架设的Proxy代理，必须用Proxy实例来读取属性，而不是用目标函数
3. Proxy 可以是其他对象的原型对象。假设：一个object对象，其原型对象是一个proxy对象，那可以对object未初始化的数据进行代理。（原因：如果访问一个属性，子对象中查找不到，会按照原型链去查找父对象，而父对象是一个Proxy，会进行代理）

```javascript
// 3 父对象proxy，对 person中，未初始化的属性做一个回应：“尚未初始化”
let proxy = new Proxy({}, {
    get: function(target, propKey){
        return '尚未初始化'
    }
})

let person = Object.create(proxy)
person.name = "Moxy" 

person.name   // "Moxy"
person.age    // "尚未初始化"
```



## 2 Proxy 拦截操作（13）：

- **get(target, propKey, receiver)**：拦截对象属性的读取
- **set(target, propKey, value, receiver)**：拦截对象属性的设置，返回一个布尔值。
- **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。
- **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
- **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、 `Object.getOwnPropertySymbols(proxy)`、 `Object.keys(proxy)`、`for...in`循环，返回一个数组。
  - 返回对象所有的、自身的属性。`Object.keys()`返回仅对象自身的、可遍历的属性。
- **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
- **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
- **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
- **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
- **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。



### `set()`

四个参数：目标对象、属性名、属性值、Proxy实例本身。

```javascript
const handler = {
  // 定义get函数
  get(target, key) {
    isPrivate(key, 'get')    // 判断是否访问的是私有变量
    return target[key]
  },
  // 定义set函数
  set(target, key, value) {
    isPrivate(key, 'set')    // 判断是否写入的是私有变量
    target[key] = value
    return true    // 严格模式下，如果没有返回true，就会报错（赋值失败）
  },
}

// 定义 isPrivate 函数，判断是否访问的是私有变量，私有变量默认 ‘_’开头
function isPrivate(key, func){
  if(key[0] === '_')
    throw new Error(`正在执行${func}方法，不能直接访问私有变量！`)
}

// 定义 person对象
let person = {
  _name: "Moxy",
  set name(value){
    this._name = value
  },
	get name(){
    return this._name
  },
}

// 定义Proxy对象，将hander绑定上去。
const p = new Proxy(person, handler)

// 测试：
p.name       // "Moxy"
p._name      // Uncaught Error: 正在执行get方法，不能直接访问私有变量！
p._name = "NJ"  // Uncaught Error: 正在执行set方法，不能直接访问私有变量！
p.name = "NJ"   // "NJ"

```



### `apply()`

作用：拦截函数的调用、`call`和`apply`操作

参数(3)：目标对象、目标对象的this指向的对象、目标对象的参数（数组/类数组对象）

返回：

和 Reflect.apply() 的行为大致相似。

```javascript
let handler = {
  apply(target, thisArgument, argumentsList) {
    return Reflect.apply(...arguments)
  }
}
```

简单应用，Reflect还没学，所以先不看了。

```javascript
function target(){
    return 'target'
}
let handler = {
    apply() {
        return 'Proxy'
    }
}
let p = new Proxy(target, handler)
p()       // "Proxy"
target()  // "target"
```



### `has()`

作用：拦截`HasProperty`操作，即判断对象是否具有某个属性时，会被拦截。典型的操作就是`in`运算符。

参数(2)：target目标对象，查询的属性名

```javascript
// 应用：隐藏 ‘_’开头的私有属性，不被in运算符发现。
let handler = {
  has(target, key) {
    if (key[0] === '_'){
      return false    // false，查找失败。
    }
    return key in target
  }
}

let person = {
  _name: "Moxy",
  name: "NJ",
}

let proxy = new Proxy(target, handler)

'_name' in p    // false
'name' in p     // true

```

#### 特点：

1. `has()`方法拦截的是`HasProperty`，不是`HasOwnProperty`，即`has()`不判断某属性是对象自身/继承而来。
2. 虽然`for...in`循环也用到了`in`运算符，但是`has()`拦截对`for...in`循环不生效。
   -  `ownKeys()`方法可以拦截。它拦截读取对象自身属性的相关操作。



### `construct()`

作用：拦截`new`命令。为了使new操作符在生成的Proxy对象上生效，target 目标对象，自身必须有[[Construct]]内部方法（即 `new target` 已经定义，可以有效使用）。

参数(3)：

1. target ：目标对象、
2. arguments ：cnstructor 构造函数的参数（类数组/数组）、
3. newTarget(可选）：创造实例对象时，`new`命令作用的构造函数（下面例子的`p`）

返回：一个对象。

```javascript
// 语法模版
let p = new Proxy(target, {
  construct: function(target, argumentsList, newTarget) {
  }
})
```

#### 特点：

1. 方法返回的必须是一个对象，否则会报错。
2. `construct()`拦截的是构造函数，所以它的目标对象必须是函数，否则就会报错。
3. `construct()`方法中的`this`指向的是`handler`，而不是实例对象。

没太看懂，不太会，暂时放弃。



### `deleteProperty()`

作用：拦截`delete`操作，如果这个方法抛出错误或者返回`false`，当前属性就无法被`delete`命令删除。

```javascript
// 应用：
let target = {
  name: "Moxy",
  _name: "NJ",
}

let p = new Proxy(target, {
  deleteProperty: function(target, key) {
    // "不变量"，判断函数。判断是否可以执行 delete 函数。
    invariant(key, 'delete')
    delete target[key]
    return true
  }
})
function invariant(key, func) {
  if(key[0] === '_') {
    throw new Error(`正在执行${func}方法，无法删除私有变量！`)
  }
}
delete p.name    // true
delete p._name   // Uncaught Error: 正在执行delete方法，无法删除私有变量！
```



### `getPrototyoeOf()`

作用：可以拦截要获取的对象原型。具体来说，拦截下面这些操作：

- `Object.prototype.__proto__`
- `Object.prototype.isPrototypeOf()`
- `Object.getPrototypeOf()`
- `Reflect.getPrototypeOf()`
- `instanceof`

返回：一个对象，或者 null。



### `ownKeys()`

作用：拦截对象自身属性的读取操作。具体来说，拦截下面这些操作：

- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `Object.keys()`
- `for...in`循环

```javascript
let target = {
  a: 1,
  b: 2,
  c: 3
};

let handler = {
  ownKeys(target) {
    return ["a"];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(target)  // (3) ["a", "b", "c"]
Object.keys(proxy)   // ["a"]
// 由于拦截keys()操作后，ownKeys()方法中没有进行遍历，而是只输出了一个成员属性，["a"]。


// 特点 1:
// 如果对 handler部分，进行修改：
let handler = {
  ownKeys(target) {
    return ["d"];     // 返回值，修改为成员中没有的属性名，返回空
  }
};
Object.keys(proxy)    // []

// 如果对 handler部分，进行修改：
let handler = {
  ownKeys(target) {
    return "换个类型";     // 返回值，修改为其他不合法类型，报错
  }
};
Object.keys(proxy) // Uncaught TypeError: CreateListFromArrayLike called on non-object
```



### 特点：

1. `ownKeys()`方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。
2. 如果目标对象自身包含不可配置的属性，则该属性必须被`ownKeys()`方法返回，否则报错。
3. 目标对象是不可扩展的（non-extensible），这时`ownKeys()`方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错。

 特点 2， 3看一下

```javascript
// 特点 2
let obj = {};
Object.defineProperty(obj, 'a', {
  configurable: false,    // 不可配置属性，不可以修改
  enumerable: true,
  value: 10 }
)

let p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['b'];
  }
})

Object.getOwnPropertyNames(p)     // 返回值必须有 'a' 属性，因为'a' 不可以修改
// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'



// 特点 3
let obj = {
  a: 1
}

Object.preventExtensions(obj);

let p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['a', 'b'];     // 返回的数组中，包含多余的属性 b，报错。
  }
})

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
```



## Proxy.revocable()

作用：获取一个可以取消的 Proxy。比如：目标对象不允许直接访问，必须通过代理访问。一旦访问结束，收回代理权（取消Proxy），就可以紧致访问。

参数(2)：target 目标函数，handler 配置对象



## This 问题

Proxy 的代理，会带来一个 This 上的问题：

- Proxy 不是透明代理：如果在一个目标对象上设置的 Proxy 代理，不做任何拦截。也无法保证和目标代理的行为完全一致。核心原因：Proxy代理后，this 关键字会指向Proxy代理。

```javascript
let person = {
  func(){
    console.log(this === p)
  }
}

let p = new Proxy(person,{ })

person.func()    // false
p.func()         // true
```



# 十二、Reflect 反射

## 1. 设计目的

1.  将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`）。
   - 现阶段是两种共存。
2. 修改某些`Object`方法的返回结果，让其变得更合理。
   - 比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。
3. 让`Object`操作都变成函数行为。
   - 某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。
4. `Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。
   - 这样的目的，有这样一种情况：对某个对象进行某些操作的时候（调用某个方法），希望在该操作生效时，可以执行一些其他代码。这就需要Proxy + Reflect了：先用 Proxy代理，拦截某些特定操作，然后执行 Reflect反射，把拦截的操作原封不动的先执行，最后便可以执行自己的代码了：

```javascript
// 举例一：Proxy代理的方法，一定会有 Reflect反射的方法，与之对应。
Proxy(target, {
  set(target, name, value, receiver){
    // 利用Reflect执行拦截的该操作。
    let success = Reflect.set(target, name, value, receiver) 
    // 执行完拦截的操作，
		if (success){
      console.log(`property ${name} on ${target} set to ${value}`)
    }
    return success
  }
})

// Proxy方法，拦截target对象的属性赋值行为。
// 然后用Reflect.set方法，将值赋值给对象的属性，确保完成原有的行为
// 最后再部署额外的功能。

// 举例二：Proxy代理的方法，一定会有 Reflect反射的方法，与之对应。
let person = {
  _name: "Moxy",
  get name(){
    return this._name
  },
}

let p = new Proxy(person, {
  get(person, name) {
    console.log(`get function: ${person}, ${name}`)
    return Reflect.get(person, name)
  }
})

person.name    // "Moxy"
p.name
// get function: [object Object], name
// "Moxy"
```



## 2. 静态方法

`Reflect`对象一共有 13 个静态方法，与 `Proxy`对象的方法是一一对应的：

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

# 十三、Promise 对象

## 1. 概念

作用角度：解决 JavaScript 的异步编程问题。

结构角度：Promise 相当于一个容器，将会保存一个结果，这个结果属于未来才会结束的事件。

语法角度：Promise 是一个对象，可以获取异步操作的消息。

### 1.2 特点

- 对象的状态不受外界影响，而**只受结果影响**。这也是 Promise名字的由来。
  - `Promise` 对象代表一个异步操作，有三种状态：
    - `pending`（进行中）
    - `fulfilled`（已成功）
    - `rejected`（已失败）

- 一旦状态定型 (resolved)。换句话说，就是状态变成：fulfilled, rejected，就不会再发生改变。任何时间读取结果，都是一样的值。
  - 这一特点区别于事件（Event），事件的特点：一旦事件结束，无法再监听出结果。

#### 缺点：

- 无法取消，一旦新建Promise，就会立即执行，无法中途取消。
- 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。
- 当处于`pending`状态时，无法得知目前具体进展（刚开始，还是即将完成）

## 2. 基本用法

- Promise 参数：一个回调函数
  - 这个函数有两个参数：resolve 和 reject。是JavaScript引擎提供，不需要自己部署
- 在完整的 Promise 中，要设置一个if else 判断语句，来选择 Promise的结果：
  - resolve(value)：结果执行成功，返回参数 value。
  - reject(error)：结果执行失败，返回参数 error。
- 返回：Promise在执行完毕，返回的是一个新的 Promise类型。

```javascript
let promise = new Promise((resolve, reject) => {
  // code
  
  if (/* 异步操作成功 */){
    resolve(value)
  } else {
    reject(error)
  }
})
```



Promise执行完毕后，可以使用 then() 继续调用：

- `then(function(value){..}, function(error){..})`
  - 有两个参数，分别是两个执行函数。这两个函数的触发条件：上一个 Promise的执行结果是成功/失败。
  - 如果是成功 `resolve`：则执行第一个函数，传递参数 value。
  - 如果是失败 `reject`：则执行第二个函数，传递参数 error。

```javascript
promise.then((value) => {
	// 上一个promise执行成功，触发此处代码
}, (error) => {
	// 上一个promise执行失败，触发此处代码
})
```



### 回顾

`setTimeOut()

```javascript
var timeoutID = scope.setTimeout(function[, delay, arg1, arg2, ...]);
```

参数：

1. function：执行函数。在 delay 延迟数毫秒后，执行该函数。该函数也可以是 code，直接编译执行，但是不推荐，这样不安全。
2. delay：可选，延迟的毫秒数。如果不设置，默认是 0 ，表示在下一个周期立即执行。
3. arg1, ... , argN：可选，附加参数。在执行回调函数之前， 会作为参数传递给回调函数。

### Promise 

```javascript
  // Promise一旦创建，就立即执行，所以往往嵌在一个函数的return中。
  function MyTime(ms){
    return new Promise((resolve, reject ) => {
      setTimeout (resolve, ms, 'done')
    })
  }

MyTime(1000).then((value) => {
  console.log(value);
})
// 1秒钟后，输出：done
```





## 实例方法

### Promise.prototype.then()

作用：为期约实例添加处理程序。

参数1:可选，onResolved 处理程序：期约进入 resolve 状态时，执行该函数。
参数2:可选，onRejected 处理程序：期约进入 reject 状态时，执行该函数。

返回：一个新期约实例。

#### onResolved 处理程序

then() 返回的新期约实例，是基于 onResolved函数 的返回值构建的：

onResolved函数的返回值处理方案：

1. 没有提供 onResolved 函数：
   调用 `Promise.resolve()` 传入上一个Promise传递的过来参数，生成一个新Promise实例。
2. 提供了 onResolved 函数：
   1. onResolved函数提供了返回值，调用 `Promise.resolve()` ，传入返回值，生成一个新Promise实例。
   2. onResolved函数没有提供返回值，调用`Promise.resolve()`，传入`undefined`。

```javascript
let p = Promise.resolve('foo')

let p1 = p.then()   
let p2 = p.then(onResolved => {
  return '返回值'
})
let p3 = p.then(onResolved =>{})
p1    // Promise {<fulfilled>: "foo"}
p2    // Promise {<fulfilled>: "返回值"}
p3    // Promise {<fulfilled>: undefined}
```







特点：

1. 如果只想提供 onRejected 处理程序，那需要在第一个参数位置填写“null”。



```javascript
// 1. 只设置 onRejected 处理程序的正确方法：
p1 = new Promise((resolve, reject) => {
  setTimeout(reject, 0, '失败')
})
p1.then(null, (reason) => {console.error(reason)})   // 第一个参数位置，填 null
// 失败


```



```javascript

```



```javascript

```



```javascript

```



# 🔟🔟  Class 的基本语法

## 1. 

与旧体系： function 构造对象的区别和联系

1. Person定义的所有方法，实际上是定义在了Person.prototype中。包括 constructor() 构造方法。
   1. Person的实例对象，moxy。其 moxy.constructor === Person.prototype.constructor 两者相等。
2. 区分：构造函数 / 构造方法
   1. 构造函数：JavaScript 的 ES5 就一直存在的函数。实例化Person时，会调用构造函数。即 new 会调用构造函数。
   2. 构造方法：一个普通函数。JavaScript 的 ES6 出现了class类概念后，作出的一个语法糖。类似Java中的构造方法，把初始化的变量（属性），放在构造方法中。
3. Person === Person.prototype.constructor 两者相等。后者就是指向了Person本体，用于 new 构造函数。
   1. Person.constructor 是“native code”，构造Person的构造函数，是一个原始代码。
4. 实例化对象：moxy
   1. moxy.constructor === Person.prototype.constructor，构造Person的构造函数，就是 Person 本体。

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  toString() {
    return `${this.name} : ${this.age}`
  }
}

typeof Person   //  "function"
Person === Person.prototype.constructor   // true
Person === Person.constructor      // false
Person.constructor    // ƒ Function() { [native code] }

let moxy = new Person('Moxy', 25)
moxy.constructor === Person.prototype.constructor   // true
moxy.constructor === Person     // true
moxy.prototype   // undefined
```



```javascript

```









