import {ICreatingLecture, ILesson, ITaskToCompleted} from '../models/ILessons'
import {api, ISuccessResponse} from './api'


export const lessonsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getLessons: build.query<ILesson[], number>({
            query: (id) => `lessons?token=${localStorage.getItem('token')}&challenge=${id}`,
            transformResponse: (response: { data: ILesson[] }): ILesson[] => response.data,
            providesTags: () => [
                {type: 'completeLesson'},
                {type: 'createLesson'}
            ]
        }),
        getLessonById: build.query<ILesson, number>({
            query: (id) => `lessons/${id}?token=${localStorage.getItem('token')}`,
            transformResponse: (response: { data: ILesson }): ILesson => response.data,
        }),
        checkTask: build.query<{ exist: boolean }, number>({
            query: (id) => `lessons/${id}/check?token=${localStorage.getItem('token')}`,
            providesTags: () => [{type: 'completeLesson'}]
        }),
        completeLesson: build.mutation<ISuccessResponse, ITaskToCompleted>({
            query: ({id, dataTaskToCompleted}) => {
                const formData = new FormData()
                dataTaskToCompleted.file&&formData.append("file", dataTaskToCompleted.file)
                return {
                    url: `lessons/${id}/complete?token=${localStorage.getItem('token')}`,
                    method: 'POST',
                    body: dataTaskToCompleted.file ? formData : dataTaskToCompleted,
                }
            },
            invalidatesTags: [{type: 'completeLesson'}]
        }),
        createLesson: build.mutation<ISuccessResponse, ICreatingLecture>({
            query: (data) => ({
                url: `lessons?token=${localStorage.getItem('token')}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{type: 'createLesson'}]
        })

    })
})

export const {
    useGetLessonsQuery,
    useGetLessonByIdQuery,
    useCheckTaskQuery,
    useCompleteLessonMutation,
    useCreateLessonMutation
} = lessonsApi
