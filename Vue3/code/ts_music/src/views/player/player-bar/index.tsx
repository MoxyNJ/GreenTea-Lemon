import React, { memo, useEffect, useRef, useState } from 'react';
import type { FC, ReactNode, ElementRef } from 'react';
import { Control, Operator, PlayInfo, PlaybarWrapper } from './style';
import { Slider } from 'antd';
import { NavLink } from 'react-router-dom';
import PlayerVolume from './components/player-volume';
import PlayerPanel from './components/player-panel';
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store';
import { formatDate, getPlayUrl, getSizeImage } from '@/utils/format-utils';

interface IProps {
  children?: ReactNode;
}

const PlayerBar: FC<IProps> = (): JSX.Element => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSliding, setIsSliding] = useState(false);

  const { currentSong, lyrics, lyricIndex, playMode } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex,
      playMode: state.player.playMode
    }),
    shallowEqualApp
  );
  const dispatch = useAppDispatch();

  /** 组件内值 */
  const picUrl = (currentSong.al && currentSong.al.picUrl) || '';
  const songName = currentSong.name || '未知歌曲';
  const singerName = (currentSong.ar && currentSong.ar[0].name) || '未知歌手';
  const duration = currentSong.dt || 0;
  const showDuration = formatDate(duration, 'mm:ss');
  const showCurrentTime = formatDate(currentTime * 1000, 'mm:ss');

  useEffect(() => {
    // 播放音乐
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    audioRef.current!.src = getPlayUrl(currentSong.id);
    // audioRef.current
    //   ?.play()
    //   .then(() => {
    //     setIsPlaying(true);
    //     console.log('播放成功');
    //   })
    //   .catch((err: string) => {
    //     setIsPlaying(false);
    //     console.log('播放失败', err);
    //   });
  }, [currentSong]);

  // /** 音乐播放的进度处理 */
  // function handleTimeUpdate() {
  //   // 1.获取当前的播放时间
  //   const currentTime = audioRef.current!.currentTime * 1000;

  //   // 2.计算当前歌曲进度
  //   if (!isSliding) {
  //     const progress = (currentTime / duration) * 100;
  //     setProgress(progress);
  //     setCurrentTime(currentTime);
  //   }

  //   // 3.根据当前的时间匹配对应的歌词
  //   // currentTime/lyrics
  //   let index = lyrics.length - 1;
  //   for (let i = 0; i < lyrics.length; i++) {
  //     const lyric = lyrics[i];
  //     if (lyric.time > currentTime) {
  //       index = i - 1;
  //       break;
  //     }
  //   }

  //   // 4.匹配上对应的歌词的index
  //   if (lyricIndex === index || index === -1) return;
  //   dispatch(changeLyricIndexAction(index));

  //   // 5.展示对应的歌词
  //   message.open({
  //     content: lyrics[index].text,
  //     key: 'lyric',
  //     duration: 0
  //   });
  // }

  // function handleTimeEnded() {
  //   if (playMode === 2) {
  //     audioRef.current!.currentTime = 0;
  //     audioRef.current?.play();
  //   } else {
  //     handleChangeMusic(true);
  //   }
  // }

  /** 按钮：切换音乐 */
  const changeMusic = (tag: -1 | 0 | 1) => {
    return;
  };

  /** 按钮：切换播放状态 */
  const playMusic = () => {
    console.log(isPlaying);

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        ?.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.log('播放失败:', e);
          setIsPlaying(false);
        });
    }
  };

  function handleSliderChanging(value: number) {
    // 0.目前是处于拖拽状态
    setIsSliding(true);

    // 1.设置progress
    setProgress(value);

    // 2.获取value对应位置的时间
    const currentTime = (value / 100) * duration;
    setCurrentTime(currentTime);
  }

  function handleSliderChanged(value: number) {
    // 1.获取点击位置的时间
    const currentTime = (value / 100) * duration;

    // 2.设置当前播放的时间
    audioRef.current!.currentTime = currentTime / 1000;

    // 3.currentTime/progress
    setCurrentTime(currentTime);
    setProgress(value);
    setIsSliding(false);
  }

  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control $isPlaying={isPlaying}>
          <button
            className="sprite_playbar prev"
            onClick={(e) => {
              changeMusic(-1);
            }}
          ></button>
          <button className="sprite_playbar play" onClick={(e) => playMusic()}></button>
          <button
            className="sprite_playbar next"
            onClick={(e) => {
              changeMusic(1);
            }}
          ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/player">
              <img src={getSizeImage(picUrl, 35)} alt="音乐封面" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <a href="/todo" className="song-name">
                {songName}
              </a>
              <a href="/todo" className="singer-name">
                {singerName}
              </a>
            </div>
            <div className="progress">
              <Slider
                step={0.5}
                value={progress}
                tooltip={{ formatter: null }}
                onChange={handleSliderChanging}
                onAfterChange={handleSliderChanged}
                // onChange={sliderChange}
                // onAfterChange={sliderAfterChange}
              />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{showDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        {/* <Operator $sequence={sequence}> */}
        <Operator $sequence={1}>
          <div className="left">
            <button className="playerbar_pip btn pip"></button>
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button
              className="sprite_playbar btn volume"
              // onClick={(e) => setShowVolumn(!showVolumn)}
            ></button>
            <button
              className="sprite_playbar btn loop"
              onClick={(e) => {
                // changeSequence();
              }}
            ></button>
            <button
              className="sprite_playbar btn playlist"
              // onClick={(e) => setShowPannel(!showPannel)}
            >
              {/* {playList.length} */}
            </button>
          </div>
        </Operator>
        <audio
          ref={audioRef}
          //  onTimeUpdate={handleTimeUpdate} onEnded={handleTimeEnded}
        />
        {/* {showVolumn && <PlayerVolume />}
        {showPannel && <PlayerPanel />} */}
      </div>
    </PlaybarWrapper>
  );
};

export default memo(PlayerBar);
