import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { RankingHeaderWrapper } from './style'
import { useAppSelector } from '@/store'
import { formatMonthDay } from '@/utils/format'
import SongOperatorBar from '@/components/song-operator-bar'
import { shallowEqual } from 'react-redux'
interface IProps {
  children?: ReactNode
}

const RankingHeader: React.FC<IProps> = () => {
  const { playlist } = useAppSelector(
    (state) => ({
      playlist: state.ranking.playlist
    }),
    shallowEqual
  )
  return (
    <RankingHeaderWrapper>
      <div className="image">
        <img src={playlist?.coverImgUrl} alt="" />
        {/* <span className="image_cover">封面</span> */}
      </div>
      <div className="info">
        <div className="title">{playlist?.name}</div>
        <div className="time">
          <i className="clock sprite_icon2"></i>
          <div>最近更新：{formatMonthDay(playlist?.updateTime)}</div>
          <div className="update-f">（{'每日更新:TODO'}）</div>
        </div>
        <SongOperatorBar
          favorTitle={playlist?.subscribedCount}
          shareTitle={playlist?.shareCount}
          downloadTitle="下载"
          commentTitle={playlist?.commenCount}
        />
      </div>
    </RankingHeaderWrapper>
  )
}

export default memo(RankingHeader)
