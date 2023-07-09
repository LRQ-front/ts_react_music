import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { HeaderLeft, HeaderRight, PanelHeaderWrapper } from './style'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
interface IProps {
  children?: ReactNode
}

const PanelHeader: React.FC<IProps> = () => {
  const { currentSong } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong
    }),
    shallowEqual
  )
  return (
    <PanelHeaderWrapper>
      <HeaderLeft>
        <h3>播放列表({currentSong.length})</h3>
        <div className="operator">
          <button>
            <i className="sprite_playlist icon favor"></i>
            收藏全部
          </button>
          <button>
            <i className="sprite_playlist icon remove"></i>
            清除
          </button>
        </div>
      </HeaderLeft>
      <HeaderRight>{currentSong.name}</HeaderRight>
    </PanelHeaderWrapper>
  )
}

export default memo(PanelHeader)
