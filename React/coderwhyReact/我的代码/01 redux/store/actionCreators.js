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
import { ADD_NUMBER, SUB_NUMBER, DECREMENT, INCREMENT } from "./constant.js";

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
