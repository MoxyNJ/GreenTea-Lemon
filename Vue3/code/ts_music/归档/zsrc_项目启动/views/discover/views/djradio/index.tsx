import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Djradio: FC<IProps> = (): JSX.Element => {
  return <div>Djradio component</div>;
};

export default memo(Djradio);
