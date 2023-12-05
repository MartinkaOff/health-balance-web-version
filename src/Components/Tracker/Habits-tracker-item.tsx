import React, {memo} from 'react'
import './tracker.scss'
import successfully from '../../assets/image/tracker/successfully.svg'
import missed from '../../assets/image/tracker/missed.svg'
import {ITrack, ITrackAdditional} from '../../models/ITracker'
import {useCompleteTrackMutation} from '../../services/tracker.api'
import {showToast} from '../../utils/common-functions'
import disabled from '../../assets/image/tracker/disabled.svg'
import swal from "sweetalert";

interface IWaterTargetItem {
    track: ITrack
}

const HabitsTargetItem = memo<IWaterTargetItem>(({track}) => {

    let additional = isJsonString(track.additional)
    const [complete] = useCompleteTrackMutation()

    const definitionTargetTrack = (type: number) => {
        switch (type) {
            case 2:
                return 'выпить воды'
            case 3:
                return 'поесть фрукты'
            default:
                break
        }
    }

    function isJsonString(str: string) {
        try {
            const jsonParse: ITrackAdditional = JSON.parse(str)
            return {
                time: jsonParse?.time,
                text: track.type === 3 ? jsonParse?.unit : jsonParse.amount + ' ' + jsonParse?.unit
            }
        } catch (e) {
            return {
                time: '00:00',
                text: str
            }
        }
    }

    const completeTrack = async () => {
        if (track.id === 0) return

        if (!track.completed) {
            swal({
                title: `Выполнить цель "${definitionTargetTrack(
                    track.type
                )}" в ${additional?.time}?`,
                buttons: ["Отменить", "Выполнить"]
            }).then(async (value) => {
                if (value) {
                    complete(track.id)
                        .unwrap()
                        .then(() => showToast('Цель выполнена'))
                }

            })
        }
    }

    return (
        <div className='habits-tracker-item'>
            {track?.notification_send ? (
                <>
                    <img
                        src={track.id ? (track.completed ? successfully : missed) : disabled}
                        onClick={completeTrack}
                        alt={track.id ? (track.completed ? 'successfully' : 'missed') : 'disabled'}
                        style={{marginBottom: 3}}
                        width={34}
                        height={34}
                    />
                    <div
                        className={`habits-tracker-item__value ${
                            track.id ? track.completed
                                    ? 'habits-tracker-item__value_green'
                                    : 'habits-tracker-item__value_yellow'
                                : 'habits-tracker-item__value_gray'
                        }`}
                    >
                        {additional?.text}
                    </div>
                </>
            ) : (
                <>
                    <div className='habits-tracker-item__data'>
                        {additional?.time}
                    </div>
                    {!track.completed && (
                        <div className={'habits-tracker-item__value'}>{additional?.text}</div>
                    )}
                </>
            )}
        </div>
    )
})

export default HabitsTargetItem
