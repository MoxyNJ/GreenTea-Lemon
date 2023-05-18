import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { RadioRecommendCover, RadioRecommendWrapper } from './style';
import ThemeHeader from '@/components/theme-header';
import { getSizeImage } from '@/utils/format-utils';

interface IProps {
  children?: ReactNode;
  recommendTypeList: any[];
}

const RadioRecommend: FC<IProps> = (props): JSX.Element => {
  const { recommendTypeList } = props;

  return (
    <RadioRecommendWrapper>
      <ThemeHeader title="优秀新电台" />
      <div className="radio-list">
        {recommendTypeList.slice(0, 5).map((item) => {
          return (
            <RadioRecommendCover key={item.id}>
              <a href="/">
                <img src={getSizeImage(item.picUrl, 150)} alt={item.name} />
              </a>
              <a href="/" className="name text-nowrap">
                {item.name}
              </a>
              <span className="details  text-nowrap">{item.rcmdtext}</span>
            </RadioRecommendCover>
          );
        })}
      </div>
    </RadioRecommendWrapper>
  );
};

export default memo(RadioRecommend);
