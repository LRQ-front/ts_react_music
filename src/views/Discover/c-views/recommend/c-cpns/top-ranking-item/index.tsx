import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { RankingItemWrapper } from './style'
import { getImageSize } from '@/utils/format'
import { useAppDispatch } from '@/store'
import { fetchSongDetailAction } from '@/views/player/store'
import useVerifyLogin from '@/hooks/useVerifyLogin'
import { useNavigate } from 'react-router-dom'
interface IProps {
  children?: ReactNode
  itemData: any
}

const RankingItem: React.FC<IProps> = (props) => {
  const { itemData } = props
  const { tracks = [] } = itemData
  const dispatch = useAppDispatch()
  const { verify } = useVerifyLogin()
  const navigate = useNavigate()

  function handlePlaySong(id: number) {
    dispatch(fetchSongDetailAction(id))
  }

  function handleFavor() {
    verify()
  }

  async function handleRanking(id: number) {
    // const res = await getSortDetail(id)
    // dispatch(changeCurrentSortDetailInfoAction(res.playlist))
    // dispatch(changeSourceIdAction(id))
    // dispatch(fetchCommentAction(0))
    navigate('/discover/ranking?id=' + id)
  }

  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img
            src={getImageSize(itemData.coverImgUrl, 80)}
            alt=""
            onClick={(e) => handleRanking(itemData.id)}
          />
          <a className="sprite_covor"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button
              className="sprite_02 btn play"
              onClick={(e) => handlePlaySong(tracks?.[0].id)}
            ></button>
            <button
              className="sprite_02 btn favor"
              onClick={handleFavor}
            ></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="item" key={item.id}>
              <div className="index">{index + 1}</div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="operator">
                  <button
                    className="btn sprite_02 play"
                    onClick={() => handlePlaySong(item.id)}
                  ></button>
                  <button className="btn sprite_icon2 add "></button>
                  <button
                    className="btn sprite_02 favor"
                    onClick={handleFavor}
                  ></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a href="#/discover/ranking">查看全部 &gt;</a>
      </div>
    </RankingItemWrapper>
  )
}

export default memo(RankingItem)
