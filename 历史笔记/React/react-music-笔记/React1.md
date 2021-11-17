# [一] React 基础知识

# 0 React 基本

## 0.1 引言

### 0.1.1 React 的特点

1. 声明式编程
2. 组件化编程
3. React Native编写原生应用 
   -  *React Native (简称RN)是Facebook于2015年4月开源的跨平台移动应用开发框架，是Facebook早先开源的JS框架 React 在原生移动应用平台的衍生产物*
4. 高效 (优秀的 Diffing 算法)



### 0.1.2 React 高效的原因

1. 使用虚拟 (virtual) DOM ，不总是直接操作页面真实 DOM。
2. DOM Diffing 算法,最小化页面重绘

**注意：React 并不会提高渲染速度，反而可能会增加渲染时间。真正高效的原因是它能有效减少渲染次数**。



### 0.1.3 创建虚拟 DOM

```jsx
//1.创建虚拟DOM
	const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
    	<h1 id="title">
		    <span>Hello,React</span>
		</h1>
	)
//2.渲染虚拟DOM到页面
	ReactDOM.render(VDOM,document.getElementById('test'))

//3.打印真实DOM与虚拟DOM,这一步不是jsx创建虚拟dom必须，我只是为了方便查阅
	const TDOM = document.getElementById('demo')
    console.log('虚拟DOM',VDOM);
	console.log('真实DOM',TDOM);
```

虚拟 DOM：

1. 本质是 Object 类型的对象(一般对象)
2. 虚拟 DOM 比较 **'轻'**  , 真实 DOM 比较 **'重'** , 因为虚拟 DOM 是 React 内部在用 , 无需真实 DOM 上那么多的属性 (只有 React 需要的属性)。
3. 虚拟 DOM 最终会被 React 转化为真实 DOM , 呈现在页面上。



### 0.1.4 jsx 基本语法：

1. 定义虚拟 DOM 时，不要写引号 `""`；
2. 标签中混入 JS 表达式时要用 `{}`；
3. 样式的类名指定不要用 `class`，要用 `className`；
4. 内联样式，要用 `style={{key:value}}` 的形式 (双 `{{}}` 代表对象，单 `{}` 代表 JS 表达式) ；
5. 有且只有一个根标签 (整个虚拟 DOM 在外层有且仅有一个容器包裹)；
6. 标签必须闭合 `<demo />`
7. 标签首的字母：
   - 若 **小写字母** 开头，React 会识别为 html 中同名元素。若 html 中无对应的同名元素，则 **报错**。
   - 若 **大写字母** 开头，React 会识别为一个组件，然后会查找然后渲染对应组件，若组件没有定义，则 **报错**。



### 0.1.5 开头引入的 script 文件：

1. 准备好一个容器，放置 React 渲染的 DOM；
2. 引入三个库：
   - react 核心库：`react.development.js`；
   - react-dom 库：`react-dom.development.js`；
     - babel 库：`babel.min.js`。
3. 写 react 代码，在 `<script type="text/babel" ></script>` 中，一定要写 `babel`，否则不会调用 babel 把 jsx 语法转化为 js 语法。
   - 创建虚拟 DOM
   - 渲染虚拟 DOM

```jsx
<body>
	<!-- 准备好一个“容器” -->
	<div id="test"></div>

	<!-- 引入react核心库 -->
	<script type="text/javascript" src="react.development.js"></script>
	<!-- 引入react-dom，用于支持react操作DOM -->
	<script type="text/javascript" src="react-dom.development.js"></script>
	<!-- 引入babel，用于将jsx转为js -->
	<script type="text/javascript" src="babel.min.js"></script>

	<script type="text/babel" > /* 此处一定要写babel */
		// 1.创建虚拟DOM
		const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
			<h1 id="title">
				<span>Hello,React</span>
			</h1>
		)
		
        // 2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
</body>
```





# 1 类式组件的结构：

1. 必须 **继承**。 `React.Component` ；
2. 必须有 **渲染方法**。 `render(){ return ...}`，在 render 中返回一个 HTML 结构。
3. 可以有 **自定义方法**，需要指出的是，自定义方法中的 this，没有指向当前实例对象。因为这个方法不是通过 `p1.callName()` 的方法调用的。也就是说调用者不是实例对象，而是 React 直接调用的。
   - 解决方案：`this.changeWeather = this.changeWeather.bind(this)`，使用 bind 函数，把这个 `changeWeather`  的 this 强制绑定到这个实例对象上。



