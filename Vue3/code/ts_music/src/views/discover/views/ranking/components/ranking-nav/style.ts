import { styled } from 'styled-components';

export const RankingNavWrapper = styled.div`
  margin-top: 22px;

  .title {
    padding: 0 10px 14px 15px;
    font-size: 14px;
    font-weight: bold;
  }

  .item .avatar {
    padding: 10px 0 10px 20px;
    position: relative;
    height: 42px;
    cursor: pointer;
    display: flex;

    &:hover {
      background-color: #f4f2f2;
    }

    .img-box {
      width: 40px;
      height: 40px;
    }

    .info {
      padding-left: 10px;
      p {
        margin: 2px 0 10px 0;
        width: 150px;
        overflow: hidden;
        color: #000;
      }
      .fre {
        color: #999;
      }
    }
  }

  .item .active {
    background-color: #e6e6e6;
  }
`;
