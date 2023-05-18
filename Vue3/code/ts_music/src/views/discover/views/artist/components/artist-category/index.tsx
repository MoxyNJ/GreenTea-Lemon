import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { CategoryItem, CategoryWrapper } from './style';
import { artistCategories } from '@/assets/data/local_data';
import { IParam } from '../..';

interface IProps {
  children?: ReactNode;
  param: IParam;
  changeArtist: (param: IParam) => void;
}

const ArtistCategory: FC<IProps> = (props): JSX.Element => {
  const { param, changeArtist } = props;

  /**
   *  把每个大类中的小类提取出来
   */
  const renderArtist = (localArtists: any[], localArea: any) => {
    return (
      <div>
        {localArtists.map((item, index) => {
          // 判断是否被选中，area + type
          const isSelect = param.area === localArea && param.type === item.type;
          return (
            <CategoryItem key={item.name} className={isSelect ? 'active' : ''}>
              {/* 如果选中后，保存param，进而list组件获取数据 */}
              <span
                onClick={(e) =>
                  changeArtist({
                    name: item.name,
                    area: localArea,
                    type: item.type
                  })
                }
              >
                {item.name}
              </span>
            </CategoryItem>
          );
        })}
      </div>
    );
  };
  return (
    <CategoryWrapper>
      {/* 左侧导航的数据是本地提前保存的，直接拿来用。 */}
      {artistCategories.map((localItem, index) => {
        return (
          <div className="section" key={localItem.area}>
            <h2 className="title">{localItem.title}</h2>
            {renderArtist(localItem.artists, localItem.area)}
          </div>
        );
      })}
    </CategoryWrapper>
  );
};

export default memo(ArtistCategory);
