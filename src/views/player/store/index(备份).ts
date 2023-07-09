import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../service/player'
import { ILyric, parseLyricToArr } from '@/utils/parse-lyric'

export const fetchSongDetailAction = createAsyncThunk(
  'songDetail',
  (id: number, { dispatch }) => {
    //获取歌曲详情
    getSongDetail(id).then((res) => {
      if (!res.songs.length) return
      dispatch(changeCurrenSongAction(res.songs[0]))
    })

    //获取歌词
    getSongLyric(id).then((res) => {
      const result = parseLyricToArr(res?.lrc.lyric)

      dispatch(changeLyricAction(result))
    })
  }
)

interface IPlayerState {
  currentSong: any
  lyric: ILyric[]
  lyricIndex: number
}

const initialState: IPlayerState = {
  currentSong: {},
  lyric: [],
  lyricIndex: -1
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrenSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricAction(state, { payload }) {
      state.lyric = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    }
  }
})

export const {
  changeCurrenSongAction,
  changeLyricAction,
  changeLyricIndexAction
} = playerSlice.actions

export default playerSlice.reducer
