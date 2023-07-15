import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style'
interface IProps {
  children?: ReactNode
}

const SongHeader: React.FC<IProps> = () => {
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <span className="title">全部</span>
        <button
          className="select"
          // onClick={(e) => setShowCategory(!showCategory)}
        >
          <span>选择分类</span>
          <i className="sprite_icon2"></i>
        </button>
        {/* {showCategory ? <HYSongsCategory /> : null} */}
      </HeaderLeft>
      <HeaderRight>
        <button className="hot">热门</button>
      </HeaderRight>
    </HeaderWrapper>
  )
}

export default memo(SongHeader)
