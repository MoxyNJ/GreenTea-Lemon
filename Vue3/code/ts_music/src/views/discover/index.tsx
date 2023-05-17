import NavBar from '@/components/nav-bar';
import React, { Suspense, memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
}

const Discover: FC<IProps> = (): JSX.Element => {
  return (
    <div>
      <NavBar />
      <Suspense fallback={'loading component...'}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default memo(Discover);
