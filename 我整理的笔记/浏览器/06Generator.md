# 1 iterable object 可迭代对象

可以使用 `for..of` 遍历值的对象，被称为一个 **可迭代的对象**。

- **iterator** 叫做迭代器，它拥有一个 `next()` 方法。在 ES6 中，迭代器函数的名称规定为 `Symbol.iterator`。

- **iterable** 称之为可迭代，即指一个包含 iterator 迭代器的对象，这个迭代器可以在其值上迭代。



解释 `[Symbol.iterator]`：

- `[...]` 是计算属性名。指定一个表达式并用这个表达式的结果作为属性的名称。
- `Symbol.iterator` 是ES6 预定义的特殊 Symbol 值之一。



要点：

- 可迭代对象必须有一个 `Symbol.iterator` 方法。
  - 调用 `obj[Symbol.iterator]()` 会返回一个函数，这个函数被称为 **迭代器（iterator）**。由它处理进一步的迭代过程。
  - 一个迭代器必须有 `next()` 方法，调用它会返回一个 `{done: Boolean, value: any}` 对象，这里 `done:true` 表明迭代结束，此时 `value` 为 `undefined`。
- `Symbol.iterator` 方法会被 `for..of` 自动调用；也可以手工调用 `next()` 实现遍历。
- 内置的可迭代对象例如字符串和数组，都实现了 `Symbol.iterator`。



支持 Iterable 接口的内置类型有：

- String
- Array
- Map、Set
- arguments 对象
- DOM 的一些集合类型：NodeList 等



可以使用 Iterable 接口的结构有：

- `for..of`
- generator、yield
- 数组解构
- `...` 扩展操作符
- `Arrray.from()`
- Set、Map 的创建
- `Promise.all()` 、`Promise.race()`等，参数是由 Promise 组成的可迭代对象。



# 2 iterator 迭代器

**iterator** 叫做迭代器，它拥有一个 `next()` 方法。在 ES6 中，迭代器函数的名称规定为 `Symbol.iterator`。



**iterable** 称之为可迭代，即指一个包含 iterator 迭代器的对象，这个迭代器可以在其值上迭代。所以，一个 iterable 必须支持一个函数，其名称必须是 `Symbol.iterator`。调用这个函数时，它会返回一个迭代器。





## Iterator 接口

Iterator 是一个获取对象的方式。我们把调用 iterator 的一方称之为消费者。它消费 iterator 生产的值；把 iterator 称之为生产者，它为消费者提供值。



规范中，Iterator 接口需要如下结构：

1. `next()` 方法：用来取得下一个 IteratorResult。
2. 两个可选方法：
   - `return()` 方法：停止迭代器，并返回 IteratorResult
   - `throw()` 方法：报错，并返回 IteratorResult
3. IteratorResult 接口。调用 `next()` 后，会得到一个 IteratorResult 对象，其结构是：
   - value：当前迭代值或最终返回值。 
   - done：布尔值，表示是否迭代完成。
     - 如果为： `{done: true, value: undefind}` 表示已经全部遍历完毕。



## `return()` 和 `throw()`

消费者：需要值的对象，调用 iterator 的 `next()`，每次调用 `next()` 会获得一个 IteratorResult 。

生产者：提供值的对象。就是本节的 iterator，它可以产生值。



`return()` 表示：消费者向迭代器发送一个信号，表示自己不再需要。作为生产者的迭代器收到信号后，可以执行一些清理工作，比如关闭网络、数据库等。

- `return()` 可以 **提前终止** 迭代器继续迭代。
- 会返回一个 IteratorResult 对象。
- 消费者调用 `return()` 时传入的参数。将会作为本次 IteratorResult 的 value 返回。



`throw()` 表示：

- `throw()` 不意味着 iterator 完全停止迭代。而是会根据传递过来的异常，给出对应的反应。异常可以用 `try...catch` 捕获，未捕获的异常则会终止 iterator。
- 通过参数，用于向 iterator 传送一个异常 / 错误。
- 会返回一个 IteratorResult 对象。



