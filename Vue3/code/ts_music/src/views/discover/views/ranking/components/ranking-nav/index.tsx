import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { TopListData } from '../..';
import { RankingNavWrapper } from './style';
import { getSizeImage } from '@/utils/format-utils';

interface IProps {
  children?: ReactNode;
  list: TopListData[];
  title: string;
  handleChangeListId: (id: number) => void;
  currentListId: number;
}

export const RankingNav: FC<IProps> = (props): JSX.Element => {
  const { list, title, handleChangeListId, currentListId } = props;
  return (
    <RankingNavWrapper>
      {list.length ? <h2 className="title">{title}</h2> : ''}
      <ul>
        {list.map((item: TopListData) => {
          return (
            <li className="item" key={item.id}>
              <div
                className={'avatar' + (currentListId === item.id ? ' active' : '')}
                onClick={() => handleChangeListId(item.id)}
              >
                <div className="img-box">
                  <img src={item.coverImgUrl && getSizeImage(item.coverImgUrl, 40)} alt="" />
                </div>
                <div className="info">
                  <p className="text-nowrap">{item.name}</p>
                  <p className="fre text-nowrap">{item.updateFrequency}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </RankingNavWrapper>
  );
};

export default memo(RankingNav);
