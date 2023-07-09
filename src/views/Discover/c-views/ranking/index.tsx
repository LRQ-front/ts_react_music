import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { RankingLeft, RankingRight, RankingWrapper } from './style'
import RankingHeader from './c-cpns/ranking-header'
import RankingList from './c-cpns/ranking-list'
import RankingCategory from './c-cpns/top-ranking'
import { useAppDispatch } from '@/store'
import { fetchTopCategoryAction } from './store'
interface IProps {
  children?: ReactNode
}

const Ranking: React.FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    //获取榜单分类
    dispatch(fetchTopCategoryAction())
  })

  return (
    <RankingWrapper className="wrap-v2">
      <RankingLeft>
        <RankingCategory></RankingCategory>
      </RankingLeft>
      <RankingRight>
        <RankingHeader></RankingHeader>
        <RankingList></RankingList>
      </RankingRight>
    </RankingWrapper>
  )
}

export default memo(Ranking)
