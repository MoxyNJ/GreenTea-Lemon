import React, { useRef } from "react";

export default function RefHookDemo01() {
  const titleRef = useRef();
  const inputRef = useRef();

  function changeDOM() {
    titleRef.current.innerHTML = "Hello World";
    inputRef.current.focus();
  }

  return (
    <div>
      <h2 ref={titleRef}>RefHoolDemo01</h2>
      <input ref={inputRef} type="text" />
      <button onClick={(e) => changeDOM()}>修改DOM</button>
    </div>
  );
}
