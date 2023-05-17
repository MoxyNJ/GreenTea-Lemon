import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { SongsMainWrapper } from './style';
import ThemePagination from '@/components/theme-pagination';
import AlbumCover from '../../../album/components/album-cover';
import PicCoverV1 from '@/components/pic-cover-v1';

interface IProps {
  children?: ReactNode;
  playlists: any[];
  currentPage: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const SongsMain: FC<IProps> = (props): JSX.Element => {
  const { playlists, currentPage, total, pageSize, onPageChange } = props;

  return (
    <SongsMainWrapper>
      <div className="songs-list">
        {playlists.map((item, index) => {
          return (
            <PicCoverV1
              info={item}
              key={index}
              size={140}
              rightMargin={30}
              bottomMargin={10}
              showName={true}
            />
          );
        })}
      </div>
      <ThemePagination
        currentPage={currentPage}
        total={total}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </SongsMainWrapper>
  );
};

export default memo(SongsMain);
