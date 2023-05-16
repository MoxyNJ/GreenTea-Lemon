import hyRequest from '@/service';

/** 发现音乐/排行榜/左侧title */
export const getRankingTopList = () => {
  return hyRequest.get({
    url: '/toplist/detail'
  });
};

/** 发现音乐/排行榜 or 歌单/获取排行榜 or 歌单详情 */
export const getPlayListDetail = (id = 19723756) => {
  return hyRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  });
};
