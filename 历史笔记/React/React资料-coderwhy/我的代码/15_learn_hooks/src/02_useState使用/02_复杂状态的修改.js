import React, { useState } from "react";

export default function ComplexHookState() {
  const [friends, setFriends] = useState(["Moxy", "Ninjee"]);

  return (
    <div>
      <h2>好友列表</h2>
      <ul>
        {friends.map((item, index) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <button
        onClick={(e) => {
          setFriends([...friends, "小明"]);
        }}
      >
        添加朋友
      </button>
    </div>
  );
}
