import React, { useState, useCallback } from "react";

export default function CallbackHookDemo01() {
  const [count, setcount] = useState(0);

  const increment1 = () => {
    console.log("执行increment1函数");
    setcount(count + 1);
  };

  const increment2 = useCallback(() => {
    console.log("执行increment2函数");
    setcount(count + 1);
  }, [count]);

  return (
    <div>
      <h2>CallbackHookDemo01</h2>
      <button onClick={increment1}> +1 </button>
      <button onClick={increment2}> +1 </button>
      <h2>{count}</h2>
    </div>
  );
}
