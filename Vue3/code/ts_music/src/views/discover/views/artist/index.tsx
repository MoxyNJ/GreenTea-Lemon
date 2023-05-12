import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Artist: FC<IProps> = (): JSX.Element => {
  return <div>Artist component</div>;
};

export default memo(Artist);
