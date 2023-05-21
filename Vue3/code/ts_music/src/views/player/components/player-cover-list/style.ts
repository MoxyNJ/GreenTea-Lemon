import styled from 'styled-components';

export const PlayerCoverListWrapper = styled.div`
  .songs {
    .song-item {
      display: flex;
      align-items: center;
      margin-top: 15px;
      width: 200px;

      .image {
        width: 50px;
        height: 50px;
      }

      .info {
        margin-left: 10px;
        .name {
          font-size: 14px;
          color: #000;
        }

        .didv {
          margin: 6px 0;
        }

        span {
          color: #999;
        }

        .nickname {
          font-size: 12px;
          color: #666;
          margin-left: 4px;
        }
      }
    }
  }
`;
