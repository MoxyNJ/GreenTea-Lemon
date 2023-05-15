import styled from 'styled-components';

export const RecommendWrapper = styled.div`
  > .content {
    border: 1px solid #d3d3d3;
    background-image: url(${require('@/assets/img/wrap-bg.png')});
    display: flex;

    > .left {
      width: 689px;
      padding: 20px;
    }

    > .right {
      width: 250px;
      margin-left: 1px;
    }
  }
`;
