import React, { Fragment, memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { RankingWrapper } from './style';
import { getPlayListDetail, getRankingTopList } from '@/service/modules/ranking';
import RankingNav from './components/ranking-nav';
import RankingHeader from './components/ranking-header';
import RankingList from './components/ranking-list';

interface IProps {
  children?: ReactNode;
}

/** 左侧榜单数据格式 */
export interface TopListData {
  name?: string;
  description?: string;
  id: number;
  coverImgUrl?: string;
  updateFrequency?: number;
}

/** 右侧榜单详情数据格式 */
export interface RankingTopInfo {
  coverImgUrl: string;
  name: string;
  trackUpdateTime: string;
  subscribedCount: string;
  shareCount: string;
  commentCount: string;
  tracks: any[];
  playCount: number;
}

const Ranking: FC<IProps> = (): JSX.Element => {
  /** 左侧榜单信息，有两栏 */
  const [topList1, setTopList1] = useState<TopListData[]>([]);
  const [topList2, setTopList2] = useState<TopListData[]>([]);
  /** 当前展示榜单的id */
  const [currentListId, setCurrentListId] = useState<number | null>(null);
  /** 当前展示榜单的头部detail */
  const [currentListDetail, setCurrentListDetail] = useState<RankingTopInfo>();
  /** 当前展示榜单的最近更新日期 */
  const [updateFrequency, setUpdateFrequency] = useState<string>('');

  /** 回调：修改当前展示榜单id */
  const handleChangeListId = (id: number) => {
    setCurrentListId(id);
  };

  /** 初始化，获取左侧排行榜数据 nav */
  useEffect(() => {
    (async () => {
      const res = await getRankingTopList();
      if (res.code !== 200) {
        console.log('getRankingTopList 出错');
        return;
      }
      setTopList1(res.list.slice(0, 4));
      setTopList2(res.list.slice(4));

      // 初始化时，把第一个榜单的id传入并展示
      setCurrentListId(res.list[0].id);
    })();
  }, []);

  /** 获取当前歌单详情数据 */
  useEffect(() => {
    if (!currentListId) return;

    (async () => {
      const res = await getPlayListDetail(currentListId);
      if (res.code !== 200) {
        console.log('getPlayListDetail 出错');
        return;
      }
      setCurrentListDetail(res.playlist);
    })();

    // 同时保存该榜单的’最近更新日期‘数据
    const getUpdateFrequency = (id: number) => {
      for (const key in topList1) {
        if (topList1[key].id === id) return topList1[key].updateFrequency;
      }
      for (const key in topList2) {
        if (topList2[key].id === id) return topList2[key].updateFrequency;
      }
      return 'error';
    };

    setUpdateFrequency(getUpdateFrequency(currentListId) as string);
  }, [currentListId]);

  return (
    <RankingWrapper className="wrap-v2">
      <div className="nav">
        <RankingNav
          list={topList1}
          title="云音乐特色榜"
          handleChangeListId={handleChangeListId}
          currentListId={currentListId ?? -1}
        />
        <RankingNav
          list={topList2}
          title="全球媒体榜"
          handleChangeListId={handleChangeListId}
          currentListId={currentListId ?? -1}
        />
      </div>
      <div className="main">
        {currentListDetail ? (
          <Fragment>
            <RankingHeader playList={currentListDetail} updateFrequency={updateFrequency} />
            <RankingList
              title="歌曲列表"
              tracks={currentListDetail.tracks}
              playCount={currentListDetail.playCount}
            />
          </Fragment>
        ) : (
          ''
        )}
      </div>
    </RankingWrapper>
  );
};

export default memo(Ranking);
