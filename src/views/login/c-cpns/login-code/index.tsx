import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { LoginCodeWrapper } from './style'
import LoginCodeWait from '../login-code-wait'
import LoginCodePending from '../login-code-pending'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { clearTimer } from '../../store'
interface IProps {
  children?: ReactNode
  showLoginMethod: (flag: boolean) => void
}

const LoginCode: React.FC<IProps> = (props) => {
  const { showLoginMethod } = props

  // const [showCodePending, setShowCodePending] = useState(true)
  const { showCodePending } = useAppSelector(
    (state) => ({
      showCodePending: state.login.showCodePending
    }),
    shallowEqual
  )

  function handleChangeMethod() {
    showLoginMethod(true)
  }

  // function handleShowPending(e: boolean) {
  //   setShowCodePending(e)
  // }

  return (
    <LoginCodeWrapper>
      <div className="code">
        {showCodePending && <LoginCodePending></LoginCodePending>}
        {!showCodePending && <LoginCodeWait></LoginCodeWait>}
        <div className="other-login">
          <a className="btn" onClick={handleChangeMethod}>
            选择其他登录模式
          </a>
        </div>
      </div>
    </LoginCodeWrapper>
  )
}

export default memo(LoginCode)
