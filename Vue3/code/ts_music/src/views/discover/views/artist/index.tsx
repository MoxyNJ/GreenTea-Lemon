import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { ArtistWrapper } from './style';
import ArtistCategory from './components/artist-category';
import ArtistList from './components/artist-list';
import { getArtistList, getTopArtistsList } from '@/service/modules/artist';

interface IProps {
  children?: ReactNode;
}

export interface IParam {
  name: string;
  area: number;
  type: number;
  initial?: string;
}

export interface IArtistList {
  name: string;
  id: number;
}

const defaultParam: IParam = {
  name: '华语男歌手',
  area: 7,
  type: 1
};

const Artist: FC<IProps> = (): JSX.Element => {
  /**请求资源的参数 */
  const [param, setParam] = useState<IParam>(defaultParam);
  /** 请求的资源列表 */
  const [artistList, setartistList] = useState<IArtistList[]>([]);

  const changeArtist = (curParam: IParam) => {
    setParam(curParam);
  };

  /**获取数据*/
  useEffect(() => {
    if (param.name === '推荐歌手') {
      // 推荐歌手接口
      (async () => {
        const res = await getTopArtistsList();
        if (res.code !== 200) {
          console.log('getTopArtistsList 出错');
          return;
        }
        setartistList(res.artists);
      })();
    } else {
      (async () => {
        const res = await getArtistList(param.area, param.type, param?.initial);
        if (res.code !== 200) {
          console.log('getTopArtistsList 出错');
          return;
        }
        setartistList(res.artists);
      })();
    }
  }, [param]);

  return (
    <ArtistWrapper>
      <div className="content wrap-v2">
        <ArtistCategory param={param} changeArtist={changeArtist} />
        <ArtistList list={artistList} param={param} changeArtist={changeArtist} />
      </div>
    </ArtistWrapper>
  );
};

export default memo(Artist);
