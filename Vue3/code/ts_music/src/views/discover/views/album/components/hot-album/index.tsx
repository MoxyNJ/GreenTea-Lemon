import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { HotAlbumWrapper } from './style';
import ThemeHeader from '@/components/theme-header';
import { getTopAlbums } from '@/service/modules/albums';
import AlbumBgCover from '../album-cover';
import { NEW_ALBUMS_LIMIT } from '@/assets/constant';

interface IProps {
  children?: ReactNode;
}

export interface AlbumItem {
  albumId?: number;
  coverUrl?: string;
  albumName?: string;
  artistName?: string;
}

const HotAlbum: FC<IProps> = (): JSX.Element => {
  const [hotAlbums, setHotAlbums] = useState<AlbumItem[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getTopAlbums('all', NEW_ALBUMS_LIMIT);
      if (res.code !== 200) {
        console.log('getTopAlbums 出错');
        return;
      }
      setHotAlbums(res.albums);
    })();
  }, []);

  return (
    <HotAlbumWrapper>
      <ThemeHeader title={'热门新碟'} />
      <div className="album-list">
        {hotAlbums.map((item, index) => {
          return <AlbumBgCover key={index} itemData={item} />;
        })}
      </div>
    </HotAlbumWrapper>
  );
};

export default memo(HotAlbum);
