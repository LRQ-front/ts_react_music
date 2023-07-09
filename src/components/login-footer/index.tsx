import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { LoginFooterWrapper } from './style'
import { useAppDispatch } from '@/store'
import {
  changeOtherLoginAction,
  changeShowCodeMainAction
} from '@/views/login/store'
interface IProps {
  children?: ReactNode
}

const LoginFooter: React.FC<IProps> = () => {
  const dispatch = useAppDispatch()

  function handleChangeOtherLogin() {
    dispatch(changeShowCodeMainAction(true))
    dispatch(changeOtherLoginAction(true))
  }
  return (
    <LoginFooterWrapper>
      <div className="other-login-method" onClick={handleChangeOtherLogin}>
        &lt; 其他登录方式
      </div>
    </LoginFooterWrapper>
  )
}

export default memo(LoginFooter)
