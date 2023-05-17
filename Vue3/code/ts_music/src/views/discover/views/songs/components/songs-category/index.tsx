import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { SongsCategoryWrapper } from './style';

interface IProps {
  children?: ReactNode;
  catData: any[];
  onCatChange: (cate: string) => void;
}

const SongsCategory: FC<IProps> = (props): JSX.Element => {
  const { catData, onCatChange } = props;

  return (
    <SongsCategoryWrapper>
      <div className="arrow sprite_icon"></div>
      <div className="all">
        <span
          className="link"
          onClick={(e) => {
            return;
          }}
        >
          <span className="link" onClick={(e) => onCatChange('全部')}>
            全部风格
          </span>
        </span>
      </div>
      <div className="category">
        {catData.map((item, index) => {
          return (
            <dl key={item.name} className={'item' + index}>
              <dt>
                <i className="icon sprite_icon2"></i>
                <span>{item.name}</span>
              </dt>
              <dd>
                {item.subs.map((value: any) => {
                  return (
                    <div className="item" key={value.name}>
                      <span className="link">
                        <span className="link" onClick={(e) => onCatChange(value.name)}>
                          {value.name}
                        </span>
                        <span className="divider">|</span>
                      </span>
                    </div>
                  );
                })}
              </dd>
            </dl>
          );
        })}
      </div>
    </SongsCategoryWrapper>
  );
};

export default memo(SongsCategory);
