import React, { memo, useEffect, useRef, useState } from 'react';
import type { FC, ReactNode, ElementRef } from 'react';
import { Control, Operator, PlayInfo, PlaybarWrapper } from './style';
import { Slider, message } from 'antd';
import { NavLink } from 'react-router-dom';
import PlayerVolume from './components/player-volume';
import PlayerPanel from './components/player-panel';
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store';
import { formatTime, getPlayUrl, getSizeImage } from '@/utils/format-utils';
import {
  changeLyricIndexAction,
  changeMusicAction,
  changePlayModeAction,
  fetchCurrentSongAction
} from '../store/player';
import picSize35 from '@/assets/img/picSize35.png';

interface IProps {
  children?: ReactNode;
  volumnHandle: {
    showVolumn: boolean;
    setShowVolumn: React.Dispatch<React.SetStateAction<boolean>>;
  };
  pannelHandle: {
    showPannel: boolean;
    setShowPannel: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

interface ISongInfo {
  picUrl: string /** 歌曲图片地址 */;
  songName: string /** 歌曲名*/;
  singerName: string /** 歌曲歌手名*/;
  duration: number /**歌曲总时长(毫秒) */;
  formatDuration: string /**  格式化歌曲总时长：分：秒 */;
}

/** 初始化当前播放歌曲 */
const defaultSongInfo: ISongInfo = {
  picUrl: '',
  songName: '未知歌曲',
  singerName: '未知歌手',
  duration: 0,
  formatDuration: '00:00'
};

const PlayerBar: FC<IProps> = (props): JSX.Element => {
  const {
    volumnHandle: { showVolumn, setShowVolumn },
    pannelHandle: { showPannel, setShowPannel }
  } = props;
  const audioRef = useRef<HTMLAudioElement>(null);

  const { currentSong, lyrics, lyricIndex, playMode, playVolume, playSongList } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong /**歌曲id */,
      lyrics: state.player.lyrics /**歌词 */,
      lyricIndex: state.player.lyricIndex,
      playMode: state.player.playMode /** 播放模式 */,
      playVolume: state.player.playVolume,
      playSongList: state.player.playSongList
    }),
    shallowEqualApp
  );
  const dispatch = useAppDispatch();

  /** 当前音乐基本信息 */
  const [songInfo, setSonginfo] = useState<ISongInfo>(defaultSongInfo);
  /** 当前是否在播放音乐 */
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  /** 当前音乐已播放时间(毫秒) */
  const [currentTime, setCurrentTime] = useState<number>(0);
  /** 当前音乐已播放进度([0, 100]) */
  const [progress, setProgress] = useState<number>(0);
  /** 用户是否正在拖动滑动条  */
  const [isSliding, setIsSliding] = useState(false);

  /** 初始：默认播放歌单中最后一首歌 */
  useEffect(() => {
    dispatch(fetchCurrentSongAction(playSongList[playSongList.length - 1].id));
  }, []);

  /** 切换音量 */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = playVolume;
  }, [playVolume]);

  /** 切换当前播放音乐 */
  useEffect(() => {
    /**  播放音乐 */
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    audioRef.current!.src = getPlayUrl(currentSong.id);
    audioRef.current
      ?.play()
      .then(() => {
        setIsPlaying(true);
        console.log('播放成功');
      })
      .catch((err: string) => {
        setIsPlaying(false);
        console.log('播放失败', err);
      });

    /** 获取音乐基本信息 */
    const duration = currentSong.dt || 0;
    setSonginfo({
      picUrl: (currentSong.al && currentSong.al.picUrl) || '',
      songName: currentSong.name || '未知歌曲',
      singerName: (currentSong.ar && currentSong.ar[0].name) || '未知歌手',
      duration: duration,
      formatDuration: formatTime(duration)
    });
  }, [currentSong]);

  /**
   * 音乐正在播放时，周期性调用该回调
   * 作用：
   * （1）调整progress：播放进度条
   * （2）调整currentTime：当前播放时长
   */
  function handleTimeUpdate() {
    // 1.获取当前的播放时间：秒 * 1000 ==>毫秒
    const cTime = (audioRef.current?.currentTime || 0) * 1000;

    // 2.计算当前歌曲进度
    // 如果用户正在拖动进度条，则不自动更新播放进度
    if (!isSliding) {
      // progress 取值：0-100
      const progress = (cTime / songInfo.duration) * 100;
      setProgress(progress);
      setCurrentTime(cTime);
    }

    // 3.根据当前的时间匹配对应的歌词
    let index = lyrics.length - 1;
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i];
      if (lyric.time > cTime) {
        index = i - 1;
        break;
      }
    }

    // 4.匹配上对应的歌词的index
    if (lyricIndex === index || index === -1) return;
    dispatch(changeLyricIndexAction(index));

    const currentLyric = lyrics[index];

    // 5.展示对应的歌词
    message.open({
      content: currentLyric.content,
      key: 'lyric',
      duration: 0,
      className: 'lyric-message'
    });
  }

  /** 播放结束，切换至下一首 */
  function handleTimeEnded() {
    if (playMode === 2) {
      // 单曲循环，重新开始
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      audioRef.current!.currentTime = 0;
      audioRef.current?.play();
    } else {
      handleChangeMusic(true);
    }
  }

  /** 按钮：切换音乐 */
  const handleChangeMusic = (isNext: boolean) => {
    dispatch(changeMusicAction(isNext));
  };

  /** 按钮：切换播放状态 */
  const playMusic = () => {
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

  /** 滑动条按下时触发 */
  function handleSliderChanging(value: number) {
    // 上锁：处于拖拽状态
    setIsSliding(true);

    // 实时渲染拖动位置：进度条位置 + 右侧当前播放时长
    setProgress(value);
    setCurrentTime((value / 100) * songInfo.duration);
  }

  /** 滑动条松手时触发 */
  function handleSliderChanged(value: number) {
    // 获取点击位置的时间
    const cTime = (value / 100) * songInfo.duration;
    // 修改当前播放时间
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    audioRef.current!.currentTime = cTime / 1000;

    // 更新state
    setProgress(value);
    setCurrentTime(cTime);
    setIsSliding(false);
  }

  /** 播放按钮切换 */
  function changePlayMode() {
    // 0、1、2
    const newPM = playMode === 2 ? 0 : playMode + 1;
    dispatch(changePlayModeAction(newPM));
  }

  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control $isPlaying={isPlaying}>
          <button
            className="sprite_playbar prev"
            onClick={(e) => {
              handleChangeMusic(false);
            }}
          ></button>
          <button className="sprite_playbar play" onClick={(e) => playMusic()}></button>
          <button
            className="sprite_playbar next"
            onClick={(e) => {
              handleChangeMusic(true);
            }}
          ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/player">
              <img
                src={songInfo.picUrl ? getSizeImage(songInfo.picUrl, 35) : picSize35}
                alt="音乐封面"
              />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <a href="/todo" className="song-name">
                {songInfo.songName}
              </a>
              <a href="/todo" className="singer-name">
                {songInfo.singerName}
              </a>
            </div>
            <div className="progress">
              <Slider
                step={0.4}
                value={progress}
                tooltip={{ formatter: null }}
                onChange={handleSliderChanging}
                onAfterChange={handleSliderChanged}
              />
              <div className="time">
                <span className="now-time">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{songInfo.formatDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator $sequence={playMode}>
          <div className="left">
            <button className="playerbar_pip btn pip"></button>
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button
              className="sprite_playbar btn volume"
              onClick={(e) => setShowVolumn(!showVolumn)}
            ></button>
            <button
              className="sprite_playbar btn loop"
              onClick={(e) => {
                changePlayMode();
              }}
            ></button>
            <button
              className="sprite_playbar btn playlist"
              onClick={(e) => setShowPannel(!showPannel)}
            >
              {playSongList.length}
            </button>
          </div>
        </Operator>
        <audio
          ref={audioRef}
          // 回调：音乐正在播放会周期性触发
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleTimeEnded}
        />
        {showVolumn && <PlayerVolume />}
        {showPannel && <PlayerPanel />}
      </div>
    </PlaybarWrapper>
  );
};

export default memo(PlayerBar);
