import { createSlice } from '@reduxjs/toolkit'

interface IChatSlice {}

const initialState: IChatSlice = {}

export const chatSlice = createSlice({
  name: 'healthIndex',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {}
})

export const {} = chatSlice.actions

export default chatSlice.reducer
