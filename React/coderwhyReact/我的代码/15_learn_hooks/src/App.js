import React, { createContext } from "react";
import CounterClass from "./01_体验hooks/01_counter-class";
import CounterHookOrg from "./01_体验hooks/02_counter-hook";
import CounterHook from "./01_体验hooks/03_counter-hook";
import MultiHookState from "./02_useState使用/01_多个状态的使用";
import ComplexHookState from "./02_useState使用/02_复杂状态的修改";
import ClassCounterTitleChange from "./03_useEffect使用/01_class实现title的修改";
import HookCounterTitleChange from "./03_useEffect使用/02_hook实现title的修改";
import ContextHook from "./04_useCntext使用/useContext使用";
import Home from "./05_useReducer使用/home";

export const UserContext = createContext();
export const ThemeContext = createContext();

export default function App() {
  return (
    <div>
      {/* 1. hook初体验 */}
      {/* <CounterClass /> */}
      {/* <CounterHookOrg /> */}
      {/* <CounterHook /> */}

      {/* 2. setState Hook 使用 */}
      {/* <MultiHookState /> */}
      {/* <ComplexHookState /> */}

      {/* 3. effect Hook  使用*/}
      {/* <ClassCounterTitleChange /> */}
      {/* <HookCounterTitleChange /> */}

      {/* 4. context Hook 使用 */}
      <UserContext.Provider value={{ name: "Moxy", age: 18 }}>
        <ThemeContext.Provider value={{ fontsize: "30px", color: "red" }}>
          <ContextHook />
        </ThemeContext.Provider>
      </UserContext.Provider>

      {/* 5. reucer Hook 使用 */}
      <Home />
    </div>
  );
}
