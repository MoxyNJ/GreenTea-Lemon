import styled from 'styled-components';

export const NewAlbumWrapper = styled.div`
  margin-top: 20px;

  > .content {
    height: 186px;
    background-color: #f5f5f5;
    border: 1px solid #d3d3d3;
    margin: 20px 0 37px;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .arrow {
      position: relative;
      top: -12px;
      width: 17px;
      height: 17px;
      cursor: pointer;
    }

    .arrow-left {
      background-position: -260px -75px;
      &:hover {
        background-position: -280px -75px;
      }
    }

    .arrow-right {
      background-position: -300px -75px;
      &:hover {
        background-position: -320px -75px;
      }
    }

    .banner {
      overflow: hidden;
      flex: 1;

      .album-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
`;

export const AlbumItemWrapper = styled.div`
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