另：提前终止 Iterator

- `for..of` 循环可以通过 `break`、`continue`、`return`、`throw` 提前退出；
- 调用 iterator 的 `return()` 方法 



## `for..of` 遍历 iterator

`for..of` 可以遍历一个符合规范的 iterable 可迭代对象，

可迭代对象拥有 `[Symbol.iterator]` 函数，这个函数会返回一个 iterator 迭代器，它有 `next()` 方法。

`for...of` 循环会自动请求对象的  `[Symbol.iterator]` 函数，返回一个 iterator 迭代器；并且在每次迭代中自动调用 iterator 的 `next()` 来遍历这个对象的值，并且会在接收到 `done:true` 之后自动停止。

也可以手工调用 `[Symbol.iterator]` 函数，然后使用它返回的迭代器，调用 `next()` 。



使用方式如下：

```js
let a = [1, 3, 5, 7, 9]

// for of 使用 iterator
for (let value of a) {
    console.log(value) 	// 1 3 5 7 9
}

// 手动使用 iterator 的 next 方法
let it = a[Symbol.iterator]()
it.next().value	// 1
it.next().value	// 3
it.next().value	// 5
```



可以通过把 Symbol.iterator 指向自身，使自己既是一个 iterator 也是一个 iterable，

- generator 生成的 iterator 就是既是一个 iterator 也是一个 iterable，

```js
let it = {
    // for..of 会调用 Symbol.iterator。
    // 让 Symbol.iterator 返回自身，使自己成为一个 iterable
    [Symbol.iterator]() { return this}
    // 定义iterator的next方法
    next(){
        
    }
}

it[Symbol.iterator]() === it   // true
```



下面是一个标准的迭代器接口：

```js
let getNumber = (() => {
    let nextVal;
    let done = false
    return {
        // for..of 需要
        [Symbol.iterator]: function() { return this }
        // iterator需要
        next: function(){
            if (nextVal === undefined) {
                nextVal = 1;
            } else {
                nextVal = (3 * nextVal) + 6;
            }
            if (nextVal > 150) {
                done = true
            }
            return {done:done, value:nextVal}
        }
    }
})();


// 使用 for..of 遍历
for(let value of getNumber) {
    console.log(value)  // 1 9 33 105
}

// 使用 手工遍历
let res = getNumber.next()	
res						// {done: false, value: 1}
let res = getNumber.next()	
res						// {done: false, value: 9}
let res = getNumber.next()	
res						// {done: false, value: 33}
let res = getNumber.next()	
res						// {done: false, value: 105}
```



# 3 生成器 generator / yield 

常规函数的问题：

- 一旦开始执行这个函数，在它结束之前不会被任何事情打断。
- 外部只能在调用时，传递值到函数中，中间无法继续传递；
- 只会返回一个单一值（或者不返回任何值）。

而 `generator` 是一类特殊的函数，可以一次或多次启动和停止，并不一定非得要完成：

- 在执行当中 暂停 / 恢复 自身的执行。
- 在执行当中的 暂停 / 恢复时，还提供了双向信息传递的机会。generator 可以返回多个值，也可以多次传递值给 generator。

它们可与 iterable 完美配合使用，从而可以轻松地创建数据流。



## generator

调用一个生成器，会返回这个生成器的迭代器实例。也就是说，多次调用生成器，会返回多个迭代器实例，它们互相不受影响。



以下是调用 generator 的流程：

```js
function* gen() {
    yield 1;
    yield 2;
    yield 3;
    return "over"
}

let it = gen() 
it.next().value 	// 1
it.next().value 	// 2
it.next().value 	// 3
it.next().value		// over
```

1. 首先，调用 `gen` 获得一个 `iterator`；
2. 接着，每调用一次 `next()`，就会执行到一个 `yield` 处，返回一个 IteratorResult，其 `value` 值保存了这个 `yield` 处传递过来的值。
3. 每次调用 `next()`，都会有两个过程：
   1. generator 中的代码执行到 **下一个 `yield`** 处，然后暂停执行；
   2. 返回一个 IteratorResult，把 **下一个 `yield`** 处的值放入其中。
