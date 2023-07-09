import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { CodeMainWrapper } from './style'
import LoginCode from '../../c-cpns/login-code'
import LoginOther from '../../c-cpns/login-other'
import LoginHeader from '@/components/dialog-header'
import { useAppDispatch, useAppSelector } from '@/store'
import { changeOtherLoginAction, clearTimer } from '../../store'

interface IProps {
  children?: ReactNode
}

const LoginCodeMain: React.FC<IProps> = (props) => {
  //二维码登录或者其他登录方式
  // const [isShowCodeMethod, setMethod] = useState(true)
  const dispatch = useAppDispatch()
  const { showOtherLogin } = useAppSelector((state) => ({
    showOtherLogin: state.login.showOtherLogin
  }))

  function handleChangeMethod(flag: boolean) {
    dispatch(changeOtherLoginAction(flag))
  }

  useEffect(() => {
    if (showOtherLogin) {
      dispatch(clearTimer())
    }
  }, [showOtherLogin])

  return (
    <CodeMainWrapper>
      <div className="content">
        <LoginHeader
          title="登录"
          showLoginMethod={(e) => handleChangeMethod(e)}
        ></LoginHeader>
        {!showOtherLogin && (
          <LoginCode showLoginMethod={(e) => handleChangeMethod(e)}></LoginCode>
        )}
        {showOtherLogin && (
          <LoginOther
            showLoginMethod={(e) => handleChangeMethod(e)}
          ></LoginOther>
        )}
      </div>
    </CodeMainWrapper>
  )
}

export default memo(LoginCodeMain)
