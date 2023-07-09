import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { PlayListWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import classNames from 'classnames'
import { formatTime } from '@/utils/format'
import { fetchSongDetailAction } from '@/views/player/store'
import { shallowEqual } from 'react-redux'
interface IProps {
  children?: ReactNode
}

const PlayList: React.FC<IProps> = () => {
  const { playList, playSongIndex } = useAppSelector(
    (state) => ({
      playList: state.player.playSongList,
      playSongIndex: state.player.playSongIndex
    }),
    shallowEqual
  )

  const dispatch = useAppDispatch()

  function handleChangeSong(id: number) {
    dispatch(fetchSongDetailAction(id))
  }
  return (
    <PlayListWrapper>
      {playList.map((item, index) => {
        return (
          <div
            className={classNames('play-item', {
              active: playSongIndex === index
            })}
            key={item.name}
            onClick={(e) => handleChangeSong(item.id)}
          >
            <div className="left">{item.name}</div>
            <div className="right">
              <span className="singer">{item.ar[0].name}</span>
              <span className="duration">{formatTime(item.dt)}</span>
              <span className="sprite_playlist link"></span>
            </div>
          </div>
        )
      })}
    </PlayListWrapper>
  )
}

export default memo(PlayList)
