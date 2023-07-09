import React, { memo, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { RankingListWrapper } from './style'
import ThemeHeaderSong from '@/components/theme-header-song'
import { getImageSize } from '@/utils/format'
import { useAppDispatch, useAppSelector } from '@/store'
import { formatMinuteSecond } from '@/utils/format'
import { fetchSongDetailAction } from '@/views/player/store'
import Comment from '@/views/app-comment'
import Collect from '../collect'
import { fetchUserPlaylistAction } from '@/store/modules/user'
import { changeShowPanelAction, fetchCodeDataAction } from '@/views/login/store'
import { shallowEqual } from 'react-redux'
import { changeShowCollectDialog } from '@/store/modules/collect'
interface IProps {
  children?: ReactNode
}

const RankingList: React.FC<IProps> = () => {
  const dispatch = useAppDispatch()

  const [showIconIndex, setShowIconIndex] = useState(-1)
  const [needCollectSongid, setNeedwCollectSongid] = useState(-1)

  const { playlist, avatarUrl, showCollectDialog } = useAppSelector(
    (state) => ({
      playlist: state.ranking.playlist,
      avatarUrl: state.user.avatarUrl,
      showCollectDialog: state.collect.showCollectDialog
    }),
    shallowEqual
  )

  // useEffect(() => {
  //使用事件总线
  //   eventBus.on('closeDialogCollect', handleCloseCollect)

  //   return () => {
  //     eventBus.off('closeDialogCollect', handleCloseCollect)
  //   }
  // }, [])

  // function handleCloseCollect(flag: boolean) {
  //   // setShowDialog(flag)
  // }

  function handleCollectClick(id: number) {
    //判断是否有进行登录，没有进行登录操作
    if (!avatarUrl) {
      //没有登录,弹出登陆框，
      dispatch(changeShowPanelAction(true))
      dispatch(fetchCodeDataAction())
    } else {
      //发起获取歌单请求
      dispatch(fetchUserPlaylistAction())
      //将收藏的歌曲id发送给新建歌曲组件
      // eventBus.emit('getCollectSongId', id),行不通
      setNeedwCollectSongid(id)

      // 弹出收藏对话框
      dispatch(changeShowCollectDialog(true))
    }
  }

  return (
    <RankingListWrapper>
      <ThemeHeaderSong></ThemeHeaderSong>
      <div className="play-list">
        <table>
          <thead>
            <tr className="header">
              <th className="ranking"></th>
              <th className="title">标题</th>
              <th className="duration">时长</th>
              <th className="singer">歌手</th>
            </tr>
          </thead>
          <tbody>
            {playlist?.tracks?.map((item: any, index: number) => {
              return (
                <tr
                  className="row"
                  key={item.id}
                  onMouseEnter={(e) => setShowIconIndex(index)}
                  onMouseLeave={(e) => setShowIconIndex(-1)}
                >
                  <td>
                    <div className="rank-num">
                      <span className="num">{index + 1}</span>
                      <span className="new sprite_icon2"></span>
                    </div>
                  </td>
                  <td>
                    <div className="song-name">
                      {index < 3 ? (
                        <img src={getImageSize(item.al.picUrl, 50)} alt="" />
                      ) : null}
                      <span className="play sprite_table"></span>
                      <span className="name">{item.name}</span>
                    </div>
                  </td>
                  <td className="icons">
                    {showIconIndex === index ? (
                      <span>
                        <a
                          className="btn play sprite_icon2"
                          title="播放"
                          onClick={(e) =>
                            dispatch(fetchSongDetailAction(item.id))
                          }
                        ></a>
                        <a
                          className="btn collect sprite_table"
                          onClick={(e) => handleCollectClick(item.id)}
                          title="收藏"
                        ></a>
                        <a className="btn share sprite_table" title="分享"></a>
                        <a
                          className="btn download sprite_table"
                          title="下载"
                        ></a>
                      </span>
                    ) : (
                      formatMinuteSecond(item.dt)
                    )}
                  </td>
                  <td>{item.ar[0].name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {showCollectDialog && (
          <Collect needCollectSongid={needCollectSongid}></Collect>
        )}
      </div>
      <Comment></Comment>
    </RankingListWrapper>
  )
}

export default memo(RankingList)
