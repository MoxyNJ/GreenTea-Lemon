import React, { Suspense, memo } from 'react';
import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '@/router';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import PlayerBar from './player/player-bar';

const Main: FC = (): JSX.Element => {
  return (
    <div className="container">
      <AppHeader />
      <Suspense fallback={'loading component...'}>
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />
      <PlayerBar />
    </div>
  );
};

export default memo(Main);
