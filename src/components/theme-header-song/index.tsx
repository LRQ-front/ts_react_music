import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { ThemeHeaderWrapper } from './style'
import { useAppSelector } from '@/store'
interface IProps {
  children?: ReactNode
}

const ThemeHeaderSong: React.FC<IProps> = () => {
  const { playlist } = useAppSelector((state) => ({
    playlist: state.ranking.playlist
  }))
  return (
    <ThemeHeaderWrapper>
      <div className="left">
        <h3 className="title">歌曲列表</h3>
        <div className="count">{playlist.trackCount}首歌</div>
      </div>
      <div className="right">
        <span>播放：</span>
        <span className="count">{playlist.playCount}</span>
        <span>次</span>
      </div>
    </ThemeHeaderWrapper>
  )
}

export default memo(ThemeHeaderSong)
