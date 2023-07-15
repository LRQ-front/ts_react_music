import { PlayListWrapper } from '@/views/player/app-player-panel/c-cpns/play-list/style'
import React, { memo } from 'react'
import type { ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}

const Playlist: React.FC<IProps> = () => {
  return <PlayListWrapper>Playlist</PlayListWrapper>
}

export default memo(Playlist)
