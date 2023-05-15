/**
 * 发现音乐/推荐/新碟上架/子组件：光碟表面cover效果
 */
import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { AlbumCoverWrapper } from './style';
import { getSizeImage } from '@/utils/format-utils';

interface IProps {
  children?: ReactNode;
  itemData?: any;
}

const AlbumCover: FC<IProps> = (props): JSX.Element => {
  const { itemData = {} } = props;
  return (
    <AlbumCoverWrapper>
      <div className="container_mask sprite_02">
        <div className="top">
          <img src={getSizeImage(itemData.picUrl, 100)} alt="" />
          <a href="/" className="cover sprite_cover"></a>
          <a href="/" className="play sprite_icon"></a>
        </div>
        <div className="bottom">
          <div className="name text-nowrap">
            <a href="/">{itemData.name}</a>
          </div>
          <div className="artist  text-nowrap">
            <a href="/">{itemData.artist.name}</a>
          </div>
        </div>
      </div>
    </AlbumCoverWrapper>
  );
};

export default memo(AlbumCover);
