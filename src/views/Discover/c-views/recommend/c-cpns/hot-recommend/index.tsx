import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { HotWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '@/store'
import SongMenuItem from '@/components/song-menu-item'
import { message } from 'antd'
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
  function handleClick() {
    message.open({
      content: `功能未开发`,
      duration: 1,
      key: 'func'
    })
  }
  return (
    <HotWrapper>
      <AreaHeaderV1
        title="热门推荐"
        moreLink="/discover/songs"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
      ></AreaHeaderV1>
      <div className="recommend-list" onClick={handleClick}>
        {hotRecommend?.map((item) => {
          return <SongMenuItem key={item.id} itemData={item}></SongMenuItem>
        })}
      </div>
    </HotWrapper>
  )
}

export default memo(HotRecommend)
