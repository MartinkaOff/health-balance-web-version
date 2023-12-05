import {
  IComment,
  ICreatingComment,
  ICreatingNews,
  INews
} from '../models/INews'
import { api, ISuccessResponse } from './api'

export const newsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createNews: build.mutation<{ news_id: number }, ICreatingNews>({
      query: (data) => ({
        url: `news?token=${localStorage.getItem('token')}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [{ type: 'createNews' }]
    }),

    addCommentsNews: build.mutation<{ comment_id: number }, ICreatingComment>({
      query: (data) => ({
        url: `news-comments?token=${localStorage.getItem('token')}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: [{ type: 'addComments' }]
    }),

    getNews: build.query<INews[], null>({
      query: () => `news?token=${localStorage.getItem('token')}`,
      transformResponse: (response: { data: INews[] }): INews[] => response.data,
      providesTags: () => [{ type: 'createNews' }]
    }),

    getNewsById: build.query<INews, number>({
      query: (id) => `news/${id}?token=${localStorage.getItem('token')}`,
      transformResponse: (response: { data: INews }): INews => response.data,
      providesTags: () => [{ type: 'likeNews' }, { type: 'addComments' }]
    }),

    getNewsByCategory: build.query<INews[], number>({
      query: (idRubric) =>
        `news?token=${localStorage.getItem('token')}&category=${idRubric}`,
      transformResponse: (response: { data: INews[] }): INews[] => response.data
    }),

    getListComments: build.query<IComment[], number>({
      query: (id) =>
        `news-comments?token=${localStorage.getItem('token')}&news=${id}`,
      transformResponse: (response: { data: IComment[] }): IComment[] =>
        response.data,
      providesTags: () => [{ type: 'addComments' }]
    }),

    likeNews: build.mutation<ISuccessResponse, number>({
      query: (id) => ({
        url: `news/${id}/like?token=${localStorage.getItem('token')}`,
        method: 'PATCH'
      }),
      invalidatesTags: [{ type: 'likeNews' }]
    })
  })
})

export const {
  useLikeNewsMutation,
  useGetNewsByCategoryQuery,
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useGetListCommentsQuery,
  useAddCommentsNewsMutation,
  useCreateNewsMutation
} = newsApi
