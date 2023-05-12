import React, { Suspense, memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet, Link } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
}

const Discover: FC<IProps> = (): JSX.Element => {
  return (
    <div>
      <div>Discover component</div>
      <div>
        <Link to="./recommend">推荐</Link>
        <Link to="./ranking">排行榜</Link>
        <Link to="./songs">歌单</Link>
      </div>
      <Suspense fallback={'loading component...'}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default memo(Discover);
