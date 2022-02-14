## 库的整体认知：

### redux

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



### react-redux

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



### react-router-dom

> 好文：
>
> - [掘金：「源码解析 」这一次彻底弄懂react-router路由原理](https://juejin.cn/post/6886290490640039943)
> - [掘金：React Router 入门完全指南(包含 Router Hooks)  🛵](https://juejin.cn/post/6948226424427773983)
> - [掘金：使用React-Router实现前端路由鉴权](https://juejin.cn/post/6854573217445740557)
>
> 开篇疑问：
>
> - 待验证：react-router-dom 新版本中去掉了重定向Redirect和Switch？
> - 待验证：这东西更新的太快了，`Switch组件`和`Route的component属性`都没了？



#### 三个库的区别

`react-router-dom` 和 `react-router` 和 `history` 库三者的关系：

新版的`React-Router`将核心逻辑层和展示层分开了，核心逻辑会处理路由匹配等，展示层会处理实际的跳转和路由变化的监听，之所以这么分，是因为React-Router不仅仅需要支持浏览器，还需要支持React Native，这两个平台的监听和跳转是不一样的，所以现在[React-Router](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FReactTraining%2Freact-router%2Ftree%2Fmaster%2Fpackages)下面有好几个包了：

> `react-router`：核心逻辑处理，提供一些公用的基类
>
> `react-router-dom`：具体实现浏览器相关的路由监听和跳转
>
> `react-router-native`：具体实现 RN 相关的路由监听和跳转

在实际使用时，我们一般不需要引用`react-router`，而是直接用`react-router-dom`就行，因为它自己会去引用`react-router`。



- 总体来看，这三者是包含关系，即：react-router-dom 包含了 react-router，react-router 包含了 history；

- `history` 可以理解为 `react-router` 的核心，也是整个路由原理的核心，里面集成了 `popState`, `history.pushState`等底层路由实现的原理方法；所以，react-router-dom 中的 useHistory 的实例化就是 history 库的实例化；

- `react-router` 可以理解为是 `react-router-dom` 的核心；里面封装了`Router，Route，Switch`等核心组件,实现了从路由的改变到组件的更新的核心功能,在我们的项目中只要一次性引入 `react-router-dom`就可以了。
- `react-router-dom`，在 `react-router` 的核心基础上，添加了用于跳转的 `Link` 组件，和 `histoy` 下的 `BrowserRouter` 和 hash 模式下的 `HashRouter` 组件等。所谓 `BrowserRouter` 和 `HashRouter`，也只不过用了 `history` 库中`createBrowserHistory` 和 `createHashHistory` 方法。



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

- `Router` 接收 location 变化，派发更新流，`<Router />` 的作用是把 `history location ` 等 **路由信息** 传递下去。

  - 初始化绑定 listen，路由变化，通知改变 `location`，改变组件。react 的 history 路由状态是保存在 `React.Content` 上下文之间，状态更新。

  - **一个项目应该只有一个根 `Router` ， 来产生切换路由组件之前的更新作用。** **如果存在多个 `Router` 会造成，会造成切换路由，页面不更新的情况。**

- Link 是路由跳转的触发点，类似 a 标签的作用，触发就会导致路由跳转， Link 最终转化为一个 a 标签呈现在页面上；

- NavLink 是 Link 的特殊形式，增添了一个额外属性：`activeClassName=""`，当该元素处在 active 时，可以动态添加属性名。

- Switch 是一个路由表，按从上至下的顺序查找 link 对应的 Route 组件，找到后渲染这个组件；

- Route 是路有表中被包裹的路由组件，通过 path 找到该路由后，就会渲染这个路由；

- Redirect 实现了路由重定向。

  - 重定向效果类似于 hisory API 中的 `history.replace('somePath..')`；把原计划访问的 Path，替换为新的 Path。

所以：`<Route/>` 组件一般是 `<Switch/>` 组件的子元素。当 `<Switch/>` 进行渲染的时候，会根据当前浏览器的与 `<Route path=""/>` 进行匹配如果匹配上了，将进行渲染该Route里的compnent。如果没有匹配到，`<Switch/>`将不会渲染任何东西。



在路由中传递参数

- `props.match.params`：接受 URL path 中传递的参数；
- `props.history`：获取到可以操作浏览器 history 的对象，拥有`goBack`，`goForward`, `push` 等API；

```tsx
export default function App() {
  // 需要传递的参数
  const name = "John Doe";
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {/* Link 中这样传递 */}
          <li><Link to={`/about/${name}`}>About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* Route 中这样定义 :name */}
        <Route path="/about/:name" component={About} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </Router>
  );
}

const Home = () => (
  <Fragment>
    <h1>Home</h1>
    <FakeText />
  </Fragment>
);

const About = ({
  match: {
    params: { name },
  },
}) => (
  {/* 子组件中这样读取 */}
  // props.match.params.name
  <Fragment>
    <h1>About {name}</h1>
    <FakeText />
  </Fragment>
);

const Contact = () => (
	// ……
);
```



React Router Hooks

一共有四个：

- useHistory：让路由方便的获取一个可操作浏览器 history 的 history 对象，而不必通过 `props.history` 获取；
  - action,block,createHref,go,goBack,goForward,length,listen,location,push,replace等属性/方法；
- useLocation：返回当前 URL 的 loaction 对象；
- useParams：帮助组件直接访问到路由传递过来的参数，而不再需要通过 `props.` 访问；
  - 如，`props.match.params.xx` 可以直接通过 `const {name} = useParams();`
  - 如，在动态路由中使用，便于获取当前动态参数，如后台传递路由信息，前端拿到并生成侧边栏。
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



### 流程分析

**当地址栏改变url，组件的更新渲染都经历了什么？**

拿 history 模式做参考。

1. 当 url 改变，首先触发 histoy，调用事件监听 `popstate` 事件， 触发回调函数 `handlePopState`；
2. 触发 history 下面的 `setstate` 方法，产生新的 `location` 对象，`location` 保存着当前 URL 信息；
3. 然后通知最外层的 `Router` 组件更新 `location` 并通过 `context ` 上下文把 `location` 信息传递出去；
4. `switch` 组件拿到传递的更新，通过 URL 匹配出符合的 `Route` 组件渲染，通过 `context` 把信息传递出去；
5. 最后 `Route` 组件取出 `context` 内容，传递给渲染页面，渲染更新。

**当我们调用`history.push`方法来切换路由，组件的更新渲染经历了什么？**

拿 history 模式作为参考，当我们调用 `history.push` 方法，

1. 首先调用 history 的 `push` 方法，通过 `history.pushState` 来改变当前浏览器的 `URL`；
2. 接下来触发 history 下面的 `setState` 方法，接下来的步骤就和上面一模一样了，这里就不一一说了。





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

同一个文档的 `history` 对象出现变化时，就会触发 ` popstate` 事件。

**注意：用 `history.pushState()` 或者 `history.replaceState()` 不会触发 `popstate` 事件**。 

- `popstate` 事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮或者调用 `history.back()、history.forward()、history.go()`方法。

-  `history.pushState` 可以使浏览器地址改变，但是无需刷新页面。



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



`hisotry.push()` 的执行过程：

1. 首先生成一个最新的 `location` 对象；
2. 然后通过 `window.history.pushState()` 方法改变浏览器当前路由 (即当前的path)；
3. 最后通过 `setState` 方法通知 `React-Router` 更新，并传递当前的 location 对象；
   - 由于这次 URL 的变化，是 `history.pushState` 产生的，并不会触发 `popState` 方法，所以需要手动 `setState`，触发组件更新。





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















