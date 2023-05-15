/**
 * PicCoverV1 推荐/热门推荐/专辑封面效果
 */
import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { PicCoverV1Wrapper } from './style';
import { getCount, getSizeImage } from '@/utils/format-utils';

interface IProps {
  children?: ReactNode;
  info: any;
  rightMargin?: number;
  size?: number;
}

const PicCoverV1: FC<IProps> = (props) => {
  const { info, size = 140, rightMargin = 0 } = props;

  return (
    <PicCoverV1Wrapper $rightMargin={rightMargin}>
      <div className="top">
        <img
          src={getSizeImage(info.picUrl ? info.picUrl : info.coverImgUrl, size)}
          alt={info.name}
        />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon headset"></i>
              {getCount(info.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="bottom text-nowrap-2">{info.name}</div>
    </PicCoverV1Wrapper>
  );
};

export default memo(PicCoverV1);
