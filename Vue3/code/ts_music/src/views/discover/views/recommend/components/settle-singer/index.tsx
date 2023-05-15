import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { SetterSongerWrapper } from './style';
import AreaHeaderV2 from '@/components/area-header-v2';
import { useAppSelector } from '@/store';
import { getSizeImage } from '@/utils/format-utils';
import { getArtistList } from '@/service/modules/recommend';

interface IProps {
  children?: ReactNode;
}

const SettleSinger: FC<IProps> = (): JSX.Element => {
  const [settleSingers, setSettleSingers] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getArtistList(5);
      if (res.code !== 200) {
        console.log('getArtistList 出错');
        return;
      }
      setSettleSingers(res.artists);
    })();
  }, []);

  return (
    <SetterSongerWrapper>
      <AreaHeaderV2 title="入驻歌手" moreText="查看全部 &gt;" moreLink="#/discover/artist" />
      <div className="singer-list">
        {settleSingers.map((item: any) => {
          return (
            <a href="#/discover/artist" className="item" key={item.id}>
              <img src={getSizeImage(item.img1v1Url, 62)} alt={item.name} />
              <div className="info">
                <div className="title">{item.name || item.alias[0]}</div>
                <div className="name text-nowrap">{item.alias.join(' ')}</div>
              </div>
            </a>
          );
        })}
      </div>
      <div className="apply-for">
        <a href="/" className="sprite_button">
          <i className="sprite_button">申请成为网易音乐人</i>
        </a>
      </div>
    </SetterSongerWrapper>
  );
};

export default memo(SettleSinger);
