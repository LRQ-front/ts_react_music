import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { SongsWrapper } from './style'
// import SongHeader from './c-cpns/song-header'
// import SongList from './c-cpns/song-list'
interface IProps {
  children?: ReactNode
}

const Songs: React.FC<IProps> = () => {
  return (
    <SongsWrapper className="wrap-v2">
      歌单
      {/* <SongHeader></SongHeader>
      <SongList></SongList> */}
    </SongsWrapper>
  )
}

export default memo(Songs)