### 一个类式组件的实例对象的结构：

![image-20211007144501255](React1/image-20211007144501255-16335891033111.png)

### `consructor` 

构造函数，仅用于以下两种情况：

1. 通过给 `this.state` 赋值对象来初始化内部 `state`。
2. 为事件处理函数绑定实例。 

- 所以，构造器可以直接省略：

1. 初始化 `state`，可以采用简写的形式，直接在类中定义属性 `state = {...}`
2. 事件处理函数，通过直接在类中定义一个属性，赋值箭头函数表达式：`changeWeather = () => {}`，既可以解决 this 问题，又省略了 constructor。

如果声明了构造器，但是忘记调用 `super(props)`，就会产生 bug，必须调用 `super()`，且传递 `props`。



### context

还未讲解。



### props 

标签属性，组建实例的三大属性之一。用于传递标签属性。在 `constructor(props)`  中可以接受到 props，把 props 通过 `super(props)` 

- props 是 **只读** 的。

- 通常用字符串展开来传递属性，注意传递数字的时候，要用 `{}`；
- 可以对接收的数据类型进行限制。在类组件中，用静态对象 `static propTypes = {}`；在函数组件中，用属性 `Person.propTyps = {}`；
- 可以对接收的数据添加默认属性。在类组件中，用静态对象 `static defaultProps = {}`；在函数组件中，用属性 `Person.defaultProps = {}`；



### refs

标签名属性，组件实例的三大属性之一。组件内的标签，可以定义 ref 属性来标识自己。这相当于 HTML 中的 ID 属性。

refs 的最佳实践，官方最新版本的 createRef API。

refs 要尽量少使用，多使用事件机制。当发生事件的元素，就是要触发事件后进行操作的元素本身，就可以省略 ref，使用 `event.target.value`（课程P32，7:00，事件处理）



### state

状态，组件实例的三大属性之一。存储着组件的数据。

- 有两种写法：正常写和简写。
  - 简写不需要 `constructor` 和通过 `bind` 绑定解决自定义函数的 `this` 执行问题。
    - `constructor` 外部通过属性名定义的函数表达式，最后定义在了实例化对象上。所以，通过箭头函数去定义的 **函数表达式**，它的 `this` 就根据定义这个函数时的位置，指向了实例对象，这样就省略了 `bind` 去绑定 `this` 的指向。
- 修改 `this.state`，不能直接修改，通过 `this.setState()`  修改。



# 2 组件间的父子关系

### 2.1 建立父子组件关系

方式一：

在父组件的 `render()` 的 `return` 中，形成父子关系的 DOM 结构。

```jsx
//父组件A
class A extends React.Component{
    render(){
        return(
            <div>
                <div>我是A组件</div>
                <B/>
            </div>
        )
    }
}

//子组件B
class B extends React.Component{
    render(){
        console.log('B---render');
        return(
            <div>我是B组件</div>
        )
    }
}

//渲染组件
ReactDOM.render(<A/>,document.getElementById('test'))
```



###   2.2 组件间通信：

方式一：props

方式二：context（provider+？？）



# 3 代码示例

## 3.1 State

头部文件：

```js
<div id="test1"></div>
<script type="text/javascript" src="../js/react.development.js"></script>
<script type="text/javascript" src="../js/react-dom.development.js"></script>
<script type="text/javascript" src="../js/babel.min.js"></script>
```

规范写法，繁琐：

```jsx
class Weather extends React.Component{
	constructor(props){
		console.log('constructor');
		super(props)
		//初始化状态
		this.state = {isHot:false,wind:'微风'}
		//解决changeWeather中this指向问题
		this.changeWeather = this.changeWeather.bind(this)
	}

	render(){
		//读取状态
		const {isHot,wind} = this.state
		return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
	}

	changeWeather(){
		//changeWeather放在原型对象上，供实例使用
		//由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
		//类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined
		
		//获取原来的isHot值
		const {isHot} = this.state
		//严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。
		this.setState({isHot:!isHot})
	}
}

ReactDOM.render(<Weather/>,document.getElementById('test'))
```

