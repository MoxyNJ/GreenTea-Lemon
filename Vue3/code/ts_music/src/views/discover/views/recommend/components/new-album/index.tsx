import React, { memo, useEffect, useRef, useState } from 'react';
import type { FC, ReactNode, ElementRef } from 'react';
import { Carousel } from 'antd';
import { AlbumItemWrapper, NewAlbumWrapper } from './style';
import AreaHeaderV1 from '@/components/area-header-v1';
import { useAppSelector } from '@/store';
import { getSizeImage } from '@/utils/format-utils';
import { getNewAlbum } from '@/service/modules/recommend';

interface IProps {
  children?: ReactNode;
}

const NewAlbum: FC<IProps> = () => {
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null);
  const [newAlbumDatas, setNewAlbumDatas] = useState<any[]>([]);

  /** 初始化 */
  useEffect(() => {
    // 获取数据
    (async () => {
      const res = await getNewAlbum();
      if (res.code !== 200) {
        console.log('getNewAlbum 出错');
        return;
      }
      setNewAlbumDatas(res.albums);
    })();
  }, []);

  /** 左侧控制按钮*/
  const handlePrevClick = () => {
    bannerRef.current?.prev();
  };
  /** 右侧控制按钮*/
  const handleNextClick = () => {
    bannerRef.current?.next();
  };

  return (
    <NewAlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button className="sprite_02 arrow arrow-left" onClick={handlePrevClick}></button>
        <div className="banner">
          <Carousel ref={bannerRef} dots={false} speed={1500} autoplay={false}>
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newAlbumDatas.slice(item * 5, (item + 1) * 5).map((album) => {
                      return <AlbumItem key={album.id} itemData={album} />;
                    })}
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        <button className="sprite_02 arrow arrow-right" onClick={handleNextClick}></button>
      </div>
    </NewAlbumWrapper>
  );
};

/** item 光碟子组件 */
const AlbumItem: FC<{ itemData: any }> = (props) => {
  const { itemData } = props;
  return (
    <AlbumItemWrapper>
      <div className="top">
        <img src={getSizeImage(itemData.picUrl, 100)} alt="" />
        <a href="/" className="cover sprite_cover"></a>
        <a href="/" className="play sprite_icon"></a>
      </div>
      <div className="bottom">
        <div className="name text-nowrap">
          <a href="/">{itemData.name}</a>
        </div>
        <div className="artist  text-nowrap">
          <a href="/">{itemData.artist.name}</a>
        </div>
      </div>
    </AlbumItemWrapper>
  );
};

export default memo(NewAlbum);
