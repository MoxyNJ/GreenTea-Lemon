import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { AlbumWrapper } from './style';
import HotAlbum from './components/hot-album';
import AllAlbum from './components/all-album';

interface IProps {
  children?: ReactNode;
}

const Album: FC<IProps> = (): JSX.Element => {
  return (
    <AlbumWrapper className="wrap-v2">
      <HotAlbum />
      <AllAlbum />
    </AlbumWrapper>
  );
};

export default memo(Album);
