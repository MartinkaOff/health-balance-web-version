import {ChangeEvent, useEffect, useState} from 'react'
import './auth.scss'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../../assets/image/Logo.svg'
import {ACCESS_RECOVERY__ROUTE, AUTH_GOOFLE_ROUTE, REGISTRATION_ROUTE} from '../../provider/constants-route'
import {Device} from '@capacitor/device'
import {Capacitor} from '@capacitor/core'
import {useLoginMutation, useSignInWithGoogleMutation} from '../../services/auth.api'
import {showToast} from '../../utils/common-functions'
import googleIcon from '../../assets/image/auth/googleIcon.svg'
import {GoogleAuth} from '@codetrix-studio/capacitor-google-auth'
import {Preloader} from '../Preloader/Preloader'
import {useSetDataAuth} from '../../hooks/useSetDataAuth'

export const Auth = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [submitLogin, { isLoading }] = useLoginMutation()
  const [signInWithGoogle, { isLoading: isLoadingGoogle }] = useSignInWithGoogleMutation()
  const {setDataAuth} = useSetDataAuth()
  let navigate = useNavigate()

  const handlerLogin = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value.trim())

  const handlerPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value.trim())

  const submit = async (e: any) => {
    e.preventDefault()
    const uuid = await Device.getId()
    const device_token = uuid.uuid
    const timezone = -new Date().getTimezoneOffset() / 60

    await submitLogin({
      email: email.trim(),
      password,
      device_token,
      timezone
    })
      .unwrap()
      .then((response) => setDataAuth(response))
      .catch(async (err) => {
        let { email, password } = err.data?.errors
        if (email && password)
          return showToast(email.join('. ') + '. ' + password.join('. '))
        if (email) return showToast(email.join('. '))
        if (password) return showToast(password.join('. '))
      })
  }


  const googleAuth = async () => {
    try {
      const timezone = -new Date().getTimezoneOffset() / 60
      const uuid = await Device.getId()
      const device_token = uuid.uuid
      const response = await GoogleAuth.signIn()

      await signInWithGoogle({
        timezone: timezone,
        access_token: response.authentication.accessToken,
        server_code: response.serverAuthCode,
        google_token: response.authentication.idToken,
        device_token: device_token
      })
        .unwrap()
        .then(async (response) => setDataAuth(response))
        .catch(async (err) => {
          const reg = err.data?.errors['google.reg']
          const auth = err.data?.errors['google.auth']
          if (reg) await showToast(reg)
          else if (auth) await showToast(auth)
          navigate(AUTH_GOOFLE_ROUTE)
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GoogleAuth.initialize()
  }, [])

  if (isLoadingGoogle) return <Preloader />

  return (
    <form className={'auth'} onSubmit={submit}>
      <div className='auth__content'>
        <div className='auth__logo'>
          <img src={logo} alt='' />
        </div>
        <div className='auth__form form-auth'>
          <div className='form-auth__fields'>
            <input
              type='text'
              spellCheck={false}
              className='form-auth__field'
              placeholder={'Email'}
              value={email}
              onChange={handlerLogin}
            />
            <input
              type='password'
              spellCheck={false}
              className='form-auth__field'
              placeholder={'Пароль'}
              value={password}
              onChange={handlerPassword}
            />
          </div>
          <div className='form-auth__buttons'>
            <button
              className='form-auth__button'
              onClick={submit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='spinner'>
                  <i className='fa fa-spinner fa-spin'></i> Загрузка
                </span>
              ) : (
                'Войти'
              )}
            </button>
            {Capacitor.getPlatform() !== 'ios' && (
              <button
                type='button'
                className='google-sign-in-button'
                onClick={googleAuth}
              >
                Sign in with Google
              </button>
            )}
            <br />
            {Capacitor.getPlatform() !== 'ios' && (
              <Link
                to={AUTH_GOOFLE_ROUTE}
                className='form-auth__button transparent'
              >
                <img src={googleIcon} alt='google' />
                Регистрация через Google
              </Link>
            )}
          </div>
          <Link
            to={ACCESS_RECOVERY__ROUTE}
            className='form-auth__link link-auth'
          >
            Забыли пароль?
          </Link>
        </div>
        <div className='auth__links'>
          <div className={'auth__link link-auth'}>У вас ещё нет аккаунта?</div>
          <Link
            to={REGISTRATION_ROUTE}
            className={'auth__link link-auth yellow'}
          >
            Регистрация
          </Link>
        </div>
      </div>
    </form>
  )
}
