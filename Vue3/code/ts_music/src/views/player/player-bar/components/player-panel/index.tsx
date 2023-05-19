import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { PlayerPanelWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const PlayerPanel: FC<IProps> = (): JSX.Element => {
  return <PlayerPanelWrapper>PlayerPanel component</PlayerPanelWrapper>;
};

export default memo(PlayerPanel);
