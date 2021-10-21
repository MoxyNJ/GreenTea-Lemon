// 手动自定义 conntect和context
import React, { PureComponent } from "react";
import { connect } from "../utils/connect-copy";
import { inAction, addAction } from "../store/actionCreators";

class Home extends PureComponent {
  render() {
    return (
      <div>
        <hr />
        <h1>Home</h1>
        <h2>当前计数: {this.props.counter}</h2>
        <button onClick={(e) => this.props.increment()}> +1 </button>
        <button onClick={(e) => this.props.addNumber(5)}> +5 </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
  increment() {
    dispatch(inAction());
  },
  addNumber(num) {
    dispatch(addAction(num));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
