import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getArtistList,
  getBanner,
  getHotRecommend,
  getNewAlbum,
  getPlayListDetail
} from '../service'

export const fetchBannerDataAction = createAsyncThunk(
  'banner',
  async (args, { dispatch }) => {
    const res = await getBanner()
    dispatch(changeBannerAction(res.banners))
  }
)

export const fetchHotRecommendAction = createAsyncThunk(
  'hotrecommend',
  async (args, { dispatch }) => {
    const res = await getHotRecommend(8)
    // console.log(res)
    dispatch(changeHotRecommendAction(res.result))
  }
)

export const fetchNewAlbumAction = createAsyncThunk(
  'newAlbum',
  async (args, { dispatch }) => {
    const res = await getNewAlbum()
    // console.log(res)
    dispatch(changeNewAlbumAction(res.albums))
  }
)

const rankingIds = [19723756, 3779629, 2884035]
export const fetchRankingAction = createAsyncThunk(
  'ranking',
  (_, { dispatch }) => {
    //第一种写法：所有榜单数据都按序存入一个有序数组中
    const promiseArr: Promise<any>[] = []
    for (const id of rankingIds) {
      promiseArr.push(getPlayListDetail(id))
    }

    Promise.all(promiseArr).then((res) => {
      const rankingDataArr = res.map((item) => item.playlist)
      dispatch(changeRankingAction(rankingDataArr))
    })

    //第二种写法：每个榜单都存入一个数组
    // for (const id of rankingIds) {
    //   getPlayListDetail(id).then((res) => {
    //     switch (id) {
    //       case 19723756:
    //         console.log(res)

    //         break

    //       case 3779629:
    //         console.log(res)

    //         break
    //     }
    //   })
    // }
  }
)

export const fetchArtistListAction = createAsyncThunk(
  'artist',
  async (_, { dispatch }) => {
    const res = await getArtistList(5)
    dispatch(changeArtistListAction(res.artists))
  }
)

// //第二种写法，不必调用多次action
// export const fetchRecommendDataAction = createAsyncThunk(
//   'recommendData',
//   (_, { dispatch }) => {
//     getHotRecommend(8).then((res) => {
//       dispatch(changeHotRecommendAction(res.result))
//     })
//     getNewAlbum().then((res) => {
//       dispatch(changeNewAlbumAction(res.albums))
//     })
//     getBanner().then((res) => {
//       dispatch(changeBannerAction(res.banners))
//     })
//   }
// )

interface IRecommmendState {
  banners: any[]
  hotRecommend: any[]
  newAlbum: any[]
  rankings: any[]
  settleSinger: any[]
}

const initialState: IRecommmendState = {
  banners: [],
  hotRecommend: [],
  newAlbum: [],
  rankings: [],
  settleSinger: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannerAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommend = payload
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlbum = payload
    },
    changeRankingAction(state, { payload }) {
      state.rankings = payload
    },
    changeArtistListAction(state, { payload }) {
      state.settleSinger = payload
    }
  }
})

export const {
  changeBannerAction,
  changeHotRecommendAction,
  changeNewAlbumAction,
  changeRankingAction,
  changeArtistListAction
} = recommendSlice.actions

export default recommendSlice.reducer
