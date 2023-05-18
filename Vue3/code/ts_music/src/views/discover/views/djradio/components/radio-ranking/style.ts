import styled from 'styled-components';

export const RadioRankingWrapper = styled.div`
  .ranking-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

export const RadioRankingCoverWrapper = styled.div`
  display: flex;
  align-items: top;
  width: 48%;
  padding: 20px 0;
  border-bottom: 1px solid #e7e7e7;

  img {
    width: 120px;
    height: 120px;
  }
  a {
    cursor: pointer;
  }

  .info {
    margin-left: 20px;

    .title {
      display: inline-block;
      margin-top: 20px;
      font-size: 18px;
      color: #333;
      font-weight: bold;
    }

    .nickname {
      margin-top: 15px;

      i.left {
        display: inline-block;
        position: relative;
        top: 2px;
        width: 14px;
        height: 15px;
        margin-right: 8px;
        background-position: -50px -300px;
      }
      a {
        color: #333;
      }
    }

    .count {
      color: #999;
      margin-top: 8px;

      .subscribe {
        margin-left: 13px;
      }
    }
  }
`;
