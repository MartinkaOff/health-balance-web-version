import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  setStage,
  setTelephone,
  telephoneSelector
} from '../../Redux/slice/authSlice'
import InputMask from 'react-input-mask'
import Button, { typesButton } from '../../UI-Components/Button/Button'
import { stageRegistration } from '../../utils/enums'

interface IPhone{
  googleAuth?: boolean
}


export const Telephone:FC<IPhone> = ({googleAuth=false}) => {
  const telephone = useAppSelector(telephoneSelector)
  const dispatch = useAppDispatch()
  const [disable, setDisabled] = useState<boolean>(false)

  useEffect(() => {
    if (telephone.length && !telephone.includes('_')) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [])

  const validateTelephone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setTelephone(value))
    const isFullTelephone = value.includes('_')
    isFullTelephone
      ? setDisabled(true)
      : setDisabled(false)
  }

  return (
    <>
    <InputMask
      className='registration__field _field'
      mask='+7 (999) 999-99-99'
      placeholder='+7 (---) --------'
      type={'tel'}
      onChange={validateTelephone}
      value={telephone}
    />
   {!googleAuth && <Button
    disabled={disable}
    customClass='registration__button'
    view={typesButton.white}
    onClick={() => dispatch(setStage(stageRegistration.birthday))}
  >Далее</Button>}
  </>
  )
}
