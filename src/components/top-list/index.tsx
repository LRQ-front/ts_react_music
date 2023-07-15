import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { TopListWrapper } from './style'
import { logout } from '@/service/modules/header'
import { useAppDispatch } from '@/store'
import {
  changeAvataUrlAction,
  changeCookieAction,
  changeUidoAction
} from '@/store/modules/user'
import { message } from 'antd'
interface IProps {
  children?: ReactNode
}

const TopList: React.FC<IProps> = () => {
  const dispatch = useAppDispatch()

  async function handleLogout() {
    const ck = JSON.parse(localStorage.getItem('cookie') as string)
    const res = await logout(ck)
    if (res.code === 200) {
      message.open({
        content: `退出登录成功`,
        key: 'exit',
        duration: 2
      })
      //退出成功
      localStorage.setItem('cookie', '')

      dispatch(changeAvataUrlAction(''))
      dispatch(changeCookieAction(''))
      dispatch(changeUidoAction(-1))
    } else {
      message.open({
        content: `退出失败${res.code}`,
        key: 'exit',
        duration: 2
      })
    }
  }

  return (
    <TopListWrapper>
      <div className="list">
        <ul>
          <li className="item">
            <a className="iten">
              <i className={`mine top-list-icon icon`}></i>
              我的主页
            </a>
          </li>
          <li className="item">
            <a className="iten">
              <i className={`msg top-list-icon icon`}></i>
              我的消息
            </a>
          </li>
          <li className="item">
            <a className="iten">
              <i className={`rank top-list-icon icon`}></i>
              我的等级
            </a>
          </li>
          <li className="item">
            <a className="iten">
              <i className={`vip top-list-icon icon`}></i>
              VIP会员
            </a>
          </li>
          <li className="item">
            <a className="iten">
              <i className={`setting top-list-icon icon`}></i>
              个人设置
            </a>
          </li>
          <li className="item">
            <a className="iten">
              <i className={`real-name top-list-icon icon`}></i>
              实名认证
            </a>
          </li>
          <li className="item" onClick={handleLogout}>
            <a className="iten">
              <i className={`exit top-list-icon icon`}></i>
              退出
            </a>
          </li>
        </ul>
      </div>
    </TopListWrapper>
  )
}

export default memo(TopList)
