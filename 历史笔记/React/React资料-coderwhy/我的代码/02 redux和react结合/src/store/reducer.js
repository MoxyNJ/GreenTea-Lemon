//对reducer进行拆分

import {
  ADD_NUMBER,
  SUB_NUMBER,
  DECREMENT,
  INCREMENT,
  CHANGE_BANNERS,
  CHANGE_RECOMMEND,
} from "./constant.js";

// 拆分 counterReducer
const initialCounterState = {
  counter: 0,
};
function counterReducer(state = initialCounterState, action) {
  switch (action.type) {
    case ADD_NUMBER:
      return { ...state, counter: state.counter + action.num };
    case SUB_NUMBER:
      return { ...state, counter: state.counter - action.num };
    case DECREMENT:
      return { ...state, counter: state.counter - 1 };
    case INCREMENT:
      return { ...state, counter: state.counter + 1 };
    default:
      return state;
  }
}

// 拆分 homeReducer
const initialHomeState = {
  banners: [],
  recommends: [],
};
function homeReducer(state = initialHomeState, action) {
  switch (action.type) {
    case CHANGE_BANNERS:
      return { ...state, banners: action.banners };
    case CHANGE_RECOMMEND:
      return { ...state, recommends: action.recommends };
    default:
      return state;
  }
}

function reducer(state = {}, action) {
  return {
    counterInfo: counterReducer(state.counterInfo, action),
    homeInfo: homeReducer(state.homeInfo, action),
  };
}

export default reducer;
