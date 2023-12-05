import { Dispatch, FC, SetStateAction } from 'react'
import './modals.scss'
import icon from '../../assets/image/icon_purpose__status_full.svg'
import { useNavigate } from 'react-router-dom'
import { RewardCount } from '../Reward/Reward-count'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { getBalance } from '../../Redux/slice/appSlice'

interface IModalSuccess {
  subTitle?: string
  textButton?: string
  route?: any
  reward?: number,
  title?: string,
  setShowModal?: Dispatch<SetStateAction<boolean>>
  showModal?: boolean,
  updateActive?: boolean,
  showReward?: boolean
}

export const ModalSuccess: FC<IModalSuccess> = ({
  reward,
  subTitle,
  textButton,
  route,
  setShowModal,
  showModal,
  showReward = true,
  updateActive,
  title
}) => {
  const navigation = useNavigate()
  const dispatch = useAppDispatch()
  const handler = async () => {
    if (route) {
      navigation(route)
    } else {
      if (updateActive) {
        const startDateDay = new Date()
        startDateDay.setDate(startDateDay.getDate() - 7)
        const data = {
          end_date: new Date().toLocaleDateString(),
          start_date: startDateDay.toLocaleDateString()
        }
        setShowModal && setShowModal(false)
        await dispatch(getBalance())
      }

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
        <div className='modal-status__title'>{title || 'Задание выполнено'}</div>
        <div className='modal-status__sub-title'>
          {showReward && (subTitle || 'Ваша награда: ')} {showReward && <RewardCount count={reward || 0} />}
        </div>
      </div>
    </div>
  )
}
