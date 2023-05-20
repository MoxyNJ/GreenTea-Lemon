import styled from 'styled-components';
import sprite_icon from '@/assets/img/sprite_icon.png';
import playbar_sprite from '@/assets/img/playbar_sprite.png';

export const PlayerVolumeWrapper = styled.div`
  position: absolute;
  left: 88.2%;
  bottom: 40px;
  background-position: 0 -503px;
  height: 118px;

  .container {
    padding-top: 10px;

    .ant-slider {
      height: 88px;

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
        margin-left: -4px;
        background: url(${sprite_icon}) -40px -250px;

        &::after {
          display: none;
        }

        &:hover {
          background-position: -40px -280px;
        }
      }
    }
  }
`;
