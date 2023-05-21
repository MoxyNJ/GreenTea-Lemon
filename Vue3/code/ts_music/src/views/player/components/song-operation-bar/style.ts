import styled from 'styled-components';

export const OperationBarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 7px;

  .play {
    display: flex;
    align-items: flex-start;
    margin-right: 5px;
    margin-top: 1px;

    .play-icon {
      display: inline-block;
      height: 31px;
      line-height: 31px;
      background-position: right -428px;

      &:hover {
        text-decoration: none;
      }

      .playPannel {
        color: #fff;
        display: flex;
        align-items: center;
        padding: 0 12px 0 7px;
        background-position: 0 -387px;

        i {
          display: inline-block;
          width: 20px;
          height: 18px;
          margin: -2px 2px 0;
          background-position: 0 -1622px;
        }
      }
      .playPannel:hover {
        background-position: 0 -469px;

        &:hover .sprite_button {
          background-position: -28px -1622px;
        }
      }
    }

    .add-icon {
      display: inline-block;
      width: 31px;
      height: 31px;
      margin-left: -3px;
      padding-right: 0;
      background-position: 0 -1588px;
      text-indent: -9999px;
    }

    .play-icon:hover {
      background-position: right -510px;
    }
    .add-icon:hover {
      background-position: -40px -1588px;
    }
  }

  .btnItem {
    display: inline-block;
    height: 31px;
    margin-right: 6px;
    margin-top: 2px;
    padding-right: 1px;
    background-position: right -1020px;

    .icon {
      display: inline-block;
      height: 31px;
      line-height: 31px;
      padding: 0 7px 0 28px;
      font-family: simsun;
    }

    .favor-icon {
      background-position: 0 -977px;
    }

    .share-icon {
      background-position: 0 -1225px;
    }

    .download-icon {
      background-position: 0 -2761px;
    }

    .comment-icon {
      background-position: 0 -1465px;
    }

    .favor-icon:hover {
      background-position: 0 -1063px;
    }

    .share-icon:hover {
      background-position: 0 -1268px;
    }

    .download-icon:hover {
      background-position: 0 -2805px;
    }

    .comment-icon:hover {
      background-position: 0 -1508px;
    }

    &:hover {
      background-position: right -1106px;
    }
  }
`;
