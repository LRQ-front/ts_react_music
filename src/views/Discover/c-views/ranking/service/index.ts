import myRequest from '@/service'
import { requestWithCK } from '@/service'

export const getTopList = () => {
  return myRequest.get({
    url: '/toplist'
  })
}

//获取某个榜单分类的详情
export const getSortDetail = (id: number) => {
  // const cookie = localStorage.getItem('cookie')
  // if (cookie) {
  //   return myRequest.get({
  //     url: '/playlist/detail',
  //     params: {
  //       id
  //     },
  //     data: {
  //       cookie
  //     }
  //   })
  // } else {
  //   return myRequest.get({
  //     url: '/playlist/detail',
  //     params: {
  //       id
  //     }
  //   })
  // }
  return myRequest.get({
    url: '/playlist/detail',
    params: {
      id,
      timestamp: Date.now()
    }
  })
}

//获取用户信息 , 歌单，收藏，mv, dj 数量
export const getUserPlaylist = (uid: number, limit = 30, offset = 0) => {
  return requestWithCK.get({
    url: '/user/playlist',
    params: {
      uid,
      limit,
      offset,
      timestamp: Date.now() //由于缓存原因这里要添加时间错，否则点击收藏获取不到最新的歌单
    }
  })
}
