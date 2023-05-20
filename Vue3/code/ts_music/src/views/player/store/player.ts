import { DEFAULT_PLAY_LIST } from '@/assets/constant';
import { getLyric, getSongDetail } from '@/service/modules/player';
import type { IRootState } from '@/store';
import { getRandomNumber } from '@/utils/math-utils';
import { ILyric, parseLyric } from '@/utils/parse-lyric';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
interface IPlayerState {
  currentSong: any /**歌曲id */;
  lyrics: ILyric[] /**歌词 */;
  lyricIndex: number /** 当前歌词下标 */;
  playSongList: any[] /**播放列表 */;
  playSongIndex: number /**当前歌曲下标 */;
  playMode: number /**播放模式：0:顺序播放 1:随机播放 2:单曲循环 */;
  playVolume: number /**当前音量 */;
  sequence: number /**序列 */;
}

interface IThunkState {
  state: IRootState;
}

/** 网络请求：根据(id)，获取音乐信息 */
export const fetchCurrentSongAction = createAsyncThunk<void, number, IThunkState>(
  'currentSong',
  (id, { dispatch, getState }) => {
    // 准备播放某一首歌曲时, 分成两种情况
    // 【1】判断该歌列表中是否已存在
    const playSongList = getState().player.playSongList;
    const findIndex = playSongList.findIndex((item: { id: number }) => item.id === id);
    if (findIndex === -1) {
      //【1.1】没有找到相同的，获取新歌曲
      // 1.获取歌曲信息
      getSongDetail(id).then((res) => {
        // 1.获取song
        if (!res.songs.length) return;
        const song = res.songs[0];

        // 2.将song放到currentSong中
        const newPlaySongList = [...playSongList];
        newPlaySongList.push(song);
        dispatch(changeCurrentSongAction(song));
        dispatch(changePlaySongListAction(newPlaySongList));
        dispatch(changePlaySongIndexAction(newPlaySongList.length - 1));
      });
    } else {
      //【1.2】找到相同的，列表中拿出
      const song = playSongList[findIndex];
      dispatch(changeCurrentSongAction(song));
      dispatch(changePlaySongIndexAction(findIndex));
    }

    // 2.获取歌词数据
    getLyric(id).then((res: { lrc: { lyric: any } }) => {
      // 1.获取歌词的字符串
      const lyricString = res?.lrc?.lyric || '';
      // 2.对歌词进行解析(一个个对象)
      const lyrics = parseLyric(lyricString);
      // 3.将歌词放到state中
      dispatch(changeLyricsAction(lyrics));
    });
  }
);

/** 切换下一首/上一首歌 */
export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'changemuisc',
  (isNext, { dispatch, getState }) => {
    // 1.获取state中的数据
    const player = getState().player;
    const playMode = player.playMode;
    const songIndex = player.playSongIndex;
    const songList = player.playSongList;

    // 2.根据不同的模式计算不同的下一首歌曲的索引
    let newIndex = songIndex;
    if (playMode === 1) {
      // 随机播放
      newIndex = getRandomNumber(songList.length);
      while (newIndex === songIndex) {
        newIndex = getRandomNumber(songList.length);
      }
    } else {
      // 单曲顺序和顺序播放
      newIndex = isNext ? songIndex + 1 : songIndex - 1;
      if (newIndex > songList.length - 1) newIndex = 0;
      if (newIndex < 0) newIndex = songList.length - 1;
    }

    // 3.获取当前的歌曲
    const song = songList[newIndex];
    dispatch(changeCurrentSongAction(song));
    dispatch(changePlaySongIndexAction(newIndex));

    // 4.请求新的歌词
    getLyric(song.id).then((res) => {
      // 1.获取歌词的字符串
      const lyricString = res.lrc.lyric || '';
      // 2.对歌词进行解析(一个个对象)
      const lyrics = parseLyric(lyricString);
      // 3.将歌词放到state中
      dispatch(changeLyricsAction(lyrics));
    });
  }
);

/** redux 数据格式 */
const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  playSongList: DEFAULT_PLAY_LIST,
  playSongIndex: -1,
  playMode: 2,
  playVolume: 0.15,
  sequence: 0
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload;
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload;
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload;
    },
    changePlaySongIndexAction(state, { payload }) {
      state.playSongIndex = payload;
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload;
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload;
    },
    changePlayVolumeAction(state, { payload }) {
      state.playVolume = payload;
    },
    changeSequenceAction(state, { payload }) {
      state.sequence = payload;
    }
  }
});

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction,
  changePlaySongIndexAction,
  changePlaySongListAction,
  changePlayModeAction,
  changePlayVolumeAction,
  changeSequenceAction
} = playerSlice.actions;
export default playerSlice.reducer;
