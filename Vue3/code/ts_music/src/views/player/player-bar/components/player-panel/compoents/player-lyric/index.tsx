import React, { memo, useEffect, useRef } from 'react';
import type { FC, ReactNode } from 'react';
import { PlayerLyricWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const PlayerLyric: FC<IProps> = (): JSX.Element => {
  // react hooks
  const lyricRef = useRef();
  // useEffect(() => {
  //   if (currentLyricIndex > 0 && currentLyricIndex < 3) return;
  //   scrollTo(lyricRef.current, (currentLyricIndex - 3) * 32, 300);
  // }, [currentLyricIndex]);

  return (
    <PlayerLyricWrapper>
      {/* <PlayerLyricWrapper ref={lyricRef}>
      <div className="lrc-content">
        {lyricList.map((item, index) => {
          return (
            <div
              key={item.time}
              className={classNames('lrc-item', {
                active: index === currentLyricIndex
              })}
            >
              {item.content}
            </div>
          );
        })}
      </div> */}
    </PlayerLyricWrapper>
  );
};

export default memo(PlayerLyric);
