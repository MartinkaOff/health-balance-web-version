import {
    IAllChallenge,
    IChallenge,
    IChallengesShorts, IChallengeTeamsShorts,
    ICreatingChallenge,
    ICreatingChallengeResponse,
    ICustomersPersonalChallenge,
    ICustomersTeam,
    ITeam,
    ITeamJoinResponse,
    ITypeChallenges
} from '../models/IChallenge'
import {ICreatingPurpose, IPurposeResponse} from '../models/IPurpose'
import {api, ISuccessResponse} from "./api";
import {typesChallenge} from "../utils/enums";


export const challengesApi = api.injectEndpoints({
    endpoints: (build) => ({
        creatingChallenge: build.mutation<ICreatingChallengeResponse, ICreatingChallenge>({
            query: (data) => ({
                url: `challenges?token=${localStorage.getItem('token')}`,
                method: 'POST',
                body: data
            })
        }),

        creatingPurpose: build.mutation<IPurposeResponse, ICreatingPurpose>({
            query: (data) => ({
                url: `purposes?token=${localStorage.getItem('token')}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [{type: 'creatingChallenge'}]
        }),

        getChallenges: build.query<IAllChallenge, null>({
            query: () => `challenges?token=${localStorage.getItem('token')}`,
            transformResponse: (response: { data: IChallenge[] }): IAllChallenge => {
                const newChallenges: ITypeChallenges = {personal: [], command: [], common: [], all: []}
                const activeChallenges: ITypeChallenges = {personal: [], command: [], common: [], all: []}
                response.data.forEach(challenge => {
                    if (!challenge.active) {
                        if (challenge.type === typesChallenge.personal) newChallenges.personal?.push(challenge)
                        else if (challenge.type === typesChallenge.command) newChallenges.command?.push(challenge)
                        else if (challenge.type === typesChallenge.common) newChallenges.common?.push(challenge)
                        newChallenges.all.push(challenge)
                    } else {
                        if (challenge.type === typesChallenge.personal) activeChallenges.personal?.push(challenge)
                        else if (challenge.type === typesChallenge.command) activeChallenges.command?.push(challenge)
                        else if (challenge.type === typesChallenge.common) activeChallenges.common?.push(challenge)
                        activeChallenges.all.push(challenge)
                    }
                })
                return {
                    newChallenges,
                    activeChallenges
                }
            },
            providesTags: () => [
                {type: 'creatingChallenge'},
                {type: 'joinChallenge'},
                {type: 'completeLesson'},
                {type: 'completeChallenge'}
            ]
        }),

        challengeJoin: build.mutation<ISuccessResponse, number>({
            query: (id) => ({
                url: `challenges/${id}/join?token=${localStorage.getItem('token')}`,
                method: 'POST'
            }),
            invalidatesTags: [{type: 'joinChallenge'}]
        }),

        teamJoin: build.mutation<ITeamJoinResponse, number>({
            query: (id) => ({
                url: `challenge-teams/${id}/join?token=${localStorage.getItem('token')}`,
                method: 'POST'
            })
        }),

        completeChallenge: build.mutation<ISuccessResponse, number>({
            query: (id) => ({
                url: `challenges/${id}/complete?token=${localStorage.getItem('token')}`,
                method: 'POST'
            }),
            invalidatesTags: [{type: 'completeChallenge'}]
        }),

        getChallengeById: build.query<IChallenge, number>({
            query: (id) => `challenges/${id}?token=${localStorage.getItem('token')}`,
            transformResponse: (response: { data: IChallenge }): IChallenge => response.data,
            providesTags: () => [{type: 'completeLesson'}]
        }),

        getChallengesTeam: build.query<ITeam[], number>({
            query: (id) => `challenge-teams?token=${localStorage.getItem('token')}&challenge=${id}`,
            transformResponse: (response: { data: ITeam[] }): ITeam[] => response.data
        }),
        getCustomersTeam: build.query<ICustomersTeam, number>({
            query: (id) => `challenge-teams/${id}?token=${localStorage.getItem('token')}`,
            transformResponse: (response: { data: ICustomersTeam }): ICustomersTeam => response.data
        }),
        customersPersonalChallenge: build.query<ICustomersPersonalChallenge[], null>({
            query: () => `customers?token=${localStorage.getItem('token')}&curator_teams=1`,
            transformResponse: (response: { data: ICustomersPersonalChallenge[] }): ICustomersPersonalChallenge[] => response.data
        }),
        challengesShorts: build.query<IChallengesShorts[], number>({
            query: (id) => `challenges/shorts?token=${localStorage.getItem('token')}&platform=${id}`,
        }),
        challengeTeamsShorts: build.query<IChallengeTeamsShorts[], number>({
            query: (id) => `challenge-teams/shorts?token=${localStorage.getItem('token')}&challenge=${id}`,
        }),


    })
})

export const {
    useCreatingChallengeMutation,
    useCreatingPurposeMutation,
    useGetChallengesQuery,
    useCompleteChallengeMutation,
    useChallengeJoinMutation,
    useTeamJoinMutation,
    useGetChallengeByIdQuery,
    useGetChallengesTeamQuery,
    useGetCustomersTeamQuery,
    useCustomersPersonalChallengeQuery,
    useChallengesShortsQuery,
    useChallengeTeamsShortsQuery
} = challengesApi