### 1 最佳实践：

简写，解决 bind 和 constructor：

```jsx
class Weather extends React.Component{
    //初始化状态
    state = {isHot:false,wind:'微风'}

    render(){
        const {isHot,wind} = this.state
        return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
    }

	// 自定义方法————要用赋值语句的形式 + 箭头函数
    // changeWeather 放在实例对象上，而不在原型对象。这样通过箭头函数， this 就固定指向了实例对象。
    changeWeather = ()=>{
        const isHot = this.state.isHot
        this.setState({isHot:!isHot})
    }
}

ReactDOM.render(<Weather/>,document.getElementById('test'))
```



## 3.2 props

头部文件：

```jsx
<div id="test1"></div>
<script type="text/javascript" src="../js/react.development.js"></script>
<script type="text/javascript" src="../js/react-dom.development.js"></script>
<script type="text/javascript" src="../js/babel.min.js"></script>

// 如果需要对props进行限制和定义默认值，需要调用 prop-types库：
<script type="text/javascript" src="../js/prop-types.js"></script>
```

### 1 经典用法：

直接省略了 constructor 对 props 的传递。

```jsx
//创建组件
class Person extends React.Component{
    render(){
        // console.log(this);
        const {name,age,sex} = this.props
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
            </ul>
        )
    }
}
//渲染组件到页面
ReactDOM.render(<Person name="jerry" age={19}  sex="男"/>,document.getElementById('test1'))

const p = {name:'老刘',age:18,sex:'女'}
// 通过扩展运算符，浅拷贝对象，达到传递值的目的，更简洁。
ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))
// 传统方法，太繁琐。
// ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'))
```

### 2 对 props 进行限制：

在类中：

```jsx
class Person extends React.Component{
    render(){
        // console.log(this);
        const {name,age,sex} = this.props
        //props是只读的
        //this.props.name = 'jack' //此行代码会报错，因为props是只读的
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
			</ul>
		)
	}
}
//对标签属性进行类型、必要性的限制
Person.propTypes = {
    name:PropTypes.string.isRequired, //限制name必传，且为字符串
    sex:PropTypes.string,//限制sex为字符串
    age:PropTypes.number,//限制age为数值
    speak:PropTypes.func,//限制speak为函数
}
//指定默认标签属性值
Person.defaultProps = {
    sex:'男',//sex默认值为男
    age:18 //age默认值为18
}
//渲染组件到页面
ReactDOM.render(<Person name={100} speak={speak}/>,document.getElementById('test1'))

function speak(){
    console.log('我说话了');
}
```

### 3 类组件的最佳实践：

在类中，经常采用以下方式简写：

```jsx
class Person extends React.Component{
	//对标签属性进行类型、必要性的限制
	static propTypes = {
		name:PropTypes.string.isRequired, //限制name必传，且为字符串
		sex:PropTypes.string,//限制sex为字符串
		age:PropTypes.number,//限制age为数值
	}

	//指定默认标签属性值
	static defaultProps = {
		sex:'男',//sex默认值为男
		age:18 //age默认值为18
	}
	
	render(){
        // props是只读的
		const {name,age,sex} = this.props
		//this.props.name = 'jack' //此行代码会报错，因为props是只读的
		return (
			<ul>
				<li>姓名：{name}</li>
				<li>性别：{sex}</li>
				<li>年龄：{age+1}</li>
			</ul>
		)
	}
}

ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
```

### 4 函数组件的最佳实践：

在函数组件中，使用 props：

```jsx
function Person (props){
	const {name,age,sex} = props
	return (
			<ul>
				<li>姓名：{name}</li>
				<li>性别：{sex}</li>
				<li>年龄：{age}</li>
			</ul>
		)
}
Person.propTypes = {
	name:PropTypes.string.isRequired, //限制name必传，且为字符串
	sex:PropTypes.string,//限制sex为字符串
	age:PropTypes.number,//限制age为数值
}

//指定默认标签属性值
Person.defaultProps = {
	sex:'男',//sex默认值为男
	age:18 //age默认值为18
}

ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
```



## 3.3 refs

### 1 过时方式：字符串形式

已 **不推荐使用** ：

