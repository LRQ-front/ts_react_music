import styled from 'styled-components'

export const RecommendWrapper = styled.div`
  > .content {
    border: 1px solid #d3d3d3;
    width: 980px;
    background-image: url(${require('@/assets/img/wrap-bg.png')});
    display: flex;

    > .left {
      padding: 20px;
      padding-right: 0px;
      width: 690px;
    }
    > .right {
      margin-left: 20px;
      width: 269px;
    }
  }
`
