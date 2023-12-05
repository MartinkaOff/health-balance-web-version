import { useEffect } from 'react'
import Header from '../../Components/Header/Header'
import { RegistrationItem } from '../../Components/Registration/RegistrationItem'
import { stageRegistration } from '../../utils/enums'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  setStage,
  stageRegistrationSelector
} from '../../Redux/slice/authSlice'

export const RegistrationPage = () => {
  const stage = useAppSelector(stageRegistrationSelector)
  const dispatch = useAppDispatch()

  const titles: any = {
    [stageRegistration.email]: 'Какая  у вас почта?',
    [stageRegistration.password]: 'Придумайте пароль',
    [stageRegistration.phone]: 'Ваш телефон',
    [stageRegistration.birthday]: 'Когда у вас день \n рождения?',
    [stageRegistration.gender]: 'Укажите пол',
    [stageRegistration.userName]: 'Как вас зовут?',
    [stageRegistration.surname]: 'Какая у вас фамилия?',
    [stageRegistration.platform]: 'Выберите платформу',
    [stageRegistration.privatePlatform]: 'Укажите код платформы',
    [stageRegistration.photo]: 'Установите фото \n профиля'
  }

  useEffect(() => {
    dispatch(setStage(stageRegistration.email))
  }, [])

  return (
    <div className={'registration-page'} style={{ paddingTop: 50 }}>
      <Header title={'Регистрация'} />
      <RegistrationItem stage={stage} title={titles[stage]} />
    </div>
  )
}
