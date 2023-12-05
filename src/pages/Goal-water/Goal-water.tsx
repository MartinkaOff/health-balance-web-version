import { useState } from 'react'
import './goal-water.scss'
import { ScrollPicker } from '../../Components/Scroll-picker/Scroll-picker'
import { getItemsWeight, showToast } from '../../utils/common-functions'
import Header from '../../Components/Header/Header'
import {
  useGetTrackerQuery,
  useUpdateTrackerMutation
} from '../../services/tracker.api'
import { IUpdateTracker } from '../../models/ITracker'

export const GoalWater = () => {
  const startValueWeight = 40
  const endValueWeight = 200
  const { data: tracker } = useGetTrackerQuery(undefined)
  const itemsWeight = getItemsWeight(startValueWeight, endValueWeight, 'кг')

  const [weightUser, setWeightUser] = useState<string>(
    tracker?.weight.toString() as string
  )

  const [updateTracker, { isLoading }] = useUpdateTrackerMutation()

  const save = async () => {
    try {
      const data: IUpdateTracker = {
        id: tracker?.id || 0,
        type: 'weight',
        value: weightUser
      }
      const response = await updateTracker(data).unwrap()
      if (response?.tracker_id) {
        await showToast('Изменено успешно!')
      }
    } catch (error) {
      await showToast('Ошибка!')
    }
  }

  return (
    <div className={'goal-water'}>
      <Header title={'Цель вода'} />
      <div className='goal-water__title main-title'>Ваш текущий вес</div>
      <div className='goal-water__weight'>
        <ScrollPicker
          onChange={(value) => setWeightUser(value)}
          items={itemsWeight}
          value={weightUser}
        />
      </div>
      <div className='goal-water__recommendation small-text'>
        Количество воды в день:{' '}
        <span className='text-blue'>
          {((+weightUser * 35) / 1000).toFixed(1)} литра
        </span>
      </div>
      <button
        disabled={isLoading}
        className='goal-water__button _button-white'
        onClick={save}
      >
        Установить
      </button>
    </div>
  )
}
