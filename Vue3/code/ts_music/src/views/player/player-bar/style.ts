import styled from 'styled-components';
import progress_bar from '@/assets/img/progress_bar.png';
import sprite_icon from '@/assets/img/sprite_icon.png';

/** 最外层 */
export const PlaybarWrapper = styled.div`
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  height: 52px;
  background-position: 0 0;
  background-repeat: repeat;

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 47px;
  }
`;

/** 左侧：控制按钮 */
export const Control = styled.div<{
  $isPlaying: boolean;
}>`
  display: flex;
  align-items: center;

  .prev,
  .next {
    width: 28px;
    height: 28px;
    margin-top: 3px;
  }

  .prev {
    background-position: 0 -130px;
    cursor: pointer;
  }

  .play {
    width: 36px;
    height: 36px;
    margin: 0 8px;
    background-position: 0 ${(props) => (props.$isPlaying ? '-165px' : '-204px')};
    cursor: pointer;
  }

  .next {
    background-position: -80px -130px;
    cursor: pointer;
  }

  .prev:hover {
    background-position: -30px -130px;
  }

  .play:hover {
    background-position: -40px ${(props) => (props.$isPlaying ? '-165px' : '-204px')};
    /* -40px -204px; 播放 */
    /* -40px -165px; 暂停 */
  }

  .next:hover {
    background-position: -110px -130px;
  }
`;

/** 中间：进度条 */
export const PlayInfo = styled.div`
  display: flex;
  width: 580px;
  align-items: center;
  margin-right: 20px;

  .image {
    width: 34px;
    height: 34px;
    border-radius: 5px;

    img {
      height: 35px;
      width: 35px;
    }
  }

  .info {
    flex: 1;
    margin-left: 10px;

    .song {
      position: relative;
      top: 8px;
      left: 8px;
      .song-name {
        color: #e8e8e8;
      }

      .singer-name {
        color: #9b9b9b;
        margin-left: 10px;
      }
    }

    .progress {
      display: flex;
      align-items: center;

      .ant-slider {
        width: 470px;
        margin-right: 10px;

        .ant-slider-rail {
          height: 9px;
          background: url(${progress_bar}) right 0;
        }

        .ant-slider-track {
          height: 9px;
          background: url(${progress_bar}) left -66px;
        }

        .ant-slider-handle {
          width: 22px;
          height: 24px;
          border: none;
          margin-top: -5px;
          background: url(${sprite_icon}) 0 -250px;

          &::after {
            display: none;
          }
        }

        .ant-slider-handle:hover {
          background-position: 0 -280px;
        }
      }

      .time {
        .now-time {
          color: #a1a1a1;
        }
        .duration {
          color: #797979;
        }
        .divider {
          margin: 0 3px;
        }
      }
    }
  }
`;

/** 右侧：其他操作 */
export const Operator = styled.div<{
  $sequence: number;
}>`
  display: flex;
  position: relative;
  top: 5px;
  padding-bottom: 6px;

  .btn {
    margin-left: 3px;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  .left {
    padding-right: 8px;
    .pip {
      background-position-y: 0;
    }

    .favor {
      background-position: -88px -163px;
    }

    .share {
      background-position: -114px -163px;
    }

    .pip:hover {
      background-position-y: -25px;
    }

    .favor:hover {
      background-position: -88px -189px;
    }

    .share:hover {
      background-position: -114px -189px;
    }
  }

  .right {
    display: flex;
    align-items: center;
    width: 126px;
    box-sizing: border-box;
    padding-left: 13px;
    padding-bottom: 3px;
    background-position: -147px -248px;

    .volume {
      background-position: -2px -248px;
    }

    .volume:hover {
      background-position: -31px -248px;
    }

    .loop {
      background-position: ${(props) => {
        switch (props.$sequence) {
          case 1:
            return '-66px -248px';
          case 2:
            return '-66px -344px';
          default:
            return '-3px -344px';
        }
      }};
    }

    .loop:hover {
      background-position: ${(props) => {
        switch (props.$sequence) {
          case 1:
            return '-93px -248px;';
          case 2:
            return '-93px -344px';
          default:
            return '-33px -344px;';
        }
      }};
    }

    .playlist {
      padding-left: 26px;
      text-align: center;
      color: #666;
      width: 59px;
      background-position: -42px -68px;
      line-height: 26px;
    }

    .playlist:hover {
      background-position: -42px -98px;
    }
  }
`;
