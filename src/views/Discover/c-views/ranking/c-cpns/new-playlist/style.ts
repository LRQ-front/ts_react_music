import styled from 'styled-components'

export const NewPlaylistWrapper = styled.div`
  background-color: #fff;
  .info {
    width: 100%;
    height: 209px;
    margin-left: 30px;
    padding: 40px 0;
    display: flex;
    /* align-items: center; */
    flex-direction: column;
    justify-content: space-between;
    .playlist {
      display: flex;
      align-items: center;
      .ant-input {
        margin-left: 8px;
        width: 344px;
        height: 32px;
        border: 1px solid #ccc;
        border-radius: 0;
      }
    }
    .tip {
      margin-top: 10px;
      color: #b7b5b3;
      margin-left: 44px;
    }
    .btn {
      margin-left: 44px;
      .new {
        background-color: #3080cc;
        margin-right: 10px;
      }
    }
  }
`
