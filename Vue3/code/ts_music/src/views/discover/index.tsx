import React, { Suspense, memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet, Link } from 'react-router-dom';
import NavBar from './components/nav-bar';
import AppFooter from '@/components/app-footer';

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
