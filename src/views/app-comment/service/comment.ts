import myRequest, { requestWithCK } from '../../../service'

//获取歌单评论
export const getPlaylistComments = (id: number, offset?: number) => {
  return myRequest.get({
    url: `/comment/playlist`,
    params: {
      id,
      offset,
      timestamp: Date.now()
    }
  })
}

//发送或者删除评论
export const operateComment = (
  t: number,
  type: number,
  id: number,
  content?: string,
  commentId?: number
) => {
  return requestWithCK.get({
    url: '/comment',
    params: {
      t, //1:发送，2：回复,0：删除
      type, //资源类型，2：歌单
      content,
      id, //评论的对应资源id
      commentId,
      timestamp: Date.now()
    }
  })
}
