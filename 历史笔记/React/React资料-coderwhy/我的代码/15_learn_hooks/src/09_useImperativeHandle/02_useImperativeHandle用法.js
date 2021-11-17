import React, { useRef, forwardRef, useImperativeHandle } from "react";

const HYInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      console.log("useImperativeHandle中回调函数返回的对象的focus");
      inputRef.current.focus();
    },
  }));

  return <input ref={inputRef} type="text" />;
});

export default function UseImperativeHandleDemo() {
  const inputRef = useRef();

  return (
    <div>
      <HYInput ref={inputRef} />
      <button onClick={(e) => inputRef.current.focus()}>聚焦</button>
    </div>
  );
}
