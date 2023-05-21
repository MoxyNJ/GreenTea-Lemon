import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { HeaderPlayerWrapper } from './styled';

interface IProps {
  children?: ReactNode;
}

const PlayerHeader: FC<{ title: string }> = (props): JSX.Element => {
  const { title } = props;
  return (
    <HeaderPlayerWrapper>
      <h3>{title}</h3>
    </HeaderPlayerWrapper>
  );
};

export default memo(PlayerHeader);
