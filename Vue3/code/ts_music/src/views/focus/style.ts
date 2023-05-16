import { styled } from 'styled-components';

export const FocusWrapper = styled.div`
  .content {
    min-height: 700px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;

    .main {
      width: 902px;
      height: 414px;
      margin: 0 auto 0;
      padding-top: 70px;
      background: url(${require('@/assets/img/friend_sprite.jpg')}) no-repeat 0 70px;

      .info {
        padding: 178px 0 0 535px;
        line-height: 23px;
        color: #666;
        font-size: 14px;
      }

      .btn {
        display: block;
        width: 157px;
        height: 48px;
        margin: 36px 0 0 535px;
        background: url(${require('@/assets/img/friend_sprite.jpg')}) no-repeat 0 9999px;
        text-indent: -9999px;

        &: hover {
          background-position: 0 -430px;
        }
      }
    }
  }
`;