```jsx
class Demo extends React.Component{
	//展示左侧输入框的数据
	showData = ()=>{
		const {input1} = this.refs
		alert(input1.value)
	}
	//展示右侧输入框的数据
	showData2 = ()=>{
		const {input2} = this.refs
		alert(input2.value)
	}
	render(){
		return(
			<div>
				<input ref="input1" type="text" placeholder="点击按钮提示数据"/>&nbsp;
				<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
				<input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
			</div>
		)
	}
}
ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
```

### 2 回调函数形式

在页面的 state 状态更新时，会调用两次 refs 的回调函数：

1. 第一次会把传递的参数置为 null，达到清空状态更新前的旧 refs 信息；
2. 第二次会正确的传递节点信息。

如果把回调函数放在 class 内部，而不是采用内联的形式，可以避免两次调用的问题，但事实上两次调用问题不大。

```jsx
class Demo extends React.Component{
	//展示左侧输入框的数据
	showData = ()=>{
		const {input1} = this
		alert(input1.value)
	}
	//展示右侧输入框的数据
	showData2 = ()=>{
		const {input2} = this
		alert(input2.value)
	}
	render(){
		return(
			<div>
				//ref 回调函数的参数，就是当前标签节点(input)对象。
				//所以，this.input1 = c 的意思是:
				//把指向自身节点对象的指针，放在了实例节点本身的input1属性上。
				<input ref={c => this.input1 = c } type="text" placeholder="点击按钮提示数据"/>&nbsp;
				<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
				<input onBlur={this.showData2} ref={c => this.input2 = c } type="text" placeholder="失去焦点提示数据"/>&nbsp;
			</div>
		)
	}
}

ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
```

### 3 最佳实践：createRef 形式

```jsx
class Demo extends React.Component{
/* 
 React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,
 该容器是“专人专用”的，也就是一个节点，就创建一个对应的createRef对象。
*/
	myRef = React.createRef()
	myRef2 = React.createRef()
	//展示左侧输入框的数据
	showData = ()=>{
		alert(this.myRef.current.value);
	}
	//展示右侧输入框的数据
	showData2 = ()=>{
		alert(this.myRef2.current.value);
	}
	render(){
		return(
    <div>
        <input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
        <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
        <input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
    </div>
		)
	}
}
//渲染组件到页面
ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
```



# 3 事件机制

react 中的事件机制是采用委托形式。事件被触发后，会通过冒泡，在最外层的 div 中触发。



## 3.1 非受控组件

在表单中，所有输入类的 DOM，“现用现取”，就是受控组件。也就是说在获取到用户输入的内容后，直接取出来使用，而不是进行传递（不会进行表单提交的跳转，不会跳转网页）。

```jsx
class Login extends React.Component{
	handleSubmit = (event)=>{
		event.preventDefault() //阻止表单提交
		const {username,password} = this
       	// 阻止提交，然后现取现用，采用 ajax 提交。
		alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
	}
	render(){
		return(
<form onSubmit={this.handleSubmit}>
	用户名：<input ref={c => this.username = c} type="text" name="username"/>
	密码：<input ref={c => this.password = c} type="password" name="password"/>
	<button>登录</button>
</form>
		)
	}
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```



## 3.2 受控组件

受控组件就是随着用户的输入，把输入的内容全部放入 state 状态中，这就是 “双向数据绑定”。

受控组件没有使用 ref，同时可以随时在 state 获取和使用用户输入的内容。



```jsx
class Login extends React.Component{
	//初始化状态
	state = {
		username:'', //用户名
		password:'' //密码
	}

	//保存用户名到状态中
	saveUsername = (event)=>{
		this.setState({username:event.target.value})
	}

	//保存密码到状态中
	savePassword = (event)=>{
		this.setState({password:event.target.value})
	}

	//表单提交的回调
	handleSubmit = (event)=>{
		event.preventDefault() //阻止表单提交
		const {username,password} = this.state
		alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
	}

	render(){
		return(
<form onSubmit={this.handleSubmit}>
	用户名：<input onChange={this.saveUsername} type="text" name="username"/>
	密码：<input onChange={this.savePassword} type="password" name="password"/>
	<button>登录</button>
</form>不     
		)
	}
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```



