import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { LoginHeaderWrapper } from './style'
import {
  changeCaptchaAction,
  changeKeyAction,
  changeOtherLoginAction,
  changeQrimgAction,
  changeShowCodeDisableAction,
  changeShowCodeMainAction,
  changeShowCodePendingAction,
  changeShowPanelAction,
  changeShowSignPanelAction
} from '@/views/login/store'
import { useAppDispatch } from '@/store'
import { changeShowCollectDialog } from '@/store/modules/collect'
import { changeCloseTipAction } from '@/views/app-comment/store/comment'
interface IProps {
  children?: ReactNode
  showLoginMethod?: (a: boolean) => void
  title: string
}

const DialogHeader: React.FC<IProps> = (props) => {
  const { showLoginMethod, title = '登录' } = props
  const dispatch = useAppDispatch()

  function handleClose() {
    dispatch(changeShowPanelAction(false))
    dispatch(changeShowSignPanelAction(false))
    dispatch(changeShowCodeMainAction(true))
    dispatch(changeOtherLoginAction(false))
    dispatch(changeCaptchaAction(''))
    //二维码信息清除
    dispatch(changeQrimgAction(''))
    dispatch(changeKeyAction(''))
    showLoginMethod && showLoginMethod(false)

    //清除轮询二维码状态定时器
    dispatch(changeShowCodePendingAction(true))

    //二维码失效状态
    dispatch(changeShowCodeDisableAction(false))

    //关闭收藏对话框
    // eventBus.emit('closeDialogCollect', fal1se)
    dispatch(changeShowCollectDialog(false))

    //关闭删除评论提示框
    dispatch(changeCloseTipAction(true))
  }

  return (
    <LoginHeaderWrapper>
      <span className="left">{title}</span>
      <span className="right" onClick={handleClose}>
        x
      </span>
    </LoginHeaderWrapper>
  )
}

export default memo(DialogHeader)
