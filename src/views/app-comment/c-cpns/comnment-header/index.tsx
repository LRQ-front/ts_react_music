import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { CommentHeaderWrapper } from './style'
interface IProps {
  children?: ReactNode
  totalComment: number
}

const CommentHeader: React.FC<IProps> = (props) => {
  return (
    <CommentHeaderWrapper>
      <div className="cnt">
        <h3 className="title">评论</h3>
        <div className="comment-num">共{props.totalComment}条评论</div>
      </div>
    </CommentHeaderWrapper>
  )
}

export default memo(CommentHeader)
