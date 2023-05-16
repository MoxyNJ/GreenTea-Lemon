import { styled } from 'styled-components';

export const RankingWrapper = styled.div`
  display: flex;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  background: url(${require('@/assets/img/ranking-bg.png')}) repeat-y center 0;

  .nav {
    width: 240px;
    padding-top: 20px;
  }

  .main {
    width: 740px;
  }
`;

export const RankingNavWrapper = styled.div`
  margin-top: 20px;
`;
