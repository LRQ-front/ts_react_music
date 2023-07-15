import styled from 'styled-components'

export const CommentWrapper = styled.div`
  margin-top: 40px;

  .content {
    margin-bottom: 20px;
    .comment-site {
      display: flex;
      justify-content: space-between;
      .avatar {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .comment-place {
        .textarea {
          width: 600px;
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
`
