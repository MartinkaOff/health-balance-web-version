import { IUpdateUser, IUser } from '../models/IUsers'
import { api, ISuccessResponse } from './api'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserDataOnId: build.query<IUser, string>({
      query: (id) => `customers/${id}?token=${localStorage.getItem('token')}`,
      transformResponse: (response: { data: IUser }): IUser => response.data
    }),
    getProfile: build.query<IUser, string>({
      query: (id) => `customers/${id}?token=${localStorage.getItem('token')}`,
      transformResponse: (response: { data: IUser }): IUser => response.data,
      providesTags: (result, error, arg) => {
        return [{ type: 'editProfile', id: 'updateProfile' }]
      }
    }),

    editingProfile: build.mutation<ISuccessResponse, IUpdateUser>({
      query: (data) => ({
        url: `customers?token=${localStorage.getItem('token')}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'editProfile', id: arg.timezone ? 'noUpdateProfile' : 'updateProfile' }]
      }
    })
  })
})

export const { useGetUserDataOnIdQuery, useEditingProfileMutation,useGetProfileQuery } = userApi
