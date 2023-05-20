import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { PlayerListWrapper } from './style';
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store';
import { formatMinuteSecond } from '@/utils/format-utils';
import { fetchCurrentSongAction } from '@/views/player/store/player';

interface IProps {
  children?: ReactNode;
}

const PlayerList: FC<IProps> = (): JSX.Element => {
  const { playList, playSongIndex } = useAppSelector(
    (state) => ({
      playList: state.player.playSongList,
      playSongIndex: state.player.playSongIndex
    }),
    shallowEqualApp
  );

  const dispatch = useAppDispatch();

  /** 列表中切换歌曲 */
  function changeListSong(item: any) {
    dispatch(fetchCurrentSongAction(item.id));
  }

  return (
    <PlayerListWrapper>
      {
        // classnames:可以给元素动态添加 class 类名，
        // 如果属性值为true则为其添加该类名;如果值为false，则不添加。
        playList.map((item, index) => {
          return (
            <div
              key={item.id}
              // 动态添加 play-item，如果 playSongIndex==index
              className={'play-item' + (playSongIndex === index ? ' active' : '')}
              onClick={(e) => changeListSong(item)}
            >
              <div className="left">{item.name}</div>
              <div className="right">
                <span className="singer text-nowrap">{item.ar[0].name}</span>
                <span className="duration">{formatMinuteSecond(item.dt)}</span>
                <span className="sprite_playlist link"></span>
              </div>
            </div>
          );
        })
      }
    </PlayerListWrapper>
  );
};

export default memo(PlayerList);
