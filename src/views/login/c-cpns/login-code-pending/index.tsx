import React, { memo, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { CodePendingWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import {
  changeShowCodeDisableAction,
  fetchCodeDataAction,
  fetchCodeStatusAction
} from '../../store'
interface IProps {
  children?: ReactNode
}

const CodePending: React.FC<IProps> = (props) => {
  const dispatch = useAppDispatch()

  const { qrimg, showCodeDisable } = useAppSelector(
    (state) => ({
      qrimg: state.login.qrimg,
      showCodeDisable: state.login.showCodeDisable
    }),
    shallowEqual
  )

  //轮询二维码状态接口
  useEffect(() => {
    dispatch(fetchCodeStatusAction())

    // return () => {
    //   clearInterval(interCheck)
    // }
  }, [])
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
