import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { OperatorBarWrapper } from './style'
interface IProps {
  children?: ReactNode
  favorTitle: number
  shareTitle: number
  downloadTitle: string
  commentTitle: number
}

const SongOperatorBar: React.FC<IProps> = (props) => {
  const { favorTitle, shareTitle, downloadTitle, commentTitle } = props

  return (
    <OperatorBarWrapper>
      <span className="play">
        <a href="" className="play-icon sprite_button">
          <span className="play sprite_button">
            <i className="sprite_button"></i>
            <span>播放</span>
          </span>
        </a>
        <a href="/abc" className="add-icon sprite_button">
          +
        </a>
      </span>
      <a href="/abc" className="item sprite_button">
        <i className="icon favor-icon sprite_button">{favorTitle}</i>
      </a>
      <a href="/abc" className="item sprite_button">
        <i className="icon share-icon sprite_button">{shareTitle}</i>
      </a>
      <a href="/abc" className="item sprite_button">
        <i className="icon download-icon sprite_button">{downloadTitle}</i>
      </a>
      <a href="/abc" className="item sprite_button">
        <i className="icon comment-icon sprite_button">{commentTitle}</i>
      </a>
    </OperatorBarWrapper>
  )
}

export default memo(SongOperatorBar)
