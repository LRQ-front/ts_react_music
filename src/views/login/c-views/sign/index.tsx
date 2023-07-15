import React, { memo, useState } from 'react'
import type { ReactNode } from 'react'
import { SignWrapper } from './style'
import LoginHeader from '@/components/dialog-header'
import { Input, Button } from 'antd/es'
import { checkName } from '../../service'
import { useAppDispatch, useAppSelector } from '@/store'
import { changeNickNameAction, registerAction } from '../../store'
interface IProps {
  children?: ReactNode
}

const nickReg = /([\u4e00-\u9fa5]|\w|-|_){4,30}/

const Sign: React.FC<IProps> = () => {
  const dispatch = useAppDispatch()
  const [isIllegal, setIsIllegal] = useState(false)
  const [existNickName, setExistNickName] = useState(false)

  const { nickname = '' } = useAppSelector((state) => ({
    nickname: state.login.nickname
  }))

  async function handleSignClick() {
    //1.检测昵称合法性
    if (nickReg.test(nickname)) {
      //昵称合法，检查是否有被占用
      const res = await checkName(nickname)
      setExistNickName(res.duplicated)
      //没有被占用，进行注册操作
      if (!res.duplicated) {
        dispatch(registerAction())
      }
    } else {
      setIsIllegal(true)
    }
  }

  function handleChange(e: any) {
    dispatch(changeNickNameAction(e.target.value))
  }

  function handleFocus() {
    setIsIllegal(false)
  }
  return (
    <SignWrapper>
      <div className="content">
        <LoginHeader title="设置昵称"></LoginHeader>
        <div className="info">
          <div className="title">取一个昵称，让大家记住你</div>
          <div className="name-input">
            <Input
              type="text"
              placeholder="昵称不少于4个字母或2个汉字"
              onBlur={(e) => handleChange(e)}
              onFocus={(e) => handleFocus()}
            ></Input>
          </div>
          <div className="err-tip">
            {isIllegal && (
              <div className="illegal-nickname">
                <i className="sprite_icon3 illegal"></i>
                昵称应该是4-30个字，且不包含除-和_以外的特殊字符
              </div>
            )}
            {existNickName && (
              <div className="illegal-nickname">
                <i className="sprite_icon3 illegal"></i>
                您的昵称已被占用
              </div>
            )}
          </div>
          <div className="finish-btn">
            <Button
              size="middle"
              className="btn"
              onClick={(e) => handleSignClick()}
            >
              完成注册，开启云音乐
            </Button>
          </div>
        </div>
      </div>
    </SignWrapper>
  )
}

export default memo(Sign)
