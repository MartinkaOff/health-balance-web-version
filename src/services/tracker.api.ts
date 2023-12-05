import {
  ICreatingTracker,
  IGetTracker,
  ITrack,
  ITracks,
  IUpdateTracker
} from '../models/ITracker'
import { api, ISuccessResponse } from './api'

export const trackerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTracker: build.query<IGetTracker, void>({
      query: () => `tracker?token=${localStorage.getItem('token')}`,
      transformResponse: (response: { data: IGetTracker }): IGetTracker =>
        response.data,
      providesTags: () => [
        { type: 'newTracker' },
        { type: 'deleteTracker' },
        { type: 'updateTracker' }
      ]
    }),

    getTracks: build.query<ITracks, string>({
      query: (date) =>
        `tracks?date=${date}&token=${localStorage.getItem('token')}`,
      transformResponse: (response: { data: ITrack[] }): ITracks => {
        return {
          fruitTrack: response.data.filter((item) => item.type === 3),
          waterTrack: response.data.filter((item) => item.type === 2),
          sleepTrack: response.data.filter(
            (item) => item.type === 1 || item.type === 4
          )
        }
      },
      providesTags: () => [{ type: 'tracks' }]
    }),

    completeTrack: build.mutation<ISuccessResponse, number>({
      query: (id) => ({
        url: `tracks/${id}/complete?token=${localStorage.getItem('token')}`,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'tracks' }]
    }),

    creatingTracker: build.mutation<{ tracker_id: number }, ICreatingTracker>({
      query: (data) => ({
        url: `tracker?token=${localStorage.getItem('token')}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [{ type: 'newTracker' }]
    }),

    updateTracker: build.mutation<{ tracker_id: number }, IUpdateTracker>({
      query: (data) => ({
        url: `tracker/${data.id}/update?token=${localStorage.getItem('token')}`,
        method: 'PATCH',
        body: data.type + '=' + data.value,
        headers: {
          'Content-Type': 'text/plain'
        }
      }),
      invalidatesTags: [{ type: 'updateTracker' }]
    }),

    deleteTracker: build.mutation<ISuccessResponse, null>({
      query: () => ({
        url: `tracker?token=${localStorage.getItem('token')}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'deleteTracker' }]
    })
  })
})

export const {
  useGetTrackerQuery,
  useGetTracksQuery,
  useCompleteTrackMutation,
  useCreatingTrackerMutation,
  useDeleteTrackerMutation,
  useUpdateTrackerMutation
} = trackerApi
