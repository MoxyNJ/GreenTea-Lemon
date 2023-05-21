import React, { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { InfoLeftWrapper, InfoRightWrapper, InfoWrapper } from './style';
import SongOperationBar from '../song-operation-bar';
import { getSizeImage } from '@/utils/format-utils';
import { useAppDispatch } from '@/store';
import { fetchCurrentSongAction } from '../../store/player';

interface IProps {
  children?: ReactNode;
  currentSong: any;
  lyrics: any[];
}

const PlayerInfo: FC<IProps> = ({ currentSong, lyrics }): JSX.Element => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  /** 列表中切换歌曲 */
  function changeListSong(item: any) {
    dispatch(fetchCurrentSongAction(item.id));
  }

  return (
    <InfoWrapper>
      <InfoLeftWrapper>
        <div className="image">
          <img
            src={getSizeImage(currentSong.al && currentSong.al.picUrl, 130)}
            alt={currentSong.name}
          />
          <span className="cover image_cover"></span>
        </div>
        <div className="link">
          <i className="sprite_icon2"></i>
          <a
            href="/"
            onClick={() => {
              changeListSong(currentSong);
            }}
          >
            生成外链播放器
          </a>
        </div>
      </InfoLeftWrapper>
      <InfoRightWrapper $isSpread={isShow}>
        <div className="header">
          <i className="sprite_icon2"></i>
          <h3 className="title">{currentSong.name}</h3>
        </div>
        <div className="item">
          <span className="label">歌手：</span>
          <a href="/todo" className="name">
            {currentSong.ar && currentSong.ar[0].name}
          </a>
        </div>
        <div className="item">
          <span className="label">所属专辑：</span>
          <a href="/todo" className="name">
            {currentSong.al && currentSong.al.name}
          </a>
        </div>

        <SongOperationBar
          collectionT="收藏"
          shareT="分享"
          downloadT="下载"
          commentT={`(${currentSong.dt})`}
          currentSong={currentSong}
          changeListSong={changeListSong}
        />

        <div className="lyric">
          <div className="lyric-info">
            {lyrics.slice(0, isShow ? lyrics.length : 13).map((item, index) => {
              return (
                <p key={item.time} className="text">
                  {item.content}
                </p>
              );
            })}
          </div>
          <button className="lyric-control" onClick={(e) => setIsShow(!isShow)}>
            {isShow ? '收起' : '展开'}
            <i className="sprite_icon2"></i>
          </button>
        </div>
      </InfoRightWrapper>
    </InfoWrapper>
  );
};

export default memo(PlayerInfo);
