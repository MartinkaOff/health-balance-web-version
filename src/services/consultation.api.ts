import { IConsultation } from '../models/IConsultation'
import { api, ISuccessResponse } from './api'

export const consultationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    consultation: builder.mutation<ISuccessResponse, IConsultation>({
      query: (initialPost) => ({
        url: `consultation?token=${localStorage.getItem('token')}`,
        method: 'POST',
        body: initialPost
      })
    })
  })
})

// Export hooks for usage in functional components
export const { useConsultationMutation } = consultationApi
