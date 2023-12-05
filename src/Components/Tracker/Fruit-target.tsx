import './tracker.scss'
import {Preloader} from '../Preloader/Preloader'
import HabitsTargetItem from './Habits-tracker-item'
import {useGetTracksQuery} from "../../services/tracker.api";
import {showToast} from "../../utils/common-functions";
import {FC} from "react";


interface IFruitTarget {
    date?: string
}

export const FruitTarget:FC<IFruitTarget> = ({date= new Date().toLocaleDateString()}) => {

    const {data:tracks, isLoading, isError, error} = useGetTracksQuery(date)

    if (isLoading) {
        return <Preloader height='auto'/>
    }

    if (isError) showToast(`Произошла ошибка! ${error}`)


    return (
        <div className={'fruit-target'}>
            <div className='fruit-target__container'>
                {tracks && tracks.fruitTrack.length ? tracks.fruitTrack.map((item, index) => (
                    <HabitsTargetItem
                        key={index}
                        track={item}
                    />
                )) : <h1>Данных нет</h1>}
            </div>
        </div>
    )
}
