import React, { useState } from "react";

// calcNumber在每次点击 show切换的时候都被执行，影响性能。
export default function MemoHookDemo011() {
  const [count, setCount] = useState(10);
  const [show, setShow] = useState(true);

  function calcNumber(count) {
    console.log("执行了clcNumber");
    let total = 0;
    for (let i = 1; i <= count; i++) {
      total += i;
    }
    return total;
  }

  return (
    <div>
      <h2>计算数字的和：{calcNumber(count)}</h2>
      <button onClick={(e) => setCount(count + 1)}> +1 </button>
      <button onClick={(e) => setShow(!show)}>show切换</button>
    </div>
  );
}
