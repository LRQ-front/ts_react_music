import styled from 'styled-components'

export const CodePendingWrapper = styled.div`
  .info {
    display: flex;
    justify-content: space-between;
    .img {
      width: 125px;
      height: 220px;
    }
    .two-dimensional-code {
      padding-left: 25px;
      width: 220px;
      height: 213px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .img {
        width: 150px;
        height: 150px;
        position: relative;
        margin-top: 10px;
        .real-code {
          width: 100%;
          height: 100%;
        }
        .active {
          display: block !important;
        }
        .disable {
          position: absolute;
          display: none;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;

          .white-mask {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.9);
          }
          .info {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 4;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            p {
              color: #333;
            }
            .refresh {
              margin-top: 4px;
              color: #fff;
              background-color: #70c670;
              padding: 7px 8px;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
`
