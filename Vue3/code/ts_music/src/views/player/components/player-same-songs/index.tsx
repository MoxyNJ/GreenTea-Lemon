import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { PlayerSameSongsWrapper } from './style';
import PlayerHeader from '../player-header';
import { getSimiSong } from '@/service/modules/player';
import { useAppDispatch } from '@/store';
import { fetchCurrentSongAction } from '../../store/player';

interface IProps {
  children?: ReactNode;
  currentSong: any;
}

const PlayerSameSongs: FC<IProps> = ({ currentSong }): JSX.Element => {
  const [simiSongs, setSimiSongs] = useState<any[]>([]);

  const dispatch = useAppDispatch();

  /** 列表中切换歌曲 */
  function changeListSong(item: any) {
    dispatch(fetchCurrentSongAction(item.id));
  }

  useEffect(() => {
    (async () => {
      const res = await getSimiSong(currentSong.id);
      if (res.code !== 200) {
        console.log('getSimiSong 出错');
        return;
      }
      setSimiSongs(res.songs);
    })();
  }, [currentSong]);

  return (
    <PlayerSameSongsWrapper>
      <PlayerHeader title="相似歌曲" />
      <div className="songs">
        {simiSongs.map((item, index) => {
          return (
            <div className="song-item" key={item.id}>
              <div className="info ">
                <div className="title text-nowrap">
                  <a
                    href="/"
                    onClick={(e) => {
                      changeListSong(item);
                      e.preventDefault();
                    }}
                  >
                    {item.name}
                  </a>
                </div>
                <div className="artist  text-nowrap">
                  <a
                    href="/"
                    onClick={(e) => {
                      changeListSong(item);
                      e.preventDefault();
                    }}
                  >
                    {item.artists && item.artists[0].name}
                  </a>
                </div>
              </div>
              <div className="operate">
                <button
                  className="item sprite_icon3 play"
                  onClick={(e) => changeListSong(item)}
                ></button>
                <button
                  className="item sprite_icon3 add"
                  onClick={(e) => changeListSong(item)}
                ></button>
              </div>
            </div>
          );
        })}
      </div>
    </PlayerSameSongsWrapper>
  );
};

export default memo(PlayerSameSongs);
