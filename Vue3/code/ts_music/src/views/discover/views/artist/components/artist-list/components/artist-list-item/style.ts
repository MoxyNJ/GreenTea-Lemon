import styled from 'styled-components';

export const ArtistListItemWrapper = styled.div`
  width: 130px;
  margin-top: 15px;

  .image {
    position: relative;

    img {
      width: 130px;
      height: 130px;
    }

    .cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: 0 -680px;
      cursor: pointer;
    }
  }

  .info {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;

    .name {
      cursor: pointer;

      &:hover {
        color: red;
        text-decoration: underline;
      }
    }

    .icon {
      position: relative;
      display: inline-block;
      margin-left: 3px;
      margin-top: 1px;
      width: 17px;
      height: 18px;
      background-position: 0 -740px;
    }
  }
  .nonePic {
    justify-content: left;
    margin: -2px 0;
  }

  .m-cvrlst li.line {
    margin-bottom: 12px;
    /* border-top: 1px dotted rgb(153, 153, 153); */
  }
`;
