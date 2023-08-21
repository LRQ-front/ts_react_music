import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { LoginWrapper } from './style'
import { useDispatch } from 'react-redux'
import { changeShowPanelAction } from '@/views/login/store'
import { useAppSelector } from '@/store'

interface IProps {
  children?: ReactNode
}

const UserLogin: FC<IProps> = () => {
  const dispatch = useDispatch()
  const { avatarUrl } = useAppSelector((state) => ({
    avatarUrl: state.user.avatarUrl
  }))

  return (
    <LoginWrapper className="sprite_02">
      {!avatarUrl && (
        <div>
          <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
          <a className="sprite_02">用户登录</a>
        </div>
      )}
    </LoginWrapper>
  )
}

export default memo(UserLogin)
