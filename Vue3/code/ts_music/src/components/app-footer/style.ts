import { styled } from 'styled-components';

export const AppFooterWrapper = styled.div`
  .content {
    height: 310px;
    border-top: 1px solid #d3d3d3;

    .enter {
      display: flex;
      margin-top: 33px;
      justify-content: center;
      flex-direction: row;
      .enter-item {
        width: 45px;
        margin-left: 80px;
        text-align: center;
        color: #666;

        &:first-child {
          margin-left: 0px;
        }

        .logo {
          display: block;
          float: none;
          width: 45px;
          height: 45px;
          margin: 0 auto;
          background-size: 220px 220px;
        }

        .info {
          display: inline-block;
          width: 100px;
          margin-top: 10px;
          margin-left: -27.5px;
          font-weight: 400;
          font-size: 12px;
          text-align: center;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }

    .copy {
      padding-top: 60px;
      line-height: 24px;
      margin: 0 auto;
      text-align: center;

      &:nth-child(3) {
        background-color: black;
      }

      .more-link {
        display: flex;
        justify-content: center;
        flex-direction: row;

        > span {
          &:last-child {
            .divider {
              display: none;
            }
          }
          a {
            color: #666;
          }
          .divider {
            margin: 0 10px;
            color: #d9d9d9;
          }
        }
      }

      .more-info {
        color: #666;

        .margin1 {
          margin: 0 10px;
        }

        .margin2 {
          margin-right: 5px;
        }
        a {
          color: #666;
        }

        .police-logo {
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right: 2px;
          vertical-align: -2px;
          background: url(${require('@/assets/img/police.png')}) no-repeat;
          background-size: cover;
        }
      }
    }
  }
`;

export const LogoWrapper = styled.div<{
  $logoPosition: number[];
  $logoPositionHover: number[];
}>`
  .logo-position {
    background-position: ${(props) => props.$logoPosition[0]}px
      ${(props) => props.$logoPosition[1]}px;
    /* background-position: -170px -5px; */

    &:hover {
      background-position: ${(props) => props.$logoPositionHover[0]}px
        ${(props) => props.$logoPositionHover[1]}px;
    }
  }
`;
