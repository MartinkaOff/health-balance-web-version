import {
  IDynamics,
  IGetProgressAndIDPolls,
  IListReport,
  IQuestionnaire,
  ISaveCurrentResult
} from '../models/IHealthIndex'
import { api, ISuccessResponse } from './api'

export const healthIndexApi = api.injectEndpoints({
  endpoints: (build) => ({
    saveCurrentResult: build.mutation<
      { data: { progress: number } },
      ISaveCurrentResult
    >({
      query: (data) => ({
        url: `polls/${data.id}/answers?token=${localStorage.getItem('token')}`,
        method: 'POST',
        body: {
          answers: data.answers
        }
      })
    }),

    getProgressAndIdPolls: build.mutation<IGetProgressAndIDPolls, null>({
      query: (id) => ({
        url: `polls?token=${localStorage.getItem('token')}`,
        method: 'POST'
      }),
      transformResponse: (response: {
        data: IGetProgressAndIDPolls
      }): IGetProgressAndIDPolls => response.data
    }),

    interruptPoll: build.mutation<ISuccessResponse, number>({
      query: (id) => ({
        url: `polls/${id}/interrupt?token=${localStorage.getItem('token')}`,
        method: 'PATCH',
        headers: {
          accept: 'application/json',
          'Content-Type': `application/x-www-form-urlencoded`
        }
      })
    }),

    generateResultsPoll: build.mutation<ISuccessResponse, number>({
      query: (id) => ({
        url: `polls/${id}/generate-result?token=${localStorage.getItem(
          'token'
        )}`,
        method: 'POST'
      })
    }),

    getQuestionnaire: build.query<IQuestionnaire[], number>({
      query: () => `questions?token=${localStorage.getItem('token')}`,
      transformResponse: (
        response: { data: IQuestionnaire[] },
        meta,
        gender
      ): IQuestionnaire[] => {
        return response.data?.map((item) => {
          item.questions = item?.questions?.filter((q) => {
            if (gender === 1)
              return q?.tag !== 'waist_w' && q?.tag !== 'mammography'
            else if (gender === 2)
              return q?.tag !== 'waist_m' && q?.tag !== 'prostate_cancer_test'
            else return false
          })
          return item
        })
      }
    }),

    getDynamics: build.query<IDynamics[], null>({
      query: () => `dynamics?token=${localStorage.getItem('token')}`,
      transformResponse: (response: { data: IDynamics[] }): IDynamics[] =>
        response.data.slice(Math.max(response.data.length - 12, 0))
    }),

    getListReports: build.query<IListReport[], null>({
      query: () => `indexes?token=${localStorage.getItem('token')}`,
      transformResponse: (response: { data: IListReport[] }): IListReport[] =>
        response.data
    }),

    getReport: build.query<string, number>({
      query: (idIndex) => ({
        url: `indexes/${idIndex}?token=${localStorage.getItem('token')}`,
        responseHandler: (response) => response.text()
      })
    })
  })
})

export const {
  useGenerateResultsPollMutation,
  useGetDynamicsQuery,
  useGetListReportsQuery,
  useGetProgressAndIdPollsMutation,
  useGetReportQuery,
  useGetQuestionnaireQuery,
  useInterruptPollMutation,
  useSaveCurrentResultMutation
} = healthIndexApi
