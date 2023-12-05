import './tracker.scss'
import {Preloader} from '../Preloader/Preloader'
import HabitsTargetItem from './Habits-tracker-item'
import {useGetTracksQuery} from "../../services/tracker.api";
import {showToast} from "../../utils/common-functions";
import {FC} from "react";

interface IWaterTarget {
  date?:string
}

export const WaterTarget:FC<IWaterTarget> = ({date= new Date().toLocaleDateString()}) => {

  const {data:tracks, isLoading, isError, error} = useGetTracksQuery(date)

  if (isLoading) {
    return <Preloader height='auto' />
  }

  if (isError) showToast(`Произошла ошибка! ${error}`)


  return (
    <div className={'water-target'}>
      <div className='water-target__container'>
        {tracks?.waterTrack.length ? (
          tracks.waterTrack.map((item, index) => (
            <HabitsTargetItem key={index} track={item} />
          ))
        ) : (
          <h1>Данных нет</h1>
        )}
      </div>
    </div>
  )
}
