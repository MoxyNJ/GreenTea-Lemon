import React, { memo, useEffect, useRef, useState } from 'react';
import type { FC, ReactNode, ElementRef } from 'react';
import { Carousel } from 'antd';
import { NewAlbumWrapper } from './style';
import AreaHeaderV1 from '@/components/area-header-v1';
import { getSizeImage } from '@/utils/format-utils';
import { getNewAlbum } from '@/service/modules/recommend';
import AlbumCover from '@/components/album-cover';

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
                    {/* 第一组是图片0-4，第二组是图片5-9 */}
                    {newAlbumDatas.slice(item * 5, (item + 1) * 5).map((album) => {
                      return <AlbumCover key={album.id} itemData={album} />;
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

export default memo(NewAlbum);
