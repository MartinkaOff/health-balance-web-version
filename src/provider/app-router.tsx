import { useEffect } from 'react'
import { privateRoutes, publicRoutes } from './routes'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { checkAuth, isAuthSelector, isLoadingSelector } from '../Redux/slice/authSlice'
import { Preloader } from '../Components/Preloader/Preloader'
import { useEditingProfileMutation, userApi } from '../services/user.api'
import ActualVersion from "../Components/Actual-version/Actual-version";
import { VERSION_NAME } from "../utils/globalConstants";
import { IUpdateUser } from "../models/IUsers";
import { AuthPage } from "../pages/Authorization/Auth-page";


const AppRouter = () => {
    const isAuth = useAppSelector(isAuthSelector)
    const isLoading = useAppSelector(isLoadingSelector)
    const dispatch = useAppDispatch()

    const MissingRoute = () => <Navigate to={{ pathname: '/' }} />
    const [editingProfile] = useEditingProfileMutation()
    const [getProfile] = userApi.endpoints.getProfile.useLazyQuery()
    const changeTimezone = async () => {
        if (localStorage.getItem('token')) {
            const timezone = -new Date().getTimezoneOffset() / 60
            const version = VERSION_NAME
            const data: IUpdateUser = { timezone, version }
            await editingProfile(data)
        }
    }

    useEffect(() => {
        if (isAuth) {
            changeTimezone().then(() => {
                getProfile(localStorage.getItem('id') as string)
            })
        }
        else dispatch(checkAuth())
    }, [isAuth])

    if (isLoading) {
        return <Preloader />
    }

    return localStorage.getItem('token') ? (
        <>
            {/* <ActualVersion /> */}
            <Routes>
                {privateRoutes.map(({ path, Component }, index) => (
                    <Route path={path} key={index} element={<Component />} />
                ))}
                <Route path={'*'} element={<MissingRoute />} />
            </Routes>
        </>

    ) : (
        <Routes>
            {publicRoutes.map(({ path, Component }, index) => (
                <Route path={path} key={index} element={<Component />} />
            ))}
            <Route path={'*'} element={<AuthPage />} />
        </Routes>
    )
}

export default AppRouter