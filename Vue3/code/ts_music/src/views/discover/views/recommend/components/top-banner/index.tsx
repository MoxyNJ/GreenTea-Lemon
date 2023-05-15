import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { FC, ReactNode, ElementRef } from 'react';
import { Carousel } from 'antd';
import classNames from 'classnames';

import { shallowEqualApp, useAppSelector } from '@/store';
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const TopBanner: FC<IProps> = (): JSX.Element => {
  /** 当前展示图片 */
  const [currentIndex, setCurrentIndex] = useState(0);
  /** 图片是否在切换动画 */
  const [imgSwitching, setImgSwitching] = useState<boolean>(false);
  /** 图片背景地址 */
  const [bgImageUrl, setBgImageUrl] = useState('');
  /** Banner ref */
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null);

  /** redux store */
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqualApp
  );

  /**图片切换前回调 */
  // 尝试：使用 useCallback，防止该回调函数每次组件渲染都重定义
  const handleBeforeChange = useCallback((current: number, next: number) => {
    // 记录当前显示第几张图片，用做背景图渲染和左右切换
    setCurrentIndex(next);
    // 开始切换图片
    setImgSwitching(true);
  }, []);
  /** 图片切换后回调 */
  const handleAfterChange = useCallback((current: number) => {
    // 结束切换图片
    setImgSwitching(false);
  }, []);

  /**两侧控制按钮 */
  const handleArrClick = (next: 'left' | 'right') => {
    switch (next) {
      case 'left':
        currentIndex === 0
          ? bannerRef.current?.goTo(banners.length - 1, true)
          : bannerRef.current?.goTo(currentIndex - 1, true);
        break;
      case 'right':
        currentIndex === banners.length - 1
          ? bannerRef.current?.goTo(0, true)
          : bannerRef.current?.goTo(currentIndex + 1, true);
        break;
    }
  };

  /** 底部小点按钮 */
  const handleDotsClick = (event: any) => {
    if (event.target.nodeName == 'SPAN') {
      // 寻找点击的span标签下标
      const findBannerIndex = (): number => {
        const list: Node[] = Array.from(event.currentTarget.children);
        for (const item in list) {
          if (list[item].firstChild === event.target) return Number(item);
        }
        return 0;
      };
      // 跳转
      bannerRef.current?.goTo(findBannerIndex(), true);
    }
  };

  /** 获取背景图片 */
  useEffect(() => {
    if (currentIndex >= 0 && banners.length > 0)
      setBgImageUrl(banners[currentIndex].imageUrl + '?imageView&blur=40x20');
  }, [currentIndex, banners]);

  return (
    <BannerWrapper
      style={{
        background: `url('${bgImageUrl}') center center / 6000px`
      }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            autoplay
            dots={false}
            autoplaySpeed={3000}
            effect="fade"
            ref={bannerRef}
            beforeChange={handleBeforeChange}
            afterChange={handleAfterChange}
          >
            {banners?.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                </div>
              );
            })}
          </Carousel>
          <ul className="dots" onClick={(event) => handleDotsClick(event)}>
            {banners?.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item banner_sprite', {
                      active: !imgSwitching && index === currentIndex
                    })}
                  ></span>
                </li>
              );
            })}
          </ul>
        </BannerLeft>
        <BannerRight>
          <a href="https://music.163.com/#/download" target="_blank" rel="noreferrer">
            <div className="SignInInfo">PC 安卓 iPhone WP iPad Mac 六大客户端</div>
            <span className="shadow banner_sprite"></span>
            <span className="shadow shadowr banner_sprite"></span>
          </a>
        </BannerRight>
        <BannerControl>
          <button
            className="btn left banner_sprite"
            onClick={() => handleArrClick('left')}
          ></button>
          <button
            className="btn right banner_sprite"
            onClick={() => handleArrClick('right')}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  );
};

export default memo(TopBanner);
