import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { MessageWrapper } from './style'
import LoginFooter from '@/components/login-footer'
import { Button, Input } from 'antd'

interface IProps {
  children?: ReactNode
  certifyLogin: boolean
  changePhoneMethod: (a: boolean) => void
}

const LoginMessage: React.FC<IProps> = (props) => {
  const { certifyLogin, changePhoneMethod } = props
  function handlePwdLoginClick() {
    changePhoneMethod(true)
  }
  return (
    <MessageWrapper certifylogin={certifyLogin ? 1 : 0}>
      <div className="top">
        <div className="phone">
          <Input placeholder="请输入手机号" className="format-input"></Input>
        </div>
        <div className="pwd">
          <Input placeholder="请输入密码" className="format-input"></Input>
          <a className="forgetPwd">忘记密码?</a>
        </div>
        <div className="format-input authen">
          <a className="message-login" onClick={handlePwdLoginClick}>
            短信登录
          </a>
          <div className="auto-login">
            <input type="checkbox" className="auto-input"></input>
            自动登录
          </div>
        </div>
        <div className="login">
          <Button className="format-input login-btn">登录</Button>
        </div>
      </div>
      <div className="footer">
        <LoginFooter></LoginFooter>
      </div>
    </MessageWrapper>
  )
}

export default memo(LoginMessage)
