import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { PlayerVolumeWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const PlayerVolume: FC<IProps> = (): JSX.Element => {
  return <PlayerVolumeWrapper>PlayerVolume component</PlayerVolumeWrapper>;
};

export default memo(PlayerVolume);
