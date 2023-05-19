import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { PlayerBarWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const PlayerBar: FC<IProps> = (): JSX.Element => {
  return <PlayerBarWrapper>PlayerBar component</PlayerBarWrapper>;
};

export default memo(PlayerBar);
