import React, { useState } from "react";

export default function CounterHook() {
  //2 解构赋值
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>当前计数：{count}</h1>
      <button onClick={(e) => setCount(count + 1)}> +1 </button>
      <button onClick={(e) => setCount(count - 1)}> -1 </button>
    </div>
  );
}
