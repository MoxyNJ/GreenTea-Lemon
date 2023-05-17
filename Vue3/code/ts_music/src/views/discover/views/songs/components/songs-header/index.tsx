import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { HeaderLeftWrapper, HeaderRightWrapper, SongsHeaderWrapper } from './style';
import SongsCategory from '../songs-category';

interface IProps {
  children?: ReactNode;
  showCat?: boolean;
  setShowCat: React.Dispatch<boolean>;
  currentCat: string;
  catData: any[];
  onCatChange: (cate: string) => void;
}

const SongsHeader: FC<IProps> = (props): JSX.Element => {
  const { showCat, setShowCat, currentCat, catData, onCatChange } = props;

  return (
    <SongsHeaderWrapper>
      <HeaderLeftWrapper>
        <span className="title">{currentCat}</span>
        <button
          className="select"
          onClick={(e) => {
            e.stopPropagation();
            setShowCat(!showCat);
          }}
        >
          <span>选择分类</span>
          <i className="sprite_icon2"></i>
        </button>
        {showCat ? <SongsCategory catData={catData} onCatChange={onCatChange} /> : null}
      </HeaderLeftWrapper>
      <HeaderRightWrapper>
        <button className="hot">热门</button>
      </HeaderRightWrapper>
    </SongsHeaderWrapper>
  );
};

export default memo(SongsHeader);
