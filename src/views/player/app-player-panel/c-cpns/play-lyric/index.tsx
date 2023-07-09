import React, { memo, useRef, useEffect, ElementRef } from 'react'
import type { ReactNode } from 'react'
import { LyricWrapper } from './style'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import classNames from 'classnames'
import { scrollTo } from '@/utils/scrollTo'
interface IProps {
  children?: ReactNode
}

const PlayLyric: React.FC<IProps> = () => {
  const { songLyric, currentLyricIndex } = useAppSelector(
    (state) => ({
      songLyric: state.player.lyric,
      currentLyricIndex: state.player.lyricIndex
    }),
    shallowEqual
  )
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentLyricIndex > 0 && currentLyricIndex < 3) return
    scrollTo(panelRef.current!, (currentLyricIndex - 3) * 32, 300)
    // panelRef.current!.scrollTo({
    //   top: (currentLyricIndex - 3) * 32,
    //   behavior: 'smooth'
    // })
  }, [currentLyricIndex])

  return (
    <LyricWrapper ref={panelRef}>
      {songLyric.map((item, index) => {
        return (
          <div
            key={index}
            className={classNames('lrc-item', {
              active: index === currentLyricIndex
            })}
          >
            {item.text}
          </div>
        )
      })}
    </LyricWrapper>
  )
}

export default memo(PlayLyric)
