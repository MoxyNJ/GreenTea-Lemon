import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { FocusWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const Focus: FC<IProps> = (): JSX.Element => {
  return (
    <FocusWrapper>
      <div className="content wrap-v2">
        <div className="main">
          <div className="info">
            你可以关注明星和好友品味他们的私房歌单
            <br />
            通过他们的动态发现更多精彩音乐
          </div>
          <a href="/" className="btn">
            立即登录
          </a>
        </div>
      </div>
    </FocusWrapper>
  );
};

export default memo(Focus);
