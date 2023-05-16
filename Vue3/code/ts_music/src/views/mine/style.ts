import { styled } from 'styled-components';

export const MineWrapper = styled.div`
  .content {
    min-height: 700px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;

    .main {
      width: 807px;
      height: 268px;
      margin: 0 auto 0;
      padding-top: 104px;
      background: url(${require('@/assets/img/mine_sprite.png')}) no-repeat 0 104px;

      h2 {
        height: 100px;
        text-indent: -9999px;
      }

      .btn {
        display: block;
        width: 167px;
        height: 45px;
        margin: 102px 0 0 482px;
        background: url(${require('@/assets/img/mine_sprite.png')}) no-repeat 0 9999px;
        text-indent: -9999px;

        &: hover {
          background-position: 0 -278px;
        }
      }
    }
  }
`;
