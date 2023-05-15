import { getBanners } from '@/service/modules/recommend';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 发起异步请求：获取轮播图数据，
// arg：组件派发dispatch时传入的参数
// getState：可以获取当前store (recommendSlice)中的其他state
export const fetchBannerAction = createAsyncThunk(
  'banners',
  async (arg, { getState, dispatch }) => {
    const res = await getBanners();
    if (res.code !== 200) {
      console.log('getBanners 出错, res:', res);
      return;
    }
    // console.log(res.banners);
    dispatch(changeBannersAction(res.banners));
  }
);

interface IRecommendState {
  banners: any[];
}

const initialState: IRecommendState = {
  banners: []
};

const recommendSlice = createSlice({
  name: 'recommend/banner',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload;
    }
  }
});

// 导出reducer
export default recommendSlice.reducer;

// 导出actions
export const { changeBannersAction } = recommendSlice.actions;
