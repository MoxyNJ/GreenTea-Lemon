import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { HeaderLeft, HeaderRight, HeaderWrapper } from './style';
import headerTitles from '@/assets/data/header_titles.json';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface IProps {
  children?: ReactNode;
}

const AppHeader: FC<IProps> = (): JSX.Element => {
  const showItem = (item: any) => {
    // 通过header_titles.json 保存的数据引入，并判断渲染<link>还是<超链接跳转>
    return item.type === 'path' ? (
      <NavLink to={item.link}>
        {item.title}
        <i className="icon sprite_01"></i>
      </NavLink>
    ) : (
      <a href={item.link} rel="noreferrer" target="_blank">
        <span>{item.title}</span>
      </a>
    );
  };

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a className="logo sprite_01" href="/">
            网易云音乐
          </a>
          <div className="select-list">
            {headerTitles.map((item) => {
              return (
                <div className="select-item" key={item.title}>
                  {showItem(item)}
                </div>
              );
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input className="search" placeholder="音乐/视频/电台/用户" prefix={<SearchOutlined />} />
          <span className="center">创作者中心</span>
          <span className="LoginSmall">登录</span>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  );
};

export default memo(AppHeader);
