import { getSearchSuggest } from '@/service/modules/search'
import { parseResToSuggestString } from '@/utils/parse-suggest'
import stringToNodes from '@/utils/toRichNodex'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchSearchSuggestAction = createAsyncThunk(
  'searchSuggest',
  async (keywords: string, { dispatch }) => {
    const res = await getSearchSuggest(keywords)
    dispatch(changeSearchSuggestAction(res.result))

    //搜索建议列表，字符串类型
    const typeArr = ['单曲', '歌手', '专辑', '歌单']
    const classNamesArr = ['songs', 'artists', 'albums', 'playlists']
    const suggestStringList = parseResToSuggestString(res.result)
    const newSuggestStringList = suggestStringList.map((item, index) => ({
      type: typeArr[index],
      classname: classNamesArr[index],
      keywords: item.map((iten) => stringToNodes(iten, keywords))
    }))

    dispatch(changeSuggestListAction(newSuggestStringList))
  }
)

interface IsuggestStringListItem {
  type: string
  classname: string
  keywords: any[]
}

interface ISearchState {
  searchSuggest: object
  suggestStringList: IsuggestStringListItem[]
}

const initialState: ISearchState = {
  searchSuggest: {},
  suggestStringList: []
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearchSuggestAction(state, { payload }) {
      state.searchSuggest = payload
    },
    changeSuggestListAction(state, { payload }) {
      state.suggestStringList = payload
    }
  }
})
export const { changeSearchSuggestAction, changeSuggestListAction } =
  searchSlice.actions

export default searchSlice.reducer
