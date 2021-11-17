import React, { useState, useCallback, memo } from "react";

// 创建一个子组件
const HYButton = memo((props) => {
  console.log("HYButton重新渲染：" + props.title);
  return <button onClick={props.increment}> {props.title}:HYButton +1 </button>;
});

export default function CallbackHookDemo02() {
  console.log("CallbackHookDemo02 重新渲染");

  const [count, setcount] = useState(0);
  const [show, setShow] = useState(true);

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
      {/* <button onClick={increment1}> +1 </button>
      <button onClick={increment2}> +1 </button> */}
      <HYButton title="btn1" increment={increment1} />
      <HYButton title="btn2" increment={increment2} />

      <h2>{count}</h2>
      <button onClick={(e) => setShow(!show)}>show切换</button>
    </div>
  );
}
