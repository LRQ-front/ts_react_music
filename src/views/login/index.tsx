import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { LoginWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import LoginCodeMain from './c-views/login-code-main'
import LoginPhoneMain from './c-views/login-phone'
import Sign from './c-views/sign'
import {
  changeShowCodeDisableAction,
  changeShowCodePendingAction,
  changeShowPanelAction
} from './store'
import { getCodeState } from './service'
import { storeUseInfoAction } from '@/store/modules/user'

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
  useEffect(() => {
    const interCheck = setInterval(async () => {
      const res = await getCodeState(key)
      console.log('二维码状态', res)

      //二维码失效
      if (res.code === 800) {
        // console.log('过期了')
        dispatch(changeShowCodeDisableAction(true))
        clearInterval(interCheck)
      } else if (res.code === 802) {
        //待确认图标展示
        dispatch(changeShowCodePendingAction(false))
      } else if (res.code === 803) {
        //授权登录
        dispatch(changeShowPanelAction(false))
        clearInterval(interCheck)

        //获取cookie
        // const cookie = res.cookie
        // localStorage.setItem('coolie', cookie)
        //根据cookie将用户信息保存起来
        dispatch(storeUseInfoAction(res.cookie))

        //重置二维码的展示状态，不然一打开就是pending图标的状态
        dispatch(changeShowCodePendingAction(true))
      }
    }, 3000)

    //切换到手机登录界面，关闭轮询
    if (!showCodeMain) {
      clearInterval(interCheck)
    }

    return () => {
      clearInterval(interCheck)
    }
  }, [showCodeMain, key])
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
