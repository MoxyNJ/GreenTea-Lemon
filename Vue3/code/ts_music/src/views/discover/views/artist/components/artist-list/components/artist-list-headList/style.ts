import styled from 'styled-components';

export const ArtistListHeadListWrapper = styled.div<{
  $hasTop?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => (props.$hasTop ? '20px' : 0)};

  .item {
    box-sizing: border-box;
    padding: 1px 4px;
    border-radius: 3px;
    span {
      display: inline-block;
      padding: 0 2px;
      font-size: 14px;
      color: #333;
      cursor: pointer;
    }

    .small {
      padding: 2px 6px 0 6px;
      font-size: 12px;
    }

    span:hover {
      text-decoration: underline;
    }
  }

  .active {
    background-color: #c20c0c;
    span {
      color: #fff;
    }
  }
`;
