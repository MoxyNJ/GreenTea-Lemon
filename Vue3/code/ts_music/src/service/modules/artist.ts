import hyRequest from '@/service';

interface Iparams {
  type?: number;
  area?: number;
  initial?: any;
  limit?: number;
  cat?: number;
}

/** 发现/歌手/仅推荐歌手表单 */
export function getTopArtistsList(offset = 0, limit = 30) {
  return hyRequest.get({
    url: '/top/artists',
    params: {
      offset,
      limit
    }
  });
}

/** 发现/歌手/其他歌手表单 */
export function getArtistList(area = -1, type = -1, initial?: string, offset = 0, limit = 100) {
  return hyRequest.get({
    url: '/artist/list',
    params: {
      area,
      type,
      offset,
      limit,
      initial: initial ?? ''
    }
  });
}
