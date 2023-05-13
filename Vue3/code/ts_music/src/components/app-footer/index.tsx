import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const AppFooter: FC<IProps> = (): JSX.Element => {
  return <div>AppFooter component</div>;
};

export default memo(AppFooter);
