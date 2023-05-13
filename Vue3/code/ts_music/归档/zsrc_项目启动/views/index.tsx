import React, { Suspense, memo } from 'react';
import type { FC } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import routes from '@/router';
import { useAppSelector, useAppDispatch, shallowEqualApp } from '@/store';
import { changeMessageAction } from '@/store/modules/counter';
import Demo from './discover/views/demo';

const Main: FC = (): JSX.Element => {
  const { count, message } = useAppSelector(
    (state) => ({
      count: state.counter.count,
      message: state.counter.message
    }),
    shallowEqualApp
  );

  const dispatch = useAppDispatch();
  const handleChangeMessage = () => {
    dispatch(changeMessageAction('数据修改'));
  };

  return (
    <div className="container">
      <div className="nav">
        <Link to="./discover">发现音乐</Link>
        <Link to="./mine">我的</Link>
      </div>
      <div>当前计数：{count}</div>
      <div>当前消息：{message}</div>
      <Demo name={'Ninjee Hou'}></Demo>
      <button onClick={handleChangeMessage}>修改message</button>
      <Suspense fallback={'loading component...'}>
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  );
};

export default memo(Main);
