import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  setStage,
  setSurname,
  surNameSelector
} from '../../Redux/slice/authSlice'
import { stageRegistration } from '../../utils/enums'
import Button, { typesButton } from '../../UI-Components/Button/Button'

export const SurName = () => {
  const surName = useAppSelector(surNameSelector)
  const dispatch = useAppDispatch()
  const validationRegex = surName.length >= 2 && surName.length <= 20 && surName.match("^[а-яА-ЯёЁa-zA-Z0-9]+$")
  const [disable, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    validationRegex ? setDisabled(false) : setDisabled(true)
  }, [surName])

  const validateSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setSurname(value.trim()))
  }
  return (
    <>
      <div style={{ position: 'relative' }}>
        <input
          type='text'
          className='registration__field _field'
          value={surName}
          onChange={validateSurname}
        />
        <span className={'registration__sub-text-input'}>
          Это обязательное поле
        </span>
      </div>
      <Button
        disabled={disable}
        customClass='registration__button'
        view={typesButton.white}
        onClick={() => dispatch(setStage(stageRegistration.platform))}
      >Далее</Button>
    </>
  )
}
