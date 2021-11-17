// rpc 快速创建模板
import React, { PureComponent } from "react";

// 引入 react-redux解决conntect和context
// 引入 axios异步申请网络
import { connect } from "react-redux";

import axios from "axios";

import {
  inAction,
  addAction,
  changeBannersAction,
  changeRecommendAction,
} from "../store/actionCreators";

class Home extends PureComponent {
  componentDidMount() {
    axios({
      url: "http://123.207.32.32:8000/home/multidata",
    }).then((res) => {
      const data = res.data.data;
      // console.log("轮播图：", data.banner.list);
      // console.log("推荐：", data.recommend.list);
      this.props.changeBanners(data.banner.list);
      this.props.changeRecommends(data.recommend.list);
    });
  }

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
  changeBanners(banner) {
    dispatch(changeBannersAction(banner));
  },
  changeRecommends(recommend) {
    dispatch(changeRecommendAction(recommend));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
