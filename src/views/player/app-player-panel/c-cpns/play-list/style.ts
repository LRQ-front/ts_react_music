import styled from 'styled-components'

export const PlayListWrapper = styled.div`
  position: relative;
  width: 553px;
  padding: 2px;
  overflow: scroll;
  /* overflow-y: hidden; */
  overflow-x: hidden;
  /* overflow: hidden; */
  &::-webkit-scrollbar {
    width: 1px;
    height: 4px;
    background-color: black;
  }
  .play-item {
    padding: 0 8px 0 25px;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    line-height: 28px;

    color: #ccc;
    &:hover,
    &.active {
      color: #fff;
      background-color: #000;

      /* ::before {
        content: '';
        position: absolute;
        left: 8px;
        width: 10px;
        height: 13px;
        background: url(${require('@/assets/img/playlist_sprite.png')}) -182px 0;
      } */
    }

    .right {
      display: flex;
      align-items: center;

      .singer {
        width: 80px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .duration {
        width: 45px;
      }

      .link {
        margin-left: 20px;
        width: 14px;
        height: 16px;
        background-position: -100px 0;
      }
    }
  }
`
