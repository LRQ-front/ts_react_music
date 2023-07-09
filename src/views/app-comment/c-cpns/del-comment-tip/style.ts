import styled from 'styled-components'

export const TipWrapper = styled.div`
  position: fixed;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .content {
    background-color: #fff;
    padding: 40px 0;
    text-align: center;
    .tip {
      color: #222;
      font-size: 14px;
    }
    .operator {
      padding: 40px;
      .sure {
        margin-right: 20px;
        background-color: #2e7ecb;
        color: #fff;
      }
    }
  }
`
