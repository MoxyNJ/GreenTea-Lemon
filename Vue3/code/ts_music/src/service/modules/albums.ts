import hyRequest from '@/service';

/** 发现音乐/新碟上架/热门新碟 */
export const getHotNewAlbum = (limit = 10) => {
  return hyRequest.get({
    url: '/album/list',
    params: {
      limit
    }
  });
};
