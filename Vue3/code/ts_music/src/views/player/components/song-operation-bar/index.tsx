import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { OperationBarWrapper } from './style';

interface IProps {
  children?: ReactNode;
  collectionT: string;
  shareT: string;
  downloadT: string;
  commentT: string;
  changeListSong: (item: any) => void;
  currentSong: number;
}

const SongOperationBar: FC<IProps> = (props): JSX.Element => {
  const { collectionT, shareT, downloadT, commentT, currentSong, changeListSong } = props;

  return (
    <OperationBarWrapper>
      <span className="play">
        <a
          href="/"
          onClick={() => {
            changeListSong(currentSong);
          }}
          className="play-icon sprite_button"
        >
          <span className="playPannel sprite_button">
            <i className="sprite_button"></i>
            <span>播放</span>
          </span>
        </a>
        <a
          href="/"
          onClick={() => {
            changeListSong(currentSong);
          }}
          className="add-icon sprite_button"
        >
          +
        </a>
      </span>
      <a href="/" className="btnItem sprite_button">
        <i className="icon favor-icon sprite_button">{collectionT}</i>
      </a>
      <a href="/" className="btnItem sprite_button">
        <i className="icon share-icon sprite_button">{shareT}</i>
      </a>
      <a href="/" className="btnItem sprite_button">
        <i className="icon download-icon sprite_button">{downloadT}</i>
      </a>
      <a href="/" className="btnItem sprite_button">
        <i className="icon comment-icon sprite_button">{commentT}</i>
      </a>
    </OperationBarWrapper>
  );
};

export default memo(SongOperationBar);
