## 1 引言

**编程错误的发现越早越好**：

- 编写阶段：能在编写代码的时候发现错误，就不要在编译时再发现错误。
  - IDE的语法拼写检查。
- 编译阶段：能在代码编译阶段发现错误，就不要在代码运行期间发现错误。
  - TypeScript的类型检测机制。
- 开发阶段：能在开发阶段发现错误，就不要在测试阶段发现错误。
  - Pr核对、逻辑梳理、代码自查。
- 测试阶段：能在测试阶段发现错误，就不要在上线后再发现错误。



TypeScript 的引入，给js添加类型约束，在开发中可避免类型错误。尤其是在团队协作，不同开发者相互调用接口时，对类型的约束可以在编译代码时及时发现类型错误，而不是等到运行时发现。对类型的约束，省去对别人传入接口的参数进行类型校验，提升代码的健壮性，提升团队的开发效率。

- TypeScript 是拥有类型的JavaScript超集，它可以编译成普通、干净、完整的JavaScript代码。
- 增加类型约束、增加语法扩展：如枚举类型（Enum）、元组类型（Tuple）。
- TypeScript 最终会被编译为 JavaScript 代码，所以开发人员无需担心兼容问题，在编译时也可不借助于 Babel（通常都有 Babel，但也可使用 tsc 转换）。

TypeScript 的特点：

- 始于 JavaScipt，归于 JavaScript（超集、编译结果）；
- 是一个强大的工具，可以构建大型项目（类型约束）；
- 拥有先进的 JavaScript（保持更新、扩展语法）；



安装：

```sh
npm install typescript -g # 全局
npm install tslib @types/node -g # ts-node 依赖 tslib @types/node 这两个包

tsc --version # 5.0.4
ts-node xxx.ts # 运行
```

- 小技巧：在当前文件的末尾添加：`export {}` 指定该文件为一个独立模块，不会定义全局变量影响其他文件。



## 2 数据类型

### 2.1 类型注解 Type Annotation

在定义标识符时，需要添加对类型的约束：

- 类型声明： `const myName: string = 'Ninjee';`

- 类型推导：在初始化标识符时，ts 可通过赋值的类型自动推导标识符的类型注解，不需要自行定义。

  - 用 let 来进行类型推导，推导出的是通用类型；

  - 用 const 进行类型推导，结果是字面量类型；

    ```ts
    let name1 = "ninjee"   // 推导类型为：string 通用类型
    const name2 = "ninjee" // 推导类型为： ninjee 字面量类型（自定义名称）
    ```

类型举例：

- Js中存在的类型：string、number、object、symbol、null、undefined、function
- 匿名函数通常不需要添加类型，可以自动推导，如使用 forEach 进行遍历(下面有例子) 

```typescript
// 数组类型
const names1: string[] = ['abc', 'def'];
const names2: Array<string> = ['abc', 'def'];

// Object类型 (定义对象类型:type)
type InfoType = {
  name: string
  age: number
}
const info: InfoType = {
  name: 'moxy',
  age: 18
}

// null / undefined
const n: null = null;
const u: undefined = undefined;

// 函数
function sum(num1: number, num2: number): number {
  return num1 + num2;
}
// 箭头函数
const sum =  (num1: number, num2: number): number => num1 + num2;


// 匿名函数
const names = ['ninjee', 'moxy', 'hou'];
names.forEach((item, index) => {				// 回调函数的入参不需要手动添加类型约束
  console.log(item.toUpperCase(), index)
})

```



### 2.2 对象类型 type

**别名，type本质上就是给一个object起一个别名**

- 对象类型：用来细化 object 类型

```typescript
type PointType = {
  x: number;
  y: number;
  z?: number;
}

function printCoordinate(point: PointType) {
	console.log('坐标:', point.x, point.y);
}

printCoordinate({x: 20, y: 30});

export {};
```



### 2.3 类型介绍

#### (1) any

任意类型 any：表示不限制标识符的任意类型，相当于在 TypeScript 中使用 JavaScript。

做任何事都是合法的：

- 可对 any 类型的变量获取不存在的属性，方法；
- 可对 any 类型的变量赋值为任意一种类型。

 

#### (2) unknown

不确定类型 unknown

- 类似 any 类型，但在 unknown 类型的值上做任何事都是不合法的。
- 必须进行 **类型缩小**，才能根据缩小后的类型进行对应的操作。

```typescript
let foo: unknown = 'aaa';
foo = 123;   // 允许：修改unknown类型的变量

console.log(foo.length); // 不允许：unknown进行属性访问

// 类型缩小后，允许属性访问
if (typeof foo == "string") {
  console.log(foo.length)
}

```



