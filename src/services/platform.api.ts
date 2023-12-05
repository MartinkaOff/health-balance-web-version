import {IPlatform} from "./../models/IPlatforms";
import {api} from "./api";


export const platformApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentPlatform: builder.query<{data:IPlatform}, void>({
      query: () => `platforms/self?token=${localStorage.getItem("token")}`,
    }),
    getPlatforms: builder.query<{ data: IPlatform[] }, void>({
      query: () => `platforms`,
    }),
    getPlatformsForChallenge: builder.query<{ data: IPlatform[] }, void>({
      query: () => `platforms?curator=1&token=${localStorage.getItem("token")}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCurrentPlatformQuery,
  useGetPlatformsQuery,
  useGetPlatformsForChallengeQuery,
} = platformApi;
