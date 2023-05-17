import { styled } from 'styled-components';

export const ThemeHeaderWrapper = styled.div`
  display: flex;
  /* align-items: flex-end; */
  padding-bottom: 5px;
  border-bottom: 2px solid #c20c0c;
  justify-content: space-between;

  .title {
    display: flex;

    h2 {
      font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
      font-size: 24px;
      font-weight: normal;
      margin-bottom: 3px;
    }
    .subNav {
      display: flex;
      justify-content: center;
      flex-direction: row;
      padding-left: 18px;

      > span {
        margin: 9px 1px 0 1px;

        a {
          color: #666;
          cursor: pointer;
        }

        .divider {
          margin: 0 10px;
          color: #d9d9d9;
        }

        &:last-child {
          .divider {
            display: none;
          }
        }
      }
    }
  }

  .sub {
    display: block;
    margin-top: 11px;
    a {
      color: #666;
    }
  }
`;