4. 当执行最后一个 `next()` 时，会让 generator 执行到末尾 `return` 处。此时返回的 IteratorResult 中，保存的值就是 return 返回的值。

所以，`next()` 总是比 `yield` 多一个。上例中，有 3 个 `yield` 和 4 个 `next()`。





## yield

generator 通过 yield 来实现暂停 / 恢复和双向信息传递。

`yield` 是一个表达式。

- `yield` 从 `generator` 中传出消息： `yield` 会导致生成器在执行过程中返回一个值，这有点类似于中间的 `return`。

- `yield` 从调用处传出消息： `yield` 表达式会等待一个从调用处传递过来的结果值。

所以，没有值的 `yield` 相当于一个 `yield undefined`。

举例一个 yield 双向传递：

```js
function* gen() {
    let x = 1
    let y = x + (yield "第一次中断") * 3
    console.log(y)
    y = y + (yield "第二次中断")
    console.log(y)
    return "结束"
}

let it = gen()
console.log(it.next().value)
// 第一次中断	 -- 从 generator 传递来值
console.log(it.next(3).value)	// 从调用者传递过去值：3
// 10			
// 第二次中断	 -- 从 generator 传递来值								
console.log(it.next(2).value)	// 从调用者传递过去值：2
// 12
// 结束		   -- 从 generator 传递来值				
```

注意执行流程：

1. `let it = gen()`：获得一个 `gen` 的 iterator：。

2. 第一次调用 `it.next()`：启动这个 iterator ，`gen` 中的代码会执行到第一个 `yield` 处。

   - 此时会返回一个 IteratorResult 给调用者，其 `value` 保存了从 generator 中传递过来的值 `"第一次中断"`。

3. 第二次调用 `it.next(3)`：`gen` 代码中的第一个 `yield` 会拿到调用者传递过来的值 `3`，接着会执行到第二个 `yield` 处。

   - 在 `gen` 执行过程中，有 ` console.log(y)` 代码，所以控制台会输出：`10`

   - 在 `gen` 执行完毕后，返回一个 IteratorResult 给调用者，其 `value` 保存了从 generator 中传递过来的值 `"第二次中断"`。

4. 第三次调用 `it.next(3)`：`gen` 代码中的第一个 `yield` 会拿到调用者传递过来的值 `2`，接着会执行到最后一个 `yield` 处。

   - 在 `gen` 执行过程中，有 ` console.log(y)` 代码，所以控制台会输出：`12`
   - 在 `gen` 执行完毕后，返回最后一个 IteratorResult 给调用者，其 `value` 保存了从 generator 中传递过来 `return`，`"结束"`



## *yield

yield 委托（yield delegation）。

我们直到，



```js
function* foo() {
    let x = yield "foo 1";
    let y = yield "foo 2";
    let z = yield "foo 3";
    console.log(x, y, z)
    return "foo return"
}

function* bar() {
    let x = yield* foo()
    console.log("foo return:", x)
    yield "bar a"
    return "bar return"
}
```

<img src="06Generator/截屏2021-09-26 下午2.42.20.png" alt="截屏2021-09-26 下午2.42.20" style="zoom: 50%;" />







## 之前的笔记

#### 不匹配

第一个 `next(...)` 总是用来启动生成器，并运行到第一个 `yield` 处。所以一般来说，需要的 `next(...)` 调用要比 `yield` 表达式多一个。



#### 双向传递

消息是双向传递的 —— yield... 作为一个表达式可以发出消息响应 `next(...)` 调用，`next(...)` 也可以向暂停的 yield 表达式发送值。



#### 执行流程

第一个  `next(...)` 并不传入任何东西。而是为了启动一个生成器。

