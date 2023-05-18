import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { ArtistListHeadListWrapper } from './style';
import { IParam } from '../../../..';
import { singerAlphas } from '@/utils/handle-data';

interface IProps {
  children?: ReactNode;
  param: IParam;
  changeArtist: (param: IParam) => void;
}

const ArtistListHeadList: FC<IProps> = (props): JSX.Element => {
  const {
    param,
    param: { area, type },
    changeArtist
  } = props;

  const [currentInitial, setCurrentInitial] = useState<string>('-1');

  /** 按钮点击后，高亮 + 修改initial */
  const handleOnClick = (item: string) => {
    setCurrentInitial(item);
    const newParam = { ...param };
    newParam.initial = item;
    changeArtist(newParam);
  };

  return (
    <ArtistListHeadListWrapper $hasTop={area !== -1}>
      {area !== -1 &&
        singerAlphas.map((item, index) => {
          const isActive = currentInitial === item;
          return (
            <div key={index} className={'item' + (isActive ? ' active' : '')}>
              <span
                onClick={(e) => handleOnClick(item)}
                className={item === '-1' || item === '0' ? 'small' : ''}
              >
                {/* 使用立即执行箭头函数，可以在jsx中用switch/console */}
                {(() => {
                  switch (item) {
                    case '-1':
                      return '热门';
                    case '0':
                      return '其他';
                    default:
                      return item.toUpperCase();
                  }
                })()}
              </span>
            </div>
          );
        })}
    </ArtistListHeadListWrapper>
  );
};

export default memo(ArtistListHeadList);
