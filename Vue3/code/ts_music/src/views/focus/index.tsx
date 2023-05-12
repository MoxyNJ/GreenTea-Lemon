import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Focus: FC<IProps> = (): JSX.Element => {
  return <div>Focus component</div>;
};

export default memo(Focus);
