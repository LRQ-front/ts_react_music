import React, { memo, useState } from 'react'
import type { ReactNode } from 'react'
import { LoginPhoneWrapper } from './style'
import LoginHeader from '@/components/dialog-header'
import LoginMessage from '../../c-cpns/login-message'
import LoginPhone from '../../c-cpns/login-phone'
import { useAppDispatch } from '@/store'
import { changeOtherLoginAction, changeShowCodeMainAction } from '../../store'
interface IProps {
  children?: ReactNode
}

const LoginPhoneMain: React.FC<IProps> = (props) => {
  //验证码或者短信登录
  const [useCertifyCodeLogin, setMethod] = useState(true)
  const dispatch = useAppDispatch()
  function handleChangeMethod(flag: boolean) {
    dispatch(changeOtherLoginAction(flag))
    dispatch(changeShowCodeMainAction(true))
  }

  //密码登录或者短信登录，true为短信登录
  function handlePhoneLogin(e: boolean) {
    setMethod(e)
  }
  return (
    <LoginPhoneWrapper>
      <div className="content">
        <LoginHeader
          title="手机号登录"
          showLoginMethod={(e) => handleChangeMethod(e)}
        ></LoginHeader>
        <LoginPhone
          certifyLogin={useCertifyCodeLogin}
          changePhoneMethod={(e) => handlePhoneLogin(e)}
        ></LoginPhone>
        <LoginMessage
          certifyLogin={useCertifyCodeLogin}
          changePhoneMethod={(e) => handlePhoneLogin(e)}
        ></LoginMessage>
      </div>
    </LoginPhoneWrapper>
  )
}

export default memo(LoginPhoneMain)
