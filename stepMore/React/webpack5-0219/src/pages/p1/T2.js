import React, { Component } from 'react';

export default class t2 extends Component {
  state = {
    counter: 0,
    heigher: 10,
  };

  componentDidMount() {
    this.setState({ counter: this.state.counter + 1 });
    console.log('counter:', this.state.counter)
    this.setState({ heigher: this.state.heigher - 1 });
    console.log('heigher: ', this.state.heigher)
  }

  render() {
    console.log('render')
    return (
      <div>
        <h3>t2</h3>
        counter: {this.state.counter}
        <br></br>
        heigher: {this.state.heigher}
        <div>
          <button
            onClick={() => this.setState({ counter: this.state.counter + 1 })}>
            点我 + 1
          </button>
        </div>
      </div>
    );
  }
}
