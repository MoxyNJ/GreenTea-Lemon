import styled from 'styled-components';
import sprite_icon from '@/assets/img/sprite_icon.png';
import playbar_sprite from '@/assets/img/playbar_sprite.png';

export const PlayerVolumeWrapper = styled.div`
  position: absolute;
  left: 88%;
  bottom: 46px;
  background-position: 0 -503px;
  height: 113px;
  padding-top: 6px;

  .ant-slider {
    display: 'inline-block';
    height: 92px;

    // 全长
    .ant-slider-rail {
      background: url(${playbar_sprite}) 0 -503px;
    }

    // 已经走的轨迹
    .ant-slider-track {
      background: url(${playbar_sprite}) -40px bottom;
    }

    .ant-slider-handle {
      width: 22px;
      height: 24px;
      border: none;
      margin-left: -9px;
      background: url(${sprite_icon}) 0 -250px;
    }
    .ant-slider-handle:focus {
      border-color: red;
      box-shadow: 0 0 0 5px rgb(255 24 35 / 12%);
    }
  }
`;
