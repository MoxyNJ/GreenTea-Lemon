import React, { useState, useMemo, memo } from "react";

const HYInfo = memo((props) => {
  console.log("HYInfo重新渲染");
  return (
    <div>
      <h2>姓名：{props.info.name}</h2>
      <h2>年龄：{props.info.age}</h2>
    </div>
  );
});

export default function MemoHookDemo022() {
  console.log("MemoHookDemo02渲染");
  const [show, setShow] = useState(true);

  const info = useMemo(() => {
    return { name: "why", age: 18 };
  }, []);

  return (
    <div>
      <HYInfo info={info} />
      <button onClick={(e) => setShow(!show)}>show切换</button>
    </div>
  );
}
