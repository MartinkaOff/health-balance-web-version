import { useEffect, useState } from 'react'
import './registration.scss'
import photo from '../../assets/image/icon-camera-add.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  dataRegistrationSelector,
  resetFieldRegistration,
  setAvatarRegistartion,
  setStage
} from '../../Redux/slice/authSlice'
import { useLoadImage } from '../../hooks/useLoadImage'
import { stageRegistration, typeImage } from '../../utils/enums'
import Button, { typesButton } from '../../UI-Components/Button/Button'
import { Device } from '@capacitor/device'
import { useRegistrationMutation } from '../../services/auth.api'
import { showToast } from '../../utils/common-functions'
import { LOGIN_ROUTE } from '../../provider/constants-route'
import { useNavigate } from 'react-router-dom'

export const SetPhoto = () => {
  const dispatch = useAppDispatch()
  const dataRegistration = useAppSelector(dataRegistrationSelector)
  const { image, photoPath, isLoadingAvatar, uploadImage } = useLoadImage()
  const [disable, setDisabled] = useState<boolean>(false)
  const navigate = useNavigate()
  const [submitRegistration, { isLoading }] = useRegistrationMutation()

  const dowloadPicture = async () => {
    await uploadImage(typeImage.avatars)
  }

  const submit = async () => {
    const uuid = await Device.getId()
    const device_token = uuid.uuid
    const timezone = -new Date().getTimezoneOffset() / 60
    await submitRegistration({
      name: dataRegistration.name,
      surname: dataRegistration.surname,
      birthday: dataRegistration.birthday,
      gender: dataRegistration.gender,
      avatar: dataRegistration.avatar,
      phone: dataRegistration.phone,
      email: dataRegistration.email,
      password: dataRegistration.password,
      device_token,
      platform: dataRegistration.platform,
      timezone,
      platform_code: dataRegistration.privatePlatform
    })
      .unwrap()
      .then(async () => {
        await showToast(
          `Регистрация прошла успешно. Ссылка для подтверждения вашей почты отправлена на ${dataRegistration.email}`,
          'long'
        )
        dispatch(resetFieldRegistration())
        navigate(LOGIN_ROUTE)
      })
      .catch(async (err) => {
        dispatch(setStage(stageRegistration.email))
        if (err.data?.errors?.email) await showToast(err.data?.errors?.email[0])
        else if (err.data?.errors?.platform_code)
          await showToast(err.data?.errors?.platform_code[0])
        else await showToast('Произошла непредвиденная ошибка')
      })
  }

  useEffect(() => {
    if (photoPath) {
      dispatch(setAvatarRegistartion(image))
      setDisabled(false)
    } else setDisabled(true)
  }, [image])

  return (
    <>
      <div className={'set-photo'}>
        <div className='set-photo__photo'>
          {!isLoadingAvatar ? (
            <div className='set-photo__label' onClick={dowloadPicture}>
              {!photoPath && (
                <img
                  className={'set-photo__photo-icon-add'}
                  src={photo}
                  alt=''
                />
              )}
              {photoPath && (
                <img
                  className={'set-photo__photo-demo'}
                  src={photoPath}
                  alt='45'
                />
              )}
            </div>
          ) : (
            <h1>Загружается...</h1>
          )}
        </div>
      </div>
      {!isLoading ? (
        <>
          <Button
            disabled={disable}
            customClass='registration__button'
            view={typesButton.white}
            onClick={submit}
          >
            {'Сохранить'}
          </Button>
          <span className='registration__link text-yellow' onClick={submit}>
            {'Пропустить'}
          </span>
        </>
      ) : (
        <div className='spinner' style={{ textAlign: 'center' }}>
          <i className='fa fa-spinner fa-spin'></i> Загрузка
        </div>
      )}
    </>
  )
}
