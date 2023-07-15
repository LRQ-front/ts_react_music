import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { CodeWaitWrapper } from './style'
interface IProps {
  children?: ReactNode
}

const CodeWait: React.FC<IProps> = () => {
  return (
    <CodeWaitWrapper>
      <div className="wait-ctn">
        <div className="img-ctn">
          <img
            className="img"
            src={require('@/assets/img/sure_login.png')}
            alt=""
          />
        </div>
        <div className="scan-success">
          <h1>扫描成功</h1>
        </div>
        <div className="sure-login">请在手机上确认登录</div>
      </div>
    </CodeWaitWrapper>
  )
}

export default memo(CodeWait)
