import React, {useEffect} from 'react'
import {Birthday} from '../Registration/Birthday'
import {GoogleAuth} from '@codetrix-studio/capacitor-google-auth'
import {Platform} from '../Registration/Platform'
import './AuthorizationGoogle.scss'
import {useAppSelector} from '../../hooks/redux-hooks'
import {dataRegistrationSelector, typePlatformSelector} from '../../Redux/slice/authSlice'
import {useSignInWithGoogleMutation} from '../../services/auth.api'
import {showToast} from '../../utils/common-functions'
import {Privateplatform} from '../Registration/Private-platform/Private-platform'
import Header from '../Header/Header'
import {Device} from '@capacitor/device'
import {Telephone} from '../Registration/Telephone'
import {Preloader} from '../Preloader/Preloader'
import {WEB_CLIENT_ID} from '../../utils/globalConstants'
import {useSetDataAuth} from "../../hooks/useSetDataAuth";

export const AuthorizationGoogle = () => {

  const dataRegistration = useAppSelector(dataRegistrationSelector)
  const typePlatform = useAppSelector(typePlatformSelector)
  const [submit, { isLoading }] = useSignInWithGoogleMutation()
  const {setDataAuth} = useSetDataAuth()

  const googleAuth = async () => {
    const response = await GoogleAuth.signIn()

    const timezone = -new Date().getTimezoneOffset() / 60
    const uuid = await Device.getId()
    const device_token = uuid.uuid

    await submit({
      birthday: dataRegistration.birthday,
      platform: dataRegistration.platform,
      timezone: timezone,
      access_token: response.authentication.accessToken,
      server_code: response.serverAuthCode,
      google_token: response.authentication.idToken,
      platform_code: dataRegistration.privatePlatform,
      device_token: device_token,
      phone: dataRegistration.phone
    })
      .unwrap()
      .then(async (response) => setDataAuth(response))
      .catch(async (err) => {
        const reg = err.data?.errors['google.reg']
        if (reg) await showToast(err.data?.errors['google.reg'])
      })
  }

  useEffect(() => {
    GoogleAuth.initialize({
      clientId: WEB_CLIENT_ID,
      scopes: ['profile', 'email']
    })
  }, [])

  return (
    <div className='auth-google'>
      <Header title='Sign in with Google' />
      <div className='auth-google__container'>
        <h2 className='auth-google__title main-title'>
          Когда у вас день рождения?
        </h2>
        <Birthday googleAuth={true} />
        <h2 className='auth-google__title main-title'>Ваш телефон</h2>
        <Telephone googleAuth={true} />
        <h2 className='auth-google__title main-title'>Выберите платформу</h2>
        <Platform googleAuth={true} />
        {typePlatform === 2 && (
          <>
            <h2 className='auth-google__title main-title'>
              Укажите код платформы
            </h2>
            <Privateplatform googleAuth={true} />
          </>
        )}
        {!isLoading ? (
          <button
            type='button'
            className='google-sign-in-button'
            onClick={googleAuth}
          >
            Sign in with Google
          </button>
        ) : (
          <Preloader height='auto' />
        )}
      </div>
    </div>
  )
}
