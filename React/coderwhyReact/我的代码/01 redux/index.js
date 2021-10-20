import store from "./store/index.js";
import {
  addAction,
  subAction,
  inAction,
  deAction,
} from "./store/actionCreators.js";

// 监听
store.subscribe(() => {
  console.log(store.getState());
});

// 派发
store.dispatch(addAction(10));
store.dispatch(addAction(15));
store.dispatch(subAction(8));
store.dispatch(subAction(5));
store.dispatch(inAction());
store.dispatch(deAction());
