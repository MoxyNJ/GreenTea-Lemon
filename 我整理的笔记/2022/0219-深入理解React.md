#  Fiber

> 引用：
>
> - https://juejin.cn/post/6844903975112671239#heading-4
> - https://juejin.cn/post/6844903582622285831#comment



Fiber的另外一种解读是’纤维‘: **这是一种数据结构或者说执行单元**。我们暂且不管这个数据结构长什么样，**🔴将它视作一个执行单元，每次执行完一个'执行单元', React 就会检查现在还剩多少时间，如果没有时间就将控制权让出去**。



上文中提到 React 16 之前，Reconcilation 是同步的、递归执行的。也就是说这是基于函数’调用栈‘的Reconcilation算法，因此通常也称它为`Stack Reconcilation`. 你可以通过这篇文章[《从Preact中了解React组件和hooks基本原理》](https://juejin.cn/post/6844903861434449933) 来回顾一下历史。



'`副作用`(Effect)' 

Reconcilation - 调和，v16（不含）以前的经典算法，相当于 diff。



DOM 更新不是一次性完成的，而是切分为多组（一组有n个fiber）完成；这样用户体验更好，不会产生过多的堵塞。



“每个工作单元（fiber）执行完成后，都会查看是否还继续拥有主线程时间片，如果有继续下一个，如果没有则先处理其他高优先级事务，等主线程空闲下来继续执行。”这里貌似没有考虑到任务过期的情况：如果在一次遍历时发现如果有过期任务，因该会立即执行，即使时间片已经用完。















### useEffect

- useEffect 的触发时间是在 render 的执行之后，此时新的 DOM 已经构建完成；
- useEffect 是异步触发的，不会对 js 进行阻塞。
- 所以，在 useEffect 对 state 进行更新，即使下例这样，只在初始化组件时更新（即 useEffect 的第二个参数传递为 `[]`），也会导致组件发生两次 DOM 构建，所以 `render dom` 执行了两次。

#### 于 **useLayoutEffect**  的区别

**useEffect** 执行， React 处理逻辑是采用异步调用。对于每一个 effect 的 callback， React 会向 `setTimeout` 回调函数一样放入任务队列中。等到主线程任务完成，DOM 更新，js 执行完成，视图绘制完毕，才执行。所以 effect 回调函数不会阻塞浏览器绘制视图。

**useLayoutEffect** 的触发时机是在新的 DOM 绘制前，所以新的 DOM 虽然也构建完毕了（return中的代码执行了），但尚未绘制，节省了浏览器的绘制性能。

所以，如果想在 DOM 绘制前修改 DOM 内容，比如对 DOM 结构进行修改、更新会插入 DOM 中的 state 数据等，用 useLayoutEffect 更合适，其余时间都用 useEffect 即可。

- 注意，两个 hook 都在新 DOM 构建完毕后再执行 callback，也就是说 return 的代码都被执行过了。

```jsx
function Container() {
  const [state, setState] = useState(0);

  useEffect(() => {
    console.log('useEffect', state)
    setState(10)
    },[]);

    return (
      <div>
      	{console.log('render dom', state)}
        <h3>React is kicking your ass for {state}th time...</h3>
      </div>
    )
}
```

![截屏2022-02-18 下午8.34.35](深入理解React.assets/截屏2022-02-18 下午8.35.20-5188560.png)

如果上文相同的代码结构，只是把 useEffect 替换为 useLayoutEffect 的话：

![截屏2022-02-18 下午8.51.47](深入理解React.assets/截屏2022-02-18 下午8.51.47.png)







