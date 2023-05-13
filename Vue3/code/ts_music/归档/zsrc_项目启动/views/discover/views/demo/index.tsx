// 范例：Class Component + TypeScript
import React, { PureComponent } from 'react';
/**
 * state:
 * props:
 */

interface IProps {
  name: string;
  age?: number;
}

interface IState {
  message: string;
  counter: number;
}

// Component 传递两个范型，分别为props和state的类型约束
class Demo extends PureComponent<IProps, IState> {
  // state语法糖，受IState类型约束
  state = {
    message: 'Helo Ninjee',
    counter: 100
  };

  // constructor(props: IProps) {
  // props语法糖，如果constructor中仅有super，无需定义，react会自动调用
  //   super(props);

  //   this.state = {
  //     message: 'Helo Ninjee',
  //     counter: 100
  //   };
  // }

  render(): React.ReactNode {
    return (
      <div>
        <br></br>
        <div>===Demo Class Componemt===</div>
        <div>name: {this.props.name}</div>
        <div>age: {this.props.age ?? 18}</div>
        <div>message: {this.state.message}</div>
        <div>counter: {this.state.counter}</div>
        <div>====================</div>
        <br></br>
      </div>
    );
  }
}

export default Demo;
