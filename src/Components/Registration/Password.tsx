import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  emailSelector,
  passwordSelector,
  setPassword,
  setStage
} from '../../Redux/slice/authSlice'
import Button, { typesButton } from '../../UI-Components/Button/Button'
import { stageRegistration } from '../../utils/enums'

export const Password = () => {
  const password = useAppSelector(passwordSelector)
  const email = useAppSelector(emailSelector)
  const dispatch = useAppDispatch()
  const [disable, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    password.length >= 8 && password !== email
      ? setDisabled(false)
      : setDisabled(true)
  }, [password])

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setPassword(value.trim()))
  }
  return (
    <>
      <div style={{ position: 'relative' }}>
        <input
          type='password'
          className='registration__field _field'
          value={password}
          onChange={validatePassword}
        />
        <span className={'registration__sub-text-input'}>
          Минимум 8 символов.
        </span>
      </div>
      <Button
        disabled={disable}
        customClass='registration__button'
        view={typesButton.white}
        onClick={() => dispatch(setStage(stageRegistration.phone))}
      >
        Далее
      </Button>
    </>
  )
}
