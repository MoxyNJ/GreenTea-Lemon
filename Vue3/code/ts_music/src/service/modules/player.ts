import hyRequest from '@/service';

/** 获取歌单详情 */
export function getSongDetail(ids: number) {
  return hyRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  });
}

/** 获取歌词 */
export function getLyric(id: number) {
  return hyRequest.get({
    url: '/lyric',
    params: {
      id
    }
  });
}

/** 获取相似歌单 */
export function getSimiPlaylist(id: number) {
  return hyRequest.get({
    url: '/simi/playlist',
    params: {
      id
    }
  });
}

/** 获取相似音乐 */
export function getSimiSong(id: number) {
  return hyRequest.get({
    url: '/simi/song',
    params: {
      id
    }
  });
}
