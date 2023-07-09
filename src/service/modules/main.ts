//通用的接口请求

import myRequest, { requestWithCK } from '..'

//新建歌单
export const newPlaylist = (name: string, privacy?: string, type?: string) => {
  return requestWithCK.get({
    url: '/playlist/create',
    params: {
      name,
      privacy,
      type
    }
  })
}

//添加歌曲到歌单
export const addSongTolist = (op: string, pid: number, tracks: number) => {
  return requestWithCK.get({
    url: '/playlist/tracks',
    params: {
      op,
      pid,
      tracks
    }
  })
}
