import {IAuthResponse, ILogin, IParamsUpdatePassword, ISighnInWithGoogle, ISubmitRegistration} from '../models/IAuth'
import {api, ISuccessResponse} from "./api";


export const authApi = api.injectEndpoints({

    endpoints: (builder) => ({
        registration: builder.mutation<ISubmitRegistration, Partial<ISubmitRegistration>>({
            query: (initialPost) => ({
                url: `customers`,
                method: 'POST',
                body: initialPost
            }),
        }),

        login: builder.mutation<IAuthResponse, Partial<ILogin>>({
            query: (initialPost) => ({
                url: `login`,
                method: 'POST',
                body: initialPost
            }),
        }),

        signInWithGoogle: builder.mutation<IAuthResponse, Partial<ISighnInWithGoogle>>({
            query: (initialPost) => ({
                url: `reg_by_google`,
                method: 'POST',
                body: initialPost
            }),
        }),

        updatePassword: builder.mutation<ISuccessResponse, IParamsUpdatePassword>({
            query: (params) => ({
                url: `update_password`,
                method: 'POST',
                body: params
            }),
        }),

        restorePassword: builder.mutation<ISuccessResponse, string>({
            query: (email) => ({
                url: `restore_password`,
                method: 'POST',
                body: {email}
            }),
        }),

        checkEmail: builder.query<ISuccessResponse, string>({
            query: (email) => `customers/check-email?email=${email}`,
        }),

        deleteCustomerAccount: builder.mutation<ISuccessResponse, null>({
            query: () => ({
                url: `customers?token=${localStorage.getItem('token')}`,
                method: "DELETE",
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useRegistrationMutation,
    useLoginMutation,
    useSignInWithGoogleMutation,
    useDeleteCustomerAccountMutation,
    useRestorePasswordMutation,
    useUpdatePasswordMutation
} = authApi;