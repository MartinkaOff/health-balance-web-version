import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  nameUserSelector,
  setNameUser,
  setStage
} from '../../Redux/slice/authSlice'
import { stageRegistration } from '../../utils/enums'
import Button, { typesButton } from '../../UI-Components/Button/Button'

export const NameUser = () => {
  const nameUser = useAppSelector(nameUserSelector)
  const dispatch = useAppDispatch()
  const validationRegex =
    nameUser.length >= 2 &&
    nameUser.length <= 20 &&
    nameUser.match('^[а-яА-ЯёЁa-zA-Z0-9]+$')
  const [disable, setDisabled] = useState<boolean>(true)
  useEffect(() => {
    if (validationRegex) {
      setDisabled(false)
      return
    }
    setDisabled(true)
  }, [nameUser])

  const validateUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setNameUser(value.trim()))
  }
  return (
    <>
      <div style={{ position: 'relative' }}>
        <input
          type='text'
          className='registration__field _field'
          value={nameUser}
          onChange={validateUserName}
        />
        <span className={'registration__sub-text-input'}>
          Это имя появится в профиле HealthBalance
        </span>
      </div>
      <Button
        disabled={disable}
        customClass='registration__button'
        view={typesButton.white}
        onClick={() => dispatch(setStage(stageRegistration.surname))}
      >Далее</Button>
    </>
  )
}
