import React, { memo, useEffect, useRef } from 'react';
import type { FC, ReactNode } from 'react';
import { PlayerLyricWrapper } from './style';
import { shallowEqualApp, useAppSelector } from '@/store';
import { scrollTo } from '@/utils/ui-helper';

interface IProps {
  children?: ReactNode;
}

const PlayerLyric: FC<IProps> = (): JSX.Element => {
  const lyricRef = useRef<HTMLDivElement>(null);

  const { lyricList, currentLyricIndex } = useAppSelector(
    (state) => ({
      lyricList: state.player.lyrics,
      currentLyricIndex: state.player.lyricIndex
    }),
    shallowEqualApp
  );

  useEffect(() => {
    if (currentLyricIndex > 0 && currentLyricIndex < 3) return;
    scrollTo(lyricRef.current, (currentLyricIndex - 3) * 32, 300);
  }, [currentLyricIndex]);

  return (
    <PlayerLyricWrapper ref={lyricRef}>
      <div className="lrc-content">
        {lyricList.map((item, index) => {
          return (
            <div
              key={item.time}
              className={'lrc-item' + (index === currentLyricIndex ? ' active' : '')}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </PlayerLyricWrapper>
  );
};

export default memo(PlayerLyric);
