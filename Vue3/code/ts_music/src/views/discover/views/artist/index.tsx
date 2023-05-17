import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { ArtistWrapper } from './style';
import ArtistCategory from './components/artist-category';
import ArtistList from './components/artist-list';

interface IProps {
  children?: ReactNode;
}

export interface ICurrentType {
  type: number;
  name: string;
}

const Artist: FC<IProps> = (): JSX.Element => {
  const [currentArea, setcurrentArea] = useState<number>(-1);
  const [currentType, setcurrentType] = useState<ICurrentType>({ name: '推荐歌手', type: -1 });
  const [artistList, setartistList] = useState<any[]>();

  const changeArtist = (area: number, item: ICurrentType) => {
    setcurrentArea(area);
    setcurrentType(item);
    console.log(area, item);
  };

  /**初始化数据 */
  // useEffect(() => {}, []);

  return (
    <ArtistWrapper>
      <div className="content wrap-v2">
        <ArtistCategory
          currentArea={currentArea}
          currentType={currentType}
          changeArtist={changeArtist}
        />
        <ArtistList />
      </div>
    </ArtistWrapper>
  );
};

export default memo(Artist);
