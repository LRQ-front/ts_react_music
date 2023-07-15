import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSortDetail, getTopList } from '../service'

export const fetchTopCategoryAction = createAsyncThunk(
  'topcategory',
  async (id: any, { dispatch }) => {
    const res = await getTopList()
    console.log('toplist', res)
    console.log('id', id)
    let showId = id
    if (id === 0) {
      showId = res.list[0].id
    }

    const DetailRes = await getSortDetail(showId)

    dispatch(changeTopListAction(res.list))
    // dispatch(changeCurrentSortListAction(res.list[0]))
    dispatch(changeCurrentSortDetailInfoAction(DetailRes.playlist))
  }
)

interface IState {
  topList: any[]
  // currentSortList: any
  playlist: any
}

const initialState: IState = {
  topList: [],
  // currentSortList: {},
  playlist: {}
}

const RankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {
    changeTopListAction(state, { payload }) {
      state.topList = payload
    },
    // changeCurrentSortListAction(state, { payload }) {
    //   state.currentSortList = payload
    // },
    changeCurrentSortDetailInfoAction(state, { payload }) {
      state.playlist = payload
    }
  }
})

export const {
  changeTopListAction,
  // changeCurrentSortListAction,
  changeCurrentSortDetailInfoAction
} = RankingSlice.actions

export default RankingSlice.reducer
