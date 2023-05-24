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

### 类型注解 Type Annotation

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
const name = ['ninjee', 'moxy', 'hou'];
names.forEach((item, index) => {				// 回调函数的入参不需要手动添加类型约束
  console.log(item.toUpperCase(), index)
})

```



### 对象类型 type

- 对象类型：用来细化 object 类型

```js
function printCoordinate()
```









- 演练场：https://www.typescriptlang.org/zh/play













