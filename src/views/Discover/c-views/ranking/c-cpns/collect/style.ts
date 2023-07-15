import styled from 'styled-components'

export const CollectWrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .content {
    /* overflow: hidden; */
    height: 374px;
    background-color: #fff;

    .add-songlist {
      padding: 10px 0 10px 35px;
      background: #e6e6e6;
      cursor: pointer;
      font-size: 12px;
      vertical-align: middle;
      .add {
        display: inline-block;
        width: 35px;
        height: 36px;
        background-position: 0 -495px;
      }
      .text {
        /* display: inline-block;
        height: 35px;
        line-height: 35px; */
        font-size: 14px;
        position: relative;
        left: 10px;
        top: -15px;
      }
    }

    .song-list {
      width: 100%;
      height: 100%;
      overflow: scroll;
      .item {
        display: flex;

        padding: 10px 0 10px 35px;
        background-color: #fff;
        &:hover {
          background-color: #f2f2f2;
        }

        .cover-img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
      .line {
        border-bottom: 1px solid #e6e6e6;
      }
    }
  }
`
