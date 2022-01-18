# 9 类

## 9.1 类的概念[§](https://ts.xcatliu.com/advanced/class.html#类的概念)

虽然 JavaScript 中有类的概念，但是可能大多数 JavaScript 程序员并不是非常熟悉类，这里对类相关的概念做一个简单的介绍。

- 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 `new` 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的 `eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

看到了类，看完之后补充一下类似 keyof、infer、extends、Record、ReturnType 等的相关知识。



## 9.2 ES7 中类的用法[§](https://ts.xcatliu.com/advanced/class.html#es7-中类的用法)

ES7 中有一些关于类的提案，TypeScript 也实现了它们，这里做一个简单的介绍。

### 1 实例属性[§](https://ts.xcatliu.com/advanced/class.html#实例属性)

ES6 中实例的属性只能通过构造函数中的 `this.xxx` 来定义，ES7 提案中可以直接在类里面定义：

```js
class Animal {
  name = 'Jack';

  constructor() {
    // ...
  }
}

let a = new Animal();
console.log(a.name); // Jack
```

### 2 静态属性[§](https://ts.xcatliu.com/advanced/class.html#静态属性)

ES7 提案中，可以使用 `static` 定义一个静态属性：

```js
class Animal {
  static num = 42;

  constructor() {
    // ...
  }
}

console.log(Animal.num); // 42
```



## 9.3 TypeScript 中类的用法[§](https://ts.xcatliu.com/advanced/class.html#typescript-中类的用法)

### public private 和 protected[§](https://ts.xcatliu.com/advanced/class.html#public-private-和-protected)

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 `public`、 `protected` 和 `private`。



属性的 `public`、 `protected` 和 `private`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的；
- `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的；
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问。

```ts
class Animal {
  public name;   	// 均可访问
  protected age;	// 仅类内部 + 子类内部可访问
  private class;	// 仅类内部可访问
  public constructor(name, age, class) {
    this.name = name;
    this.age = age;
    this.class = class;
  }  
}
```

```ts
// protected 保护的变量，只能在本类内部访问
class Animal {
  private name;
  public constructor(name: string) {
    this.name = name;
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }
  // console.log(this.name)   // Property 'name' is private and only accessible within class 'Animal'.
  														// 不能在子类访问
}

let a = new Cat('cat');
a.name;  											// Property 'name' is private and only accessible within class 'Animal'.(2341)
															// 不能在外部访问
```



构造函数的 `public`、 `protected` 和 `private`

- 当构造函数修饰为 `protected` 时，该类只允许被继承，不可实例化；

- 当构造函数修饰为 `private` 时，该类不允许被继承、不可实例化。

```ts
// protected
class Animal {
protected constructor(name) {
    this.name = name;
  }  
}

// private
class Car {
private constructor(name) {
    this.name = name;
  }  
}
```

### 参数属性

修饰符和 `readonly` 可以在构造函数的参数部分简写：

```ts
class Animal {
  // public name: string;
  public constructor(public name) {
    // this.name = name;
  }
}
// 这样就不需要提前声明，和不需要 this.name = name 属性初始化赋值两步操作了。
```



### readonly[§](https://ts.xcatliu.com/advanced/class.html#readonly)

只读属性关键字，只允许出现在属性声明、索引签名、构造函数中。

- 注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面。

```ts
class Animal {
  public constructor(public readonly name) {
  }
}
```



### 抽象类

`abstract` 用于定义抽象类和其中的抽象方法。

```ts
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

let a = new Animal('Jack');
// index.ts(9,11): error TS2511: Cannot create an instance of the abstract class 'Animal'.
```

特点：

1. 抽象类不允许被实例化；
2. 抽象类中的方法必须被子类实现；



### 类的类型

形式类似抽象类

```ts
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```



没有记录完整，https://ts.xcatliu.com/advanced/class-and-interfaces.html 中，一下章节尚未记录：

- 类的后半部分、类与接口、范型、声明合并。整体难度不大，细节有一些，有空可以再合并起来。





















