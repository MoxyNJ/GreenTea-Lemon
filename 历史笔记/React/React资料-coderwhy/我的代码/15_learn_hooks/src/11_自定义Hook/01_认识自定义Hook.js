import React, { useEffect } from "react";

export default function CustomHookLifeDemo01() {
  useEffect(() => {
    console.log("CustomHookLifeDemo01组件被创建了");
    return () => {
      console.log("CustomHookLifeDemo01组件被销毁了");
    };
  }, []);

  return (
    <div>
      <h2>CustomHookLifeDemo01</h2>
    </div>
  );
}
