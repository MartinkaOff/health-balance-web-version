import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { genderSelector, setDisabledButton, setGender, setStage } from '../../Redux/slice/authSlice'
import Button, { typesButton } from '../../UI-Components/Button/Button'
import { stageRegistration } from '../../utils/enums'

export const Gender = () => {
  const dispatch = useAppDispatch()
  const gender = useAppSelector(genderSelector)
  const handlerGender = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setGender(+e.target.value))


  return (
    <>
      <div
        className={'registration__gender select-gender'}
        onChange={handlerGender}
      >
        <input
          type='radio'
          id={'man'}
          name={'gender'}
          value={1}
          defaultChecked={gender === 1}
        />
        <label htmlFor={'man'}>Мужской</label>
        <input type='radio' id={'woman'} name={'gender'} value={2} defaultChecked={gender === 2} />
        <label htmlFor={'woman'}>Женский</label>
      </div>
      <Button
        customClass='registration__button'
        view={typesButton.white}
        onClick={() => dispatch(setStage(stageRegistration.userName))}
      >Далее</Button>
    </>
  )
}
