import React, { memo, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { CodePendingWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import {
  changeShowCodeDisableAction,
  fetchCodeDataAction,
  changeShowCodePendingAction,
  changeShowPanelAction
} from '../../store'
import { getCodeState } from '../../service'
import { storeUseInfoAction } from '@/store/modules/user'

interface IProps {
  children?: ReactNode
}

const CodePending: React.FC<IProps> = (props) => {
  const dispatch = useAppDispatch()

  const { qrimg, showCodeDisable, key } = useAppSelector(
    (state) => ({
      qrimg: state.login.qrimg,
      showCodeDisable: state.login.showCodeDisable,
      key: state.login.key
    }),
    shallowEqual
  )

  //轮询二维码状态接口
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

    // //切换到手机登录界面，关闭轮询
    // if (!showCodeMain) {
    //   clearInterval(interCheck)
    // }

    return () => {
      clearInterval(interCheck)
    }
  }, [key])

  function handleRefresh() {
    dispatch(changeShowCodeDisableAction(false))
    dispatch(fetchCodeDataAction())
  }
  return (
    <CodePendingWrapper>
      <div className="info">
        <img
          src={require('@/assets/img/login_code.png')}
          alt=""
          className="img"
        />
        <div className="two-dimensional-code">
          <div className="top">扫码登录</div>
          <div className="img">
            <img className="real-code" src={qrimg} alt=""></img>
            {showCodeDisable && (
              <div className="disable active">
                <div className="white-mask"></div>
                <div className="info">
                  <p>二维码已失效</p>
                  <button className="refresh" onClick={(e) => handleRefresh()}>
                    点击刷新
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="bottom">
            使用<span style={{ color: '#0c73c2' }}>网易云音乐APP</span>
            扫码登录
          </div>
        </div>
      </div>
    </CodePendingWrapper>
  )
}

export default memo(CodePending)
