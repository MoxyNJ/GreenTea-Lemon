import styled from 'styled-components';

export const AlbumCoverWrapper = styled.div`
  .container_mask {
    background-position: -260px 100px;
  }

  .top {
    position: relative;
    width: 118px;
    height: 100px;
    overflow: hidden;
    margin-top: 15px;

    img {
      width: 100px;
      height: 100px;
    }

    .cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-position: 0 -570px;
      text-indent: -9999px;
    }

    .play {
      position: absolute;

      bottom: 4px;
      left: 72px;
      width: 22px;
      height: 22px;
      background-position: 0 -110px;

      text-indent: -9999px;
      display: none;
    }
    &:hover .play {
      display: block;
    }
  }

  .bottom {
    font-size: 12px;
    width: 100px;
    .name a {
      color: #000;
    }

    .artist a {
      color: #666;
    }
  }
`;
