import styled from 'styled-components';

export const PicCoverV1Wrapper = styled.div<{
  $rightMargin?: number;
  $bottomMargin?: number;
}>`
  width: 140px;
  margin: 20px ${(props) => props.$rightMargin}px ${(props) => props.$bottomMargin}px 0;

  .top {
    position: relative;

    & > img {
      width: 140px;
      height: 140px;
    }

    .cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: 0 0;
      cursor: pointer;

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-position: 0 -537px;
        color: #ccc;
        height: 27px;

        .headset {
          margin-right: 5px;
          display: inline-block;
          width: 14px;
          height: 11px;
          background-position: 0 -24px;
        }

        .play {
          display: inline-block;
          width: 16px;
          height: 17px;
          background-position: 0 0;

          &:hover {
            background-position: 0 -60px;
          }
        }
      }
    }
  }

  .bottom {
    margin: 8px 0 3px;
    font-size: 14px;
    color: #000;
    line-height: 1.4;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .nickname {
    color: #666;
    padding-top: 4px;
  }
`;
