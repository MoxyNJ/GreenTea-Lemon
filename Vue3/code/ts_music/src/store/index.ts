import { configureStore } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook, useDispatch, shallowEqual } from 'react-redux';

import recommendReducer from '@/views/discover/views/recommend/store';
import playerReducer from '@/views/player/store/player';

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    player: playerReducer
  }
});

type GetStateFnType = typeof store.getState;
export type IRootState = ReturnType<GetStateFnType>;
type DispatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DispatchType = useDispatch;
// 只是为了统一管理，组件不再有通过 react-redux导入方法，全部通过 store/index.ts 导入
export const shallowEqualApp = shallowEqual;

export default store;
