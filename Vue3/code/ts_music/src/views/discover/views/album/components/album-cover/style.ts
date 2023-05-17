import styled from 'styled-components';

export const AlbumBgCoverWrapper = styled.div`
  margin-bottom: 15px;

  .top {
    position: relative;
    width: 153px;
    height: 130px;
    overflow: hidden;
    margin-top: 15px;

    img {
      width: 130px;
      height: 130px;
    }

    .cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-position: 0 -845px;
      text-indent: -9999px;
    }

    .play {
      position: absolute;

      bottom: 5px;
      left: 94px;
      width: 28px;
      height: 28px;
      background-position: 0 -140px;

      text-indent: -9999px;
      display: none;
    }
    &:hover .play {
      display: block;
    }
  }

  .bottom {
    width: 140px;

    .name {
      color: #000;
      font-size: 14px;
      margin: 12px 0 6px 0;
    }

    .artist {
      font-size: 12px;
      color: #666;
    }
  }
`;
