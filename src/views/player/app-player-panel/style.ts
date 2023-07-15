import styled from 'styled-components'

interface IPanelWrapper {
  show: number
}

export const PanelWrapper = styled.div<IPanelWrapper>`
  position: absolute;
  left: 50%;
  bottom: 46px;
  transform: translateX(-50%);
  width: 986px;
  height: 261px;
  color: #e2e2e2;
  display: ${(props) => (props.show === 1 ? 'block' : 'none')};

  .main {
    position: relative;
    display: flex;
    height: 220px;
    overflow: hidden;
    background: url(${require('@/assets/img/playpanel_bg.png')}) -1014px 0 repeat-y;

    .image {
      position: absolute;
      left: 2px;
      top: -360px;
      width: 980px;
      height: auto;
      opacity: 0.2;
    }
  }
`
