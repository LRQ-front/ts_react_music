import styled from 'styled-components'

export const ContentWrapper = styled.div`
  .header {
    font-weight: 600;
    padding: 4px;
    border-bottom: 2px solid #dadada;
    font-size: 12px;
    margin-bottom: 20px;
  }

  .ctx {
    .item {
      display: flex;
      /* justify-content: space-between; */
      border-bottom: 1px solid #ccc;
      padding: 20px;
      background-color: #fff;
      .avatar {
        width: 50px;
        height: 50px;
        margin-right: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        .top {
          width: 560px;
          margin-bottom: 15px;
        }
        .beReply {
          width: 560px;
          padding: 10px 20px;
          background-color: #f4f4f4;
          border: 1px solid #ccc;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
          .divider {
            margin: 0 7px;
          }
          .del {
            cursor: pointer;
            display: none;
            &:hover {
              text-decoration: underline;
            }
          }
          .del-active {
            display: block;
          }
          .right {
            display: flex;

            .like {
              display: inline-block;
              width: 15px;
              height: 14px;
              background-position: -150px 0;
              position: relative;
              top: -2px;
            }
            .like-active {
              background-position: -170px 0;
            }
            .replay {
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
        .replay-ctn {
          border: 1px solid #eee;
          padding: 15px;
          background-color: #f4f4f4;
          margin-top: 20px;
          .replay-text {
            .replay-input {
              width: 100%;
              height: 30px;
              border: 1px solid #ccc;
              padding: 5px;
              background-color: #fff;
            }
          }
          .btns {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            .function {
              .emotion {
                display: inline-block;
                width: 18px;
                height: 18px;
                background-position: -40px -490px;
                margin-right: 10px;
              }
              .call {
                display: inline-block;
                width: 18px;
                height: 18px;
                background-position: -60px -490px;
              }
            }
            .delay {
              span {
                margin-right: 8px;
              }
            }
          }
        }
      }
    }
  }
  .blue {
    color: #2676c4;
  }

  .pagination {
    padding: 80px 0 150px 0;
    display: flex;
    justify-content: center;

    .ant-pagination .ant-pagination-item-active {
      background-color: #c40a0f;
      color: #fff;
      border-radius: 0;
    }
    .ant-pagination .ant-pagination-item-active a {
      color: #fff;
    }
    .ant-pagination-item {
      border: 1px solid #666;
      border-radius: 0;
    }
    .ant-pagination-options {
      display: none;
    }
  }
`
