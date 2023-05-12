import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Recommend: FC<IProps> = (): JSX.Element => {
  return <div>Recommend component</div>;
};

export default memo(Recommend);
