import hyRequest from '..';

/**
 * 发现音乐/歌单/获取歌单
 * eg:/top/playlist?order=hot&cat=夜晚&limit=35&offset=35
 */
export function getTopPlayList(order = 'hot', cat = '全部', limit = 35, offset = 35) {
  return hyRequest.get({
    url: '/top/playlist',
    params: {
      order,
      cat,
      limit,
      offset
    }
  });
}

/** 获取歌单的全部分类 */
export function getTopPlayListCategory() {
  return hyRequest.get({
    url: '/playlist/catlist'
  });
}
