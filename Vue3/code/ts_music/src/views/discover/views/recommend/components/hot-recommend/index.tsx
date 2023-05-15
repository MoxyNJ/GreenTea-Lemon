import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { HotRecommendWrapper } from './style';
import AreaHeaderV1 from '@/components/area-header-v1';
import { getHotRecommend } from '@/service/modules/recommend';
import PicCoverV1 from '@/components/pic-cover-v1';

interface IProps {
  children?: ReactNode;
}

const HotRecommend: FC<IProps> = () => {
  const [hotRecommendDatas, setHotRecommendDatas] = useState<any[]>([]);

  /** 初始化 */
  useEffect(() => {
    // 获取数据
    const getHotRecommendDatas = async () => {
      const res = await getHotRecommend(8);
      if (res.code !== 200) {
        console.log('getHotRecommend 出错');
        return;
      }
      setHotRecommendDatas(res.result);
    };

    getHotRecommendDatas();
  }, []);

  return (
    <HotRecommendWrapper>
      <AreaHeaderV1
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        moreLink="/discover/songs"
      />
      <div className="recommend-list">
        {hotRecommendDatas.map((item) => {
          return <PicCoverV1 key={item.id} info={item} size={140} />;
        })}
      </div>
    </HotRecommendWrapper>
  );
};

export default memo(HotRecommend);
