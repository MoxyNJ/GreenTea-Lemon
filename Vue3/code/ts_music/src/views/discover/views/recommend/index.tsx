import React, { memo, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useAppDispatch } from '@/store';
import { fetchBannerAction } from './store';
import { RecommendWrapper } from './style';
import TopBanner from './components/TopBanner';
import HotRecommend from './components/hot-recommend';
import NewAlbum from './components/new-album';

interface IProps {
  children?: ReactNode;
}

const Recommend: FC<IProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();

  // 网络请求：发起action
  useEffect(() => {
    dispatch(fetchBannerAction());
  }, []);

  return (
    <RecommendWrapper>
      <TopBanner />
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend />
          <NewAlbum />
          <h1>Content Left Container</h1>
        </div>
        <div className="right">
          <div>
            <h1>Contnet Right</h1>
          </div>
        </div>
      </div>
    </RecommendWrapper>
  );
};

export default memo(Recommend);