## 3.3 高阶函数 和 柯里化

### 1 高阶函数：

解决在事件回调函数中，不能传递参数的问题。因为回调函数应该是一个函数地址，而不是一个函数的调用，所以一定是 `func`，而不是 `func()`。

高阶函数：如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数。

1. 若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数。
2. 若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数。

常见的高阶函数有：`Promise`、`setTimeout`、`arr.map()` 等等

一个需要高阶函数应用的场景就是：为了提高效率，想让多个节点的事件触发都调用同一个回调函数。为了让回调函数区分究竟是哪一个节点触发的回调，此时需要在节点绑定回调函数的时候，传递一个识别自身的参数，这时就需要高阶函数出马了：

```jsx
//创建组件
class Login extends React.Component{
    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

//保存表单数据到状态中。
//调用该函数，返回真正的回调函数。形成了一个闭包，保存了传递过来的 'username'或'password'参数，用来识别究竟是谁调用的回调函数。
saveFormData = (dataType)=>{
    return (event)=>{
        this.setState({[dataType]:event.target.value})
    }
}

//表单提交的回调
handleSubmit = (event)=>{
    event.preventDefault() //阻止表单提交
    const {username,password} = this.state
    alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
}
render(){
    return(
<form onSubmit={this.handleSubmit}>
	用户名：<input onChange={this.saveFormData('username')} type="text" name="username"/>
	密码：<input onChange={this.saveFormData('password')} type="password" name="password"/>
	<button>登录</button>
</form>
    )
}
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```



### 2 函数的柯里化

通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。 

```js
function sum(a){
    return(b)=>{
        return (c)=>{
            return a+b+c
        }
    }
}
```

上文中，处理回调函数的方法也是一种柯里化：

在收到参数后，通过函数的层层嵌套，在最后 `return` 的时候统一处理。

```js
saveFormData = (dataType)=>{
    return (event)=>{
        this.setState({[dataType]:event.target.value})
    }
}
```



如果不使用柯里化：

```jsx
class Login extends React.Component{
    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

//保存表单数据到状态中
saveFormData = (dataType,event)=>{
    this.setState({[dataType]:event.target.value})
}

//表单提交的回调
handleSubmit = (event)=>{
    event.preventDefault() //阻止表单提交
    const {username,password} = this.state
    alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
}
	render(){
 	   return(
<form onSubmit={this.handleSubmit}>
    用户名：<input onChange={event => this.saveFormData('username',event) } type="text" name="username"/>
    密码：<input onChange={event => this.saveFormData('password',event) } type="password" name="password"/>
    <button>登录</button>
</form>
 	   )
	}
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```



# 4 生命周期

## 4.1 react 生命周期（旧）:

![react生命周期(旧)](React1/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F(%E6%97%A7).png)

常用的三个生命周期函数（**图中绿色的**）：

- `componentDidMount()`
  - 组件挂载完毕。
  - 一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
- `componentWillUnmount()`
  - 组件将要卸载。
  - 一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
- `render()`
  - 只要更新页面、就会有 `render()` 的调用。



### 1 初始化阶段：

由 `ReactDOM.render()` 触发 ------> **初次渲染**

1. `constructor()`，就是类中定义的构造函数，经常会被省略。
2. `componentWillMount()`，组件将要挂载。
3. `render()`，渲染页面。
4. `componentDidMount()` ，组件挂载完毕。=====> **常用**



### 2 更新阶段：

根据触发条件的不同，组件更新有三种情况：

1. 最常见，通过组件内部的 `this.setState()` 触发组件更新；
2. 通过调用 `forceUpdate()` 强制组件更新，使用的较少，比如没有更改任何组件中状态的数据，强制更新一次时使用。
3. 当父组件调用 `render()` 时，会触发子组件的更新，其中有可能会产生父子组件间的通信；



情况一：通过内部的 `this.setState()` 更新组件：

1. `shouldComponentUpdate()`，组件是否应该被更新，是一个 **“门闩”**。
   - 如果这个函数返回 `true`，组件可以正常被更新；
   - 如果这个函数返回 `false`，组件会被阻止更新，停止接下来的流程。
