import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { VerifyWrapper } from './style'
import { Vertify } from '@alex_xu/react-slider-vertify'
import { message } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import { getVerifyCode } from '@/views/login/service'
interface IProps {
  children?: ReactNode
  closeClick: (flag?: boolean) => void
  emitVerifyCode: (flag: boolean) => void
}

const VerifyCpn: React.FC<IProps> = (props) => {
  const { closeClick, emitVerifyCode } = props
  const dispatch = useAppDispatch()

  const { phone } = useAppSelector((state) => ({
    phone: state.login.phoneNumber
  }))

  //关闭验证
  function handleCloseClick() {
    closeClick()
  }

  async function handleSuccess() {
    message.open({
      content: '验证成功',
      key: 'check',
      duration: 1
    })
    closeClick()
    emitVerifyCode(true)
    //发送验证码
    // dispatch(fetchVerifyCodeAction(phone))
    const res = await getVerifyCode(Number(phone))
    console.log(res)
  }

  function handleFail() {
    message.open({
      content: '验证失败',
      key: 'check',
      duration: 1
    })
  }
  return (
    <VerifyWrapper>
      <div className="verify">
        <div className="header">
          <span>请完成安全验证</span>
          <span className="close" onClick={handleCloseClick}>
            x
          </span>
        </div>
        <div className="ctn">
          <div className="vr">
            <Vertify
              width={320}
              height={160}
              onSuccess={handleSuccess}
              onFail={handleFail}
              imgUrl={require('@/assets/img/mobile-block.jpg')}
            />
          </div>
        </div>
      </div>
    </VerifyWrapper>
  )
}

export default memo(VerifyCpn)
