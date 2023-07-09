import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { PanelWrapper } from './style'
import PanelHeader from './c-cpns/panel-header'
import PlayLyric from './c-cpns/play-lyric'
import PlayList from './c-cpns/play-list'
interface IProps {
  children?: ReactNode
  isShow: boolean
}

const AppPlayerPanel: React.FC<IProps> = (props) => {
  const { isShow } = props
  return (
    //这里需要传number值，否则传递boolean值会报警告
    <PanelWrapper show={isShow ? 1 : 0}>
      <PanelHeader></PanelHeader>
      <div className="main">
        <img
          className="image"
          src="https://p4.music.126.net/qeN7o2R3_OTPhghmkctFBQ==/764160591569856.jpg"
          alt=""
        />
        <PlayList></PlayList>
        <PlayLyric></PlayLyric>
      </div>
    </PanelWrapper>
  )
}

export default memo(AppPlayerPanel)
