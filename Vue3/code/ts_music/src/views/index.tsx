import React, { Suspense, memo } from 'react';
import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '@/router';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';

const Main: FC = (): JSX.Element => {
  return (
    <div className="container">
      <AppHeader />
      <Suspense fallback={'loading component...'}>
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />
    </div>
  );
};

export default memo(Main);
