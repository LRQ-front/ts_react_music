import styled from 'styled-components'

export const PhoneWrapper = styled.div<{ certifylogin: number }>`
  display: ${(props) => (props.certifylogin === 1 ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 80px;
  .form {
    width: 320px;
    height: 180px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: content-box;

    .phone {
      .phone-input {
        width: 320px;
      }
    }
    .certify-code {
      display: flex;
      justify-content: space-between;
      .certify-input {
        width: 193px;
      }
      .certify-btn {
        width: 119px;
      }
      .danger {
        background-color: #ff3a3a;
      }
      .disable {
        background-color: #dddddd;
      }
      .ant-btn-primary:disabled {
        cursor: pointer;
      }
    }

    .tip {
      margin-top: -10px;
      height: 15px;
      width: 100%;
      .tip-phone {
        color: #ff3a3a;
        .err {
          display: inline-block;
          height: 15px;
          width: 18px;
          background-position: -217px -34px;
          position: relative;
          top: 4px;
        }
      }
    }

    .login-btn {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: -10px;
      > .item {
        width: 100%;
      }
    }
  }
  .btn-common-class {
    height: 36px;
    border-radius: 18px;
  }
  .password-login {
    margin-left: 100px;
    margin-top: 10px;
    > a {
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
  }
`
