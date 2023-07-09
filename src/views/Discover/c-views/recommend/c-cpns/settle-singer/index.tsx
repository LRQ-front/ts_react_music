import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { SingerWrapper } from './style'
import AreaHeaderV2 from '@/components/area-header-v2'
import { useAppSelector } from '@/store'
import { getImageSize } from '@/utils/format'
interface IProps {
  children?: ReactNode
}

const SettleSinger: React.FC<IProps> = () => {
  const { settleSinger = [] } = useAppSelector((state) => ({
    settleSinger: state.recommend.settleSinger
  }))
  return (
    <SingerWrapper>
      <AreaHeaderV2
        title="入驻歌手"
        moreText="查看全部 &gt;"
        moreLink="#/discover/artist"
      ></AreaHeaderV2>
      <div className="artist-list">
        {settleSinger?.map((item) => {
          return (
            <a href="#/discover/artist" key={item.id} className="item">
              <img src={getImageSize(item.img1v1Url, 62)} alt="" />
              <div className="info">
                <div className="singer">{item.name}</div>
                <div className="desc">{item.alias.join(' ') || item.name}</div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply-for">
        <a href="">申请成为网易音乐人</a>
      </div>
    </SingerWrapper>
  )
}

export default memo(SettleSinger)
