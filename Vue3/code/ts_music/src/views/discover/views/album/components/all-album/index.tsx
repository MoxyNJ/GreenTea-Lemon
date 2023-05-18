import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { AllAlbumWrapper } from './style';
import ThemeHeader from '@/components/theme-header';
import { PER_PAGE_NUMBER } from '@/assets/constant';
import AlbumBgCover from '../album-cover';
import ThemePagination from '@/components/theme-pagination';
import { useSearchParams } from 'react-router-dom';
import { getTopAlbums } from '@/service/modules/albums';

interface IProps {
  children?: ReactNode;
}

const subNavList = [
  {
    name: '全部',
    id: 'ALL'
  },
  {
    name: '华语',
    id: 'ZH'
  },
  {
    name: '欧美',
    id: 'EA'
  },
  {
    name: '韩国',
    id: 'KR'
  },
  {
    name: '日本',
    id: 'JP'
  }
];

const AllAlbum: FC<IProps> = (): JSX.Element => {
  const [topAlbums, setTopAlbums] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentArea, setCurrentArea] = useState<string>('ALL');
  const [total, setTotal] = useState<number>(500);

  const [searchParams, setSearchParams] = useSearchParams();

  /** 底部翻页点击回调 */
  const onPageChange = (page: number) => {
    setSearchParams({
      area: currentArea,
      offset: String((page - 1) * PER_PAGE_NUMBER)
    });
    // 调整state
    setCurrentPage(page);
  };

  /** 顶部国家地区点击回调 */
  const onAreaChange = (area: string) => {
    setSearchParams({
      area: area,
      offset: String((currentPage - 1) * PER_PAGE_NUMBER)
    });

    // 调整state
    setCurrentArea(area);
  };

  /** 获取数据 */
  const getAllAlbum = async (area: string, page: number) => {
    const offset = (page - 1) * PER_PAGE_NUMBER;
    const res = await getTopAlbums(area, PER_PAGE_NUMBER, offset);
    setTotal(res.total);
    setTopAlbums(res.albums);
  };

  // 初始化，根据URL获取数据，更新至sttate中保存
  useEffect(() => {
    const area = searchParams.get('area') || 'all';
    const offset = Number(searchParams.get('offset')) || 0;
    setCurrentPage(offset / PER_PAGE_NUMBER + 1);
    setCurrentArea(area);
  }, []);

  // 之后点击下一页 / 选择国家，根据state获取数据
  useEffect(() => {
    getAllAlbum(currentArea, currentPage);
  }, [currentPage, currentArea]);

  return (
    <AllAlbumWrapper>
      <ThemeHeader title={'全部新碟'} subNav={subNavList} onAreaChange={onAreaChange} />
      <div className="album-list">
        {topAlbums.map((item, index) => (
          <AlbumBgCover key={index} itemData={item} />
        ))}
      </div>
      <ThemePagination
        currentPage={currentPage}
        total={total}
        pageSize={PER_PAGE_NUMBER}
        onPageChange={onPageChange}
      />
    </AllAlbumWrapper>
  );
};

export default memo(AllAlbum);
