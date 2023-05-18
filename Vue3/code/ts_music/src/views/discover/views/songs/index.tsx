import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { SongsWrapper } from './style';
import SongsHeader from './components/songs-header';
import SongsMain from './components/songs-main';
import { getTopPlayList, getTopPlayListCategory } from '@/service/modules/songs';
import { useSearchParams } from 'react-router-dom';
import { PER_PAGE_NUMBER } from '@/assets/constant';
import { handleSongsCategory } from '@/utils/handle-data';

interface IProps {
  children?: ReactNode;
}

const Songs: FC<IProps> = (): JSX.Element => {
  const [showCat, setShowCat] = useState<boolean>(false);
  const [catData, setCatData] = useState<any[]>([]);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCat, setCurrentCat] = useState<string>('ALL');
  const [searchParams, setSearchParams] = useSearchParams();

  /** 获取歌单详情数据 */
  const getTopPlayListData = async (cat: string, page: number) => {
    const res = await getTopPlayList('hot', cat, PER_PAGE_NUMBER, page - 1);
    if (res.code !== 200) {
      console.log('getTopPlayList 出错');
      return;
    }
    setTotal(res.total);
    setPlaylists(res.playlists);
  };

  /** 获取歌单分类数据 */
  const getTopPlayListCategoryList = async () => {
    const res = await getTopPlayListCategory();
    if (res.code !== 200) {
      console.log('getTopPlayListCategory 出错');
      return;
    }
    setCatData(handleSongsCategory(res));
  };

  /** 底部翻页点击回调 */
  const onPageChange = (page: number) => {
    setSearchParams({
      cate: currentCat,
      offset: String((page - 1) * PER_PAGE_NUMBER)
    });
    // 调整state
    setCurrentPage(page);
  };

  /** 顶部选择地区点击回调 */
  const onCatChange = (cate: string) => {
    setSearchParams({
      cate: cate,
      offset: String((currentPage - 1) * PER_PAGE_NUMBER)
    });
    // 调整state
    setCurrentCat(cate);
  };

  /**
   * 初始化
   * [1]获取分类categ数据
   * [2]根据URL获取数据，更新至state中保存
   */
  useEffect(() => {
    getTopPlayListCategoryList();

    const cat = searchParams.get('cat') || '全部';
    const offset = (Number(searchParams.get('offset')) || 0) / PER_PAGE_NUMBER;
    setCurrentPage(offset + 1);
    setCurrentCat(cat);
  }, []);

  // 之后点击下一页 / 选择分类，根据state获取数据
  useEffect(() => {
    getTopPlayListData(currentCat, currentPage);
  }, [currentPage, currentCat]);

  return (
    <SongsWrapper
      className="wrap-v2"
      onClick={(e) => {
        setShowCat(false);
      }}
    >
      <SongsHeader
        currentCat={currentCat}
        showCat={showCat}
        setShowCat={setShowCat}
        catData={catData}
        onCatChange={onCatChange}
      />
      <SongsMain
        playlists={playlists}
        currentPage={currentPage}
        total={total}
        pageSize={PER_PAGE_NUMBER}
        onPageChange={onPageChange}
      />
    </SongsWrapper>
  );
};

export default memo(Songs);
