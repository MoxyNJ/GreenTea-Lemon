import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Songs: FC<IProps> = (): JSX.Element => {
  return <div>Songs component</div>;
};

export default memo(Songs);
