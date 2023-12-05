import {useState} from 'react'
import {getItemsHour, getItemsMinutes, showToast} from '../../utils/common-functions'
import Header from '../../Components/Header/Header'
import {ScrollPicker} from '../../Components/Scroll-picker/Scroll-picker'
import './goal-sleep.scss'
import {useGetTrackerQuery, useUpdateTrackerMutation} from '../../services/tracker.api'
import {IUpdateTracker} from "../../models/ITracker";

export const GoalSleep = () => {

  const {data: tracker}= useGetTrackerQuery(undefined)

  const itemsHour = getItemsHour()
  const itemsMinutes = getItemsMinutes()
  const [hour, setHour] = useState<string>(
    (tracker ? tracker?.wake_up_time.split(':')[0] : "").toString()
  )
  const [minutes, setMinutes] = useState<string>(
    (tracker ? tracker?.wake_up_time.split(':')[1] : "").toString()
  )
  const [updateTracker, {isLoading}] = useUpdateTrackerMutation()
  const changeHour = (value: string) => setHour(value)
  const changeMinutes = (value: string) => setMinutes(value)

  let outputHour = +hour - 8 < 0 ? 24 + (+hour - 8) : +hour - 8

  const save = async () => {
    try {
      const data:IUpdateTracker = {
        id: tracker?.id || 0,
        type: 'wake_up_time',
        value: hour.padStart(2, '0') + ':' + minutes.padStart(2, '0')
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
    <div className={'goal-sleep'}>
      <Header title={'Цель сон'} />
      <div className='goal-sleep__title main-title'>
        Во сколько вы <br />
        просыпаетесь?
      </div>

      <div className='goal-sleep__digits'>
        <div className='goal-sleep__digits-item'>
          <ScrollPicker
            onChange={changeHour}
            items={itemsHour}
            value={hour}
            totalHeight={77}
            size={1}
            customClassname={'clock'}
            fontSize={44}
          />
        </div>
        <div className={''}>:</div>
        <div className='goal-sleep__digits-item'>
          <ScrollPicker
            onChange={changeMinutes}
            items={itemsMinutes}
            value={minutes}
            size={1}
            totalHeight={77}
            fontSize={44}
            customClassname={'clock'}
          />
        </div>
      </div>

      <div className='goal-sleep__recommendation small-text'>
        Оптимальное время засыпания:{' '}
        <span className='text-blue'>
          {outputHour.toLocaleString().padStart(2, '0')}:
          {minutes.padStart(2, '0')}
        </span>
      </div>
      <button disabled={isLoading} className='goal-sleep__button _button-white' onClick={save}>
        Установить
      </button>
    </div>
  )
}
