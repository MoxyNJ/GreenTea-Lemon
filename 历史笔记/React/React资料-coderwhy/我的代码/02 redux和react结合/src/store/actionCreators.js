/* 方法一：最工整写法
export function addAction(num) {
  return {
    type: "ADD_NUMBER",
    num,
  };
}
*/

/* 方法二：用箭头函数更简洁
export const addAction = (num) => {
  return {
    type: "ADD_NUMBER",
    num,
  };
};
*/

//方法三:箭头函数中直接返回一个对象，使用简写:省略return，添加小括号
import axios from "axios";

import {
  ADD_NUMBER,
  SUB_NUMBER,
  DECREMENT,
  INCREMENT,
  CHANGE_BANNERS,
  CHANGE_RECOMMEND,
} from "./constant.js";

export const addAction = (num) => ({
  type: ADD_NUMBER,
  num,
});

export const subAction = (num) => ({
  type: SUB_NUMBER,
  num,
});

export const deAction = () => ({
  type: DECREMENT,
});

export const inAction = () => ({
  type: INCREMENT,
});

// 轮播图和推荐的action
export const changeBannersAction = (banners) => ({
  type: CHANGE_BANNERS,
  banners,
});

export const changeRecommendAction = (recommends) => ({
  type: CHANGE_RECOMMEND,
  recommends,
});

// redux-thunk中定义的action函数
export const getHomeMultidataAction = (dispatch, getState) => {
  // console.log("action函数中", dispatch);
  axios({
    url: "http://123.207.32.32:8000/home/multidata",
  }).then((res) => {
    const data = res.data.data;
    dispatch(changeBannersAction(data.banner.list));
    dispatch(changeRecommendAction(data.recommend.list));
  });
};
