import React, { memo, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { RankingCategoryWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { getImageSize } from '@/utils/format'
import { changeCurrentSortDetailInfoAction } from '../../store'
import classNames from 'classnames'
import { getSortDetail } from '../../service'
import {
  changeSourceIdAction,
  fetchCommentAction
} from '@/views/app-comment/store/comment'
interface IProps {
  children?: ReactNode
}

const RankingCategory: React.FC<IProps> = () => {
  const dispatch = useAppDispatch()

  const [currentIndex, setCurrentIndex] = useState(0)

  const { rankSort } = useAppSelector(
    (state) => ({
      rankSort: state.ranking.topList
    }),
    shallowEqual
  )

  useEffect(() => {
    dispatch(changeSourceIdAction(rankSort?.[0]?.id))
    dispatch(fetchCommentAction(0))
  }, [rankSort])

  async function handleItemClick(index: number) {
    setCurrentIndex(index)
    //更改榜单分类
    const id = rankSort[index].id
    const res = await getSortDetail(id)
    dispatch(changeCurrentSortDetailInfoAction(res.playlist))
    // dispatch(changeCurrentSortListAction(id))

    //将榜单对应的id存起来，用于获取评论
    dispatch(changeSourceIdAction(id))
    dispatch(fetchCommentAction(0))
  }

  return (
    <RankingCategoryWrapper>
      {rankSort?.map((item, index) => {
        let header
        if (index === 0 || index === 4) {
          header = (
            <div className="header">
              {index === 0 ? '云音乐特色榜' : '全球媒体榜'}
            </div>
          )
        }
        return (
          <div key={item.id}>
            {header}
            <div
              className={classNames('item', { active: index === currentIndex })}
              onClick={(e) => handleItemClick(index)}
            >
              <img src={getImageSize(item.coverImgUrl, 40)} alt="" />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="update">{item.updateFrequency}</div>
              </div>
            </div>
          </div>
        )
      })}
    </RankingCategoryWrapper>
  )
}

export default memo(RankingCategory)
