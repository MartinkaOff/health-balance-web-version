import { FC } from 'react'
import './modals.scss'

interface IModalExit {
  closeCallback: Function
  actionCallback: Function
  text?: string
  textButton?: string
}

export const ModalExit: FC<IModalExit> = ({
  closeCallback,
  actionCallback,
  text,
  textButton
}) => {
  return (
    <div className='modal'>
      <div className='modal__background'></div>
      <div className='modal__wrapper'>
        <div className='modal__button-wrapper'>
          <div className='modal__text'>
            {text || 'Вы действительно хотите выйти из аккаунта?'}
          </div>
          <div
            className='modal__button modal__button_exit'
            onClick={() => actionCallback()}
          >
            {textButton || 'Выйти'}
          </div>
          <div className='modal__button' onClick={() => closeCallback(false)}>
            Отмена
          </div>
        </div>
      </div>
    </div>
  )
}
