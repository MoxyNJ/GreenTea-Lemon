import { styled } from 'styled-components';
import sprite_table from '@/assets/img/sprite_table.png';

export const RankingListWrapper = styled.div`
  padding: 0 30px 40px 40px;
  .header {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #c20c0c;
    padding-bottom: 2px;

    .left {
      .title {
        font-size: 20px;
        line-height: 28px;
      }
      .songNumber {
        margin: 9px 0 0 20px;
        color: #666;
      }
    }

    .right {
      margin-top: 5px;

      .playNumber {
        color: #c20c0c;
        padding-right: 2px;
        font-weight: bold;
      }
    }
  }

  .container {
    table {
      width: 100%;
      border: 1px solid #d9d9d9;
      border-collapse: collapse;
      border-spacing: 0;

      th {
        background-color: #f7f7f7;
        color: #666;
        background-image: url(${sprite_table});
      }

      thead {
        th {
          background-position: 0 0;
          background-repeat: repeat -x;
          height: 38px;

          .content {
            height: 38px;
            line-height: 38px;
            padding: 0px 10px;
            background-position: 0 -56px;
            font-weight: normal;
            text-align: left;
            background-image: url(${sprite_table});
            background-repeat: no-repeat;
          }
        }

        .ranking {
          width: 77px;
        }

        .duration {
          width: 91px;
        }

        .singer {
          width: 26%;
        }
      }

      tbody {
        td {
          padding: 6px 10px;
        }
        tr:nth-child(-n + 3) td {
          padding-top: 10px;
          padding-bottom: 10px;

          .title {
            width: 200px;
          }
        }

        tr:nth-child(2n) {
          background-color: #fff;
        }

        tr:nth-child(2n + 1) {
          background-color: #f7f7f7;
        }

        .num {
          display: flex;
          .text {
            display: inline-block;
            width: 25px;
            height: 18px;
            line-height: 18px;
            color: #999;
            text-align: center;
          }

          .iconN {
            display: inline-block;
            width: 16px;
            height: 17px;
            margin-left: 8px;
            background-position: -67px -283px;
          }
        }

        .info {
          display: flex;
          align-items: center;

          img {
            width: 50px;
            height: 50px;
            margin-right: 14px;
          }

          .play {
            display: inline-block;
            margin-top: -2px;
            width: 17px;
            height: 17px;
            background-position: 0 -103px;
            cursor: pointer;
          }

          .play:hover {
            background-position: 0 -128px;
          }

          .title {
            display: inline-block;
            margin-left: 8px;
            overflow: hidden;
            width: 280px;
          }
        }

        .pannel {
          padding-right: 0;
          .timeP {
            display: block;
          }

          .operate {
            display: flex;
            align-items: center;
            width: 80px;
            display: none;

            .btn {
              width: 17px;
              height: 14px;
              cursor: pointer;
              margin-right: 4px;
            }

            .addto {
              background-position: 0 -700px;
              margin-right: 0;
            }

            .collection {
              background-position: 0 -174px;
            }

            .share {
              background-position: 0 -195px;
            }

            .download {
              background-position: -81px -174px;
            }

            .addto:hover {
              background-position: -22px -700px;
            }

            .collection:hover {
              background-position: -20px -174px;
            }

            .share:hover {
              background-position: -20px -195px;
            }

            .download:hover {
              background-position: -104px -174px;
            }
          }
        }
      }
      tr:hover {
        .operate {
          display: block;
        }
        .timeP {
          display: none;
          width: 150px;
          overflow: hidden;
        }
      }
    }
  }
`;
