import React, { useState, useEffect } from "react";

export default function HookCounterTitleChange() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.title = `计数：${counter}`;
  });

  return (
    <div>
      <h2>当前计数：{counter}</h2>
      <button onClick={(e) => setCounter(counter + 1)}>+1</button>
    </div>
  );
}
