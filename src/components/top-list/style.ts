import styled from 'styled-components'

export const TopListWrapper = styled.div`
  .item {
    width: 160px;
    padding: 10px 25px;
    &:hover {
      background-color: #353535;
    }
    cursor: pointer;
    .iten {
      width: 100%;
      display: inline-block;
      color: #fff;
      /* height: 34px;
      line-height: 34px; */
      .icon {
        position: relative;
        top: 5px;
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 9px;
      }
    }
  }
  .mine {
    background-position: 0 -80px;
  }
  .msg {
    background-position: -20px -120px;
  }
  .rank {
    background-position: 0 -100px;
  }
  .vip {
    background-position: 0 -221px;
  }
  .setting {
    background-position: 0 -140px;
  }
  .real-name {
    background-position: -20px -142px;
  }
  .exit {
    background-position: 0 -200px;
  }
`
