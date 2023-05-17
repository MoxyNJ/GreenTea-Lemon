import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { CategoryItem, CategoryWrapper } from './style';
import { artistCategories } from '@/assets/data/local_data';
import { ICurrentType } from '../..';

interface IProps {
  children?: ReactNode;
  currentArea?: number;
  currentType: ICurrentType;
  changeArtist: (area: number, item: ICurrentType) => void;
}

const ArtistCategory: FC<IProps> = (props): JSX.Element => {
  const { currentArea, currentType, changeArtist } = props;

  /**
   *  把每个大类中的小类提取出来
   */
  const renderArtist = (artists: any[], area: any) => {
    return (
      <div>
        {artists.map((item, index) => {
          // 判断是否被选中，要大类area和小类type都相符合。
          const isSelect = currentArea === area && currentType.type === item.type;
          return (
            <CategoryItem key={item.name} className={isSelect ? 'active' : ''}>
              {/* 如果选中后，就会dispatch area & type，从而让list组件获取详细歌手数据 */}
              <span onClick={(e) => changeArtist(area, item)}>{item.name}</span>
            </CategoryItem>
          );
        })}
      </div>
    );
  };
  return (
    <CategoryWrapper>
      {/* 左侧导航的数据是本地提前保存的，直接拿来用。 */}
      {artistCategories.map((item, index) => {
        return (
          <div className="section" key={item.area}>
            <h2 className="title">{item.title}</h2>
            {renderArtist(item.artists, item.area)}
          </div>
        );
      })}
    </CategoryWrapper>
  );
};

export default memo(ArtistCategory);
