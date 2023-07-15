import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './modules/counter'
import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
  shallowEqual
} from 'react-redux'
import recommendSlice from '@/views/Discover/c-views/recommend/store/index'
import playerSlice from '@/views/player/store/index'
import searchSlice from './modules/search'
import loginSlice from '@/views/login/store/index'
import userSlice from './modules/user'
import rankingSlice from '@/views/Discover/c-views/ranking/store/index'
import collectSlice from './modules/collect'
import commentSlice from '../views/app-comment/store/comment'

const store = configureStore({
  reducer: {
    counter: counterSlice,
    recommend: recommendSlice,
    player: playerSlice,
    search: searchSlice,
    login: loginSlice,
    user: userSlice,
    ranking: rankingSlice,
    collect: collectSlice,
    comment: commentSlice
  }
})

//使用useSelector((state)=>({}))能够自动推导出state参数的类型
type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
type DispatchType = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
//下面这个也可以封装
export const shallowEqualApp = shallowEqual

export default store
