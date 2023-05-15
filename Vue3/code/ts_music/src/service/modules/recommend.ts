import hyRequest from '@/service';

/** 发现音乐/推荐/轮播图数据 */
export const getBanners = () => {
  return hyRequest.get({
    url: './banner'
  });
};

/** 发现音乐/推荐/热门推荐数据 */
export const getHotRecommend = (limit = 10) => {
  return hyRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  });
};

/**发现音乐/推荐/新碟上架数据 */
export function getNewAlbum(limit = 10) {
  return hyRequest.get({
    url: '/album/newest',
    params: {
      limit
    }
  });
}

/** 发现音乐/推荐/榜单 */
export function getPlaylistDetail(id: number) {
  return hyRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  });
}

/** 发现音乐/推荐/入驻歌手 */
export function getArtistList(limit = 30) {
  return hyRequest.get({
    url: '/artist/list',
    params: {
      limit
    }
  });
}

/** 发现音乐/推荐/热门主播 */
export function getDjRadioTopList(limit = 30) {
  return hyRequest.get({
    url: '/dj/toplist',
    params: {
      limit
    }
  });
}
