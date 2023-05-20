import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { RankingItemWrapper, RankingWrapper } from './style';
import AreaHeaderV1 from '@/components/area-header-v1';
import { getPlaylistDetail } from '@/service/modules/recommend';
import { NEW_SONG, ORIGINAL_SONG, SOARING_SONG } from '@/assets/constant';
import { getSizeImage } from '@/utils/format-utils';
import { useAppDispatch } from '@/store';
import { fetchCurrentSongAction } from '@/views/player/store/player';

interface IProps {
  children?: ReactNode;
}

const TopRanking: FC<IProps> = () => {
  /** 三个榜单：飙升榜、新歌榜、原创榜 */
  const [soaringList, setSoaringList] = useState<any>({});
  const [newList, setNewList] = useState<any>({});
  const [originalList, setOriginalList] = useState<any>({});

  // 获取数据
  useEffect(() => {
    const getSongLists = async (id: number, setFn: React.Dispatch<React.SetStateAction<any[]>>) => {
      const res = await getPlaylistDetail(id);
      if (res.code !== 200) {
        console.log('getPlaylistDetail 出错');
        return;
      }
      setFn(res.playlist);
    };

    getSongLists(SOARING_SONG, setSoaringList);
    getSongLists(NEW_SONG, setNewList);
    getSongLists(ORIGINAL_SONG, setOriginalList);
  }, []);
  return (
    <RankingWrapper>
      <AreaHeaderV1 title="榜单" moreLink="/discover/ranking" />
      <div className="content">
        <TopRankingItem key={soaringList.id} itemData={soaringList} />
        <TopRankingItem key={newList.id} itemData={newList} />
        <TopRankingItem key={originalList.id} itemData={originalList} />
      </div>
    </RankingWrapper>
  );
};

interface Itemprops {
  children?: ReactNode;
  itemData: any;
}

const TopRankingItem: FC<Itemprops> = (props) => {
  const { itemData } = props;
  const { tracks = [] } = itemData;
  const dispatch = useAppDispatch();

  /** 添加歌曲到播放列表 */
  const handlePlayClick = (id: number) => {
    dispatch(fetchCurrentSongAction(id));
  };

  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getSizeImage(itemData.coverImgUrl, 100)} alt="" />
          <a href="/" className="sprite_cover"></a>
        </div>
        <div className="info">
          <a className="name">{itemData.name}</a>
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="list-item" key={item.id}>
              <div className="rank">{index + 1}</div>
              <div className="info">
                <div className="name text-nowrap">{item.name}</div>
                <div className="operate">
                  <button
                    className="btn sprite_02 play"
                    onClick={() => handlePlayClick(item.id)}
                  ></button>
                  <button className="btn sprite_icon2 addto"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <a href="#/discover/ranking">查看全部&gt;</a>
      </div>
    </RankingItemWrapper>
  );
};

export default memo(TopRanking);
