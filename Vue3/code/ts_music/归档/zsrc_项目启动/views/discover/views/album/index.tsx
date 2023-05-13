import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Album: FC<IProps> = (): JSX.Element => {
  return <div>Album component</div>;
};

export default memo(Album);
