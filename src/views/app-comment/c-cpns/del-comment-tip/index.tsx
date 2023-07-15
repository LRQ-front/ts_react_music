import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { TipWrapper } from './style'
import DialogHeader from '@/components/dialog-header'
import { Button, message } from 'antd'
import { operateComment } from '../../service/comment'
import { useAppDispatch, useAppSelector } from '@/store'
import { changeCloseTipAction, fetchCommentAction } from '../../store/comment'
interface IProps {
  children?: ReactNode
}

const CommentTip: React.FC<IProps> = () => {
  const dispatch = useAppDispatch()

  const { sourceId, commentId } = useAppSelector((state) => ({
    sourceId: state.comment.sourceId,
    commentId: state.comment.commentId
  }))

  async function handleSureClick() {
    const res = await operateComment(0, 2, sourceId, undefined, commentId)
    console.log(res)
    if (res.code === 200) {
      message.open({ content: '删除评论成功', duration: 1 })
    } else {
      message.open({ content: '删除评论失败', duration: 1 })
    }
    dispatch(changeCloseTipAction(true))
    dispatch(fetchCommentAction(0))
  }
  return (
    <TipWrapper>
      <DialogHeader title="提升"></DialogHeader>
      <div className="content">
        <div className="tip">确定删除评论?</div>
        <div className="operator">
          <Button className="sure" onClick={handleSureClick}>
            确定
          </Button>
          <Button onClick={(e) => dispatch(changeCloseTipAction(true))}>
            取消
          </Button>
        </div>
      </div>
    </TipWrapper>
  )
}

export default memo(CommentTip)
