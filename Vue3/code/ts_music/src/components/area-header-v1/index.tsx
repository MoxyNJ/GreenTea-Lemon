import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { HeaderV1Wrapper } from './style';

interface IProps {
  children?: ReactNode;
  title?: string;
  keywords?: string[];
  moreText?: string;
  moreLink?: string;
}

/**
 * 发现音乐/推荐/热门推荐/子栏目header
 */
const AreaHeaderV1: FC<IProps> = (props) => {
  const { title = '默认标题', keywords = [], moreText = '更多', moreLink = '/' } = props;

  return (
    <HeaderV1Wrapper className="sprite_02">
      <div className="left">
        <a href="/">
          <h3 className="title">{title}</h3>
        </a>
        <div className="keywords">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <a className="link" href="/">
                  {item}
                </a>
                <span className="divider">|</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="right">
        <Link className="more" to={moreLink}>
          {moreText}
        </Link>
        <i className="sprite_02 icon"></i>
      </div>
    </HeaderV1Wrapper>
  );
};

export default memo(AreaHeaderV1);
