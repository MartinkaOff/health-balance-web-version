import {Health} from '@awesome-cordova-plugins/health'
import React, {Dispatch, FC, SetStateAction} from 'react'
import './modals.scss'
import Pedometer from '../../plugins/pedometer'
import {setPedometer} from '../../Redux/slice/settingsSlice'
import {useAppDispatch} from '../../hooks/redux-hooks'
import {PEDOMETERS} from "../../utils/enums";
import {showToast} from "../../utils/common-functions";

interface IModalFit {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
  children: any
}

export const ModalFit: FC<IModalFit> = ({ active, setActive, children }) => {
  const dispatch = useAppDispatch()

  const closeModal = () => {
    setActive(false)
    Health.isAvailable()
      .then((available) => {
        if (available) {
          Health.requestAuthorization([{ read: ['steps'] }])
            .then(() => {
              Health.promptInstallFit().then(async () => {
                dispatch(setPedometer(PEDOMETERS.googleFit))
                await Pedometer.reset()
                await Pedometer.stop()
              })
            })
            .catch((error) => console.log(error))
        }else{
            showToast(`Чтобы ваши шаги считались корректно, установите приложение Google fit, 
            создайте аккаунт и синхронизируйте его с приложением`,'long')
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className={active ? 'modal-fit active' : 'modal'} onClick={closeModal}>
      <div
        className={active ? 'modal-fit__content active' : 'modal-fit__content'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='modal-fit__close' onClick={closeModal}>
          &#10006;
        </div>
        {children}
        <div className='modal-fit__close' onClick={closeModal}>
          Ок
        </div>
      </div>
    </div>
  )
}