每一个 `next(...)` 的参数，是传递给当前 `yield` 表达式位置的值。得到的 `.value` 是下一个 `yield` 表达式产生的值。当前 `yield` 表达式收到值后，`generator` 会继续执行到下一个 `yield` 表达式，并返回这个表达式产生的值，同时等下下一个 `next(...)` 传递的值。



#### 多个迭代器

当通过一个 iterator 控制 generator 的时候，看起来像控制 generator 函数本身。而事实上每次构建一个 iterator，实际上就隐式构建了一个 **生成器的实例**，通过这个 iterator 来控制的是这个生成器的实例。

所以，同一个 generator 可以有多个实例同时运行，他们甚至可以彼此交互。



根据 iterator 控制的 `*foo()` 和 `*bar()` 调用的相对顺序不同，可能会产生多种不同的结果。这样就可以模拟实现一种多线程竞态条件环境，即谁先完成自己的任务，就可以先抢占后面的资源。







#### 生成器对象就是可迭代对象

把 generator 生成器看作为一个值的生产者，我们通过它的迭代器接口的 `next()` 调用一次提取出一个值。

调用一个 generator，会返回一个 iterator 迭代器。这个 iterator 同时也是 iterable，它内部不仅实现了 `next()` 方法（iterator 的标志），也实现了 `[Symbol.iterator]` 方法（iterable 的标志）。

```js
function *something() {
    let nextVal;
    while(true) {
        if (nextVal === undefined) {
            nextVal = 1;
        } else {
            nextVal = (3 * nextVal) + 6;
        }
        yield nextVal
    }
}

// 手动控制 *something 来获得值：
let res = something()  // 得到一个iterator，它有next()方法
console.log(res.next().value)	// 1
console.log(res.next().value)	// 9
console.log(res.next().value)	// 33
console.log(res.next().value)	// 105


// 利用 for of 来遍历 *something
for (let v of something()) {
    console.log(v);
    
    if (v > 500) { break } // 防止死循环
}
// 输出：1 9 33 105 321 969
```

- `for..of` 中，需要接受一个 `iterable` 对象；这个对象拥有 `Symbol.iterator` 迭代器；这个迭代器拥有 `next()` 方法。`for..of` 通过调用这个 `next()` 方法来遍历对象的值。
- 所以，`something()` 返回了一个 `itarator` 迭代器。但它同时也是一个 `iterable` 可迭代对象。`generator` 生成的迭代器，会在自身定义一个 `Symbol.iterator` 函数。使自己既是一个 `iterator`，也是一个 `iterable`。









#### 停止 generator

当我们利用 for..of 来遍历 generator 时，for..of 有时会通过提前终止，来结束 generator 生成的迭代器。此时迭代器不会一直处在 “挂起” 状态，而是接收到提前终止的消息后，结束自身的迭代器。

- break、return、未捕获异常，都会导致 for..of 的提前终止，进而导致 generator 生成的迭代器的结束。



```js
function *something() {
    try {
        let nextVal;

        while (true) {
            if (nextVal === undefined) {
                nextVal = 1;
            } else {
                nextVal = (3 * nextVal) + 6;
            }
            yield nextVal;
        }
    } finally {
        console.log("cleaning up!")
    }
}

let it = something()
for (let v of it) {
    console.log(v)

    if (v > 500) {
        console.log(it.return("it's over").value)
    }
}

// 1 9 33 105 321 969
// cleaning up!
// it's over
```

- 迭代器的 `return` 可以提前终止迭代器；
- 在 `generator` 内部如果有 `try...finally` 语句，即使迭代器从外部结束，也会执行 `finally` 中的语句。
- 注意在结束时的执行顺序，当出现 `it.return()` 时，会立即终止生成器。
  - 首先，执行 `finally` 中的代码，
  - 接着，把返回的 `value` 设置为传入 `return()` 的内容。也就是此时 `vlaue` 值为  `it's over` 。



# 

# 

# 4 Async / await  异步编程









## Async/await

**127562**





