2. `componentWillUpdate()`，组件将要更新。
3. `render()`   =====>   **一定会调用**
4. `componentDidUpdate(preProps, preState)` 组件更新完毕。
   - `preProps`：更新之前的 props；
   - `preState`：更新之前的 state。



情况二：通过调用 `forceUpdate()` 强制组件更新，没有正常更新流程中的 **“门闩”**：

1. `componentWillUpdate()`，组件将要更新。
2. `render()`   =====>   **一定会调用**
3. `componentDidUpdate(preProps, preState)` 组件更新完毕。
   - `preProps`：更新之前的 props；
   - `preState`：更新之前的 state。



情况三：当父组件调用 `render()` 时，子组件也要更新：

1. `componentwillReceiveProps(props)`，组件将要接收（父组件传递的 ）props 参数。
   - **注意！！，第一次传递 props 时，不会触发该函数调用**；
   - 在父组件向子组件传递 **新的** props 时才会调用。
   - 可以携带参数，参数就是传递的 props。
2. `shouldComponentUpdate()`，组件是否应该被更新，是一个 **“门闩”**。
   - 如果这个函数返回 `true`，组件可以正常被更新；
   - 如果这个函数返回 `false`，组件会被阻止更新，停止接下来的流程。
3. `componentWillUpdate(preProps, preState)`，组件将要更新。
4. `render()`   =====>   **一定会调用**
5. `componentDidUpdate(preProps, preState)` 组件更新完毕。
   - `preProps`：更新之前的 props；
   - `preState`：更新之前的 state。



### 3 卸载组件：

由 `ReactDOM.unmountComponentAtNode()` 触发

1. `componentWillUnmount()` =====> **常用**，组件将要卸载。
   - 一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息



## 4.2 react 生命周期（旧）:

react 生命周期（新）

![react生命周期(新)](React1/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F(%E6%96%B0).png)

与旧生命周期的对比：

少了 3 个函数：

- `componentWillMount()`，组件即将挂载。
- `componentWillReceiveProps()`，组件接收父组件新的 props。
- `componentWillUpdate()`，组面即将更新。

多了 2 个函数：

- `getDerivedStateFromProps()`
- `getSnapshotBeforeUpdate()`



这两个函数的使用场景非常罕见，更多的是下面三个（和旧生命周期一样），图中绿色的函数：

- `componentDidMount()`
  - 组件挂载完毕。
  - 一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
- `componentWillUnmount()`
  - 组件将要卸载。
  - 一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
- `render()`
  - 只要更新页面、就会有 `render()` 的调用。



### 1 组件挂载时：

1. `consructor()`，调用组件的构造函数。

2. `static getDerivedStateFromProps(props, state)`，从 props 中得到一个派生的 state。换句话说，组件可以通过传递过来的 props，去修改组件中的 state。

   - 必须添加为一个静态方法，添加在类的原型中。

   - 该方法应该返回一个状态 state 对象，或者 `null`。

   - 该方法可以添加参数 props 和 state。

     - **此方法适用于一个罕见的用例，即 state  的值在任何时候都取决于 props。**

     - `props` 传递的是一个对象，里面保存了 `K/V` 对。可以直接返回并把 `state` 更新。

       ```jsx
       static getDerivedStateFromProps(props, state) {
           console.log('getDerivedStateFromProps', props, state)
           return props
       }
       ```

3. `render()`，渲染页面。

4. `componentDidUpdate(preProps, preState, snapshotValue)` 组件更新完毕。

   - `preProps`：更新之前的 props；
   - `preState`：更新之前的 state；
   - `snapshotValue`：`getSnapshotBeforeUpdate()`  快照函数的返回值。



### 2 组件更新时：

当有以下三种情况：

- 传递新 props（比如父子组件间通信）、
- 执行 `setState()`、 
- 执行 `forceUpdate()` 强制更新时；

1. `static getDerivedStateFromProps(props, state)` ，从 props 中得到一个派生的 state。详细信息见上面👆。

2. `shouldComponentUpdate()` ，一个门闩，确定是否要更新。

3. `render()`，调用渲染程序，但是还没更新 React 的 DOM。

4. `getSnapshotBeforeUpdate()` ，在组件从 DOM 中捕获一些信息（例如，滚动位置）。

   - 此生命周期的任何返回值将作为参数传递给 `componentDidUpdate()`。

   - **必须要返回一个状态对象（一个快照值），或者 `null`；**

