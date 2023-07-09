import styled from 'styled-components'

export const VerifyWrapper = styled.div`
  .verify {
    position: absolute;
    top: 30px;
    left: 90px;
    z-index: 99;
    border: 1px solid #eee;
    background-color: #fff;
    box-shadow: 2px 2px 7px 0 rgba(0, 0, 0, 0.5);
    .header {
      padding: 10px;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      color: #333;
      font-size: 15px;
      margin-bottom: 10px;
      .close {
        font-size: 20px;
        color: #ccc;
        cursor: pointer;
      }
    }
    .ctn {
      padding: 8px 8px;
    }
  }
`
