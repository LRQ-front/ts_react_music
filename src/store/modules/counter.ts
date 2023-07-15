import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
  count: number
  number: number
  direction: 'left' | 'right' | 'top'
}

const initialState: IState = {
  count: 0,
  number: 1,
  direction: 'left'
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeNumber(state, { payload }: PayloadAction<number>) {
      state.number = payload
    }
  }
})
export const { changeNumber } = counterSlice.actions

export default counterSlice.reducer
