import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IRegistration, IVisitPages } from '../../models/IAuth'
import { stageRegistration } from '../../utils/enums'
import { timeConverterUnix } from '../../utils/common-functions'

export interface IAuth {
  stage: stageRegistration
  disabledButton?: boolean
  isAuth: boolean
  error: boolean
  isLoading: boolean
  dataRegistration: IRegistration
}

const initialState: IAuth = {
  stage: stageRegistration.email,
  disabledButton: true,
  isAuth: false,
  error: false,
  isLoading: false,
  dataRegistration: {
    email: '',
    phone: '',
    password: '',
    name: '',
    surname: '',
    birthday: timeConverterUnix('15.07.' + (new Date().getFullYear() - 23)),
    gender: 1,
    platform: 0,
    privatePlatform: 0,
    typePlatform: 1,
    avatar: '',
    device_token: '',
    timezone: -new Date().getTimezoneOffset() / 60
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setStage: (state, action) => {
      state.stage = action.payload
    },
    setEmail: (state, action) => {
      state.dataRegistration!.email = action.payload
    },
    setPassword: (state, action) => {
      state.dataRegistration!.password = action.payload
    },
    setTelephone: (state, action) => {
      state.dataRegistration!.phone = action.payload
    },
    setNameUser: (state, action) => {
      state.dataRegistration!.name = action.payload
    },
    setSurname: (state, action) => {
      state.dataRegistration!.surname = action.payload
    },
    setBirthday: (state, action) => {
      state.dataRegistration!.birthday = action.payload
    },
    setGender: (state, action) => {
      state.dataRegistration!.gender = action.payload
    },
    setPlatform: (state, action) => {
      state.dataRegistration!.platform = action.payload
    },
    setCodePlatform: (state, action) => {
      state.dataRegistration!.privatePlatform = action.payload
    },
    setTypePlatform: (state, action) => {
      state.dataRegistration.typePlatform = action.payload
    },
    setAvatarRegistartion: (state, action) => {
      state.dataRegistration!.avatar = action.payload
    },
    setDisabledButton: (state, action) => {
      state.disabledButton = action.payload
    },
    checkAuth: (state) => {
      if (localStorage.getItem('token')) {
        state.isAuth = true
      }
    },
    resetFieldRegistration: (state) => {
      state.dataRegistration = {
        email: '',
        phone: '',
        password: '',
        name: '',
        surname: '',
        birthday: 1029528000,
        gender: 1,
        platform: 0,
        typePlatform: 1,
        avatar: '',
        device_token: '',
        timezone: -new Date().getTimezoneOffset() / 60
      }
    },
    logout: (state) => {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      state.isAuth = false
    },
    setAuth: (state) => {
      state.isAuth = true
    },
    clearResults() {
      // Note that this should be left intentionally empty.
      // Clearing redux state and localForage happens in rootReducer.ts.
    }
  }
})

export const {
  setEmail,
  setDisabledButton,
  setGender,
  setNameUser,
  setPassword,
  setPlatform,
  setSurname,
  setTelephone,
  setAvatarRegistartion,
  setBirthday,
  checkAuth,
  logout,
  resetFieldRegistration,
  clearResults,
  setAuth,
  setCodePlatform,
  setStage,
  setTypePlatform
} = authSlice.actions

export const emailSelector = (state: RootState) =>
  state.auth.dataRegistration!.email
export const disableButtonSelector = (state: RootState) =>
  state.auth.disabledButton
export const passwordSelector = (state: RootState) =>
  state.auth.dataRegistration!.password
export const telephoneSelector = (state: RootState) =>
  state.auth.dataRegistration!.phone
export const nameUserSelector = (state: RootState) =>
  state.auth.dataRegistration!.name
export const surNameSelector = (state: RootState) =>
  state.auth.dataRegistration!.surname
export const birthdaySelector = (state: RootState) =>
  state.auth.dataRegistration!.birthday
export const genderSelector = (state: RootState) =>
  state.auth.dataRegistration!.gender
export const platformSelector = (state: RootState) =>
  state.auth.dataRegistration!.platform
export const privatePlatformSelector = (state: RootState) =>
  state.auth.dataRegistration!.privatePlatform
export const typePlatformSelector = (state: RootState) =>
  state.auth.dataRegistration!.typePlatform
export const avatarSelector = (state: RootState) =>
  state.auth.dataRegistration!.avatar
export const dataRegistrationSelector = (state: RootState) =>
  state.auth.dataRegistration
export const isAuthSelector = (state: RootState) => state.auth.isAuth
export const isLoadingSelector = (state: RootState) => state.auth.isLoading
export const errorSelector = (state: RootState) => state.auth.error
export const stageRegistrationSelector = (state: RootState) => state.auth.stage

export default authSlice.reducer
