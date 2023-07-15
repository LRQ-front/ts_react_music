import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { RankingWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { useAppSelector } from '@/store'
import RankingItem from '../top-ranking-item/index'
interface IProps {
  children?: ReactNode
}

const TopRanking: React.FC<IProps> = () => {
  const { rankings = [] } = useAppSelector((state) => ({
    rankings: state.recommend.rankings
  }))
  return (
    <RankingWrapper>
      <AreaHeaderV1 title="榜单" moreLink="/discover/ranking"></AreaHeaderV1>
      <div className="content">
        {rankings
          .filter((item) => item)
          .map((item) => {
            return <RankingItem key={item.id} itemData={item}></RankingItem>
          })}
      </div>
    </RankingWrapper>
  )
}

export default memo(TopRanking)
