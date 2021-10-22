import React from "react";
import CounterClass from "./01_体验hooks/01_counter-class";
import CounterHookOrg from "./01_体验hooks/02_counter-hook";
import CounterHook from "./01_体验hooks/03_counter-hook";
import MultiHookState from "./02_useState使用/01_多个状态的使用";
import ComplexHookState from "./02_useState使用/02_复杂状态的修改";

export default function App() {
  return (
    <div>
      {/* <CounterClass /> */}
      {/* <CounterHookOrg /> */}
      {/* <CounterHook /> */}
      {/* <MultiHookState /> */}
      <ComplexHookState />
    </div>
  );
}
