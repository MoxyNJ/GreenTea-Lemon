import React, { memo, useRef, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import classNames from "classnames";

import { scrollTo } from "@/utils/ui-helper";

import { PannelWrapper } from "./style";

export default memo(function HYLyricPanel() {
  const { currentLyrics, currentLyricIndex } = useSelector(
    (state) => ({
      currentLyrics: state.getIn(["player", "currentLyrics"]),
      currentLyricIndex: state.getIn(["player", "currentLyricIndex"]),
    }),
    shallowEqual
  );

  // other hooks
  const panelRef = useRef();
  useEffect(() => {
    if (currentLyricIndex > 0 && currentLyricIndex < 3) return;
    // 当currentLyricIndex发生变化时，就应当滚动一次歌词，高亮currentLyricIndex。
    // -3：歌词、作者不需要高亮，第一行应该是歌词
    // 传递：当前元素、滚动的长度（歌词数 * 32px高）、
    scrollTo(panelRef.current, (currentLyricIndex - 3) * 32, 300);
  }, [currentLyricIndex]);

  return (
    <PannelWrapper ref={panelRef}>
      <div className="lrc-content">
        {currentLyrics.map((item, index) => {
          return (
            <div
              key={item.time}
              className={classNames("lrc-item", {
                active: index === currentLyricIndex,
              })}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </PannelWrapper>
  );
});
