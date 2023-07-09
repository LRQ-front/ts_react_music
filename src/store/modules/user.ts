import { getUserPlaylist } from '@/views/Discover/c-views/ranking/service'
import { getLoginStatus } from '@/views/login/service'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IRootState } from '..'

interface IState {
  avatarUrl: string
  cookie: string
  uid: number
  userPlayList: any[]
}

const initialState: IState = {
  avatarUrl: '',
  cookie: '',
  uid: -1,
  userPlayList: [] //用户歌单
}

export const storeUseInfoAction = createAsyncThunk(
  'userinfo',
  async (cookie: string, { dispatch }) => {
    document.cookie = cookie
    localStorage.setItem('cookie', JSON.stringify(cookie))
    const res = await getLoginStatus(cookie)
    // console.log('cookieRes', res)

    const uid = res.data.profile.userId
    const avatarUrl = res.data.profile.avatarUrl
    // console.log('avatarUrl', avatarUrl)

    //刚开始登录的时候，获取用户歌单
    const userRes = await getUserPlaylist(uid)
    console.log('userRes', userRes)
    dispatch(changeUserPlayListAction(userRes.playlist))

    dispatch(changeUidoAction(uid))
    dispatch(changeCookieAction(cookie))
    dispatch(changeAvataUrlAction(avatarUrl))
  }
)

//获取用户歌单
export const fetchUserPlaylistAction = createAsyncThunk<
  void,
  void,
  { state: IRootState }
>('userplaylist', async (_, { dispatch, getState }) => {
  const uid = getState().user.uid

  const res = await getUserPlaylist(uid)
  dispatch(changeUserPlayListAction(res.playlist))
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUidoAction(state, { payload }) {
      state.uid = payload
    },
    changeCookieAction(state, { payload }) {
      state.cookie = payload
    },
    changeAvataUrlAction(state, { payload }) {
      state.avatarUrl = payload
    },
    changeUserPlayListAction(state, { payload }) {
      state.userPlayList = payload
    }
  }
})

export const {
  changeUidoAction,
  changeAvataUrlAction,
  changeUserPlayListAction,
  changeCookieAction
} = userSlice.actions

export default userSlice.reducer
