### React Hooks 系列知识

useRef 的作用

1. `useRef` 是一个方法，且 `useRef` 返回一个可变的 `ref` 对象（对象！！！）;
2. `initialValue` 被赋值给其返回值的 `.current` 对象；
3. 可以保存任何类型的值: dom、对象等任何值；
4. `ref` 对象与自建一个 `{current：'xx'}`对象的区别是：`useRef` 会在每次渲染时返回同一个`ref` 对象，即返回的 `ref` 对象在组件的整个生命周期内保持不变，也就是对这个对象一直持有。自建对象每次渲染时都建立一个新的。
5. `ref` 对象的值发生改变之后，不会触发组件重新渲染。
6. 本质上，`useRef` 就是一个其 `.current` 属性保存着一个可变值 “盒子”。
   1. 比如，用 `pageRef` 和 `sortRef` 分别用来保存分页信息和排序信息；
   2. 比如，用 `tableRef` 保存 ProTable 组件的 table 子组件，让它在适当的时候刷新：`tableRef.current.reload()`；



自定义 hooks 之实现一个 useState

```js
import { useEffect, useRef, useState } from 'react'

const useXState = (initState) => {
    const [state, setState] = useState(initState)
    let isUpdate = useRef()
    const setXState = (state, cb) => {
      setState(prev => {
        isUpdate.current = cb
        return typeof state === 'function' ? state(prev) : state
      })
    }
    useEffect(() => {
      if(isUpdate.current) {
        isUpdate.current()
      }
    }, [state])
  
    return [state, setXState]
  }

export default useXState
```

1. `useEffect()` 实现了当 `state` 更新后，调用传递的回调函数 cb。ps. 可以在自定义 hooks 中使用官方 hook；
2. `isUpdate` 的作用是每当调用 `useXState` 后，都会新建一个用来保存回调函数的变量（对象），这个回调函数就是 XState 所附带的回调函数。因为不论组件如何刷新，XState 和它的回调函数应当是都同一个，而不是随着组件刷新而重新被创建，所以用 useRef 保存。
3. 如果传递给 `setXState` 参数是一个函数，就会附带这个 `prev` 参数，然后调用，最后的形式类似这样：`setXState(setState(func(prev)) [, cb])`；如果传递的是要更新的数据，就是这样：`setXState(setState(data) [, cb])`



自定义 hooks 之实现一个 useUpdate

需求：实现一个强制刷新组件的方法。

思路：当 state 值发生改变时，就会导致组件重新渲染。利用这一思路，我们可以在 `useUpdate` 中定义一个内部的，用于控制组件渲染的 setFlag。

```js
import { useState } from 'react'

const useUpdate = () => {
    const [, setFlag] = useState()
    const update = () => {
        setFlag(Date.now())
    }
  
    return update
  }

export default useUpdate


// 调用方式：
update()
```

1. 调用 `update()` 时，就会调用 `setFlag` 方法更新数据，利用 `Date.now()` 具有的不重复性，确保每次调用 setFlag 可以更新与之前不同的数据，确保组件会强制渲染。



自定义 hooks 之实现 useScroll

需求：实现一个可以实时监听滚动位置的 hooks

```js
import { useState, useEffect } from 'react'

const useScroll = (scrollRef) => {
  const [pos, setPos] = useState([0,0])

  useEffect(() => {
    function handleScroll(e){
      setPos([scrollRef.current.scrollLeft, scrollRef.current.scrollTop])
    }
    scrollRef.current.addEventListener('scroll', handleScroll, false)
    return () => {
      scrollRef.current.removeEventListener('scroll', handleScroll, false)
    }
  }, [])
  
  return pos
}

export default useScroll



// 调用：
import React, { useRef } from 'react'
import { useScroll } from 'hooks'

const Home = (props) => {
  const scrollRef = useRef(null)
  const [x, y] = useScroll(scrollRef)

  return (
    <div>
      <div ref={scrollRef}>
        <div className="innerBox"></div>
      </div>
      <div>{ x }, { y }</div>
    </div>
  )
}
```

1. 利用 `addEventListener` 监听事件，通过 useEffect 包裹。确保在组件加载时开始监听、组件卸载时删除监听；
2. 利用 `useRef` 绑定一个元素，使组件发生渲染后，也变量能对该元素保持持有；
3. 利用 `setState` 来保存监听到的坐标变化，同时促使组件发生 render，让外部一直持有 pos 的最新数据。
4. 返回 pos，是监听到的坐标数据。

 ![img](React知识补充.assets/1708a5fd80c9958a~tplv-t2oaga2asx-watermark.awebp)



自定义 hooks 之实现 useDebounce 和 useThrottle

js 原版的 debounce 和 throttle

```js
// 节流
function throttle(func, ms) {
    let previous = 0;
    return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > ms) {
            func.apply(context, args);
            previous = now;
        }
    }
}

// 防抖
function debounce(func, ms) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, ms);
    }
}
```

