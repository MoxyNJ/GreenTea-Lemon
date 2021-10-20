//1.导入 redux（不能通过 ES6 方式导入，node 有些版本不支持 ES6）
// commonjs 一种实现 -> node.js 导入
const redux = require("redux");

//定义一个初始化数据
const initialState = {
  counter: 0,
};

//[1]reducer
// 第一次使用，state 为 undefined，会使用默认的初始值 initialState
function reducer(state = initialState, action) {
  //不要对原state进行操作，而是拷贝一份后操作，返回新state。
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    case "ADD_NUMBER":
      return { ...state, counter: state.counter + action.num };
    case "SUB_NUMBER":
      return { ...state, counter: state.counter - action.num };
    default:
      return state;
  }
}

//[2]store（创建的时候需要传入一个reducer）
const store = redux.createStore(reducer); //创建一个store，用来放数据

//订阅store的修改
//只要store中的state发生变化，就会调用该函数
store.subscribe(() => {
  // 通过store.getState()获取store中存储的state
  console.log("state发生了改变,counter:", store.getState().counter);
});

//[3]acitons
//action1/2：数字加1/减1
const action1 = { type: "INCREMENT" };
const action2 = { type: "DECREMENT" };
//action3/4，数字加5/减12
const action3 = { type: "ADD_NUMBER", num: 5 };
const action4 = { type: "SUB_NUMBER", num: 12 };

//派发action, store实际会调用reducer，然后执行相应的数据操作
store.dispatch(action1);
store.dispatch(action2);
store.dispatch(action3);
store.dispatch(action4);
