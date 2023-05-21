import React, { memo, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { PlayerLeft, PlayerRight, PlayerWrapper } from './style';
import PlayerInfo from './components/player-info';
import PlayerCoverList from './components/player-cover-list';
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store';
import PlayerSameSongs from './components/player-same-songs';
import { useSearchParams } from 'react-router-dom';
import { fetchCurrentSongAction } from './store/player';

interface IProps {
  children?: ReactNode;
}

const Player: FC<IProps> = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  /** 列表中切换歌曲 */

  const { currentSong, lyrics } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics
    }),
    shallowEqualApp
  );

  useEffect(() => {
    // const song = searchParams.get('song');
    // if (song) {
    //   dispatch(fetchCurrentSongAction(Number(song)));
    // } else {
    setSearchParams({
      song: currentSong.id
    });
    // }
  }, []);

  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
          <PlayerInfo currentSong={currentSong} lyrics={lyrics} />
        </PlayerLeft>
        <PlayerRight>
          <PlayerCoverList currentSong={currentSong} />
          <PlayerSameSongs currentSong={currentSong} />
        </PlayerRight>
      </div>
    </PlayerWrapper>
  );
};

export default memo(Player);
