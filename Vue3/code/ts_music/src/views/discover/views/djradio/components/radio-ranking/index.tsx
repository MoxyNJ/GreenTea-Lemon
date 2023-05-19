import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { RadioRankingCoverWrapper, RadioRankingWrapper } from './style';
import ThemeHeader from '@/components/theme-header';
import ThemePagination from '@/components/theme-pagination';
import { getSizeImage } from '@/utils/format-utils';

interface IProps {
  children?: ReactNode;
  hotRadioList: any[];
  currentPage: number;
  handlePageParam: (page: number) => void;
}

const RadioRanking: FC<IProps> = (props): JSX.Element => {
  const { hotRadioList, currentPage, handlePageParam } = props;

  const onPageChange = (page: number) => {
    handlePageParam(page);
  };

  return (
    <RadioRankingWrapper>
      <ThemeHeader title="电台排行榜" />
      <div className="ranking-list">
        {hotRadioList.map((item, index) => {
          return (
            <RadioRankingCoverWrapper key={item.id}>
              <a href="#/discover/djradio">
                <img src={getSizeImage(item.picUrl, 120)} alt="" />
              </a>
              <div className="info">
                <a href="#/discover/djradio" className="title text-nowrap">
                  {item.name}
                </a>
                <div className="nickname sprite_icon2">
                  <i className="left sprite_icon2 "></i>
                  <a href="#/discover/djradio" className="text-nowrap">
                    {item.dj.nickname}
                  </a>
                </div>
                <div className="count">
                  <span>共{item.programCount}期</span>
                  <span className="subscribe">订阅{item.subCount}次</span>
                </div>
              </div>
            </RadioRankingCoverWrapper>
          );
        })}
      </div>
      <ThemePagination
        currentPage={currentPage}
        total={1000}
        pageSize={32}
        onPageChange={onPageChange}
      />
    </RadioRankingWrapper>
  );
};

export default memo(RadioRanking);
