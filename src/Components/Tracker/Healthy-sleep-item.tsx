import React, {FC} from 'react'
import status_full from '../../assets/image/purpose__status_full_green.svg'
import {ITrack} from '../../models/ITracker'
import missed from '../../assets/image/tracker/missed.svg'
import disabled from '../../assets/image/tracker/disabled.svg'


interface IHealthySleepItem {
    item: ITrack,
    index: number,
    completeTrackSleep: (index: number) => void,
    isTrackExist: boolean
}

export const HealthySleepItem: FC<IHealthySleepItem> = ({item, index, completeTrackSleep, isTrackExist}) => {

    return (
        <div className='healthy-sleep__item-day' key={item.id}>
            {
                (item?.notification_send || !isTrackExist) ? <img
                        className='healthy-sleep__icon-full'
                        src={isTrackExist ? (item?.sleep_time! >= 8 ? status_full : missed) : disabled}
                        onClick={() => completeTrackSleep(index)}
                        alt='status'
                    /> :
                    <div className='healthy-sleep__circle'/>
            }

            <div
                className={`healthy-sleep__day-text ${isTrackExist ? (
                    item?.notification_send ? (item?.sleep_time! >= 8 
                        ? 'healthy-sleep__day-text_green' 
                        : 'healthy-sleep__day-text_yellow'):''
                ) : 'healthy-sleep__day-text_gray'
                }`}
            >
                {item.additional}
            </div>
        </div>
    )
}
