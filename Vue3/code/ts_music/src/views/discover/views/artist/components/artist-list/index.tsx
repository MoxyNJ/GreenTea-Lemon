import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { ArtistListWrapper } from './style';
import { IArtistList, IParam } from '../..';
import ThemeHeader from '@/components/theme-header';
import ArtistListItem from './components/artist-list-item';
import ArtistListHeadList from './components/artist-list-headList';

interface IProps {
  children?: ReactNode;
  list: IArtistList[];
  param: IParam;
  changeArtist: (param: IParam) => void;
}

const ArtistList: FC<IProps> = (props): JSX.Element => {
  const { list, param } = props;
  return (
    <ArtistListWrapper>
      <ThemeHeader title={param.name} />
      <ArtistListHeadList param={param} changeArtist={props.changeArtist} />
      <div className="artist-list">
        {list.map((item, index) => {
          return <ArtistListItem key={item.id} index={index} info={item} />;
        })}
      </div>
    </ArtistListWrapper>
  );
};

export default memo(ArtistList);
