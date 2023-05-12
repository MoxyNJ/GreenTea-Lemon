import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Ranking: FC<IProps> = (): JSX.Element => {
  return <div>Ranking component</div>;
};

export default memo(Ranking);
