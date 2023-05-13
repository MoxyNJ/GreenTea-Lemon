import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Mine: FC<IProps> = (): JSX.Element => {
  return <div>Mine component</div>;
};

export default memo(Mine);
