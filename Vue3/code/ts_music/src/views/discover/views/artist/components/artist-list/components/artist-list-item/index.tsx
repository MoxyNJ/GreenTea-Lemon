import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { ArtistListItemWrapper } from './style';
import { getSizeImage } from '@/utils/format-utils';

interface IProps {
  children?: ReactNode;
  index: number;
  info: any;
}

const ArtistListItem: FC<IProps> = (props): JSX.Element => {
  const { index, info } = props;

  return (
    <ArtistListItemWrapper>
      {index < 10 && (
        <div className="image">
          <img src={getSizeImage(info.img1v1Url, 130)} alt={info.name} />
          <div className="cover sprite_cover"></div>
        </div>
      )}
      <div className={'info' + (index > 9 ? ' nonePic' : '')}>
        <span className="name text-nowrap">{info.name}</span>
        {index > 9 ? <i className="sprite_icon2 icon"></i> : ''}
      </div>
    </ArtistListItemWrapper>
  );
};

export default memo(ArtistListItem);
