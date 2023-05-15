import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { HotRadioWrapper } from './style';
import AreaHeaderV2 from '@/components/area-header-v2';
import { getDjRadioTopList } from '@/service/modules/recommend';
import { getSizeImage } from '@/utils/format-utils';

interface IProps {
  children?: ReactNode;
}

const HotRadio: FC<IProps> = (): JSX.Element => {
  const [djRadioList, setDjRadioList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getDjRadioTopList(5);
      if (res.code !== 200) {
        console.log('getDjRadioTopList 出错');
        return;
      }
      setDjRadioList(res.toplist);
    })();
  }, []);

  return (
    <div>
      <HotRadioWrapper>
        <AreaHeaderV2 title="热门主播" />
        <div className="radio-list">
          {djRadioList.map((item: any, index: number) => {
            return (
              <div key={item.id} className="item">
                <a href="/" className="image">
                  <img src={getSizeImage(item.picUrl, 40)} alt={item.creatorName} />
                </a>
                <div className="info">
                  <div className="name text-nowrap">
                    <a href="/">{item.creatorName}</a>
                  </div>
                  <div className="position text-nowrap">{item.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </HotRadioWrapper>
    </div>
  );
};

export default memo(HotRadio);
