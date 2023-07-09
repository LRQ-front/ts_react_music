import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { HotWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '@/store'
import SongMenuItem from '@/components/song-menu-item'
interface IProps {
  children?: ReactNode
}

const HotRecommend: React.FC<IProps> = () => {
  const { hotRecommend = [] } = useAppSelector(
    (state) => ({
      hotRecommend: state.recommend.hotRecommend
    }),
    shallowEqual
  )
  return (
    <HotWrapper>
      <AreaHeaderV1
        title="热门推荐"
        moreLink="/discover/songs"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
      ></AreaHeaderV1>
      <div className="recommend-list">
        {hotRecommend?.map((item) => {
          return <SongMenuItem key={item.id} itemData={item}></SongMenuItem>
        })}
      </div>
    </HotWrapper>
  )
}

export default memo(HotRecommend)
