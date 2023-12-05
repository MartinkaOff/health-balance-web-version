import './target.scss'
import {useAppSelector} from '../../hooks/redux-hooks'
import {stepsPerDaySelector} from '../../Redux/slice/appSlice'
import {CircleDays} from './Circle-days'
import {useGetPersonalPurposeQuery} from '../../services/purpose.api'
import {Preloader} from "../Preloader/Preloader";
import {memo} from "react";

const Target = () => {

    const steps = useAppSelector(stepsPerDaySelector)

    const {data: purpose, isLoading} = useGetPersonalPurposeQuery(null)

    const calcPercent = (itemQuantity: number, purposeQuantity: number) =>
        Math.min(itemQuantity * 100 / purposeQuantity, 100)


    return (
        <div className={'target'}>
            {
                isLoading ? <Preloader height={'auto'}/>
                    : purpose ?
                        <div className='target__container'>
                            <div className='target__header'>
                                <div className='target__title'>
                                    Цель - <span>{purpose.quantity}</span>
                                </div>
                            </div>
                            <div className='target__body'>
                                {Object.values(steps.statistic).map((item, i) => (
                                    <CircleDays
                                        key={i}
                                        item={item}
                                        percent={calcPercent(item.quantity, purpose.quantity)}
                                    />
                                ))}
                            </div>
                        </div>
                        : <h1>Цели нет</h1>
            }
        </div>
    )
}

export default memo(Target)