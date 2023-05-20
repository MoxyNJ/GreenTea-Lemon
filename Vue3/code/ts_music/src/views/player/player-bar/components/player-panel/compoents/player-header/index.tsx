import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style';
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store';

interface IProps {
  children?: ReactNode;
}

const PlayerHeader: FC<IProps> = (): JSX.Element => {
  const { playList, currentSong } = useAppSelector(
    (state) => ({
      playList: state.player.playSongList,
      currentSong: state.player.currentSong
    }),
    shallowEqualApp
  );

  return (
    <HeaderWrapper>
      <HeaderLeft>
        <h3>播放列表({playList.length})</h3>
        <div className="operator">
          <button>
            <i className="sprite_playlist icon favor"></i>
            收藏全部
          </button>
          <button>
            <i className="sprite_playlist icon remove"></i>
            清除
          </button>
        </div>
      </HeaderLeft>
      <HeaderRight>{currentSong.name}</HeaderRight>
    </HeaderWrapper>
  );
};

export default memo(PlayerHeader);
