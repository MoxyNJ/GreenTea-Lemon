import React, { createContext, useState } from "react";
import CounterClass from "./01_体验hooks/01_counter-class";
import CounterHookOrg from "./01_体验hooks/02_counter-hook";
import CounterHook from "./01_体验hooks/03_counter-hook";
import MultiHookState from "./02_useState使用/01_多个状态的使用";
import ComplexHookState from "./02_useState使用/02_复杂状态的修改";
import ClassCounterTitleChange from "./03_useEffect使用/01_class实现title的修改";
import HookCounterTitleChange from "./03_useEffect使用/02_hook实现title的修改";
import ContextHook from "./04_useCntext使用/useContext使用";
import Home from "./05_useReducer使用/home";
import CallbackHookDemo01 from "./06_useCallback使用/01_useCallback进行性能优化";
import CallbackHookDemo02 from "./06_useCallback使用/01_useCallback进行性能优化";
import MemoHookDemo012 from "./07_useMemo使用/01_useMemo复杂计算的使用-解决";
import MemoHookDemo011 from "./07_useMemo使用/01_useMemo复杂计算的使用-问题";
import MemoHookDemo022 from "./07_useMemo使用/02_useMemo传入子组件应用类型-解决";
import MemoHookDemo021 from "./07_useMemo使用/02_useMemo传入子组件应用类型-问题 copy";
import RefHookDemo01 from "./08_useRef使用/01_useRef引用DOM";
import RefHookDemo02 from "./08_useRef使用/02_useRef引用其他数据";
import ForwardRefDemo from "./09_useImperativeHandle/01_回顾forwardRef的用法";
import UseImperativeHandleDemo from "./09_useImperativeHandle/02_useImperativeHandle用法";
import LayoutEffectCounterDemo from "./10_useLayoutEffect使用/01_useEffect的count修改";
import EffectCounterDemo from "./10_useLayoutEffect使用/01_useEffect的count修改";
import CustomHookLifeDemo01 from "./11_自定义Hook/01_认识自定义Hook";

export const UserContext = createContext();
export const ThemeContext = createContext();

export default function App() {
  const [show, setShow] = useState(true);
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
      {/* <UserContext.Provider value={{ name: "Moxy", age: 18 }}>
        <ThemeContext.Provider value={{ fontsize: "30px", color: "red" }}>
          <ContextHook />
        </ThemeContext.Provider>
      </UserContext.Provider> */}

      {/* 5. reducer Hook 使用 */}
      {/* <Home /> */}

      {/* 6. Callback Hook 使用 */}
      {/* <CallbackHookDemo01 /> */}
      {/* <CallbackHookDemo02 /> */}

      {/* 7. Memo Hook 使用 */}
      {/* <MemoHookDemo011 /> */}
      {/* <MemoHookDemo012 /> */}
      {/* <MemoHookDemo021 /> */}
      {/* <MemoHookDemo022 /> */}

      {/* 8. Ref Hook 使用 */}
      {/* <RefHookDemo01 /> */}
      {/* <RefHookDemo02 /> */}

      {/* 9. useImperativeHandle Hook 使用 */}
      {/* <ForwardRefDemo /> */}
      {/* <UseImperativeHandleDemo /> */}

      {/* 10. useLayoutEffect 使用 */}
      {/* <EffectCounterDemo /> */}
      {/* <LayoutEffectCounterDemo /> */}

      {/* 11. 自定义 Hook */}
      {show && <CustomHookLifeDemo01 />}

      <button
        onClick={(e) => {
          setShow(!show);
        }}
      >
        切换
      </button>
    </div>
  );
}
