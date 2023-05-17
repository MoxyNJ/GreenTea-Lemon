/**
 * 可抽离
 */
import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { AlbumBgCoverWrapper } from './style';
import { getSizeImage } from '@/utils/format-utils';

interface IProps {
  children?: ReactNode;
  itemData?: any;
}

const AlbumBgCover: FC<IProps> = (props): JSX.Element => {
  const { itemData = {} } = props;
  return (
    <AlbumBgCoverWrapper>
      <div className="sprite_02">
        <div className="top">
          <img src={getSizeImage(itemData.picUrl, 130)} alt={itemData.name} />
          <a href="/" className="cover sprite_cover"></a>
          <a href="/" className="play sprite_icon"></a>
        </div>
        <div className="bottom">
          <div className="name text-nowrap">
            <a href="/">{itemData.name}</a>
          </div>
          <div className="artist text-nowrap">{itemData.artist.name ?? '未知歌手'}</div>
        </div>
      </div>
    </AlbumBgCoverWrapper>
  );
};

export default memo(AlbumBgCover);
