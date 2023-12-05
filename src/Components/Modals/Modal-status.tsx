import { Dispatch, FC, SetStateAction } from 'react'
import './modals.scss'
import icon from '../../assets/image/icon_purpose__status_full.svg'
import { useNavigate } from 'react-router-dom'

interface IModalStatus {
  subTitle?: string
  textButton?: string
  route?: any
}

export const ModalStatus: FC<IModalStatus> = ({
  subTitle,
  textButton,
  route
}) => {
  const navigation = useNavigate()

  const handler = () => {
    if (route) {
      navigation(route)
    }
  }

  return (
    <div className={'modal-status active'}>
      <div className='modal-status__cross' onClick={handler}>
        &#10006;
      </div>
      <div className='modal-status__body'>
        <div className='modal-status__icon'>
          <img src={icon} alt='icon' />
        </div>
        <div className='modal-status__title'>Успех!</div>
        <div className='modal-status__sub-title'>
          {subTitle || 'Новость появится после проверки модератором'}
        </div>
        <button
          className='modal-status__button _button-white'
          onClick={handler}
        >
          {textButton || 'Ок'}
        </button>
      </div>
    </div>
  )
}
