import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { ArtistListWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const ArtistList: FC<IProps> = (): JSX.Element => {
  return <ArtistListWrapper>ArtistList component</ArtistListWrapper>;
};

export default memo(ArtistList);
