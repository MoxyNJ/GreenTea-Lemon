import React, { memo, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useAppDispatch } from '@/store';
import { fetchBannerAction } from './store';
import { RecommendWrapper } from './style';
import TopBanner from './components/top-banner';
import HotRecommend from './components/hot-recommend';
import NewAlbum from './components/new-album';
import TopRanking from './components/top-ranking';
import UsrLogin from './components/usr-login';
import SettleSinger from './components/settle-singer';
import HotRadio from './components/hot-radio';

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
          <TopRanking />
        </div>
        <div className="right">
          <div>
            <UsrLogin />
            <SettleSinger />
            <HotRadio />
          </div>
        </div>
      </div>
    </RecommendWrapper>
  );
};

export default memo(Recommend);
