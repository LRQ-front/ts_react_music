import React, { memo, useState } from 'react'
import type { ReactNode } from 'react'
import { CommentWrapper } from './style'
import ComnmentHeader from './c-cpns/comnment-header'
import { useAppDispatch, useAppSelector } from '@/store'
import TextArea from 'antd/es/input/TextArea'
import { Button } from 'antd'
import CommentContent from './c-cpns/comment-content'
import { message } from 'antd'
import { operateComment } from './service/comment'
import { fetchCommentAction } from './store/comment'
import useVerifyLogin from '@/hooks/useVerifyLogin'
interface IProps {
  children?: ReactNode
}

const Comment: React.FC<IProps> = () => {
  const [content, setContent] = useState('')
  const dispatch = useAppDispatch()

  const { verify } = useVerifyLogin()

  const {
    avatarUrl = '',
    sourceId,
    total
  } = useAppSelector((state) => ({
    avatarUrl: state.user.avatarUrl,
    sourceId: state.comment.sourceId,
    total: state.comment.total
  }))

  async function handleCommentClick() {
    const res = await operateComment(1, 2, sourceId, content)
    if (res.code === 200) {
      message.open({
        content: '评论成功',
        duration: 1
      })
    } else {
      message.open({
        content: '评论失败',
        duration: 1
      })
    }

    dispatch(fetchCommentAction(0))
    setContent('')
  }

  function handleFocus() {
    verify()
  }

  return (
    <CommentWrapper>
      <ComnmentHeader totalComment={total}></ComnmentHeader>
      <div className="content">
        <div className="comment-site">
          <div className="avatar">
            <img src={avatarUrl} alt="" />
          </div>
          <div className="comment-place">
            <TextArea
              value={content}
              onFocus={(e) => handleFocus()}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              placeholder="评论"
              className="textarea"
              maxLength={140}
            ></TextArea>
            <div className="btns">
              <div className="function">
                <i className="sprite_icon2 emotion"></i>
                <i className="sprite_icon2 call"></i>
              </div>
              <div className="delay">
                <span>140</span>
                <Button
                  type="primary"
                  size="small"
                  onClick={handleCommentClick}
                >
                  评论
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommentContent></CommentContent>
    </CommentWrapper>
  )
}

export default memo(Comment)
