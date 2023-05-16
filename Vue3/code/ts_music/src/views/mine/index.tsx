import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { MineWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const Mine: FC<IProps> = (): JSX.Element => {
  return (
    <MineWrapper>
      <div className="content wrap-v2">
        <div className="main">
          <h2>登录网易云音乐</h2>
          <a href="/" className="btn">
            立即登录
          </a>
        </div>
      </div>
    </MineWrapper>
  );
};

export default memo(Mine);
