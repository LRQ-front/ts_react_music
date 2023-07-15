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
        <div className="play-icon sprite_button">
          <span className="play sprite_button">
            <i className="sprite_button"></i>
            <span>播放</span>
          </span>
        </div>
        <div className="add-icon sprite_button">+</div>
      </span>
      <div className="item sprite_button">
        <i className="icon favor-icon sprite_button">{favorTitle}</i>
      </div>
      <div className="item sprite_button">
        <i className="icon share-icon sprite_button">{shareTitle}</i>
      </div>
      <div className="item sprite_button">
        <i className="icon download-icon sprite_button">{downloadTitle}</i>
      </div>
      <div className="item sprite_button">
        <i className="icon comment-icon sprite_button">{commentTitle}</i>
      </div>
    </OperatorBarWrapper>
  )
}

export default memo(SongOperatorBar)
