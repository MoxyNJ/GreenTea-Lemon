// rpc 快速创建模板
import React, { PureComponent } from "react";
import store from "../store";
import { subAction } from "../store/actionCreators";

export default class About extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: store.getState().counter,
    };
  }

  // 订阅 store 的数据监听
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        counter: store.getState().counter,
      });
    });
  }

  // 取消订阅 store 的数据监听
  // store.subscribe的返回值是一个函数，只要执行就会取消订阅。
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <hr />
        <h1>About</h1>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={(e) => this.decreament()}> -1 </button>
        <button onClick={(e) => this.subNumber(5)}> -5 </button>
      </div>
    );
  }

  decreament() {
    store.dispatch(subAction(1));
  }
  subNumber(num) {
    store.dispatch(subAction(num));
  }
}
