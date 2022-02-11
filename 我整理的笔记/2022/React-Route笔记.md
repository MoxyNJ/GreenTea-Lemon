## 库的整体认知：

#### redux

数据管理工具、状态 state 管理工具、数据存储工具、组件间数据交流工具；

项目在 cofigStore 中，对 redux 进行了配置，先放在这里：

```tsx
import { createStore, applyMiddleware, compose, StoreEnhancerStoreCreator } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import history from './history';

const middlewares = [sagaMiddleware, routerMiddleware(history)];
```

需要用到的：

creatStore：用于创建 store 的函数，会把所有 enhancer、reducer、initValue 等等进行整合；

StoreEnhancerStoreCreator：用于创建 enhancer 的函数。

compose：用于把所有的 enhancer 进行整合。通过 `compose(funA,funB,funC)` 实质上是嵌套的：`compose(funA(funB(funC())))`，最终返回合并后的最终函数。

- enhancer：enhancer 不是一个函数或者对象，而是一个对 store 进行增强的函数的统称，比如中间件就是一种增强方式、redux devToolsExtension 也是一种增强方式。



reducer：用于处理 state 数据的纯函数。

combineReducers：如果 reducer 太长，可以拆分开多个子 reducer；然后通过 combineReducers 进行合并。



中间件：

applyMiddleware：用于把所有的 middleware 进行整合。对 store 存储数据前，进行拦截，比如在此进行异步请求，用 axios 从服务器获取数据；利用 redux-thunk 从服务器获取数据；利用 connected-react-router 把 route 信息同步到 redux 中等等

- createSagaMiddleware：用于生成 sagaMiddleware 的函数；

- routerMiddleware：用于生成 routerMiddleware 的函数，需要传入 history 对象，来监听浏览器的 history。



#### react-redux

将 redux 引入到 react 中，使 react 可以利用 redux 来管理部分数据。

引用：react-redux 提供 `Provider` 组件通过 context 的方式向应用注入 store，然后组件使用 `connect` 高阶方法获取并监听 store，然后根据 store state 和组件自身的 props 计算得到新的 props，注入该组件，并且可以通过监听 store，比较计算出的新 props 判断是否需要更新组件。

```tsx
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
```



引用：官方文档中提到的是 react-router-redux，并且它已经被整合到了 react-router v4 中，但是根据 react-router-redux 的文档，该仓库不再维护，推荐使用 connected-react-router。



用到的组件：

- `connected-react-router`
- `history`
- `redux`
- `react-redux`
- `react-router-dom`
- `redux-devtools-extension` ?



浏览器中的这些属性作用是什么？

- history
- navigator
- location



#### react-router-dom

