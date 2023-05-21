import React, { Suspense, memo, useState } from 'react';
import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '@/router';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import PlayerBar from './player/player-bar';

const Main: FC = (): JSX.Element => {
  // 显示/隐藏底部的bar
  //     visibility: hidden;
  const [showVolumn, setShowVolumn] = useState<boolean>(false);
  const [showPannel, setShowPannel] = useState<boolean>(false);
  const volumnHandle = { showVolumn, setShowVolumn };
  const pannelHandle = { showPannel, setShowPannel };

  // handle func
  const handleShow = () => {
    setShowVolumn(false);
    setShowPannel(false);
  };

  return (
    <div className="container">
      <AppHeader />
      <Suspense fallback={'loading component...'}>
        <div className="main" onClick={(e) => handleShow()}>
          {useRoutes(routes)}
        </div>
      </Suspense>
      <AppFooter handleShow={handleShow} />
      <PlayerBar volumnHandle={volumnHandle} pannelHandle={pannelHandle} />
    </div>
  );
};

export default memo(Main);
