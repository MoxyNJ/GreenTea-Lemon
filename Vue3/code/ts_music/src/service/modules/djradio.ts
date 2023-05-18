import hyRequest from '@/service';

// 按照页面的顺序从上至下
/**1 电台栏目 */
export const getDjRadioCatelist = () => {
  return hyRequest.get({
    url: '/dj/catelist'
  });
};

/**2 优秀新电台 */
export const getDjRadioRecommend = (type: number) => {
  return hyRequest.get({
    url: '/dj/recommend/type',
    params: {
      type
    }
  });
};

/**3 电台排行榜 */
export const getDjRadios = (cateId: number, limit: number, offset: number) => {
  return hyRequest.get({
    url: '/dj/radio/hot',
    params: {
      cateId,
      limit,
      offset
    }
  });
};
