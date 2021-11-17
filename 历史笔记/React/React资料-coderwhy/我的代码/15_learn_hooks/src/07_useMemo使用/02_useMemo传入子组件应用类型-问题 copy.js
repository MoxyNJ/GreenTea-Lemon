import React, { useState, memo } from "react";

const HYInfo = memo((props) => {
  console.log("HYInfo重新渲染");
  return (
    <div>
      <h2>姓名：{props.info.name}</h2>
      <h2>年龄：{props.info.age}</h2>
    </div>
  );
});

export default function MemoHookDemo021() {
  console.log("MemoHookDemo02渲染");
  const info = { name: "Moxy", age: 18 };
  const [show, setShow] = useState(true);

  return (
    <div>
      <HYInfo info={info} />
      <button onClick={(e) => setShow(!show)}>show切换</button>
    </div>
  );
}
