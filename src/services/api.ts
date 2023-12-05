import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/dist/query/react'
import {API_URL} from '../http'
import {Capacitor} from '@capacitor/core'
import {GoogleAuth} from '@codetrix-studio/capacitor-google-auth'
import Pedometer from '../plugins/pedometer'
import {LOGIN_ROUTE} from '../provider/constants-route'
import {IBanner, IVersion} from "../models/IApp";

export interface ISuccessResponse {
    success: boolean
}

const baseQuery = fetchBaseQuery({baseUrl: API_URL})

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError> = async (args, api, extraOptions = {}) => {
    const result: any = await baseQuery(args, api, extraOptions)
    if (result.error && result?.error?.data?.errors === 'Invalid token') {
        if (Capacitor.getPlatform() === 'android') {
            await GoogleAuth.signOut()
            await Pedometer.reset()
            await Pedometer.stop()
        }
        localStorage.clear()
        window.location.replace(LOGIN_ROUTE)
    }

    // if (result?.error?.status === RESPONSE_CODE.NO_AUTH) { // 401
    //   //  logout(); // Optionally you can trigger some code directly here
    //     // or dispatch an action to be handled in reducer or your middleware
    //     api.dispatch("whatever action you need");
    // }
    return result
}

export const api = createApi({
    reducerPath: 'api',
    tagTypes: [
        'tracks',
        'newTracker',
        'deleteTracker',
        'updateTracker',
        'interruptPoll',
        'createNews',
        'likeNews',
        'addComments',
        'editProfile',
        'creatingChallenge',
        'completeChallenge',
        'joinChallenge',
        'completeLesson',
        'createLesson'
    ],
    // baseQuery: baseQuery,
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        checkToken: builder.query<ISuccessResponse, null>({
            query: () =>
                `customers/check-token?token=${localStorage.getItem('token')}`
        }),
        getUserTime: builder.query<number, null>({
            query: () =>
                `http://worldtimeapi.org/api/timezone/Europe/London`,
            transformResponse: (response: { datetime: string }): number => new Date(response.datetime).getTime(),
        }),
        actualVersion: builder.query<IVersion, null>({
            query: () => `version?token=${localStorage.getItem('token')}`,
            transformResponse: (response: { data: IVersion }): IVersion => response.data,
        }),
        getBanner: builder.query<IBanner[], null>({
            query: () => `banners?token=${localStorage.getItem('token')}`,
           // transformResponse: (response: { data: IBanner[] }): IBanner => response.data[0] || {},
        }),
    })
})

export const {
    useCheckTokenQuery,
    useActualVersionQuery,
    useGetBannerQuery
} = api
