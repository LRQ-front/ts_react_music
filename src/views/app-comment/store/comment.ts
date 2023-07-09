import { getPlaylistComments } from '@/views/app-comment/service/comment'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IRootState } from '../../../store'

// interface IArgs {
//   // id: number
//   offset?: number
// }

export const fetchCommentAction = createAsyncThunk<
  void,
  number,
  { state: IRootState }
>('fetchcomment', async (offset, { dispatch, getState }) => {
  const playlistId = getState().comment.sourceId
  const res = await getPlaylistComments(playlistId, offset)
  console.log('最新评论', res)

  dispatch(changeTotalAction(res.total))
  dispatch(changeCommentsAction(res.comments))
})

interface IState {
  total: number
  comments: any[]
  sourceId: number
  closeDelTip: boolean
  commentId: number
}

const initialState: IState = {
  total: -1,
  comments: [],
  sourceId: -1, //根据这个id获取评论
  closeDelTip: true,
  commentId: -1 //评论id
}

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    changeTotalAction(state, { payload }) {
      state.total = payload
    },
    changeCommentIdAction(state, { payload }) {
      state.commentId = payload
    },
    changeCommentsAction(state, { payload }) {
      state.comments = payload
    },
    changeSourceIdAction(state, { payload }) {
      state.sourceId = payload
    },
    changeCloseTipAction(state, { payload }) {
      state.closeDelTip = payload
    }
  }
})

export const {
  changeTotalAction,
  changeCommentIdAction,
  changeCommentsAction,
  changeSourceIdAction,
  changeCloseTipAction
} = commentSlice.actions

export default commentSlice.reducer