5. `componentDidUpdate(preProps, preState, snapshotValue)` 组件更新完毕。

   - `preProps`：更新之前的 props；
   - `preState`：更新之前的 state；
   - `snapshotValue`：`getSnapshotBeforeUpdate()`  快照函数的返回值。



### 3 卸载组件：

由 `ReactDOM.unmountComponentAtNode()` 触发

1. `componentWillUnmount()` =====> **常用**，组件将要卸载。
   - 一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息。





# 5 DOM的Diffing算法

![在这里插入图片描述](React1/96b5367055a04b8fbbb1e11363883f31tplv-k3u1fbpfcp-watermark.awebp)

会一层一层的分析和对比，只要某个节点的内部还有嵌套的节点，就会一层一层的往下对比。



## 5.2 关于key的经典面试题

1. react/vue中的key有什么作用？（key的内部原理是什么？）
2. 为什么遍历列表时，key最好不要用index?

### 5.2.11 虚拟DOM中key的作用

- 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。
- 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】, 随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：
  - 旧虚拟DOM中找到了与新虚拟DOM相同的key：
    - 若虚拟DOM中内容没变, 直接使用之前的真实DOM
    - 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
  - 旧虚拟DOM中未找到与新虚拟DOM相同的key
    - 根据数据创建新的真实DOM，随后渲染到到页面

### 5.2.2 用 index 作为 key 可能会引发的问题

**情况1：**

若对数据进行：**逆序添加、逆序删除等破坏顺序操作**，就会导致产生没有必要的真实 DOM 更新。

这是因为如果破坏了顺序，虽然新旧虚拟 DOM 中拥有相同 index 名称的节点，但是其内容因为顺讯被破坏了关系，已经完全不一样了，这导致所有内容需要全部重新渲染。

- 最终结果：界面效果没问题, 但效率低。



**情况2：**

如果结构中还包含输入类的 DOM：会产生错误 DOM 更新。

- 最终结果：界面会发生问题。



比如下面的这个例子，如果在这列信息的开头，添加一个新的信息。在列表的 index 使用了默认索引值作为 key。在初次渲染后，添加了新项目 “小王”。

1. `Diffing` 算法通过对比，发现第一行虽然 key 都为 `0`，在 `text` 文本已经不对，所以文本内容 `小张--18` 会重新渲染。
2. 然后 `Diffing` 算法发现一个 li 标签内部还有一个 `input` 用户输入框，所以进行第二次对比。通过比较 `<input type="text">` 发现两者完全相同，所以新旧虚拟 DOM 没有发生更新。
3. 但是，在虚拟 DOM 最终渲染为真实 DOM 的时候，因为用户输入的值不同（表现在 input 节点的  `.value` 属性 ），就会发生错位现象。

- 只有真实 DOM，摆在了页面上，才会有用户输入，才会有 `.value` 值。虚拟 DOM 的属性非常少，也没有 `value` 属性。

```jsx
// 更新前的数据：
<li key=0>小张--18<input type="text" /></li>
<li key=1>小里--19<input type="text" /></li>

// 更新后的数据：
<li key=0>小王--20<input type="text" /></li>
<li key=1>小张--18<input type="text" /></li>
<li key=2>小里--19<input type="text" /></li>
```

下图是使用 索引值 和使用 数据的唯一标识，在更新小王时前后的不同效果。

可以看到，如果使用索引值，就会发生 `text` 文本正确更新，但是 `input` 标签没有更新的问题，这绥中导致了 `input` 标签的现实错位。``

 ![image-20211011222739017](React1/image-20211011222739017.png)  ![image-20211011222759090](React1/image-20211011222759090.png)

**注意！** 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用 index 作为 key 是没有问题的。



### 5.2.3 开发中如何选择 key?

1. 最好使用每条数据的唯一标识作为 key，比如 id、手机号、身份证号、学号等唯一值；
2. 如果确定只是简单的展示数据，用 index 也是可以的。

这种现象也佐证了为什么数据库，一定要有 **主键** 的原因之一。

如果实在没有可以唯一标识的选项，可以两个属性加起来，比如 `name + phoneNumber`。



