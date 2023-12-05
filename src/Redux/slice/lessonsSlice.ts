import {createSlice} from '@reduxjs/toolkit'

export interface ILessonState {
}

const initialState: ILessonState = {
}

export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
  }
})

export const {} = lessonsSlice.actions

export default lessonsSlice.reducer