> 好文：
>
> - [掘金：「源码解析 」这一次彻底弄懂react-router路由原理](https://juejin.cn/post/6886290490640039943)
> - 

```tsx
import ReactDOM from 'react-dom';
import Home from './page/Home'
import About from './page/About'
import Me from './page/Me'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <nav>
      <ul>
        <li><Link to="/home" >Home</Link></li>
        <li><Link to="/about" >About</Link></li>
        <li><Link to="/me" >Me</Link></li>
        <li><Link to="/other" >other</Link></li>
        <li><Redirect to="/login" /></li>
      </ul>
    </nav>
    <Switch>
      <Route path="/home" component={Home}></Route>
      <Route path="/about" component={About}></Route>
      <Route path="/me" component={Me}></Route>
      <Redirect from='/aboutMe' to='/Me'/></Redirect>
    </Switch>
  </Router>,
  document.getElementById('root')
);
```

- Router 是最外侧的包裹；
- Link 是路由跳转的触发点，类似 a 标签的作用，触发就会导致路由跳转， Link 最终转化为一个 a 标签呈现在页面上；
- NavLink 是 Link 的特殊形式，增添了一个额外属性：`activeClassName=""`，当该元素处在 active 时，可以动态添加属性名。
- Switch 是一个路由表，按从上至下的顺序查找 link 对应的 Route 组件，找到后渲染这个组件；
- Route 是路有表中被包裹的路由组件，通过 path 找到该路由后，就会渲染这个路由。
- <Redirect to="/login" />

所以：`<Route/>` 组件一般是 `<Switch/>` 组件的子元素。当 `<Switch/>` 进行渲染的时候，会根据当前浏览器的与 `<Route path=""/>` 进行匹配如果匹配上了，将进行渲染该Route里的compnent。如果没有匹配到，`<Switch/>`将不会渲染任何东西。



React Router hooksx有四个，本项目中没有发现有使用：

- useHistory：获取一个 history对象，可以对浏览器的导航进行操作；
  - action,block,createHref,go,goBack,goForward,length,listen,location,push,replace等属性/方法
- useLocation：获取一个 location 对象，可以获取当前页面的 url；
- useParams：在动态路由中使用，便于获取当前动态参数，如后台传递路由信息，前端拿到并生成侧边栏。
- useRouteMatch：



----------------------------

#### history

> 单页面应用路由实现原理是，切换 url，监听 url 变化，从而渲染不同的页面组件。
>
> 主要的方式有 `history` 模式和 `hash` 模式。



—— history 的粗浅理解

window.history 是浏览器用于保存网页前进/后退的浏览历史记录。主要功能有：前进、后退、替换等等；

router 中 history 是对 window.history 的一个拦截，通过操作 window.history，可以让浏览器的 URL 地址栏发生改变。但是不会让页面全部刷新。有两种情况：

- React 页面内，组件直接的切换：通过控制 window.history 让 URL 发生改变，同时渲染对应的组件，但页面并不会发生整体的刷新，而是只刷新替换的局部组件。此时 history 对 window.history 做了拦截，阻止浏览器刷新页面。
- 让 window.history 进行正常的刷新，让页面跳转到新的页面中。
- tips：个人理解，这就类似于对 a 标签的默认跳转功能进行拦截，让 a 标签不要实现页面跳转，而是利用 a 标签的其他功能，做自己想做的事情。比如跳转到该页面内某个标题的锚点上。



### 路由的实现

#### 1 history 模式原理

##### ① 改变路由

- `history.pushState`

```tsx
history.pushState(state,title,path)
```

1 `state`：一个与指定网址相关的状态对象， popstate 事件触发时，该对象会传入回调函数。如果不需要可填 null。

2 `title`：新页面的标题，但是所有浏览器目前都忽略这个值，可填 null。

3 `path`：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个地址。



- `history.replaceState`

```tsx
history.replaceState(state,title,path)
```

参数和 `pushState` 一样，这个方法会修改当前的 ` history` 对象记录。不同的是不会让  history 的记录 +1 ，而是替换顶端的历史记录，所以 `history.length` 的长度不会改变。



##### ② 监听路由

- `popstate` 事件

```tsx
window.addEventListener('popstate',(e)=>{
  // cb
})
```

同一个文档的 `history` 对象出现变化时，就会触发 ` popstate` 事件。 `history.pushState` 可以使浏览器地址改变，但是无需刷新页面。

**注意：用 `history.pushState()` 或者 `history.replaceState()` 不会触发 `popstate` 事件**。 `popstate` 事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮或者调用 `history.back()、history.forward()、history.go()`方法。

#### 2 hash模式原理

##### ① 改变路由

- `window.location.hash`

通过 `window.location.hash `  属性获取和设置 `hash ` 值。

##### ② 监听路由

- `onhashchange` 事件

```tsx
window.addEventListener('hashchange',function(e){
    /* 监听改变 */
})
```



history 库中的核心 api

```tsx
const PopStateEvent = 'popstate'
const HashChangeEvent = 'hashchange'
/* 这里简化了createBrowserHistory，列出了几个核心api及其作用 */
function createBrowserHistory(){
    /* 全局history  */
    const globalHistory = window.history
    /* 处理路由转换，记录了listens信息。 */
    const transitionManager = createTransitionManager()
    /* 改变location对象，通知组件更新 */
    const setState = () => { /* ... */ }
    
    /* 处理当path改变后，处理popstate变化的回调函数 */
    const handlePopState = () => { /* ... */ }
   
    /* history.push方法，改变路由，通过全局对象history.pushState改变url, 通知router触发更新，替换组件 */
    const push=() => { /*...*/ }
    
    /* 底层应用事件监听器，监听popstate事件 */
    const listen=()=>{ /*...*/ } 
    return {
       push,
       listen,
       /* .... */ 
    }
}
```

![img](React-Route笔记.assets/ac7ed7a701714650b55c9193db2220ea~tplv-k3u1fbpfcp-watermark.awebp)





#### 区别

`react-router-dom` 和 `react-router` 和 `history` 库三者的关系：

- 总体来看，这三者是包含关系，即：react-router-dom 包含了 react-router，react-router 包含了 history；

- `history` 可以理解为 `react-router` 的核心，也是整个路由原理的核心，里面集成了 `popState`, `history.pushState`等底层路由实现的原理方法；所以，react-router-dom 中的 useHistory 的实例化就是 history 库的实例化；

- `react-router` 可以理解为是 `react-router-dom` 的核心；里面封装了`Router，Route，Switch`等核心组件,实现了从路由的改变到组件的更新的核心功能,在我们的项目中只要一次性引入 `react-router-dom`就可以了。
- `react-router-dom`，在 `react-router` 的核心基础上，添加了用于跳转的 `Link` 组件，和 `histoy` 下的 `BrowserRouter` 和 hash 模式下的 `HashRouter` 组件等。所谓 `BrowserRouter` 和 `HashRouter`，也只不过用了 `history` 库中`createBrowserHistory` 和 `createHashHistory` 方法。







## 代码结构

#### Root.ts

```tsx
public render() {
  return (
    <Provider store={this.props.store}>
      <ConnectedRouter history={history}>
        {renderRouteConfig(this.props.routeConfig, '/')}
      </ConnectedRouter>
    </Provider>
  );
}
```

Provider：React 绑定 redux 的组件，库是 `react-redux`。目的是引入 redux 的数据，把 store 传入 React 组件中，Provider 组件是 React 页面最外侧包裹的组件。

ConnectedRouter：库是 `connected-react-router`，引入 route，通过传入 history 对象，对浏览器的 history 进行控制，拦截页面跳转功能。

- ConnectedRouter 的内部，就是平行的 Route 组件。有 Link、Route、Redirect 等等组件，可以用 switch 进行统一管理。这些组件的库是 `react-router-dom`。在这里，是利用 `renderRouteConfig()` 函数进行管理。

store：`redux` 控制 state 数据存储、读取的对象。

history：通过 `createBrowserHistory()` 创建，库是 `history`	



Root.ts / `renderRouteConfig()` 函数















