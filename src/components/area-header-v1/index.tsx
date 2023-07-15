import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { AreaV1Wrapper } from './style'
import { Link } from 'react-router-dom'
interface IProps {
  children?: ReactNode
  title?: string
  moreText?: string
  keywords?: string[]
  moreLink: string
}

const AreaHeaderV1: React.FC<IProps> = (props) => {
  const {
    title = '默认标题',
    keywords = [],
    moreLink = '/',
    moreText = '更多'
  } = props
  return (
    <AreaV1Wrapper className="sprite_02">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keywords">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <Link to={moreLink} className="more">
          {moreText}
        </Link>
        <i className="icon sprite_02"></i>
      </div>
    </AreaV1Wrapper>
  )
}

export default memo(AreaHeaderV1)
