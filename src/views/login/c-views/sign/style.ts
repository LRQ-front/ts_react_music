import styled from 'styled-components'

export const SignWrapper = styled.div`
  .content {
    position: fixed;
    width: 530px;
    height: 264px;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    .info {
      position: absolute;
      margin-top: 10px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 220px;
      .title {
        text-align: center;
        font-size: 14px;
        margin-bottom: 20px;
      }
      .finish-btn {
        .btn {
          width: 220px;
          margin-top: 20px;
          text-align: center;
          color: #fff;
          background-color: #2778c6;
        }
      }
      .err-tip {
        margin-top: 5px;
        .illegal-nickname {
          color: #e75252;
          font-size: 14px;
          .illegal {
            display: inline-block;
            width: 20px;
            height: 20px;
            background-position: -30px -450px;
            position: relative;
            top: 3px;
            margin-right: 8px;
          }
        }
      }
    }
  }
`
