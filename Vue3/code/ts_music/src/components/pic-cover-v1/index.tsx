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
  bottomMargin?: number;
  size?: number;
  showName?: boolean;
}

const PicCoverV1: FC<IProps> = (props) => {
  const { info, size = 140, rightMargin = 0, bottomMargin = 20, showName = false } = props;

  return (
    <PicCoverV1Wrapper $rightMargin={rightMargin} $bottomMargin={bottomMargin}>
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
      {showName ? (
        <div className="footer">
          <div className="bottom text-nowrap">{info.name}</div>
          <div className="nickname text-nowrap">{'by ' + info?.creator?.nickname || '佚名'}</div>
        </div>
      ) : (
        <div className="bottom text-nowrap-2">{info.name}</div>
      )}
    </PicCoverV1Wrapper>
  );
};

export default memo(PicCoverV1);
