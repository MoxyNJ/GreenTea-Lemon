import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { PlayerLeft, PlayerRight, PlayerWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const Player: FC<IProps> = (): JSX.Element => {
  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
          <LJPlayerInfo />
        </PlayerLeft>
        <PlayerRight>
          <LJPlayerCoverList />
          <LJPlayerSameSongs />
        </PlayerRight>
      </div>
    </PlayerWrapper>
  );
};

export default memo(Player);
