import React, { PureComponent } from "react";

export default class ClassCounterTitleChange extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  componentDidMount() {
    document.title = `当前计数：${this.state.counter}`;
  }

  componentDidUpdate() {
    document.title = `当前计数：${this.state.counter}`;
  }

  render() {
    const { counter } = this.state;
    return (
      <div>
        <h2>当前计数：{counter}</h2>
        <button onClick={(e) => this.setState({ counter: counter + 1 })}>
          +1
        </button>
      </div>
    );
  }
}
