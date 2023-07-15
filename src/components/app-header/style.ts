import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  height: 75px;
  background-color: #242424;
  font-size: 14px;
  color: #fff;
  .content {
    display: flex;
    justify-content: space-between;

    ${(props) => props.theme.mixin.wrapv1};
  }

  .divider {
    height: 5px;
    background-color: #c20c0c;
  }
`

export const LeftWrapper = styled.div`
  display: flex;

  .logo {
    display: block;
    width: 176px;
    height: 70px;
    background-position: 0 0;
    text-indent: -9999px;
  }

  .select-list {
    display: flex;
    line-height: 70px;

    .select-item {
      position: relative;

      a {
        display: block;
        padding: 0 20px;
        color: #ccc;
      }

      &:last-of-type a {
        position: relative;
        &::after {
          position: absolute;
          content: '';
          width: 28px;
          height: 19px;
          background-image: url(${require('@/assets/img/sprite_01.png')});
          background-position: -190px 0;
          top: 20px;
          right: -15px;
        }
      }

      &:hover a,
      .active {
        color: #fff;
        background: #000;
        text-decoration: none;
      }

      .active .icon {
        position: absolute;
        display: inline-block;
        width: 12px;
        height: 7px;
        bottom: -1px;
        left: 50%;
        transform: translate(-50%, 0);
        background-position: -226px 0;
      }
    }
  }
`

interface IRightWrapper {
  showsuggest: number
}

export const RightWrapper = styled.div<IRightWrapper>`
  display: flex;
  align-items: center;
  color: #787878;
  font-size: 12px;
  position: relative;

  .login {
    position: relative;
    cursor: pointer;
    .img {
      width: 30px;
      height: 30px;
      border-radius: 15px;
    }
  }
  .top-list {
    position: fixed;
    z-index: 999;
    top: 64px;
    right: 345px;
    width: 160px;
    background-color: #2b2b2b;
  }

  > .search {
    width: 158px;
    height: 32px;
    border-radius: 16px;

    input {
      &::placeholder {
        font-size: 12px;
      }
    }
  }

  .center {
    width: 90px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #666;
    border-radius: 16px;
    margin: 0 16px;
    color: #ccc;
    &:hover {
      color: #fff;
      border-color: #fff;
    }
  }

  .search-suggest {
    position: absolute;
    z-index: 999;
    width: 240px;
    top: 60px;
    left: 0;
    box-sizing: border-box;
    border: 1px solid #bebebe;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 4px 7px #555;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
    display: ${(props) => (props.showsuggest === 1 ? 'block' : 'none')};
    > .top {
      padding: 12px 0 8px 11px;
      border-bottom: 1px solid #ccc;
      height: 38px;
      box-sizing: border-box;
    }
    > .bottom {
      /* height: 235px; */
    }
    .item {
      color: #666;
      display: flex;
      /* justify-content: space-between; */
      .title {
        width: 75px;
        padding: 10px 5px 0 10px;
        line-height: 19px;
        font-weight: normal;
        font-size: 12px;
        box-sizing: border-box;

        > .icon {
          display: inline-block;
          width: 14px;
          height: 15px;
          background-position: -35px -300px;
          margin-right: 5px;
          position: relative;
          top: 5px;
        }

        > .songs {
          background-position: -35px -300px;
        }
        > .artists {
          background-position: -50px -300px;
        }
        > .albums {
          background-position: -35px -320px;
        }
        > .playlists {
          background-position: -50px -320px;
        }
      }
      .ctn {
        border-left: 1px solid #eee;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
        width: 176px;
        padding: 5px 0 5px 5px;
        .keyword {
          padding: 7px 7px 5px 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .highlight {
            /* color: #0c73c2; */
            color: blue;
          }
        }
      }

      .shadow {
        background-color: rgba(249, 248, 248);
      }
    }
  }
`
