import styled from 'styled-components';

export const BannerWrapper = styled.div`
  .banner {
    height: 285px;
    display: flex;
    position: relative;
  }
`;

export const BannerLeft = styled.div`
  width: 730px;
  position: relative;

  .banner-item {
    overflow: hidden;
    height: 285px;
    .image {
      height: 100%;
      cursor: pointer;
      margin-left: -10px;
    }
  }

  .dots {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    > li {
      margin: 0 2px;

      .item {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-position: 3px -343px;
        cursor: pointer;

        &:hover,
        &.active {
          background-position: -16px -343px;
        }
      }
    }
  }
`;
export const BannerRight = styled.div`
  position: relative;
  width: 256px;
  height: 285px;
  background: url(${require('@/assets/img/download.png')});

  .SignInInfo {
    text-align: center;
    margin-top: 253px;
    color: #8d8d8d;
  }

  .shadow {
    display: block;
    _display: none;
    position: absolute;
    top: 0;
    left: -20px;
    width: 20px;
    height: 285px;
    background-position: -1px 0;
  }

  .shadowr {
    left: auto;
    right: -20px;
    background-position: -20px 0;
  }
`;

export const BannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 63px;

  .btn {
    position: absolute;
    width: 37px;
    height: 63px;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .left {
    left: -68px;
    background-position: 0 -360px;
  }

  .right {
    right: -68px;
    background-position: 0 -508px;
  }
`;
