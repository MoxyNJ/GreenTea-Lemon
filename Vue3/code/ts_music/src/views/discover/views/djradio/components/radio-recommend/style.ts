import styled from 'styled-components';

export const RadioRecommendWrapper = styled.div`
  .radio-list {
    margin: 18px 0 32px;
    display: flex;
    justify-content: space-between;
  }
`;

export const RadioRecommendCover = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;

  .name {
    font-size: 14px;
    color: #333;
    margin: 13px 0 6px;
    line-height: 16px;
  }

  img {
    width: 150px;
    height: 150px;
  }

  .details {
    color: #999;
    font-size: 12px;
  }

  a {
    cursor: pointer;
  }
`;
