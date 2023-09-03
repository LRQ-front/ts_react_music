import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { LoginWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import LoginCodeMain from './c-views/login-code-main'
import LoginPhoneMain from './c-views/login-phone'
import Sign from './c-views/sign'

interface IProps {
  children?: ReactNode
}

const Login: React.FC<IProps> = () => {
  const dispatch = useAppDispatch()

  const { showCodeMain, showSignPanel, key } = useAppSelector(
    (state) => ({
      showCodeMain: state.login.showCodeMain,
      showSignPanel: state.login.showSignPanel,
      key: state.login.key
    }),
    shallowEqual
  )

  //轮询
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
