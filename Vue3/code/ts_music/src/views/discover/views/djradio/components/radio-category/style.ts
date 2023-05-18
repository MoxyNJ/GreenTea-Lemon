import styled from 'styled-components';
import radio_slide from '@/assets/img/radio_slide.png';

export const RadioCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 -40px 8px -40px;

  .arrow {
    width: 20px;
    height: 30px;
    background-image: url(${radio_slide});
    opacity: 0.08;
    cursor: pointer;
  }
  .arrow:hover {
    opacity: 0.4;
  }

  .arrow-left {
    margin-left: 15px;
    background-position: 0 -30px;
  }

  .arrow-right {
    margin-right: 15px;
    background-position: -30px -30px;
  }
`;

export const RadioCategoryContent = styled.div`
  flex: 1;
  width: 900px;

  .category-page {
    display: flex !important;
    flex-wrap: wrap;
    padding-bottom: 20px;

    .category-item {
      display: flex;
      box-sizing: border-box;
      flex-direction: column;
      align-items: center;
      margin: 0 0 25px 33px;
      width: 70px;
      height: 70px;
      font-size: 12px;
      cursor: pointer;
      border-radius: 5px;
      text-align: center;
      border: 2px solid transparent;
      color: #888;

      &:hover {
        background-color: #eee;
      }

      &.active {
        color: #c20c0c;
        border: 2px solid #d35757;

        .image {
          background-position: -48px 0;
        }
      }
    }

    .category-item:nth-child(1) {
      margin-left: 5px;
    }
    .category-item:nth-child(10) {
      margin-left: 5px;
    }
  }

  .dots {
    bottom: 18px;
    li {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;

      button {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #aaa;
      }
    }

    li.slick-active {
      width: 20px;
      button {
        background-color: #c20c0c;
      }
    }
  }
`;

export const RadioCategoryItemImage = styled.div<{
  $imgUrl: string;
}>`
  width: 48px;
  height: 48px;
  background-image: url(${(props) => props.$imgUrl});
`;
