import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { LoginWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import LoginCodeMain from './c-views/login-code-main'
import LoginPhoneMain from './c-views/login-phone'
import Sign from './c-views/sign'
import { clearTimer } from './store'

interface IProps {
  children?: ReactNode
}

const Login: React.FC<IProps> = () => {
  const dispatch = useAppDispatch()

  const { showCodeMain, showSignPanel } = useAppSelector(
    (state) => ({
      showCodeMain: state.login.showCodeMain,
      showSignPanel: state.login.showSignPanel
    }),
    shallowEqual
  )
  useEffect(() => {
    //切换到手机登录界面，关闭轮询
    if (!showCodeMain) {
      dispatch(clearTimer())
    }
  }, [showCodeMain])
  return (
    <LoginWrapper>
      <div className="mask"></div>
      {showCodeMain && !showSignPanel && <LoginCodeMain></LoginCodeMain>}
      {!showCodeMain && !showSignPanel && <LoginPhoneMain></LoginPhoneMain>}
      {showSignPanel && <Sign></Sign>}
      {/* <Sign></Sign> */}
    </LoginWrapper>
  )
}

export default memo(Login)
