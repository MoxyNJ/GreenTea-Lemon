 

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







