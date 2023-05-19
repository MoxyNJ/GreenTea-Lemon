import React, { memo, useEffect, useRef, useState } from 'react';
import type { FC, ReactNode, ElementRef } from 'react';
import { RadioCategoryContent, RadioCategoryItemImage, RadioCategoryWrapper } from './style';
import { Carousel } from 'antd';
import { DJ_RADIO_CATE_NUMBER } from '@/assets/constant';

interface IProps {
  children?: ReactNode;
  currentId: number;
  categories: any[];
  handleCateIdParam: (cateId: number) => void;
}

const RadioCategor: FC<IProps> = (props): JSX.Element => {
  const { currentId, categories, handleCateIdParam } = props;
  const carouselRef = useRef<ElementRef<typeof Carousel>>(null);

  // 计算出共有几页，每页应当有18个类目 ceil 向下取整
  const page = Math.ceil(categories.length / DJ_RADIO_CATE_NUMBER) || 1;

  return (
    <RadioCategoryWrapper>
      <div className="arrow arrow-left" onClick={(e) => carouselRef.current?.prev()}></div>
      <RadioCategoryContent>
        <Carousel dots={{ className: 'dots' }} ref={carouselRef}>
          {Array(page)
            .fill(0)
            .map((_, index) => {
              return (
                <div key={index} className="category-page">
                  {/* slice: 0,18 , 18,length */}
                  {categories
                    .slice(index * DJ_RADIO_CATE_NUMBER, index === 0 ? 18 : categories.length)
                    .map((item, index) => {
                      return (
                        <div
                          key={item.id}
                          onClick={(e) => handleCateIdParam(item.id)}
                          className={'category-item' + (currentId === item.id ? ' active' : '')}
                        >
                          <RadioCategoryItemImage
                            className="image"
                            $imgUrl={item.picWebUrl}
                          ></RadioCategoryItemImage>
                          <span>{item.name}</span>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </Carousel>
      </RadioCategoryContent>
      <div className="arrow arrow-right" onClick={(e) => carouselRef.current?.next()}></div>
    </RadioCategoryWrapper>
  );
};

export default memo(RadioCategor);
