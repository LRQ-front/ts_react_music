import React, { memo, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { NewPlaylistWrapper } from './style'
import DialogHeader from '@/components/dialog-header'
import { Input, Button } from 'antd'
import { addSongTolist, newPlaylist } from '@/service/modules/main'
import { message } from 'antd'
import { useAppDispatch } from '@/store'
import {
  addSongToPlaylistAction,
  changeShowCollectDialog
} from '@/store/modules/collect'
interface IProps {
  children?: ReactNode
  needCollectSongid: number
}

const NewPlaylist: React.FC<IProps> = (props) => {
  const { needCollectSongid } = props
  const dispatch = useAppDispatch()

  const [playlistName, setPlaylistName] = useState('')
  // const [collectSongId, setCollectSongId] = useState(-1)

  // useEffect(() => {
  //   //监听发送过来的收藏歌曲id,行不通！！！
  //   eventBus.on('getCollectSongId', handleCollectSong)
  //   return () => {
  //     eventBus.off('getCollectSongId', handleCollectSong)
  //   }
  // }, [])
  // function handleCollectSong(id: number) {
  //   console.log('id', id)
  //   setCollectSongId(id)
  // }

  async function handleNewClick() {
    const res = await newPlaylist(playlistName)
    const pid = res.id
    console.log(res)
    //判断是否新建歌单成功
    if (res.code === 200) {
      console.log('新建成功')
      //添加歌曲到歌单
      dispatch(addSongToPlaylistAction({ pid: pid, tracks: needCollectSongid }))
    } else {
      message.open({
        content: '新建歌单失败',
        duration: 1
      })
      console.log('新建失败')
    }
    //关闭收藏弹框
    dispatch(changeShowCollectDialog(false))
  }
  return (
    <NewPlaylistWrapper>
      <DialogHeader title="新建歌单"></DialogHeader>
      <div className="info">
        <div className="playlist">
          歌单名:
          <Input
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          ></Input>
        </div>
        <p className="tip">可以通过“收藏”将音乐添加到新歌单中</p>
        <div className="btn">
          <Button type="primary" className="new" onClick={handleNewClick}>
            新建
          </Button>
          <Button onClick={(e) => dispatch(changeShowCollectDialog(false))}>
            取消
          </Button>
        </div>
      </div>
    </NewPlaylistWrapper>
  )
}

export default memo(NewPlaylist)