#### (3) void

- 在 Ts 中如果一个函数没有任何的返回值，那么返回值的类型就是`void` 类型。
  - 常见的应用场景，用来指定函数类型的返回值，是 void。
  - 如果对函数约束返回值为 void 类型，那么在实际使用时，只可不返回任何值，或返回 `undefined`。

```typescript
// 表示foo函数的入参个数和类型不做限制，不返回任何值
type FooType = (...args: aby[]) => void

const foo: FooType = () => {}
```



#### (4) never

开发中很少实际定义 never 类型，在某些情况下会自动推导出 never 类型；

- 在开发框架（工具）时，可能会用到 never；
- 在封装一些类型工具时，可能会使用 never；

never 表示永远不会发生的值，比如一个函数：

- 一个死循环，或者内部发生异常的函数，其返回值时 never；

```typescript
//【1】死循环/报错
function foo(): never {
  // throw new Error('报错');
  
  while (true) 
    console.log('死循环');
}

//【2】自动推断 never
function fun() {
  return [];  // 返回空数组，推断为 never[]，表示该数组永远不会放任何东西
}

//【3】封装工具，兜底报错
// 防止工具开发人员在扩展工具时，入参添加了其他类型（如boolean），但对于没有处理case，会自动报错。
function handleMessage(message: string | number) {
  switch(typeof message) {
    case 'string':
      console.log(message.length);
      break;
    case 'number':
      console.log(message);
      break;
    default:
      const check: never = message;  // never，check永远取不到值
  }
}
```



#### (4) tuple

元组类型：类似数组结构。不同的是，元组可以存放任意不同的数据类型在其中，并且每一个数据的类型都是明确的。

对比：

- 数组：最好保存相同的数据类型，这样可以通过遍历进行整体处理。获取其中的值也无法明确知道其数据类型
- 对象：为了保存 value，必须明确指出 key。如果 key 无意义的话，增加了代码和数据量。
- 元组：
  - 相对数组而言，可以存放不同的数据类型，并知道每一个元素的类型；
  - 相对对象而言，没有额外的代码和数据量。

用处：

- 常用在函数中，特别是函数的返回值

```ts
// 想用一种数据类型保存：moxy, 18, 1.88，有三个方法：
// 1数组
const info1: any[] = ["moxy", 18, 1.88]
const info1: (string | number)[] = ['moxy', 18, 1.88]

// 2对象
const info2 = {
  name: 'moxy',
  age: 18,
  height: 1.88
}

// 3元组，对每一个元素的类型进行定义
const info3: [string, number, number] = ["moxy", 18, 1.88]



/**
 * 用处：函数返回值
 * 如：React 中的 useState，可以通过对返回值进行规定，让调用者知道第一个返回值是基本数据类型，第二个返回值是是一个函数。
 * 细节：T 为范型，通过入参 initialState 类进行自动推导并绑定后续遍历的类型
 */
const [count, setCount] = useState(10)

// 定义
function useState<T>(initialState: T): [T, (newValue: T) => void] {
  let stateValue = initialState

  function setValue(newValue: T) {
    stateValue = newValue
    // 值发生变化，重新渲染组件
  }

  return [stateValue, setValue]
}

```



## 3 细节

### 3.1 类型注解：联合类型、交叉类型

运用多种运算符，从现有类型中构建新类型

- 联合类型：要么是A类型，要么是B类型，满足其一即可。
- 交叉类型：既是A类型，又是B类型，都要满足。
- 字面量类型：对 string、numbe 等基本数据类型的内容进行限定。

```ts
// 【1】联合类型
let foo: number | string = 'abc'
type Aligment = 'left'|'right'|'center' // 字面量联合类型


// 小心：使用时需进行类型缩小
if (typeof foo === "string")
  console.log(foo.length)

// 【2】交叉类型
interface IKun {
  name: string
  age: number
}
interface ICoder {
  name: string
  coding: () => void
}

const info: IKun & ICoder = {
  name: 'why',
  age: 18,
  coding: function() {}
}
```



### 3.2 别名&接口: type、interface

类型注解解决了构建新类型的问题，但每次使用该类型时，都需要再重新完整的定义一次，增加代码量。

- 类型别名 type：对类型注解起一个别名，方便定义好的类型注解则各处进行使用。

```js
// 方便的别名 type
type MyType = number | string
```



对象类型的声明，可以通过「类型别名」，也可以通过「类型声明」。

