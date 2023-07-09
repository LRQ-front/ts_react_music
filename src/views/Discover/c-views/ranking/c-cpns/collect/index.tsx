import React, { memo, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { CollectWrapper } from './style'
import DialogHeader from '@/components/dialog-header'
import { useAppDispatch, useAppSelector } from '@/store'
import classNames from 'classnames'
import NewPlaylist from '../new-playlist'
import {
  addSongToPlaylistAction,
  changeShowCollectDialog
} from '@/store/modules/collect'
interface IProps {
  children?: ReactNode
  needCollectSongid: number
}

const Collect: React.FC<IProps> = (props) => {
  const { needCollectSongid } = props
  const dispatch = useAppDispatch()
  const { userPlaylist } = useAppSelector((state) => ({
    userPlaylist: state.user.userPlayList
  }))
  // const [collectSongid, setCollectSongid] = useState(-1)

  // useEffect(() => {
  //   setCollectSongid(needCollectSongid)
  // }, [needCollectSongid])

  const [showNewPlaylist, setShowNewPlaylist] = useState(false)

  function handlePlaylistItemClick(pid: number) {
    console.log(pid)

    dispatch(
      addSongToPlaylistAction({
        pid: pid,
        tracks: needCollectSongid
      })
    )
    dispatch(changeShowCollectDialog(false))
  }
  return (
    <CollectWrapper>
      {!showNewPlaylist ? (
        <div className="main">
          <DialogHeader title="添加到歌单"></DialogHeader>
          <div className="content">
            <div
              className="add-songlist"
              onClick={(e) => setShowNewPlaylist(true)}
            >
              <i className="add sprite_icon2"></i>
              <span className="text">新歌单</span>
            </div>
            <div className="song-list">
              {userPlaylist?.map((item, index) => {
                return (
                  <div
                    className={classNames('item', {
                      line: index !== userPlaylist.length - 1
                    })}
                    key={index}
                    onClick={(e) => handlePlaylistItemClick(item.id)}
                  >
                    <img src={item.coverImgUrl} className="cover-img" alt="" />
                    <div className="info">
                      <h3 className="title">{item.name}</h3>
                      <div className="num">{item.trackCount}首</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <NewPlaylist needCollectSongid={needCollectSongid}></NewPlaylist>
      )}
    </CollectWrapper>
  )
}

export default memo(Collect)
