import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../service/player'
import { ILyric, parseLyricToArr } from '@/utils/parse-lyric'
import type { IRootState } from '@/store'

interface IThunkConfig {
  state: IRootState
}

export const fetchSongDetailAction = createAsyncThunk<
  void,
  number,
  IThunkConfig
>('songDetail', (id, { dispatch, getState }) => {
  //1.先判断播放列表是否有这个首歌曲
  const playSongList = getState().player.playSongList
  const songIndex = playSongList.findIndex((item) => item.id === id)

  if (songIndex !== -1) {
    //播放列表找到歌曲
    const currentSong = playSongList[songIndex]
    dispatch(changeCurrentSongAction(currentSong))
    dispatch(changePlaySongIndexACtion(songIndex))
  } else {
    //没有找到，则发起请求，获取歌曲详情
    getSongDetail(id).then((res) => {
      if (!res?.songs?.length) return
      dispatch(changeCurrentSongAction(res.songs[0]))

      const newPlaySongList = [...playSongList]
      newPlaySongList.push(res.songs[0])

      const playSongIndex = newPlaySongList.length - 1

      dispatch(changePlaySongIndexACtion(playSongIndex))
      dispatch(changePlaySongListAction(newPlaySongList))
    })
  }

  //获取歌词
  // console.log(id)
  getSongLyric(id).then((res) => {
    if (!res?.lrc?.lyric) return
    const result = parseLyricToArr(res.lrc.lyric)

    dispatch(changeLyricAction(result))
  })
})

//切换上一首或下一首歌曲
export const preOrNextSong = createAsyncThunk<void, boolean, IThunkConfig>(
  'changeSong',
  (isNext, { dispatch, getState }) => {
    const player = getState().player
    const playMode = player.playMode
    const playSongIndex = player.playSongIndex
    const playSongList = player.playSongList
    const songLength = playSongList.length

    //根据播放模式获取下一首歌曲的下标
    let newIndex
    if (playMode === 1) {
      //随机播放
      newIndex = Math.floor(playSongList.length * Math.random())
    } else {
      //顺序播放，单曲循环
      newIndex = isNext
        ? (playSongIndex + 1) % songLength
        : (playSongIndex - 1 + songLength) % songLength
    }
    const song = playSongList[newIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexACtion(newIndex))
    console.log(newIndex)

    //需要获取新歌词
    getSongLyric(song.id).then((res) => {
      const result = parseLyricToArr(res.lrc.lyric)

      dispatch(changeLyricAction(result))
    })
  }
)

interface IPlayerState {
  currentSong: any
  lyric: ILyric[]
  lyricIndex: number
  playSongList: any[]
  playSongIndex: number
  playMode: number
}

const initialState: IPlayerState = {
  currentSong: {},
  lyric: [],
  lyricIndex: -1,
  playSongList: [
    {
      name: '写一首歌',
      id: 2038024027,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 12700520,
          name: 'CJ 周密',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 71,
      crbt: null,
      cf: '',
      al: {
        id: 163382000,
        name: '毕业生',
        picUrl:
          'https://p1.music.126.net/OVZrI-yiC44JBvhiuN7UJA==/109951168572193482.jpg',
        tns: [],
        pic_str: '109951168572193482',
        pic: 109951168572193490
      },
      dt: 196532,
      h: {
        br: 320000,
        fid: 0,
        size: 7863405,
        vd: -57152,
        sr: 48000
      },
      m: {
        br: 192000,
        fid: 0,
        size: 4718061,
        vd: -54557,
        sr: 48000
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3145389,
        vd: -52889,
        sr: 48000
      },
      sq: {
        br: 979128,
        fid: 0,
        size: 24053823,
        vd: -57359,
        sr: 48000
      },
      hr: {
        br: 1745595,
        fid: 0,
        size: 42883284,
        vd: -57099,
        sr: 48000
      },
      a: null,
      cd: '01',
      no: 2,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 536879104,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 71,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 0,
      mv: 0,
      publishTime: 1681142400000
    },

    {
      name: '向云端',
      id: 2049512697,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 1192268,
          name: '小霞',
          tns: [],
          alias: []
        },
        {
          id: 36985903,
          name: '海洋Bo',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 3,
      crbt: null,
      cf: '',
      al: {
        id: 166146490,
        name: '向云端',
        picUrl:
          'https://p2.music.126.net/TmOHxaGnFNlwNX8aPz66oA==/109951168638913915.jpg',
        tns: [],
        pic_str: '109951168638913915',
        pic: 109951168638913920
      },
      dt: 251613,
      h: {
        br: 320000,
        fid: 0,
        size: 10066605,
        vd: -29886,
        sr: 48000
      },
      m: {
        br: 192000,
        fid: 0,
        size: 6039981,
        vd: -27277,
        sr: 48000
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4026669,
        vd: -25558,
        sr: 48000
      },
      sq: {
        br: 915752,
        fid: 0,
        size: 28801918,
        vd: -29935,
        sr: 48000
      },
      hr: {
        br: 1683323,
        fid: 0,
        size: 52943266,
        vd: -29903,
        sr: 48000
      },
      a: null,
      cd: '01',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 536879104,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 3,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mst: 9,
      rtype: 0,
      rurl: null,
      cp: 0,
      mv: 0,
      publishTime: 0
    }
  ],
  playSongIndex: -1,
  playMode: 0 //0:顺序,1:随机,2:单曲
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricAction(state, { payload }) {
      state.lyric = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload
    },
    changePlaySongIndexACtion(state, { payload }) {
      state.playSongIndex = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricAction,
  changeLyricIndexAction,
  changePlaySongListAction,
  changePlaySongIndexACtion,
  changePlayModeAction
} = playerSlice.actions

export default playerSlice.reducer