- type 类似于 `const`，相当于对一个「自定义的类型」定义一个名称。
- interface 类似于 `class`，相当于对一个「自定义的对象类型」进行声明。

直观上，两个的使用没有区别，但特性上有局部区别：

1. 适用范围

   - `interface` 的使用范围仅适用于对象类型。

   - `type` 的使用范围更广，不仅适用于对象类型， 还可定义其他任意联合类型。

2. 重复定义

   - interface 可以多次声明同一个interface 接口名称（但不推荐，ESLint会报错）。

   - type 仅可以定义一次，不允许两个相同的 type 别名同时存在。

3. 类的继承和实现

   - interface 支持继承，可以被类实现
   - type 不支持继承

总结：

- 如果是非对象类型的定义，直接使用 type
- 如果是对象类型的定义，基本使用 interface，因为扩展性更强。

```ts
// 【2】重复定义
interface IProp {
  x: number
  y: number
}


const obj: IProp = {
  x: 1,
  y: 2,
  z: 3
}

// 这里可以额外追加属性，并存在接口提升，上面的obj对象中需要加入z变量
interface IProp {
  z: number
}

//【3】继承和类的实现
interface IPerson {
  name: string
}

interface IKun extends IPerson {
  slogan: string
}

class Person implements IKun {
    name = 'why'
    slogan = '你干嘛'
}
```



### 3.3 类型断言: as

把 x对象 当作 y对象。

规则：断言只能将对象的类型缩小，或者类型扩大，不能指鹿为马。

- 常用1：比如，获取DOM元素，imgEl返回的型为: `Element | null`。但我们确定它是一个 `image Element`，使用类型断言 `HTMLImageElement`，则可访问 `img` 元素的特定属性。
- 常用2：非空类型断言，程序员向ts表明不需要判断某对象是否为空，强制指出该类型一定存在，ts对该对象跳过判断存在的检测。

```ts
// 不能指鹿为马
const age: number = 18
const age2 = age as string  // 错误


// 常用1
const imgEl = document.querySelector('.someImg') as HTMLImageElement
imgEl.src = 'xxxx'
imgEl.alt = '111'

// 常用2
interface IPerson {
  name: string
  friend?: {
    name: string
  }
}

const info: IPerson = {
  naem: 'moxy',
  age: 18
}
// 访问属性
info.friend?.name
// 给属性赋值
// 方案一：类型缩小
if (info.friend) info.friend.name = 'ninjee'
// 方案二：非空类型断言
info.friend!.name = 'ninjee'
```



### 3.4 字面量类型

字面量类型：对 string、numbe 等基本数据类型的内容进行限定。

```ts
type Aligment = 'left'|'right'|'center' // 字面量联合类型
type ID = 0 | 1 | 2 | 3 | 4 | 5 | 6  // 类似枚举的作用


type MethodType = 'get' | 'post'
function request(url: string, method: MethodType) {}

request('http://xxxx/com', 'get')


const info = {
  url: 'xxxx',
  method: 'post'
} as const
// 通过 as const 将info对象，转换为 readonly 对象，编译器可以很好的识别其中的内容。
// method: string 类型便可识别为正确的一个字面量类型。
request(info.url, info.method)
```





### 类型缩小

- 类型缩小 Type Narrowing / 类型保护 type guards
- 目的：限制和缩小变量的类型，确保变量可以正确的被使用。

常见的类型保护方式：

- typeof：判断类型
- ===， !==：平等缩小，一般是判断字面量类型
- instanceof：属于什么类型的实例
- in：判断该对象内是不是有指定的属性

```ts
// [1]typeof
if (typeof id === 'string') {
  // id 变量在这里一定是string类型，可以使用String类型的方法
}

// [2]平等缩小
type Direction = 'left'|'right'|'up'|'down'
if (direct === 'left') {
  // 判断字面量类型
}

// [3]instanceof
function printDate(date: string | Date) {
  if (date instanceof Date) {
    // 判断 date 是不是 Date 对象的实例
  }
}

// [4]in
interface ISwim {
  swim: () => void
}
  
interface IRun {
  run: () => void
}

function move(animal: ISwim | IRun) {
  // 通过 in，判断传入的animal对象是否包含指定的属性
  if ('swim' in animal) animal.swim()
  else if ('run' in animal) animal.run()
}

const fish: ISwim = {
  swim: function() {}
}

const dog: IRun = {
  run: function() {}
}

move(fish);
move(dog);
```

















- 演练场：https://www.typescriptlang.org/zh/play













