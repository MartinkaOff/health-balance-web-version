import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface IAccessRecovery {
  email: string
  password: string
  repeatPassword: string
  disabledButton?: boolean,
  code: number,
  error: string
}

const initialState: IAccessRecovery = {
  email: '',
  password: '',
  repeatPassword: '',
  disabledButton: true,
  code:0,
  error:''
}

export const accessRecoverySlice = createSlice({
  name: 'recovery',
  initialState,
  reducers: {
    setRecoveryEmail: (state, action) => {
      state.email = action.payload
    },
    setCode:(state, action) =>{
      state.code = action.payload
    },
    setRecoveryPassword: (state, action) => {
      state.password = action.payload
    },
    setRepeatPassword: (state, action) => {
      state.repeatPassword = action.payload
    },
    setDisabledButton: (state, action) => {
      state.disabledButton = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
    
  }
})

export const {
  setRecoveryPassword,
  setDisabledButton,
  setRecoveryEmail,
  setRepeatPassword,setCode,setError
} = accessRecoverySlice.actions

export const emailRecoverySelector = (state: RootState) => state.recovery.email
export const disableButtonSelector = (state: RootState) =>
  state.recovery.disabledButton
export const passwordRecoverySelector = (state: RootState) =>
  state.recovery.password
export const repeatPasswordRecoverySelector = (state: RootState) =>
  state.recovery.repeatPassword
  export const codeRecoverySelector = (state: RootState) =>
  state.recovery.code
  export const errorRecoverySelector = (state: RootState) =>
  state.recovery.error
export default accessRecoverySlice.reducer
