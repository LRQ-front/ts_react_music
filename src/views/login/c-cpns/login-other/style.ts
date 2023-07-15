import styled from 'styled-components'

export const LoginOtherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .content {
    width: 528px;
    height: 226px;
    .top {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 220px;
      .left {
        box-sizing: content-box;
        width: 224px;
        padding: 0 35px 3px 40px;
        height: 100%;
        border-right: 1px dotted #ccc;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .img {
          margin-top: 20px;
          img {
            width: 224px;
            height: 120px;
          }
        }
        .login_btn {
          padding: 8px 0;
          text-align: center;
          background-color: #2576c5;
          color: #fff;
          border-radius: 5px;
        }
      }

      .right {
        margin-left: 39px;
        ul {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        .logo {
          display: inline-block;
          vertical-align: middle;
          margin-right: 14px;
          width: 38px;
          height: 38px;
        }
        .item {
          margin-top: 15px;

          .wx {
            background-position: -150px -670px;
          }
          .qq {
            background-position: -190px -670px;
          }
          .wb {
            background-position: -231px -670px;
          }
          .wy {
            background-position: -271px -670px;
          }

          > a {
            font-size: 12px;
            color: #333;
            line-height: 38px;
            &:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
    }

    .bottom {
      margin: 30px 0 0 40px;
      .check {
        position: relative;
        top: 2px;
        margin-right: 3px;
      }
    }

    .toCode {
      position: relative;
      .code_img {
        position: absolute;
        right: 0;
        bottom: -30px;
        width: 52px;
        height: 52px;
      }
    }
  }
`
