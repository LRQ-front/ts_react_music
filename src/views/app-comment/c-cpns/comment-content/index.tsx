import React, { memo, useState, useRef, ElementRef } from 'react'
import type { ReactNode } from 'react'
import { ContentWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import { Pagination } from 'antd'
import { shallowEqual } from 'react-redux'
import {
  changeCloseTipAction,
  changeCommentIdAction,
  fetchCommentAction
} from '../../store/comment'
import classNames from 'classnames'
import DelCommentTip from '../del-comment-tip'
import { Button, message } from 'antd'
import { operateComment } from '../../service/comment'
import useVerifyLogin from '@/hooks/useVerifyLogin'
interface IProps {
  children?: ReactNode
}

const CommentContent: React.FC<IProps> = () => {
  const dispatch = useAppDispatch()

  const replyRef = useRef<HTMLInputElement>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [showDelIndex, setShowDelIndex] = useState(-1)
  const [showReplyIndex, setShowReplyIndex] = useState(-1)
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState('')
  // const [likeActiveIndex, setLikeActiveIndex] = useState(-1)

  const { verify } = useVerifyLogin()

  const {
    comments,
    total = 1,
    uid,
    sourceId,
    closeDelTip
  } = useAppSelector(
    (state) => ({
      comments: state.comment.comments,
      total: state.comment.total,
      uid: state.user.uid,
      sourceId: state.comment.sourceId,
      closeDelTip: state.comment.closeDelTip
    }),
    shallowEqual
  )

  function handleCurrentPageChange(page: number) {
    setCurrentPage(page)
    const offset = (page - 1) * 20
    dispatch(fetchCommentAction(offset))
  }

  async function handleDelClick(commentId: number) {
    dispatch(changeCloseTipAction(false))

    dispatch(changeCommentIdAction(commentId))
  }

  //回复点击
  function handleReplyClick(index: number) {
    if (!verify()) {
      return
    }
    setTimeout(() => {
      replyRef.current?.focus()
    }, 0)
    if (index !== showReplyIndex) {
      setShowReplyIndex(index)
      setShowReply(true)
    } else {
      setShowReply(!showReply)
      if (index === showReplyIndex) return
      setShowReplyIndex(index)
    }
  }

  function handleReplyChange(e: any) {
    // console.log(e.target.defaultValue)
    const content = e.target.value.replace(e.target.defaultValue, '')
    // console.log(content)
    setReplyText(content)
  }

  async function handleCommentClick(commentId: number) {
    //调用回复评论接口
    const res = await operateComment(2, 2, sourceId, replyText, commentId)
    // console.log(res)
    //获取最新评论
    dispatch(fetchCommentAction(0))
    //关闭回复
    setShowReply(false)
    if (res.code === 200) {
      message.open({
        content: `评论成功`,
        duration: 2
      })
    } else {
      message.open({
        content: `评论失败`,
        duration: 2
      })
    }
  }

  //点赞点击
  function handleLikeClick(index: number) {
    console.log(111)
  }

  return (
    <ContentWrapper>
      <div className="header">最新评论（{total}）</div>
      <div className="ctx">
        {comments?.map((item, index) => {
          const likedCount = item.likedCount
          let num
          if (likedCount !== 0) {
            // console.log(likedCount)

            num = <span>（{item.likedCount}）</span>
          } else {
            num = ''
          }
          return (
            <div
              className="item"
              key={item.time}
              onMouseEnter={(e) => setShowDelIndex(index)}
              onMouseLeave={(e) => setShowDelIndex(-1)}
            >
              <div className="avatar">
                <img src={item.user.avatarUrl} alt="" />
              </div>
              <div className="info">
                <div className="top">
                  <span className="blue">{item.user.nickname}</span> :
                  {item.content}
                </div>
                {item.beReplied.length !== 0 && (
                  <div className="beReply">
                    {item.beReplied[0].content ? (
                      <div>
                        <span className="blue">
                          {item.beReplied[0].user.nickname}
                        </span>
                        : {item.beReplied[0].content}
                      </div>
                    ) : (
                      '该评论已删除'
                    )}
                  </div>
                )}
                <div className="bottom">
                  <div className="left">{item.timeStr}</div>
                  <div className="right">
                    {showDelIndex === index && (
                      <div
                        className={classNames('del', {
                          'del-active': uid === item.user.userId
                        })}
                      >
                        <span onClick={(e) => handleDelClick(item.commentId)}>
                          删除
                        </span>
                        <span className="divider">|</span>
                      </div>
                    )}
                    <i
                      className={classNames('sprite_icon3 like')}
                      onClick={(e) => handleLikeClick(index)}
                    ></i>
                    {num}
                    <span className="divider">|</span>
                    <div
                      className="replay"
                      onClick={(e) => handleReplyClick(index)}
                    >
                      回复
                    </div>
                  </div>
                </div>
                {showReply && showReplyIndex === index && (
                  <div className="replay-ctn">
                    <div className="replay-text">
                      <input
                        defaultValue={`回复${item.user.nickname}:`}
                        className="replay-input"
                        ref={replyRef}
                        onChange={(e) => handleReplyChange(e)}
                      ></input>
                    </div>
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
                          onClick={(e) => handleCommentClick(item.commentId)}
                        >
                          回复
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      {!closeDelTip && <DelCommentTip></DelCommentTip>}
      {total !== -1 && (
        <div className="pagination">
          <Pagination
            current={currentPage}
            onChange={(e) => handleCurrentPageChange(e)}
            total={Math.ceil(total / 20)}
          />
        </div>
      )}
    </ContentWrapper>
  )
}

export default memo(CommentContent)
