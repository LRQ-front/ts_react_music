import React, { memo, useState } from 'react'
import type { ReactNode } from 'react'
import { LoginOtherWrapper } from './style'
import { message } from 'antd'
import { changeShowCodeMainAction, fetchCodeDataAction } from '../../store'
import { useAppDispatch } from '@/store'
interface IProps {
  children?: ReactNode
  showLoginMethod: (a: boolean) => void
}

const LoginOther: React.FC<IProps> = (props) => {
  const { showLoginMethod } = props
  const dispatch = useAppDispatch()

  const [isCheck, setCheck] = useState(false)

  function handleChangeMethod() {
    if (isCheck) {
      showLoginMethod(false)
      dispatch(fetchCodeDataAction())
    } else {
      message.open({
        content: '请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》',
        key: 'check',
        duration: 1
      })
    }
  }

  function handleCheck() {
    setCheck(!isCheck)
  }

  function handleChangeToPhoneLogin() {
    if (isCheck) {
      dispatch(changeShowCodeMainAction(false))
    } else {
      message.open({
        content: '请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》',
        key: 'check',
        duration: 1
      })
    }
  }

  return (
    <LoginOtherWrapper>
      <div className="content">
        <div className="top">
          <div className="left">
            <div className="img">
              <img src={require('@/assets/img/other_login_icon.png')} alt="" />
            </div>
            <div
              className="login_btn"
              onClick={(e) => handleChangeToPhoneLogin()}
            >
              手机号登录/注册
            </div>
          </div>
          <div className="right">
            <ul>
              <li className="item">
                <a>
                  <i className="logo login_logo wx"></i>微信登录
                </a>
              </li>
              <li className="item">
                <a>
                  <i className="logo login_logo qq"></i>QQ登录
                </a>
              </li>
              <li className="item">
                <a>
                  <i className="logo login_logo wb"></i>微博登录
                </a>
              </li>
              <li className="item">
                <a>
                  <i className="logo login_logo wy"></i>网易邮箱账号登录
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <input
            type="checkbox"
            className="check"
            onChange={(e) => handleCheck()}
          ></input>
          同意《服务条款》《隐私政策》《儿童隐私政策》
        </div>
        <div className="toCode" onClick={(e) => handleChangeMethod()}>
          <img
            className="code_img"
            src={require('@/assets/img/code_icon.png')}
            alt=""
          />
        </div>
      </div>
    </LoginOtherWrapper>
  )
}

export default memo(LoginOther)
