import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { PlayerPanelWrapper } from './style';
import PlayerHeader from './compoents/player-header';
import PlayerList from './compoents/player-list';
import PlayerLyric from './compoents/player-lyric';

interface IProps {
  children?: ReactNode;
}

const PlayerPanel: FC<IProps> = (): JSX.Element => {
  return (
    <PlayerPanelWrapper>
      <PlayerHeader />
      <div className="main">
        <img className="image" src="" alt="" />
        <PlayerList />
        <PlayerLyric />
      </div>
    </PlayerPanelWrapper>
  );
};

export default memo(PlayerPanel);
