import React, { memo, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { PhoneWrapper } from './style'
import LoginFooter from '@/components/login-footer'
import { Input, Button } from 'antd'
import VerifyCpn from '@/components/verify-cpn'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  changeCaptchaAction,
  changePhoneNumberAction,
  fetchCheckPhoneAction
} from '../../store'
import { authenVerifyCode } from '../../service'

interface IProps {
  children?: ReactNode
  certifyLogin: boolean
  changePhoneMethod: (a: boolean) => void
}

const mobileReg = /^1[34578]\d{9}$/
const LoginPhone: React.FC<IProps> = (props) => {
  const dispatch = useAppDispatch()

  const { certifyLogin, changePhoneMethod } = props
  // const [codeValue, setCodeValue] = useState('')
  const [PhoneStyle, setStyle] = useState(true)
  const [showCodeErrTip, setShowCodeErrTip] = useState(false)
  const [hasPhoneTip, setHasPhone] = useState(false)
  const [showVerify, setVerify] = useState(false)
  const [emitVerifyCode, setemitVerifyCode] = useState(false)
  const [isEmitCode, setIsEmitCode] = useState(false)
  const [countdown, setCountDown] = useState(30)
  const [showErrCodeTip, setShowErrCodeTip] = useState(false)
  const [showshouldEmitCodeTip, setShouldEmitCodeTip] = useState(false)

  const { phoneNumber, captcha } = useAppSelector((state) => ({
    phoneNumber: state.login.phoneNumber,
    captcha: state.login.captcha
  }))

  useEffect(() => {
    if (emitVerifyCode) {
      const intervalV1 = setInterval(() => {
        setCountDown(countdown - 1)
      }, 1000)
      if (countdown <= 0) {
        setemitVerifyCode(false)
        clearInterval(intervalV1)
        setCountDown(30)
      }
      return () => clearInterval(intervalV1)
    }
  }, [countdown])

  function handlePhoneBlur(e: any) {
    if (!e.target.value) return
    dispatch(changePhoneNumberAction(e.target.value))
    if (!mobileReg.test(e.target.value)) {
      //手机格式不正确
      setStyle(false)
    }
  }

  //发送验证码
  function handlCodeClick() {
    if (!phoneNumber) {
      //没有输入手机号码则提示
      setHasPhone(true)
    } else if (!mobileReg.test(phoneNumber)) {
      //手机格式不正确
      setStyle(false)
    } else {
      setVerify(true)

      dispatch(changeCaptchaAction(''))
      // dispatch(changePhoneNumberAction(Number(phoneNumber)))
    }
  }

  //登录按钮
  async function handleLoginClick() {
    //没有输入验证码
    if (!captcha) {
      setShowCodeErrTip(true)
    } else if (!isEmitCode) {
      //还没有获取验证码
      setShouldEmitCodeTip(true)
    } else {
      // setShowCodeErrTip(false)
      //验证验证码
      const res = await authenVerifyCode(Number(phoneNumber), Number(captcha))
      if (res.code !== 200) {
        setShowErrCodeTip(true)
      } else {
        //检测是否已经注册过手机号
        dispatch(fetchCheckPhoneAction(Number(phoneNumber)))
      }
    }
  }

  //号码输入框失焦点
  function handlePhoneFocus() {
    setHasPhone(false)
    setStyle(true)
  }

  //验证码输入框失去焦点
  function handleVerifychange(e: any) {
    // setCodeValue(e.target.value)
    dispatch(changeCaptchaAction(e.target.value))
  }

  //验证关闭
  function handleCloseClick(flag = false) {
    setVerify(flag)
    setIsEmitCode(true)
  }

  //已经发出验证码，倒计时开始
  function handleEmitVeryfyCode(e: boolean) {
    setemitVerifyCode(e)
    setCountDown(countdown - 1)
  }

  function handleVerifyFocus() {
    setShowCodeErrTip(false)
    setShouldEmitCodeTip(false)
  }

  return (
    <PhoneWrapper certifylogin={certifyLogin ? 1 : 0}>
      <div className="form">
        <div className="phone">
          <Input
            placeholder="请输入手机号"
            className="phone-input btn-common-class"
            onBlur={(e) => handlePhoneBlur(e)}
            onFocus={(e) => handlePhoneFocus()}
          ></Input>
        </div>
        <div className="certify-code">
          <Input
            placeholder="请输入短信验证码"
            value={captcha}
            className="btn-common-class certify-input"
            onFocus={(e) => handleVerifyFocus()}
            onChange={(e) => handleVerifychange(e)}
          ></Input>
          <Button
            type="primary"
            className={'certify-btn btn-common-class'}
            danger={!emitVerifyCode}
            disabled={emitVerifyCode}
            onClick={handlCodeClick}
          >
            {!emitVerifyCode ? (
              '获取验证码'
            ) : (
              <span className="count-down">{countdown}秒后重发</span>
            )}
          </Button>
        </div>
        <div className="tip">
          {hasPhoneTip && (
            <div className="tip-phone">
              <i className="icon_04 err"></i>请输入手机号
            </div>
          )}
          {showCodeErrTip && (
            <div className="tip-phone ">
              <i className="icon_04 err"></i>请输入短信验证码
            </div>
          )}
          {!PhoneStyle && !hasPhoneTip && (
            <div className="tip-phone ">
              <i className="icon_04 err"></i>手机号码格式错误，请更换后重试
            </div>
          )}
          {showErrCodeTip && (
            <div className="tip-phone ">
              <i className="icon_04 err"></i>请输入正确得短信验证码
            </div>
          )}
          {showshouldEmitCodeTip && (
            <div className="tip-phone ">
              <i className="icon_04 err"></i>请先获取验证码
            </div>
          )}
        </div>
        <div className="login-btn">
          <Button
            type="primary"
            danger
            className="item btn-common-class"
            onClick={handleLoginClick}
          >
            登录
          </Button>
        </div>
      </div>
      <div className="password-login" onClick={(e) => changePhoneMethod(false)}>
        <a>密码登录</a>
      </div>
      <div className="footer">
        <LoginFooter></LoginFooter>
      </div>
      {showVerify && (
        <VerifyCpn
          emitVerifyCode={(e) => handleEmitVeryfyCode(e)}
          closeClick={(e?: boolean) => handleCloseClick(e)}
        ></VerifyCpn>
      )}
    </PhoneWrapper>
  )
}

export default memo(LoginPhone)
