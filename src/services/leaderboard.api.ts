import {ILeaderBoardChallenge, ILeaderBoardChallengTeam, ILeaderBoardResponse} from '../models/ILeaderBoard'
import {api} from './api'

export const leaderboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    leaderboard: build.query<ILeaderBoardResponse, null>({
      query: () => `leaderboard?token=${localStorage.getItem('token')}`,
      transformResponse: (response: {
        data: ILeaderBoardResponse
      }): ILeaderBoardResponse => response.data
    }),

    leaderboardChallenge: build.query<ILeaderBoardChallenge[], number>({
      query: (idChallenge) =>
        `leaderboard/challenge/${idChallenge}?token=${localStorage.getItem(
          'token'
        )}`,
      transformResponse: (response: {
        data: ILeaderBoardChallenge[]
      }): ILeaderBoardChallenge[] => response.data
    }),
    leaderboardTeams: build.query<ILeaderBoardChallengTeam[], number>({
      query: (idChallenge) =>
        `leaderboard/challenge-teams/${idChallenge}?token=${localStorage.getItem(
          'token'
        )}`,
      transformResponse: (response: {
        data: ILeaderBoardChallengTeam[]
      }): ILeaderBoardChallengTeam[] => response.data
    })
  })
})

export const {
  useLeaderboardChallengeQuery,
  useLeaderboardTeamsQuery,
  useLeaderboardQuery
} = leaderboardApi
