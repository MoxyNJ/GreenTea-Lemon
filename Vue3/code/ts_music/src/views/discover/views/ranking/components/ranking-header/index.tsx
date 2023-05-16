import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { RankingHeaderWrapper, SongOperationBarWrapper } from './style';
import { RankingTopInfo } from '../..';
import { formatMonthDay, getSizeImage } from '@/utils/format-utils';

interface IProps {
  children?: ReactNode;
  playList: RankingTopInfo;
  updateFrequency: string;
}

const RankingHeader: FC<IProps> = (props): JSX.Element => {
  const { playList, updateFrequency } = props;

  return (
    <RankingHeaderWrapper>
      <div className="image">
        <img src={getSizeImage(playList.coverImgUrl, 150)} alt={playList.name} />
        <div className="mask sprite_cover"></div>
      </div>
      <div className="info">
        <div className="name">{playList.name}</div>
        <div className="time">
          <i className="icon sprite_icon2"></i>
          <span className="flash">最近更新：{formatMonthDay(playList.trackUpdateTime)}</span>
          <span className="regular">（{updateFrequency}）</span>
        </div>
        <SongOperationBar
          subscribedCount={playList.subscribedCount}
          shareCount={playList.shareCount}
          download="下载"
          commentCount={playList.commentCount}
        />
      </div>
    </RankingHeaderWrapper>
  );
};

interface SongOperationBarProps {
  children?: ReactNode;
  shareCount: string;
  download: string;
  commentCount: string;
  subscribedCount: string;
}

/** 小操作组件 */
const SongOperationBar: FC<SongOperationBarProps> = (props): JSX.Element => {
  const { subscribedCount, shareCount, download, commentCount } = props;
  return (
    <SongOperationBarWrapper>
      <span className="play">
        <a href="/todo" className="play-icon sprite_button">
          <span className="play sprite_button">
            <i className="sprite_button"></i>
            <span>播放</span>
          </span>
        </a>
        <a href="/todo" className="add-icon sprite_button">
          +
        </a>
      </span>
      <a href="/todo" className="item sprite_button">
        <i className="icon favor-icon sprite_button">({subscribedCount})</i>
      </a>
      <a href="/todo" className="item sprite_button">
        <i className="icon share-icon sprite_button">({shareCount})</i>
      </a>
      <a href="/todo" className="item sprite_button">
        <i className="icon download-icon sprite_button">{download}</i>
      </a>
      <a href="/todo" className="item sprite_button">
        <i className="icon comment-icon sprite_button">({commentCount})</i>
      </a>
    </SongOperationBarWrapper>
  );
};

export default memo(RankingHeader);
