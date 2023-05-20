import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { RankingListWrapper } from './style';
import { formatMinuteSecond, getSizeImage } from '@/utils/format-utils';
import { useAppDispatch } from '@/store';
import { fetchCurrentSongAction } from '@/views/player/store/player';

interface IProps {
  children?: ReactNode;
  title: string;
  tracks: any[];
  playCount: number;
}

const RankingList: FC<IProps> = (props): JSX.Element => {
  const { title, tracks, playCount } = props;

  const dispatch = useAppDispatch();

  /** 列表中切换歌曲 */
  function changeListSong(item: any) {
    dispatch(fetchCurrentSongAction(item.id));
  }
  return (
    <RankingListWrapper>
      <div className="header">
        <div className="left">
          <span className="title">{title}</span>
          <span className="songNumber">{tracks.length}首歌</span>
        </div>
        <div className="right">
          <span className="default">播放：</span>
          <span className="playNumber">{playCount}</span>
          <span className="default">次</span>
        </div>
      </div>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th className="ranking"></th>
              <th className="title">
                <div className="content">标题</div>
              </th>
              <th className="duration">
                <div className="content">时长</div>
              </th>
              <th className="singer">
                <div className="content">歌手</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((item, index) => {
              return (
                <tr key={item.id} className="item">
                  <td>
                    <div className="num">
                      <span className="text">{index + 1}</span>
                      <span className="iconN sprite_icon2"></span>
                    </div>
                  </td>
                  <td>
                    <div className="info">
                      {index < 3 ? (
                        <img src={getSizeImage(item.al.picUrl, 50)} alt={item.name} />
                      ) : null}
                      <span
                        className="play sprite_table"
                        onClick={(e) => changeListSong(item)}
                      ></span>
                      <span className="title text-nowrap">{item.name}</span>
                    </div>
                  </td>
                  <td className="pannel">
                    <div>
                      <div className="timeP text-nowrap">{formatMinuteSecond(item.dt)}</div>
                      <div className="operate">
                        <button className="btn addto sprite_icon2"></button>
                        <button className="btn collection sprite_table"></button>
                        <button className="btn share sprite_table"></button>
                        <button className="btn download sprite_table"></button>
                      </div>
                    </div>
                  </td>
                  <td>{item.ar[0].name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </RankingListWrapper>
  );
};

export default memo(RankingList);
