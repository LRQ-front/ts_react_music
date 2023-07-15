import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { addSongTolist } from '@/service/modules/main'

interface IArgs {
  pid: number
  tracks: number
}

//添加歌曲到歌单操作
export const addSongToPlaylistAction = createAsyncThunk<void, IArgs>(
  'addto',
  async ({ pid, tracks }) => {
    const AddRes = await addSongTolist('add', pid, tracks)
    if (AddRes.body.message === '非法歌曲') {
      message.open({
        content: '收藏失败',
        duration: 1
      })
    } else {
      message.open({
        content: '收藏成功',
        duration: 1
      })
    }
  }
)

interface IState {
  showCollectDialog: boolean
}

const initialState: IState = {
  showCollectDialog: false
}

const collectSlice = createSlice({
  name: 'collect',
  initialState,
  reducers: {
    changeShowCollectDialog(state, { payload }) {
      state.showCollectDialog = payload
    }
  }
})

export const { changeShowCollectDialog } = collectSlice.actions

export default collectSlice.reducer
