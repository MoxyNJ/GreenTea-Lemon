import React, { useState } from "react";

export default function CounterHook() {
  /**
    Hook:useState
    - 本身是一个函数，来自react包
    - 参数和返回值
     1. 参数：作用是给创建出来的state状态一个默认值。
     2. 返回:一个数组，包含两个成员：当前状态state对象+操作状态的函数
   */

  //1 传统用法
  const arr = useState(0);
  const state = arr[0];
  const setState = arr[1];

  return (
    <div>
      <h1>当前计数：{state}</h1>
      <button onClick={(e) => setState(state + 1)}> +1 </button>
      <button onClick={(e) => setState(state - 1)}> -1 </button>
    </div>
  );
}
