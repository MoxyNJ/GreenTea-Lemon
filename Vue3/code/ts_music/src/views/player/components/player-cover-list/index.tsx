import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { PlayerCoverListWrapper } from './style';
import { getSizeImage } from '@/utils/format-utils';
import { getSimiPlaylist } from '@/service/modules/player';
import { shallowEqualApp, useAppSelector } from '@/store';
import PlayerHeader from '../player-header';

interface IProps {
  children?: ReactNode;
  currentSong: any;
}

const PlayerCoverList: FC<IProps> = ({ currentSong }): JSX.Element => {
  const [simiPlayList, setSimiPlayList] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getSimiPlaylist(currentSong.id);
      if (res.code !== 200) {
        console.log('getSimiPlaylist 出错');
        return;
      }
      setSimiPlayList(res.playlists);
    })();
  }, [currentSong]);

  return (
    <PlayerCoverListWrapper>
      <PlayerHeader title="包含这首歌的歌单" />
      <div className="songs">
        {simiPlayList.map((item, index) => {
          return (
            <div className="song-item" key={item.id}>
              <a className="image" href="/todo">
                <img src={getSizeImage(item.coverImgUrl, 50)} alt={item.mame} />
              </a>
              <div className="info text-nowrap">
                <a href="/todo" className="name">
                  {item.name}
                </a>
                <div className="didv"></div>
                <div className="text-nowrap">
                  <span>by</span>
                  <a href="/todo" className="nickname">
                    {item.creator && item.creator.nickname}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PlayerCoverListWrapper>
  );
};

export default memo(PlayerCoverList);