hooks 实现节流：

- useDebounce接受三个参数，分别为回调函数，时间间隔以及依赖项数组

```js
import { useEffect, useRef } from 'react'

const useDebounce = (fn, ms = 30, deps = []) => {
    let timeout = useRef()
    useEffect(() => {
        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(() => {
            fn()
        }, ms)
    }, deps)

    const cancel = () => {
        clearTimeout(timeout.current)
        timeout = null
    }
  
    return [cancel]
  }

export default useDebounce

// 调用：
// ...
import { useDebounce } from 'hooks'

const Home = (props) => {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [cancel] = useDebounce(() => {
    setB(a)
  }, 2000, [a])

  const changeIpt = (e) => {
    setA(e.target.value)
  }
  return (
  <div>
    <input type="text" onChange={changeIpt} />
      { b } { a }
  </div>
}
```

![img](React知识补充.assets/17089ddf538f2a56~tplv-t2oaga2asx-watermark.awebp)

hooks 实现防抖：

```js
import { useEffect, useRef, useState } from 'react'

const useThrottle = (fn, ms = 30, deps = []) => {
    let previous = useRef(0)
    let [time, setTime] = useState(ms)
    useEffect(() => {
        let now = Date.now();
        if (now - previous.current > time) {
            fn();
            previous.current = now;
        }
    }, deps)

    const cancel = () => {
        setTime(0)
    }
  
    return [cancel]
  }

export default useThrottle
```

![img](React知识补充.assets/17089f7c45af40bc~tplv-t2oaga2asx-watermark.awebp)



### HOC 高阶组件

> 好文：
>
> - [掘金：「react进阶」一文吃透React高阶组件(HOC) —— 我不是外星人](https://juejin.cn/post/ 6940422320427106335)

组件间信息的传递，就是通过 props 的；

- HOC 和 WrappedComponent 的信息传递，也是通过 props。所以，HOC 的state 的传递，是把回调函数通过 props 传递过去来实现。



学习 HOC，高阶组件，明白了 HOC 具有以下几个特点：

- **高阶组件不是组件，它是一个将某个组件转换成另一个组件的纯函数。**
- HOC 主要作用是实现 **代码复用** 和 **逻辑抽象**：对 `state` 和 `props` 进行抽象和操作（如多个组件有共同的 state 和 props 逻辑）、对组件进行细化（如添加生命周期）、实现渲染劫持（如鉴权后再渲染组件）等。在实际的业务场景中合理的使用高阶组件，可以提高开发效率和提升代码的可维护性。
- HOC 被大量 `React.js` 相关的第三方库所使用，如 `React-Redux`的 `connect` 方法、`React-Loadable` 等。
- 高阶组件有两种实现方式，分别是正向代理和反向继承。
  - 它可以看作是装饰器模式在 `React` 中的实现：在不修改原组件的情况下实现组件功能的增强。



HOC 从实现方式上，有 **正向代理** 和 **反相继承** 两种模式；

HOC 从基本功能上，可以对 WrappedComponent 的 props、state、refs 和 生命周期等进行 拦截 / 删改 / 增强；

所以，对 HOC 的整体把控，应当从 HOC 的两种模式对 WrappedComponent 的 props、state、refs 和生命周期如何进行拦截；拦截方式各有什么特点来入手。



正向代理 Props Proxy

总结：通过正向代理模式，HOC 有且仅有 Wrapped Component 的 props 可以直接获取 ，其余的 state、refs 等无法直接得到。

```tsx
function HOC(WrappedComponent) {
  const newProps = { type: 'HOC' };
  return <WrappedComponent {...props} {...newProps}/>;
} 
```

- 正向代理只可以拦截 Wrapped Component 的 props；而 state、refs、生命周期都无法拦截。
- HOC 拦截了 WrappedComponent。注意正向代理的 **Proxy** 单词，这其实就相当于对组件的一次拦截，在拦截后，可以对 WrappedComponent 进行适当的修改，最后再渲染。所以，正向代理可以直接拦截 WrappedComponent 的 props，进行删改后再重新返回给 Wrapped Component。

- state、refs：HOC 对它们的拦截可以变相实现：在 HOC 中定义回调函数，Wrapped Component 中通过调用回调函数，把 state、setState、refs 的传递给 HOC。
- 生命周期：在 HOC 中定义生命周期时，相当于直接重写了 Wrapped Component 的生命周期。



反相继承 Inheritance Inversion

总结：通过反相继承 HOC 继承了 WrappedComponent，形成了父子关系。所以 HOC 继承且可获取 Wrapped Component 的 props、state、refs。

- HOC 继承了 WrappedComponent，这种结构可以理解为 HOC 是 WrappedComponent 的一个子组件。

- 反相继承中 Wrapped Component 是父，HOC 是子。所以 HOC 可以顺利继承到 Wrapped Component 中的 props、state、refs、生命周期等等可继承的东西，然后进行修改。















































