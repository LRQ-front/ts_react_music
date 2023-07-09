import styled from 'styled-components'

export const MessageWrapper = styled.div<{ certifylogin: number }>`
  display: ${(props) => (props.certifylogin === 1 ? 'none' : 'block')};
  position: relative;
  width: 100%;
  height: 100%;
  /* display: flex;
  align-items: center; */
  .top {
    margin: 0 auto;
    padding: 70px 0 43px;
    width: 220px;
    box-sizing: content-box;

    .authen {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .message-login {
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .auto-input {
        position: relative;
        top: 2px;
        margin-right: 4px;
      }
    }

    .pwd {
      position: relative;
      .forgetPwd {
        position: absolute;
        right: 5px;
        top: 18px;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }

    .login {
      width: 100%;

      .login-btn {
        color: #fff;
        width: 100%;
        background-color: #3282ce;
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
  }
  .format-input {
    height: 30px;
    margin-top: 8px;
  }
`
