import { FC } from 'react'
import { IFurtherButton } from '../Registration/FurtherButton'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  codeRecoverySelector,
  disableButtonSelector,
  emailRecoverySelector,
  passwordRecoverySelector,
  setDisabledButton,
  setError
} from '../../Redux/slice/accessRecoverySlice'
import './access-recovery.scss'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../provider/constants-route'
import {
  useRestorePasswordMutation,
  useUpdatePasswordMutation
} from '../../services/auth.api'
import { showToast } from '../../utils/common-functions'

export const FurtherRecoveryButton: FC<IFurtherButton> = ({
  order,
  setOrder
}) => {
  const disabledButton = useAppSelector(disableButtonSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const email = useAppSelector(emailRecoverySelector)
  const password = useAppSelector(passwordRecoverySelector)
  const code = useAppSelector(codeRecoverySelector)

  const [restorePassword, { isLoading: isLoadingRestore }] =
    useRestorePasswordMutation()
  const [updatePassword, { isLoading: isLoadingUpdate }] =
    useUpdatePasswordMutation()

  const changePassword = async () => {
    if (order === 0) {
      await restorePassword(email)
        .unwrap()
        .then(async () => {
          await showToast('Письмо с кодом отправлено на почту!')
          setOrder((prev) => prev + 1)
          dispatch(setDisabledButton(true))
          dispatch(setError(''))
        })
        .catch((error) => {
          if (error.data.errors) {
            console.log(error.data.errors)
            dispatch(setError(error.data.errors))
            return
          }
          dispatch(setError(error.data))
        })
    } else if (order === 1) {
      await updatePassword({ email, code, password })
        .unwrap()
        .then(async () => {
          await showToast('Ваш пароль восстановлен!')
          navigate(LOGIN_ROUTE)
        })
        .catch(async (error) => {
          if (error.data.errors) {
            await showToast(error.data.errors)
          }
        })
    }
  }

  return (
    <button
      className={
        'access-recovery__button _button-white' +
        (disabledButton ? ' disabled' : '')
      }
      disabled={disabledButton || isLoadingRestore || isLoadingUpdate}
      onClick={changePassword}
    >
      {isLoadingRestore || isLoadingUpdate ? (
        <span className='spinner'>
          <i className='fa fa-spinner fa-spin' /> Загрузка
        </span>
      ) : order === 1 ? (
        'Изменить пароль'
      ) : (
        'Далее'
      )}
    </button>
  )
}
