import {useState} from 'react'
import Header from '../../Components/Header/Header'
import {useGetTrackerQuery, useUpdateTrackerMutation} from '../../services/tracker.api'
import {showToast} from '../../utils/common-functions'
import './goal-fruits.scss'
import {IUpdateTracker} from "../../models/ITracker";

export const GoalFruits = () => {

  const {data: tracker}= useGetTrackerQuery(undefined)

  const [countFruits, setCountFruits] = useState<number>(tracker?.fruits || 0)

  const [updateTracker, {isLoading}] = useUpdateTrackerMutation()

  const addCountFruits = () => setCountFruits((prev) => prev + 1)
  const decreaseCountFruits = () => {
    if (countFruits > 0) {
      setCountFruits((prev) => prev - 1)
    }
  }

  const save = async () => {
    try {
      const data:IUpdateTracker = {
        id: tracker?.id || 0,
        type: 'fruits',
        value: countFruits.toString()
      }
      const response = await updateTracker(data).unwrap()
      if(response?.tracker_id){
        await showToast('Изменено успешно!')
      }
    } catch (error) {
      await showToast('Ошибка!')
    }
  }

  return (
    <div className={'goal-fruits'}>
      <Header title={'Цель фрукты'} />
      <div className='goal-fruits__title main-title'>
        Количество <br /> фруктов/овощей
      </div>
      <div className='goal-fruits__digits digits'>
        <div onClick={decreaseCountFruits}>-</div>
        <div className='digits__square'>
          {countFruits >= 10 ? countFruits : '0' + countFruits}
        </div>
        <div onClick={addCountFruits}>+</div>
      </div>
      <button disabled={isLoading} className='goal-fruits__button _button-white' onClick={save}>
        Установить
      </button>
    </div>
  )
}
