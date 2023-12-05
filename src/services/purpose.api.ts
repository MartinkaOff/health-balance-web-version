import {IPersonalPurposeParams, IPurpose, IPurposeResponse} from '../models/IPurpose'
import {api} from "./api";


export const purposeApi = api.injectEndpoints({
    endpoints: (build) => ({
        getPersonalPurpose: build.query<IPurpose, null>({
            query: () => `purposes?token=${localStorage.getItem('token')}`,
            transformResponse: (response: { data: IPurpose }): IPurpose => response.data,
        }),
        creatingPersonalPurpose: build.mutation<IPurposeResponse, IPersonalPurposeParams>({
            query: (data) => ({
                url: `purposes?token=${localStorage.getItem('token')}`,
                method: 'POST',
                body: data
            })
        })
    }),
});

export const {
    useCreatingPersonalPurposeMutation,
    useGetPersonalPurposeQuery
} = purposeApi