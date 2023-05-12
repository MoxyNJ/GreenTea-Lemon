import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Download: FC<IProps> = (): JSX.Element => {
  return <div>Download component</div>;
};

export default memo(Download);
