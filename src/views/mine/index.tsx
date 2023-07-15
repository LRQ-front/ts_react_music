import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { MineWrapper } from './style'
interface IProps {
  children?: ReactNode
}

const Mine: React.FC<IProps> = () => {
  return (
    <MineWrapper>
      <div className="content wrap-v2">
        <div className="pic">
          <a className="login" href="/#">
            立即登录
          </a>
        </div>
      </div>
    </MineWrapper>
  )
}

export default memo(Mine)
