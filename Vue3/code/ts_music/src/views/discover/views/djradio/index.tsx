import { Radio } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import RadioCategory from './components/radio-category';
import RadioRecommend from './components/radio-recommend';
import RadioRanking from './components/radio-ranking';
import { DjRadioWrapper } from './style';
import { getDjRadioCatelist, getDjRadioRecommend, getDjRadios } from '@/service/modules/djradio';

interface IProps {
  children?: ReactNode;
}

const Djradio: FC<IProps> = (): JSX.Element => {
  const [categories, setCategories] = useState<any[]>([]);
  const [recommendTypeList, setRecommendTypeList] = useState<any[]>([]);
  const [hotRadioList, setHotRadioList] = useState<any[]>([]);
  const [currentId, setCurrentId] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);

  /**电台栏目 */
  const getDjCategoryList = async () => {
    const res = await getDjRadioCatelist();
    if (res.code !== 200) {
      console.log('getDjRadioCatelist 出错');
      return;
    }
    setCategories(res.categories);
  };

  /** 优秀新电台/电台分类 */
  const getDjRecommendTypeList = async (type: number) => {
    const res = await getDjRadioRecommend(type);
    if (res.code !== 200) {
      console.log('getDjRadioCatelist 出错');
      return;
    }
    setRecommendTypeList(res.djRadios);
  };

  /**电台排行榜 */
  const getDjRadioList = async (cateId: number, limit: number, offset: number) => {
    const res = await getDjRadios(cateId, limit, offset);
    if (res.code !== 200) {
      console.log('getDjRadioCatelist 出错');
      return;
    }
    setHotRadioList(res.djRadios);
  };

  /** 初始化获取数据 */
  useEffect(() => {
    getDjCategoryList();
  }, []);

  /** 监听变化，并更改列表内容 */
  useEffect(() => {
    getDjRecommendTypeList(currentId);
  }, [currentId]);

  useEffect(() => {
    getDjRadioList(currentId, 30, (currentPage - 1) * 30);
  }, [currentId, currentPage]);

  return (
    <DjRadioWrapper className="wrap-v2">
      <RadioCategory currentId={currentId} setCurrentId={setCurrentId} categories={categories} />
      <RadioRecommend recommendTypeList={recommendTypeList} />
      <RadioRanking
        hotRadioList={hotRadioList}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </DjRadioWrapper>
  );
};

export default memo(Djradio);
