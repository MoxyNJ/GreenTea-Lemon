import React, { memo, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import hyRequest from '@/service';

interface IProps {
  children?: ReactNode;
}

const Recommend: FC<IProps> = (): JSX.Element => {
  // 测试网络请求
  useEffect(() => {
    hyRequest
      .get({
        url: './banner'
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  return <div>Recommend component</div>;
};

export default memo(Recommend);
