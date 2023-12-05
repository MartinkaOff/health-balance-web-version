import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {IUser} from '../../models/IUsers'
import {userApi} from '../../services/user.api'

export interface IProfile {
  dataUser: IUser
}

const initialState: IProfile = {
  dataUser: {
    id: 0,
    name: '',
    surname: '',
    gender: 1,
    birthday: 0,
    phone: '',
    email: '',
    avatar: '',
    challenges: 0,
    completed_challenges: 0,
    role: 0,
    steps: 0
  },
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.getProfile.matchFulfilled,
        (state, action) => {
          state.dataUser = action.payload;
        }
    );

  }
})

export const {} = profileSlice.actions

export const dataUserSelector = (state: RootState) => state.profile.dataUser

export default profileSlice.reducer
