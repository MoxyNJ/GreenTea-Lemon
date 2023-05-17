import hyRequest from '@/service';

interface Iparams {
  type?: number;
  area?: number;
  initial?: any;
  limit?: number;
  cat?: number;
}

/** 发现/歌手 */
export function getArtistList(area: number, type: number, initial: any) {
  // /artist/list?type=1&area=96&initial=b
  let url = '/artist/list';
  let params: Iparams = { limit: 100 };
  if (area === -1 && type === 1) {
    url = '/top/artists';
  } else {
    if (area === -1) {
      params = { limit: 100, cat: 5001 };
    } else {
      params = {
        type,
        area,
        initial,
        limit: 100
      };
    }
  }

  //  console.log("url:", url, "params:", params);
  return hyRequest.get({
    url,
    params
  });
}
